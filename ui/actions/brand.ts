import http from "@/libs/http";

export const apiBrandRequest = {
  getBrands: () => {
    return http.get("/brands");
  },
  getBrandID: (id: number) => {
    return http.get(`/brands/${id}`);
  },
  createBrand: (data: any) => {
    return http.post("/brands", data);
  },
  updateBrand: ({ id, data }: { id: number; data: any }) => {
    return http.put(`/brands/${id}`, data);
  },
  deleteBrand: (id: number) => {
    return http.delete(`/brands/${id}`);
  },
};
