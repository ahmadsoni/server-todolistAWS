import { ApiProperty } from '@nestjs/swagger';
type PriorityProps = 'LOW' | 'MEDIUM' | 'HIGH';
enum PriorityType {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}
import {
  IsString,
  MinLength,
  IsNumber,
  IsNotEmpty,
  IsEnum,
  IsBoolean,
} from 'class-validator';

export class CreateTodoDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  activity_group_id: number;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(PriorityType)
  @ApiProperty()
  priority: PriorityProps;

  @IsBoolean()
  @ApiProperty()
  active: boolean;
}
