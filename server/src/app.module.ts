import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PageModule } from './page/page.module';
import { AuthModule } from './auth/auth.module';
import { configOptions } from './common/configs/config-module.options';
import { GoogleAuthClientMiddleware } from './common/middleware/google-auth-client.middleware';

@Module({
  imports: [ConfigModule.forRoot(configOptions), PrismaModule, PageModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GoogleAuthClientMiddleware).forRoutes('*');
  }
}
