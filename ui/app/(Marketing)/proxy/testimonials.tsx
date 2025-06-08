import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";

export default function ProxyTestimonials() {
  const testimonials = [
    {
      name: "Nguyễn Văn Minh",
      role: "SEO Specialist",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "Proxy QuocHau giúp tôi crawl data từ Google mà không bị block. IP sạch, tốc độ nhanh và rotation thông minh.",
    },
    {
      name: "Trần Thị Hoa",
      role: "Digital Marketer",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "Dùng để quản lý nhiều tài khoản social media. IP residential rất ổn định, không bao giờ bị phát hiện.",
    },
    {
      name: "Lê Đức Anh",
      role: "E-commerce Owner",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "Theo dõi giá cả đối thủ trở nên dễ dàng. API đầy đủ tính năng, documentation rất chi tiết.",
    },
    {
      name: "Phạm Thị Lan",
      role: "Data Analyst",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "Scraping dữ liệu từ nhiều website cùng lúc mà không lo bị rate limit. Băng thông lớn, ping thấp.",
    },
    {
      name: "Hoàng Văn Tùng",
      role: "Security Researcher",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "Bảo mật tuyệt đối, không log traffic. Hỗ trợ SOCKS5 và HTTP/HTTPS đầy đủ cho research.",
    },
    {
      name: "Vũ Thị Mai",
      role: "Content Creator",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "Truy cập nội dung geo-blocked để nghiên cứu trend. Mobile proxy 4G/5G rất nhanh và ổn định.",
    },
  ];

  return (
    <section className="px-4 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">Khách Hàng Nói Gì</h2>
          <p className="text-lg text-neutral-400">
            Hàng nghìn chuyên gia tin tưởng và sử dụng proxy của chúng tôi
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
