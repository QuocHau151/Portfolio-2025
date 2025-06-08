import { Globe, Headphones, Lock, RotateCcw, Shield, Zap } from "lucide-react";

export default function ProxyFeaturesSection() {
  const features = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "100+ Quốc Gia",
      description:
        "Mạng lưới proxy toàn cầu với IP từ hơn 100 quốc gia, giúp bạn truy cập mọi nội dung địa lý bị hạn chế.",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Tốc Độ Siêu Nhanh",
      description:
        "Ping thấp dưới 50ms, băng thông lớn và kết nối ổn định đảm bảo trải nghiệm browsing mượt mà.",
    },
    {
      icon: <RotateCcw className="h-8 w-8" />,
      title: "IP Rotation Thông Minh",
      description:
        "Tự động thay đổi IP theo chu kỳ hoặc theo yêu cầu, tránh bị phát hiện và block bởi website.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "IP Sạch 100%",
      description:
        "Tất cả IP đều được kiểm tra kỹ lưỡng, không bị blacklist và có reputation score cao.",
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Bảo Mật Tuyệt Đối",
      description:
        "Mã hóa end-to-end, không log traffic và bảo vệ danh tính người dùng một cách tối đa.",
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "API & Dashboard",
      description:
        "API RESTful đầy đủ và dashboard trực quan để quản lý proxy, monitor usage và thống kê.",
    },
  ];

  return (
    <section className="px-4 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Tại Sao Chọn Proxy QuocHau?
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-neutral-400">
            Dịch vụ proxy chuyên nghiệp với công nghệ tiên tiến và mạng lưới IP
            chất lượng cao trên toàn thế giới
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
                  1M+
                </div>
                <div className="text-neutral-400">IP Pool Size</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-green-400">
                  24/7
                </div>
                <div className="text-neutral-400">Technical Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
