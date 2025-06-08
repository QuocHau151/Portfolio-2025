import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Server, Shield, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="px-4 pt-6 py-10 lg:py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <Badge className="mb-6 border-green-500/30 bg-green-500/20 text-green-400">
            🚀 Khuyến mãi đặc biệt - Giảm đến 25%
          </Badge>
          <h1 className="mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
            VPS Việt Nam
            <br />
            <span className="text-green-400">Hiệu Năng Cao</span>
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-[16px] text-gray-300">
            Máy chủ ảo với hiệu năng vượt trội, uptime 99.9%, hỗ trợ 24/7 và giá
            cả cạnh tranh nhất thị trường
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-green-500 px-8 font-semibold text-black hover:bg-green-600"
            >
              Đặt hàng ngay
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-800"
            >
              Xem demo
            </Button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800">
              <Server className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="mb-2 font-semibold">SSD NVMe</h3>
            <p className="text-sm text-gray-400">Tốc độ đọc/ghi siêu nhanh</p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800">
              <Zap className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="mb-2 font-semibold">Uptime 99.9%</h3>
            <p className="text-sm text-gray-400">Đảm bảo hoạt động ổn định</p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800">
              <Shield className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="mb-2 font-semibold">Bảo mật cao</h3>
            <p className="text-sm text-gray-400">DDoS protection miễn phí</p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800">
              <Clock className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="mb-2 font-semibold">Hỗ trợ 24/7</h3>
            <p className="text-sm text-gray-400">
              Đội ngũ kỹ thuật chuyên nghiệp
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
