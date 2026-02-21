import type { Metadata } from "next";
import { satoshi, inter, jetbrainsMono } from "@/lib/fonts";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tommaso Ferrari | Fullstack Developer",
  description:
    "Fullstack developer building digital experiences that blend design and engineering into seamless, performant products.",
  openGraph: {
    title: "Tommaso Ferrari | Fullstack Developer",
    description:
      "Fullstack developer building digital experiences that blend design and engineering into seamless, performant products.",
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
