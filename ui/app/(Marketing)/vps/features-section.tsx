import { Globe, HardDrive, Headphones, Lock, Shield, Zap } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <HardDrive className="h-8 w-8" />,
      title: "SSD NVMe Siêu Nhanh",
      description:
        "Ổ cứng SSD NVMe với tốc độ đọc/ghi lên đến 3,500 MB/s, nhanh gấp 10 lần so với HDD thông thường.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Bảo Mật Tối Đa",
      description:
        "Firewall tích hợp, DDoS protection, SSL miễn phí và monitoring 24/7 để bảo vệ dữ liệu của bạn.",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Hiệu Năng Cao",
      description:
        "CPU Intel Xeon mới nhất, RAM DDR4 ECC và kết nối mạng 1Gbps đảm bảo hiệu năng tối ưu.",
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Hỗ Trợ 24/7",
      description:
        "Đội ngũ kỹ thuật chuyên nghiệp sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi qua live chat, email và điện thoại.",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Mạng Lưới Toàn Cầu",
      description:
        "Datacenter tại Việt Nam, Singapore, Nhật Bản, Mỹ và châu Âu với độ trễ thấp và băng thông không giới hạn.",
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Backup Tự Động",
      description:
        "Sao lưu dữ liệu tự động hàng ngày, lưu trữ tại nhiều địa điểm khác nhau để đảm bảo an toàn tuyệt đối.",
    },
  ];

  return (
    <section className="px-4 py-10 lg:py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">Tại Sao Chọn VPS QuocHau?</h2>
          <p className="mx-auto max-w-3xl text-[13px] text-gray-400">
            Chúng tôi cung cấp giải pháp VPS toàn diện với công nghệ tiên tiến
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
              <p className="text-[14px] leading-relaxed text-gray-300">
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
                <div className="text-gray-400">Uptime Guarantee</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-green-400">
                  10,000+
                </div>
                <div className="text-gray-400">Khách Hàng Tin Tưởng</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-green-400">
                  24/7
                </div>
                <div className="text-gray-400">Hỗ Trợ Kỹ Thuật</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
