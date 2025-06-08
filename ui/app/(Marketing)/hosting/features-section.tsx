import { Database, Globe, Headphones, Rocket, Shield, Zap } from "lucide-react";

export default function HostingFeaturesSection() {
  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Tốc Độ Siêu Nhanh",
      description:
        "SSD NVMe + LiteSpeed Web Server + CDN miễn phí giúp website load nhanh gấp 10 lần so với hosting thông thường.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Bảo Mật Tối Đa",
      description:
        "SSL miễn phí, Firewall tích hợp, malware scanning và DDoS protection để bảo vệ website của bạn.",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "WordPress Tối Ưu",
      description:
        "Cài đặt WordPress 1-click, auto-update, caching tích hợp và tối ưu hóa đặc biệt cho WordPress.",
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Backup Tự Động",
      description:
        "Sao lưu website tự động hàng ngày, lưu trữ 30 ngày và khôi phục dữ liệu chỉ với 1 click.",
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "99.9% Uptime",
      description:
        "Cam kết uptime 99.9% với hạ tầng cloud hiện đại và monitoring 24/7 để đảm bảo website luôn online.",
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Hỗ Trợ Chuyên Nghiệp",
      description:
        "Đội ngũ kỹ thuật WordPress chuyên nghiệp hỗ trợ 24/7 qua live chat, email và điện thoại.",
    },
  ];

  return (
    <section className="px-4 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Tại Sao Chọn Hosting QuocHau?
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-neutral-400">
            Hosting WordPress được tối ưu hóa đặc biệt với công nghệ tiên tiến
            và dịch vụ chăm sóc khách hàng tận tâm
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-xl bg-neutral-800 p-8 transition-colors hover:bg-neutral-700"
            >
              <div className="mb-6 text-green-400 transition-transform group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="mb-4 text-xl font-bold">{feature.title}</h3>
              <p className="leading-relaxed text-neutral-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="mx-auto max-w-4xl rounded-2xl bg-neutral-800 p-8">
            <h3 className="mb-4 text-2xl font-bold">Cam Kết Chất Lượng</h3>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-green-400">
                  99.9%
                </div>
                <div className="text-neutral-400">Uptime Guarantee</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-green-400">
                  50,000+
                </div>
                <div className="text-neutral-400">Website Đang Hoạt Động</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-green-400">
                  24/7
                </div>
                <div className="text-neutral-400">Hỗ Trợ Kỹ Thuật</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
