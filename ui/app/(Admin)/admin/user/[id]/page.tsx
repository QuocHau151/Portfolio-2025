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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileState, MultiFileDropzone } from "@/components/ui/upLoadFile";
import { UserStatus } from "@/constants/type";
import { useDeleteImage, useUploadImage } from "@/queries/useMedia";
import { useGetRoles } from "@/queries/useRole";
import { useGetUserByIdQuery, useUpdateUserMutaion } from "@/queries/useUser";
import {
  UpdateUserBodySchema,
  UpdateUserBodyType,
} from "@/schemas/user.schema";
import Image from "next/image";
import { toast } from "sonner";

export default function EditUser({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const getUser = useGetUserByIdQuery(id);
  const getRoles = useGetRoles();
  const roles = getRoles.data?.payload.data.roles;

  const updateUser = useUpdateUserMutaion();

  const deleteImage = useDeleteImage();

  const user = getUser.data?.payload.data;
  const uploadImage = useUploadImage();

  const handleDeleteImage = async (imageUrl: string) => {
    try {
      if (deleteImage.isPending) return;
      const base = "https://s3.quochau.com/portfolio/";
      const fileName = imageUrl.replace(base, "");
      await deleteImage.mutateAsync(fileName);
      if (user) {
        user.avatar = "";
      }
      form.setValue("avatar", "");
      toast.success("Đã xóa ảnh thành công!");
    } catch (error) {
      toast.error("Đã có lỗi xảy ra khi xóa ảnh.");
    }
  };

  const form = useForm<UpdateUserBodyType>({
    resolver: zodResolver(UpdateUserBodySchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      address: "",
      avatar: "",
      status: "INACTIVE",
      roleId: 0,
    },
  });
  useEffect(() => {
    if (user && roles && roles.length > 0) {
      form.reset({
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address,
        avatar: user.avatar,
        status: user.status,
        roleId: user.roleId,
      });
    }
  }, [user, roles]);

  async function onSubmit(values: UpdateUserBodyType) {
    try {
      setIsUploading(true);

      if (fileStates.length === 0 && !values.avatar) {
        toast.error("Vui lòng chọn ảnh bìa.");
        setIsUploading(false);
        return;
      }

      let imageUrl = values.avatar;

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
        avatar: imageUrl,
      };

      if (updateUser.isPending) return; // Tương tự như trên
      await updateUser.mutateAsync({
        id: Number(user?.id),
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value}
                          defaultValue={user?.status}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Chọn trạng thái người dùng" />
                          </SelectTrigger>
                          <SelectContent className="bg-black">
                            {Object.entries(UserStatus).map(([key, value]) => (
                              <SelectItem key={key} value={value}>
                                {key}
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
                  name="roleId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          value={field.value ? String(field.value) : undefined}
                          defaultValue={
                            user?.roleId ? String(user.roleId) : undefined
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue>
                              {field.value && roles
                                ? roles?.find((role) => role.id === field.value)
                                    ?.name
                                : "Chọn quyền người dùng"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent className="bg-black">
                            {roles?.map((role) => (
                              <SelectItem key={role.id} value={String(role.id)}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                        {user?.avatar && (
                          <div className="group relative">
                            <div className="h-40 max-w-[400px] overflow-hidden rounded-lg">
                              <Image
                                width={1000}
                                height={1000}
                                src={user?.avatar}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div
                              onClick={(e) => {
                                e.preventDefault();
                                if (user?.avatar)
                                  handleDeleteImage(user?.avatar);
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
