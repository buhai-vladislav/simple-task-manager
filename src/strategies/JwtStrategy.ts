import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../types/JwtPayload';
import { PrismaService } from '../services/Prisma';
import { Inject } from '@nestjs/common/decorators';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET || 'SECRET',
    });
  }

  async validate(payload: JwtPayload) {
    const { id } = payload;

    const response = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!response) {
      throw new UnauthorizedException();
    }

    const user = { id: response.id, email: response.email };

    return user;
  }
}
