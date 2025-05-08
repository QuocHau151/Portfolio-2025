import { z } from "zod";

export const uploadImageResSchema = z.object({
  data: z.array(
    z.object({
      url: z.string().url(),
    }),
  ),
});
export type UploadImageResType = z.infer<typeof uploadImageResSchema>;
