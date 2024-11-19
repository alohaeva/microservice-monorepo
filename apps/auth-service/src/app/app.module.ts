import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TokenModule } from '../token/token.module';
import { validateConfig } from '../utils/validation/validateConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './envs/.auth-service.env',
      isGlobal: true,
      validate: validateConfig
    }),
    TokenModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
