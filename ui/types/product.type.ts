import { FileState } from "@/components/ui/upLoadFile";

export type VariantType = {
  value: string;
  options: string[];
};

export type VariantsType = VariantType[];

export type SKUTypeCreate = {
  value: string;
  price: number;
  stock: number;
  files: FileState[];
};
export type SKUTypeUpdate = {
  value: string;
  price: number;
  stock: number;
  images: string[];
  files: FileState[];
};
export type ProductFormData = {
  name: string;
  publishedAt: string;
  basePrice: number;
  virtualPrice: number;
  brands: Brand[];
  images: string[];
  categories: Category[];
  skus: SKUTypeCreate[];
  variants: VariantType[];
};
export type ProductUpdateFormData = {
  name: string;
  publishedAt: string;
  basePrice: number;
  virtualPrice: number;
  brands: Brand[];
  images: string[];
  categories: Category[];
  skus: SKUTypeUpdate[];
  variants: VariantType[];
};
export type SKUType = {
  value: string;
  price: number;
  stock: number;
  images: string[];
};
export type Category = {
  id: number;
  name: string;
};
export type Brand = {
  id: number;
  name: string;
};
export type Product = {
  id: number;
  name: string;
  publishedAt: string;
  basePrice: number;
  virtualPrice: number;
  brands: Brand[];
  images: string[];
  categories: Category[];
  skus: SKUType[];
  variants: VariantType[];
};
