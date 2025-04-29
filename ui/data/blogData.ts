import { Category, BlogPost } from "@/types/blogTypes";

export const categories: Category[] = [
  { id: "1", name: "Technology", slug: "technology" },
  { id: "2", name: "Design", slug: "design" },
  { id: "3", name: "Development", slug: "development" },
  { id: "4", name: "Business", slug: "business" },
  { id: "5", name: "Lifestyle", slug: "lifestyle" },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Web Development in 2025",
    excerpt:
      "Exploring the latest trends and technologies shaping the future of web development.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl.",
    author: {
      name: "Jane Smith",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    category: "Technology",
    tags: ["Web Development", "Future Tech", "JavaScript"],
    coverImage:
      "https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    publishedDate: "2025-02-15",
    readTime: 5,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Mastering TypeScript: Advanced Patterns",
    excerpt:
      "Dive deep into advanced TypeScript patterns and techniques to level up your development skills.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl.",
    author: {
      name: "Mark Johnson",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    category: "Development",
    tags: ["TypeScript", "JavaScript", "Web Development"],
    coverImage:
      "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    publishedDate: "2025-02-01",
    readTime: 8,
  },
  {
    id: "3",
    title: "UI Design Trends for 2025",
    excerpt:
      "Exploring the cutting-edge design trends that will dominate the digital landscape in 2025.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl.",
    author: {
      name: "Sarah Lee",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    category: "Design",
    tags: ["UI Design", "UX", "Design Trends"],
    coverImage:
      "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    publishedDate: "2025-01-28",
    readTime: 6,
  },
  {
    id: "4",
    title: "Building Scalable React Applications",
    excerpt:
      "Learn how to architect React applications that scale effortlessly with your business needs.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl.",
    author: {
      name: "Alex Chen",
      avatar:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    category: "Development",
    tags: ["React", "Architecture", "JavaScript"],
    coverImage:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    publishedDate: "2025-01-15",
    readTime: 10,
    isFeatured: true,
  },
  {
    id: "5",
    title: "The Rise of AI in Content Creation",
    excerpt:
      "How artificial intelligence is revolutionizing the way we create and consume content.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl.",
    author: {
      name: "Emily Watson",
      avatar:
        "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    category: "Technology",
    tags: ["AI", "Content", "Future Tech"],
    coverImage:
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    publishedDate: "2025-01-10",
    readTime: 7,
  },
  {
    id: "6",
    title: "Optimizing Web Performance in 2025",
    excerpt:
      "Strategies and techniques to ensure your web applications are lightning-fast in 2025.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl.",
    author: {
      name: "David Kim",
      avatar:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    category: "Development",
    tags: ["Performance", "Web Development", "Optimization"],
    coverImage:
      "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    publishedDate: "2025-01-05",
    readTime: 9,
  },
];
