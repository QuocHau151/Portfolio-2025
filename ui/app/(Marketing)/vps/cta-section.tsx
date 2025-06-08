import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-gradient-to-r from-green-600 to-green-500 px-4 py-20 text-white">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-6 text-4xl font-bold md:text-5xl">
          Sẵn Sàng Bắt Đầu?
        </h2>
        <p className="mb-8 text-xl text-green-100">
          Tham gia cùng hàng nghìn khách hàng đã tin tưởng VPS QuocHau. Nhận
          ngay ưu đãi 25% cho đơn hàng đầu tiên!
        </p>

        <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="bg-white px-8 font-semibold text-green-600 hover:bg-gray-100"
          >
            Đặt Hàng Ngay
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
            <div className="mb-2 text-2xl font-bold">⚡ Setup Nhanh</div>
            <div className="text-green-100">Chỉ 5-10 phút</div>
          </div>
          <div>
            <div className="mb-2 text-2xl font-bold">💰 Hoàn Tiền</div>
            <div className="text-green-100">100% trong 7 ngày</div>
          </div>
          <div>
            <div className="mb-2 text-2xl font-bold">🎯 Hỗ Trợ</div>
            <div className="text-green-100">24/7 miễn phí</div>
          </div>
        </div>
      </div>
    </section>
  );
}
