import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Download, Mail, ExternalLink, GraduationCap, Briefcase, Award, Code, CheckCircle, Copy } from 'lucide-react';
import { PERSONAL_DETAILS, CERTIFICATIONS, PROJECTS } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';
import { soundManager } from '../utils/soundEffects';

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    soundManager.playSuccess();
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#0d0e14] border border-cyan-500/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden z-10"
        >
          {/* Modal Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
                OFFICIAL RESUME DOSSIER // SAI DARSINI SATHULURU
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-1.5 transition-colors shadow-sm"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                className="p-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-colors"
                title="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Resume Document Body */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-8 print:p-0 print:space-y-4 font-sans text-slate-200">
            
            {/* Resume Top Contact Banner */}
            <div className="border-b border-white/10 pb-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight mb-2">
                SAI DARSINI SATHULURU
              </h1>
              <div className="text-xs sm:text-sm font-mono text-cyan-400 mb-3 font-semibold">
                AI Systems Architect & Core Systems Engineer
              </div>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-slate-300">
                <a
                  href={`mailto:${PERSONAL_DETAILS.email}`}
                  className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{PERSONAL_DETAILS.email}</span>
                </a>
                <span className="text-slate-600">•</span>
                <a
                  href={PERSONAL_DETAILS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-purple-300 transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-purple-400" />
                  <span>LinkedIn Profile</span>
                </a>
                <span className="text-slate-600">•</span>
                <a
                  href={PERSONAL_DETAILS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-slate-300" />
                  <span>github.com/saidarsini</span>
                </a>
                <span className="text-slate-600">•</span>
                <a
                  href={PERSONAL_DETAILS.archivePortfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Portfolio Archive</span>
                </a>
              </div>
            </div>

            {/* Summary */}
            <section className="space-y-2">
              <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Dedicated BTech student in Computer Science and Engineering (Data Science) with strong foundations in Python, Java, AI/ML, cloud technologies, and full-stack development. Experience includes building NLP platforms, cloud-native generative AI applications, and predictive machine learning pipelines. Familiar with DBMS, Database Design, Software Testing, Software Debugging, CI/CD, and System Design. Available for onsite internship opportunities in Bangalore during the required internship window.
              </p>
            </section>

            {/* Education */}
            <section className="space-y-2">
              <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                EDUCATION
              </h2>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-base font-bold text-white">
                    {PERSONAL_DETAILS.education.degree}
                  </div>
                  <div className="text-xs font-mono text-purple-400">
                    {PERSONAL_DETAILS.education.institution}
                  </div>
                </div>
                <div className="text-right sm:text-right">
                  <div className="text-xs font-mono text-emerald-400 font-bold">
                    CGPA: {PERSONAL_DETAILS.education.cgpa} (Distinction)
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    {PERSONAL_DETAILS.education.duration}
                  </div>
                </div>
              </div>
            </section>

            {/* Technical Experience */}
            <section className="space-y-2">
              <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                EXPERIENCE
              </h2>
              {PERSONAL_DETAILS.experience.map((exp) => (
                <div key={exp.role} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <span className="text-sm font-bold text-white">{exp.role}</span>
                    <span className="text-xs font-mono text-cyan-400">{exp.period}</span>
                  </div>
                  <div className="text-xs font-mono text-slate-400">{exp.organization}</div>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </section>

            {/* Projects */}
            <section className="space-y-3">
              <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                KEY TECHNICAL PROJECTS
              </h2>
              <div className="space-y-3">
                {PROJECTS.map((proj) => (
                  <div key={proj.id} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="text-sm font-bold text-white">{proj.title}</div>
                      <div className="text-xs font-mono text-slate-400">{proj.category}</div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {proj.summary}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-cyan-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Verified Certifications */}
            <section className="space-y-3">
              <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                ACCREDITED CERTIFICATIONS ({CERTIFICATIONS.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CERTIFICATIONS.map((cert) => (
                  <div key={cert.id} className="p-3 rounded-lg bg-slate-900/50 border border-white/5 text-xs">
                    <div className="font-semibold text-slate-100 mb-0.5">{cert.title}</div>
                    <div className="text-[11px] font-mono text-cyan-400">{cert.issuer} • {cert.authority}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Achievements */}
            <section className="space-y-2">
              <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                HONORS & ACHIEVEMENTS
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PERSONAL_DETAILS.achievements.map((ach) => (
                  <div key={ach.title} className="p-3 rounded-lg bg-slate-900/50 border border-purple-500/20 text-xs">
                    <div className="font-bold text-white">{ach.title} — <span className="text-amber-400">{ach.score}</span></div>
                    <div className="text-[11px] text-slate-300 mt-1">{ach.description}</div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Modal Footer */}
          <div className="px-6 py-3 bg-slate-950 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400 flex-shrink-0">
            <span>Sai Darsini Sathuluru • Mohan Babu University (Data Science)</span>
            <button
              type="button"
              onClick={handlePrint}
              className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dossier</span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
