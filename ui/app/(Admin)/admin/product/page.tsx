"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus } from "lucide-react";
import { useEffect, useState } from "react";

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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/queries/useProduct";
import { Product } from "@/types/product.type";
import Link from "next/link";
import { toast } from "sonner";

// Table columns definition
const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên sản phẩm
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "basePrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Giá cơ bản
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("basePrice"));
      const formatted = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount * 1000); // Assuming the price is in thousands

      return <div className="font-medium">{formatted}</div>;
    },
  },

  {
    accessorKey: "brands",
    header: "Danh Mục",
    cell: ({ row }) => {
      const brands = row.original.brands;
      return (
        <div className="flex flex-wrap gap-1">
          {brands.map((brand, index) => (
            <Badge key={index} variant="outline" className="whitespace-nowrap">
              {brand?.name}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "categories",
    header: "Danh Mục",
    cell: ({ row }) => {
      const categories = row.original.categories;
      return (
        <div className="flex flex-wrap gap-1">
          {categories.map((category, index) => (
            <Badge key={index} variant="outline" className="whitespace-nowrap">
              {category?.name}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "variants",
    header: "Biến thể",
    cell: ({ row }) => {
      const variants = row.original.variants;
      return (
        <div className="flex flex-wrap gap-1">
          {variants.map((variant, index) => (
            <Badge key={index} variant="outline" className="whitespace-nowrap">
              {variant.value}: {variant.options.join(", ")}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "skus",
    header: "SKUs",
    cell: ({ row }) => {
      const skusCount = row.original.skus.length;
      return <div className="text-center">{skusCount}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tồn kho
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      // Calculate total stock from all SKUs
      const totalStock = row.original.skus.reduce(
        (sum, sku) => sum + sku.stock,
        0,
      );
      return <div className="text-center font-medium">{totalStock}</div>;
    },
  },
  {
    accessorKey: "publishedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngày xuất bản
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("publishedAt"));
      return <div>{format(date, "dd/MM/yyyy")}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
      const deleteProduct = useDeleteProductMutation();
      const handleDelete = async () => {
        try {
          await deleteProduct.mutateAsync(Number(product.id));
          toast.success("Xoá Sản Phẩm Thành Công");
        } catch (error) {
          console.log(error);
          toast.error("Đã có lỗi xảy ra");
        }
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Mở menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-black">
            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(product.id.toString())
              }
            >
              Sao chép ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/admin/product/${product.id}`}>Xem Chi Tiết</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/admin/product/${product.id}/edit`}>Chỉnh sửa</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => {
                handleDelete();
              }}
            >
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function ProductsPage() {
  const [data, setData] = useState<Product[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const getProducts = useGetProductsQuery();

  useEffect(() => {
    if (getProducts) {
      setData((getProducts.data?.payload as any)?.data?.data);
    }
  }, [getProducts.data]);

  const table = useReactTable({
    data: data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="mx-auto w-full">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-0">
          <div>
            <CardTitle className="text-2xl">Quản lý sản phẩm</CardTitle>
            <CardDescription>
              Danh sách tất cả sản phẩm trong hệ thống. Bạn có thể thêm, sửa,
              xóa sản phẩm.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Link href={"/admin/product/create"}>
              <Button className="flex items-center gap-1">
                <Plus className="h-4 w-4" /> Thêm sản phẩm
              </Button>
            </Link>
            <Link href={"/admin/product/brand"}>
              <Button className="flex items-center gap-1">
                <Plus className="h-4 w-4" /> Thương Hiệu
              </Button>
            </Link>
            <Link href={"/admin/product/category"}>
              <Button className="flex items-center gap-1">
                <Plus className="h-4 w-4" /> Danh Mục
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-4">
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <div className="flex items-center gap-2">
              {table.getFilteredSelectedRowModel().rows.length > 0 && (
                <Button variant="destructive" size="sm" className="h-8">
                  Xóa ({table.getFilteredSelectedRowModel().rows.length})
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Cột <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id === "basePrice"
                            ? "Giá cơ bản"
                            : column.id === "publishedAt"
                              ? "Ngày xuất bản"
                              : column.id === "brandId"
                                ? "Thương hiệu"
                                : column.id === "variants"
                                  ? "Biến thể"
                                  : column.id === "skus"
                                    ? "SKUs"
                                    : column.id === "stock"
                                      ? "Tồn kho"
                                      : column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Không tìm thấy sản phẩm nào.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="text-muted-foreground flex-1 text-sm">
              {table.getFilteredSelectedRowModel().rows.length} /{" "}
              {table.getFilteredRowModel().rows.length} sản phẩm được chọn.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Trước
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Sau
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
