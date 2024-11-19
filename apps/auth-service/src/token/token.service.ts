import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateToken, Token, VerifyTokenResult } from '@microservices-monorepo/interfaces';
import jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
  constructor(@Inject() private readonly configService: ConfigService) {}

  async createToken({ type, ...data }: CreateToken): Promise<string> {
    return this.generateToken(type, data);
  }

  generateToken(tokenType: Token, payload: Record<string, unknown>) {
    let token: string = '';

    if (tokenType === Token.Access) {
      token = this.generateAccessToken(payload);
    }

    if (tokenType === Token.Refresh) {
      token = this.generateRefreshToken(payload);
    }

    return token;
  }

  generateAccessToken(payload: Record<string, unknown>) {
    const accessTokenExpire = this.configService.get<number>('ACCESS_TOKEN_EXPIRE_IN_SECONDS')
    const secret = this.configService.get<string>('JWT_SECRET');

    return jwt.sign(
      {
        ...payload,
        type: Token.Access,
        exp: Math.floor(Date.now() / 1000) + accessTokenExpire,
      },
      secret
    );
  }

  generateRefreshToken(payload: Record<string, unknown>) {
    const secret = this.configService.get<string>('JWT_SECRET');
    const refreshTokenExpire = this.configService.get<number>('REFRESH_TOKEN_EXPIRE_IN_SECONDS')

    return jwt.sign(
      {
        ...payload,
        type: Token.Refresh,
        exp: Math.floor(Date.now() / 1000) + refreshTokenExpire,
      },
      secret
    );
  }

  validateToken<T>(token: string): VerifyTokenResult<T> {
    try {
      const secret = this.configService.get<string>('JWT_SECRET');

      const payload = jwt.verify(token, secret);

      if (typeof payload !== 'string' && payload?.exp && payload.exp > Date.now() / 1000) {
        return {
          isValid: true,
          payload: payload as T,
        };
      }

      return {
        isValid: false,
        payload: null,
      };
    } catch (err: unknown) {
      Logger.error('TokenService', err);

      return {
        isValid: false,
        payload: null,
      };
    }
  }
}
