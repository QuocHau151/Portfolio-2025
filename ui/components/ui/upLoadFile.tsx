"use client";

import {
  CheckCircleIcon,
  FileIcon,
  LucideFileWarning,
  Trash2Icon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import * as React from "react";
import {
  useDropzone,
  type DropzoneOptions,
  FileWithPath,
} from "react-dropzone";
import { twMerge } from "tailwind-merge";

import imageCompression from "browser-image-compression";
import Image from "next/image";

const variants = {
  base: "relative rounded-md p-4 w-full flex justify-center items-center flex-col cursor-pointer border border-dashed border-gray-400 dark:border-gray-300 transition-colors duration-200 ease-in-out",
  active: "border-2",
  disabled:
    "bg-gray-200 border-gray-300 cursor-default pointer-events-none bg-opacity-30 dark:bg-gray-700 dark:border-gray-600",
  accept: "border border-blue-500 bg-blue-500 bg-opacity-10",
  reject: "border border-red-700 bg-red-700 bg-opacity-10",
};

export type FileState = {
  file: File;
  key: string; // used to identify the file in the progress callback
  progress: "PENDING" | "COMPLETE" | "ERROR" | number;
  abortController?: AbortController;
};

type InputProps = {
  className?: string;
  value?: FileState[];
  onChange?: (files: FileState[]) => void | Promise<void>;
  onFilesAdded?: (addedFiles: FileState[]) => void | Promise<void>;
  disabled?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, "disabled">;
};

// Cấu hình nén ảnh
const imageCompressionOptions = {
  maxWidthOrHeight: 1920, // Full HD width
  maxSizeMB: 2, // Giới hạn kích thước tối đa 2MB
  useWebWorker: true, // Sử dụng Web Worker để không block UI
  fileType: "image/jpeg", // Định dạng đầu ra
};

// Hàm kiểm tra file có phải là ảnh
const isImageFile = (file: File): boolean => {
  return file.type.startsWith("image/");
};

// Hàm để format kích thước file
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + " B";
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  else return (bytes / 1048576).toFixed(1) + " MB";
};

const ERROR_MESSAGES = {
  fileTooLarge(maxSize: number) {
    const sizeMB = maxSize / (1024 * 1024);
    return `File quá lớn. Kích thước tối đa là ${sizeMB} MB.`;
  },
  fileInvalidType() {
    return "Định dạng file không hợp lệ.";
  },
  tooManyFiles(maxFiles: number) {
    return `Bạn chỉ có thể tải lên ${maxFiles} file.`;
  },
  fileNotSupported() {
    return "File không được hỗ trợ.";
  },
};

