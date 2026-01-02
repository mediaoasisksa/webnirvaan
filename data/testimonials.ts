export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
};

export const testimonials: Record<string, Testimonial[]> = {
  "jynak-ai": [
    {
      name: "Founder, Jynak AI",
      role: "CEO",
      company: "Jynak AI",
      quote:
        "WebNirvaan delivered exactly what we envisioned. The platform is fast, scalable, and beautifully designed.",
      rating: 5,
    },
  ],
  janagate: [
    {
      name: "Business Head",
      role: "Director",
      company: "Janagate",
      quote:
        "Our website traffic and conversions improved significantly after launch.",
      rating: 4,
    },
  ],
  consl2: [
    {
      name: "Managing Partner",
      role: "Consultant",
      company: "CONSL2",
      quote:
        "Clean design, fast delivery, and very professional execution.",
      rating: 5,
    },
  ],
};
