import { Injectable } from '@nestjs/common';
import {
  ComponentCreateBodyType,
  ComponentTypeCreateBodyType,
  ComponentTypeUpdateBodyType,
  ComponentUpdateBodyType,
} from './component.model';
import { ComponentRepo } from './component.repo';

@Injectable()
export class ComponentService {
  constructor(private readonly componentRepo: ComponentRepo) {}
  getComponent() {
    return this.componentRepo.getComponent();
  }
  async getComponentById(id: number) {
    const result = await this.componentRepo.getComponentById(Number(id));
    return result;
  }
  async createComponent(userId: number, data: ComponentCreateBodyType) {
    await this.componentRepo.createComponent(userId, data);
    return {
      message: 'Component created successfully',
    };
  }
  async updateComponent(id: number, data: ComponentUpdateBodyType) {
    await this.componentRepo.updateComponent(id, data);
    return {
      message: 'Component updated successfully',
    };
  }
  async deleteComponent(id: number) {
    await this.componentRepo.deleteComponent(id);
    return {
      message: 'Component deleted successfully',
    };
  }
  getComponentType() {
    return this.componentRepo.getComponentType();
  }
  getComponentTypeById(id: number) {
    return this.componentRepo.getComponentTypeById(id);
  }
  async createComponentType(data: ComponentTypeCreateBodyType) {
    await this.componentRepo.createComponentType(data);
    return {
      message: 'Component type created successfully',
    };
  }
  async updateComponentType(id: number, data: ComponentTypeUpdateBodyType) {
    await this.componentRepo.updateComponentType(id, data);
    return {
      message: 'Component type updated successfully',
    };
  }
  async deleteComponentType(id: number) {
    await this.componentRepo.deleteComponentType(id);
    return {
      message: 'Component type deleted successfully',
    };
  }
  getComponentByAuthor(userId: number) {
    return this.componentRepo.getComponentByAuthor(userId);
  }
}
