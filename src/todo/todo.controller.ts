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
  Query,
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
    createTodoDto.active = true;
    const response = await this.todoService.create(createTodoDto);
    if (!response) {
      throw new Error('Todo not created');
    }
    return response;
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
  @Get()
  @ApiCreatedResponse({ type: TodoEntity })
  async findByActivityId(@Query('activity_group_id', ParseIntPipe) id: number) {
    return await this.todoService.findByActivityId(id);
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
