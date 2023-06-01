import { Module } from '@nestjs/common';
import { TaskController } from '../controllers/Task';
import { PrismaService } from '../services/Prisma';
import { TaskService } from '../services/Task';
import { ChecklistController } from '../controllers/Checklist';

@Module({
  controllers: [TaskController, ChecklistController],
  providers: [TaskService, PrismaService],
})
export class TaskModule {}
