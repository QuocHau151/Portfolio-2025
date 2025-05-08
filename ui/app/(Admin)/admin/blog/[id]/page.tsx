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

import { MultiInput } from "@/components/feature/MultiInput";
import RichTextEditor from "@/components/feature/RichTextEditor";
import { UniqueSelect } from "@/components/feature/UniqueSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileState, MultiFileDropzone } from "@/components/ui/upLoadFile";
import {
  useGetBlogByIdMutation,
  useGetListCategoryBlogMutation,
  useUpdateBlogMutation,
} from "@/queries/useBlog";
import { useDeleteImage, useUploadImage } from "@/queries/useMedia";
import { BlogBodySchema, BlogBodyType } from "@/schemas/blog.schema";
import Image from "next/image";
import { toast } from "sonner";

// Mock category options

const SORT_OPTIONS = [
  { value: "NOI_BAT", label: "Nổi Bật" },
  { value: "NORMAL", label: "Bình Thường" },
];

export default function AddBlog({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const getCategoryBlog = useGetListCategoryBlogMutation();
  const updateBlog = useUpdateBlogMutation();
  const getBlogById = useGetBlogByIdMutation(id);
  const deleteImage = useDeleteImage();
  const category = getCategoryBlog.data?.payload.data;
  const CATEGORY_OPTIONS = (Array.isArray(category) ? category : [])?.map(
    (item) => ({
      value: item?.id.toString(),
      label: item?.name,
    }),
  );

  const blog = getBlogById.data?.payload.data;

  const uploadImage = useUploadImage();

  const handleDeleteImage = async (imageUrl: string) => {
    try {
      if (deleteImage.isPending) return;
      const base = "https://s3.quochau.com/portfolio/";
      const fileName = imageUrl.replace(base, "");
      await deleteImage.mutateAsync(fileName);
      if (blog) {
        blog.image = "";
      }
      form.setValue("image", "");
      toast.success("Đã xóa ảnh thành công!");
    } catch (error) {
      toast.error("Đã có lỗi xảy ra khi xóa ảnh.");
    }
  };

  const form = useForm<BlogBodyType>({
    resolver: zodResolver(BlogBodySchema),
    defaultValues: {
      categoryId: 0,
      authorId: 0,
      title: "",
      description: "",
      tag: "NORMAL",
      keyword: [],
      content: "",
      image: "",
    },
  });
  useEffect(() => {
    if (blog) {
      form.reset({
        categoryId: blog.categoryId,
        authorId: blog.authorId,
        title: blog?.title,
        description: blog?.description,
        tag: blog?.tag,
        keyword: blog?.keyword,
        content: blog?.content,
        image: blog?.image,
      });
    }
  }, [blog]);

  async function onSubmit(values: BlogBodyType) {
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
      if (updateBlog.isPending) return; // Tương tự như trên
      await updateBlog.mutateAsync({ id: Number(blog?.id), body: data });

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
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-8"
              >
                <FormField
                  control={form.control}
                  name="title"
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
                  name="categoryId"
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
                  name="tag"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sắp Xếp Theo</FormLabel>
                      <FormControl>
                        <UniqueSelect
                          selected={field.value}
                          options={SORT_OPTIONS}
                          onChange={(val) => field.onChange(val)}
                          placeholder="Chọn danh mục..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="keyword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Từ Khoá</FormLabel>
                      <FormControl>
                        <MultiInput
                          values={Array.isArray(field.value) ? field.value : []}
                          onChange={field.onChange}
                          placeholder="Nhập từ khóa..."
                        />
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
                          initialContent={field.value || ""}
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
                        {blog?.image && (
                          <div className="group relative">
                            <div className="h-40 max-w-[400px] overflow-hidden rounded-lg">
                              <Image
                                width={1000}
                                height={1000}
                                src={blog?.image}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div
                              onClick={(e) => {
                                e.preventDefault();
                                if (blog?.image) handleDeleteImage(blog?.image);
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
