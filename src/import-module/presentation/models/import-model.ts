import { IsNotEmpty, IsNumber, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ImportModel {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    required: false,
    description: 'Import only items with id greater than the specified',
    example: 2,
  })
  idGreaterThan: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    required: true,
    description: 'Maximum number of items to import',
    example: 50,
  })
  maxItems: number;
}
