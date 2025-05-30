import { Injectable } from '@nestjs/common';

import { NotFoundRecordException } from 'src/common/error';
import { CommonUserRepository } from 'src/common/repositories/common-user.repo';
import { ChangePasswordBodyType, UpdateProfileBodyType } from './profile.model';
import { ProfileRepo } from './profile.repo';

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
  async getUserProfileById(id: number) {
    const user = await this.profileRepo.findUniqueIncludeRolePermissions(
      Number(id),
    );
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
