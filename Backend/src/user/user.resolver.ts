import { UserService } from './user.service';
import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { User } from './user.entity';
import { ChangePasswordRequestInput } from './inputs/change-password-request.input';
import { ChangePasswordInput } from './inputs/change-password.input';
import { CommonService } from '../common/common.service';
import { GqlUser } from '../customization/decorators/decorators';
import { UseGuards, ValidationPipe } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UpdateProfileInput } from './inputs/update-profile.input';
import { VehicleService } from '../vehicle/vehicle.service';
import { ValidateTokenInput } from './inputs/validate-token.input';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly commonService: CommonService,
    private readonly vehicleService: VehicleService,
  ) {}

  @Query(() => User, { description: 'get logged in user information' })
  @UseGuards(GqlAuthGuard)
  user(@GqlUser() user: User) {
    return user;
  }

  @Mutation(() => User, { description: 'update user profile' })
  @UseGuards(GqlAuthGuard)
  updateUser(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
    @GqlUser() user: User,
  ): Promise<User> {
    return this.userService.updateProfile(updateProfileInput, user);
  }

  @Mutation(() => User, { description: 'begin the change password process' })
  async changePasswordRequest(
    @Args('changePasswordRequestInput', ValidationPipe)
    changePasswordRequestInput: ChangePasswordRequestInput,
  ): Promise<User> {
    return this.userService.passwordReset(changePasswordRequestInput);
  }

  @Mutation(() => User, { description: 'change password process' })
  async changePassword(
    @Args('changePasswordInput') changePasswordInput: ChangePasswordInput,
  ): Promise<User> {
    return this.userService.doPasswordReset(changePasswordInput);
  }

  @Mutation(() => Boolean, { description: 'begin the change password process' })
  async validateToken(
    @Args('validateTokenInput')
    validateTokenInput: ValidateTokenInput,
  ): Promise<boolean> {
    return this.userService.validateToken(validateTokenInput);
  }

  @Mutation(() => User, { description: 'upload user profile in base64 format' })
  @UseGuards(GqlAuthGuard)
  async uploadProfileAvatar(
    @Args('base64') base64: string,
    @Args('filename') filename: string,
    @GqlUser() user: User,
  ): Promise<User> {
    user.avatarUrl = await this.commonService.uploadFromB64(
      filename,
      base64,
      `${user.id}/profile`,
    );

    return this.userService.updateUser(user);
  }

  @Mutation(() => Boolean, { description: 'delete account' })
  @UseGuards(GqlAuthGuard)
  async deleteAccount(@GqlUser() user: User): Promise<boolean> {
    return this.userService.deleteAccount(user);
  }

  @ResolveField()
  async selectedVehicle(@Parent() user: User) {
    return this.vehicleService.getVehicle(user.selectedVehicle);
  }

  @ResolveField()
  async vehicles(@Parent() user: User) {
    if (!user.vehicles) return [];
    return this.vehicleService.getManyVehicles(user.vehicles);
  }
}
