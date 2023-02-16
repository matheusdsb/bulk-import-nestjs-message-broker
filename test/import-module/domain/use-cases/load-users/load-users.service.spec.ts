import { Test, TestingModule } from '@nestjs/testing';
import { UserModel } from '../../../../../src/import-module/domain/models/user-model';
import { ImportFilter } from '../../../../../src/import-module/domain/models/import-filter';
import { LoadUsersService } from '../../../../../src/import-module/domain/use-cases/load-users/load-users.service';

const makeFakeImportFilter = (): ImportFilter => ({
  idGreaterThan: 0,
  maxItems: 50,
});

const makeFakeUserModels = (): UserModel[] => {
  return [
    {
      id: 1,
      login: 'any_login',
      avatar: 'any_avatar',
      isAdmin: true,
    },
    {
      id: 2,
      login: 'other_login',
      avatar: 'other_avatar',
      isAdmin: false,
    },
  ];
};

const mockListUsersService = {
  list: async (filter: ImportFilter): Promise<UserModel[]> =>
    filter.idGreaterThan === 0 ? makeFakeUserModels() : [],
};

const mockSaveUserBroker = {
  send: (data: UserModel): void => {
    return;
  },
};

describe('LoadUsersService', () => {
  let sut: LoadUsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        LoadUsersService,
        {
          provide: 'ListUsersService',
          useFactory: () => mockListUsersService,
        },
        {
          provide: 'SaveUserBroker',
          useFactory: () => mockSaveUserBroker,
        },
      ],
    }).compile();

    sut = app.get<LoadUsersService>(LoadUsersService);
  });

  describe('sendUsersForSaving', () => {
    it('should call listUsersService.list with correct value', async () => {
      const listSitesSpy = jest.spyOn(mockListUsersService, 'list');
      const filter = makeFakeImportFilter();

      await sut.sendUsersForSaving(filter);

      expect(listSitesSpy).toHaveBeenCalledWith(filter);
    });

    it('should call saveUserBrokerClient.send exact times and with correct values', async () => {
      const sendSpy = jest.spyOn(mockSaveUserBroker, 'send');
      const filter = makeFakeImportFilter();
      const expectedItems = makeFakeUserModels();

      await sut.sendUsersForSaving(filter);

      expect(sendSpy).toHaveBeenCalledTimes(2);
      expect(sendSpy).toHaveBeenCalledWith(expectedItems[0]);
      expect(sendSpy).toHaveBeenCalledWith(expectedItems[1]);
    });
  });
});
