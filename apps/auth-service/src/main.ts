import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { AppModule } from './app/app.module';
import { MessagePattern } from '@nestjs/microservices';

async function bootstrap() {

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
    },
  );

  await app.listen();

  Logger.log(
    `🚀 Auth Service is running`
  );
}

bootstrap();
