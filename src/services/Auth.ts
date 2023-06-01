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
import { IJwtPayload } from '../types/JwtPayload';
import { RestePasswordDto } from '../dtos/ResetPassword';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
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
      throw new BadRequestException(JSON.stringify(error));
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

  public async signin(signinDto: LoginDto) {
    const user = await this.validateUser(signinDto);

    if (user !== null) {
      const { email } = signinDto;
      const payload: IJwtPayload = { id: user.id, email };

      const tokenPair = await this.tokenService.createTokenPair(payload);
      await this.prismaService.token.create({
        data: { token: tokenPair.refreshToken },
      });

      return { user, ...tokenPair };
    } else {
      throw new UnauthorizedException(UNAUTH_MESSAGE);
    }
  }

  public async resetPassword(resetPassDto: RestePasswordDto) {
    const { id, password } = resetPassDto;
    const user = await this.userService.findOne({ id });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const passwordHash = await AuthUtils.generatePasswordHash(password);
    await this.userService.updateUser({ id }, { password: passwordHash });

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
      throw new BadRequestException(JSON.stringify(error));
    }
  }
}
