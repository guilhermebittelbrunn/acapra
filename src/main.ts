import helmet from '@fastify/helmet';
import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    cors: true,
    bufferLogs: true,
  });

  app.register(helmet);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  buildOpenApiDocs(app);

  await app.listen(process.env.PORT || 80, '0.0.0.0');
}

function buildOpenApiDocs(app: NestFastifyApplication) {
  const generalDocsConfig = new DocumentBuilder()
    .setTitle('acapra')
    .setDescription('Documentação da API acapra')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: `Please enter token without any prefix`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'authorization',
    )
    .build();

  const generalDocsDocument = SwaggerModule.createDocument(app, generalDocsConfig);

  // set jwt auth in all endpoints by default
  generalDocsDocument.paths = Object.keys(generalDocsDocument.paths).reduce((acc, path) => {
    acc[path] = Object.keys(generalDocsDocument.paths[path]).reduce((methods, method) => {
      methods[method] = {
        ...generalDocsDocument.paths[path][method],
        security: [{ authorization: [] }],
      };
      return methods;
    }, {});
    return acc;
  }, {});

  SwaggerModule.setup('docs', app, generalDocsDocument, {
    swaggerOptions: {
      persistAuthorization: true, // keeps the authentication after reloading the page
      displayRequestDuration: true,
      filter: true,
      tryItOutEnabled: true,
    },
    customCss: `
      .topbar-wrapper img { content: url('https://your-logo-url.com/logo.png'); }
      .swagger-ui .info { margin-bottom: 20px; }
      .swagger-ui .opblock-summary-method { font-weight: bold; font-size: 14px; }
  `,
  });
}

bootstrap();
