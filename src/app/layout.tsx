import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-serif",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Ren Takahashi | Photographer & Essayist",
  description: "日常と風景のあいだ。写真家・エッセイスト 高橋 蓮 のポートフォリオ。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${cormorant.variable} ${notoSansJP.variable}`}>
      <body className="min-h-screen flex flex-col font-[family-name:var(--font-sans)]">
        {children}
      </body>
    </html>
  );
}
