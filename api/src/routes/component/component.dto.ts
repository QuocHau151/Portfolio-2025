import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import {
  componentCreateBodySchema,
  componentResSchema,
  componentSchema,
  componentTypeCreateBodySchema,
  componentTypeResSchema,
  componentTypeSchema,
  componentTypeUpdateBodySchema,
  componentUpdateBodySchema,
} from './component.model';

export class ComponentTypeDto extends createZodDto(
  z.object({
    data: z.array(
      z.object({
        ...componentTypeSchema.shape,
        components: z.array(componentSchema),
      }),
    ),
  }),
) {}
export class ComponentTypeByIdDto extends createZodDto(
  z.object({
    data: componentTypeSchema.extend({
      components: z.array(componentSchema),
    }),
  }),
) {}
export class ComponentTypeCreateBodyDto extends createZodDto(
  componentTypeCreateBodySchema,
) {}

export class ComponentCreateBodyDto extends createZodDto(
  componentCreateBodySchema,
) {}

export class ComponentUpdateBodyDto extends createZodDto(
  componentUpdateBodySchema,
) {}
export class ComponentTypeUpdateBodyDto extends createZodDto(
  componentTypeUpdateBodySchema,
) {}
export class ComponentTypeResDto extends createZodDto(
  z.object({
    data: componentTypeResSchema,
  }),
) {}
export class ComponentResDto extends createZodDto(
  z.object({
    data: componentResSchema,
  }),
) {}
export class ComponentTypeListResDto extends createZodDto(
  z.object({
    data: z.array(componentTypeResSchema),
  }),
) {}
export class ComponentListResDto extends createZodDto(
  z.object({
    data: z.array(componentResSchema),
  }),
) {}
