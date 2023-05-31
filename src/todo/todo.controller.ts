import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
  UseFilters,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { TodoEntity } from './entities/todo.entity';
import { ActivityService } from '../activity/activity.service';
import { PrismaClientExceptionFilter } from '../prisma-client-exception/prisma-client-exception.filter';

@Controller('todo')
@ApiTags('todo')
@UseFilters(PrismaClientExceptionFilter)
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly activityService: ActivityService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: TodoEntity })
  async create(@Body() createTodoDto: CreateTodoDto) {
    const activity = await this.activityService.findOne(
      createTodoDto.activity_group_id,
    );
    if (!activity) {
      throw new NotFoundException(
        `Activity ${createTodoDto.activity_group_id} not found`,
      );
    }
    return this.todoService.create(createTodoDto);
  }

  @Get(':id')
  @ApiCreatedResponse({ type: TodoEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const todo = await this.todoService.findOne(id);
    if (!todo) {
      throw new NotFoundException(`Todo ${id} not found`);
    }
    return todo;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: TodoEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    const todo = await this.todoService.findOne(id);
    if (!todo) {
      throw new NotFoundException(`Todo ${id} not found`);
    }
    return await this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: TodoEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const todo = await this.todoService.findOne(id);
    if (!todo) {
      throw new NotFoundException(`Todo ${id} not found`);
    }
    return await this.todoService.remove(+id);
  }
}
