import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';

@Module({
  imports: [PrismaModule],
  controllers: [PageController],
  providers: [PageService],
})
export class PageModule {}
