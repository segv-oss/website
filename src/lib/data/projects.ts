export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: "Mobile" | "Security" | "Tools";
  stack: string[];
  stars?: number;
  githubUrl?: string;
  demoUrl?: string;
  status: "Shipped" | "Beta" | "In Development";
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "vellum",
    title: "Vellum",
    tagline: "Mobile comic book and document reader",
    description: "A fast, beautiful mobile reader designed for comic books and documents with fluid rendering, instant page layout, and gesture navigation.",
    category: "Mobile",
    stack: ["Kotlin", "Android", "PDF / CBZ Engine"],
    githubUrl: "https://github.com/manpreet113/vellum",
    status: "In Development",
    featured: true
  },
  {
    id: "algiz",
    title: "Algiz",
    tagline: "Zero-knowledge password manager",
    description: "A privacy-first, zero-knowledge password manager engineered with end-to-end encryption, local key derivation, and biometric authentication.",
    category: "Security",
    stack: ["Cryptography", "Security", "Zero-Knowledge"],
    githubUrl: "",
    status: "In Development",
    featured: true
  }
];

export const PROJECT_CATEGORIES = ["All", "Mobile", "Security", "Tools"];
