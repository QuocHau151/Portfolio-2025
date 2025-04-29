import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react"; // Import icon từ lucide-react

export function Video({
  src,
  muted = true, // Mặc định là muted
  width,
  height,
  className,
}: {
  src: string;
  muted?: boolean;
  width?: number;
  height?: number;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(muted);

  useEffect(() => {
    // Định nghĩa hàm xử lý để phát video
    const playVideo = async () => {
      try {
        if (videoRef.current) {
          // Thêm kiểm tra trạng thái tải
          if (videoRef.current.readyState >= 3) {
            // HAVE_FUTURE_DATA
            await videoRef.current.play();
          } else {
            // Nếu video chưa tải đủ dữ liệu, đăng ký sự kiện canplay
            videoRef.current.addEventListener(
              "canplay",
              () => {
                videoRef.current
                  ?.play()
                  .catch((err) =>
                    console.log("Không thể phát video tự động:", err)
                  );
              },
              { once: true }
            );
          }
        }
      } catch (error) {
        console.log("Lỗi phát video:", error);
      }
    };

    // Đăng ký sự kiện cho tương tác người dùng
    const handleUserInteraction = () => {
      playVideo();
      // Loại bỏ event listener sau khi đã xử lý
      ["click", "touchstart", "keydown"].forEach((event) => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };

    // Thêm event listener cho các sự kiện tương tác người dùng
    ["click", "touchstart", "keydown"].forEach((event) => {
      document.addEventListener(event, handleUserInteraction);
    });

    // Thử phát video ngay lập tức
    playVideo();

    // Cleanup khi component unmount
    return () => {
      ["click", "touchstart", "keydown"].forEach((event) => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, []);

  // Hàm xử lý khi nhấn nút tắt/bật âm thanh
  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className={className}
        width={width}
        height={height}
        muted={isMuted}
        autoPlay={true}
        loop={true}
        playsInline={true}
        preload="auto"
        poster={src.replace(/\.[^/.]+$/, ".jpg")}
      >
        <source src={src} type="video/mp4" />
        Trình duyệt của bạn không hỗ trợ video.
      </video>

      {/* Nút tắt/bật âm thanh */}
      <button
        onClick={toggleMute}
        className="absolute bottom-2 right-2 z-10 rounded-full bg-black/60 p-1.5 transition-colors hover:bg-black/80 2xl:bottom-[150px] 2xl:right-10"
        aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
      >
        {isMuted ? (
          <VolumeX className="size-[15px] text-white md:size-[30px]" />
        ) : (
          <Volume2 className="size-[15px] text-white md:size-[30px]" />
        )}
      </button>
    </div>
  );
}
