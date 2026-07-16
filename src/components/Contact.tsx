import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const EMAIL = 'kaarnesh@example.com';

const socials = [
  { Icon: Github, href: '#', label: 'GitHub' },
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Linkedin, href: '#', label: 'LinkedIn' },
  { Icon: Mail, href: `mailto:${EMAIL}`, label: 'Email' },
];

export default function Contact() {
  const { ref, shown } = useReveal<HTMLElement>();
  const on = shown ? 'is-in' : '';

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden animated-bg py-36 sm:py-44"
    >
      {/* ambient orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(176,48,48,0.06), transparent 70%)' }}
      />

      <div className="divider-line w-full mb-20" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 lg:px-20">
        <p className={`reveal font-mono text-sm uppercase tracking-widestx text-bone-muted ${on}`}>
          Contact
        </p>

        <h2
          className={`reveal mt-8 font-display font-extrabold tracking-tightest text-bone leading-[0.9] ${on}`}
          style={{
            fontSize: 'clamp(3.2rem, 8.5vw, 8rem)',
            transitionDelay: '80ms',
          }}
        >
          If something
          <br />
          <span className="text-crimson">resonated, say hi.</span>
        </h2>

        <a
          href={`mailto:${EMAIL}`}
          className={`reveal group mt-12 inline-block font-display text-2xl sm:text-4xl text-bone/90 transition-colors duration-300 hover:text-bone ${on}`}
          style={{ transitionDelay: '160ms' }}
        >
          <span className="border-b border-transparent transition-all duration-300 group-hover:border-crimson group-hover:text-glow-crimson">
            {EMAIL}
          </span>
        </a>

        {/* socials */}
        <div
          className={`reveal mt-12 flex items-center gap-5 ${on}`}
          style={{ transitionDelay: '240ms' }}
        >
          {socials.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="h-11 w-11 flex items-center justify-center border border-ink-line rounded-full text-bone-faint opacity-70 transition-all duration-300 hover:opacity-100 hover:text-bone hover:border-crimson/40 hover:bg-ink-elevated hover:shadow-[0_0_20px_rgba(176,48,48,0.15)]"
            >
              <Icon size={19} strokeWidth={1.5} />
            </a>
          ))}
        </div>

        <a
          href={`mailto:${EMAIL}?subject=Have%20something%20to%20build`}
          className={`reveal group mt-16 inline-flex items-center gap-2 font-sans text-lg text-bone-muted transition-colors duration-300 hover:text-bone ${on}`}
          style={{ transitionDelay: '320ms' }}
        >
          Have something to build?
          <span className="text-crimson-soft transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>

      <div className="divider-line w-full mt-20" />
    </section>
  );
}
