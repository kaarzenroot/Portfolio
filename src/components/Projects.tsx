import { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import GlareHover from './GlareHover';
import ScrollFloat from './ScrollFloat';

// ============================================================================
// CONFIGURATION: ADD OR EDIT PROJECTS HERE
// ============================================================================
// To add a new project, simply copy an existing block and paste it below.
// The project numbers (01, 02, etc.) will be automatically generated.
// 
// Project Status: 
// - "Live": The "View Product" button will be visible and clickable.
// - "In Development" (or any other string): The button will be invisible and disabled.
// ============================================================================
type Project = {
  name: string;
  descriptor: string;
  description: string;
  cta: string;
  href: string;
  status: 'Live' | 'In Development';
  tags: string[];
};

const projects: Project[] = [
  {
    name: 'Prawly',
    descriptor: 'Anonymous feedback, made honest',
    description:
      "Prawly turns anonymous feedback into something actually useful. People say whatever they want — raw, unfiltered — and AI transforms it into honest, constructive insight. No trauma, just truth.",
    cta: 'Explore Prawly',
    href: 'https://prawly.vercel.app',
    status: 'Live',
    tags: ['AI', 'Product', 'Feedback'],
  },
  {
    name: 'CampVault',
    descriptor: 'Secure academic infrastructure, rethought',
    description:
      'CampVault is a secure document and academic management platform built for institutions. Everything a campus needs to manage, store, and protect — in one system.',
    cta: 'View CampVault',
    href: '#',
    status: 'In Development',
    tags: ['Cybersecurity', 'SaaS', 'Institutions'],
  },
];
// ============================================================================

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const { ref, shown } = useReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? 'is-in' : ''}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <GlareHover
        glareColor="#ffffff"
        glareOpacity={0.08}
        glareSize={150}
        className={`shimmer-card project-card relative border select-none transition-all duration-300
          ${open
            ? 'border-crimson/60 bg-ink-elevated shadow-[0_0_60px_rgba(176,48,48,0.12)]'
            : 'border-ink-line bg-ink-surface hover:border-bone-faint/30 hover:bg-ink-elevated hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]'
          }`}
        style={{ borderRadius: '4px' }}
      >
        <div onClick={() => setOpen((v) => !v)} className="w-full h-full">
          {/* red left accent — thickens when open */}
          <div
            className={`absolute left-0 top-0 bottom-0 bg-crimson rounded-l-sm transition-all duration-500 ${open ? 'w-[3px] opacity-100' : 'w-0 opacity-0'
              }`}
          />

          {/* card header row */}
          <div className="flex items-center justify-between px-7 py-7 sm:px-10 sm:py-8 gap-6">
            <div className="flex items-center gap-6 sm:gap-10 min-w-0">
              <span className="font-mono text-xs text-bone-faint/60 shrink-0">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="min-w-0">
                <h3
                  className="font-display font-extrabold tracking-tighter text-bone leading-none truncate"
                  style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3.6rem)' }}
                >
                  {project.name}
                </h3>
                <p className="mt-1.5 font-sans text-sm text-bone-muted leading-relaxed hidden sm:block">
                  {project.descriptor}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              {/* status */}
              <span
                className={`hidden sm:flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widestx ${project.status === 'Live' ? 'text-bone-muted' : 'text-bone-faint'
                  }`}
              >
                {project.status === 'Live' && (
                  <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse-slow" />
                )}
                {project.status}
              </span>

              {/* chevron */}
              <div
                className={`h-8 w-8 flex items-center justify-center border border-ink-line rounded-full text-bone-faint transition-all duration-500 ${open ? 'rotate-180 border-crimson/40 text-crimson' : ''
                  }`}
              >
                <ChevronDown size={15} />
              </div>
            </div>
          </div>

          {/* expanded detail */}
          <div className={`project-card-detail ${open ? 'open' : ''}`}>
            <div>
              <div className="px-7 pb-8 sm:px-10 sm:pb-10 pt-0">
                {/* divider */}
                <div className="divider-line mb-8" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <div>
                    <p className="font-sans text-lg leading-relaxed text-bone/85">
                      {project.description}
                    </p>

                    {/* tags */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[11px] uppercase tracking-widestx text-bone-faint border border-ink-line bg-ink px-3 py-1"
                          style={{ borderRadius: '2px' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between gap-6">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-widestx text-bone-faint mb-2">
                        Status
                      </p>
                      <p className="font-sans text-base text-bone-muted">{project.status}</p>
                    </div>

                    <a
                      href={project.status === 'Live' ? project.href : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (project.status !== 'Live') e.preventDefault();
                      }}
                      className={`group inline-flex items-center gap-3 border bg-transparent px-7 py-3.5 font-sans text-sm self-start transition-all duration-300 relative z-20 ${project.status === 'Live'
                        ? 'border-crimson/70 text-bone hover:bg-crimson hover:border-crimson animate-glow-pulse'
                        : 'opacity-0 pointer-events-none'
                        }`}
                      style={{ borderRadius: '3px' }}
                      aria-disabled={project.status !== 'Live'}
                      tabIndex={project.status === 'Live' ? 0 : -1}
                    >
                      {project.cta}
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlareHover>
    </div>
  );
}

export default function Projects() {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="relative w-full py-36 sm:py-44 overflow-hidden">
      {/* ambient bg orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(176,48,48,0.07), transparent 70%)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 lg:px-20">
        {/* section header */}
        <div className={`reveal ${shown ? 'is-in' : ''}`}>
          <p className="font-mono text-sm uppercase tracking-widestx text-bone-muted">
            Selected Work
          </p>
          <div
            className="mt-6 font-display font-extrabold tracking-tightest leading-[0.88]"
            style={{ fontSize: 'clamp(3.2rem, 8.5vw, 8rem)' }}
          >
            <ScrollFloat
              animationDuration={1}
              stagger={0.03}
              textClassName="text-bone leading-[0.88]"
            >
              Things I've
            </ScrollFloat>
            <ScrollFloat
              animationDuration={1}
              stagger={0.03}
              textClassName="text-crimson leading-[0.88]"
            >
              built.
            </ScrollFloat>
          </div>
          <p className="mt-5 font-sans text-lg text-bone-muted max-w-md">
            Click any project to see what's underneath.
          </p>
        </div>

        {/* cards */}
        <div className="mt-16 space-y-4">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
