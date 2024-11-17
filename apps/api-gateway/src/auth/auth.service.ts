import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private client: ClientProxy,
  ) {
  }

  async getToken() {
    return firstValueFrom(this.client.send({ cmd: 'gen-token' }, {}))
  }
}
