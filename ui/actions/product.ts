import http from "@/libs/http";

export const apiProductRequest = {
  getProducts: () => {
    return http.get("/products");
  },
  getProductID: (id: number) => {
    return http.get(`/products/${id}`);
  },
  createProduct: (data: any) => {
    return http.post("/manage-product/products", data);
  },
  updateProduct: ({ id, data }: { id: number; data: any }) => {
    return http.put(`/manage-product/products/${id}`, data);
  },
  deleteProduct: (id: number) => {
    return http.delete(`/manage-product/products/${id}`);
  },
};
