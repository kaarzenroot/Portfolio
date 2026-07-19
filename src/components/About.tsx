import { useReveal } from '../hooks/useReveal';
import ScrollFloat from './ScrollFloat';

const skills = ['Design', 'Cybersecurity', 'Product Thinking', 'Creative Direction', 'Full-Stack Dev'];

export default function About() {
  const { ref, shown } = useReveal<HTMLElement>();
  const on = shown ? 'is-in' : '';

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden animated-bg py-36 sm:py-44"
    >
      {/* faint background letters */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 flex items-center justify-center font-display font-extrabold tracking-tightest text-bone leading-none select-none transition-opacity duration-[2500ms] ${shown ? 'opacity-[0.035]' : 'opacity-0'
          }`}
        style={{ fontSize: '28vw', whiteSpace: 'nowrap' }}
      >
        KAARNESH
      </span>

      {/* top divider */}
      <div className="divider-line w-full mb-20" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 lg:px-20">
        {/* section label */}
        <p className={`reveal font-mono text-sm uppercase tracking-widestx text-bone-muted ${on}`}>
          About
        </p>

        {/* headline */}
        <div
          className={`reveal mt-8 font-display font-extrabold tracking-tightest leading-[0.88] ${on}`}
          style={{
            fontSize: 'clamp(3.2rem, 8.5vw, 6rem)',
            transitionDelay: '80ms',
          }}
        >
          <ScrollFloat
            animationDuration={1}
            stagger={0.03}
            textClassName="text-bone leading-[0.88]"
          >
            One box
          </ScrollFloat>
          <ScrollFloat
            animationDuration={1}
            stagger={0.03}
            textClassName="text-crimson leading-[0.88]"
          >
            wasn't enough.
          </ScrollFloat>
        </div>

        {/* paragraphs */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div className="space-y-6">
            <p
              className={`reveal font-sans text-xl leading-relaxed text-bone/90 ${on}`}
              style={{ transitionDelay: '160ms' }}
            >
              I'm a cybersecurity student who can't stop making things. I don't fit into one box — I break the box and build something new from the pieces. Creativity is the thing I admire most, and the thing I chase.
            </p>
            <p
              className={`reveal font-sans text-lg leading-relaxed text-bone-muted ${on}`}
              style={{ transitionDelay: '240ms' }}
            >
              Right now I'm building <span className="text-bone">Prawly</span> and{' '}
              <span className="text-bone">CampVault</span>. Two different problems, same instinct: take something that should exist and make it real.
            </p>
          </div>

          <div className="space-y-6">
            <p
              className={`reveal font-sans text-lg leading-relaxed text-bone-muted ${on}`}
              style={{ transitionDelay: '320ms' }}
            >
              I'm not trying to be the next anyone. I want to found something unconventional.
            </p>

            {/* skill tags */}
            <div
              className={`reveal mt-2 flex flex-wrap gap-2 ${on}`}
              style={{ transitionDelay: '420ms' }}
            >
              {skills.map((s) => (
                <span
                  key={s}
                  className="font-mono text-[11px] uppercase tracking-wider text-bone-faint border border-ink-line px-3 py-1.5 bg-ink-surface hover:border-crimson/40 hover:text-bone-muted transition-colors duration-300"
                  style={{ borderRadius: '2px' }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* signature */}
        <p
          className={`reveal mt-16 font-display italic text-xl text-bone-muted ${on}`}
          style={{ transitionDelay: '500ms' }}
        >
          — Kaarnesh
        </p>
      </div>

      {/* bottom divider */}
      <div className="divider-line w-full mt-20" />
    </section>
  );
}
