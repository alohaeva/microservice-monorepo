import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './envs/.auth-service.env',
      isGlobal: true,
    }),
    TokenModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
