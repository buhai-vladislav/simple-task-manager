import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './User';
import { User } from '@prisma/client';
import { PrismaService } from './Prisma';
import { AuthUtils } from '../utils/Auth';
import { UNAUTH_MESSAGE } from '../utils/constants';
import { LoginDto } from '../dtos/Login';
import { SignupDto } from '../dtos/Signup';
import { TokenService } from './Token';
import { ResetPasswordDto } from '../dtos/ResetPassword';
import { MailService } from './Mail';
import { JwtPayload } from '../types/JwtPayload';
import type { Request } from 'express';
import { SigninResponse } from '../types/Auth';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService,
  ) {}

  public async signup(userData: SignupDto): Promise<string> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email: userData.email },
      });

      if (user) {
        throw new BadRequestException('User already exist.');
      }
      const passwordHash = await AuthUtils.generatePasswordHash(
        userData.password,
      );
      await this.userService.createUser({
        ...userData,
        password: passwordHash,
      });

      return 'User successfully registered.';
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async validateUser(loginDto: LoginDto): Promise<Partial<User> | null> {
    const { email, password } = loginDto;
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    const isValid = await AuthUtils.checkPassword(password, user.password);

    if (isValid) {
      const { password, ...filteredUser } = user;
      return filteredUser;
    }

    return null;
  }

  public async signin(signinDto: LoginDto): Promise<SigninResponse> {
    const user = await this.validateUser(signinDto);

    if (user !== null) {
      const { email } = signinDto;
      const payload: JwtPayload = { id: user.id, email };

      const tokenPair = await this.tokenService.createTokenPair(payload);
      await this.prismaService.token.create({
        data: { token: tokenPair.refreshToken },
      });

      return { user, ...tokenPair };
    } else {
      throw new UnauthorizedException(UNAUTH_MESSAGE);
    }
  }

  public async resetPassword(
    resetPassDto: ResetPasswordDto,
    token: string,
  ): Promise<string> {
    const storedToken = await this.prismaService.token.findUnique({
      where: { token },
    });

    if (!storedToken) {
      throw new BadRequestException('Token is expired.');
    }

    const { id } = await this.tokenService.verifyToken(token);
    const user = await this.userService.findOne({ id });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const passwordHash = await AuthUtils.generatePasswordHash(
      resetPassDto.password,
    );
    await Promise.all([
      this.userService.updateUser({ id }, { password: passwordHash }),
      this.prismaService.token.delete({ where: { token } }),
    ]);

    return 'The password was reset.';
  }

  public async logout(refreshToken: string): Promise<boolean> {
    try {
      const token = await this.prismaService.token.delete({
        where: {
          token: refreshToken,
        },
      });

      return !!token;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async forgotPassword(
    email: string,
    request: Request,
  ): Promise<string> {
    try {
      const user = await this.userService.findOne({ email });

      if (!user) {
        throw new BadRequestException('User not found!');
      }

      const { accessToken } = await this.tokenService.createTokenPair({
        id: user.id,
        email,
      });
      await this.prismaService.token.create({ data: { token: accessToken } });

      const link = `${process.env.FRONTEND_URL}/reset-password?token=${accessToken}`;

      await this.mailService.sendMail({
        to: email,
        subject: 'Reset password',
        html: `Link: ${link}`,
      });

      return 'The reset password link send to your email.';
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
