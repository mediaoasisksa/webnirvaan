export type CaseStudy = {
    slug: string;
    title: string;
    client: string;
    website: string;
    industry: string;
    description: string;
    challenge: string;
    solution: string;
    results: string[];
    tech: string[];
  };
  
  export const caseStudies: CaseStudy[] = [
    {
      slug: "jynak-ai",
      title: "Jynak AI – AI Platform Development Case Study",
      client: "Jynak AI",
      website: "https://jynak.ai",
      industry: "Artificial Intelligence",
      description:
        "We built a scalable AI-driven platform with high performance, modern UI, and SEO-friendly architecture.",
      challenge:
        "The client needed a fast, scalable AI platform capable of handling future AI workloads while maintaining a clean user experience.",
      solution:
        "We developed a Next.js frontend with a Node.js backend, optimized APIs, and applied SEO best practices from day one.",
      results: [
        "⚡ 40% faster page load times",
        "📈 Improved organic traffic",
        "🚀 Scalable AI-ready architecture",
      ],
      tech: ["Next.js", "Node.js", "PostgreSQL", "AI"],
    },
  
    {
      slug: "janagate",
      title: "Janagate – Business Website Transformation Case Study",
      client: "Janagate",
      website: "https://janagate.com",
      industry: "Business & Consulting",
      description:
        "A modern business website designed to improve brand presence, performance, and lead generation.",
      challenge:
        "Janagate needed a professional, trustworthy online presence with strong SEO foundations and mobile responsiveness.",
      solution:
        "We designed and developed a clean, responsive website with optimized page structure, fast loading, and conversion-focused CTAs.",
      results: [
        "📊 Increased website engagement",
        "📱 Fully responsive across devices",
        "🔍 SEO-optimized structure",
      ],
      tech: ["Next.js", "Tailwind CSS", "SEO", "Performance Optimization"],
    },
  
    {
      slug: "consl2",
      title: "CONSL2 – Corporate Consulting Website Case Study",
      client: "CONSL2",
      website: "https://consl2.com",
      industry: "Corporate Consulting",
      description:
        "A professional corporate website reflecting trust, clarity, and authority in the consulting space.",
      challenge:
        "CONSL2 required a clean corporate identity online with fast performance and a professional look aligned with their brand.",
      solution:
        "We implemented a minimal, elegant UI with performance optimizations and clear messaging tailored to enterprise clients.",
      results: [
        "🏢 Stronger corporate brand presence",
        "⚡ Faster load times",
        "🎯 Improved client trust and clarity",
      ],
      tech: ["React", "UI/UX Design", "Web Performance"],
    },
  ];
  