import { StackCard } from "@/components/ui/Stack-card";
import { useScroll } from "framer-motion";
import { useRef } from "react";

interface Project {
  title: string;
  description: string;
  tag: string[];
  src: string;
  url: string;
}

// Dữ liệu mẫu, thay đổi hoặc import dữ liệu dự án của bạn tại đây.
const projects: Project[] = [
  {
    title: "FPT Smart Home",
    description: "",
    src: "/assets/images/project/fpt.png",
    url: "https://www.fpt-smarthome.vn",
    tag: ["Full-Stack", "NextJS", "Github CI/CD", "PostgreSQL"],
  },
  {
    title: "Khuê Tuấn ",
    description: "",
    src: "/assets/images/project/khuetuan.png",
    url: "https://khuetuan.com",
    tag: ["Front-End", "Back-End", "Full-Stack"],
  },
  {
    title: "Khang Minh Lighting",
    description: "",
    src: "/assets/images/project/khangminh.png",
    url: "https://khangminhlighting.com",
    tag: ["Front-End", "Back-End", "Full-Stack"],
  },
  {
    title: "MepSharing",
    description: "",
    src: "/assets/images/project/mepsharing.png",
    url: "https://www.mepsharing.com",
    tag: ["Front-End", "Back-End", "Full-Stack"],
  },
  {
    title: "Sol Media",
    description: "Mô tả cho Project Two.",
    src: "/assets/images/project/sol.png",
    url: "https://www.solmedia.pics",
    tag: ["Front-End", "Back-End", "Full-Stack"],
  },

  // Thêm dự án nếu cần
];
const Stack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Scroll context cho trang chính
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main ref={containerRef} className="container min-h-screen">
      {projects.map((project, i) => {
        const targetScale = 1 - (projects.length - i) * 0.05;
        return (
          <StackCard
            key={`p_${i}`}
            i={i}
            tag={project.tag}
            title={project.title}
            description={project.description}
            src={project.src}
            url={project.url}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </main>
  );
};

export default Stack;
