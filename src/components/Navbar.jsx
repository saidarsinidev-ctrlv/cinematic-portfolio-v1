import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Terminal, Shield, ExternalLink, Menu, X, Cpu, Sparkles, FileText } from 'lucide-react';
import { PERSONAL_DETAILS } from '../data/portfolioData';
import { soundManager } from '../utils/soundEffects';

export default function Navbar({ soundEnabled, setSoundEnabled, onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundManager.setMuted(!nextState);
  };

  const navLinks = [
    { label: 'About', href: '#hero' },
    { label: 'ID Card', href: '#id-badge' },
    { label: 'Stack', href: '#stack' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certs', href: '#certifications' },
    { label: 'CLI', href: '#terminal' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08080a]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Monogram / Brand Logo */}
        <a
          href="#hero"
          onClick={() => soundManager.playClick()}
          className="group flex items-center gap-3 cursor-pointer"
        >
          <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 via-slate-900 to-purple-600/30 border border-cyan-500/40 flex items-center justify-center font-display font-bold text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.5)] transition-all">
            <span className="tracking-tighter text-sm font-mono">[SD]</span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-75"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-bold tracking-wider uppercase text-slate-100 group-hover:text-cyan-400 transition-colors">
              {PERSONAL_DETAILS.shortName}
            </span>
            <span className="text-[10px] font-mono text-cyan-400/80 tracking-widest uppercase">
              AI ARCHITECT // LEVEL 04
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 rounded-full px-4 py-1.5 bg-slate-900/60 border border-white/10 backdrop-blur-xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => soundManager.playClick()}
              className="px-3 py-1 text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-full transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Resume Modal Trigger Button */}
          <button
            type="button"
            onClick={() => {
              soundManager.playSuccess();
              if (onOpenResume) onOpenResume();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/40 hover:border-purple-400 text-purple-200 hover:text-white text-xs font-mono transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]"
            title="Open Complete Resume Dossier"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold">Resume</span>
          </button>

          {/* Audio Visualizer / Sound Toggle Button */}
          <button
            type="button"
            onClick={handleSoundToggle}
            className={`relative flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
              soundEnabled
                ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                : 'bg-slate-900/70 border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500'
            }`}
            title={soundEnabled ? 'Mute Audio Atmosphere' : 'Enable Cyber Audio Atmosphere'}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-3 bg-cyan-400 animate-pulse" style={{ animationDuration: '0.6s' }}></span>
                  <span className="w-0.5 h-1.5 bg-cyan-400 animate-pulse" style={{ animationDuration: '0.9s' }}></span>
                  <span className="w-0.5 h-2.5 bg-cyan-400 animate-pulse" style={{ animationDuration: '0.4s' }}></span>
                </div>
                <span className="hidden lg:inline text-[11px] font-mono">AUDIO ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden lg:inline text-[11px] font-mono">AUDIO OFF</span>
              </>
            )}
          </button>

          {/* Archive Portfolio Link */}
          <a
            href={PERSONAL_DETAILS.archivePortfolio}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playClick()}
            className="hidden xl:flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-purple-400 px-2.5 py-1.5 rounded-lg hover:bg-purple-500/10 transition-colors"
            title="View Archive Portfolio (v2)"
          >
            <span className="text-[11px]">v2 Archive</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-4 pb-6 mt-2 bg-[#0d0e12]/95 border-b border-white/10 backdrop-blur-2xl flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                setMobileMenuOpen(false);
                soundManager.playClick();
              }}
              className="px-3 py-2 text-sm font-mono uppercase tracking-wider text-slate-200 hover:text-cyan-400 rounded-lg hover:bg-white/5 transition-all"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              if (onOpenResume) onOpenResume();
            }}
            className="px-3 py-2 text-sm font-mono text-cyan-300 flex items-center justify-between border border-cyan-500/30 rounded-lg bg-cyan-950/30"
          >
            <span>View Resume Dossier</span>
            <FileText className="w-4 h-4 text-cyan-400" />
          </button>
          <a
            href={PERSONAL_DETAILS.archivePortfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 text-xs font-mono text-purple-400 flex items-center justify-between"
          >
            <span>Old Portfolio Archive (v2)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </header>
  );
}
