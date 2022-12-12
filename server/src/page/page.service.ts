import { PrismaService } from './../prisma/prisma.service';
import { BadGatewayException, BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePageDto, UpdatePageDto } from './page.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class PageService {
  constructor(private prisma: PrismaService) {}

  create(createPageDto: CreatePageDto) {
    return this.prisma.page.create({ data: createPageDto });
  }

  findAll() {
    return this.prisma.page.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async findOne(id: number) {
    try {
      const page = await this.prisma.page.findFirstOrThrow({ where: { id } });
      return page;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadGatewayException(error.meta?.cause);
      }
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updatePageDto: UpdatePageDto) {
    try {
      const updated = await this.prisma.page.update({ where: { id }, data: updatePageDto });
      return updated;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadGatewayException(error.meta?.cause);
      }
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.page.delete({ where: { id } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException(error.meta?.cause);
      }
      throw new InternalServerErrorException();
    }
  }
}
