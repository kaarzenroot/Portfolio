import { useEffect, useRef } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const glowRef = useRef<HTMLDivElement>(null);

  // cursor-following ambient glow
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    const move = (e: MouseEvent) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div className="grain relative min-h-screen w-full bg-ink text-bone">
      <div id="cursor-glow" ref={glowRef} />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
