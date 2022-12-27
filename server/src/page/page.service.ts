import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePageDto, FilterPageDto, RenamePageDto, UpdatePageDto } from './page.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Prisma } from '@prisma/client';
import { SortOrder } from 'src/common/enums/sort-order.enum';

@Injectable()
export class PageService {
  constructor(private prisma: PrismaService) {}

  create(createPageDto: CreatePageDto) {
    return this.prisma.page.create({ data: createPageDto });
  }

  findAll(query: Prisma.PageFindManyArgs) {
    return this.prisma.page.findMany(query);
  }

  pageList(filterPageDto: FilterPageDto) {
    const query: Prisma.PageFindManyArgs = {};
    if (filterPageDto.sortOrder) {
      switch (filterPageDto.sortOrder) {
        case SortOrder.FILE_A_TO_Z:
          query.orderBy = { title: 'asc' };
          break;
        case SortOrder.FILE_Z_TO_A:
          query.orderBy = { title: 'desc' };
          break;
        case SortOrder.MODIFIED_NEW_TO_OLD:
          query.orderBy = { updatedAt: 'asc' };
          break;
        case SortOrder.MODIFIED_OLD_TO_NEW:
          query.orderBy = { updatedAt: 'desc' };
          break;
        case SortOrder.CREATED_NEW_TO_OLD:
          query.orderBy = { createdAt: 'asc' };
          break;
        case SortOrder.CREATED_OLD_TO_NEW:
          query.orderBy = { createdAt: 'desc' };
          break;
        default:
          query.orderBy = { title: 'asc' };
      }
    }

    query.select = { id: true, title: true };

    return this.findAll(query);
  }

  async findOne(id: number) {
    try {
      const page = await this.prisma.page.findUniqueOrThrow({ where: { id } });
      return page;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException(error.meta?.cause);
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
        throw new BadRequestException(error.meta?.cause);
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

  async rename(id: number, renamePageDto: RenamePageDto) {
    try {
      await this.prisma.page.update({ where: { id }, data: renamePageDto });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException(error.meta?.cause);
      }
      throw new InternalServerErrorException();
    }
  }
}
