"use client";

import { format } from "date-fns";
import { ArrowLeft, Edit, Loader2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBrandByIdQuery } from "@/queries/useBrand";
import { useGetProductIdQuery } from "@/queries/useProduct";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const getProduct = useGetProductIdQuery(Number(id));
  const product = (getProduct.data?.payload as any)?.data;
  const getBrandId = useGetBrandByIdQuery(product?.brandId);
  const brand = (getBrandId.data?.payload as any)?.data.name;
  console.log(brand);
  // Calculate total stock
  const totalStock =
    product?.skus.reduce((sum: any, sku: any) => sum + sku.stock, 0) || 0;

  if (getProduct.isPending) {
    return (
      <div className="container mx-auto flex min-h-[50vh] items-center justify-center py-10">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
          <p>Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto w-full px-5 py-5">
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Lỗi</AlertTitle>
          <AlertDescription>
            {error || "Không thể tải thông tin sản phẩm"}
          </AlertDescription>
        </Alert>
        <Button
          onClick={() => router.push("/admin/product")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Quay lại danh sách sản phẩm
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full px-5 py-5">
      <div className="rounded-xl border border-white p-5">
        <div className="flex items-center justify-between border-b-1 border-white pb-5">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/product")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Quay lại
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => router.push(`/admin/product/${id}/edit`)}
            >
              <Edit className="h-4 w-4" /> Chỉnh sửa
            </Button>
            <Button variant="destructive" className="flex items-center gap-2">
              <Trash className="h-4 w-4" /> Xóa
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{product.name}</CardTitle>
                <CardDescription>
                  ID: {product.id} • Cập nhật:{" "}
                  {format(new Date(product.publishedAt), "dd/MM/yyyy")}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.basePrice * 1000)}
                </div>
                {product.virtualPrice > product.basePrice && (
                  <div className="text-muted-foreground line-through">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.virtualPrice * 1000)}
                  </div>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-lg font-medium">Thông tin cơ bản</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Thương hiệu:</span>
                    <div className="flex flex-wrap gap-2">
                      {product?.brands?.map((brand: any, index: any) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="border border-white"
                        >
                          {brand.name}
                        </Badge>
                      ))}
                      {product?.brands?.length === 0 && (
                        <span className="text-muted-foreground">
                          Chưa có danh mục
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Danh mục:</span>
                    <div className="flex flex-wrap gap-2">
                      {product?.categories?.map((category: any, index: any) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="border border-white"
                        >
                          {category.name}
                        </Badge>
                      ))}
                      {product?.categories?.length === 0 && (
                        <span className="text-muted-foreground">
                          Chưa có danh mục
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tổng tồn kho:</span>
                    <span>{totalStock} sản phẩm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Số SKU:</span>
                    <span>{product.skus.length}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="mb-2 text-lg font-medium">Biến thể</h3>
              <div className="space-y-4">
                {product.variants.map((variant: any, index: any) => (
                  <div key={index}>
                    <h4 className="font-medium">{variant.value}</h4>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {variant.options.map((option: any, optIndex: any) => (
                        <Badge key={optIndex} variant="outline">
                          {option}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="mb-2 text-lg font-medium">SKUs</h3>
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
                    {product.skus.map((sku: any, index: any) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {sku.value}
                        </TableCell>
                        <TableCell>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(sku.price * 1000)}
                        </TableCell>
                        <TableCell>{sku.stock}</TableCell>
                        <TableCell>
                          {sku.image ? (
                            <div className="bg-muted h-10 w-10 rounded-md">
                              {/* Image would go here */}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">
                              Không có
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t pt-6">
            <div className="text-muted-foreground text-sm">
              Cập nhật lần cuối:{" "}
              {format(new Date(product.publishedAt), "dd/MM/yyyy HH:mm")}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
