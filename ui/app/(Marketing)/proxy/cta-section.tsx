import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Zap } from "lucide-react";

export default function ProxyCTASection() {
  return (
    <section className="bg-gradient-to-r from-green-600 to-green-500 px-4 py-20 text-white">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 flex items-center justify-center gap-2">
          <Zap className="h-8 w-8" />
          <h2 className="text-4xl font-bold md:text-5xl">Bắt Đầu Ngay!</h2>
        </div>
        <p className="mb-8 text-xl text-green-100">
          Trải nghiệm proxy chất lượng cao với IP sạch và tốc độ siêu nhanh.
          Dùng thử miễn phí 24 giờ đầu!
        </p>

        <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="bg-white px-8 font-semibold text-green-600 hover:bg-gray-100"
          >
            Dùng Thử Miễn Phí
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white px-8 font-semibold text-white hover:bg-white hover:text-green-600"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Tư Vấn Chuyên Gia
          </Button>
        </div>

        <div className="grid gap-8 text-center md:grid-cols-3">
          <div>
            <div className="mb-2 text-2xl font-bold">🆓 Dùng Thử</div>
            <div className="text-green-100">24 giờ miễn phí</div>
          </div>
          <div>
            <div className="mb-2 text-2xl font-bold">⚡ Setup Nhanh</div>
            <div className="text-green-100">Kích hoạt trong 5 phút</div>
          </div>
          <div>
            <div className="mb-2 text-2xl font-bold">🔄 Hoàn Tiền</div>
            <div className="text-green-100">100% trong 24 giờ</div>
          </div>
        </div>
      </div>
    </section>
  );
}
