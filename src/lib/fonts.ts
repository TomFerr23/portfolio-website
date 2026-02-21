import localFont from "next/font/local";
import { Inter, JetBrains_Mono } from "next/font/google";

export const satoshi = localFont({
  src: [
    { path: "../fonts/Satoshi-Variable.woff2", style: "normal" },
    { path: "../fonts/Satoshi-VariableItalic.woff2", style: "italic" },
  ],
  variable: "--font-satoshi",
  display: "swap",
  preload: true,
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
