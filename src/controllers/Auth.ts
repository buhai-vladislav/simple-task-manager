import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { AuthService } from '../services/Auth';
import { SignupDto } from '../dtos/Signup';
import { PublicRoute } from '../guards/PublicRoute';
import { LoginDto } from '../dtos/Login';
import { RestePasswordDto } from '../dtos/ResetPassword';
import { TokenService } from '../services/Token';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @PublicRoute()
  @Post('/signup')
  public async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @PublicRoute()
  @Post('/signin')
  public async login(@Body() loginDto: LoginDto) {
    return this.authService.signin(loginDto);
  }

  @Put('/reset-password')
  public async resetPassword(@Body() resetPassDto: RestePasswordDto) {
    return this.authService.resetPassword(resetPassDto);
  }

  @PublicRoute()
  @Post('/token-pair/:token')
  public async createTokenPair(@Param('token') token: string) {
    return this.tokenService.getNewTokenPair(token);
  }

  @PublicRoute()
  @Post('/logout/:token')
  public async logout(@Param('token') token: string): Promise<boolean> {
    return this.authService.logout(token);
  }
}
