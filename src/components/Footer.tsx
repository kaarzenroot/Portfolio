import { useReveal } from '../hooks/useReveal';

export default function Footer() {
  const { ref, shown } = useReveal<HTMLElement>();

  return (
    <footer ref={ref} className="relative w-full overflow-hidden px-6 pb-10 pt-24">
      {/* enormous watermark name */}
      <div className="flex justify-center">
        <span
          aria-hidden
          className={`pointer-events-none select-none font-display font-extrabold tracking-tightest text-bone leading-none transition-opacity duration-[2500ms] ${shown ? 'opacity-[0.05]' : 'opacity-0'
            }`}
          style={{ fontSize: '24vw' }}
        >
          KAARNESH
        </span>
      </div>

      <p className="mt-10 text-center font-mono text-[10px] tracking-wider text-bone-faint">
        © Kaarnesh. All rights reserved.
      </p>
    </footer>
  );
}
