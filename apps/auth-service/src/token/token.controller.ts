import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TokenService } from './token.service';

@Controller()
export class TokenController {
  constructor(@Inject() private readonly tokenService: TokenService) {}

  @MessagePattern({ cmd: 'gen-token' })
  generateToken() {
    return this.tokenService.generateToken()
  }
}
