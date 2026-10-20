import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle2, ShieldCheck, Sparkles, ExternalLink, Bookmark, Trophy, GraduationCap, Flame } from 'lucide-react';
import { CERTIFICATIONS, PERSONAL_DETAILS } from '../data/portfolioData';
import { soundManager } from '../utils/soundEffects';

export default function Certifications() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'AI & ML', 'Software Engineering', 'Data Science & AI', 'Hackathons & Innovation', 'Algorithms & DSA'];

  const filteredCerts = selectedCategory === 'All'
    ? CERTIFICATIONS
    : CERTIFICATIONS.filter((c) => c.category === selectedCategory);

  const handleCategoryChange = (cat) => {
    soundManager.playClick();
    setSelectedCategory(cat);
  };

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>INDUSTRY ACCREDITATION // VALIDATED CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight mb-4">
            Official <span className="text-gradient-cyan">Certifications & Honors</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Accredited certifications and technical distinctions from IBM, Microsoft, Infosys, AICTE/Edunet, GeeksforGeeks, and Mohan Babu University.
          </p>
        </div>

        {/* Highlights Banner: STEP Plus & Hackathon Winner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {PERSONAL_DETAILS.achievements.map((ach) => (
            <div
              key={ach.title}
              className="p-5 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-purple-950/20 border border-purple-500/30 backdrop-blur-xl flex items-start gap-4 shadow-lg hover:border-purple-400/60 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 flex-shrink-0">
                <Trophy className="w-6 h-6 text-amber-400" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold font-display text-white">
                    {ach.title}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[10px] font-mono text-amber-300 font-bold">
                    {ach.score}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {ach.description}
                </p>
                {ach.organization && (
                  <span className="text-[10px] font-mono text-purple-400 mt-1 uppercase">
                    Institution: {ach.organization}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span>{cat}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/10 text-slate-300">
                  {cat === 'All' ? CERTIFICATIONS.length : CERTIFICATIONS.filter(c => c.category === cat).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Certifications Card Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredCerts.map((cert) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                key={cert.id}
                onMouseEnter={() => soundManager.playChirp(700, 0.04, 'sine', 0.03)}
                className="group relative rounded-2xl p-6 bg-slate-900/50 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_10px_30px_-10px_rgba(56,189,248,0.25)] hover:-translate-y-1"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                    <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-cyan-300 uppercase font-semibold">
                      {cert.badgeType}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>VERIFIED</span>
                    </div>
                  </div>

                  {/* Title & Issuer */}
                  <h3 className="text-lg font-bold font-display text-white group-hover:text-cyan-300 transition-colors mb-2 leading-snug">
                    {cert.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono font-semibold text-purple-400">
                      {cert.issuer}
                    </span>
                    <span className="text-slate-500 text-xs">•</span>
                    <span className="text-xs font-mono text-slate-400">
                      {cert.authority}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {cert.highlight}
                  </p>
                </div>

                {/* Skills Tags */}
                <div>
                  <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded bg-slate-800/80 text-[10px] font-mono text-slate-300 border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Subtle corner sheen */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-white/[0.02] rounded-bl-3xl pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Education Callout Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-950/70 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-display">
                {PERSONAL_DETAILS.education.degree}
              </div>
              <div className="text-xs font-mono text-slate-400">
                {PERSONAL_DETAILS.education.institution} • {PERSONAL_DETAILS.education.duration}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-300">
              CGPA: {PERSONAL_DETAILS.education.cgpa}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {PERSONAL_DETAILS.education.specialization}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
