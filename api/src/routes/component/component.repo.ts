import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import {
  ComponentCreateBodyType,
  ComponentTypeCreateBodyType,
  ComponentTypeUpdateBodyType,
  ComponentUpdateBodyType,
} from './component.model';

@Injectable()
export class ComponentRepo {
  constructor(private readonly prismaService: PrismaService) {}
  async getComponent() {
    return await this.prismaService.component.findMany({
      include: {
        type: {
          select: {
            name: true,
          },
        },
      },
    });
  }
  async getComponentById(id: number) {
    return await this.prismaService.component.findUnique({
      where: { id },
      include: {
        type: {
          select: {
            name: true,
          },
        },
      },
    });
  }
  async createComponent(data: ComponentCreateBodyType) {
    return await this.prismaService.component.create({
      data,
    });
  }
  async updateComponent(id: number, data: ComponentUpdateBodyType) {
    return await this.prismaService.component.update({
      where: { id },
      data,
    });
  }
  async deleteComponent(id: number) {
    return await this.prismaService.component.delete({
      where: { id },
    });
  }
  async getComponentType() {
    return await this.prismaService.componentType.findMany({
      include: {
        components: true,
      },
    });
  }
  async getComponentTypeById(id: number) {
    return await this.prismaService.componentType.findUnique({
      where: { id },
      include: {
        components: true,
      },
    });
  }
  async createComponentType(data: ComponentTypeCreateBodyType) {
    return await this.prismaService.componentType.create({
      data,
    });
  }
  async updateComponentType(id: number, data: ComponentTypeUpdateBodyType) {
    return await this.prismaService.componentType.update({
      where: { id },
      data,
    });
  }
  async deleteComponentType(id: number) {
    return await this.prismaService.componentType.delete({
      where: { id },
    });
  }
}
