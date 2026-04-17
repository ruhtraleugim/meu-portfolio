'use client';

import { useEffect, useState } from 'react';
// import Header from '@/components/Header';
// import Hero from '@/components/Hero';
// import Stack from '@/components/Stack';
// import About from '@/components/About';
// import Projects from '@/components/Projects';
// import Contact from '@/components/Contact';
import EntryScreen from '@/components/EntryScreen';

export default function Home() {
  const [showEntry, setShowEntry] = useState<boolean | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme');
    setShowEntry(!saved);
  }, []);

  if (showEntry === null) return null;

  if (showEntry) {
    return <EntryScreen onEnter={() => setShowEntry(false)} />;
  }

  return (
    <main>
      {/* <Header />
      <Hero />
      <Stack />
      <About />
      <Projects />
      <Contact /> */}
    </main>
  );
}