const MultiFileDropzone = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { dropzoneOptions, value, className, disabled, onFilesAdded, onChange },
    ref,
  ) => {
    const [customError, setCustomError] = React.useState<string>();
    const [isProcessing, setIsProcessing] = React.useState<boolean>(false);

    if (dropzoneOptions?.maxFiles && value?.length) {
      disabled = disabled ?? value.length >= dropzoneOptions.maxFiles;
    }

    // Xử lý file được tải lên
    const processFiles = React.useCallback(
      async (acceptedFiles: FileWithPath[]) => {
        setCustomError(undefined);
        setIsProcessing(true);

        // Kiểm tra giới hạn số lượng file
        if (
          dropzoneOptions?.maxFiles &&
          (value?.length ?? 0) + acceptedFiles.length > dropzoneOptions.maxFiles
        ) {
          setCustomError(ERROR_MESSAGES.tooManyFiles(dropzoneOptions.maxFiles));
          setIsProcessing(false);
          return;
        }

        try {
          // Xử lý từng file - nén ảnh nếu là file ảnh
          const processedFiles = await Promise.all(
            acceptedFiles.map(async (file) => {
              if (isImageFile(file)) {
                try {
                  console.log(`Optimizing image: ${file.name}`);
                  const compressedBlob = await imageCompression(
                    file,
                    imageCompressionOptions,
                  );
                  console.log(
                    `Original size: ${formatFileSize(file.size)}, Compressed: ${formatFileSize(compressedBlob.size)}`,
                  );

                  // Tạo File mới từ Blob, giữ nguyên tên gốc
                  const compressedFile = new File([compressedBlob], file.name, {
                    type: compressedBlob.type || "image/jpeg",
                  });

                  console.log("Compressed file:", compressedFile);
                  console.log("Compressed file name:", compressedFile.name);

                  return {
                    file: compressedFile,
                    key: Math.random().toString(36).slice(2),
                    progress: "PENDING" as const,
                  };
                } catch (error) {
                  console.error("Lỗi khi nén ảnh:", error);
                  // Trả về file gốc nếu không nén được
                  return {
                    file,
                    key: Math.random().toString(36).slice(2),
                    progress: "PENDING" as const,
                  };
                }
              }

              // Đối với các file không phải ảnh, giữ nguyên
              return {
                file,
                key: Math.random().toString(36).slice(2),
                progress: "PENDING" as const,
              };
            }),
          );
          console.log("Processed files:", processedFiles);
          void onFilesAdded?.(processedFiles);
          void onChange?.([...(value ?? []), ...processedFiles]);
        } catch (error) {
          console.error("Lỗi xử lý file:", error);
          setCustomError("Có lỗi xảy ra khi xử lý file. Vui lòng thử lại.");
        } finally {
          setIsProcessing(false);
        }
      },
      [dropzoneOptions?.maxFiles, onFilesAdded, onChange, value],
    );

    // dropzone configuration
    const {
      getRootProps,
      getInputProps,
      fileRejections,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      disabled: disabled || isProcessing,
      onDrop: processFiles,
      ...dropzoneOptions,
    });

    // styling
    const dropZoneClassName = React.useMemo(
      () =>
        twMerge(
          variants.base,
          isFocused && variants.active,
          (disabled || isProcessing) && variants.disabled,
          (isDragReject ?? fileRejections[0]) && variants.reject,
          isDragAccept && variants.accept,
          className,
        ).trim(),
      [
        isFocused,
        fileRejections,
        isDragAccept,
        isDragReject,
        disabled,
        isProcessing,
        className,
      ],
    );

    // error validation messages
    const errorMessage = React.useMemo(() => {
      if (fileRejections[0]) {
        const { errors } = fileRejections[0];
        if (errors[0]?.code === "file-too-large") {
          return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
        } else if (errors[0]?.code === "file-invalid-type") {
          return ERROR_MESSAGES.fileInvalidType();
        } else if (errors[0]?.code === "too-many-files") {
          return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
        } else {
          return ERROR_MESSAGES.fileNotSupported();
        }
      }
      return undefined;
    }, [fileRejections, dropzoneOptions]);

    return (
      <div className="w-full">
        <div className="flex w-full flex-col gap-2">
          <div className="w-full">
            {/* Main File Input */}
            <div
              {...getRootProps({
                className: dropZoneClassName,
              })}
            >
              <input ref={ref} {...getInputProps()} />
              <div className="flex flex-col items-center justify-center text-xs text-gray-400">
                <UploadCloudIcon className="mb-1 h-7 w-7" />
                <div className="text-gray-400">
                  {isProcessing
                    ? "Đang xử lý ảnh..."
                    : "Kéo & thả hoặc nhấp để tải lên"}
                </div>
                {isProcessing && (
                  <div className="mt-2 text-xs">
                    Các file ảnh sẽ được tối ưu thành Full HD
                  </div>
                )}
              </div>
            </div>

            {/* Error Text */}
            <div className="mt-1 text-xs text-red-500">
              {customError ?? errorMessage}
            </div>
          </div>

          {/* Selected Files */}
          <div className="flex w-full flex-wrap gap-3">
            {value?.map(({ file, abortController, progress }, i) => (
              <div
                key={i}
                className="flex h-min max-w-[200px] flex-col justify-center rounded border border-gray-300 p-2"
              >
                <div className="flex flex-col items-center gap-2 text-gray-500 dark:text-white">
                  <div className="overflow-hidden">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt=""
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex w-full items-center justify-between gap-2 px-2 py-1">
                    <div className="min-w-0 text-sm">
                      <div className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                        {file.name}
                        {isImageFile(file) && (
                          <span className="ml-1 text-xs text-green-600">
                            (Đã tối ưu)
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-400">
                        {formatFileSize(file.size)}
                      </div>
                    </div>
                    <div className="flex w-12 justify-end text-xs">
                      {progress === "PENDING" ? (
                        <button
                          type="button"
                          className="rounded-md p-1 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => {
                            void onChange?.(
                              value.filter((_, index) => index !== i),
                            );
                          }}
                        >
                          <Trash2Icon className="shrink-0" />
                        </button>
                      ) : progress === "ERROR" ? (
                        <LucideFileWarning className="shrink-0 text-red-600 dark:text-red-400" />
                      ) : progress !== "COMPLETE" ? (
                        <div className="flex flex-col items-end gap-0.5">
                          {abortController && (
                            <button
                              type="button"
                              className="rounded-md p-0.5 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                              disabled={progress === 100}
                              onClick={() => {
                                abortController.abort();
                              }}
                            >
                              <XIcon className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-400" />
                            </button>
                          )}
                          <div>{Math.round(progress)}%</div>
                        </div>
                      ) : (
                        <CheckCircleIcon className="shrink-0 text-green-600 dark:text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
                {/* Progress Bar */}
                {typeof progress === "number" && (
                  <div className="relative h-0">
                    <div className="absolute top-1 h-1 w-full overflow-clip rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-full bg-gray-400 transition-all duration-300 ease-in-out dark:bg-white"
                        style={{
                          width: progress ? `${progress}%` : "0%",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
);
MultiFileDropzone.displayName = "MultiFileDropzone";

export { MultiFileDropzone };
