import { useEffect } from 'react';
import { X, ExternalLink, Cpu, Sparkles, Layers, ShieldCheck, CheckCircle2, FileText, Award } from 'lucide-react';
import type { Project } from '../types/portfolio';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  useEffect(() => {
    if (!project) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Handle Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 backdrop-blur-md bg-slate-950/85 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-black/80 flex flex-col text-slate-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-start justify-between p-6 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800">
          <div className="space-y-2 pr-6">
            <div className="flex flex-wrap items-center gap-2">
              {project.statusBadge && (
                <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium flex items-center gap-1.5 ${
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
                  className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-slate-900 text-slate-300 border border-slate-800"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2
              id="modal-project-title"
              className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
            >
              {project.title}
            </h2>
            <p className="text-sm sm:text-base font-mono text-emerald-400">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850 hover:border-slate-700 transition-all focus:outline-none"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Vynix Research Special Callout Banner */}
          {project.paperInfo && (
            <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-indigo-950/40 border border-emerald-500/30 shadow-[0_0_25px_rgba(16,185,129,0.1)]">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
                      Peer-Reviewed Research Submission
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-900/60 text-emerald-200 border border-emerald-700/50">
                      {project.paperInfo.conference}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug">
                    "{project.paperInfo.title}"
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    Status: <span className="text-emerald-300 font-medium">{project.paperInfo.status}</span> • Author: Jatin Deswal
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Signal Competition Callout Banner */}
          {project.competitionInfo && (
            <div className="p-5 rounded-xl bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-cyan-950/40 border border-indigo-500/30">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0 mt-0.5">
                  <Award className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-400">
                      Engineering Competition Entry
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {project.competitionInfo.name}
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    {project.competitionInfo.status}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Executive Overview */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              // Overview
            </h4>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Architecture & Pipeline Blueprint Container */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-white">SYSTEM ARCHITECTURE BLUEPRINT</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                MODULE SPECS
              </span>
            </div>

            {/* Problem Solved */}
            <div className="space-y-1.5">
              <h5 className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Problem Statement &amp; Motivation:</span>
              </h5>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-5">
                {project.architecture.problemSolved}
              </p>
            </div>

            {/* Pipeline Execution Flow */}
            <div className="space-y-1.5">
              <h5 className="text-xs font-mono text-indigo-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>End-to-End Execution Pipeline:</span>
              </h5>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-5 font-mono text-[12px] bg-slate-950/70 p-3.5 rounded-lg border border-slate-800/80">
                {project.architecture.pipelineDescription}
              </p>
            </div>

            {/* Key Innovations */}
            <div className="space-y-2">
              <h5 className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Key Engineering Innovations:</span>
              </h5>
              <ul className="space-y-2 pl-2">
                {project.architecture.keyInnovations.map((innovation, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{innovation}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* System Components Breakdown */}
            <div className="space-y-2.5">
              <h5 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                System Components Breakdown:
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.architecture.systemComponents.map((comp, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/90 space-y-1"
                  >
                    <span className="text-xs font-mono font-semibold text-emerald-300">
                      {comp.name}
                    </span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {comp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Metrics Preview (if available) */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center font-mono"
                >
                  <div className="text-lg font-bold text-white">{m.value}</div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Full Tech Stack Matrix */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              // Tech Stack &amp; Dependencies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 z-20 flex flex-wrap items-center justify-between gap-3 p-6 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-200 hover:text-white transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Code (GitHub)</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-semibold hover:bg-emerald-400 transition-all"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
