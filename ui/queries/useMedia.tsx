import { mediaApiRequest } from "@/actions/media";
import { useMutation } from "@tanstack/react-query";

export const useUploadImage = () => {
  return useMutation({
    mutationFn: mediaApiRequest.uploadImage,
  });
};
export const useDeleteImage = () => {
  return useMutation({
    mutationFn: mediaApiRequest.deleteImage,
  });
};
