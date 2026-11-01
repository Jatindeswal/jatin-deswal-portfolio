import { useState } from 'react';
import {
  Mail,
  Copy,
  Check,
  Send,
  MapPin,
  Clock,
  Sparkles,
  FileText,
  ExternalLink
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

const OPPORTUNITY_TYPES = [
  'Grad Role / Hiring',
  'AI & CV Research',
  'Project Collaboration',
  'General Inquiry',
];

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactSection = () => {
  const { profile } = portfolioData;
  const [copied, setCopied] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [opportunityType, setOpportunityType] = useState('Grad Role / Hiring');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'success'>('idle');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = 'Please provide your name (min 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!message.trim() || message.trim().length < 15) {
      newErrors.message = 'Please provide a message with at least 15 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setStatus('transmitting');

    // Simulate terminal transmission & generate mailto link fallback
    setTimeout(() => {
      setStatus('success');

      // Pre-filled mailto fallback trigger
      const mailtoSubject = encodeURIComponent(`[${opportunityType}] Contact from ${name}`);
      const mailtoBody = encodeURIComponent(
        `Hi Jatin,\n\n${message}\n\nFrom:\nName: ${name}\nEmail: ${email}\nOpportunity: ${opportunityType}`
      );
      window.location.href = `mailto:${profile.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    }, 1200);
  };

  return (
    <section id="contact" className="scroll-mt-20 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
      {/* Section Header */}
      <div className="space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold tracking-wider uppercase">
          <span className="text-slate-500">// 04.</span>
          <span>INITIATE HANDSHAKE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Get in Touch &amp; Collaborate
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
          Actively exploring 2027 Full-Time AI &amp; Full-Stack Engineering roles, multimodal vision-language research collaborations, and high-impact systems engineering projects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Channels & Quick Copy */}
        <div className="lg:col-span-5 space-y-6">
          {/* Terminal-Styled Status Readout Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-7 backdrop-blur-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 font-mono text-xs">
              <span className="text-slate-400 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                AVAILABILITY_DAEMON
              </span>
              <span className="text-emerald-400 font-semibold">2027_GRAD_ACTIVE</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-[11px]">LOCATION BASE:</span>
                  <span className="text-slate-100 font-medium">{profile.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300">
                <Clock className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-[11px]">RESPONSE SLA:</span>
                  <span className="text-slate-100 font-medium">&lt; 24 Hours for Recruiter &amp; Research Queries</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-[11px]">PRIMARY DOMAINS:</span>
                  <span className="text-slate-100 font-medium">Vision-Language, Local Agents, Full-Stack &amp; CCNA</span>
                </div>
              </div>
            </div>

            {/* One-Click Copy Email Pill */}
            <div className="pt-2">
              <span className="text-[11px] font-mono text-slate-500 block mb-2">DIRECT EMAIL ADDRESS:</span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 text-xs font-mono text-slate-200 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-slate-100">{profile.email}</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] group-hover:border-emerald-500/40">
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-400">Copy</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={profile.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-slate-300 hover:text-white transition-all group"
            >
              <GithubIcon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
              <div>
                <span className="text-xs font-semibold block text-white">GitHub</span>
                <span className="text-[11px] font-mono text-slate-400">@jatindeswal</span>
              </div>
            </a>

            <a
              href={profile.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-slate-300 hover:text-white transition-all group"
            >
              <LinkedinIcon className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
              <div>
                <span className="text-xs font-semibold block text-white">LinkedIn</span>
                <span className="text-[11px] font-mono text-slate-400">/in/jatindeswal</span>
              </div>
            </a>
          </div>

          {/* View Official Resume (PDF) Card */}
          <a
            href={profile.resumeUrl || '/Jatin_Deswal_Resume.pdf'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-850 text-slate-300 hover:text-white transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold block text-white">Official Curriculum Vitae</span>
                <span className="text-[11px] font-mono text-slate-400">Jatin_Deswal_Resume.pdf</span>
              </div>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-medium group-hover:underline flex items-center gap-1">
              <span>View PDF</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </a>
        </div>

        {/* Right Column: Validated Interactive Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-1">
              Send a Transmission
            </h3>
            <p className="text-xs text-slate-400 font-mono mb-6">
              Complete the dispatch form below to start a direct thread.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Opportunity Type Pills */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 block">
                  OPPORTUNITY / REASON FOR CONTACT:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {OPPORTUNITY_TYPES.map((type) => {
                    const isSelected = opportunityType === type;
                    return (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setOpportunityType(type)}
                        className={`px-3 py-2 rounded-xl text-xs font-mono transition-all text-center ${
                          isSelected
                            ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                            : 'bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-mono text-slate-300 flex items-center justify-between">
                    <span>NAME:</span>
                    {errors.name && <span className="text-rose-400 text-[10px]">{errors.name}</span>}
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="e.g. Alex Mercer"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none transition-all ${
                      errors.name
                        ? 'border-rose-500/80 focus:ring-1 focus:ring-rose-500'
                        : 'border-slate-800 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30'
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-mono text-slate-300 flex items-center justify-between">
                    <span>EMAIL:</span>
                    {errors.email && <span className="text-rose-400 text-[10px]">{errors.email}</span>}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="e.g. alex@company.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none transition-all ${
                      errors.email
                        ? 'border-rose-500/80 focus:ring-1 focus:ring-rose-500'
                        : 'border-slate-800 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30'
                    }`}
                  />
                </div>
              </div>

              {/* Message Area */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-mono text-slate-300 flex items-center justify-between">
                  <span>TRANSMISSION MESSAGE:</span>
                  {errors.message && <span className="text-rose-400 text-[10px]">{errors.message}</span>}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  placeholder="Describe role requirements, research scope, or technical questions..."
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none transition-all resize-none ${
                    errors.message
                      ? 'border-rose-500/80 focus:ring-1 focus:ring-rose-500'
                      : 'border-slate-800 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30'
                  }`}
                />
              </div>

              {/* Submit Button & Terminal Feedback */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'transmitting'}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-60 shadow-lg shadow-emerald-500/20"
                >
                  {status === 'transmitting' ? (
                    <>
                      <span className="h-3 w-3 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                      <span>Transmitting Packet...</span>
                    </>
                  ) : status === 'success' ? (
                    <>
                      <Check className="w-4 h-4 text-slate-950" />
                      <span>Transmission Received — Launching Mail Client</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct Transmission</span>
                    </>
                  )}
                </button>
              </div>

              {/* Status Note */}
              {status === 'success' && (
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-xs font-mono text-emerald-300 flex items-center gap-2 animate-in fade-in duration-200">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Your default email client has been prepared with your message!</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
