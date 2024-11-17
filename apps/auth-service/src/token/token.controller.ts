import { Controller, Inject, UsePipes } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TokenService } from './token.service';
import { ZodPipe } from '../pipes/zod.pipe';
import { CreateToken, createTokenSchema } from '@microservices-monorepo/interfaces';

@Controller()
export class TokenController {
  constructor(@Inject() private readonly tokenService: TokenService) {}

  @MessagePattern({ cmd: 'gen-token' })
  @UsePipes(new ZodPipe(createTokenSchema))
  generateToken(@Payload() data: CreateToken) {
    return this.tokenService.createToken(data)
  }
}
