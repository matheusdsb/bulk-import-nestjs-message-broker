import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { ImportModel } from '../models/import-model';
import { ImportService } from '../../domain/use-cases/import/import.service';
import { CustomErrorFilter } from '../helpers/custom-error-filter';
import { ErrorResponseDto } from '../models/error-response-dto';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

@Controller('import')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Post()
  @UseFilters(new CustomErrorFilter())
  @ApiCreatedResponse({
    description: 'Succcesfull started the creation process',
  })
  @ApiBadRequestResponse({
    description: 'Some error occurred',
    type: ErrorResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected error occurred',
    type: ErrorResponseDto,
  })
  async import(@Body() model: ImportModel): Promise<void> {
    await this.importService.startImporting({
      idGreaterThan: model.idGreaterThan,
      maxItems: model.maxItems,
    });
  }
}
