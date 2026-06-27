import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DISCOVERY_DATA } from '../data/discoveryData';
import { 
  X, 
  Sparkles, 
  Gem, 
  Lightbulb, 
  Map, 
  Eye, 
  BookOpen, 
  Compass, 
  FileText, 
  Activity 
} from 'lucide-react';

interface DiscoveryCanvasBackgroundProps {
  eraId: number;
  accentColor: string;
}

const DiscoveryCanvasBackground: React.FC<DiscoveryCanvasBackgroundProps> = ({ eraId, accentColor }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 800);

    interface DiscoveryParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      char?: string;
      angle?: number;
      rotationSpeed?: number;
      type?: string;
    }

    let particles: DiscoveryParticle[] = [];

    const initParticles = () => {
      particles = [];
      const particleCount = 35; // More visible and immersive

      for (let i = 0; i < particleCount; i++) {
        let x = Math.random() * width;
        let y = Math.random() * height;
        let vx = (Math.random() - 0.5) * 0.3;
        let vy = -Math.random() * 0.3 - 0.1; // generally slow upward drift
        let size = Math.random() * 2 + 1;
        let alpha = Math.random() * 0.22 + 0.18; // Much more visible alpha
        let char = '';
        let type = 'star';
        let angle = Math.random() * Math.PI * 2;
        let rotationSpeed = (Math.random() - 0.5) * 0.015;

        if (eraId === 1) { // Prehistoric
          type = 'spore';
          vx = (Math.random() - 0.5) * 0.15;
          vy = -Math.random() * 0.25 - 0.08;
        } else if (eraId === 2) { // Ancient Cities
          type = 'sand';
          vx = (Math.random() - 0.5) * 0.2;
          vy = -Math.random() * 0.2 - 0.08;
        } else if (eraId === 3) { // Ancient India
          type = 'symbol';
          const symbols = ['π', '0', '∞', '√', 'Δ', 'ॐ', 'S', 'R'];
          char = symbols[Math.floor(Math.random() * symbols.length)];
          size = Math.random() * 4 + 9;
          vy = -Math.random() * 0.15 - 0.05;
        } else if (eraId === 4) { // Rome/Persia
          type = 'symbol';
          const numerals = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
          char = numerals[Math.floor(Math.random() * numerals.length)];
          size = Math.random() * 4 + 9;
          vy = -Math.random() * 0.15 - 0.05;
        } else if (eraId === 5) { // Medieval Tech
          type = 'cog';
          size = Math.random() * 10 + 8;
          vy = -Math.random() * 0.12 - 0.04;
        } else if (eraId === 6) { // Oceanic Routes
          type = 'wave';
          vx = (Math.random() - 0.2) * 0.35;
          vy = -Math.random() * 0.08 - 0.04;
        } else if (eraId === 7) { // Industrial
          type = 'spark';
          vy = -Math.random() * 0.4 - 0.15;
          size = Math.random() * 2 + 1;
        } else if (eraId === 8) { // Modern Info
          type = 'binary';
          char = Math.random() > 0.5 ? '0' : '1';
          size = Math.random() * 3 + 8;
          vy = Math.random() * 0.25 + 0.08; // downward cascade
          vx = 0;
        } else if (eraId === 9) { // Future
          type = 'star';
          size = Math.random() * 2.5 + 0.6;
          vx = (Math.random() - 0.5) * 0.35;
          vy = (Math.random() - 0.5) * 0.35;
        }

        particles.push({ x, y, vx, vy, size, alpha, char, angle, rotationSpeed, type });
      }
    };

    initParticles();

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const w = entry.contentRect.width || canvas.parentElement?.clientWidth || 500;
        const h = entry.contentRect.height || canvas.parentElement?.clientHeight || 800;
        if (w !== width || h !== height) {
          width = canvas.width = w;
          height = canvas.height = h;
          initParticles();
        }
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    let tick = 0;

    const render = () => {
      tick += 0.012;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw super faint grid background that slowly moves/pans
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 36;
      const panOffset = (tick * 3) % gridSize;

      ctx.beginPath();
      for (let x = panOffset; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = panOffset; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Render custom particles based on eraId
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.angle !== undefined && p.rotationSpeed !== undefined) {
          p.angle += p.rotationSpeed;
        }

        // Boundary wrap logic
        if (p.type === 'binary') {
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
        } else {
          if (p.x < -30) p.x = width + 30;
          if (p.x > width + 30) p.x = -30;
          if (p.y < -30) p.y = height + 30;
          if (p.y > height + 30) p.y = -30;
        }

        const shimmer = 0.75 + Math.sin(tick * 2.5 + p.x * 0.04) * 0.25;
        const currentAlpha = p.alpha * shimmer;

        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = accentColor;
        ctx.strokeStyle = accentColor;
        ctx.shadowBlur = 8;
        ctx.shadowColor = accentColor;

        if (p.type === 'spore') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `${accentColor}15`;
          ctx.fill();
        } else if (p.type === 'sand') {
          ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        } else if (p.type === 'symbol') {
          ctx.font = `bold ${p.size}px monospace`;
          ctx.fillText(p.char || '', p.x, p.y);
        } else if (p.type === 'cog') {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle || 0);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
          ctx.stroke();
          for (let g = 0; g < 6; g++) {
            const ga = g * (Math.PI / 3);
            ctx.beginPath();
            ctx.moveTo(Math.cos(ga) * p.size, Math.sin(ga) * p.size);
            ctx.lineTo(Math.cos(ga) * (p.size + 3), Math.sin(ga) * (p.size + 3));
            ctx.stroke();
          }
        } else if (p.type === 'wave') {
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, Math.PI * 0.25, Math.PI * 0.75);
          ctx.stroke();
        } else if (p.type === 'spark') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 12, p.y - p.vy * 12);
          ctx.stroke();
        } else if (p.type === 'binary') {
          ctx.font = `bold ${p.size}px monospace`;
          ctx.fillText(p.char || '', p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [eraId, accentColor]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80 mix-blend-screen"
    />
  );
};

