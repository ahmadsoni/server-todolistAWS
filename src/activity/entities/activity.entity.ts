import { ApiProperty } from '@nestjs/swagger';
import { Activity } from '@prisma/client';
export class ActivityEntity implements Activity {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
