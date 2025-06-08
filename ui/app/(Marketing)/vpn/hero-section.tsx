import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Lock, Shield, Zap } from "lucide-react";

export default function VPNHeroSection() {
  return (
    <section className="px-4 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <Badge className="mb-6 border-green-500/30 bg-green-500/20 text-green-400">
            🔒 Ưu đãi đặc biệt - Giảm 70% gói 2 năm
          </Badge>
          <h1 className="mb-6 bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
            VPN Đa Quốc Gia
            <br />
            <span className="text-green-400">Bảo Mật Tối Đa</span>
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-neutral-300">
            VPN siêu nhanh với 5000+ servers tại 60+ quốc gia. No-logs policy,
            mã hóa AES-256 và hỗ trợ streaming 4K không giới hạn
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-green-500 px-8 font-semibold text-black hover:bg-green-600"
            >
              Dùng thử 30 ngày miễn phí
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-neutral-600 text-white hover:bg-neutral-800"
            >
              Xem danh sách servers
            </Button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-800">
              <Globe className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="mb-2 font-semibold">60+ Quốc gia</h3>
            <p className="text-sm text-neutral-400">5000+ servers toàn cầu</p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-800">
              <Zap className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="mb-2 font-semibold">Tốc độ 10Gbps</h3>
            <p className="text-sm text-neutral-400">Streaming 4K mượt mà</p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-800">
              <Shield className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="mb-2 font-semibold">No-logs Policy</h3>
            <p className="text-sm text-neutral-400">Không lưu trữ dữ liệu</p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-800">
              <Lock className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="mb-2 font-semibold">AES-256</h3>
            <p className="text-sm text-neutral-400">Mã hóa cấp quân sự</p>
          </div>
        </div>
      </div>
    </section>
  );
}
