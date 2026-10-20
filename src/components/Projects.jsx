import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Terminal, ExternalLink, ChevronRight, Cpu, ArrowUpRight, Zap, CheckCircle2, ShieldAlert } from 'lucide-react';
import { GithubIcon } from './Icons';
import { PROJECTS } from '../data/portfolioData';
import { soundManager } from '../utils/soundEffects';

export default function Projects() {
  const [expandedProject, setExpandedProject] = useState(null);

  const toggleExpand = (id) => {
    soundManager.playClick();
    setExpandedProject(expandedProject === id ? null : id);
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background Stage Aura Lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 w-[650px] h-[650px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono tracking-widest uppercase mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>CORE SYSTEMS REPOSITORY // FLAGSHIP WORKS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight mb-4">
            Selected Works & <span className="text-gradient-cyan">Flagship Architectures</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            High-performance compilers, distributed sandboxes, cognitive multi-agent verification graphs, and affective computing engines.
          </p>
        </div>

        {/* 2x2 Dark-Glass Card Layout matching requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PROJECTS.map((project, idx) => {
            const isExpanded = expandedProject === project.id;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-3xl backdrop-blur-xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_15px_40px_-15px_rgba(56,189,248,0.25)] hover:-translate-y-1"
              >
                {/* Top Card Bar */}
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="text-[11px] font-mono tracking-wider text-cyan-400 font-semibold uppercase">
                        {project.codeName}
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
                      {project.liveStatus}
                    </span>
                  </div>

                  {/* Category & Badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-300 font-medium">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-slate-500 hidden sm:inline">•</span>
                    <span className="text-xs font-mono text-purple-400/90 hidden sm:inline">
                      {project.highlightBadge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white group-hover:text-cyan-300 transition-colors mt-2 mb-3">
                    {project.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    {project.summary}
                  </p>

                  {/* Highlight Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2.5 mb-6 p-3.5 rounded-2xl bg-slate-950/70 border border-white/5">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="text-center">
                        <div className="text-base sm:text-lg font-mono font-bold text-cyan-400">
                          {metric.value}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs font-mono text-slate-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions & Architecture Expander */}
                <div>
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => toggleExpand(project.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors py-1"
                    >
                      <Cpu className="w-3.5 h-3.5" />
                      <span>{isExpanded ? "Hide Architecture Flow" : "Inspect System Blueprint"}</span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isExpanded ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => soundManager.playClick()}
                        className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="View Source on GitHub"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Expandable Architecture Drawer */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-4 pt-4 border-t border-cyan-500/20"
                      >
                        <div className="p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/30 space-y-3 text-xs font-mono">
                          <div className="text-cyan-300 font-bold flex items-center gap-2">
                            <Zap className="w-3.5 h-3.5 text-amber-400" />
                            <span>EXECUTION PIPELINE SPECIFICATION</span>
                          </div>

                          <div className="space-y-1.5 pl-2 border-l-2 border-cyan-500/40">
                            {project.architecture.stages.map((stage, sIdx) => (
                              <div key={stage} className="flex items-center gap-2 text-slate-300">
                                <span className="text-cyan-400 font-bold">0{sIdx + 1}.</span>
                                <span>{stage}</span>
                              </div>
                            ))}
                          </div>

                          <div className="pt-2 text-slate-400 text-[11px]">
                            <span className="text-slate-200 font-semibold">Outcome: </span>
                            {project.architecture.outcome}
                          </div>

                          <div className="pt-2 border-t border-white/5 space-y-1">
                            <span className="text-purple-400 font-semibold">Key Architectural Innovations:</span>
                            {project.features.map((feat) => (
                              <div key={feat} className="flex items-start gap-1.5 text-slate-300 text-[11px]">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
