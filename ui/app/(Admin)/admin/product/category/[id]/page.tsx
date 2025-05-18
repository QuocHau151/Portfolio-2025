"use client";
import { use, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

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

import {
  useGetCategorByIdQuery,
  useUpdateCategoryMutation,
} from "@/queries/useCategory";
import {
  UpdateCategorySchema,
  UpdateCategoryType,
} from "@/schemas/category.schema";
import { toast } from "sonner";

export default function UpdateCategory({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);
  const [isUploading, setIsUploading] = useState(false);
  const getCategoryId = useGetCategorByIdQuery(Number(id));
  const category = (getCategoryId.data?.payload as any)?.data;

  const updateCategory = useUpdateCategoryMutation();

  const form = useForm<UpdateCategoryType>({
    resolver: zodResolver(UpdateCategorySchema),
    defaultValues: {
      name: "",
    },
  });
  useEffect(() => {
    if (category) {
      form.reset({
        name: category?.name,
      });
    }
  }, [category]);
  async function onSubmit(values: UpdateCategoryType) {
    try {
      setIsUploading(true);
      const result = await updateCategory.mutateAsync({ id, data: values });
      toast.success((result.payload as any)?.data.message);
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
                      <FormLabel>Tên Danh Mục</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
