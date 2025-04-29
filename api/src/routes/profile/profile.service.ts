import { Injectable } from '@nestjs/common';

import { ProfileRepo } from './profile.repo';
import { CommonUserRepository } from 'src/common/repositories/common-user.repo';
import { NotFoundRecordException } from 'src/common/error';
import { ChangePasswordBodyType, UpdateProfileBodyType } from './profile.model';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepo: ProfileRepo,
    private readonly commonUserRepository: CommonUserRepository,
  ) {}

  async getProfile(userId: number) {
    const user =
      await this.commonUserRepository.findUniqueIncludeRolePermissions({
        id: userId,
      });

    if (!user) {
      throw NotFoundRecordException;
    }

    return user;
  }

  async updateProfile(userId: number, body: UpdateProfileBodyType) {
    const user = await this.profileRepo.update(userId, body);
    return user;
  }

  async changePassword(userId: number, body: ChangePasswordBodyType) {
    const user = await this.profileRepo.changePassword(userId, body);
    return user;
  }
}
