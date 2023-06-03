import { ApiProperty } from '@nestjs/swagger';
import { Todo } from '@prisma/client';
export class TodoEntity implements Todo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  activity_group_id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}
