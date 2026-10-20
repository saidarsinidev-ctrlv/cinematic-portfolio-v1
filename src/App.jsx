import React, { useState } from 'react';
import BackgroundCanvas from './components/BackgroundCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DeveloperCard from './components/DeveloperCard';
import PeriodicTable from './components/PeriodicTable';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import TerminalFooter from './components/TerminalFooter';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#08080a] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Three.js 3D Interactive WebGL Dark Stage Background */}
      <BackgroundCanvas />

      {/* Top Navbar */}
      <Navbar
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Flow */}
      <main className="relative z-10 flex flex-col">
        {/* Section 1: Cinematic Hero with Walking Avatar / Glassmorphic Fallback */}
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Section 2: Interactive Holographic 3D Developer ID Badge */}
        <DeveloperCard />

        {/* Section 3: The Periodic Table of My Stack */}
        <PeriodicTable />

        {/* Section 4: Selected Works & Flagship Architectures */}
        <Projects />

        {/* Section 5: Official Certifications & Honors */}
        <Certifications />
      </main>

      {/* Section 6: Interactive Terminal Footer & Contact Dispatch */}
      <TerminalFooter />

      {/* Interactive Complete Resume Dossier Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
