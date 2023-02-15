import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class IPaginationOptions {
  @ApiProperty({
    name: 'offset',
    type: Number,
    description: 'Number of items per page',
    required: false,
    minimum: 1,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(30)
  offset? = 10;

  @ApiProperty({
    name: 'page',
    type: Number,
    description: 'Page thats going to be show',
    required: false,
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page? = 1;
}
