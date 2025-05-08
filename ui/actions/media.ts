import http from "@/libs/http";
import { UploadImageResType } from "@/schemas/media.schema";

export const mediaApiRequest = {
  uploadImage: (formData: FormData) => {
    return http.post<UploadImageResType>("/media/upload", formData);
  },
  deleteImage: (imageId: string) => {
    return http.delete(`/media/${imageId}`);
  },
};
