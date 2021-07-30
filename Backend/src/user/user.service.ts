import { Repository } from 'typeorm';
import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserInput } from './inputs/create-user.input';
import { ChangePasswordRequestInput } from './inputs/change-password-request.input';
import { CommonService } from '../common/common.service';
import { SendEmailDto, Tos } from '../common/dto/send-email.dto';
import { ChangePasswordInput } from './inputs/change-password.input';
import { UserNetworkTypeEnum } from './enums/user-network-type.enum';
import { UpdateProfileInput } from './inputs/update-profile.input';
import { UserRoleEnum } from './enums/user-role.enum';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';
import * as config from 'config';
import { UserInputError } from 'apollo-server-express';
import { ValidateTokenInput } from './inputs/validate-token.input';

const emailTemplate = config.get('emailTemplate');
const siteConfig = config.get('site');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private commonService: CommonService,
  ) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const {
      name,
      lastname,
      email,
      password,
      role,
      active,
      networkType,
    } = createUserInput;

    const storedUser = await this.getUserByEmail(email);

    if (storedUser)
      throw new ConflictException(`already exists a user with email ${email}`);

    let user: User = this.userRepository.create({
      id: uuid(),
      name,
      lastname,
      email,
      role,
      active,
      networkType,
      deleted: false,
    });

    // * if user is created with a Qmobility account we need to send confirmation email
    if (!networkType || networkType === UserNetworkTypeEnum.QMOBILITY) {
      user.password = await bcrypt.hash(password, 11);
      user.networkType = UserNetworkTypeEnum.QMOBILITY;
      user.role = UserRoleEnum.USER;
      user.active = false;

      const random4digits = Math.floor(1000 + Math.random() * 9000);
      user.random4digits = random4digits;

      const storedUser = this.userRepository.save(user);

      const dynamic_template_data = {
        username: user.name,
        number: random4digits,
      };

      const sendEmailDto: SendEmailDto = {
        to: [new Tos(user.email, user.name)],
        dynamic_template_data,
        templateId: emailTemplate.qAccountConfirmationTemplate,
      };

      this.commonService.sendEmail(sendEmailDto);

      return storedUser;
    }

    const dynamic_template_data = {
      username: user.name,
    };

    const sendEmailDto: SendEmailDto = {
      to: [new Tos(user.email, user.name)],
      dynamic_template_data,
      templateId: emailTemplate.qWelcomeTemplate,
    };

    this.commonService.sendEmail(sendEmailDto);

    return this.userRepository.save(user);
  }

  async updateProfile(
    {
      name,
      lastname,
      email,
      username,
      dateOfBirth,
      selectedVehicle,
      avatarUrl,
      iceVehicle,
      phone,
      phoneCountry,
      phoneCountryCode,
    }: UpdateProfileInput,
    user: User,
  ): Promise<User> {
    user.name = name || user.name;
    user.lastname = lastname || user.lastname;
    user.email = email || user.email;
    user.username = username || user.username;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.selectedVehicle = selectedVehicle || user.selectedVehicle;
    user.iceVehicle =
      iceVehicle === null ? null : iceVehicle ? iceVehicle : user.iceVehicle;
    user.phone = phone || user.phone;
    user.phoneCountryCode = phoneCountryCode || user.phoneCountryCode;
    user.phoneCountry = phoneCountry || user.phoneCountry;

    if (avatarUrl) {
      const matches = avatarUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      // ! avoid store base64 in mongo ~
      if (matches && matches[0].includes('base64')) {
        user.avatarUrl = await this.commonService.uploadFromB64(
          avatarUrl,
          `${user.id}.${matches[1].split('/')[1]}`,
          `${user.id}/profile`,
        );
      }
    }

    if (!user.vehicles) {
      user.vehicles = [];
    }

    if (!user.vehicles.includes(selectedVehicle))
      user.vehicles.push(selectedVehicle);

    return this.userRepository.save(user);
  }

  async updateUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async getUser(id: string): Promise<User> {
    return this.userRepository.findOne({ id, deleted: false });
  }

  async getUserByUserName(username: string): Promise<User> {
    return this.userRepository.findOne({ username, deleted: false });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email, deleted: false });
  }

  async deleteAccount(user: User): Promise<boolean> {
    user.deleted = true;
    user.deletedAt = new Date();
    await this.userRepository.save(user);

    return true;
  }

  async passwordReset(
    passwordRecovery: ChangePasswordRequestInput,
  ): Promise<User> {
    const { email } = passwordRecovery;
    const storedUser = await this.userRepository.findOne({ email });

    if (!storedUser)
      throw new UserInputError(`there's no user with email ${email}`);

    const token = `${Math.floor(1000 + Math.random() * 9000)}`;

    storedUser.recoveryPasswordToken = token;

    const dynamic_template_data = {
      username: storedUser.name,
      token,
    };

    const sendEmailDto: SendEmailDto = {
      to: [new Tos(storedUser.email, storedUser.name)],
      dynamic_template_data,
      templateId: emailTemplate.qResetPasswordTemplate,
    };

    this.commonService.sendEmail(sendEmailDto);
    this.userRepository.save(storedUser);

    return storedUser;
  }

  async validateToken({ userId, token }: ValidateTokenInput): Promise<boolean> {
    const storedUser = await this.userRepository.findOne({ id: userId });

    if (!storedUser || storedUser.recoveryPasswordToken !== token)
      throw new UserInputError(`User or recovery password are incorrect!`);

    return true;
  }

  async doPasswordReset(changePassword: ChangePasswordInput): Promise<User> {
    const { userId, password } = changePassword;

    const storedUser = await this.userRepository.findOne({ id: userId });

    if (!storedUser)
      throw new UserInputError(`there's no user with userId ${userId}`);

    const hashedPassword = await bcrypt.hash(password, 11);

    storedUser.password = hashedPassword;

    const sendEmailDto: SendEmailDto = {
      to: [new Tos(storedUser.email, storedUser.name)],
      dynamic_template_data: {
        user_name: storedUser.name,
      },
      templateId: emailTemplate.qResetPasswordSucceed,
    };

    this.commonService.sendEmail(sendEmailDto);

    storedUser.recoveryPasswordToken = uuid();

    // * in this case we also active the user account
    storedUser.active = true;

    return this.userRepository.save(storedUser);
  }
}
