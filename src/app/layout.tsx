import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import PianoLines from '@/components/PianoLines';
import './globals.css';
import '../styles/themes.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Arthur Simões | Backend · DevSecOps',
  description:
    'Engenheiro de software especializado em backend, DevSecOps e arquitetura distribuída. Sistemas sólidos, seguros e escaláveis.',
  openGraph: {
    title: 'Arthur Simões | Backend · DevSecOps',
    description: 'Sistemas que não caem. Backend · DevSecOps · Arquitetura Distribuída.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="a" suppressHydrationWarning>
      <body className={`${outfit.variable} antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            <PianoLines />
            {children}
            <Analytics />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
