import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './infra/database/prisma/prisma.module';
import { TransactionManagerModule } from './infra/database/transactionManager/transactionManager.module';
import { AlsMiddleware } from './shared/config/als/als.middleware';
import { AlsModule } from './shared/config/als/als.module';
import configuration from './shared/config/configuration';
import { TransformResponseInterceptor } from './shared/interceptors/transformResponse/transformResponse.interceptor';
import { JwtStrategy } from './shared/strategies/jwt.strategy';
import { UserApplicationModule } from './module/user/useCases/user.application.module';
import { ValidateUserAccessModule } from './module/user/domain/user/validateUserAccess/validateUserAccess.module';
import { JwtRefreshStrategy } from './shared/strategies/jwtRefresh.strategy';
import { AssociationApplicationModule } from './module/association/useCases/associationApplication.module';
import { AnimalApplicationModule } from './module/animal/useCases/animalApplication.module';

@Module({
  imports: [
    // setup
    ValidateUserAccessModule,
    PrismaModule,
    TransactionManagerModule,
    AlsModule,
    CacheModule.register({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configuration],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty', options: { singleLine: true } }
            : undefined,
        customProps: () => ({
          context: 'HTTP',
        }),
        redact: {
          paths: ['req.headers', 'res.headers'],
          remove: true,
        },
        enabled: process.env.NODE_ENV !== 'test',
      },
    }),
    // modules
    UserApplicationModule,
    AssociationApplicationModule,
    AnimalApplicationModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    AppService,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
})
export class AppModule implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AlsMiddleware).forRoutes('*');
  }
}
