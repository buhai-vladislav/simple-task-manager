import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from './Prisma';
import { JwtService } from '@nestjs/jwt';
import { ITokenPair } from '../types/TokenPair';
import { IJwtPayload } from '../types/JwtPayload';

@Injectable()
export class TokenService {
  constructor(
    private readonly prismaSerice: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public async createTokenPair(payload: IJwtPayload): Promise<ITokenPair> {
    try {
      const accessToken = await this.jwtService.signAsync(payload);
      const refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      });

      return { accessToken, refreshToken };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async getNewTokenPair(refreshToken: string): Promise<ITokenPair> {
    try {
      const token = await this.prismaSerice.token.findUnique({
        where: { token: refreshToken },
      });
      const payload = await this.verifyToken(token.token);

      const tokenPair = await this.createTokenPair({
        id: payload.id,
        email: payload.email,
      });
      await this.prismaSerice.token.update({
        where: { token: refreshToken },
        data: { token: tokenPair.refreshToken },
      });

      return tokenPair;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async verifyToken(token: string): Promise<IJwtPayload> {
    try {
      const payload = await this.jwtService.verifyAsync(token);

      if (!payload) {
        throw new BadRequestException('Token is expired.');
      }

      return payload;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
