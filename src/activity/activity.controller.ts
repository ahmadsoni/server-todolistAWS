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
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ActivityEntity } from './entities/activity.entity';
import { PrismaClientExceptionFilter } from '../prisma-client-exception/prisma-client-exception.filter';

@Controller('activity')
@ApiTags('activity')
@UseFilters(PrismaClientExceptionFilter)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  @ApiCreatedResponse({ type: ActivityEntity })
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activityService.create(createActivityDto);
  }

  @Get()
  @ApiCreatedResponse({ type: ActivityEntity })
  async findAll() {
    const activity = await this.activityService.findAll();
    if (activity.length === 0) {
      throw new NotFoundException(`Activity not found`);
    }
    return activity;
  }

  @Get(':id')
  @ApiCreatedResponse({ type: ActivityEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const activity = await this.activityService.findOne(id);
    if (!activity) {
      throw new NotFoundException(`Activity ${id} not found`);
    }
    return activity;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ActivityEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    const activity = await this.activityService.findOne(id);
    if (!activity) {
      throw new NotFoundException(`Activity ${id} not found`);
    }
    return await this.activityService.update(id, updateActivityDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: ActivityEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const activity = await this.activityService.findOne(id);
    if (!activity) {
      throw new NotFoundException(`Activity ${id} not found`);
    }

    return await this.activityService.remove(id);
  }
}
