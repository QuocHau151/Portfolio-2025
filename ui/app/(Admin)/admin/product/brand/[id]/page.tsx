"use client";
import { X } from "lucide-react";
import { use, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FileState, MultiFileDropzone } from "@/components/ui/upLoadFile";
import {
  useGetBrandByIdQuery,
  useUpdateBrandMutation,
} from "@/queries/useBrand";
import { useDeleteImage, useUploadImage } from "@/queries/useMedia";
import { UpdateBrandSchema, UpdateBrandType } from "@/schemas/brand.schema";
import Image from "next/image";
import { toast } from "sonner";

export default function EditBrand({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const getBrand = useGetBrandByIdQuery(id);
  const updateBrand = useUpdateBrandMutation();
  const deleteImage = useDeleteImage();

  const brand = (getBrand.data?.payload as any)?.data as UpdateBrandType;
  const uploadImage = useUploadImage();

  const handleDeleteImage = async (imageUrl: string) => {
    try {
      if (deleteImage.isPending) return;
      const base = "https://s3.quochau.com/portfolio/";
      const fileName = imageUrl.replace(base, "");
      await deleteImage.mutateAsync(fileName);
      if (brand) {
        brand.logo = "";
      }
      form.setValue("logo", "");
      toast.success("Đã xóa ảnh thành công!");
    } catch (error) {
      toast.error("Đã có lỗi xảy ra khi xóa ảnh.");
    }
  };

  const form = useForm<UpdateBrandType>({
    resolver: zodResolver(UpdateBrandSchema),
    defaultValues: {
      name: "",
      logo: "",
    },
  });
  useEffect(() => {
    if (brand) {
      form.reset({
        name: brand?.name,
        logo: brand?.logo,
      });
    }
  }, [brand]);

  async function onSubmit(values: UpdateBrandType) {
    try {
      setIsUploading(true);

      if (fileStates.length === 0 && !values.logo) {
        toast.error("Vui lòng chọn ảnh bìa.");
        setIsUploading(false);
        return;
      }

      let imageUrl = values.logo;

      // Chỉ tải lên ảnh mới nếu có chọn file
      if (fileStates.length > 0) {
        const formData = new FormData();
        fileStates.forEach((state) => {
          if (state.file) {
            formData.append("files", state.file);
          }
        });
        if (uploadImage.isPending) return; // Hàm return nhưng không reset isUploading
        const uploadResult = await uploadImage.mutateAsync(formData);
        imageUrl = uploadResult?.payload.data.map((item) => item.url)[0];
      }

      const data = {
        ...values,
        logo: imageUrl,
      };
      if (updateBrand.isPending) return; // Tương tự như trên
      await updateBrand.mutateAsync({
        id: Number(id),
        data: data,
      });

      toast.success("Bài viết đã được sửa thành công!");

      window.location.reload();
    } catch (error) {
      toast.error("Đã có lỗi xảy ra khi sửa bài viết.");
      console.error(error); // Thiếu log lỗi để debug
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="mt-6 ml-2 grid w-full flex-1 items-start gap-4 p-4 px-0 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid w-full auto-rows-max gap-4">
        <div className="flex w-full items-start justify-between gap-10">
          <div className="w-full flex-1 rounded-xl border px-4 py-6">
            <Form {...form}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit(onSubmit)(e);
                }}
                className="w-full space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên Bài Viết</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Card>
                  <CardHeader className="px-0">
                    <CardTitle>Hình ảnh bìa bài viết</CardTitle>
                    <CardDescription>
                      Hình ảnh đầu tiên sẽ là ảnh bìa.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-2">
                    <div className="space-y-2">
                      <div className="mb-5 flex flex-wrap items-center gap-2">
                        {brand?.logo && (
                          <div className="group relative">
                            <div className="h-40 max-w-[400px] overflow-hidden rounded-lg">
                              <Image
                                width={1000}
                                height={1000}
                                src={brand?.logo}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div
                              onClick={(e) => {
                                e.preventDefault();
                                if (brand?.logo) handleDeleteImage(brand?.logo);
                              }}
                              className="absolute -top-2 -right-2 cursor-pointer rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                            >
                              <X className="h-4 w-4" />
                            </div>
                          </div>
                        )}
                      </div>
                      <MultiFileDropzone
                        value={fileStates}
                        onChange={(files) => {
                          setFileStates(files);
                        }}
                        onFilesAdded={async (addedFiles) => {
                          setFileStates([...fileStates, ...addedFiles]);
                        }}
                        dropzoneOptions={{
                          accept: {
                            "image/*": [], // Chấp nhận tất cả các file ảnh
                            "video/*": [], // Chấp nhận tất cả các file video
                          },
                          maxFiles: 5, // Giới hạn số lượng file
                          maxSize: 10 * 1024 * 1024, // Giới hạn kích thước (10MB)
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Button type="submit">
                  {isUploading ? "Đang tải..." : "Lưu Thay Đổi"}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  className="ml-2"
                  onClick={() => window.location.reload()}
                >
                  Huỷ Bỏ
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
