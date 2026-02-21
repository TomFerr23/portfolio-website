import type { Metadata } from "next";
import { satoshi, inter, jetbrainsMono } from "@/lib/fonts";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tom Ferrari | CTO & Full Stack Developer",
  description:
    "CTO and full stack developer scaling e-commerce platforms to €1M+ monthly revenue through AI-powered automation, performance optimization, and data-driven growth.",
  openGraph: {
    title: "Tom Ferrari | CTO & Full Stack Developer",
    description:
      "CTO and full stack developer scaling e-commerce platforms to €1M+ monthly revenue through AI-powered automation, performance optimization, and data-driven growth.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
