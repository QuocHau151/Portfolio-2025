"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileState, MultiFileDropzone } from "@/components/ui/upLoadFile";
import { useUploadImage } from "@/queries/useMedia";
import {
  useGetProfileById,
  useUpdatePassword,
  useUpdateProfile,
} from "@/queries/useProfile";
import {
  UpdatePasswordBodySchema,
  UpdatePasswordBodyType,
  UpdateProfileBodySchema,
  UpdateProfileBodyType,
} from "@/schemas/profile.schema";
import { useAppStore } from "@/stores/app";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Key, Mail, Phone, Shield, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Mock user data from the provided JSON

export default function SettingsPage() {
  const { account } = useAppStore();
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const profile = useGetProfileById(account?.id as number);
  const user = (profile.data as any)?.payload?.data;
  const uploadImage = useUploadImage();
  const updateProfile = useUpdateProfile();
  const updatePassword = useUpdatePassword();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const changePasswordForm = useForm<UpdatePasswordBodyType>({
    resolver: zodResolver(UpdatePasswordBodySchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const profileForm = useForm<UpdateProfileBodyType>({
    resolver: zodResolver(UpdateProfileBodySchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      avatar: "",
    },
  });

  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.name,
        address: user.address,
        phone: user.phone,
        avatar: user.avatar,
      });
    }
  }, [user, profileForm]);

  async function onAccountSubmit(values: UpdateProfileBodyType) {
    try {
      setIsUploading(true);

      if (fileStates.length === 0 && !values.avatar) {
        toast.error("Vui lòng chọn ảnh bìa.");
        setIsUploading(false);
        return;
      }

      let imageUrl = values.avatar;

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
        avatar: imageUrl,
      };
      await updateProfile.mutateAsync(data);
      toast.success("Bài viết đã được tạo thành công!");

      window.location.reload();
    } catch (error) {
      toast.error("Đã có lỗi xảy ra khi sửa bài viết.");
      console.error(error); // Thiếu log lỗi để debug
    } finally {
      setIsUploading(false);
    }
  }
  async function onChangePasswordSubmit(values: UpdatePasswordBodyType) {
    try {
      setIsUploading(true);
      const data = {
        ...values,
      };
      const result = await updatePassword.mutateAsync(data);
      toast.success((result.payload as any).data.message);
      window.location.reload();
    } catch (error) {
      toast.error((error as any).payload.message);
    } finally {
      setIsUploading(false);
    }
  }
  return (
    <div className="mx-auto w-full px-10 py-5 pb-20">
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Sidebar with user info */}
        <div className="w-full md:w-1/3">
          <h1 className="mb-6 text-4xl font-bold">Profile Settings</h1>
          <Card className="rounded-2xl border border-white">
            <CardHeader className="pb-2">
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your account information</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="mb-4 h-24 w-24 rounded-full border border-white">
                <AvatarImage
                  className=""
                  src={user?.avatar || "/placeholder.svg?height=96&width=96"}
                  alt={user?.name}
                />
                <AvatarFallback className="text-2xl">
                  {user?.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">{user?.name}</h3>
              <p className="text-muted-foreground">{user?.email}</p>
              <div className="mt-2 rounded-xl border border-white">
                <Badge
                  variant={user?.status === "ACTIVE" ? "default" : "secondary"}
                >
                  {user?.status}
                </Badge>
              </div>
              <div className="mt-4 w-full">
                <div className="flex items-center justify-between py-2">
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Shield size={16} />
                    <span>Role</span>
                  </div>
                  <span className="font-medium">{user?.role.name}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Clock size={16} />
                    <span>Member since</span>
                  </div>
                  <span className="text-sm">{formatDate(user?.createdAt)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="w-full md:w-2/3">
          <Tabs defaultValue="account">
            <TabsList className="mb-3 w-full justify-start overflow-x-scroll rounded-xl bg-neutral-800 p-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="change-password">Change Password</TabsTrigger>
            </TabsList>

            <TabsContent
              value="account"
              className="rounded-xl border border-white"
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Account Information</CardTitle>
                      <CardDescription>
                        Manage your personal information
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Form {...profileForm}>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        profileForm.handleSubmit((data) =>
                          onAccountSubmit(data),
                        )(e);
                      }}
                      className="space-y-6"
                    >
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <User
                                size={16}
                                className="text-muted-foreground"
                              />
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Phone
                                size={16}
                                className="text-muted-foreground"
                              />
                              Phone
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Mail
                                size={16}
                                className="text-muted-foreground"
                              />
                              Address
                            </FormLabel>
                            <FormControl>
                              <Input {...field} value={field.value || ""} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Card>
                        <CardHeader className="px-0">
                          <CardTitle>Change Avatar</CardTitle>
                        </CardHeader>
                        <CardContent className="max-w-[400px] px-0 pb-0">
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
                              },
                              maxFiles: 1, // Giới hạn số lượng file
                              maxSize: 10 * 1024 * 1024, // Giới hạn kích thước (10MB)
                            }}
                          />
                        </CardContent>
                      </Card>
                      <Button type="submit">Save Changes</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent
              value="permissions"
              className="rounded-xl border border-white"
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Role & Permissions</CardTitle>
                      <CardDescription>
                        Your access rights and permissions
                      </CardDescription>
                    </div>
                    {
                      <Link href="/admin/setting/role-permission">
                        <Button variant="outline">Edit Permissions</Button>
                      </Link>
                    }
                  </div>
                </CardHeader>
                <CardContent>
                  {
                    <div>
                      <div className="mb-4">
                        <div className="mb-2 flex items-center gap-2">
                          <Shield size={18} className="text-muted-foreground" />
                          <h3 className="font-semibold">Current Role</h3>
                        </div>
                        <div className="mb-4 ml-6">
                          <Badge
                            variant="outline"
                            className="text-base font-semibold"
                          >
                            {user?.role.name}
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <Key size={18} className="text-muted-foreground" />
                          <h3 className="font-semibold">Permissions</h3>
                        </div>
                        <div className="ml-6 space-y-2">
                          {user?.role.permissions.map((permission: any) => (
                            <div
                              key={permission.id}
                              className="bg-muted rounded-xl border border-white p-3"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium">
                                  {permission.name}
                                </span>
                                <Badge variant="outline">
                                  {permission.method}
                                </Badge>
                              </div>
                              {permission.module && (
                                <p className="text-muted-foreground mt-1 text-sm">
                                  Module: {permission.module}
                                </p>
                              )}
                              <p className="text-muted-foreground text-sm">
                                Path: {permission.path}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  }
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent
              value="activity"
              className="rounded-xl border border-white"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Account Activity</CardTitle>
                  <CardDescription>
                    Recent activity on your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2 font-medium">Account Timeline</h3>
                      <div className="space-y-4">
                        <div className="flex">
                          <div className="mr-4 flex flex-col items-center">
                            <div className="bg-primary h-2 w-2 rounded-full"></div>
                            <div className="h-full w-0.5 bg-white"></div>
                          </div>
                          <div>
                            <p className="font-medium">Account Updated</p>
                            <p className="text-muted-foreground text-sm">
                              {formatDate(user?.updatedAt)}
                            </p>
                            <p className="mt-1 text-sm">
                              Your account information was updated
                            </p>
                          </div>
                        </div>

                        <div className="flex">
                          <div className="mr-4 flex flex-col items-center">
                            <div className="bg-primary h-2 w-2 rounded-full"></div>
                            <div className="h-full w-0.5 bg-white"></div>
                          </div>
                          <div>
                            <p className="font-medium">Account Created</p>
                            <p className="text-muted-foreground text-sm">
                              {formatDate(user?.createdAt)}
                            </p>
                            <p className="mt-1 text-sm">
                              Your account was created
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="mb-2 font-medium">Account Details</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">User ID</span>
                          <span>{user?.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status</span>
                          <Badge
                            variant={
                              user?.status === "ACTIVE"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {user?.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Created By
                          </span>
                          <span>{user?.createdById || "System"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Last Updated By
                          </span>
                          <span>{user?.updatedById}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent
              value="change-password"
              className="rounded-xl border border-white"
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Changing Your Password</CardTitle>
                      <CardDescription>
                        Ensure your password is strong and secure
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Form {...changePasswordForm}>
                    <form
                      onSubmit={changePasswordForm.handleSubmit(
                        onChangePasswordSubmit,
                      )}
                      className="space-y-6"
                    >
                      <FormField
                        control={changePasswordForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              Old Password
                            </FormLabel>
                            <FormControl>
                              <Input {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={changePasswordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              New Password
                            </FormLabel>
                            <FormControl>
                              <Input {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={changePasswordForm.control}
                        name="confirmNewPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              Confirm Password
                            </FormLabel>
                            <FormControl>
                              <Input {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit">Save Changes</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
