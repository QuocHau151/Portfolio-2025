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
import { IsPublic } from 'src/common/decorators/auth.decorator';
import { MessageResDTO } from 'src/common/dtos/response.dto';
import {
  ComponentListResDto,
  ComponentResDto,
  ComponentTypeByIdDto,
  ComponentTypeDto,
} from './component.dto';
import {
  ComponentCreateBodyType,
  ComponentTypeCreateBodyType,
  ComponentTypeUpdateBodyType,
  ComponentUpdateBodyType,
} from './component.model';
import { ComponentService } from './component.service';

@Controller('components')
export class ComponentController {
  constructor(private readonly componentService: ComponentService) {}
  @Get()
  @IsPublic()
  @ZodSerializerDto(ComponentListResDto)
  getComponent() {
    return this.componentService.getComponent();
  }
  @Get('author')
  getComponentByAuthor(@ActiveUser('userId') userId: number) {
    return this.componentService.getComponentByAuthor(userId);
  }

  @Get('type')
  @IsPublic()
  @ZodSerializerDto(ComponentTypeDto)
  getComponentType() {
    return this.componentService.getComponentType();
  }
  @Get(':id')
  @ZodSerializerDto(ComponentResDto)
  @IsPublic()
  getComponentById(@Param('id') id: number) {
    return this.componentService.getComponentById(id);
  }

  @Post()
  @ZodSerializerDto(MessageResDTO)
  createComponent(
    @ActiveUser('userId') userId: number,
    @Body() data: ComponentCreateBodyType,
  ) {
    return this.componentService.createComponent(userId, data);
  }
  @Put(':id')
  @ZodSerializerDto(MessageResDTO)
  updateComponent(
    @Param('id') id: number,
    @Body() data: ComponentUpdateBodyType,
  ) {
    return this.componentService.updateComponent(Number(id), data);
  }
  @Delete(':id')
  @ZodSerializerDto(MessageResDTO)
  deleteComponent(@Param('id') id: number) {
    return this.componentService.deleteComponent(Number(id));
  }

  @Get('type/:id')
  @IsPublic()
  @ZodSerializerDto(ComponentTypeByIdDto)
  getComponentTypeById(@Param('id') id: number) {
    return this.componentService.getComponentTypeById(Number(id));
  }
  @Post('type')
  @ZodSerializerDto(MessageResDTO)
  createComponentType(@Body() data: ComponentTypeCreateBodyType) {
    return this.componentService.createComponentType(data);
  }
  @Put('type/:id')
  @ZodSerializerDto(MessageResDTO)
  updateComponentType(
    @Param('id') id: number,
    @Body() data: ComponentTypeUpdateBodyType,
  ) {
    return this.componentService.updateComponentType(Number(id), data);
  }
  @Delete('type/:id')
  @ZodSerializerDto(MessageResDTO)
  deleteComponentType(@Param('id') id: number) {
    return this.componentService.deleteComponentType(Number(id));
  }
}
