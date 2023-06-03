import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ActivityService } from '../activity/activity.service';
@Module({
  controllers: [TodoController],
  providers: [ActivityService, TodoService],
  imports: [PrismaModule],
})
export class TodoModule {}
