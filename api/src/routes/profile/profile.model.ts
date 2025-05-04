import {
  UpdateProfileResSchema,
  UserSchema,
} from 'src/common/models/common-user.model';
import { z } from 'zod';

export const GetProfileResSchema = z.object({
  data: UserSchema,
});

export const UpdateProfileBodySchema = UserSchema.pick({
  name: true,
  phone: true,
  avatar: true,
}).strict();
export const UpdateUserProfileResSchema = UserSchema.pick({
  email: true,
  name: true,
  phone: true,
  avatar: true,
});
export const ChangePasswordBodySchema = UserSchema.pick({
  password: true,
})
  .extend({
    newPassword: z.string().min(6).max(100),
    confirmNewPassword: z.string().min(6).max(100),
  })
  .strict()
  .superRefine(({ confirmNewPassword, newPassword }, ctx) => {
    if (confirmNewPassword !== newPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'newPassword and confirmNewPassword must match',
        path: ['confirmNewPassword'],
      });
    }
  });

export type ProfileType = z.infer<typeof UserSchema>;
export type GetProfileResType = z.infer<typeof GetProfileResSchema>;

export type UpdateProfileBodyType = z.infer<typeof UpdateProfileBodySchema>;
export type UpdateProfileResType = z.infer<typeof UpdateProfileResSchema>;
export type ChangePasswordBodyType = z.infer<typeof ChangePasswordBodySchema>;
