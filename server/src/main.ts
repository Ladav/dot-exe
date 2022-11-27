import { PrismaService } from './prisma/prisma.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // close app on prisma shutdown signal
  const prisma = app.get(PrismaService);
  await prisma.enableShutdownHooks(app);

  await app.listen(3001);
}
bootstrap();
