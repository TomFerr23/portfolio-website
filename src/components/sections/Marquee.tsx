"use client";

const ITEMS = [
  "React",
  "Next.js",
  "TypeScript",
  "Shopify",
  "Node.js",
  "AI Automation",
  "Tailwind",
  "GraphQL",
  "Flutter",
  "SEO",
  "Vercel",
  "E-commerce",
];

export default function Marquee() {
  const content = ITEMS.map((item) => (
    <span key={item} className="flex items-center gap-8">
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-h1)",
          fontWeight: 700,
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {item}
      </span>
      <span className="text-accent" style={{ fontSize: "var(--text-h3)" }}>
        &#x2726;
      </span>
    </span>
  ));

  return (
    <div
      className="overflow-hidden border-y border-bg-elevated py-6 text-text-secondary/20"
      aria-hidden="true"
    >
      <div className="flex animate-marquee gap-8">
        <div className="flex shrink-0 gap-8">{content}</div>
        <div className="flex shrink-0 gap-8">{content}</div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
