import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ description: 'status code', example: 401 })
  statusCode: number;

  @ApiProperty({ example: '2022-05-23 15:00:59.999' })
  timestamp: string;

  @ApiProperty()
  path: string;

  @ApiProperty()
  message: string;
}
