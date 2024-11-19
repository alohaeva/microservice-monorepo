import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TokenService } from './token.service';
import { CreateToken, ValidateToken } from '@microservices-monorepo/interfaces';

@Controller()
export class TokenController {
  constructor(@Inject() private readonly tokenService: TokenService) {}

  @MessagePattern({ cmd: 'gen-token' })
  generateToken(@Payload() data: CreateToken) {
    return this.tokenService.createToken(data)
  }

  @MessagePattern({ cmd: 'validate-token' })
  validateToken(@Payload() data: ValidateToken) {
    return this.tokenService.validateToken(data.token)
  }
}
