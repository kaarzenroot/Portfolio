import { useEffect, useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const [phase, setPhase] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const etchedRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = etchedRef.current;
      if (!el) return;
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const progress = Math.min(scrollY / (heroHeight * 0.6), 1);

      el.style.opacity = `${1 - progress * 1.2}`;
      el.style.filter = `blur(${progress * 5}px)`;
      el.style.letterSpacing = `${0.35 + progress * 0.15}em`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 150),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1300),
      setTimeout(() => setPhase(4), 1900),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // floating particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf: number;
    const particles: { x: number; y: number; r: number; vx: number; vy: number; o: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 48; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.4 + 0.3,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        o: Math.random() * 0.28 + 0.06,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,236,228,${p.o})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const show = (n: number) => phase >= n;

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* ── background atmospheric glow — behind everything ── */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 50% 22%, rgba(176,48,48,0.16) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* ── portrait background image ── */}
      <div
        className={`absolute inset-0 z-[1] flex items-start justify-center transition-opacity duration-[2500ms] delay-[800ms] ${show(1) ? 'opacity-100' : 'opacity-0'}`}
      >
        <img
          src="/images/portimg.png"
          alt="Kaarnesh Background"
          className="hero-image w-full h-full object-contain"
          style={{ objectPosition: 'center 15%' }}
          draggable={false}
        />
      </div>

      {/* ── hero text wrapper (layered between images) ── */}
      <div className="
        absolute inset-x-0 top-0 z-[2]
        flex items-start justify-center
        pointer-events-none
        -translate-y-[30px]
        md:-translate-y-[70px]
      ">
        <div className="relative select-none w-full h-full flex items-center justify-center">
          <h1
            className="font-hero uppercase text-center transition-all duration-[1600ms] ease-out"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(250px, 30vw, 400px)',
              lineHeight: 0.88,
              letterSpacing: '-0.02em',
              opacity: show(1) ? 1 : 0,
              textShadow: '0 4px 80px rgba(0,0,0,0.9), 0 0 120px rgba(176,48,48,0.2)',
              whiteSpace: 'nowrap',
              transform: show(1)
                ? 'translateY(0) scaleY(1.3)'
                : 'translateY(-140px) scaleY(1.3)',
              transformOrigin: 'center top',
              maskImage: 'linear-gradient(to bottom, white 40%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, white 40%, transparent 100%)',
            }}
          >
            <span style={{ color: '#f0ece4' }}>KAAR</span>
            <span className="hidden md:inline" style={{ color: '#b03030' }}>NESH</span>
          </h1>
        </div>
      </div>

      {/* ── portrait foreground image ── */}
      <div
        className={`absolute inset-0 z-[3] flex items-start justify-center transition-opacity duration-[1000ms] delay-[800ms] pointer-events-none ${show(1) ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <img
          src="/images/onlyme.png"
          alt="Kaarnesh Foreground"
          className="hero-image w-full h-full object-contain pointer-events-none"
          style={{ objectPosition: 'center 15%' }}
          draggable={false}
        />
      </div>



      {/* ── aura vignette — transparent center, fades edges into bg ── */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        {/* radial aura — transparent center, dark edges, hides photo borders */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 52% 68% at 50% 32%, transparent 38%, rgba(13,12,11,0.5) 68%, rgba(13,12,11,0.92) 100%)',
          }}
        />
        {/* bottom fade for text readability */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '40%',
            background:
              'linear-gradient(to top, rgba(13,12,11,0.98) 0%, rgba(13,12,11,0.82) 35%, rgba(13,12,11,0.25) 72%, transparent 100%)',
          }}
        />
        {/* subtle top edge */}
        <div
          className="absolute top-0 left-0 right-0 h-[8%]"
          style={{
            background: 'linear-gradient(to bottom, rgba(13,12,11,0.5), transparent)',
          }}
        />
      </div>

      {/* particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[6] pointer-events-none"
      />

      {/* ── bottom content block (tagline, tags) ── */}
      <div className="absolute bottom-24 sm:bottom-32 left-0 right-0 z-[7] w-full flex flex-col items-center text-center px-6 pointer-events-none">
        {/* ── etched glass secondary name ── */}
        <div
          className="transition-all duration-1000 ease-out mb-5 translate-x-[-5px] md:translate-y-[30px]"
          style={{
            opacity: show(2) ? 1 : 0,
            transitionDelay: '1000ms',
          }}
        >
          <h2
            ref={etchedRef}
            className="font-hero uppercase select-none"
            style={{
              transform: 'translateX(18px)',
              fontWeight: 1000,
              fontSize: 'clamp(3rem, 6vw, 100px)',
              letterSpacing: 'clamp(0.2em, 2vw, 1em)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.55)',
              textShadow: '0 0 20px rgba(112, 30, 30, 0.12), 0 1px 0 rgba(255, 255, 255, 0.08)',
              background: 'none',
              willChange: 'opacity, filter, letter-spacing'
            }}
          >
            KAARNESH
          </h2>
        </div>

        {/* ── mobile 'NESH' part (hidden on md and larger) ── */}
        <div
          className="md:hidden transition-all duration-1000 ease-out mb-5"
          style={{
            opacity: show(2) ? 1 : 0,
            transform: show(2) ? 'translateY(-15px)' : 'translateY(10px)',
            transitionDelay: '150ms',
          }}
        >
          <h1
            className="font-hero uppercase text-center"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(250px, 24vw, 400px)',
              lineHeight: 0.88,
              letterSpacing: '-0.02em',
              textShadow: '0 4px 80px rgba(0,0,0,0.9), 0 0 120px rgba(176,48,48,0.2)',
              transform: 'scaleY(1.3)',
              color: '#b03030',
              maskImage: 'linear-gradient(to bottom, white 40%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, white 40%, transparent 100%)',
            }}
          >
            NESH
          </h1>
        </div>

        {/* thin crimson rule */}
        <div
          className="h-px bg-crimson transition-all duration-1000 ease-out"
          style={{
            width: show(2) ? '5rem' : '0',
            opacity: show(2) ? 0.85 : 0,
            transitionDelay: '200ms',
          }}
        />

        {/* tagline */}
        <p
          className="mt-6 font-sans text-lg sm:text-xl text-bone/80 max-w-md leading-relaxed transition-all duration-1000 ease-out"
          style={{
            opacity: show(2) ? 1 : 0,
            transform: show(2) ? 'translateY(0)' : 'translateY(10px)',
            transitionDelay: '350ms',
          }}
        >
          Chill. Creative. Building the{' '}
          <span className="text-crimson-soft" style={{ textShadow: '0 0 30px rgba(176,48,48,0.5)' }}>
            next
          </span>{' '}
          thing.
        </p>

        {/* tags */}
        <div
          className="mt-7 flex flex-wrap justify-center gap-2.5 transition-all duration-1000 ease-out"
          style={{
            opacity: show(3) ? 1 : 0,
            transform: show(3) ? 'translateY(0)' : 'translateY(10px)',
            transitionDelay: '550ms',
          }}
        >
          {['Cybersecurity', 'Creative', 'Future Founder'].map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-widestx text-bone-faint border border-bone-faint/25 px-3 py-1.5 bg-ink/40 backdrop-blur-sm"
              style={{ borderRadius: '2px' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* scroll indicator */}
      <div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-[7] flex flex-col items-center gap-2 transition-opacity duration-1000"
        style={{ opacity: show(4) ? 0.5 : 0 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-widestx text-bone-faint">
          scroll
        </span>
        <ChevronDown size={13} className="text-bone-faint animate-scroll-bounce" />
      </div>
    </section>
  );
}
