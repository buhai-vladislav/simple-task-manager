import { Body, Controller, Get, HttpStatus, Put, Req } from '@nestjs/common';
import { UserService } from '../services/User';
import { UpdateUserDto } from '../dtos/User';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../types/User';

@ApiTags('Users')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    description: 'Endpoint for getting user data.',
    operationId: 'getMySelfAction',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user successfully retrived.',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "The user wasn't found, or something went wrong.",
  })
  @Get('/myself')
  public async getMySelf(@Req() request: any): Promise<Partial<User>> {
    const id = request?.user?.id;
    return this.userService.findOne({ id });
  }

  @ApiOperation({
    description: 'Endpoint for updating user.',
    operationId: 'updateUserAction',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user successfully updated.',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "The user wasn't updated, or something went wrong.",
  })
  @ApiBody({ type: UpdateUserDto })
  @Put()
  public async updateUser(
    @Req() request: any,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Partial<User>> {
    const id = request?.user?.id;
    return this.userService.updateUser({ id }, updateUserDto);
  }
}
