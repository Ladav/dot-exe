import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetGDriveClient = createParamDecorator((_, context: ExecutionContext) => {
  const request: Request = context.switchToHttp().getRequest();
  return request.gDriveClient;
});
