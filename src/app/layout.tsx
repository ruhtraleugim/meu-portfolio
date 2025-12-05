import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Arthur | Desenvolvedor Full Stack",
  description: "Portfólio profissional de Arthur, desenvolvedor Full Stack especializado em soluções modernas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${outfit.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
