import {
  Injectable,
  UnauthorizedException,
  HttpService,
  HttpStatus,
  BadRequestException,
  HttpException,
  ConflictException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { JwtPayloadType } from './jwt-payload.type';
import { AuthPayloadType } from './auth-payload.type';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from '../user/inputs/create-user.input';
import { UserRoleEnum } from '../user/enums/user-role.enum';
import { LoginInput } from './inputs/log-in.input';
import { UserNetworkTypeEnum } from '../user/enums/user-network-type.enum';
import { ValidateEmailConfirmationInput } from './inputs/validate-email-confirmation.input';
import { CommonService } from '../common/common.service';
import { SendEmailDto, Tos } from '../common/dto/send-email.dto';

import * as bcrypt from 'bcryptjs';
import * as config from 'config';

const emailTemplate = config.get('emailTemplate');

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
    private readonly commonService: CommonService,
    private httpService: HttpService,
  ) {}

  async validate({ id }): Promise<User> {
    const user = await this.userService.getUser(id);
    if (!user) {
      throw new UnauthorizedException('Authenticate validation error');
    }
    return user;
  }

  async login(loginInput: LoginInput): Promise<AuthPayloadType> {
    const { email, password } = loginInput;

    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Email or password incorrect');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new BadRequestException('Email or password incorrect');
    }

    const payload: JwtPayloadType = { id: user.id, role: user.role };

    const authPayload: AuthPayloadType = {
      accessToken: this.jwt.sign(payload),
    };

    return authPayload;
  }

  async loginWithFacebook({ accessToken }): Promise<AuthPayloadType> {
    const facebookResponse = await this.httpService
      .get(
        `https://graph.facebook.com/me?access_token=${accessToken}&fields=email,name,last_name,middle_name`,
      )
      .toPromise();

    const {
      data: { name, email, last_name },
    } = facebookResponse;

    if (facebookResponse.status !== HttpStatus.OK)
      throw new HttpException(
        `Facebook connection error`,
        facebookResponse.status,
      );

    const user = await this.createOrRetrieveUser(
      email,
      name,
      last_name,
      UserNetworkTypeEnum.FACEBOOK,
    );

    return this.generateAuthJwtPayload(user);
  }

  async loginWithGoogle({ accessToken }): Promise<AuthPayloadType> {
    const googleResponse = await this.httpService
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
      )
      .toPromise();

    const { data } = googleResponse;

    if (googleResponse.status !== HttpStatus.OK)
      throw new HttpException(`Google connection error`, googleResponse.status);

    const { name, email, family_name } = data;

    const user = await this.createOrRetrieveUser(
      email,
      name,
      family_name,
      UserNetworkTypeEnum.GOOGLE,
    );

    return this.generateAuthJwtPayload(user);
  }

  async loginWithLinkedIn({ accessToken }): Promise<AuthPayloadType> {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const linkedinResponse = await this.httpService
      .get('https://api.linkedin.com/v2/me', { headers })
      .toPromise();

    if (linkedinResponse.status !== HttpStatus.OK)
      throw new HttpException(
        `Google connection error`,
        linkedinResponse.status,
      );

    const linkedinClientForEmail = await this.httpService
      .get(
        'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
        { headers },
      )
      .toPromise();

    const {
      data: { localizedLastName, localizedFirstName },
    } = linkedinResponse;

    const email =
      linkedinClientForEmail.data.elements[0]['handle~'].emailAddress;

    const user = await this.createOrRetrieveUser(
      email,
      localizedLastName,
      localizedFirstName,
      UserNetworkTypeEnum.LINKEDIN,
    );

    return this.generateAuthJwtPayload(user);
  }

  async loginWithApple({ accessToken }): Promise<AuthPayloadType> {
    const decodedWebToken = this.jwt.decode(accessToken);
    let email: string = '';

    if (decodedWebToken['email']) {
      email = decodedWebToken['email'];
    }

    const user = await this.createOrRetrieveUser(
      email,
      '',
      '',
      UserNetworkTypeEnum.APPLE,
    );

    return this.generateAuthJwtPayload(user);
  }

  async signUp(createUserInput: CreateUserInput): Promise<AuthPayloadType> {
    const emailExists = await this.userService.getUserByEmail(
      createUserInput.email,
    );
    if (emailExists) {
      throw new ConflictException('Email is already in use');
    }

    const user = await this.userService.createUser(createUserInput);

    return this.generateAuthJwtPayload(user);
  }

  async reSendEmailConfirmation(email: string): Promise<boolean> {
    const storedUser = await this.userService.getUserByEmail(email);
    const random4digits = Math.floor(1000 + Math.random() * 9000);
    storedUser.random4digits = random4digits;
    await this.userService.updateUser(storedUser);

    const dynamic_template_data = {
      username: storedUser.name,
      number: random4digits,
    };

    const sendEmailDto: SendEmailDto = {
      to: [new Tos(storedUser.email, storedUser.name)],
      dynamic_template_data,
      templateId: emailTemplate.qAccountConfirmationTemplate,
    };

    this.commonService.sendEmail(sendEmailDto);

    return true;
  }

  async emailConfirmation({
    random4digits,
    email,
  }: ValidateEmailConfirmationInput): Promise<boolean> {
    const storedUser = await this.userService.getUserByEmail(email);

    if (storedUser.random4digits === random4digits) {
      storedUser.active = true;
      await this.userService.updateUser(storedUser);
      return true;
    }

    throw new BadRequestException(`the verification token is not valid`);
  }

  private generateAuthJwtPayload({ id, role, deleted }: User): AuthPayloadType {
    const payload: JwtPayloadType = { id, role };

    if (deleted) {
      throw new BadRequestException(`the verification account is deleted`);
    }

    const authPayload: AuthPayloadType = {
      accessToken: this.jwt.sign(payload),
    };

    return authPayload;
  }

  private async createOrRetrieveUser(
    email: string,
    name: string,
    lastname: string,
    networkType: UserNetworkTypeEnum,
  ): Promise<User> {
    const storedUser = await this.userService.getUserByEmail(email);

    if (storedUser) return storedUser;

    const createUserInput: CreateUserInput = {
      name,
      email,
      lastname,
      role: UserRoleEnum.USER,
      active: true,
      networkType,
    };

    return await this.userService.createUser(createUserInput);
  }
}
