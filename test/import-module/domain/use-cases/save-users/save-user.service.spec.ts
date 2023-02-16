import { Test, TestingModule } from '@nestjs/testing';
import { SaveUserService } from '../../../../../src/import-module/domain/use-cases/save-users/save-user.service';
import { User } from '../../../../../src/import-module/domain/entities/user';
import { UserService } from '../../../../../src/import-module/domain/use-cases/save-users/user.service';

const makeFakeUser = (): User => makeFakeUsers()[0];

const makeFakeUsers = (): User[] => {
  const obj = new User();
  obj.id = 1;
  obj.login = 'any_login';
  obj.avatar = 'any_avatar';
  obj.isAdmin = true;

  const obj2 = new User();
  obj2.id = 2;
  obj2.login = 'other_login';
  obj2.avatar = 'other_avatar';
  obj2.isAdmin = false;

  return [obj, obj2];
};

const mockUserService = {
  findOne: async (id: number): Promise<User> => {
    return makeFakeUser();
  },
  create: async (users: User[]): Promise<void> => {
    return;
  },
  update: async (users: User[]): Promise<void> => {
    return;
  },
};

describe('SaveUserService', () => {
  let sut: SaveUserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        SaveUserService,
        {
          provide: UserService,
          useFactory: () => mockUserService,
        },
      ],
    }).compile();

    sut = app.get<SaveUserService>(SaveUserService);
  });

  describe('save', () => {
    it('should call userService.findOne with correct value', async () => {
      const user = new User();
      user.id = 20;
      const findOneSpy = jest.spyOn(mockUserService, 'findOne');

      await sut.save(user);

      expect(findOneSpy).toHaveBeenCalledWith(user.id);
    });

    describe('findOne returns existing item', () => {
      let updateSpy: jest.SpyInstance;
      let createSpy: jest.SpyInstance;

      beforeEach(() => {
        updateSpy = jest.spyOn(mockUserService, 'update');
        createSpy = jest.spyOn(mockUserService, 'create');
      });

      afterEach(() => {
        updateSpy.mockClear();
        createSpy.mockClear();
      });

      it('should call userService.update', async () => {
        const user = makeFakeUser();
        await sut.save(user);

        expect(updateSpy).toHaveBeenCalledWith([user]);
        expect(createSpy).toHaveBeenCalledTimes(0);
      });
    });

    it('should call userService.create with correct value if findOne returns null', async () => {
      jest
        .spyOn(mockUserService, 'findOne')
        .mockReturnValueOnce(Promise.resolve(null));
      const updateSpy = jest.spyOn(mockUserService, 'update');
      const createSpy = jest.spyOn(mockUserService, 'create');
      const user = makeFakeUser();

      await sut.save(user);

      expect(updateSpy).toHaveBeenCalledTimes(0);
      expect(createSpy).toHaveBeenCalledWith([user]);

      updateSpy.mockClear();
      createSpy.mockClear();
    });
  });
});
