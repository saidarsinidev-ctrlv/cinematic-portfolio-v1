import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Terminal, ArrowRight, Activity, Zap, Cpu, Award, FileText } from 'lucide-react';
import { PERSONAL_DETAILS } from '../data/portfolioData';
import { soundManager } from '../utils/soundEffects';

export default function Hero({ onOpenIdBadge, onOpenResume }) {
  // Video fallback detection logic
  const [videoAvailable, setVideoAvailable] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  useEffect(() => {
    // Check if /avatar-walk.webm exists and can load
    const video = document.createElement('video');
    video.src = '/avatar-walk.webm';
    video.preload = 'metadata';

    video.onloadeddata = () => {
      setVideoAvailable(true);
      setVideoLoading(false);
    };

    video.onerror = () => {
      // Fallback seamlessly to /avatar.png
      setVideoAvailable(false);
      setVideoLoading(false);
    };

    // Timeout safety
    const timer = setTimeout(() => {
      setVideoLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-[95vh] pt-32 pb-20 flex flex-col justify-center overflow-hidden">
      {/* Ambient Radial Spotlight Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bold Kinetic Typography & Credentials */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Top Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wider mb-6 shadow-[0_0_20px_rgba(56,189,248,0.15)]"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-[11px] font-semibold tracking-widest uppercase">
                {PERSONAL_DETAILS.status}
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300 font-mono text-[11px]">
                {PERSONAL_DETAILS.clearance}
              </span>
            </motion.div>

            {/* Kinetic Secondary Headline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs sm:text-sm font-mono tracking-[0.25em] text-cyan-400 font-semibold uppercase mb-3 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-300 inline" />
              {PERSONAL_DETAILS.secondaryHeadline}
            </motion.p>

            {/* Big Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight font-display leading-[1.08] text-white mb-6"
            >
              Sai Darsini <br />
              <span className="text-gradient-cyan">Sathuluru</span>
            </motion.h1>

            {/* Role Title Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="flex items-center gap-3 text-lg sm:text-xl font-medium text-slate-200 mb-6"
            >
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 font-mono text-sm text-cyan-300">
                AI Systems Architect
              </span>
              <span className="text-slate-500">•</span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 font-mono text-sm text-purple-300">
                Core Systems Engineer
              </span>
            </motion.div>

            {/* Primary Tagline */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-4 border-l-2 border-cyan-500 pl-4 bg-gradient-to-r from-cyan-950/20 to-transparent py-1 rounded-r-lg max-w-2xl"
            >
              "{PERSONAL_DETAILS.primaryTagline}"
            </motion.blockquote>

            {/* Bio description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-sm sm:text-base text-slate-400 font-normal mb-8 max-w-2xl leading-relaxed"
            >
              {PERSONAL_DETAILS.bio}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <a
                href="#projects"
                onClick={() => soundManager.playClick()}
                className="group px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold font-mono text-sm hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                <span>EXPLORE ARCHITECTURE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#id-badge"
                onClick={() => {
                  soundManager.playBadgeScan();
                  if (onOpenIdBadge) onOpenIdBadge();
                }}
                className="px-6 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-cyan-400 text-slate-200 font-mono text-sm hover:shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-all flex items-center gap-2.5 backdrop-blur-md"
              >
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>INSPECT ID BADGE</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  soundManager.playSuccess();
                  if (onOpenResume) onOpenResume();
                }}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-900/40 to-slate-900/90 border border-purple-500/40 hover:border-purple-400 text-purple-200 hover:text-white font-mono text-sm hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all flex items-center gap-2.5 backdrop-blur-md"
              >
                <FileText className="w-4 h-4 text-purple-400" />
                <span>VIEW RESUME</span>
              </button>

              <a
                href="#terminal"
                onClick={() => soundManager.playClick()}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-purple-500 text-purple-400 text-sm font-mono hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
                title="Open Interactive Terminal"
              >
                <Terminal className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Metric Stat Counters Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10"
            >
              {PERSONAL_DETAILS.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="p-3 rounded-xl bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white mb-0.5 tracking-tight flex items-baseline gap-1">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                      {stat.value}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 font-medium truncate">
                    {stat.label}
                  </div>
                  <div className="text-[10px] text-cyan-400/70 font-mono truncate mt-0.5">
                    {stat.change}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Hero Avatar Stage with Automatic Video/Image Fallback */}
          <div className="lg:col-span-5 flex justify-center items-center relative z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[420px]"
            >
              {/* Outer Ambient Glow Rings */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 opacity-40 blur-xl animate-pulse-slow"></div>

              {/* Holographic Stage Frame Container */}
              <div className="relative rounded-2xl p-1 bg-gradient-to-b from-cyan-500/40 via-slate-800 to-purple-600/40 shadow-2xl backdrop-blur-2xl">
                
                {/* Tech Header Bracket */}
                <div className="bg-slate-950/90 rounded-t-xl px-4 py-2.5 flex items-center justify-between border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
                    <span className="text-[11px] font-mono tracking-widest text-slate-300 uppercase">
                      AVATAR STAGE // FEED 01
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400">
                    <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
                    <span>60 FPS</span>
                  </div>
                </div>

                {/* Media Container: Walking Video or Glassmorphic Avatar Fallback */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-950 scanlines flex items-center justify-center">
                  {videoAvailable ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover object-center"
                      src="/avatar-walk.webm"
                    />
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-slate-900/80 via-[#0d0e12] to-slate-950">
                      {/* Avatar Image with Holographic Blue/Purple Rim Glow */}
                      <img
                        src="/avatar.png"
                        alt="Sai Darsini Sathuluru"
                        className="w-full h-full object-cover object-top filter brightness-95 contrast-105"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />

                      {/* Soft gradient bottom overlay so text/badge pops */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent pointer-events-none" />

                      {/* Scanline grid sheen effect */}
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(8,8,10,0.6)_100%)] pointer-events-none" />
                    </div>
                  )}

                  {/* Corner Sci-Fi HUD Crosshairs */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400/80 pointer-events-none" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400/80 pointer-events-none" />
                  <div className="absolute bottom-16 left-3 w-4 h-4 border-b-2 border-l-2 border-purple-400/80 pointer-events-none" />
                  <div className="absolute bottom-16 right-3 w-4 h-4 border-b-2 border-r-2 border-purple-400/80 pointer-events-none" />

                  {/* Floating Identity Badge in Stage */}
                  <div className="absolute bottom-3 left-3 right-3 z-30">
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="px-4 py-2.5 rounded-xl bg-slate-950/85 backdrop-blur-xl border border-cyan-500/40 shadow-[0_4px_20px_rgba(0,0,0,0.8)] flex items-center justify-between"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold font-mono tracking-wider text-white">
                          Sai Darsini Sathuluru
                        </span>
                        <span className="text-[11px] font-mono text-cyan-400 font-medium">
                          // AI Systems Architect
                        </span>
                      </div>
                      <div className="px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-400/40 text-[10px] font-mono text-cyan-300 uppercase tracking-widest">
                        AUTHENTICATED
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Footer Telemetry strip */}
                <div className="bg-slate-950/90 rounded-b-xl px-4 py-2 flex items-center justify-between border-t border-white/10 text-[10px] font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-400" />
                    AST PARSER ENGINE READY
                  </span>
                  <span className="text-slate-500">ID: SD-904-ARCH</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
