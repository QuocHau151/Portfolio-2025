import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";

export default function HostingTestimonials() {
  const testimonials = [
    {
      name: "Nguyễn Thị Mai",
      role: "Blogger",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "Website WordPress của tôi chạy rất nhanh sau khi chuyển sang hosting QuocHau. Tốc độ load trang cải thiện rõ rệt, SEO cũng tốt hơn.",
    },
    {
      name: "Trần Văn Hùng",
      role: "Chủ shop online",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "Hosting ổn định, uptime cao. Shop online của tôi không bao giờ bị down, khách hàng rất hài lòng.",
    },
    {
      name: "Lê Thị Lan",
      role: "Freelancer",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "Giá cả hợp lý, tính năng đầy đủ. Đặc biệt là backup tự động rất tiện, không lo mất dữ liệu.",
    },
    {
      name: "Phạm Minh Tuấn",
      role: "Web Developer",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "Control panel dễ sử dụng, cài WordPress chỉ 1 click. Staging site giúp test code rất tiện lợi.",
    },
    {
      name: "Hoàng Thị Nga",
      role: "Doanh nhân",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "Hỗ trợ khách hàng rất tốt, phản hồi nhanh. Mỗi khi có vấn đề đều được giải quyết kịp thời.",
    },
    {
      name: "Vũ Đình Nam",
      role: "Content Creator",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "CDN miễn phí giúp website load nhanh toàn cầu. Visitor từ nước ngoài cũng truy cập mượt mà.",
    },
  ];

  return (
    <section className="px-4 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">Khách Hàng Nói Gì</h2>
          <p className="text-lg text-neutral-400">
            Hơn 50,000+ website tin tưởng và sử dụng hosting của chúng tôi
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
