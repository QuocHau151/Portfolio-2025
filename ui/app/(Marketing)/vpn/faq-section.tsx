import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function VPNFAQSection() {
  const faqs = [
    {
      question: "VPN là gì và tại sao tôi cần sử dụng?",
      answer:
        "VPN (Virtual Private Network) tạo kết nối mã hóa an toàn giữa thiết bị của bạn và internet, giúp bảo vệ quyền riêng tư, ẩn địa chỉ IP thật, truy cập nội dung bị chặn địa lý và bảo mật dữ liệu trên WiFi công cộng.",
    },
    {
      question: "VPN có làm chậm tốc độ internet không?",
      answer:
        "VPN chất lượng cao như QuocHau chỉ làm giảm tốc độ tối thiểu (5-10%) nhờ servers 10Gbps và protocol WireGuard tối ưu. Trong nhiều trường hợp, VPN còn có thể tăng tốc bằng cách tránh throttling của ISP.",
    },
    {
      question: "Tôi có thể xem Netflix và các dịch vụ streaming không?",
      answer:
        "Có, VPN QuocHau hỗ trợ streaming 4K trên Netflix, Disney+, HBO Max, Amazon Prime và 50+ nền tảng khác. Chúng tôi có servers chuyên dụng cho streaming với tốc độ cao và uptime 99.9%.",
    },
    {
      question: "No-logs policy có nghĩa là gì?",
      answer:
        "No-logs policy có nghĩa chúng tôi không thu thập, lưu trữ hay chia sẻ bất kỳ thông tin nào về hoạt động online của bạn. Chính sách này đã được kiểm toán độc lập bởi các công ty bảo mật uy tín.",
    },
    {
      question: "Tôi có thể sử dụng VPN trên bao nhiêu thiết bị?",
      answer:
        "Tùy thuộc vào gói: Basic (3 thiết bị), Premium (6 thiết bị), Business (10 thiết bị), Enterprise (không giới hạn). Hỗ trợ Windows, Mac, iOS, Android, Linux và router.",
    },
    {
      question: "VPN có hỗ trợ P2P và torrenting không?",
      answer:
        "Có, gói Premium trở lên hỗ trợ P2P và torrenting an toàn với servers tối ưu, băng thông không giới hạn và bảo vệ danh tính hoàn toàn. Kill switch đảm bảo IP thật không bao giờ bị lộ.",
    },
    {
      question: "Kill switch hoạt động như thế nào?",
      answer:
        "Kill switch tự động ngắt kết nối internet nếu VPN bị gián đoạn, đảm bảo IP thật và dữ liệu của bạn không bao giờ bị lộ. Tính năng này hoạt động ở cả cấp ứng dụng và hệ thống.",
    },
    {
      question: "Chính sách hoàn tiền như thế nào?",
      answer:
        "Chúng tôi có chính sách hoàn tiền 100% trong vòng 30 ngày đầu, không cần lý do. Bạn có thể dùng thử đầy đủ tính năng và hoàn tiền dễ dàng nếu không hài lòng.",
    },
  ];

  return (
    <section className="px-4 py-20 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">Câu Hỏi Thường Gặp</h2>
          <p className="text-lg text-neutral-400">
            Tìm câu trả lời cho những thắc mắc phổ biến về dịch vụ VPN
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-lg border-neutral-700 bg-neutral-800 px-6"
            >
              <AccordionTrigger className="text-left transition-colors hover:text-green-400 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="leading-relaxed text-neutral-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="mb-4 text-neutral-400">Cần hỗ trợ thêm?</p>
          <a
            href="#contact"
            className="font-semibold text-green-400 hover:text-green-300"
          >
            Chat với chuyên gia →
          </a>
        </div>
      </div>
    </section>
  );
}
