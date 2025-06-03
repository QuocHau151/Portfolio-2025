"use client";

import type React from "react";

import { format } from "date-fns";
import { CalendarIcon, Plus, Trash2, X } from "lucide-react";
import { use, useEffect, useState } from "react";

import { MultiSelect } from "@/components/feature/MutiSelect";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileState, MultiFileDropzone } from "@/components/ui/upLoadFile";
import { cn, generateSKUs } from "@/libs/utils";
import { useGetBrandsQuery } from "@/queries/useBrand";
import { useGetCategoriesQuery } from "@/queries/useCategory";
import { useDeleteImage, useUploadImage } from "@/queries/useMedia";
import {
  useGetProductIdQuery,
  useUpdateProductMutation,
} from "@/queries/useProduct";
import { ProductUpdateFormData, SKUType } from "@/types/product.type";
import Image from "next/image";
import { toast } from "sonner";

export default function ProductForm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isVariantManuallyChanged, setIsVariantManuallyChanged] =
    useState(false);
  const [hasConfirmedVariantChange, setHasConfirmedVariantChange] =
    useState(false);
  const deleteImage = useDeleteImage();
  const [selectCategories, setSelectCategories] = useState<string[]>([]);
  const [selectBrands, setSelectBrands] = useState<string[]>([]);
  const uploadImage = useUploadImage();
  const updateProduct = useUpdateProductMutation();
  const getProductId = useGetProductIdQuery(Number(id));
  const product = (getProductId.data?.payload as any)?.data;

  const [formData, setFormData] = useState<ProductUpdateFormData>({
    name: "",
    publishedAt: "",
    basePrice: 0,
    virtualPrice: 0,
    brands: [],
    images: [],
    categories: [],
    skus: [],
    variants: [],
  });
  useEffect(() => {
    if (product) {
      setIsVariantManuallyChanged(false);
      setFormData({
        name: product.name || "",
        publishedAt: product.publishedAt || "",
        basePrice: product.basePrice || 0,
        virtualPrice: product.virtualPrice || 0,
        brands: product.brands?.map((brand: any) => brand.id) || [],
        images: product.images || [],
        categories:
          product.categories?.map((category: any) => category.id) || [],
        skus:
          product.skus?.map((sku: any) => ({
            value: sku.value,
            price: sku.price,
            stock: sku.stock,
            images: sku.images || [], // Preserve existing images
            files: [],
          })) || [],
        variants:
          product.variants?.map((variant: any) => ({
            value: variant.value,
            options: variant.options,
          })) || [],
      });

      // Update MultiSelect values
      setSelectCategories(
        product.categories?.map((category: any) => category.name) || [],
      );
      setSelectBrands(product.brands?.map((brand: any) => brand.name) || []);

      if (product.publishedAt) {
        setDate(new Date(product.publishedAt));
      }
    }
  }, [product]);

  // bug khi thêm variant thì sku rest []
  useEffect(() => {
    if (
      isVariantManuallyChanged &&
      formData.variants.length > 0 &&
      formData.variants.every((v) => v.options.length > 0)
    ) {
      const newSkus = generateSKUs(formData.variants);

      // Preserve existing SKU data (price, stock, images)
      const updatedSkus = newSkus.map((newSku) => {
        const existing = formData.skus.find((s) => s.value === newSku.value);
        return {
          ...newSku,
          price: existing?.price || 0,
          stock: existing?.stock || 0,
          images: existing?.images || [],
        };
      });

      setFormData((prev) => ({
        ...prev,
        skus: updatedSkus,
      }));
    }
  }, [formData.variants, isVariantManuallyChanged]);
  const [date, setDate] = useState<Date | undefined>(
    formData.publishedAt ? new Date(formData.publishedAt) : undefined,
  );
  const getCategory = useGetCategoriesQuery();
  const getBrand = useGetBrandsQuery();
  const categories = (getCategory.data?.payload as any)?.data?.data.map(
    (item: any) => ({
      id: item.id,
      name: item.name,
    }),
  );
  const brands = (getBrand.data?.payload as any)?.data?.data.map(
    (item: any) => ({
      id: item.id,
      name: item.name,
    }),
  );

  // Update publishedAt when date changes
  useEffect(() => {
    if (date) {
      setFormData((prev) => ({
        ...prev,
        publishedAt: date.toISOString(),
      }));
    }
  }, [date]);

  // Modify the handleVariantChange function
  const handleVariantChange = (
    index: number,
    field: "value" | "options",
    value: string | string[],
  ) => {
    // Only show dialog if user hasn't confirmed yet
    if (!hasConfirmedVariantChange) {
      setIsVariantManuallyChanged(true);
    } else {
      // If already confirmed, update variants directly
      updateVariants(index, field, value);
    }
  };

  // Add helper function to update variants
  const updateVariants = (
    index: number,
    field: "value" | "options",
    value: string | string[],
  ) => {
    const newVariants = [...formData.variants];
    if (field === "value") {
      newVariants[index].value = value as string;
    } else {
      if (typeof value === "string") {
        newVariants[index].options = value
          .split(",")
          .map((opt) => opt.trim())
          .filter(Boolean);
      } else {
        newVariants[index].options = value;
      }
    }

    setFormData((prev) => ({
      ...prev,
      variants: newVariants,
    }));
  };

  // Add this new function to handle options input directly
  const handleOptionsInputChange = (index: number, value: string) => {
    setIsVariantManuallyChanged(true);
    const newVariants = [...formData.variants];
    newVariants[index].options = value
      .split(",")
      .map((opt) => opt.trim())
      .filter(Boolean);
    setFormData((prev) => ({
      ...prev,
      variants: newVariants,
    }));

    const inputElement = document.getElementById(
      `variant-options-${index}`,
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = value;
    }
  };

  // Handle basic input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number.parseFloat(value) || 0 : value,
    }));
  };

  // Add new variant
  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, { value: "", options: [] }],
    }));
  };

  // Remove variant
  const removeVariant = (index: number) => {
    const newVariants = [...formData.variants];
    newVariants.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      variants: newVariants,
    }));
  };

  // Handle SKU changes
  const handleSkuChange = (
    index: number,
    field: keyof SKUType,
    value: string | number,
  ) => {
    const newSkus = [...formData.skus];
    if (field === "price" || field === "stock") {
      newSkus[index][field] =
        typeof value === "number"
          ? value
          : Number.parseFloat(value as string) || 0;
    }

    setFormData((prev) => ({
      ...prev,
      skus: newSkus,
    }));
  };
  const handleSkuFilesChange = (index: number, files: FileState[]) => {
    const newSkus = [...formData.skus];
    newSkus[index] = {
      ...newSkus[index],
      files: files,
    };
    setFormData((prev) => ({
      ...prev,
      skus: newSkus,
    }));
  };

  const handleSkuFilesAdded = (index: number, newFiles: FileState[]) => {
    const newSkus = [...formData.skus];
    newSkus[index] = {
      ...newSkus[index],
      files: [...(newSkus[index].files || []), ...newFiles],
    };
    setFormData((prev) => ({
      ...prev,
      skus: newSkus,
    }));
  };
  const handleDeleteImage = async (skuIndex: number, imageUrl: string) => {
    try {
      // Extract file name from URL
      const img = imageUrl.replace("https://s3.quochau.com/portfolio/", "");

      // Delete from S3
      await deleteImage.mutateAsync(img);

      // Update local state by removing the deleted image
      setFormData((prev) => {
        const newSkus = [...prev.skus];
        newSkus[skuIndex] = {
          ...newSkus[skuIndex],
          images: newSkus[skuIndex].images.filter((url) => url !== imageUrl),
        };

        return {
          ...prev,
          skus: newSkus,
        };
      });

      toast.success("Xóa ảnh thành công");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Có lỗi xảy ra khi xóa ảnh!");
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // 1. Handle general product images
      let productImages = [...formData.images]; // Keep existing images
      if (fileStates.length > 0) {
        const generalFormData = new FormData();
        fileStates.forEach((state) => {
          if (state.file) {
            generalFormData.append("files", state.file);
          }
        });

        if (!uploadImage.isPending) {
          const uploadResult = await uploadImage.mutateAsync(generalFormData);
          const newImages = uploadResult?.payload.data.map((item) => item.url);
          productImages = [...productImages, ...newImages]; // Merge with existing images
        }
      }

      // 2. Handle SKU images
      const skusWithUrls = await Promise.all(
        formData.skus.map(async (sku) => {
          // If no new files, keep existing images
          if (!sku.files?.length) {
            const { files, ...skuWithoutFiles } = sku;
            return {
              ...skuWithoutFiles,
              images: sku.images || [], // Keep existing images
            };
          }

          // Upload new images
          const skuFormData = new FormData();
          sku.files.forEach((state) => {
            if (state.file) {
              skuFormData.append("files", state.file);
            }
          });

          if (!uploadImage.isPending) {
            const uploadResult = await uploadImage.mutateAsync(skuFormData);
            const newSkuImages = uploadResult?.payload.data.map(
              (item) => item.url,
            );

            const { files, ...skuWithoutFiles } = sku;
            return {
              ...skuWithoutFiles,
              // Merge existing and new images
              images: [...(sku.images || []), ...(newSkuImages || [])],
            };
          }

          return sku;
        }),
      );

      const finalFormData = {
        ...formData,
        images: productImages,
        skus: skusWithUrls,
      };

      const result = await updateProduct.mutateAsync({
        id: Number(id),
        data: finalFormData,
      });

      toast.success((result.payload as any).data.message);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Có lỗi xảy ra khi cập nhật sản phẩm!");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mx-auto my-5 w-full">
      <form
        onSubmit={handleSubmit}
        className="mx-5 rounded-xl border border-white px-5 pb-10"
      >
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Thông tin sản phẩm</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-neutral-900">
                <TabsTrigger value="basic">Cơ bản</TabsTrigger>
                <TabsTrigger value="variants">Biến thể</TabsTrigger>
                <TabsTrigger value="skus">SKUs</TabsTrigger>
                <TabsTrigger value="media">Hình ảnh</TabsTrigger>
              </TabsList>

              {/* Basic Information Tab */}
              <TabsContent value="basic" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tên sản phẩm</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="publishedAt " className="">
                      Ngày xuất bản
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "mt-2 w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Chọn ngày</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="basePrice">Giá cơ bản</Label>
                    <Input
                      id="basePrice"
                      name="basePrice"
                      type="number"
                      value={formData.basePrice}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="virtualPrice">Giá ảo</Label>
                    <Input
                      id="virtualPrice"
                      name="virtualPrice"
                      type="number"
                      value={formData.virtualPrice}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brands">Thương hiệu ID</Label>
                    <MultiSelect
                      selected={selectBrands}
                      options={brands}
                      onChange={(values: string[]) => {
                        setSelectBrands(values);
                        const brandIds = values
                          .map((selectedName) => {
                            const brand = brands?.find(
                              (cat: any) => cat.name === selectedName,
                            );
                            return brand?.id;
                          })
                          .filter((id) => id !== undefined);

                        setFormData((prev) => ({
                          ...prev,
                          brands: brandIds,
                        }));
                      }}
                      placeholder="Chọn Danh Mục..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="categories">Danh Mục ID</Label>
                    <MultiSelect
                      selected={selectCategories}
                      options={categories}
                      onChange={(values: string[]) => {
                        setSelectCategories(values);
                        const categoryIds = values
                          .map((selectedName) => {
                            const category = categories?.find(
                              (cat: any) => cat.name === selectedName,
                            );
                            return category?.id;
                          })
                          .filter((id) => id !== undefined);

                        setFormData((prev) => ({
                          ...prev,
                          categories: categoryIds,
                        }));
                      }}
                      placeholder="Chọn Danh Mục..."
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Variants Tab */}
              <TabsContent value="variants" className="space-y-4 pt-4">
                <div className="space-y-4">
                  {formData.variants.map((variant, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 items-end gap-4 rounded-md border p-4 md:grid-cols-3"
                    >
                      <div className="space-y-2">
                        <Label htmlFor={`variant-name-${index}`}>
                          Tên biến thể
                        </Label>
                        <Input
                          id={`variant-name-${index}`}
                          value={variant.value}
                          onChange={(e) =>
                            handleVariantChange(index, "value", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor={`variant-options-${index}`}>
                          Tùy chọn (phân cách bằng dấu phẩy)
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            id={`variant-options-${index}`}
                            defaultValue={variant.options.join(", ")}
                            onChange={(e) =>
                              handleOptionsInputChange(index, e.target.value)
                            }
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removeVariant(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button type="button" onClick={addVariant} className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Thêm biến thể
                  </Button>
                </div>
              </TabsContent>

              {/* SKUs Tab */}
              <TabsContent value="skus" className="space-y-4 pt-4">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Biến thể</TableHead>
                        <TableHead>Giá</TableHead>
                        <TableHead>Tồn kho</TableHead>
                        <TableHead>Hình ảnh</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formData.skus.map((sku, index) => (
                        <TableRow key={index}>
                          <TableCell>{sku.value}</TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={sku.price}
                              onChange={(e) =>
                                handleSkuChange(index, "price", e.target.value)
                              }
                              className="w-24"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={sku.stock}
                              onChange={(e) =>
                                handleSkuChange(index, "stock", e.target.value)
                              }
                              className="w-24"
                            />
                          </TableCell>
                          <TableCell>
                            <MultiFileDropzone
                              value={sku.files || []}
                              onChange={(files) =>
                                handleSkuFilesChange(index, files)
                              }
                              onFilesAdded={(added) =>
                                handleSkuFilesAdded(index, added)
                              }
                            />
                            <div className="my-5 flex flex-wrap gap-2">
                              {sku.images &&
                                sku.images.map(
                                  (imageUrl: string, idx: number) => (
                                    <div key={idx} className="group relative">
                                      <Image
                                        src={imageUrl}
                                        width={200}
                                        height={200}
                                        alt={`SKU ${sku.value} Image ${idx + 1}`}
                                        className="rounded-md object-cover"
                                      />
                                      <div
                                        className="absolute -top-2 -right-2 h-min w-min cursor-pointer rounded-full bg-red-500 p-0.5"
                                        onClick={() =>
                                          handleDeleteImage(index, imageUrl)
                                        }
                                      >
                                        <X size={15} />
                                      </div>
                                    </div>
                                  ),
                                )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="text-muted-foreground text-sm">
                  <p>
                    SKUs được tạo tự động dựa trên các biến thể. Thêm hoặc chỉnh
                    sửa biến thể để cập nhật SKUs.
                  </p>
                  <div className="flex gap-2">
                    <p>Nếu chưa cập nhật SKUs thì bấm </p>
                    <p className="text-primary cursor-pointer">Reload</p>
                  </div>
                </div>
              </TabsContent>

              {/* Media Tab */}
              <TabsContent value="media" className="space-y-4 pt-4">
                <MultiFileDropzone
                  value={fileStates}
                  onChange={setFileStates}
                  onFilesAdded={(added) =>
                    setFileStates([...fileStates, ...added])
                  }
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Hủy
          </Button>
          <Button type="submit">Lưu sản phẩm</Button>
        </div>
      </form>
      <AlertDialog
        open={isVariantManuallyChanged && !hasConfirmedVariantChange}
        onOpenChange={(open) => {
          if (!open) setIsVariantManuallyChanged(false);
        }}
      >
        <AlertDialogContent className="bg-black">
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận chỉnh sửa SKU</AlertDialogTitle>
            <AlertDialogDescription>
              Khi thay đổi các biến thể thì có thể làm mất hình ảnh đã upload.
              Bạn có chắc chắn muốn thay đổi
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setIsVariantManuallyChanged(false)}
            >
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setHasConfirmedVariantChange(true);
                setIsVariantManuallyChanged(false);
                // Update the variants with the pending changes
              }}
            >
              Xác nhận
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
