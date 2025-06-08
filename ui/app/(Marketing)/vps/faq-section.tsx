import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const faqs = [
    {
      question: "VPS là gì và khác gì với Shared Hosting?",
      answer:
        "VPS (Virtual Private Server) là máy chủ ảo riêng biệt với tài nguyên được phân bổ cố định, không chia sẻ với người khác. Khác với Shared Hosting, VPS cho phép bạn có quyền root, cài đặt phần mềm tùy ý và có hiệu năng ổn định hơn.",
    },
    {
      question: "Tôi có thể nâng cấp VPS sau khi mua không?",
      answer:
        "Có, bạn có thể nâng cấp CPU, RAM, ổ cứng bất cứ lúc nào thông qua control panel. Việc nâng cấp sẽ có hiệu lực ngay lập tức và chỉ cần restart VPS.",
    },
    {
      question: "Có hỗ trợ backup dữ liệu không?",
      answer:
        "Có, chúng tôi cung cấp backup tự động hàng ngày cho tất cả gói VPS SSD trở lên. Bạn có thể khôi phục dữ liệu từ các bản backup trong vòng 7 ngày qua.",
    },
    {
      question: "Thời gian setup VPS là bao lâu?",
      answer:
        "VPS sẽ được setup tự động và sẵn sàng sử dụng trong vòng 5-10 phút sau khi thanh toán thành công. Thông tin đăng nhập sẽ được gửi qua email.",
    },
    {
      question: "Có hỗ trợ cài đặt phần mềm không?",
      answer:
        "Có, đội ngũ kỹ thuật của chúng tôi sẽ hỗ trợ cài đặt các phần mềm cơ bản như web server, database, control panel miễn phí. Với các yêu cầu phức tạp sẽ có phí hỗ trợ.",
    },
    {
      question: "Chính sách hoàn tiền như thế nào?",
      answer:
        "Chúng tôi có chính sách hoàn tiền 100% trong vòng 7 ngày đầu nếu bạn không hài lòng với dịch vụ. Sau thời gian này, hoàn tiền sẽ được tính theo tỷ lệ thời gian sử dụng.",
    },
    {
      question: "VPS có được bảo vệ khỏi DDoS không?",
      answer:
        "Có, tất cả VPS đều được trang bị hệ thống chống DDoS cơ bản miễn phí. Đối với các cuộc tấn công lớn, chúng tôi có gói bảo vệ DDoS nâng cao với phí bổ sung.",
    },
    {
      question: "Tôi có thể cài đặt hệ điều hành khác không?",
      answer:
        "Có, chúng tôi hỗ trợ nhiều hệ điều hành như Ubuntu, CentOS, Debian, Windows Server. Bạn có thể thay đổi OS bất cứ lúc nào thông qua control panel.",
    },
  ];

  return (
    <section className="px-4 py-10 lg:py-20 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="mb-2 text-4xl font-bold">Câu Hỏi Thường Gặp</h2>
          <p className="text-[15px] text-gray-400">
            Tìm câu trả lời cho những thắc mắc phổ biến về dịch vụ VPS
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-lg border-gray-700 bg-neutral-800 px-6"
            >
              <AccordionTrigger className="text-left transition-colors hover:text-green-400 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="leading-relaxed text-gray-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="mb-4 text-gray-400">
            Không tìm thấy câu trả lời bạn cần?
          </p>
          <a
            href="#contact"
            className="font-semibold text-green-400 hover:text-green-300"
          >
            Liên hệ với chúng tôi →
          </a>
        </div>
      </div>
    </section>
  );
}
