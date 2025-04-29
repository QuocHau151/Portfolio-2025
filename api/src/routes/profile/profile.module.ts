import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ProfileRepo } from './profile.repo';

@Module({
  providers: [ProfileService, ProfileRepo],
  controllers: [ProfileController],
})
export class ProfileModule {}
