import { PipeTransform, BadRequestException } from '@nestjs/common';
import { UserRoleEnum } from '../enums/user-role.enum';

export class UserRoleValidationPipe implements PipeTransform {
  readonly allowStatuses = [UserRoleEnum.ADMIN, UserRoleEnum.USER];
  transform(value: any) {
    let role;

    if (typeof value === 'object') {
      if (!('role' in value)) return value;
      role = value['role'];
    } else {
      role = value;
    }

    if (!this.isStatusValid(role)) {
      throw new BadRequestException(`${role} is an invalid role`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowStatuses.indexOf(status);
    return idx !== -1;
  }
}
