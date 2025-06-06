import envConfig from "@/configs/config";
import {
  getAccessTokenFromLocalStorage,
  normalizePath,
  removeTokensFromLocalStorage,
  setAccessTokenToLocalStorage,
  setRefreshTokenToLocalStorage,
} from "@/libs/utils";
import { LoginResType } from "@/schemas/auth.schema";
type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string | undefined;
};

const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;

type EntityErrorPayload = {
  errors: string;
  message: {
    code: string;
    path: string;
    message: string;
  }[];
  statusCode: number;
};

export class HttpError extends Error {
  status: number;
  error?: string;
  payload: any;

  constructor({
    status,
    error,
    message,
    payload,
  }: {
    status: number;
    error?: string;
    message?: string;
    payload?: any;
  }) {
    // Đảm bảo luôn có message

    super(message);

    // Lưu các thông tin lỗi
    this.status = status;
    this.error = error;

    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: typeof ENTITY_ERROR_STATUS;
  payload: EntityErrorPayload;
  constructor({
    status,
    payload,
    message,
  }: {
    status: typeof ENTITY_ERROR_STATUS;
    payload: EntityErrorPayload;
    message: string;
  }) {
    super({ status, payload });
    this.status = status;
    this.payload = payload;
    this.message = message;
  }
}

let clientLogoutRequest: null | Promise<any> = null;
const isClient = typeof window !== "undefined";
const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions | undefined,
) => {
  let body: FormData | string | undefined = undefined;
  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options.body);
  }
  const baseHeaders: {
    [key: string]: string;
  } =
    body instanceof FormData
      ? {}
      : {
          "Content-Type": "application/json",
        };
  if (isClient) {
    // Lưu access token vào request header.Authorization
    const accessToken = getAccessTokenFromLocalStorage();
    if (accessToken) {
      baseHeaders.Authorization = `Bearer ${accessToken}`;
    }
  }
  // Nếu không truyền baseUrl (hoặc baseUrl = undefined) thì lấy từ envConfig.NEXT_PUBLIC_API_ENDPOINT
  // Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền vào '' thì đồng nghĩa với việc chúng ta gọi API đến Next.js Server

  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;

  const fullUrl = `${baseUrl}/${normalizePath(url)}`;
  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    } as any,
    body,
    method,
  });
  const payload: Response = await res.json();
  const data = {
    payload,
    status: res.status,
  };

  // Interceptor là nời chúng ta xử lý request và response trước khi trả về cho phía component
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      console.log(data);
      throw new EntityError({
        message: (data.payload as any).message,
        payload: data.payload,
        status: data.status,
      } as {
        status: 422;
        payload: EntityErrorPayload;
        message: string;
      });
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      if (isClient) {
        if (!clientLogoutRequest) {
          clientLogoutRequest = fetch("/api/auth/logout", {
            method: "POST",
            body: null, // Logout mình sẽ cho phép luôn luôn thành công
            headers: {
              ...baseHeaders,
            } as any,
          });
          try {
            await clientLogoutRequest;
          } catch (error) {
          } finally {
            removeTokensFromLocalStorage();
            clientLogoutRequest = null;
            // Redirect về trang login có thể dẫn đến loop vô hạn
            // Nếu không không được xử lý đúng cách
            // Vì nếu rơi vào trường hợp tại trang Login, chúng ta có gọi các API cần access token
            // Mà access token đã bị xóa thì nó lại nhảy vào đây, và cứ thế nó sẽ bị lặp
            location.href = `/login`;
          }
        }
      } else {
        // Đây là trường hợp khi mà chúng ta vẫn còn access token (còn hạn)
        // Và chúng ta gọi API ở Next.js Server (Route Handler , Server Component) đến Server Backend
        const accessToken = (options?.headers as any)?.Authorization.split(
          "Bearer ",
        )[1];
      }
    } else {
      throw new HttpError(data);
    }
  }
  // Đảm bảo logic dưới đây chỉ chạy ở phía client (browser)
  if (isClient) {
    const normalizeUrl = normalizePath(url);

    if (["api/auth/login", "api/guest/auth/login"].includes(normalizeUrl)) {
      const { accessToken, refreshToken } = (payload as LoginResType).data;
      setAccessTokenToLocalStorage(accessToken);
      setRefreshTokenToLocalStorage(refreshToken);
    } else if ("api/auth/token" === normalizeUrl) {
      const { accessToken, refreshToken } = payload as {
        accessToken: string;
        refreshToken: string;
      };
      setAccessTokenToLocalStorage(accessToken);
      setRefreshTokenToLocalStorage(refreshToken);
    } else if (
      ["api/auth/logout", "api/guest/auth/logout"].includes(normalizeUrl)
    ) {
      removeTokensFromLocalStorage();
    }
  }
  return data;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined,
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined,
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined,
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined,
  ) {
    return request<Response>("DELETE", url, { ...options });
  },
};

export default http;
