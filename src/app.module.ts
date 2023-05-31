import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ActivityModule } from './activity/activity.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [PrismaModule, ActivityModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
