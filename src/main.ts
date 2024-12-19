import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/app.module';

import { EnvService } from '@/core/infra/config/env/env.service';
import { setupSwagger } from '@/core/infra/config/swagger/setup-swagger';

const logger = new Logger('NestApplication');

enum ExitStatusEnum {
	FAILURE = 1,
	SUCCESS = 0,
}

enum ExitMessageEnum {
	FAILURE = 'App exited with an error:',
	SUCCESS = 'App exited successfully',
	UNCAUGHT_EXCEPTION = 'App exited due to an uncaught exception:',
	UNHANDLED_REJECTION = 'App exited due to an unhandled rejection:',
}

function exitWithSuccess(): never {
	logger.log(ExitMessageEnum.SUCCESS);
	process.exit(ExitStatusEnum.SUCCESS);
}

function exitWithFailure(message?: string, error?: unknown): never {
	logger.error(message, error);
	process.exit(ExitStatusEnum.FAILURE);
}

process.on('uncaughtException', (error: Error): never =>
	exitWithFailure(ExitMessageEnum.UNCAUGHT_EXCEPTION, error),
);

process.on('unhandledRejection', (reason: unknown) => {
	exitWithFailure(ExitMessageEnum.UNHANDLED_REJECTION, reason);
});

(async () => {
	const app = await NestFactory.create(AppModule);
	app.enableShutdownHooks();
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	setupSwagger(app);

	const envService = app.get(EnvService);

	const appPort = envService.getKey('PORT');

	await app
		.listen(appPort)
		.then(() => logger.log(`Server listening on port ${appPort}`));

	const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
	for (const signal of exitSignals) {
		process.on(signal, async () => {
			try {
				await app.close();
				exitWithSuccess();
			} catch (error) {
				exitWithFailure(ExitMessageEnum.FAILURE, error);
			}
		});
	}
})();
