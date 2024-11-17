import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateToken } from '@microservices-monorepo/interfaces';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private client: ClientProxy,
  ) {}

  async getToken(data: CreateToken) {
    return firstValueFrom(this.client.send({ cmd: 'gen-token' }, data))
  }
}
