import { Download, Globe, Headphones, Play, Shield, Zap } from "lucide-react";

export default function VPNFeaturesSection() {
  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Bảo Mật Tuyệt Đối",
      description:
        "Mã hóa AES-256 cấp quân sự, no-logs policy được kiểm toán độc lập và kill switch tự động bảo vệ dữ liệu.",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Tốc Độ Siêu Nhanh",
      description:
        "Servers 10Gbps với WireGuard protocol mới nhất, ping thấp và băng thông không giới hạn.",
    },
    {
      icon: <Play className="h-8 w-8" />,
      title: "Streaming 4K",
      description:
        "Mở khóa Netflix, Disney+, HBO Max và 50+ nền tảng streaming với chất lượng 4K không lag.",
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: "P2P/Torrenting",
      description:
        "Hỗ trợ P2P và torrenting an toàn với servers tối ưu và không giới hạn băng thông.",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "60+ Quốc Gia",
      description:
        "5000+ servers tại 60+ quốc gia với IP tĩnh và động, phù hợp mọi nhu cầu sử dụng.",
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Hỗ Trợ 24/7",
      description:
        "Đội ngũ kỹ thuật chuyên nghiệp hỗ trợ 24/7 qua live chat với thời gian phản hồi dưới 1 phút.",
    },
  ];

  return (
    <section className="px-4 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">Tại Sao Chọn VPN QuocHau?</h2>
          <p className="mx-auto max-w-3xl text-lg text-neutral-400">
            VPN hàng đầu với công nghệ bảo mật tiên tiến và mạng lưới servers
            toàn cầu tốc độ cao
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
                  10M+
                </div>
                <div className="text-neutral-400">Người Dùng Tin Tưởng</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-green-400">
                  30 Ngày
                </div>
                <div className="text-neutral-400">Dùng Thử Miễn Phí</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
