import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { ZodSerializerDto } from 'nestjs-zod';
import { GetUserProfileResDTO } from 'src/common/dtos/common-user.dto';
import {
  ChangePasswordBodyDTO,
  UpdateProfileBodyDTO,
  UpdateUserProfileResDTO,
} from './profile.dto';
import { MessageResDTO } from 'src/common/dtos/response.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ZodSerializerDto(GetUserProfileResDTO)
  getProfile(@ActiveUser('userId') userId: number) {
    return this.profileService.getProfile(userId);
  }

  @Get(':id')
  @ZodSerializerDto(GetUserProfileResDTO)
  getUserProfileById(@Param('id') id: number) {
    return this.profileService.getUserProfileById(id);
  }
  @Put()
  @ZodSerializerDto(UpdateUserProfileResDTO)
  updateProfile(
    @ActiveUser('userId') userId: number,
    @Body() body: UpdateProfileBodyDTO,
  ) {
    return this.profileService.updateProfile(userId, body);
  }

  @Put('change-password')
  @ZodSerializerDto(MessageResDTO)
  changePassword(
    @ActiveUser('userId') userId: number,
    @Body() body: ChangePasswordBodyDTO,
  ) {
    return this.profileService.changePassword(userId, body);
  }
}
