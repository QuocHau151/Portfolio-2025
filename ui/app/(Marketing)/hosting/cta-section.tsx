import { Button } from "@/components/ui/button";
import { ArrowRight, Gift, MessageCircle } from "lucide-react";

export default function HostingCTASection() {
  return (
    <section className="bg-gradient-to-r from-green-600 to-green-500 px-4 py-20 text-white">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 flex items-center justify-center gap-2">
          <Gift className="h-8 w-8" />
          <h2 className="text-4xl font-bold md:text-5xl">
            Bắt Đầu Ngay Hôm Nay!
          </h2>
        </div>
        <p className="mb-8 text-xl text-green-100">
          Tạo website chuyên nghiệp với hosting tốc độ cao. Miễn phí tên miền +
          SSL + CDN cho đơn hàng đầu tiên!
        </p>

        <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="bg-white px-8 font-semibold text-green-600 hover:bg-gray-100"
          >
            Đăng Ký Ngay
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white px-8 font-semibold text-white hover:bg-white hover:text-green-600"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Tư Vấn Miễn Phí
          </Button>
        </div>

        <div className="grid gap-8 text-center md:grid-cols-3">
          <div>
            <div className="mb-2 text-2xl font-bold">🎁 Miễn Phí</div>
            <div className="text-green-100">Tên miền + SSL + CDN</div>
          </div>
          <div>
            <div className="mb-2 text-2xl font-bold">⚡ Setup Nhanh</div>
            <div className="text-green-100">Website online trong 5 phút</div>
          </div>
          <div>
            <div className="mb-2 text-2xl font-bold">💰 Hoàn Tiền</div>
            <div className="text-green-100">100% trong 30 ngày</div>
          </div>
        </div>
      </div>
    </section>
  );
}
