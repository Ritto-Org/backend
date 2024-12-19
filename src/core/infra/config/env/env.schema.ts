import { IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

import { NodeEnvEnum } from '@/core/domain/enums/node-env';

export class EnvSchema {
	@IsEnum(NodeEnvEnum)
	@IsNotEmpty()
	NODE_ENV?: NodeEnvEnum;

	@IsInt()
	@IsOptional()
	PORT?: number = 3000;
}
