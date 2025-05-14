"use client";
import { useEffect, useState } from "react";

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
  useCreateBlogMutation,
  useGetListCategoryBlogMutation,
} from "@/queries/useBlog";
import { useUploadImage } from "@/queries/useMedia";
import { BlogBodySchema, BlogBodyType } from "@/schemas/blog.schema";
import { useAppStore } from "@/stores/app";

// Mock category options

const SORT_OPTIONS = [
  { value: "NOI_BAT", label: "Nổi Bật" },
  { value: "NORMAL", label: "Bình Thường" },
];

export default function AddBlog() {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isUploading, setIsUploading] = useState(false);
  const getCategoryBlog = useGetListCategoryBlogMutation();
  const [author, setAuthor] = useState<number>(0);
  const createBlog = useCreateBlogMutation();
  const category = getCategoryBlog.data?.payload.data;
  const CATEGORY_OPTIONS = (Array.isArray(category) ? category : [])?.map(
    (item) => ({
      value: item?.id.toString(),
      label: item?.name,
    }),
  );
  const { account } = useAppStore();
  useEffect(() => {
    if (account) {
      setAuthor(account.id);
    }
  }, [account]);

  const uploadImage = useUploadImage();
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

  async function onSubmit(values: BlogBodyType) {
    setError("");
    setSuccess("");
    setIsUploading(true);
    try {
      if (fileStates.length === 0) {
        setError("Vui lòng chọn ảnh để tải lên.");
        setIsUploading(false);
        return;
      }
  
      const formData = new FormData();
      fileStates.forEach((state) => {
        if (state.file) {
          formData.append("files", state.file);
        }
      });
      if (uploadImage.isPending) return;
      const uploadResult = await uploadImage.mutateAsync(formData);

      const imageUrl = uploadResult?.payload.data.map((item) => item.url);
      const data = {
        ...values,
        image: imageUrl[0],
        authorId: author,
      };
      if (createBlog.isPending) return;
      const result = await createBlog.mutateAsync(data);
      if (!result) {
        setError("Đã có lỗi xảy ra khi tạo bài viết.");
        return;
      } else {
        setSuccess("Bài viết đã được tạo thành công!");
        form.reset();
        setFileStates([]);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Đã có lỗi xảy ra.");
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
                          // không được để field.value ở initialContent vì sẽ bị loop focus() với field.onChange
                          initialContent={""}
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
                  <CardContent className="px-0">
                    <MultiFileDropzone
                      value={fileStates}
                      onChange={setFileStates}
                      onFilesAdded={(added) =>
                        setFileStates([...fileStates, ...added])
                      }
                    />
                  </CardContent>
                </Card>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
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
