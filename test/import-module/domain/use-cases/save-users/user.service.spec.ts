import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseError } from '../../../../../src/import-module/domain/models/database-error';
import { User } from '../../../../../src/import-module/domain/entities/user';
import { UserService } from '../../../../../src/import-module/domain/use-cases/save-users/user.service';

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

const mockUserRepository = {
  insertMany: async (users: User[]): Promise<void> => {
    return;
  },
  findById: async (ids: number): Promise<User> => {
    return makeFakeUsers()[0];
  },
  updateMany: async (users: User[]): Promise<void> => {
    return;
  },
};

describe('UserService', () => {
  let sut: UserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'UserRepository',
          useFactory: () => mockUserRepository,
        },
      ],
    }).compile();

    sut = app.get<UserService>(UserService);
  });

  describe('create', () => {
    it('Should call userRepository.insertMany with correct values', async () => {
      const users = makeFakeUsers();
      const insertManySpy = jest.spyOn(mockUserRepository, 'insertMany');

      await sut.create(users);

      expect(insertManySpy).toHaveBeenCalledWith(users);
    });

    it('should throw a DatabaseError if insertMany throws', async () => {
      const error = new Error('any_error');
      jest
        .spyOn(mockUserRepository, 'insertMany')
        .mockImplementationOnce(() => {
          throw error;
        });
      const users = makeFakeUsers();

      const promise = sut.create(users);

      expect(promise).rejects.toThrow(DatabaseError);
    });
  });

  describe('findOne', () => {
    it('should call userRepository.findById with correct value', async () => {
      const id = 1;
      const findByIdSpy = jest.spyOn(mockUserRepository, 'findById');

      await sut.findOne(id);

      expect(findByIdSpy).toHaveBeenCalledWith(id);
    });

    it('should return what userRepository.findById returns', async () => {
      const expected = makeFakeUsers()[0];
      const actual = await sut.findOne(1);
      expect(actual).toEqual(expected);
    });

    it('should throw a DatabaseError if findById throws', async () => {
      const error = new Error('any_error');
      jest.spyOn(mockUserRepository, 'findById').mockImplementationOnce(() => {
        throw error;
      });

      const promise = sut.findOne(1);

      expect(promise).rejects.toThrow(DatabaseError);
    });
  });

  describe('update', () => {
    it('should call userRepository.updateMany with correct value', async () => {
      const users = makeFakeUsers();
      const updateManySpy = jest.spyOn(mockUserRepository, 'updateMany');

      await sut.update(users);

      expect(updateManySpy).toHaveBeenCalledWith(users);
    });

    it('should throw a DatabaseError if updateMany throws', async () => {
      const error = new Error('any_error');
      jest
        .spyOn(mockUserRepository, 'updateMany')
        .mockImplementationOnce(() => {
          throw error;
        });

      const promise = sut.update([]);

      expect(promise).rejects.toThrow(DatabaseError);
    });
  });
});
