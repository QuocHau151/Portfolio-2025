type ValidationError = { path: string; message: string };

const authMessages: Record<string, string> = {
  "Error.InvalidOTP": "Mã xác thực không hợp lệ",
  "Error.OTPExpired": "Mã xác thực đã hết hạn",
  "Error.InvalidTOTP": "Mã xác thực hai bước không hợp lệ",
  "Error.InvalidTOTPAndCode": "Vui lòng nhập mã xác thực hai bước",
  "Error.EmailNotFound": "Không tìm thấy email",
  "Error.EmailAlreadyExists": "Email đã tồn tại",
  "Error.UnauthorizedAccess": "Phiên đăng nhập không hợp lệ",
  "Error.RefreshTokenAlreadyUsed":
    "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại",
};

export function getErrorMessage(value: unknown, depth = 0): string {
  const fallback = "Có lỗi xảy ra, vui lòng thử lại";
  if (depth > 8) return fallback;
  if (typeof value === "string" && value.trim())
    return authMessages[value] ?? value;
  if (Array.isArray(value)) {
    return (
      value
        .map((item) => getErrorMessage(item, depth + 1))
        .filter((item, index, all) => all.indexOf(item) === index)
        .join("; ") || fallback
    );
  }
  if (value && typeof value === "object") {
    if ("payload" in value && value.payload)
      return getErrorMessage(value.payload, depth + 1);
    if ("message" in value) return getErrorMessage(value.message, depth + 1);
  }
  return fallback;
}

export function getValidationErrors(
  value: unknown,
  depth = 0,
): ValidationError[] {
  if (depth > 8 || !value || typeof value !== "object") return [];
  if (Array.isArray(value))
    return value.flatMap((item) => getValidationErrors(item, depth + 1));
  if ("path" in value && "message" in value) {
    return [
      {
        path: Array.isArray(value.path)
          ? value.path.join(".")
          : String(value.path ?? ""),
        message: getErrorMessage(value.message),
      },
    ];
  }
  if ("message" in value) return getValidationErrors(value.message, depth + 1);
  return [];
}
