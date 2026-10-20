import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Shield, Sparkles, QrCode, Wifi, Cpu, CheckCircle2, RotateCcw, Copy, Check } from 'lucide-react';
import { PERSONAL_DETAILS } from '../data/portfolioData';
import { soundManager } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

export default function DeveloperCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef(null);

  // Framer Motion 3D Tilt values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['18deg', '-18deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-20deg', '20deg']);

  // Dynamic light reflection sheen
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const triggerConfetti = () => {
    soundManager.playSuccess();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#38bdf8', '#a855f7', '#10b981', '#ffffff']
    });
  };

  const handleCopyBadge = () => {
    navigator.clipboard.writeText(`DEVELOPER IDENTITY: Sai Darsini Sathuluru | Role: AI Systems Architect | Clearance: LEVEL 04 | ID: ${PERSONAL_DETAILS.badgeSpecs.idNumber}`);
    setCopied(true);
    soundManager.playSuccess();
    setTimeout(() => setCopied(false), 2500);
  };

  const toggleFlip = () => {
    soundManager.playBadgeScan();
    setIsFlipped(!isFlipped);
  };

  return (
    <section id="id-badge" className="py-24 relative overflow-hidden">
      {/* Background Section Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-600/10 via-purple-600/10 to-transparent rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>AUTHENTICATED PASS // 3D HOLOGRAPHIC</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight mb-4">
            Interactive <span className="text-gradient-cyan">Developer ID Badge</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Hover and tilt the card in 3D space to trigger holographic light reflections, scan the EMV chip, or inspect system clearance credentials.
          </p>
        </div>

        {/* Card Arena with Lanyard Strap */}
        <div className="flex flex-col items-center justify-center">
          
          {/* Lanyard Cord and Metallic Clasp */}
          <div className="flex flex-col items-center mb-[-2px] z-20">
            <div className="w-5 h-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 rounded-t-sm border-x border-cyan-500/30 shadow-md relative overflow-hidden">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(56,189,248,0.2)_4px,rgba(56,189,248,0.2)_8px)]" />
            </div>
            {/* Metal Carabiner / Ring */}
            <div className="w-9 h-6 rounded-md bg-gradient-to-r from-slate-400 via-slate-200 to-slate-500 shadow-lg border border-slate-300 flex items-center justify-center">
              <div className="w-4 h-2 bg-slate-900 rounded-sm"></div>
            </div>
            <div className="w-3 h-3 bg-slate-700 rounded-full border border-slate-400 -mt-1 shadow-inner"></div>
          </div>

          {/* 3D Motion Card Container */}
          <div
            style={{ perspective: 1200 }}
            className="w-full max-w-[390px] cursor-grab active:cursor-grabbing select-none"
          >
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={triggerConfetti}
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full rounded-3xl p-1 bg-gradient-to-br from-cyan-400/40 via-purple-500/20 to-emerald-400/30 shadow-badge-3d backdrop-blur-2xl transition-shadow duration-300"
            >
              {/* Inner Badge Board */}
              <div className="relative rounded-[22px] bg-[#0c0d12]/95 border border-white/10 p-6 overflow-hidden scanlines">
                
                {/* Holographic dynamic sheen surface overlay that glides with mouse */}
                <motion.div
                  style={{
                    background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.25) 0%, rgba(56,189,248,0.1) 40%, transparent 80%)`,
                  }}
                  className="absolute inset-0 pointer-events-none z-30 mix-blend-overlay"
                />

                {/* Top Badge Lanyard Slot Hole */}
                <div className="flex justify-center -mt-3 mb-3">
                  <div className="w-14 h-2.5 rounded-full bg-slate-950 border border-slate-700 shadow-inner" />
                </div>

                {!isFlipped ? (
                  /* FRONT OF BADGE */
                  <div className="flex flex-col relative z-20">
                    
                    {/* Header Row */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                        <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                          DEVELOPER ACCESS IDENTITY
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        AUTH: 2026.04
                      </span>
                    </div>

                    {/* Middle Section: Photo & Chip/Status */}
                    <div className="grid grid-cols-12 gap-4 my-4 items-center">
                      
                      {/* Avatar Photo Frame with Holographic Rim */}
                      <div className="col-span-5 relative">
                        <div className="relative aspect-square rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-500 shadow-lg">
                          <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-slate-900">
                            <img
                              src="/avatar.png"
                              alt="Sai Darsini Sathuluru"
                              className="w-full h-full object-cover object-top filter contrast-105"
                            />
                            {/* Scanline overlay */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none" />
                            {/* Holographic corner tag */}
                            <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-cyan-500/80 text-[8px] font-mono font-bold text-slate-950">
                              PASS
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Hardware Chip & Realtime Telemetry */}
                      <div className="col-span-7 flex flex-col justify-between h-full pl-1">
                        
                        {/* Metallic Gold Smart Chip Graphic */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-11 h-8 rounded-md bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-700 p-0.5 shadow-md flex items-center justify-center relative">
                            {/* Chip circuit pins */}
                            <div className="w-full h-full rounded-[3px] border border-amber-900/60 grid grid-cols-3 grid-rows-2 gap-0.5 p-1 bg-amber-500/90">
                              <div className="border-r border-b border-amber-800/40"></div>
                              <div className="border-r border-b border-amber-800/40"></div>
                              <div className="border-b border-amber-800/40"></div>
                              <div className="border-r border-amber-800/40"></div>
                              <div className="border-r border-amber-800/40"></div>
                              <div></div>
                            </div>
                          </div>
                          <Wifi className="w-4 h-4 text-cyan-400 rotate-90 opacity-80" />
                        </div>

                        {/* Status Indicator */}
                        <div className="p-2 rounded-lg bg-slate-900/80 border border-emerald-500/30 flex flex-col gap-0.5">
                          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                            SYSTEM STATUS
                          </span>
                          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span>{PERSONAL_DETAILS.status}</span>
                          </div>
                        </div>

                        {/* Clearance Badge */}
                        <div className="mt-2 text-[10px] font-mono text-cyan-300/90 flex items-center gap-1">
                          <Shield className="w-3 h-3 text-cyan-400" />
                          <span>CLEARANCE: LEVEL 04</span>
                        </div>
                      </div>

                    </div>

                    {/* Developer Identity Details */}
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                          NAME OF HOLDER
                        </div>
                        <div className="text-lg font-bold font-display text-white tracking-wide">
                          {PERSONAL_DETAILS.name}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="text-[9px] font-mono uppercase tracking-widest text-slate-400">
                            DESIGNATION
                          </div>
                          <div className="text-xs font-mono font-semibold text-cyan-400">
                            AI Systems Architect
                          </div>
                        </div>
                        <div>
                          <div className="text-[9px] font-mono uppercase tracking-widest text-slate-400">
                            SECONDARY ROLE
                          </div>
                          <div className="text-xs font-mono font-semibold text-purple-400">
                            Core Systems Eng.
                          </div>
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-950/60 border border-white/5 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                        <span>CLUSTER ID:</span>
                        <span className="text-slate-200 font-semibold">{PERSONAL_DETAILS.badgeSpecs.idNumber}</span>
                      </div>
                    </div>

                    {/* Barcode and Watermark */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-mono text-xs tracking-[0.2em] text-slate-400 select-all">
                          {PERSONAL_DETAILS.badgeSpecs.barcode}
                        </span>
                        <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">
                          AUTH CLUSTER 07 // UNIVERSITY ENG VERIFIED
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-[9px] font-mono text-emerald-300 font-bold">
                          ACTIVE
                        </span>
                      </div>
                    </div>

                  </div>
                ) : (
                  /* BACK OF BADGE (FLIP VIEW) */
                  <div className="flex flex-col relative z-20 py-2">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="text-[11px] font-mono font-bold tracking-widest text-purple-400 uppercase">
                        SECURITY SPECIFICATIONS & TELEMETRY
                      </span>
                      <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                    </div>

                    <div className="space-y-3 my-4 text-xs font-mono">
                      <div className="p-3 rounded-xl bg-slate-900/70 border border-white/5 space-y-1">
                        <div className="text-slate-400 text-[10px]">ACADEMIC & INDUSTRY VERIFICATION</div>
                        <div className="text-slate-100 font-semibold">BTech CSE (Data Science) — Mohan Babu Univ.</div>
                        <div className="text-cyan-400 text-[11px]">Cumulative CGPA: 9.3 / 10.0 (Distinction)</div>
                        <div className="text-emerald-400 text-[10px]">9+ Certified Accreditations (IBM, MS, Infosys)</div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/70 border border-white/5 space-y-1">
                        <div className="text-slate-400 text-[10px]">CORE RUNTIME SPECIALIZATION</div>
                        <div className="text-slate-200 text-[11px]">
                          • Python AST Compilers & DSL Design<br />
                          • Cloud-Native GenAI & AWS Prompt Pipelines<br />
                          • Distributed Cloud Execution Containers
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/70 border border-white/5 flex items-center justify-between">
                        <div>
                          <div className="text-slate-400 text-[10px]">COORDINATES</div>
                          <div className="text-[10px] text-cyan-300">saidarsini.sathuluru@gmail.com</div>
                          <div className="text-[9px] text-emerald-400">SHA256: 9e4f..8821d</div>
                        </div>
                        <QrCode className="w-8 h-8 text-cyan-400" />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 text-center">
                      <span className="text-[9px] font-mono text-slate-400">
                        AUTHORIZED RECIPIENT // CONFIDENTIALITY GUARANTEED
                      </span>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </div>

          {/* Quick Action Toolbar Below Badge */}
          <div className="flex items-center gap-3 mt-6">
            <button
              type="button"
              onClick={toggleFlip}
              className="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 text-xs font-mono transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isFlipped ? "Show Badge Face" : "Flip to Telemetry"}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyBadge}
              className="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-purple-400 text-slate-300 hover:text-purple-300 text-xs font-mono transition-all flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied ID!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Credentials</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
