import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from './Prisma';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public async createUser(
    userData: Prisma.UserCreateInput,
  ): Promise<Partial<User>> {
    try {
      const user = await this.prismaService.user.create({ data: userData });
      const { password, ...filteredUser } = user;

      return filteredUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async findOne(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<Partial<User>> {
    try {
      const user = await this.prismaService.user.findUnique({ where });

      if (!user) {
        throw new NotFoundException('User not found.');
      }
      const { password, ...filteredUser } = user;
      return filteredUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async updateUser(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ): Promise<Partial<User>> {
    try {
      const user = await this.prismaService.user.update({ where, data });
      const { password, ...filteredUser } = user;

      return filteredUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
