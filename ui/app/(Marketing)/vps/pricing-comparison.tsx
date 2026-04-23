import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export default function PricingComparison() {
  const plans = [
    {
      name: "VPS Giá Rẻ",
      popular: false,
      price: "150,000",
      originalPrice: "200,000",
      cpu: "1 Core",
      ram: "1GB",
      storage: "20GB SSD",
      bandwidth: "Unlimited",
      features: [
        { name: "Control Panel", included: true },
        { name: "DDoS Protection", included: true },
        { name: "Backup tự động", included: false },
        { name: "Hỗ trợ 24/7", included: true },
        { name: "IPv6", included: false },
      ],
    },
    {
      name: "VPS SSD",
      popular: true,
      price: "270,000",
      originalPrice: "350,000",
      cpu: "2 Core",
      ram: "2GB",
      storage: "40GB SSD",
      bandwidth: "Unlimited",
      features: [
        { name: "Control Panel", included: true },
        { name: "DDoS Protection", included: true },
        { name: "Backup tự động", included: true },
        { name: "Hỗ trợ 24/7", included: true },
        { name: "IPv6", included: true },
      ],
    },
    {
      name: "VPS NVMe Cao Cấp",
      popular: false,
      price: "450,000",
      originalPrice: "600,000",
      cpu: "4 Core",
      ram: "4GB",
      storage: "80GB NVMe",
      bandwidth: "Unlimited",
      features: [
        { name: "Control Panel", included: true },
        { name: "DDoS Protection", included: true },
        { name: "Backup tự động", included: true },
        { name: "Hỗ trợ 24/7", included: true },
        { name: "IPv6", included: true },
      ],
    },
    {
      name: "VPS NBN",
      popular: false,
      price: "800,000",
      originalPrice: "1,000,000",
      cpu: "8 Core",
      ram: "8GB",
      storage: "160GB NVMe",
      bandwidth: "Unlimited",
      features: [
        { name: "Control Panel", included: true },
        { name: "DDoS Protection", included: true },
        { name: "Backup tự động", included: true },
        { name: "Hỗ trợ 24/7", included: true },
        { name: "IPv6", included: true },
      ],
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="mb-12 text-center md:mb-16">
        <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase backdrop-blur-sm">
          Bảng giá
        </span>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
          <span className="text-gradient">Bảng Giá VPS</span>
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted md:text-base">
          Chọn gói VPS phù hợp với nhu cầu của bạn
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-surface-elevated p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/10 hover:shadow-2xl md:p-8 ${
              plan.popular ? "lg:-translate-y-2 lg:border-primary/30" : ""
            }`}
          >
            {plan.popular && (
              <>
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(600px circle at 50% 0%, rgba(40,236,141,0.06), transparent 60%)" }}
                />
                <Badge className="absolute -top-0 left-1/2 -translate-x-1/2 rounded-b-lg rounded-t-none bg-primary px-3 py-1 text-xs font-semibold text-black">
                  Phổ biến nhất
                </Badge>
              </>
            )}

            <div className="mb-6 text-center">
              <h3 className="mb-3 text-lg font-bold text-white md:text-xl">
                {plan.name}
              </h3>
              <div className="flex items-end justify-center gap-1">
                <span className="text-3xl font-extrabold text-primary md:text-4xl">
                  {plan.price}
                </span>
                <span className="mb-1 text-sm font-medium text-muted">VNĐ</span>
              </div>
              <div className="mt-1 text-sm text-muted-foreground line-through">
                {plan.originalPrice} VNĐ
              </div>
              <div className="text-xs text-muted-foreground">/tháng</div>
            </div>

            <div className="mb-6 space-y-3 rounded-xl bg-white/[0.03] p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">CPU</span>
                <span className="font-medium text-white">{plan.cpu}</span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">RAM</span>
                <span className="font-medium text-white">{plan.ram}</span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ổ cứng</span>
                <span className="font-medium text-white">{plan.storage}</span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Băng thông</span>
                <span className="font-medium text-white">{plan.bandwidth}</span>
              </div>
            </div>

            <div className="mb-6 space-y-2.5">
              {plan.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center gap-3">
                  {feature.included ? (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                  ) : (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/5">
                      <X className="h-3 w-3 text-muted-foreground" />
                    </div>
                  )}
                  <span
                    className={
                      feature.included ? "text-sm text-white" : "text-sm text-muted-foreground"
                    }
                  >
                    {feature.name}
                  </span>
                </div>
              ))}
            </div>

            <Button
              className={`w-full font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98] ${
                plan.popular
                  ? "bg-primary text-black hover:bg-primary/90"
                  : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              Đặt hàng ngay
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
