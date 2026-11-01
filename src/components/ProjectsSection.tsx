import { useState } from 'react';
import {
  ArrowRight,
  Cpu,
  FileText,
  Award
} from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { ProjectModal } from './ProjectModal';
import type { Project, ProjectCategory } from '../types/portfolio';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

interface FilterTab {
  id: ProjectCategory;
  label: string;
}

const FILTER_TABS: FilterTab[] = [
  { id: 'all', label: 'All' },
  { id: 'ai-ml', label: 'AI & Vision' },
  { id: 'systems', label: 'Systems & Network' },
  { id: 'web-cloud', label: 'Web & Cloud' },
  { id: 'mobile', label: 'Mobile' },
];

export const ProjectsSection = () => {
  const { projects } = portfolioData;
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter((project) =>
    activeCategory === 'all' ? true : project.category.includes(activeCategory)
  );

  const getCategoryCount = (catId: ProjectCategory) => {
    if (catId === 'all') return projects.length;
    return projects.filter((p) => p.category.includes(catId)).length;
  };

  // Determine Bento column span for aesthetic asymmetry
  const getBentoSpanClass = (project: Project, isAllFilter: boolean) => {
    if (!isAllFilter) return 'col-span-1';

    if (project.id === 'vynix') return 'lg:col-span-2';
    if (project.id === 'hivecore') return 'lg:col-span-2';
    if (project.id === 'signal') return 'md:col-span-2 lg:col-span-3';
    return 'lg:col-span-1';
  };

  return (
    <section id="projects" className="scroll-mt-20 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold tracking-wider uppercase">
            <span className="text-slate-500">// 01.</span>
            <span>SYSTEMS &amp; RESEARCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Engineering &amp; Research
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            A curated portfolio spanning few-shot vision-language architectures, local-first agent runtimes, real-time packet observability probes, and enterprise CRM solutions.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md self-start md:self-auto">
          {FILTER_TABS.map((tab) => {
            const count = getCategoryCount(tab.id);
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{tab.label}</span>
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

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const isAll = activeCategory === 'all';
          const spanClass = getBentoSpanClass(project, isAll);
          const isFlagship = project.id === 'vynix' || project.id === 'hivecore';

          return (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`group relative rounded-2xl border border-slate-800 bg-slate-950/70 hover:bg-slate-900/60 p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-slate-700 hover:shadow-2xl hover:shadow-emerald-950/20 flex flex-col justify-between cursor-pointer ${spanClass}`}
            >
              {/* Subtle ambient gradient overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="relative space-y-4">
                {/* Top Badges & Status */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.statusBadge && (
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium ${
                        project.statusBadge.includes('Concept')
                          ? 'bg-amber-950/60 text-amber-300 border border-amber-800/60'
                          : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          project.statusBadge.includes('Concept') ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'
                        }`} />
                        {project.statusBadge}
                      </span>
                    )}
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-900 text-slate-400 border border-slate-800/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Icon indicators */}
                  <div className="flex items-center gap-2">
                    {project.paperInfo && (
                      <span title="Peer-reviewed research paper submission" className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                        <FileText className="w-3.5 h-3.5" />
                      </span>
                    )}
                    {project.competitionInfo && (
                      <span title="Competition entry" className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                        <Award className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {project.title}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs sm:text-sm font-mono text-emerald-400">
                    {project.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Extra Architectural Snippet for Flagship Cards */}
                {isFlagship && isAll && (
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs font-mono space-y-1.5">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                      <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="font-semibold text-slate-300">CORE PIPELINE HIGHLIGHT:</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed line-clamp-2">
                      {project.architecture.pipelineDescription}
                    </p>
                  </div>
                )}

                {/* Metric Readout Pills */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1 font-mono">
                    {project.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800/80 text-[11px]"
                      >
                        <span className="text-slate-500 mr-1.5">{m.label}:</span>
                        <span className="text-slate-200 font-semibold">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer: Tech Stack & Actions */}
              <div className="relative pt-6 mt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 text-slate-400 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-500 bg-slate-900/40">
                      +{project.stack.length - 4}
                    </span>
                  )}
                </div>

                {/* Action Links with e.stopPropagation() */}
                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-all"
                      aria-label={`${project.title} GitHub Source`}
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <span className="text-xs font-mono font-medium text-emerald-400 flex items-center gap-1 group-hover:underline">
                    Inspect Blueprint
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Architecture Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
