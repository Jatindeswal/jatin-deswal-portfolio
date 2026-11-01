import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { TimelineSection } from './components/TimelineSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Analytics } from '@vercel/analytics/react';

export function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-300 relative overflow-x-hidden font-sans">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative">
        {/* Stage 2: Hero Section */}
        <Hero />

        {/* Stage 3: Bento Grid Projects */}
        <ProjectsSection />

        {/* Stage 4: Skills Matrix */}
        <SkillsSection />

        {/* Stage 5: Journey / Experience & Education Timeline */}
        <TimelineSection />

        {/* Stage 6: Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}

export default App;
