import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '../controllers/Auth';
import { PrismaService } from '../services/Prisma';
import { TokenService } from '../services/Token';
import { UserService } from '../services/User';
import { JwtStrategy } from '../strategies/JwtStrategy';
import { AuthService } from 'src/services/Auth';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: ['jwt'],
      property: 'user',
    }),
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV
        ? `.${process.env.NODE_ENV}.env`
        : '.env',
    }),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET || 'SECRET',
      signOptions: {
        expiresIn: process.env.TOKEN_EXPIRATION_TIME || '24h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    JwtStrategy,
    TokenService,
    UserService,
    AuthService,
  ],
})
export class AuthModule {}
