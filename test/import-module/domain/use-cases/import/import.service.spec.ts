import { Test, TestingModule } from '@nestjs/testing';
import { ImportService } from '../../../../../src/import-module/domain/use-cases/import/import.service';
import { ImportFilter } from '../../../../../src/import-module/domain/models/import-filter';

const makeFakeImportFilter = (): ImportFilter => ({
  idGreaterThan: 2,
  maxItems: 50,
});

const mockLoadUsersBroker = {
  send: (data: ImportFilter): void => {
    return;
  },
};

describe('ImportService', () => {
  let sut: ImportService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ImportService,
        {
          provide: 'LoadUsersBroker',
          useFactory: () => mockLoadUsersBroker,
        },
      ],
    }).compile();

    sut = app.get<ImportService>(ImportService);
  });

  describe('startImporting', () => {
    describe('loadUsersBrokerClient.send', () => {
      it('should been called with the correct values', () => {
        const importFilter = makeFakeImportFilter();
        const sendSpy = jest.spyOn(mockLoadUsersBroker, 'send');

        sut.startImporting(importFilter);

        expect(sendSpy).toHaveBeenCalledWith(importFilter);
      });
    });
  });
});
