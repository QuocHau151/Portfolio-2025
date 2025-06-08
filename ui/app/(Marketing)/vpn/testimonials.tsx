import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";

export default function VPNTestimonials() {
  const testimonials = [
    {
      name: "Nguyễn Thị Linh",
      role: "Content Creator",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "VPN QuocHau giúp tôi truy cập Netflix US và xem phim 4K mượt mà. Tốc độ nhanh, không lag và rất ổn định.",
    },
    {
      name: "Trần Văn Đức",
      role: "Freelancer",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "Làm việc remote cần bảo mật cao. VPN này cho tôi sự an tâm tuyệt đối với mã hóa AES-256.",
    },
    {
      name: "Lê Thị Mai",
      role: "Student",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "Truy cập tài liệu học tập từ các trang web bị chặn. Giá cả hợp lý, phù hợp với sinh viên.",
    },
    {
      name: "Phạm Minh Tuấn",
      role: "Gamer",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "Chơi game online với ping thấp, kết nối ổn định. Hỗ trợ P2P tốt cho download game.",
    },
    {
      name: "Hoàng Thị Nga",
      role: "Business Owner",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "Bảo vệ dữ liệu công ty khi làm việc từ xa. Team management rất tiện lợi cho doanh nghiệp.",
    },
    {
      name: "Vũ Đình Nam",
      role: "Digital Nomad",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "Du lịch khắp nơi vẫn truy cập được mọi dịch vụ. Kill switch bảo vệ khi WiFi công cộng không ổn định.",
    },
  ];

  return (
    <section className="px-4 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">Khách Hàng Nói Gì</h2>
          <p className="text-lg text-neutral-400">
            Hơn 10 triệu người dùng tin tưởng và sử dụng VPN của chúng tôi
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

              <p className="mb-6 leading-relaxed text-neutral-300">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-neutral-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
