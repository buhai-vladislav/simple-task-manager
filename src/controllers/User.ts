import { Body, Controller, Get, Param, Put, Req } from '@nestjs/common';
import { UserService } from '../services/User';
import { UpdateUserDto } from '../dtos/User';
import { User } from '@prisma/client';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/myself')
  public async getMuSelf(@Req() request: any): Promise<Partial<User>> {
    const id = request?.user?.id;
    return this.userService.findOne({ id });
  }

  @Put()
  public async updateUser(
    @Req() request: any,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const id = request?.user?.id;
    return this.userService.updateUser({ id }, updateUserDto);
  }
}
