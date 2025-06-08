import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Globe, Shield, Zap } from "lucide-react";

export default function ProxyHeroSection() {
  return (
    <section className="px-4 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <Badge className="mb-6 border-green-500/30 bg-green-500/20 text-green-400">
            🔥 Ưu đãi đặc biệt - Giảm 30% gói đầu tiên
          </Badge>
          <h1 className="mb-6 bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
            Proxy Premium
            <br />
            <span className="text-green-400">Tốc Độ Cao</span>
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-neutral-300">
            Proxy chất lượng cao với IP sạch, tốc độ nhanh, uptime 99.9% và hỗ
            trợ đa giao thức. Phù hợp cho SEO, crawling và bảo mật
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-green-500 px-8 font-semibold text-black hover:bg-green-600"
            >
              Dùng thử miễn phí
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-neutral-600 text-white hover:bg-neutral-800"
            >
              Xem danh sách IP
            </Button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-800">
              <Globe className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="mb-2 font-semibold">100+ Quốc gia</h3>
            <p className="text-sm text-neutral-400">
              IP từ khắp nơi trên thế giới
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-800">
              <Zap className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="mb-2 font-semibold">Tốc độ cao</h3>
            <p className="text-sm text-neutral-400">
              Ping thấp, băng thông lớn
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-800">
              <Shield className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="mb-2 font-semibold">IP sạch</h3>
            <p className="text-sm text-neutral-400">
              Không bị blacklist, uy tín cao
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-800">
              <Eye className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="mb-2 font-semibold">Ẩn danh 100%</h3>
            <p className="text-sm text-neutral-400">
              Bảo vệ danh tính tuyệt đối
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
