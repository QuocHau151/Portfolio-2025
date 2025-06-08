import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Nguyễn Văn A",
      role: "CEO, TechStartup",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "VPS của QuocHau rất ổn định, tốc độ nhanh và hỗ trợ khách hàng tuyệt vời. Tôi đã sử dụng hơn 2 năm và rất hài lòng.",
    },
    {
      name: "Trần Thị B",
      role: "Developer",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "Giá cả hợp lý, hiệu năng tốt. Đặc biệt là tốc độ SSD NVMe rất nhanh, deploy ứng dụng chỉ mất vài giây.",
    },
    {
      name: "Lê Văn C",
      role: "Blogger",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "Uptime 99.9% không phải nói suông. Website của tôi chạy rất mượt, không bao giờ gặp sự cố downtime.",
    },
    {
      name: "Phạm Thị D",
      role: "E-commerce Owner",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "Hỗ trợ kỹ thuật 24/7 rất chuyên nghiệp. Mỗi khi có vấn đề đều được giải quyết nhanh chóng.",
    },
    {
      name: "Hoàng Văn E",
      role: "System Admin",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "Control panel dễ sử dụng, backup tự động rất tiện lợi. Tôi recommend cho mọi người.",
    },
    {
      name: "Vũ Thị F",
      role: "Marketing Manager",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "Từ khi chuyển sang VPS của QuocHau, website load nhanh hơn rất nhiều. Khách hàng cũng phản hồi tích cực.",
    },
  ];

  return (
    <section className="px-4 py-10 lg:py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-2 text-4xl font-bold">Khách Hàng Nói Gì</h2>
          <p className="text-[15px] text-gray-400">
            Hơn 10,000+ khách hàng tin tưởng và sử dụng dịch vụ VPS của chúng
            tôi
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="relative rounded-xl bg-neutral-800 p-6">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-green-400/30" />

              <div className="mb-4 flex items-center gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mb-6 leading-relaxed text-gray-300">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