interface DiscoveryPanelProps {
  isOpen: boolean;
  eraId: number;
  onClose: () => void;
  theme: {
    glowColor: string;
    bgSolid: string;
    borderClass: string;
    bgClass: string;
    shadowClass: string;
  };
}

export const DiscoveryPanel: React.FC<DiscoveryPanelProps> = ({
  isOpen,
  eraId,
  onClose,
  theme,
}) => {
  const data = DISCOVERY_DATA[eraId];

  // Dismiss on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Ambient Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/85 backdrop-blur-sm cursor-pointer"
          />

          {/* Premium Immersive Side Panel */}
          <motion.div
            id="discovery-panel"
            initial={{ x: '100%', opacity: 0.9 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.9 }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:max-w-lg md:max-w-xl bg-zinc-950/92 backdrop-blur-2xl border-l border-white/10 flex flex-col shadow-2xl overflow-hidden select-none"
          >
            {/* Animated Canvas-based particle background matching the active era */}
            <DiscoveryCanvasBackground eraId={eraId} accentColor={theme.bgSolid} />

            {/* Soft decorative ambient aura inside the panel with organic floating motion */}
            <motion.div 
              animate={{
                scale: [1, 1.2, 0.95, 1.1, 1],
                x: [0, 15, -10, 12, 0],
                y: [0, -12, 18, -8, 0],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-25"
              style={{ backgroundColor: theme.bgSolid }}
            />
            <motion.div 
              animate={{
                scale: [1, 0.95, 1.1, 1, 1.05],
                x: [0, -15, 12, -8, 0],
                y: [0, 18, -12, 10, 0],
              }}
              transition={{
                duration: 26,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-15"
              style={{ backgroundColor: theme.bgSolid }}
            />

            {/* Panel Header */}
            <header className="relative px-6 py-5 border-b border-white/10 flex items-center justify-between z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: theme.bgSolid }} />
                  <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 uppercase">
                    CHRONOVERSE ARCHIVE INDEX
                  </span>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-extrabold text-white tracking-tight">
                  {data.title}
                </h3>
                <p className="text-xs text-zinc-400 italic font-serif">
                  "{data.subtitle}"
                </p>
              </div>

              <button
                id="close-discovery-panel"
                onClick={onClose}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            {/* Interactive Scrollable Archive Sections */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 relative z-10 scrollbar-thin scrollbar-thumb-white/10">
              
              {/* SECTION 1: HIDDEN FACT */}
              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative overflow-hidden rounded-xl border border-white/5 bg-zinc-900/40 p-5 space-y-3 group hover:border-white/10 transition-all duration-300"
              >
                <div 
                  className="absolute top-0 left-0 w-[2px] h-full"
                  style={{ backgroundColor: theme.bgSolid }}
                />
                <div className="flex items-center gap-2.5 text-zinc-400">
                  <Sparkles className="w-4.5 h-4.5" style={{ color: theme.bgSolid }} />
                  <h4 className="font-mono text-xs font-bold tracking-widest uppercase">
                    Hidden Chronicle Fact
                  </h4>
                </div>
                <div className="space-y-2">
                  <h5 className="font-display text-sm font-bold text-white tracking-wide">
                    {data.hiddenFact.title}
                  </h5>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    {data.hiddenFact.description}
                  </p>
                  <div className="pt-2 border-t border-white/5 flex gap-2 items-start">
                    <BookOpen className="w-3.5 h-3.5 text-zinc-500 mt-0.5 shrink-0" />
                    <p className="text-[11px] text-zinc-400 italic">
                      <strong className="text-zinc-300 not-italic">Significance:</strong> {data.hiddenFact.significance}
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* SECTION 2: RARE ARTIFACT */}
              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="relative overflow-hidden rounded-xl border border-white/5 bg-zinc-900/40 p-5 space-y-3 group hover:border-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-zinc-400">
                    <Gem className="w-4.5 h-4.5" style={{ color: theme.bgSolid }} />
                    <h4 className="font-mono text-xs font-bold tracking-widest uppercase">
                      Rare Artifact Registry
                    </h4>
                  </div>
                  <span className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase px-2 py-0.5 bg-white/5 border border-white/5 rounded-full">
                    {data.rareArtifact.origin}
                  </span>
                </div>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-display text-base font-extrabold text-white tracking-wide">
                      {data.rareArtifact.name}
                    </h5>
                    <p className="text-xs text-zinc-300 font-sans leading-relaxed mt-1">
                      {data.rareArtifact.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2.5 border-t border-white/5">
                    <div className="space-y-0.5">
                      <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Composition</span>
                      <span className="block text-[11px] font-medium text-zinc-300">{data.rareArtifact.materialComposition}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Status</span>
                      <span className="block text-[11px] font-medium text-zinc-300 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {data.rareArtifact.restorationStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* SECTION 3: HISTORICAL INVENTION */}
              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative overflow-hidden rounded-xl border border-white/5 bg-zinc-900/40 p-5 space-y-3 group hover:border-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-zinc-400">
                    <Lightbulb className="w-4.5 h-4.5" style={{ color: theme.bgSolid }} />
                    <h4 className="font-mono text-xs font-bold tracking-widest uppercase">
                      Epoch Invention
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">
                    {data.historicalInvention.inventor}
                  </span>
                </div>
                <div className="space-y-2">
                  <h5 className="font-display text-sm font-bold text-white tracking-wide">
                    {data.historicalInvention.name}
                  </h5>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    {data.historicalInvention.description}
                  </p>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                    <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Core Mechanism</span>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                      {data.historicalInvention.workingMechanism}
                    </p>
                  </div>
                  <p className="text-[11px] text-zinc-400 pt-1.5 border-t border-white/5">
                    <strong className="text-zinc-300">Legacy:</strong> {data.historicalInvention.lastingLegacy}
                  </p>
                </div>
              </motion.section>

              {/* SECTION 4: MAPS & REGIONAL ALIGNMENT */}
              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="relative overflow-hidden rounded-xl border border-white/5 bg-zinc-900/40 p-5 space-y-3 group hover:border-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-zinc-400">
                    <Map className="w-4.5 h-4.5" style={{ color: theme.bgSolid }} />
                    <h4 className="font-mono text-xs font-bold tracking-widest uppercase">
                      Geographical Map Coordinate
                    </h4>
                  </div>
                  <span className="font-mono text-[9px] text-zinc-400" style={{ color: theme.bgSolid }}>
                    {data.mapDiscovery.coordinatesText}
                  </span>
                </div>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-display text-sm font-bold text-white tracking-wide">
                      {data.mapDiscovery.title}
                    </h5>
                    <span className="text-[10px] text-zinc-500 font-mono block mb-1">
                      Region: {data.mapDiscovery.region}
                    </span>
                    <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                      {data.mapDiscovery.description}
                    </p>
                  </div>

                  {/* Stylized Miniature Vector Map Grid representation */}
                  <div className="relative h-28 rounded-lg bg-zinc-950/80 border border-white/10 overflow-hidden flex items-center justify-center">
                    {/* Grid lines */}
                    <div className="absolute inset-0 opacity-10 z-0" style={{
                      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '16px 16px'
                    }} />
                    
                    {/* Concentric radar circle */}
                    <div className="absolute w-20 h-20 rounded-full border border-dashed border-white/5 animate-[spin_40s_linear_infinite] z-0" />
                    <div className="absolute w-12 h-12 rounded-full border border-white/5 z-0" />

                    {/* Horizontal/Vertical Axis Lines */}
                    <div className="absolute w-full h-[1px] bg-white/5 z-0" />
                    <div className="absolute h-full w-[1px] bg-white/5 z-0" />

                    {/* Plot coordinates visual */}
                    <div className="relative z-10 flex flex-col items-center gap-1.5 bg-zinc-950/95 border border-white/10 px-4 py-2 rounded-md shadow-lg backdrop-blur-md">
                      <Compass className="w-5 h-5 animate-pulse" style={{ color: theme.bgSolid }} />
                      <span className="font-mono text-[9px] text-zinc-300 tracking-widest uppercase">
                        SECURE VECTOR PLOTTED
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-zinc-400 italic">
                    <strong className="text-zinc-300 not-italic">Tectonic Note:</strong> {data.mapDiscovery.geographicalNote}
                  </p>
                </div>
              </motion.section>

              {/* SECTION 5: VISUAL DISCOVERY */}
              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative overflow-hidden rounded-xl border border-white/5 bg-zinc-900/40 p-5 space-y-3 group hover:border-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-2.5 text-zinc-400">
                  <Eye className="w-4.5 h-4.5" style={{ color: theme.bgSolid }} />
                  <h4 className="font-mono text-xs font-bold tracking-widest uppercase">
                    Visual Synthesis Discovery
                  </h4>
                </div>
                <div className="space-y-2">
                  <h5 className="font-display text-sm font-bold text-white tracking-wide">
                    {data.visualDiscovery.name}
                  </h5>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    <strong className="text-zinc-400">Depicts:</strong> {data.visualDiscovery.depiction}
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-2.5 rounded bg-zinc-950 border border-white/5">
                      <span className="block text-[8px] font-mono text-zinc-500 uppercase">Aesthetic Style</span>
                      <span className="block text-[10px] text-zinc-300 font-medium truncate">{data.visualDiscovery.artStyle}</span>
                    </div>
                    <div className="p-2.5 rounded bg-zinc-950 border border-white/5">
                      <span className="block text-[8px] font-mono text-zinc-500 uppercase">Context Era</span>
                      <span className="block text-[10px] text-zinc-300 font-medium truncate">{data.visualDiscovery.historicalContext}</span>
                    </div>
                  </div>
                </div>
              </motion.section>

            </div>

            {/* Panel Footer */}
            <footer className="relative px-6 py-4 border-t border-white/10 bg-black/40 z-10 flex items-center justify-between">
              <span className="font-mono text-[9px] text-zinc-500 tracking-widest">
                VER: 4.12.000 // ARCHIVE INTEGRITY SECURE
              </span>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded border text-white/90 hover:text-white transition-all duration-300"
                style={{
                  backgroundColor: `${theme.bgSolid}18`,
                  borderColor: `${theme.bgSolid}40`,
                }}
              >
                Sync Timeline
              </button>
            </footer>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
