export interface Principle {
  number: string;
  title: string;
  summary: string;
  tag: string;
}

export const MANIFESTO_PRINCIPLES: Principle[] = [
  {
    number: "01",
    title: "Thoughtful Engineering",
    summary: "Software built with intention, clarity, and architectural precision. We design systems that are as elegant internally as they are visually.",
    tag: "PRECISION"
  },
  {
    number: "02",
    title: "Uncompromising Speed",
    summary: "Smooth 60 FPS interfaces, instant response times, and zero latency. We engineer for speed without sacrificing design elegance.",
    tag: "PERFORMANCE"
  },
  {
    number: "03",
    title: "Open Architecture",
    summary: "Open source by conviction. Code designed to inspire, endure, and empower the global developer and creator community.",
    tag: "TRANSPARENCY"
  },
  {
    number: "04",
    title: "Continuous Craft",
    summary: "We measure success in shipped software, intuitive products, and lasting human impact.",
    tag: "CRAFT"
  }
];

export const HERO_MANIFESTO_QUOTES = [
  "INDEPENDENT SOFTWARE COLLECTIVE",
  "FINISHED MORE. PLANNED LESS.",
  "THOUGHTFUL DIGITAL PRODUCTS & OPEN SOURCE",
  "SEGV STUDIO"
];
