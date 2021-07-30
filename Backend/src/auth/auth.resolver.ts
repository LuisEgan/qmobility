import { Response } from 'express';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ResGql } from '../customization/decorators/decorators';
import { LoginInput } from './inputs/log-in.input';
import { CreateUserInput } from '../user/inputs/create-user.input';
import { AuthPayloadType } from './auth-payload.type';
import { AuthService } from './auth.service';
import { SocialNetworkLogInInput } from './inputs/social-network-log-in.input';
import { ValidationPipe } from '@nestjs/common';
import { ValidateEmailConfirmationInput } from './inputs/validate-email-confirmation.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayloadType, {
    description: 'login with Qmobility account',
  })
  async login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Mutation(() => AuthPayloadType, {
    description: 'sign up with Qmobility account',
  })
  async signup(
    @Args('signUpInput', ValidationPipe) createUserInput: CreateUserInput,
  ) {
    return this.authService.signUp(createUserInput);
  }

  @Mutation(() => AuthPayloadType, {
    description: 'login with Facebook account',
  })
  async loginWithFacebook(
    @Args('facebookLogInInput') facebookLogInInput: SocialNetworkLogInInput,
  ) {
    return this.authService.loginWithFacebook(facebookLogInInput);
  }

  @Mutation(() => AuthPayloadType, {
    description: 'login with Google account',
  })
  async loginWithGoogle(
    @Args('googleLogInInput') googleLogInInput: SocialNetworkLogInInput,
  ) {
    return this.authService.loginWithGoogle(googleLogInInput);
  }

  @Mutation(() => AuthPayloadType, {
    description: 'login with LinkedIn account',
  })
  async loginWithLinkedIn(
    @Args('linkedinLogInInput') linkedinLogInInput: SocialNetworkLogInInput,
  ) {
    return this.authService.loginWithLinkedIn(linkedinLogInInput);
  }

  @Mutation(() => AuthPayloadType, {
    description: 'login with Apple account',
  })
  async loginWithApple(
    @Args('appleLogInInput') appleLogInInput: SocialNetworkLogInInput,
  ) {
    return this.authService.loginWithApple(appleLogInInput);
  }

  @Mutation(() => Boolean, {
    description: 're-send email confirmation for activate account',
  })
  async reSendEmailConfirmation(@Args('email') email: string) {
    return this.authService.reSendEmailConfirmation(email);
  }

  @Mutation(() => Boolean, {
    description: 'endpoint to validate the account',
  })
  async emailConfirmation(
    @Args('emailConfirmationInput', ValidationPipe)
    validateEmailConfirmationInput: ValidateEmailConfirmationInput,
  ) {
    return this.authService.emailConfirmation(validateEmailConfirmationInput);
  }
}
