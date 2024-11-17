import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TokenModule } from '../token/token.module';
import { z } from 'zod';
import { fromError } from 'zod-validation-error';

const configSchema = z.object({
  PORT: z.coerce.number(),
  ACCESS_TOKEN_EXPIRE_IN_SECONDS: z.coerce.number(),
  REFRESH_TOKEN_EXPIRE_IN_SECONDS: z.coerce.number(),
  JWT_SECRET: z.string(),
})

export function validate(config: Record<string, unknown>) {
  const validatedConfig = configSchema.safeParse(config);

  if (!validatedConfig.success) {
    const errors = fromError(validatedConfig.error);

    throw new Error(errors.toString());
  }

  return validatedConfig.data;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './envs/.auth-service.env',
      isGlobal: true,
      validate
    }),
    TokenModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
