import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PageModule } from './page/page.module';

@Module({
  imports: [PrismaModule, PageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
