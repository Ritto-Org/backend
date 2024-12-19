import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvService } from '@/core/infra/config/env/env.service';
import { validateEnvironment } from '@/core/infra/config/env/validate';

@Global()
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env', '.env.dev', '.env.staging', '.env.test'],
			validate: (config: Record<string, unknown>) =>
				validateEnvironment(config),
		}),
	],
	providers: [EnvService],
	exports: [EnvService],
})
export class CoreModule {}
