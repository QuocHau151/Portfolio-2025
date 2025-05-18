import http from "@/libs/http";

export const apiCategoriesRequest = {
  getCategories: () => {
    return http.get("/categories");
  },
  getCategoriesID: (id: number) => {
    return http.get(`/categories/${id}`);
  },
  createCategories: (data: any) => {
    return http.post("/categories", data);
  },
  updateCategories: ({ id, data }: { id: number; data: any }) => {
    return http.put(`/categories/${id}`, data);
  },
  deleteCategories: (id: number) => {
    return http.delete(`/categories/${id}`);
  },
};
