import { Controller, applyDecorators } from '@nestjs/common';
import {
	ApiOperation,
	ApiResponse,
	ApiBody,
	ApiHeader,
	ApiParam,
	ApiQuery,
	type ApiResponseOptions,
	type ApiOperationOptions,
	type ApiBodyOptions,
	type ApiHeaderOptions,
	type ApiParamOptions,
	type ApiQueryOptions,
	ApiTags,
	ApiBearerAuth,
} from '@nestjs/swagger';

type SwaggerOptions = {
	authName?: string;
	operation: ApiOperationOptions;
	responses: ApiResponseOptions[];
	body?: ApiBodyOptions;
	headers?: ApiHeaderOptions[];
	params?: ApiParamOptions[];
	queries?: ApiQueryOptions[];
};

export const OPEN_API_AUTH_NAME = 'access-token';

export const SwaggerRoute = ({
	authName,
	operation,
	responses,
	body,
	headers,
	params,
	queries,
}: SwaggerOptions) => {
	return applyDecorators(
		...([
			ApiOperation(operation),
			...Object.entries(responses).map(([, response]) =>
				ApiResponse({ ...response }),
			),
			authName && ApiBearerAuth(authName),
			body && ApiBody(body),
			...(queries || []).map(ApiQuery),
			...(headers || []).map(ApiHeader),
			...(params || []).map(ApiParam),
		].filter(Boolean) as MethodDecorator[]),
	);
};

export function SwaggerController(prefix: string) {
	return applyDecorators(Controller(prefix), ApiTags(prefix));
}
