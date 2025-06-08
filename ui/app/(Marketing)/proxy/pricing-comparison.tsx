import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export default function ProxyPricingComparison() {
  const plans = [
    {
      name: "Datacenter",
      popular: false,
      price: "299,000",
      originalPrice: "400,000",
      ips: "50 IP",
      bandwidth: "500GB",
      locations: "10 quốc gia",
      protocols: "HTTP/HTTPS",
      rotation: "Manual",
      features: [
        { name: "IP sạch, tốc độ cao", included: true },
        { name: "Hỗ trợ HTTP/HTTPS", included: true },
        { name: "Thay đổi IP thủ công", included: true },
        { name: "Sticky session", included: false },
        { name: "API quản lý", included: false },
        { name: "Residential IP", included: false },
      ],
    },
    {
      name: "Residential",
      popular: true,
      price: "599,000",
      originalPrice: "800,000",
      ips: "100 IP",
      bandwidth: "1TB",
      locations: "50 quốc gia",
      protocols: "HTTP/HTTPS/SOCKS5",
      rotation: "Auto 5-30 phút",
      features: [
        { name: "IP sạch, tốc độ cao", included: true },
        { name: "Hỗ trợ HTTP/HTTPS/SOCKS5", included: true },
        { name: "Rotation tự động", included: true },
        { name: "Sticky session", included: true },
        { name: "API quản lý", included: true },
        { name: "Residential IP", included: true },
      ],
    },
    {
      name: "Mobile",
      popular: false,
      price: "899,000",
      originalPrice: "1,200,000",
      ips: "200 IP",
      bandwidth: "2TB",
      locations: "30 quốc gia",
      protocols: "HTTP/HTTPS/SOCKS5",
      rotation: "Auto 1-10 phút",
      features: [
        { name: "IP sạch, tốc độ cao", included: true },
        { name: "Hỗ trợ HTTP/HTTPS/SOCKS5", included: true },
        { name: "Rotation siêu nhanh", included: true },
        { name: "Sticky session", included: true },
        { name: "API quản lý", included: true },
        { name: "Mobile IP 4G/5G", included: true },
      ],
    },
    {
      name: "Enterprise",
      popular: false,
      price: "1,999,000",
      originalPrice: "2,500,000",
      ips: "500+ IP",
      bandwidth: "Unlimited",
      locations: "100+ quốc gia",
      protocols: "All protocols",
      rotation: "Custom",
      features: [
        { name: "IP sạch, tốc độ cao", included: true },
        { name: "Hỗ trợ tất cả protocols", included: true },
        { name: "Custom rotation", included: true },
        { name: "Sticky session", included: true },
        { name: "API quản lý", included: true },
        { name: "Dedicated support", included: true },
      ],
    },
  ];

  return (
    <section className="px-4 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">Bảng Giá Proxy</h2>
          <p className="text-lg text-neutral-400">
            Chọn gói proxy phù hợp với nhu cầu sử dụng của bạn
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl bg-neutral-800 p-8 ${
                plan.popular ? "scale-105 ring-2 ring-green-500" : ""
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 transform bg-green-500 text-black">
                  Phổ biến nhất
                </Badge>
              )}

              <div className="mb-8 text-center">
                <h3 className="mb-4 text-xl font-bold">Proxy {plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-green-400">
                    {plan.price}
                  </span>
                  <span className="text-green-400"> VNĐ</span>
                  <div className="text-sm text-neutral-400 line-through">
                    {plan.originalPrice} VNĐ
                  </div>
                  <div className="text-sm text-neutral-400">/tháng</div>
                </div>
              </div>

              <div className="mb-8 space-y-4">
                <div className="flex justify-between">
                  <span className="text-neutral-400">IP Pool:</span>
                  <span>{plan.ips}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Băng thông:</span>
                  <span>{plan.bandwidth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Vị trí:</span>
                  <span>{plan.locations}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Giao thức:</span>
                  <span className="text-xs">{plan.protocols}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Rotation:</span>
                  <span className="text-xs">{plan.rotation}</span>
                </div>
              </div>

              <div className="mb-8 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-400" />
                    ) : (
                      <X className="h-5 w-5 text-neutral-500" />
                    )}
                    <span
                      className={
                        feature.included ? "text-white" : "text-neutral-500"
                      }
                    >
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-green-500 text-black hover:bg-green-600"
                    : "bg-neutral-700 hover:bg-neutral-600"
                }`}
              >
                Đặt hàng ngay
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
