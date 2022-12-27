import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export const tryCatchPrismaError: Prisma.Middleware = async (params, next) => {
  try {
    const result = await next(params);
    return result;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw new BadRequestException(error.meta?.cause);
    }
    throw new InternalServerErrorException();
  }
};
