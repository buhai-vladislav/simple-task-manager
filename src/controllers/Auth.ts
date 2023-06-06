import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { AuthService } from '../services/Auth';
import { SignupDto } from '../dtos/Signup';
import { PublicRoute } from '../guards/PublicRoute';
import { LoginDto } from '../dtos/Login';
import { ResetPasswordDto } from '../dtos/ResetPassword';
import { TokenService } from '../services/Token';
import { ForgotPasswordDto } from '../dtos/ForgotPassword';
import { Request } from 'express';
import { SigninResponse } from '../types/Auth';
import { TokenPair } from '../types/TokenPair';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @ApiOperation({
    description: 'Endpoint for signup process of a new user.',
    operationId: 'signupAction',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user successfully created',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "The user wasn't created, or something went wrong",
  })
  @ApiBody({ type: SignupDto })
  @PublicRoute()
  @Post('/signup')
  public async signup(@Body() signupDto: SignupDto): Promise<string> {
    return this.authService.signup(signupDto);
  }

  @ApiOperation({
    description:
      'Endpoint for login process by creadentials and getting tokens.',
    operationId: 'signinAction',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user successfully login.',
    type: SigninResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description:
      'The user login or password is not correct, or something went wrong.',
  })
  @ApiBody({ type: LoginDto })
  @PublicRoute()
  @Post('/signin')
  public async login(@Body() loginDto: LoginDto): Promise<SigninResponse> {
    return this.authService.signin(loginDto);
  }

  @ApiOperation({
    description: 'Endpoint for reset password by token and new password.',
    operationId: 'resetPasswordAction',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The password successfully chnaged.',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'The password changing process failed, or something went wrong.',
  })
  @ApiQuery({
    description:
      'Token to verify reset password process from forgot-password action.',
    name: 'token',
  })
  @ApiBody({ type: ResetPasswordDto })
  @PublicRoute()
  @Put('/reset-password')
  public async resetPassword(
    @Query('token') token: string,
    @Body() resetPassDto: ResetPasswordDto,
  ): Promise<string> {
    return this.authService.resetPassword(resetPassDto, token);
  }

  @ApiOperation({
    description: 'Endpoint for getting new token pair.',
    operationId: 'createTokenPairAction',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The token successfully received.',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The token getting process failed, or something went wrong.',
  })
  @ApiParam({
    description: 'Refresh token to get new token pair.',
    name: 'token',
  })
  @PublicRoute()
  @Post('/token-pair/:token')
  public async createTokenPair(
    @Param('token') token: string,
  ): Promise<TokenPair> {
    return this.tokenService.getNewTokenPair(token);
  }

  @ApiOperation({
    description: 'Endpoint to logout.',
    operationId: 'createTokenPairAction',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The logout action was successful.',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The logout action failed.',
  })
  @ApiParam({
    description:
      'Refresh token to logout and remove it from db, or something went wrong.',
    name: 'token',
  })
  @PublicRoute()
  @Post('/logout/:token')
  public async logout(@Param('token') token: string): Promise<boolean> {
    return this.authService.logout(token);
  }

  @ApiOperation({
    description: 'Endpoint for sending email with reset password link.',
    operationId: 'forgotPasswordAction',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'The reset password link was successfully created and sent by email.',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The forgot password process failed, or something went wrong.',
  })
  @ApiBody({ type: ForgotPasswordDto })
  @PublicRoute()
  @Post('/forgot-password')
  public async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
    @Req() request: Request,
  ): Promise<string> {
    return this.authService.forgotPassword(forgotPasswordDto.email, request);
  }
}
