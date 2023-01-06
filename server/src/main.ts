import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { EnvironmentVars } from './common/configs/config-module.options';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use cookie parser to parse cookies
  app.use(cookieParser());

  // setup global validations
  // validates the correctness of any data received in an incoming request
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  const configService: ConfigService<EnvironmentVars> = app.get(ConfigService);
  const origin = configService.get('ORIGIN');

  // enable cors
  app.enableCors({
    origin: [origin],
    credentials: true,
  });

  await app.listen(process.env.PORT);
}
bootstrap();
