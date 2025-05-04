export interface Component {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  isNew?: boolean;
}

export const categories = [
  "3D Effects",
  "Animations",
  "Backgrounds",
  "Cards",
  "Carousels",
  "Effects",
  "Grids",
  "Navigation",
];

export const components: Component[] = [
  {
    id: "3d-card-effect",
    name: "3D Card Effect",
    description:
      "A card perspective effect, hover over the card to elevate card elements.",
    category: "3D Effects",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "3d-marquee",
    name: "3D Marquee",
    description: "A 3D marquee effect with smooth animation and perspective.",
    category: "3D Effects",
    image: "/placeholder.svg?height=400&width=600",
    isNew: true,
  },
  {
    id: "3d-pin",
    name: "3D Pin",
    description: "A 3D pin effect that follows cursor movement with depth.",
    category: "3D Effects",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "animated-modal",
    name: "Animated Modal",
    description: "A modal with smooth entrance and exit animations.",
    category: "Animations",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "animated-testimonials",
    name: "Animated Testimonials",
    description: "Testimonials with elegant transition animations.",
    category: "Animations",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "animated-tooltip",
    name: "Animated Tooltip",
    description: "A tooltip with entrance and hover animations.",
    category: "Animations",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "apple-cards-carousel",
    name: "Apple Cards Carousel",
    description: "A carousel inspired by Apple's product showcase.",
    category: "Carousels",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "aurora-background",
    name: "Aurora Background",
    description: "A beautiful aurora-like animated background effect.",
    category: "Backgrounds",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "background-beams",
    name: "Background Beams",
    description: "Light beam effects for dynamic backgrounds.",
    category: "Backgrounds",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "background-beams-with-collision",
    name: "Background Beams With Collision",
    description: "Light beams that react to collision with elements.",
    category: "Backgrounds",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "background-boxes",
    name: "Background Boxes",
    description: "Animated 3D boxes as a background element.",
    category: "Backgrounds",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "background-gradient",
    name: "Background Gradient",
    description: "Smooth animated gradient backgrounds.",
    category: "Backgrounds",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "background-lines",
    name: "Background Lines",
    description: "Animated line patterns for backgrounds.",
    category: "Backgrounds",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "bento-grid",
    name: "Bento Grid",
    description: "A modern bento-style grid layout for content.",
    category: "Grids",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "canvas-reveal-effect",
    name: "Canvas Reveal Effect",
    description: "A canvas-based reveal animation for elements.",
    category: "Effects",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "card-hover-effect",
    name: "Card Hover Effect",
    description: "Interactive hover effects for cards.",
    category: "Cards",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "macbook-scroll",
    name: "Macbook Scroll",
    description:
      "Scroll through the page and see the image come out of the screen, as seen on Fey.com website.",
    category: "Effects",
    image: "/placeholder.svg?height=400&width=600",
  },
];
