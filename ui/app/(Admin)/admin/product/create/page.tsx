"use client";

import type React from "react";

import { format } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { MultiSelect } from "@/components/feature/MutiSelect";
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
import { useUploadImage } from "@/queries/useMedia";
import { useCreateProductMutation } from "@/queries/useProduct";
import { ProductFormData, SKUType } from "@/types/product.type";
import { toast } from "sonner";

export default function ProductForm() {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectCategories, setSelectCategories] = useState<string[]>([]);
  const [selectBrands, setSelectBrands] = useState<string[]>([]);
  const uploadImage = useUploadImage();
  const createProduct = useCreateProductMutation();
  const [formData, setFormData] = useState<ProductFormData>({
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
  // Update SKUs when variants change
  useEffect(() => {
    if (
      formData.variants.length > 0 &&
      formData.variants.every((v) => v.options.length > 0)
    ) {
      setFormData((prev) => ({
        ...prev,
        skus: generateSKUs(prev.variants),
      }));
    }
  }, [formData.variants]);

  // Update publishedAt when date changes
  useEffect(() => {
    if (date) {
      setFormData((prev) => ({
        ...prev,
        publishedAt: date.toISOString(),
      }));
    }
  }, [date]);

  // Handle variant changes
  const handleVariantChange = (
    index: number,
    field: "value" | "options",
    value: string | string[],
  ) => {
    const newVariants = [...formData.variants];
    if (field === "value") {
      newVariants[index].value = value as string;
    } else {
      // For options, we're expecting a comma-separated string
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
    // Store the raw input value without processing
    const newVariants = [...formData.variants];
    newVariants[index].options = value
      .split(",")
      .map((opt) => opt.trim())
      .filter(Boolean);
    // We'll only update the UI with this value, not the actual options array yet
    setFormData((prev) => ({
      ...prev,
      variants: newVariants,
    }));

    // Update the input field directly
    const inputElement = document.getElementById(
      `variant-options-${index}`,
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = value;
    }
  };

  const handleReloadSku = () => {
    setFormData((prev) => ({
      ...prev,
      skus: generateSKUs(prev.variants),
    }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // 1. Upload general product images
      let productImages: string[] = [];
      if (fileStates.length > 0) {
        const generalFormData = new FormData();
        fileStates.forEach((state) => {
          if (state.file) {
            generalFormData.append("files", state.file);
          }
        });

        if (!uploadImage.isPending) {
          const uploadResult = await uploadImage.mutateAsync(generalFormData);
          productImages = uploadResult?.payload.data.map((item) => item.url);
        }
      }

      // 2. Upload SKU images
      const skusWithUrls = await Promise.all(
        formData.skus.map(async (sku) => {
          // If no files, return sku with empty images array and no files property
          if (!sku.files?.length) {
            const { files, ...skuWithoutFiles } = sku;
            return {
              ...skuWithoutFiles,
              images: [],
            };
          }

          const skuFormData = new FormData();
          sku.files.forEach((state) => {
            if (state.file) {
              skuFormData.append("files", state.file);
            }
          });

          if (!uploadImage.isPending) {
            const uploadResult = await uploadImage.mutateAsync(skuFormData);
            const skuImageUrls = uploadResult?.payload.data.map(
              (item) => item.url,
            );

            // Remove files property and return with uploaded image URLs
            const { files, ...skuWithoutFiles } = sku;
            return {
              ...skuWithoutFiles,
              images: skuImageUrls || [],
            };
          }

          // Fallback case: return without files property and empty images
          const { files, ...skuWithoutFiles } = sku;
          return {
            ...skuWithoutFiles,
            images: [],
          };
        }),
      );

      // 3. Prepare final form data
      const finalFormData = {
        ...formData,
        images: productImages,
        skus: skusWithUrls,
      };

      const result = await createProduct.mutateAsync(finalFormData);

      toast.success((result.payload as any).data.message);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Có lỗi xảy ra khi tạo sản phẩm!");
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
                    <Label htmlFor="brandId">Thương hiệu ID</Label>
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
                    <p
                      className="text-primary cursor-pointer"
                      onClick={handleReloadSku}
                    >
                      Reload
                    </p>
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
    </div>
  );
}
