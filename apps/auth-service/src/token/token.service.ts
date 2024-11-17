import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService {

  generateToken() {
    return 'token'
  }
}
