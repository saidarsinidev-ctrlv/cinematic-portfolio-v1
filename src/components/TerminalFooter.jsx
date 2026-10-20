import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Copy, Check, Sparkles, ExternalLink, Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PERSONAL_DETAILS, TERMINAL_COMMANDS } from '../data/portfolioData';
import { soundManager } from '../utils/soundEffects';

export default function TerminalFooter() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    {
      command: 'init --status',
      output: `System initialized. Connected to SD-SYSARCH // Cluster 07.
Type 'help' to inspect available system commands or click the shortcut chips below.`
    }
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  const availableCommands = ['help', 'resume', 'certifications', 'projects', 'stack', 'badge', 'contact', 'clear'];

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputVal.trim().toLowerCase();
    if (!trimmed) return;

    soundManager.playClick();

    // Add to navigation history
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    if (trimmed === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    let output = '';
    if (TERMINAL_COMMANDS[trimmed]) {
      output = TERMINAL_COMMANDS[trimmed];
    } else {
      output = `command not found: "${trimmed}". Type 'help' for available system commands.`;
    }

    setHistory((prev) => [...prev, { command: trimmed, output }]);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    }
  };

  const runQuickCommand = (cmd) => {
    soundManager.playClick();
    if (cmd === 'clear') {
      setHistory([]);
      return;
    }
    const output = TERMINAL_COMMANDS[cmd] || `Executed: ${cmd}`;
    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_DETAILS.email);
    setCopiedEmail(true);
    soundManager.playSuccess();
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    soundManager.playClick();
  };

  return (
    <footer id="contact" className="pt-20 pb-12 relative border-t border-white/10 bg-[#08080a] overflow-hidden">
      <div id="terminal" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Terminal Header Info */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>INTERACTIVE CLI DIAGNOSTICS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight mb-2">
            System Terminal Console
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Query architect specs, inspect build artifacts, or dispatch direct contact coordinates.
          </p>
        </div>

        {/* Realistic macOS/Linux Terminal Window */}
        <div className="rounded-2xl p-1 bg-gradient-to-b from-slate-700/40 via-slate-800/20 to-slate-900/60 shadow-2xl backdrop-blur-2xl mb-12">
          <div className="rounded-xl bg-[#090a0f] border border-white/10 overflow-hidden shadow-2xl font-mono text-xs">
            
            {/* Terminal Title Bar */}
            <div className="bg-[#12141c] px-4 py-3 flex items-center justify-between border-b border-white/10 select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                <span className="ml-2 text-slate-400 text-[11px] font-semibold">
                  sai@architect-terminal ~ (bash)
                </span>
              </div>
              <div className="text-[10px] text-cyan-400/80 hidden sm:block">
                PORT 8080 // CLOUD-SESSION ACTIVE
              </div>
            </div>

            {/* Quick Command Chips Toolbar */}
            <div className="px-4 py-2 bg-slate-950/60 border-b border-white/5 flex flex-wrap items-center gap-1.5 text-[11px]">
              <span className="text-slate-400 mr-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                Shortcuts:
              </span>
              {availableCommands.map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => runQuickCommand(cmd)}
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Terminal Output Stream */}
            <div className="p-4 sm:p-6 max-h-[360px] overflow-y-auto space-y-4">
              {history.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                    <span className="text-emerald-400">sai@architect:~$</span>
                    <span>{item.command}</span>
                  </div>
                  <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed pl-2 font-mono text-xs border-l border-white/10">
                    {item.output}
                  </pre>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Active Input Line */}
            <form
              onSubmit={handleCommandSubmit}
              className="p-3 bg-slate-950/80 border-t border-white/10 flex items-center gap-2"
            >
              <span className="text-emerald-400 font-bold whitespace-nowrap">
                sai@architect:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help', 'contact', 'projects', 'stack'..."
                className="w-full bg-transparent text-cyan-300 outline-none font-mono text-xs placeholder:text-slate-400"
                autoComplete="off"
                spellCheck="false"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs flex items-center gap-1 transition-colors"
              >
                <Send className="w-3 h-3" />
                <span className="hidden sm:inline">RUN</span>
              </button>
            </form>

          </div>
        </div>

        {/* Direct Contact Card & Quick Copy Email Action */}
        <div className="rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-white/10 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex flex-col text-center md:text-left">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1">
              DIRECT ARCHITECT DISPATCH
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Let's Engineer Scalable AI Systems Together
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Open to high-impact roles in Core Systems, AI Architecture, and Distributed Cloud Runtimes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Click to Copy Email Button */}
            <button
              type="button"
              onClick={copyEmail}
              className="px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Email Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>{PERSONAL_DETAILS.email}</span>
                  <Copy className="w-3.5 h-3.5 text-slate-400 ml-1" />
                </>
              )}
            </button>

            {/* Archive link */}
            <a
              href={PERSONAL_DETAILS.archivePortfolio}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-mono transition-colors flex items-center gap-2"
            >
              <span>v2 Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-300">[SD]</span>
            <span>© 2026 Sai Darsini Sathuluru</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400">AI Systems Architect</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_DETAILS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={PERSONAL_DETAILS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors flex items-center gap-1"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-400 hover:text-cyan-400 transition-colors"
              title="Return to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
