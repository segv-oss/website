export interface TeamMember {
  id: string;
  name: string;
  role: string;
  focus: string[];
  bio: string;
  subdomain: string;
  github: string;
  twitter?: string;
  linkedin?: string;
  avatarLetter: string;
  featured?: boolean;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "aryan",
    name: "Aryan",
    role: "Frontend Lead & Team Leader",
    focus: ["Frontend Architecture", "Team Direction", "Product Engineering"],
    bio: "Leading team strategy, modern frontend architecture, and interactive user experiences.",
    subdomain: "aryan.segv.tech",
    github: "https://github.com/aryan",
    avatarLetter: "A",
    featured: true
  },
  {
    id: "manpreet",
    name: "Manpreet",
    role: "Backend & CLI Utilities",
    focus: ["Backend Systems", "CLI Tooling", "Infrastructure"],
    bio: "Crafting high-performance backend architecture, developer CLI tools, and core system utilities.",
    subdomain: "manpreet.segv.tech",
    github: "https://github.com/manpreetsingh",
    avatarLetter: "M",
    featured: true
  },
  {
    id: "lavish",
    name: "Lavish",
    role: "UI/UX & Visual Designer",
    focus: ["Product Design", "Visual Identity", "Design Systems"],
    bio: "Directing visual identity, UI/UX design systems, typography, and aesthetic direction.",
    subdomain: "lavish.segv.tech",
    github: "https://github.com/lavish",
    avatarLetter: "L",
    featured: true
  },
  {
    id: "vansh",
    name: "Vansh",
    role: "Machine Learning & Data Science",
    focus: ["Machine Learning", "Data Science", "AI Pipelines"],
    bio: "Engineering intelligent models, data pipelines, and high-throughput machine learning infrastructure.",
    subdomain: "vansh.segv.tech",
    github: "https://github.com/vansh",
    avatarLetter: "V",
    featured: true
  }
];

export const SPECIALTY_TAGS = ["All", "Frontend", "Backend", "Design", "ML/DS"];
