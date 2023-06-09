import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}
  create(createTodoDto: CreateTodoDto) {
    return this.prisma.todo.create({
      data: createTodoDto,
    });
  }

  findOne(id: number) {
    return this.prisma.todo.findUnique({
      where: { id },
    });
  }
  findByActivityId(activity_group_id: number) {
    return this.prisma.todo.findMany({
      where: { activity_group_id },
    });
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.prisma.todo.update({
      where: { id },
      data: updateTodoDto,
    });
  }
  remove(id: number) {
    return this.prisma.todo.delete({
      where: { id },
    });
  }
}
