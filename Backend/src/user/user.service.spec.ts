import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonService } from '../common/common.service';
import { UserNetworkTypeEnum } from './enums/user-network-type.enum';
import { UserRoleEnum } from './enums/user-role.enum';
import { User } from './user.entity';
import { UserService } from './user.service';
import { v4 as uuid } from 'uuid';
import {
  BadRequestException,
  ConflictException,
  HttpModule,
} from '@nestjs/common';
import { UpdateProfileInput } from './inputs/update-profile.input';
import { CreateUserInput } from './inputs/create-user.input';
import { ChangePasswordRequestInput } from './inputs/change-password-request.input';
import { ChangePasswordInput } from './inputs/change-password.input';
import { IceVehicle } from '../vehicle/types/ice-vehicle.type';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

export const mockRepository = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
  save: jest.fn(entity => entity),
  create: jest.fn(entity => entity),
  metadata: {
    columns: [],
    relations: [],
  },
}));

export const mockCommonService = jest.fn(() => ({
  sendEmail: jest.fn(entity => true),
  uploadFromB64: jest.fn(entity => true),
}));

describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockType<Repository<User>>;
  let newUser: User;
  const id: string = uuid();
  const token: string = uuid();
  const storedUser: User = {
    email: 'test@test.com',
    role: UserRoleEnum.USER,
    active: true,
    deleted: false,
    networkType: UserNetworkTypeEnum.QMOBILITY,
    vehicles: [],
    _id: id,
    id,
  };

  const mediumStoredUser: User = {
    name: 'sophie',
    email: 'test@test.com',
    role: UserRoleEnum.USER,
    active: true,
    deleted: false,
    networkType: UserNetworkTypeEnum.QMOBILITY,
    _id: id,
    id,
  };

  const fullStoredUser: User = {
    name: 'sophie',
    lastname: 'some lastname',
    email: 'sophie@email.com',
    username: 'somebody',
    dateOfBirth: new Date(),
    selectedVehicle: 1139,
    iceVehicle: new IceVehicle(),
    phone: '+569765287',
    active: true,
    deleted: false,
    vehicles: [1138],
    avatarUrl: 'https://someurl.com/',
    role: UserRoleEnum.USER,
    networkType: UserNetworkTypeEnum.QMOBILITY,
    _id: id,
    id,
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: CommonService, useClass: mockCommonService },
        {
          provide: getRepositoryToken(User),
          useClass: mockRepository,
        },
      ],
      imports: [HttpModule],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(User));
  });

  it('userService should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create a user with Qmobility account', async () => {
    const createUserInput: CreateUserInput = {
      email: 'test2@test.com',
      password: 'M2d9d3eac!',
      networkType: UserNetworkTypeEnum.QMOBILITY,
    };
    userRepository.findOne.mockReturnValue(undefined);
    newUser = await userService.createUser(createUserInput);
    expect(userRepository.findOne).toHaveBeenCalledWith({
      email: createUserInput.email,
      deleted: false,
    });
    expect(newUser.email).toEqual(createUserInput.email);
  });

  it('should crete a user with SocialNetwork account', async () => {
    const createUserInput: CreateUserInput = {
      email: 'test2@test.com',
      password: 'M2d9d3eac!',
      role: UserRoleEnum.USER,
      networkType: UserNetworkTypeEnum.FACEBOOK,
    };
    userRepository.findOne.mockReturnValue(undefined);
    newUser = await userService.createUser(createUserInput);
    expect(userRepository.findOne).toHaveBeenCalledWith({
      email: createUserInput.email,
      deleted: false,
    });
    expect(newUser.email).toEqual(createUserInput.email);
  });

  it('should validate if user already exists', async () => {
    const createUserInput: CreateUserInput = {
      email: 'test@test.com',
      password: 'M2d9d3eac!',
    };
    userRepository.findOne.mockReturnValue(storedUser);

    expect(userService.createUser(createUserInput)).rejects.toThrow(
      ConflictException,
    );
    expect(userRepository.findOne).toHaveBeenCalledWith({
      email: createUserInput.email,
      deleted: false,
    });
  });

  it('should find a user', async () => {
    userRepository.findOne.mockReturnValue(storedUser);
    expect(await userService.getUser(storedUser.id)).toEqual(storedUser);
    expect(userRepository.findOne).toHaveBeenCalledWith({
      id: storedUser.id,
      deleted: false,
    });
  });

  it('should update a user', async () => {
    storedUser.username = 'mary';
    userRepository.save.mockReturnValue(storedUser);
    expect((await userService.updateUser(storedUser)).username).toEqual('mary');
    expect(userRepository.save).toHaveBeenCalledWith(storedUser);
  });

  it('should not udpdate attributes from user', async () => {
    const updateProfileInput: UpdateProfileInput = {
      name: null,
      lastname: null,
      email: null,
      username: null,
      dateOfBirth: null,
      selectedVehicle: null,
      iceVehicle: null,
      phone: null,
      avatarUrl: null,
    };
    userRepository.save.mockReturnValue(fullStoredUser);
    expect(
      (await userService.updateProfile(updateProfileInput, fullStoredUser))
        .name,
    ).toEqual('sophie');
    expect(userRepository.save).toHaveBeenCalledWith(fullStoredUser);
  });

  it('should updateProfile at least one attrib from a user', async () => {
    const updateProfileInput: UpdateProfileInput = {
      name: 'sarah',
      lastname: null,
      email: null,
      username: null,
      dateOfBirth: null,
      selectedVehicle: null,
      iceVehicle: null,
      phone: null,
      avatarUrl: null,
    };
    userRepository.save.mockReturnValue(fullStoredUser);
    expect(
      (await userService.updateProfile(updateProfileInput, fullStoredUser))
        .name,
    ).toEqual('sarah');
    expect(userRepository.save).toHaveBeenCalledWith(fullStoredUser);
  });

  it('should updateProfile with avatarUrl', async () => {
    const updateProfileInput: UpdateProfileInput = {
      name: 'sophie',
      lastname: 'some lastname',
      email: 'sophie@email.com',
      username: 'somebody',
      dateOfBirth: new Date(),
      selectedVehicle: 1139,
      iceVehicle: new IceVehicle(),
      phone: '+569765287',
      avatarUrl: 'https://someurl.com/',
    };
    userRepository.save.mockReturnValue(storedUser);
    expect(
      (await userService.updateProfile(updateProfileInput, storedUser)).name,
    ).toEqual('sophie');
    expect(userRepository.save).toHaveBeenCalledWith(storedUser);
  });

  it('should updateProfile with avatarUrl Base64', async () => {
    const updateProfileInput: UpdateProfileInput = {
      name: 'sophie',
      avatarUrl:
        'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
    };
    userRepository.save.mockReturnValue(mediumStoredUser);
    expect(
      (await userService.updateProfile(updateProfileInput, mediumStoredUser))
        .name,
    ).toEqual('sophie');
    expect(userRepository.save).toHaveBeenCalledWith(mediumStoredUser);
  });

  it('should be searched by username', async () => {
    userRepository.findOne.mockReturnValue(storedUser);
    expect(await userService.getUserByUserName('mary')).toEqual(storedUser);
    expect(userRepository.findOne).toHaveBeenCalledWith({
      username: 'mary',
      deleted: false,
    });
  });

  it('should be searched by email', async () => {
    userRepository.findOne.mockReturnValue(storedUser);
    expect(await userService.getUserByEmail('test@test.com')).toEqual(
      storedUser,
    );
    expect(userRepository.findOne).toHaveBeenCalledWith({
      email: 'test@test.com',
      deleted: false,
    });
  });

  it('should be mark as deleted', async () => {
    userRepository.save.mockReturnValue(storedUser);
    expect(await userService.deleteAccount(storedUser)).toEqual(true);
    expect(userRepository.save).toHaveBeenCalledWith(storedUser);
  });
});
