import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { MessageResDTO } from 'src/common/dtos/response.dto';
import {
  CreatePermissionBodyDTO,
  GetPermissionDetailResDTO,
  GetPermissionParamsDTO,
  GetPermissionsResDTO,
  UpdatePermissionBodyDTO,
} from 'src/routes/permission/permission.dto';
import { PermissionService } from 'src/routes/permission/permission.service';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  @ZodSerializerDto(GetPermissionsResDTO)
  list() {
    return this.permissionService.list();
  }

  @Get(':permissionId')
  @ZodSerializerDto(GetPermissionDetailResDTO)
  findById(@Param() params: GetPermissionParamsDTO) {
    return this.permissionService.findById(params.permissionId);
  }

  @Post()
  @ZodSerializerDto(GetPermissionDetailResDTO)
  create(
    @Body() body: CreatePermissionBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.permissionService.create({
      data: body,
      createdById: userId,
    });
  }

  @Put(':permissionId')
  @ZodSerializerDto(GetPermissionDetailResDTO)
  update(
    @Body() body: UpdatePermissionBodyDTO,
    @Param() params: GetPermissionParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.permissionService.update({
      data: body,
      id: params.permissionId,
      updatedById: userId,
    });
  }

  @Delete(':permissionId')
  @ZodSerializerDto(MessageResDTO)
  delete(
    @Param() params: GetPermissionParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.permissionService.delete({
      id: params.permissionId,
      deletedById: userId,
    });
  }
}
