import { useState } from 'react';
import {
  ArrowRight,
  Mail,
  Award,
  Network,
  Cpu,
  Copy,
  Check,
  FileText
} from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

type TerminalTab = 'whoami' | 'research.json' | 'stack.sh';

export const Hero = () => {
  const { profile } = portfolioData;
  const [activeTab, setActiveTab] = useState<TerminalTab>('whoami');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Ambient background radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[350px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Background subtle grid pattern */}
      <div
        className="absolute inset-0 -z-20 opacity-20"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Bio & Primary CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Status Badge: ICRITO 2027 Paper Submission */}
            <a
              href="#projects"
              className="group inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 hover:border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono text-emerald-300">
                Research Paper Submitted: <span className="text-slate-100 font-semibold underline decoration-emerald-500/60 underline-offset-2">ICRITO 2027</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Name & Title */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Hi, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">
                  {profile.name}
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-mono text-emerald-400 font-medium">
                {profile.role}
              </p>
            </div>

            {/* Bio Summary */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              {profile.bioSummary}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 text-slate-950 font-semibold text-sm hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all group"
              >
                <span>Explore Architecture & Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 font-medium text-sm transition-all"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Get in Touch</span>
              </a>

              <a
                href={profile.resumeUrl || '/Jatin_Deswal_Resume.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 font-medium text-sm transition-all hover:text-white"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Resume</span>
              </a>

              {/* GitHub & LinkedIn Icon buttons */}
              <div className="flex items-center gap-2 pl-1">
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-all"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Metric & Highlight Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 w-full max-w-xl">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Award className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white">ICRITO '27</span>
                  <span className="text-[11px] font-mono text-slate-400">Research Author</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Network className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white">CCNA Certified</span>
                  <span className="text-[11px] font-mono text-slate-400">Cisco Networking</span>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white">5+ Systems</span>
                  <span className="text-[11px] font-mono text-slate-400">AI & Production</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive macOS/Linux Terminal Card */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/85 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden transition-all duration-300 hover:border-slate-700/80">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800 select-none">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80 border border-rose-600/60" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80 border border-amber-600/60" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80 border border-emerald-600/60" />
                  <span className="ml-2 text-xs font-mono text-slate-400 font-medium">
                    jatin@deswal.me:~
                  </span>
                </div>

                {/* Status indicator */}
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/50 text-[10px] font-mono text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ONLINE</span>
                </div>
              </div>

              {/* Terminal Tabs */}
              <div className="flex items-center bg-slate-900/40 border-b border-slate-800/80 px-2 pt-1 gap-1">
                {(['whoami', 'research.json', 'stack.sh'] as TerminalTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 text-xs font-mono rounded-t-lg transition-all ${
                      activeTab === tab
                        ? 'bg-slate-950 text-emerald-400 border-t-2 border-emerald-500 font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Terminal Body Content */}
              <div className="p-5 font-mono text-xs leading-relaxed text-slate-300 min-h-[300px] overflow-x-auto bg-slate-950/60">
                {activeTab === 'whoami' && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <div>
                      <span className="text-emerald-400">$</span>{' '}
                      <span className="text-slate-100">whoami --profile --verbose</span>
                    </div>

                    {/* Responsive Flex Header with Profile Photo & Identity */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-4 mb-4 border-b border-slate-800/80">
                      {/* Photo Container */}
                      <div className="relative shrink-0">
                        <img
                          src="/Jatin.png"
                          alt="Jatin Deswal"
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover object-top border border-slate-700/80 ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-950/50 shrink-0"
                        />
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-slate-950 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                      </div>

                      {/* Primary Identity Key-Values */}
                      <div className="space-y-1.5 text-slate-300">
                        <p>
                          <span className="text-slate-500">engineer:</span>{' '}
                          <span className="text-emerald-300 font-medium">Jatin Deswal</span>
                        </p>
                        <p>
                          <span className="text-slate-500">role:</span>{' '}
                          <span className="text-slate-200">AI &amp; Full-Stack Engineer</span>
                        </p>
                        <p>
                          <span className="text-slate-500">location:</span>{' '}
                          <span className="text-slate-200">Noida, Uttar Pradesh, India</span>
                        </p>
                      </div>
                    </div>

                    {/* Remaining Verbose Details Below Divider */}
                    <div className="space-y-1.5 pl-2 text-slate-300">
                      <p>
                        <span className="text-slate-500">education:</span>{' '}
                        <span className="text-slate-200">B.Tech CSE @ Amity University (2023-2027)</span>
                      </p>
                      <p>
                        <span className="text-slate-500">specialization:</span>{' '}
                        <span className="text-indigo-300">Vision-Language Models &amp; Local Agents</span>
                      </p>
                      <p>
                        <span className="text-slate-500">certification:</span>{' '}
                        <span className="text-cyan-300">Cisco CCNA (Network Associate)</span>
                      </p>
                      <p>
                        <span className="text-slate-500">availability:</span>{' '}
                        <span className="text-emerald-400 font-semibold">Immediate for 2027 Grad Roles</span>
                      </p>
                    </div>
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-850 border border-slate-800 text-[11px] text-slate-300 hover:text-emerald-400 transition-colors"
                      >
                        {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copied ? 'Copied to clipboard' : `Copy ${profile.email}`}</span>
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'research.json' && (
                  <div className="space-y-2 animate-in fade-in duration-150">
                    <div>
                      <span className="text-emerald-400">$</span>{' '}
                      <span className="text-slate-100">cat ./research/icrito2027_vynix.json</span>
                    </div>
                    <pre className="text-slate-300 pl-2 text-[11px]">
                      <code>{`{
  "project": "Vynix",
  "paper": "Few-Shot HOI Detection via VLMs",
  "venue": "IEEE ICRITO 2027",
  "submission_status": "UNDER_REVIEW",
  "architecture": {
    "detection_backbone": "YOLOv8",
    "feature_encoder": "Frozen CLIP ViT-B/16",
    "spatial_logic": "Sparse Distance Logic Gates",
    "exemplar_head": "Non-Parametric Cosine Memory"
  },
  "few_shot_regime": "1 to 5 shots",
  "code": "https://github.com/jatindeswal/vynix-hoi"
}`}</code>
                    </pre>
                  </div>
                )}

                {activeTab === 'stack.sh' && (
                  <div className="space-y-2 animate-in fade-in duration-150">
                    <div>
                      <span className="text-emerald-400">$</span>{' '}
                      <span className="text-slate-100">./scripts/load_active_stack.sh</span>
                    </div>
                    <div className="space-y-1 pl-2 text-[11px]">
                      <p className="text-slate-500"># Core AI &amp; Vision Pipelines</p>
                      <p>
                        <span className="text-indigo-400">export</span>{' '}
                        <span className="text-slate-200">AI_STACK="PyTorch YOLOv8 CLIP LangGraph LiteLLM"</span>
                      </p>
                      <p className="text-slate-500 pt-1"># Systems &amp; Low-Level Observability</p>
                      <p>
                        <span className="text-indigo-400">export</span>{' '}
                        <span className="text-slate-200">SYS_STACK="Scapy CCNA-Networking Linux Docker C++"</span>
                      </p>
                      <p className="text-slate-500 pt-1"># Production Web &amp; Enterprise UI</p>
                      <p>
                        <span className="text-indigo-400">export</span>{' '}
                        <span className="text-slate-200">WEB_STACK="React TypeScript TailwindCSS Salesforce-LWC"</span>
                      </p>
                      <p className="text-emerald-400 pt-2">[✓] Environment initialized successfully.</p>
                    </div>
                  </div>
                )}

                {/* Active prompt blinking cursor */}
                <div className="pt-4 flex items-center gap-1.5 text-slate-500">
                  <span className="text-emerald-400">&gt;</span>
                  <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
