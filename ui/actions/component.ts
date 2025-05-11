import http from "@/libs/http";
import {
  CreateComponentBodyType,
  CreateComponentResType,
  GetListComponentsResType,
  GetListTypeComponentResType,
  UpdateComponentBodyType,
  UpdateComponentResType,
} from "@/schemas/component.schema";

export const apiComponentRequst = {
  getComponents: () => {
    return http.get<GetListComponentsResType>("/components");
  },
  getComponentById: (id: number) => {
    return http.get<GetListComponentsResType>(`/components/${id}`);
  },
  createComponent: (data: CreateComponentBodyType) => {
    return http.post<CreateComponentResType>("/components", data);
  },
  updateComponent: (id: number, data: UpdateComponentBodyType) => {
    return http.put<UpdateComponentResType>(`/components/${id}`, data);
  },
  deleteComponent: (id: number) => {
    return http.delete(`/components/${id}`);
  },
  getTypeComponent: () => {
    return http.get<GetListTypeComponentResType>("/components/type");
  },
  deleteTypeComponent: (id: number) => {
    return http.delete(`/components/type/${id}`);
  },
};
