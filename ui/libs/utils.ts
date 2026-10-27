import { getErrorMessage, getValidationErrors } from "@/libs/api-error";
import { toast } from "sonner";
import authApiRequest from "@/actions/auth";
import { RentalPeriodToMonth } from "@/constants/type";
import { EntityError } from "@/libs/http";
import { TokenPayload } from "@/types/jwt.types";
import { type ClassValue, clsx } from "clsx";
import { jwtDecode } from "jwt-decode";
import { UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { format } from "date-fns";

import { VariantsType } from "@/types/product.type";
import slugify from "slugify";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const handleErrorApi = ({
  error,
  setError,
  duration,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  if (error instanceof EntityError && setError) {
    for (const item of getValidationErrors(error.payload)) {
      if (item.path) {
        setError(item.path, { type: "server", message: item.message });
      }
    }
  }
  toast.error(getErrorMessage(error), { duration: duration ?? 5000 });
};

const isBrowser = typeof window !== "undefined";

export const getAccessTokenFromLocalStorage = () =>
  isBrowser ? localStorage.getItem("accessToken") : null;

export const getRefreshTokenFromLocalStorage = () =>
  isBrowser ? localStorage.getItem("refreshToken") : null;
export const setAccessTokenToLocalStorage = (value: string) =>
  isBrowser && localStorage.setItem("accessToken", value);

export const setRefreshTokenToLocalStorage = (value: string) =>
  isBrowser && localStorage.setItem("refreshToken", value);

export const removeTokensFromLocalStorage = () => {
  isBrowser && localStorage.removeItem("accessToken");
  isBrowser && localStorage.removeItem("refreshToken");
};
export const checkAndRefreshToken = async (param?: {
  onError?: () => void;
  onSuccess?: () => void;
  force?: boolean;
}) => {
  // Không nên đưa logic lấy access và refresh token ra khỏi cái function `checkAndRefreshToken`
  // Vì để mỗi lần mà checkAndRefreshToken() được gọi thì chúng ta se có một access và refresh token mới
  // Tránh hiện tượng bug nó lấy access và refresh token cũ ở lần đầu rồi gọi cho các lần tiếp theo
  const accessToken = getAccessTokenFromLocalStorage();
  const refreshToken = getRefreshTokenFromLocalStorage();
  // Chưa đăng nhập thì cũng không cho chạy
  if (!accessToken || !refreshToken) {
    if (accessToken || refreshToken || param?.force) {
      removeTokensFromLocalStorage();
      param?.onError?.();
    }
    return;
  }
  try {
    const decodedAccessToken = decodeToken(accessToken);
    const decodedRefreshToken = decodeToken(refreshToken);
    const now = Date.now() / 1000;
    if (
      !Number.isFinite(decodedAccessToken.exp) ||
      !Number.isFinite(decodedRefreshToken.exp) ||
      decodedRefreshToken.exp <= now
    ) {
      throw new Error("Phiên đăng nhập đã hết hạn");
    }
    if (
      param?.force ||
      decodedAccessToken.exp - now <
        (decodedAccessToken.exp - decodedAccessToken.iat) / 3
    ) {
      const res = await authApiRequest.refreshToken();
      setAccessTokenToLocalStorage(res.payload.data.accessToken);
      setRefreshTokenToLocalStorage(res.payload.data.refreshToken);
    }
    param?.onSuccess?.();
  } catch {
    removeTokensFromLocalStorage();
    param?.onError?.();
  }
};

export const formatCurrency = (number: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};

export const decodeToken = (token: string) => {
  return jwtDecode(token) as TokenPayload;
};

export function removeAccents(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

export const simpleMatchText = (fullText: string, matchText: string) => {
  return removeAccents(fullText.toLowerCase()).includes(
    removeAccents(matchText.trim().toLowerCase()),
  );
};

export const formatDateTimeToLocaleString = (date: string | Date) => {
  return format(
    date instanceof Date ? date : new Date(date),
    "HH:mm:ss dd/MM/yyyy",
  );
};

export const formatDateTimeToTimeString = (date: string | Date) => {
  return format(date instanceof Date ? date : new Date(date), "HH:mm:ss");
};
export const toObject = (str: string) => {
  const parts = str.split(".");
  if (parts.length !== 2) {
    throw new Error("Invalid format");
  }
  const [key, value] = parts;
  return { [key.toLowerCase()]: value };
};

export const wrapServerApi = async <T>(fn: () => Promise<T>) => {
  let result = null;
  try {
    result = await fn();
  } catch (error: any) {
    if (error.digest?.includes("NEXT_REDIRECT")) {
      throw error;
    }
  }
  return result;
};

export const generateSlugUrl = ({ name, id }: { name: string; id: number }) => {
  return `${slugify(name)}-i.${id}`;
};

export const getIdFromSlugUrl = (slug: string) => {
  return Number(slug.split("-i.")[1]);
};
export const formatDateTimeToDateString = (date: string | Date) => {
  return format(date instanceof Date ? date : new Date(date), "dd/MM/yyyy");
};
export const formatDateTimeToHourMinuteString = (date: string | Date) => {
  return format(date instanceof Date ? date : new Date(date), "HH:mm");
};
export function generateSKUs(variants: VariantsType) {
  // Hàm hỗ trợ để tạo tất cả tổ hợp
  function getCombinations(arrays: string[][]): string[] {
    return arrays.reduce(
      (acc, curr) =>
        acc.flatMap((x) => curr.map((y) => `${x}${x ? "-" : ""}${y}`)),
      [""],
    );
  }

  // Lấy mảng các options từ variants
  const options = variants.map((variant) => variant.options);

  // Tạo tất cả tổ hợp
  const combinations = getCombinations(options);

  // Chuyển tổ hợp thành SKU objects
  return combinations.map((value) => ({
    value,
    price: 0,
    stock: 100,
    files: [],
    images: [],
  }));
}
export const formatRentalPeriodToMonth = (period: string) => {
  return RentalPeriodToMonth[period as keyof typeof RentalPeriodToMonth];
};
export const generateRoomUserId = (userId: number) => {
  return `room-${userId}`;
};
