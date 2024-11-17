import { Body, Controller, Inject, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateToken, createTokenSchema } from '@microservices-monorepo/interfaces';
import { ZodPipe } from '../pipes/zod.pipe';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject() private readonly authService: AuthService,
  ) {}

  @Post('token')
  @UsePipes(new ZodPipe(createTokenSchema))
  async getToken(@Body() body: CreateToken) {
    const token = await this.authService.getToken(body);

    return {
      token
    }
  }
}
