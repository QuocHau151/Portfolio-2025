"use client";
import { useState } from "react";

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
  useCreateComponentMutation,
  useGetTypeComponentQuery,
} from "@/queries/useComponent";
import { useUploadImage } from "@/queries/useMedia";
import {
  CreateComponentBodySchema,
  CreateComponentBodyType,
} from "@/schemas/component.schema";
import { toast } from "sonner";

export default function CreateComponent() {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const createComponent = useCreateComponentMutation();
  const getTypeComponent = useGetTypeComponentQuery();
  const componentType = getTypeComponent.data?.payload.data;
  const CATEGORY_OPTIONS = (
    Array.isArray(componentType) ? componentType : []
  )?.map((item) => ({
    value: item?.id.toString(),
    label: item?.name,
  }));

  const uploadImage = useUploadImage();

  const form = useForm<CreateComponentBodyType>({
    resolver: zodResolver(CreateComponentBodySchema),
    defaultValues: {
      name: "",
      description: "",
      typeId: 0,
      content: "",
      image: "",
    },
  });
  async function onSubmit(values: CreateComponentBodyType) {
    console.log(values);
    try {
      setIsUploading(true);

      if (fileStates.length === 0 && !values.image) {
        toast.error("Vui lòng chọn ảnh bìa.");
        setIsUploading(false);
        return;
      }
      if (fileStates.length > 1) {
        toast.error("Vui lòng chỉ chọn một ảnh để tải lên.");
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
      await createComponent.mutateAsync(data);
      toast.success("Bài viết đã được tạo thành công!");

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
                          value={field.value?.toString()} // form đang lưu là number, cần ép sang string
                          onValueChange={(val) => field.onChange(Number(val))} // ép ngược lại về number
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue>
                              {CATEGORY_OPTIONS?.find(
                                (item) =>
                                  item.value === field.value?.toString(),
                              )?.label || "Chọn Danh Mục"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent className="bg-black">
                            {CATEGORY_OPTIONS?.map((item) => (
                              <SelectItem
                                key={item.value}
                                value={item.value.toString()}
                              >
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
                        <RichTextEditor onChange={field.onChange} />
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
