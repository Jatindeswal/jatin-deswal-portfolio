import { useState } from 'react';
import {
  BookOpen,
  Award,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import type { TimelineItem, TimelineType } from '../types/portfolio';

interface FilterOption {
  id: 'all' | TimelineType;
  label: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { id: 'all', label: 'All Milestones' },
  { id: 'research', label: 'Research' },
  { id: 'certification', label: 'Certifications' },
  { id: 'education', label: 'Education' },
];

export const TimelineSection = () => {
  const { timeline } = portfolioData;
  const [activeFilter, setActiveFilter] = useState<'all' | TimelineType>('all');

  const filteredItems = timeline.filter((item) =>
    activeFilter === 'all' ? true : item.type === activeFilter
  );

  const getTypeMetadata = (type: TimelineType) => {
    switch (type) {
      case 'research':
        return {
          icon: BookOpen,
          accentBorder: 'border-indigo-500/50',
          accentBg: 'bg-indigo-500/10',
          accentText: 'text-indigo-400',
          badgeBg: 'bg-indigo-950/60 text-indigo-300 border-indigo-800/60',
          nodeGlow: 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]',
        };
      case 'certification':
        return {
          icon: Award,
          accentBorder: 'border-cyan-500/50',
          accentBg: 'bg-cyan-500/10',
          accentText: 'text-cyan-400',
          badgeBg: 'bg-cyan-950/60 text-cyan-300 border-cyan-800/60',
          nodeGlow: 'bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]',
        };
      case 'education':
      default:
        return {
          icon: GraduationCap,
          accentBorder: 'border-slate-700',
          accentBg: 'bg-slate-800/30',
          accentText: 'text-slate-300',
          badgeBg: 'bg-slate-900 text-slate-300 border-slate-800',
          nodeGlow: 'bg-slate-400 shadow-[0_0_12px_rgba(148,163,184,0.4)]',
        };
    }
  };

  return (
    <section id="journey" className="scroll-mt-20 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 font-semibold tracking-wider uppercase">
            <span className="text-slate-500">// 03.</span>
            <span>MILESTONES &amp; CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Research, Experience &amp; Education
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            A chronological timeline of peer-reviewed paper submissions, networking certifications, and academic background.
          </p>
        </div>

        {/* Timeline Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md self-start md:self-auto">
          {FILTER_OPTIONS.map((option) => {
            const count =
              option.id === 'all'
                ? timeline.length
                : timeline.filter((t) => t.type === option.id).length;
            const isActive = activeFilter === option.id;

            return (
              <button
                key={option.id}
                onClick={() => setActiveFilter(option.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{option.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Vertical Spine Timeline */}
      <div className="relative pl-6 sm:pl-8 ml-2 sm:ml-4 border-l-2 border-slate-800 space-y-12">
        {filteredItems.map((item: TimelineItem) => {
          const meta = getTypeMetadata(item.type);
          const Icon = meta.icon;

          return (
            <div key={item.id} className="relative group">
              {/* Spine Node Indicator */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full border-2 border-slate-950 ${meta.nodeGlow} transition-transform group-hover:scale-125`}
              />

              {/* Card Container */}
              <div
                className={`rounded-2xl border border-slate-800 bg-slate-950/70 hover:bg-slate-900/60 p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-slate-700 hover:shadow-xl hover:shadow-black/40 space-y-4`}
              >
                {/* Card Top Meta Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-850 pb-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${meta.accentBg} ${meta.accentText}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                      {item.type}
                    </span>
                    {item.badge && (
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${meta.badgeBg}`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Period & Location */}
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.period}</span>
                    </div>
                    {item.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Title & Organization */}
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm font-mono text-emerald-400 font-medium">
                    {item.organization}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Key Achievements / Highlights */}
                {item.highlights && item.highlights.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500">
                      Key Highlights &amp; Metrics:
                    </h4>
                    <ul className="space-y-2 pl-1">
                      {item.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
                        >
                          <CheckCircle2 className={`w-4 h-4 ${meta.accentText} shrink-0 mt-0.5`} />
                          <span className="font-mono text-[12px] sm:text-xs leading-relaxed">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
