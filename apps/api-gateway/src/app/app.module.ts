import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { z } from 'zod';
import { validateEnvConfig } from '@microservices-monorepo/utils';

const configSchema = z.object({
  PORT: z.coerce.number(),
  API_PREFIX: z.string(),
  AUTH_SERVICE_PORT: z.coerce.number(),
  AUTH_SERVICE_HOST: z.string(),
})

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './envs/.api-gateway.env',
      isGlobal: true,
      validate: validateEnvConfig(configSchema)
    }),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
