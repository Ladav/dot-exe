import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePageDto, UpdatePageDto } from './page.dto';

@Injectable()
export class PageService {
  constructor(private prisma: PrismaService) {}

  create(createPageDto: CreatePageDto) {
    return this.prisma.page.create({ data: createPageDto });
  }

  findAll() {
    return this.prisma.page.findMany();
  }

  findOne(id: number) {
    return this.prisma.page.findFirst({ where: { id } });
  }

  update(id: number, updatePageDto: UpdatePageDto) {
    return this.prisma.page.update({ where: { id }, data: updatePageDto });
  }

  remove(id: number) {
    return this.prisma.page.delete({ where: { id } });
  }
}
