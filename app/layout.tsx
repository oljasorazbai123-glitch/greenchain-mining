import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Syncopate } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

const syncopate = Syncopate({
  subsets: ["latin"],
  variable: "--font-syncopate",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "GreenChain Mining — Болашақтың экомайнингі",
  description:
    "Блокчейн энергиясын азайтатын интеллектуалды экожүйе. Күн, жел және AI бір тізбекте — нөлдік көміртек майнингі.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kk">
      <body className={`${spaceGrotesk.variable} ${jetbrains.variable} ${syncopate.variable}`}>
        {children}
      </body>
    </html>
  );
}
