import { Module } from '@nestjs/common';
import { z } from 'zod';
import { validateEnvConfig } from '@microservices-monorepo/utils';
import { ConfigModule } from '@nestjs/config';

import { TokenModule } from '../token/token.module';

const configSchema = z.object({
  PORT: z.coerce.number(),
  HOST: z.string(),
  ACCESS_TOKEN_EXPIRE_IN_SECONDS: z.coerce.number(),
  REFRESH_TOKEN_EXPIRE_IN_SECONDS: z.coerce.number(),
  JWT_SECRET: z.string(),
})

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './envs/.auth-service.env',
      isGlobal: true,
      validate: validateEnvConfig(configSchema)
    }),
    TokenModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
