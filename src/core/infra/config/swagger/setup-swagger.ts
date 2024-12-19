import { type INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { OPEN_API_AUTH_NAME } from './open-api';

export function setupSwagger(app: INestApplication): void {
	const docBuilder = new DocumentBuilder()
		.setTitle('Ritto API')
		.setDescription('Ritto Back-End Swagger API')
		.setVersion('1.0.0')
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
				in: 'header',
			},
			OPEN_API_AUTH_NAME,
		);

	const swaggerDoc = SwaggerModule.createDocument(app, docBuilder.build());

	SwaggerModule.setup('api', app, swaggerDoc);
}
