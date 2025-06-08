import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ProxyFAQSection() {
  const faqs = [
    {
      question: "Proxy là gì và tại sao tôi cần sử dụng?",
      answer:
        "Proxy là máy chủ trung gian giữa thiết bị của bạn và internet, giúp ẩn IP thật, truy cập nội dung bị chặn địa lý, bảo vệ quyền riêng tư và tăng tốc độ browsing. Rất hữu ích cho SEO, marketing, research và bảo mật.",
    },
    {
      question: "Sự khác biệt giữa Datacenter, Residential và Mobile proxy?",
      answer:
        "Datacenter proxy: Tốc độ cao, giá rẻ nhưng dễ bị phát hiện. Residential proxy: IP từ ISP thật, khó phát hiện nhưng chậm hơn. Mobile proxy: IP từ mạng di động, rất khó phát hiện và phù hợp cho social media.",
    },
    {
      question: "IP rotation hoạt động như thế nào?",
      answer:
        "IP rotation tự động thay đổi địa chỉ IP theo chu kỳ thời gian hoặc theo số request. Điều này giúp tránh bị phát hiện và block bởi website, đặc biệt hữu ích cho web scraping và crawling.",
    },
    {
      question: "Tôi có thể sử dụng proxy cho việc gì?",
      answer:
        "Proxy có thể dùng cho: Web scraping/crawling, SEO monitoring, quản lý nhiều tài khoản social media, truy cập nội dung geo-blocked, bảo vệ quyền riêng tư, nghiên cứu thị trường, và testing website từ nhiều vị trí.",
    },
    {
      question: "Proxy có hỗ trợ HTTPS và SOCKS5 không?",
      answer:
        "Có, chúng tôi hỗ trợ đầy đủ các giao thức HTTP, HTTPS và SOCKS5. SOCKS5 đặc biệt hữu ích cho các ứng dụng không phải web browser và cung cấp hiệu năng tốt hơn.",
    },
    {
      question: "Làm sao để tích hợp proxy vào ứng dụng của tôi?",
      answer:
        "Chúng tôi cung cấp API RESTful đầy đủ, documentation chi tiết và SDK cho các ngôn ngữ phổ biến. Bạn cũng có thể sử dụng proxy như HTTP/SOCKS5 proxy thông thường trong bất kỳ ứng dụng nào.",
    },
    {
      question: "Có giới hạn băng thông hay số request không?",
      answer:
        "Mỗi gói có giới hạn băng thông khác nhau. Không có giới hạn số request nhưng chúng tôi khuyến khích sử dụng hợp lý để đảm bảo chất lượng dịch vụ cho tất cả khách hàng.",
    },
    {
      question: "Chính sách hoàn tiền như thế nào?",
      answer:
        "Chúng tôi có chính sách hoàn tiền 100% trong vòng 24 giờ đầu nếu bạn không hài lòng với chất lượng dịch vụ. Sau thời gian này, hoàn tiền sẽ được tính theo tỷ lệ thời gian sử dụng.",
    },
  ];

  return (
    <section className="px-4 py-20 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">Câu Hỏi Thường Gặp</h2>
          <p className="text-lg text-neutral-400">
            Tìm câu trả lời cho những thắc mắc phổ biến về dịch vụ Proxy
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
          <p className="mb-4 text-neutral-400">Cần hỗ trợ kỹ thuật?</p>
          <a
            href="#contact"
            className="font-semibold text-green-400 hover:text-green-300"
          >
            Liên hệ team support →
          </a>
        </div>
      </div>
    </section>
  );
}
