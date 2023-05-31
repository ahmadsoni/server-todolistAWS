import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsNotEmpty } from 'class-validator';
export class CreateActivityDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @ApiProperty()
  title: string;
}
