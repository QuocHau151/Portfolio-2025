import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Globe, Shield, Zap } from "lucide-react";

export default function HostingHeroSection() {
  return (
    <section className="px-4 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <Badge className="mb-6 border-green-500/30 bg-green-500/20 text-green-400">
            🎉 Ưu đãi đặc biệt - Miễn phí tên miền + SSL
          </Badge>
          <h1 className="mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
            Web Hosting
            <br />
            <span className="text-green-400">Tốc Độ Cao</span>
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-300">
            Hosting WordPress tối ưu với SSD NVMe, CDN miễn phí, SSL và backup
            tự động. Uptime 99.9% được đảm bảo
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-green-500 px-8 font-semibold text-black hover:bg-green-600"
            >
              Bắt đầu ngay
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-800"
            >
              Xem demo website
            </Button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800">
              <Globe className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="mb-2 font-semibold">Tên miền miễn phí</h3>
            <p className="text-sm text-gray-400">
              Domain .com/.net miễn phí năm đầu
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800">
              <Zap className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="mb-2 font-semibold">SSD NVMe</h3>
            <p className="text-sm text-gray-400">
              Tốc độ load trang siêu nhanh
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800">
              <Shield className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="mb-2 font-semibold">SSL miễn phí</h3>
            <p className="text-sm text-gray-400">Bảo mật website tự động</p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800">
              <Clock className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="mb-2 font-semibold">Hỗ trợ 24/7</h3>
            <p className="text-sm text-gray-400">Chăm sóc khách hàng tận tâm</p>
          </div>
        </div>
      </div>
    </section>
  );
}
