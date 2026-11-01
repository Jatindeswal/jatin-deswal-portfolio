import { ArrowUp } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const FOOTER_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Journey', href: '#journey' },
  { name: 'Contact', href: '#contact' },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand Monogram & Copyright */}
        <div className="flex flex-col items-center md:items-start space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-emerald-400 font-bold">&gt;_</span>
            <span className="font-semibold text-sm text-slate-100">
              {portfolioData.profile.name}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            © {new Date().getFullYear()} Jatin Deswal. Designed for high-performance AI systems.
          </p>
        </div>

        {/* Center: Quick Section Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-400 hover:text-emerald-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors ml-2 p-1.5 rounded-lg bg-slate-900 border border-slate-800"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span className="text-[11px] font-mono">Top</span>
          </button>
        </div>

        {/* Right: Runtime Readout Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Vite + React + TS | Status: All Systems Operational</span>
        </div>
      </div>
    </footer>
  );
};
