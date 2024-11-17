import { Controller, Get, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject() private readonly authService: AuthService,
  ) {}

  @Get('token')
  async getToken() {
    const token = await this.authService.getToken();

    console.log(token);

    return {
      token
    }
  }
}
