import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Atom, Cpu, Sparkles, Layers, Terminal, CheckCircle2, ArrowUpRight, Flame } from 'lucide-react';
import { TECH_ELEMENTS } from '../data/portfolioData';
import { soundManager } from '../utils/soundEffects';

export default function PeriodicTable() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeElement, setActiveElement] = useState(TECH_ELEMENTS[0]);

  const categories = ['All', 'Languages', 'AI / ML', 'Backend & Cloud', 'Frameworks'];

  const filteredElements = selectedCategory === 'All'
    ? TECH_ELEMENTS
    : TECH_ELEMENTS.filter((el) => el.category === selectedCategory);

  const handleSelectElement = (el) => {
    soundManager.playClick();
    setActiveElement(el);
  };

  const handleCategoryChange = (cat) => {
    soundManager.playClick();
    setSelectedCategory(cat);
  };

  // Color mapping per category
  const getCategoryTheme = (cat) => {
    switch (cat) {
      case 'Languages':
        return {
          border: 'border-cyan-500/40 hover:border-cyan-400',
          text: 'text-cyan-400',
          bg: 'bg-cyan-500/10',
          badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
        };
      case 'AI / ML':
        return {
          border: 'border-purple-500/40 hover:border-purple-400',
          text: 'text-purple-400',
          bg: 'bg-purple-500/10',
          badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40'
        };
      case 'Backend & Cloud':
        return {
          border: 'border-emerald-500/40 hover:border-emerald-400',
          text: 'text-emerald-400',
          bg: 'bg-emerald-500/10',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
        };
      case 'Frameworks':
        return {
          border: 'border-blue-500/40 hover:border-blue-400',
          text: 'text-blue-400',
          bg: 'bg-blue-500/10',
          badge: 'bg-blue-500/20 text-blue-300 border-blue-500/40'
        };
      default:
        return {
          border: 'border-slate-700 hover:border-slate-500',
          text: 'text-slate-300',
          bg: 'bg-slate-800/40',
          badge: 'bg-slate-700/50 text-slate-300 border-slate-600'
        };
    }
  };

  return (
    <section id="stack" className="py-24 relative overflow-hidden">
      {/* Background radial accent glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono tracking-widest uppercase mb-4">
            <Atom className="w-3.5 h-3.5" />
            <span>MOLECULAR ARCHITECTURE // TECH MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight mb-4">
            The <span className="text-gradient-purple">Periodic Table</span> of My Stack
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Engineered building blocks synthesized across compiler ASTs, cognitive multi-agent graphs, and low-latency cloud runtimes.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-purple-600/20 border-purple-400 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span>{cat}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/10 text-slate-300">
                  {cat === 'All' ? TECH_ELEMENTS.length : TECH_ELEMENTS.filter(e => e.category === cat).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid & Dynamic Inspector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Chemical Element Grid */}
          <div className="lg:col-span-7">
            <motion.div
              layout
              className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4"
            >
              <AnimatePresence>
                {filteredElements.map((el) => {
                  const isSelected = activeElement.symbol === el.symbol;
                  const theme = getCategoryTheme(el.category);

                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      key={el.symbol}
                      onMouseEnter={() => handleSelectElement(el)}
                      onClick={() => handleSelectElement(el)}
                      className={`relative aspect-square p-3 rounded-2xl cursor-pointer border backdrop-blur-xl transition-all duration-300 flex flex-col justify-between ${
                        isSelected
                          ? `bg-slate-900/95 border-cyan-400 shadow-[0_0_25px_rgba(56,189,248,0.35)] scale-105 z-10`
                          : `bg-slate-900/50 ${theme.border} hover:bg-slate-900/80 hover:scale-[1.02]`
                      }`}
                    >
                      {/* Top Row: Atomic # and Category Dot */}
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold text-slate-400">
                          #{el.number}
                        </span>
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: el.color }}
                          title={el.category}
                        />
                      </div>

                      {/* Chemical Symbol */}
                      <div className="text-center my-auto">
                        <span
                          className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight"
                          style={{ color: el.color }}
                        >
                          {el.symbol}
                        </span>
                      </div>

                      {/* Element Name & Category */}
                      <div className="text-center">
                        <div className="text-xs font-semibold text-slate-200 truncate">
                          {el.name}
                        </div>
                        <div className="text-[9px] font-mono text-slate-400 truncate uppercase mt-0.5">
                          {el.category}
                        </div>
                      </div>

                      {/* Corner subtle sheen */}
                      <div className="absolute top-0 right-0 w-8 h-8 bg-white/[0.03] rounded-bl-full pointer-events-none" />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* Micro Helper Note */}
            <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-400 px-2">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Hover or click any element tile to inspect telemetry
              </span>
              <span>12 TOTAL SYNTHESIZED ELEMENTS</span>
            </div>
          </div>

          {/* Right: Dynamic Element Inspector Panel */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 rounded-3xl p-1 bg-gradient-to-b from-purple-500/30 via-slate-800 to-cyan-500/30 shadow-2xl backdrop-blur-2xl">
              <div className="rounded-[22px] bg-[#0c0d12]/95 border border-white/10 p-6 sm:p-7">
                
                {/* Panel Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
                    <Cpu className="w-4 h-4 animate-pulse" />
                    <span className="font-bold tracking-widest uppercase">ELEMENT INSPECTOR</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
                    ATOMIC ID #{activeElement.number}
                  </span>
                </div>

                {/* Big Element Identity Block */}
                <div className="flex items-start gap-5 mb-6">
                  <div
                    className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center border shadow-lg flex-shrink-0"
                    style={{
                      borderColor: activeElement.color,
                      backgroundColor: activeElement.accentBg,
                    }}
                  >
                    <span
                      className="text-3xl font-extrabold font-display"
                      style={{ color: activeElement.color }}
                    >
                      {activeElement.symbol}
                    </span>
                    <span className="text-[10px] font-mono text-slate-300 font-semibold">
                      #{activeElement.number}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-2xl font-bold font-display text-white mb-1">
                      {activeElement.name}
                    </h3>
                    <div className="inline-flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-white/10 border border-white/10 text-cyan-300">
                        {activeElement.category}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {activeElement.years} Active
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium">
                      "{activeElement.tagline}"
                    </p>
                  </div>
                </div>

                {/* Proficiency Meter */}
                <div className="mb-6 p-4 rounded-2xl bg-slate-900/70 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">PROFICIENCY GRADE</span>
                    <span className="text-cyan-400 font-bold">{activeElement.proficiency}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-white/10">
                    <div
                      className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
                      style={{
                        width: activeElement.proficiency.includes('98%') ? '98%' :
                               activeElement.proficiency.includes('95%') ? '95%' :
                               activeElement.proficiency.includes('94%') ? '94%' :
                               activeElement.proficiency.includes('93%') ? '93%' :
                               activeElement.proficiency.includes('92%') ? '92%' :
                               activeElement.proficiency.includes('91%') ? '91%' :
                               activeElement.proficiency.includes('90%') ? '90%' :
                               activeElement.proficiency.includes('89%') ? '89%' :
                               activeElement.proficiency.includes('88%') ? '88%' :
                               activeElement.proficiency.includes('86%') ? '86%' : '85%'
                      }}
                    />
                  </div>
                </div>

                {/* Direct Reference to Where It Was Deployed (User Requirement) */}
                <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-purple-950/30 to-slate-900/50 border border-cyan-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 uppercase">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>WHERE DEPLOYED (DIRECT REFERENCE)</span>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    {activeElement.deployedIn}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {activeElement.description}
                  </p>
                </div>

                {/* Technical Architecture Footnote */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Validated in Production & Thesis
                  </span>
                  <a
                    href="#projects"
                    onClick={() => soundManager.playClick()}
                    className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    View Project <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
