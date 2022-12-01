import { PrismaService } from './prisma/prisma.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // close app on prisma shutdown signal
  const prisma = app.get(PrismaService);
  await prisma.enableShutdownHooks(app);

  // setup global validations
  // validates the correctness of any data received in an incoming request
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  await app.listen(3001);
}
bootstrap();
