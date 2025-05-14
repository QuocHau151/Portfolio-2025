"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import {
  useCreateRolePermissions,
  useGetPermissions,
  useUpdateRolePermissions,
} from "@/queries/usePermission";
import {
  useCreateRole,
  useDeleteRole,
  useGetRoleById,
  useGetRoles,
  useUpdateRole,
} from "@/queries/useRole";
import { CreateRoleBodyType, UpdateRoleBodyType } from "@/schemas/role.schema";
import { TabsList } from "@radix-ui/react-tabs";
import { Pencil, Plus, Save, Search, Shield, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RolePermissionPage() {
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<number[]>(
    [],
  );

  // Fetch roles and permissions
  const rolesQuery = useGetRoles();
  const permissionsQuery = useGetPermissions();
  // Extract data from queries
  const roles = rolesQuery.data?.payload.data.roles;
  const permissions = permissionsQuery.data?.payload.data.permissions || [];
  const roleByIdQuery = useGetRoleById(selectedRoleId || 0);
  const role = roleByIdQuery.data?.payload.data;

  const createRoleMutation = useCreateRole();
  const updateRoleMutation = useUpdateRole();
  const deleteRoleMutation = useDeleteRole();
  const createRolePermissionsMutation = useCreateRolePermissions();
  const updateRolePermissionsMutation = useUpdateRolePermissions();

  // Lấy danh sách tất cả module từ permissions API
  const allModules = [
    ...new Set(permissions.map((p) => p.module || "GENERAL")),
  ];

  const selectedRole = selectedRoleId
    ? Array.isArray(roles)
      ? roles.find((role) => role.id === selectedRoleId)
      : null
    : null;

  const permissionsForm = useForm({
    defaultValues: {
      permissions: [],
    },
  });
  const createRoleForm = useForm<CreateRoleBodyType>({
    defaultValues: {
      name: "",
      description: "",
      isActive: true,
    },
  });
  const updateRoleForm = useForm<UpdateRoleBodyType>({
    defaultValues: {
      name: "",
      description: "",
      isActive: true,
      permissionIds: [],
    },
  });
  useEffect(() => {
    if (role?.permissions) {
      // Set default values for permissions form
      updateRoleForm.reset({
        name: role.name,
        description: role.description,
        isActive: true,
        permissionIds: role.permissions.map((p) => p.id),
      });
      setSelectedPermissionIds(role.permissions.map((p) => p.id));
    }
  }, [role]);

  async function DeleteRoleSubmit() {
    if (selectedRoleId) {
      try {
        await deleteRoleMutation.mutateAsync(selectedRoleId);

        setSelectedRoleId(null);
        setShowDeleteDialog(false);
        toast.success("Role deleted successfully");

        // Refresh roles
        rolesQuery.refetch();
      } catch (error) {
        toast.error("Failed to delete role");
        console.error(error);
      }
    }
  }

  function handleAddRole() {
    setSelectedPermissionIds([]);
    setSelectedRoleId(null);
    setIsAddingRole(true);
    setIsEditingRole(false);
  }

  function handleEditRole() {
    if (selectedRole) {
      setIsEditingRole(true);
    }
  }
  async function CreateRoleSubmit(values: CreateRoleBodyType) {
    try {
      setIsEditingRole(true);

      await createRoleMutation.mutateAsync(values);
      toast.success("Role update successfully");

      setIsAddingRole(false);
      setIsEditingRole(false);

      // Refresh roles
      rolesQuery.refetch();
    } catch (error) {
      toast.error((error as any).payload.message);
      console.error(error);
    }
  }
  async function UpdateRoleSubmit(values: UpdateRoleBodyType) {
    try {
      setIsEditingRole(true);
      const data = {
        ...values,
        permissionIds: selectedPermissionIds,
      };

      await updateRoleMutation.mutateAsync({
        id: Number(selectedRoleId),
        data,
      });
      toast.success("Role update successfully");

      setIsAddingRole(false);
      setIsEditingRole(false);

      // Refresh roles
      rolesQuery.refetch();
    } catch (error) {
      toast.error((error as any).payload.message);
      console.error(error);
    }
  }

  const formatDate = (date: string | Date) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isLoading = rolesQuery.isLoading || permissionsQuery.isLoading;
  const isSaving =
    createRoleMutation.isPending ||
    updateRoleMutation.isPending ||
    deleteRoleMutation.isPending ||
    createRolePermissionsMutation.isPending ||
    updateRolePermissionsMutation.isPending;

  if (isLoading) {
    return (
      <div className="container mx-auto py-20 text-center">
        <Shield className="text-muted-foreground mx-auto h-10 w-10 animate-pulse" />
        <p className="mt-4 text-lg">Loading roles and permissions...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full px-10 py-5">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Role Management</h1>
        <Button onClick={handleAddRole} disabled={isSaving}>
          <Plus className="mr-2 h-4 w-4" /> Add Role
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Roles list */}
        <Card className="h-min border border-white">
          <CardHeader>
            <CardTitle>Roles</CardTitle>
            <CardDescription>
              Manage system roles and their permissions
            </CardDescription>
            <div className="relative mt-2">
              <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
              <Input
                placeholder="Search roles..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="">
              <div className="space-y-2">
                {roles?.map((role) => (
                  <div
                    key={role.id}
                    className={`mb-5 cursor-pointer rounded-md border border-white p-3 transition-colors ${
                      selectedRoleId === role.id
                        ? "bg-primary text-black"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => {
                      setSelectedRoleId(role.id);
                      setIsAddingRole(false);
                      setIsEditingRole(false);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{role.name}</div>
                      <Shield className="h-4 w-4" />
                    </div>
                    <p
                      className={`text-sm ${selectedRoleId === role.id ? "text-black" : "text-muted-foreground"}`}
                    >
                      {role.description}
                    </p>
                  </div>
                ))}

                {roles?.length === 0 && (
                  <div className="text-muted-foreground py-4 text-center">
                    No roles found
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Role details and permissions */}
        <Card className="border border-white md:col-span-2">
          {selectedRole || isAddingRole ? (
            <>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      {isAddingRole
                        ? "Add New Role"
                        : isEditingRole
                          ? "Edit Role"
                          : selectedRole?.name}
                    </CardTitle>
                    <CardDescription>
                      {isAddingRole || isEditingRole
                        ? "Configure role details and permissions"
                        : "Manage role details and permissions"}
                    </CardDescription>
                  </div>
                  {selectedRole && !isAddingRole && !isEditingRole && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleEditRole}
                        disabled={isSaving}
                      >
                        <Pencil className="mr-1 h-4 w-4" /> Edit
                      </Button>
                      <AlertDialog
                        open={showDeleteDialog}
                        onOpenChange={setShowDeleteDialog}
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={isSaving}
                          >
                            <Trash2 className="mr-1 h-4 w-4" /> Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-black">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Role</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete the role "
                              {selectedRole.name}"? This action cannot be
                              undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={DeleteRoleSubmit}
                              className="text-destructive bg-red-500"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isAddingRole ? (
                  <Form {...createRoleForm}>
                    <form
                      onSubmit={createRoleForm.handleSubmit(CreateRoleSubmit)}
                      className="mb-6 space-y-4"
                    >
                      <FormField
                        control={createRoleForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Enter role name" />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createRoleForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter role description"
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsAddingRole(false);
                            setIsEditingRole(false);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isSaving}>
                          {isAddingRole ? "Create Role" : "Update Role"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-muted-foreground text-sm font-medium">
                        Role Details
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Name</p>
                          <p>{role?.name}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Active</p>
                          <p>{role?.isActive ? "True" : "False"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Created</p>
                          <p>
                            {role?.createdAt
                              ? formatDate(role.createdAt)
                              : "N/A"}
                          </p>
                        </div>
                        <div className="">
                          <p className="text-sm font-medium">Description</p>
                          <p>{role?.description}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Last Updated</p>
                          <p>
                            {role?.updatedAt
                              ? formatDate(role.updatedAt)
                              : "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Permissions</p>
                          <p className="text-sm">{`${role?.permissions.length}/${permissions.length}`}</p>
                        </div>
                      </div>
                    </div>

                    <Tabs defaultValue="permissions">
                      <TabsList>
                        <TabsTrigger value="permissions">
                          Permissions
                        </TabsTrigger>
                        <TabsTrigger value="users">Assigned Users</TabsTrigger>
                      </TabsList>
                      <TabsContent value="permissions" className="pt-4">
                        <Form {...updateRoleForm}>
                          <form
                            onSubmit={updateRoleForm.handleSubmit(
                              UpdateRoleSubmit,
                            )}
                          >
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium">
                                  Manage Permissions
                                </h3>
                                <Button
                                  className={`${isEditingRole === true ? "flex" : "hidden"} `}
                                  type="submit"
                                  size="sm"
                                  disabled={isSaving}
                                >
                                  <Save className="mr-1 h-4 w-4" /> Save Changes
                                </Button>
                              </div>

                              <div className="space-y-6">
                                {allModules.map((module) => {
                                  // Lọc các permissions thuộc module hiện tại
                                  const modulePermissions = permissions.filter(
                                    (p) =>
                                      (p.module || "GENERAL") ===
                                      (module || "GENERAL"),
                                  );

                                  // Chỉ hiển thị module có ít nhất 1 permission
                                  return modulePermissions.length > 0 ? (
                                    <div
                                      key={module || "GENERAL"}
                                      className="space-y-2"
                                    >
                                      {/* Module header */}
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <Checkbox
                                            checked={
                                              modulePermissions.length > 0 &&
                                              modulePermissions.every((p) =>
                                                selectedPermissionIds.includes(
                                                  p.id,
                                                ),
                                              )
                                            }
                                            onCheckedChange={(checked) => {
                                              // Lấy danh sách ID của tất cả permissions trong module này
                                              const modulePermissionIds =
                                                modulePermissions.map(
                                                  (p) => p.id,
                                                );

                                              if (checked) {
                                                // Nếu check, thêm tất cả permissions của module vào danh sách
                                                setSelectedPermissionIds(
                                                  (prev) => {
                                                    // Tạo một Set từ danh sách hiện tại và thêm tất cả permissions mới
                                                    const newPermissionIds =
                                                      new Set([...prev]);
                                                    modulePermissionIds.forEach(
                                                      (id) =>
                                                        newPermissionIds.add(
                                                          id,
                                                        ),
                                                    );
                                                    return Array.from(
                                                      newPermissionIds,
                                                    );
                                                  },
                                                );
                                              } else {
                                                // Nếu uncheck, loại bỏ tất cả permissions của module khỏi danh sách
                                                setSelectedPermissionIds(
                                                  (prev) =>
                                                    prev.filter(
                                                      (id) =>
                                                        !modulePermissionIds.includes(
                                                          id,
                                                        ),
                                                    ),
                                                );
                                              }
                                            }}
                                          />
                                          <div className="font-medium">
                                            {module || "GENERAL"}
                                          </div>
                                        </div>
                                        <div className="text-muted-foreground text-xs">
                                          {
                                            modulePermissions.filter((p) =>
                                              selectedPermissionIds.includes(
                                                p.id,
                                              ),
                                            ).length
                                          }
                                          /{modulePermissions.length}{" "}
                                          permissions
                                        </div>
                                      </div>

                                      <div className="ml-6 space-y-2">
                                        {modulePermissions.map((permission) => (
                                          <FormField
                                            key={permission.id}
                                            control={permissionsForm.control}
                                            name="permissions"
                                            render={({ field }) => (
                                              <FormItem className="hover:bg-muted flex items-center justify-between rounded-md border border-white p-3">
                                                <div className="flex items-center gap-2">
                                                  <FormControl>
                                                    <Checkbox
                                                      checked={selectedPermissionIds.includes(
                                                        permission.id,
                                                      )}
                                                      onCheckedChange={(
                                                        checked,
                                                      ) => {
                                                        if (checked) {
                                                          // Nếu được check, thêm vào mảng nếu chưa có
                                                          if (
                                                            !selectedPermissionIds.includes(
                                                              permission.id,
                                                            )
                                                          ) {
                                                            setSelectedPermissionIds(
                                                              (prev) => [
                                                                ...prev,
                                                                permission.id,
                                                              ],
                                                            );
                                                          }
                                                        } else {
                                                          // Nếu được uncheck, loại bỏ khỏi mảng
                                                          setSelectedPermissionIds(
                                                            (prev) =>
                                                              prev.filter(
                                                                (id) =>
                                                                  id !==
                                                                  permission.id,
                                                              ),
                                                          );
                                                        }
                                                      }}
                                                    />
                                                  </FormControl>
                                                  <div className="flex flex-col">
                                                    <FormLabel className="text-sm font-normal">
                                                      {permission.name}
                                                    </FormLabel>
                                                    {permission.path && (
                                                      <FormDescription className="mt-0 text-xs">
                                                        {permission.path}
                                                      </FormDescription>
                                                    )}
                                                  </div>
                                                </div>
                                                <Badge
                                                  variant="outline"
                                                  className="bg-primary/10 rounded-full px-2"
                                                >
                                                  {permission.method}
                                                </Badge>
                                              </FormItem>
                                            )}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  ) : null;
                                })}
                              </div>
                            </div>
                          </form>
                        </Form>
                      </TabsContent>
                      <TabsContent value="users" className="pt-4">
                        <div className="py-8 text-center">
                          <p className="text-muted-foreground">
                            User assignment feature coming soon
                          </p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </CardContent>
            </>
          ) : (
            <div className="flex h-[calc(100vh-300px)] flex-col items-center justify-center">
              <Shield className="text-muted-foreground mb-4 h-16 w-16" />
              <h3 className="mb-2 text-xl font-medium">No Role Selected</h3>
              <p className="text-muted-foreground mb-6 max-w-md text-center">
                Select a role from the list to view and manage its permissions,
                or create a new role.
              </p>
              <Button onClick={handleAddRole}>
                <Plus className="mr-2 h-4 w-4" /> Add New Role
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
