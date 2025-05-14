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

import RichTextEditor from "@/components/feature/RichTextEditor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileState, MultiFileDropzone } from "@/components/ui/upLoadFile";
import {
  useComponentByIdQuery,
  useGetComponentByAuthorQuery,
  useGetTypeComponentQuery,
  useUpdateComponentMutation,
} from "@/queries/useComponent";
import { useDeleteImage, useUploadImage } from "@/queries/useMedia";
import {
  ComponentType,
  UpdateComponentBodySchema,
  UpdateComponentBodyType,
} from "@/schemas/component.schema";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditComponent({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const getComponentsByAuthor = useGetComponentByAuthorQuery();
  const componentId = getComponentsByAuthor.data?.payload.data.map(
    (item) => item.id,
  );
  useEffect(() => {
    // Chỉ kiểm tra khi data đã được tải
    if (getComponentsByAuthor.data && componentId) {
      if (!componentId.includes(Number(id))) {
        toast.error("Bạn không có quyền truy cập vào bài viết này.");
        router.push("/dashboard/component");
      }
    }
  }, [componentId, id, getComponentsByAuthor.data]);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const getComponent = useComponentByIdQuery(id);

  const updateComponent = useUpdateComponentMutation();
  const getTypeComponent = useGetTypeComponentQuery();
  const deleteImage = useDeleteImage();
  const componentType = getTypeComponent.data?.payload.data;
  const CATEGORY_OPTIONS = (
    Array.isArray(componentType) ? componentType : []
  )?.map((item) => ({
    value: item?.id.toString(),
    label: item?.name,
  }));

  const component = getComponent.data?.payload.data as unknown as ComponentType;
  const uploadImage = useUploadImage();

  const handleDeleteImage = async (imageUrl: string) => {
    try {
      if (deleteImage.isPending) return;
      const base = "https://s3.quochau.com/portfolio/";
      const fileName = imageUrl.replace(base, "");
      await deleteImage.mutateAsync(fileName);
      if (component) {
        component.image = "";
      }
      form.setValue("image", "");
      toast.success("Đã xóa ảnh thành công!");
    } catch (error) {
      toast.error("Đã có lỗi xảy ra khi xóa ảnh.");
    }
  };

  const form = useForm<UpdateComponentBodyType>({
    resolver: zodResolver(UpdateComponentBodySchema),
    defaultValues: {
      name: "",
      description: "",
      typeId: 0,
      content: "",
      image: "",
    },
  });
  useEffect(() => {
    if (component) {
      form.reset({
        name: component?.name,
        typeId: component?.typeId,
        description: component?.description,
        content: component?.content,
        image: component?.image,
      });
    }
  }, [component]);

  async function onSubmit(values: UpdateComponentBodyType) {
    console.log(values);
    try {
      setIsUploading(true);

      if (fileStates.length === 0 && !values.image) {
        toast.error("Vui lòng chọn ảnh bìa.");
        setIsUploading(false);
        return;
      }

      let imageUrl = values.image;

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
        image: imageUrl,
      };
      if (updateComponent.isPending) return; // Tương tự như trên
      await updateComponent.mutateAsync({
        id: Number(component?.id),
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
                <FormField
                  control={form.control}
                  name="typeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Danh Mục Bài Viết</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value?.toString() || ""}
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Chọn Danh Mục">
                              {CATEGORY_OPTIONS?.find(
                                (item) =>
                                  item.value === field.value?.toString(),
                              )?.label || "Chọn Danh Mục"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent className="bg-black">
                            {CATEGORY_OPTIONS?.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô Tả Ngắn ({"<"}160 từ)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nội Dung Bài Viết</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          initialContent={component?.content || ""}
                          onChange={field.onChange}
                        />
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
                        {component?.image && (
                          <div className="group relative">
                            <div className="h-40 max-w-[400px] overflow-hidden rounded-lg">
                              <Image
                                width={1000}
                                height={1000}
                                src={component?.image}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div
                              onClick={(e) => {
                                e.preventDefault();
                                if (component?.image)
                                  handleDeleteImage(component?.image);
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
