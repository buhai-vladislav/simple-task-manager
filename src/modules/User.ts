import { Module } from '@nestjs/common';
import { UserController } from '../controllers/User';
import { UserService } from '../services/User';
import { PrismaService } from '../services/Prisma';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
