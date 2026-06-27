import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Sparkles, Play, Volume2, VolumeX, ShieldAlert } from 'lucide-react';
import { AudioEngine } from '../utils/audio';

interface ChampionshipIntroProps {
  onEnter: () => void;
  soundEnabled: boolean;
  toggleSound: (force?: boolean) => void;
}

export const ChampionshipIntro: React.FC<ChampionshipIntroProps> = ({
  onEnter,
  soundEnabled,
  toggleSound,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentStep, setCurrentStep] = useState<'logo' | 'stars' | 'headline' | 'timeline' | 'ready'>('logo');
  const [timelineIndex, setTimelineIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(0);

  // Typewriter effect logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentStep === 'logo' || currentStep === 'stars' || currentStep === 'headline' || currentStep === 'timeline' || currentStep === 'ready') {
      interval = setInterval(() => {
        setTypedLength((prev) => {
          if (prev < 11) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 95);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentStep]);

  // Framer Motion Parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 85 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax translation transforms (in pixels)
  const moveX1 = useTransform(smoothX, [-0.5, 0.5], [-35, 35]);
  const moveY1 = useTransform(smoothY, [-0.5, 0.5], [-35, 35]);

  const moveX2 = useTransform(smoothX, [-0.5, 0.5], [45, -45]);
  const moveY2 = useTransform(smoothY, [-0.5, 0.5], [45, -45]);

  const moveX3 = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const moveY3 = useTransform(smoothY, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const width = window.innerWidth;
    const height = window.innerHeight;
    mouseX.set((clientX / width) - 0.5);
    mouseY.set((clientY / height) - 0.5);
  };

  const loaderTimeline = [
    { year: "-13.8B Years", milestone: "The Big Bang — Universe Ignition" },
    { year: "-4.5B Years", milestone: "Earth Formation & Core Coalescence" },
    { year: "-230M Years", milestone: "Age of Giants — Dinosaur Dominance" },
    { year: "-10,000 Years", milestone: "Dawn of Cities — Agricultural Revolution" },
    { year: "-2,500 Years", milestone: "Golden Age of Indian Wisdom & Science" },
    { year: "2026", milestone: "Digital & Modern Information Age" },
    { year: "Future", milestone: "Mars Colonization & Star Voyage Era... Ready." }
  ];

  // Sequencing states
  useEffect(() => {
    // 1. Logo displays for 1.2s, then stars activate
    const timer1 = setTimeout(() => {
      setCurrentStep('stars');
    }, 1200);

    // 2. Stars animate for another 1s, then headline word-by-word starts
    const timer2 = setTimeout(() => {
      setCurrentStep('headline');
    }, 2200);

    // 3. Headline finishes reading (takes ~3s to unfold nicely), then timeline starts loading
    const timer3 = setTimeout(() => {
      setCurrentStep('timeline');
    }, 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Timeline auto-advancing logic
  useEffect(() => {
    if (currentStep === 'timeline') {
      if (timelineIndex < loaderTimeline.length - 1) {
        const interval = setTimeout(() => {
          setTimelineIndex((prev) => prev + 1);
          if (soundEnabled) {
            AudioEngine.playSuccess();
          }
        }, 850);
        return () => clearTimeout(interval);
      } else {
        const timer = setTimeout(() => {
          setCurrentStep('ready');
          if (soundEnabled) {
            AudioEngine.playSuccess();
          }
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [currentStep, timelineIndex, soundEnabled]);

  // Canvas starfield & time ripples physics simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Star {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      alpha: number;
      speedX: number;
      speedY: number;
      color: string;
      phase: number;
      twinkleSpeed: number;
    }

    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      speed: number;
      alpha: number;
      color: string;
    }

    interface TemporalDial {
      x: number;
      y: number;
      size: number;
      angle: number;
      speed: number;
      style: 'orbital' | 'clock' | 'geometric';
    }

    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      alpha: number;
      color: string;
    }

    let stars: Star[] = [];
    let ripples: Ripple[] = [];
    let dials: TemporalDial[] = [];
    let shootingStars: ShootingStar[] = [];
    const starCount = 140;

    const createStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 1.8 + 0.4;
        const alpha = Math.random() * 0.7 + 0.15;
        const speedX = (Math.random() - 0.5) * 0.12;
        const speedY = (Math.random() - 0.5) * 0.12;
        const phase = Math.random() * Math.PI * 2;
        const twinkleSpeed = Math.random() * 0.025 + 0.005;

        // Soft pastel/primary accents matching slide color language
        const colors = [
          '#ffffff',
          '#ffb5a0', // primary orange
          '#10b981', // emerald
          '#38bdf8', // sky blue
          '#f59e0b', // amber
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];

        stars.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size,
          alpha,
          speedX,
          speedY,
          color,
          phase,
          twinkleSpeed,
        });
      }
    };

    const initDials = () => {
      dials = [
        {
          x: width * 0.18,
          y: height * 0.25,
          size: Math.min(width, height) * 0.18,
          angle: 0,
          speed: 0.002,
          style: 'orbital',
        },
        {
          x: width * 0.82,
          y: height * 0.72,
          size: Math.min(width, height) * 0.22,
          angle: Math.PI / 4,
          speed: -0.0015,
          style: 'clock',
        },
        {
          x: width * 0.5,
          y: height * 0.5,
          size: Math.min(width, height) * 0.32,
          angle: Math.PI / 2,
          speed: 0.0008,
          style: 'geometric',
        },
      ];
    };

    createStars();
    initDials();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createStars();
      initDials();
    };

    window.addEventListener('resize', handleResize);

    // Click triggers manual ripples
    const handleCanvasClick = (e: MouseEvent) => {
      const colors = ['rgba(255,181,160,0.5)', 'rgba(56,189,248,0.5)', 'rgba(16,185,129,0.5)'];
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.42,
        speed: 6.5,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
      if (soundEnabled) {
        AudioEngine.playSweep();
      }
    };

    window.addEventListener('click', handleCanvasClick);

    // Auto periodic ambient center ripples
    let rippleTick = 0;

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.012;
      rippleTick++;

      ctx.fillStyle = '#09090b'; // dark slate/charcoal background
      ctx.fillRect(0, 0, width, height);

      // 1. Spawning shooting stars periodically
      if (Math.random() < 0.012 && shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: 0,
          length: Math.random() * 80 + 50,
          speed: Math.random() * 8 + 5,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.12,
          alpha: 1,
          color: ['#ffb5a0', '#38bdf8', '#ffffff', '#f59e0b'][Math.floor(Math.random() * 4)],
        });
      }

      // Update & Render Shooting Stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.alpha -= 0.014;

        if (ss.alpha <= 0 || ss.x > width || ss.y > height) {
          shootingStars.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = ss.alpha;
        ctx.strokeStyle = ss.color;
        ctx.lineWidth = 1.6;
        ctx.shadowBlur = 12;
        ctx.shadowColor = ss.color;
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - Math.cos(ss.angle) * ss.length, ss.y - Math.sin(ss.angle) * ss.length);
        ctx.stroke();
        ctx.restore();
      }

      // Periodic natural cosmic pulse
      if (rippleTick % 160 === 0) {
        ripples.push({
          x: width / 2,
          y: height / 2,
          radius: 0,
          maxRadius: Math.max(width, height) * 0.65,
          speed: 4.5,
          alpha: 0.6,
          color: 'rgba(255,181,160,0.22)',
        });
      }

      // Update & Draw Ripples
      ripples.forEach((ripple, index) => {
        ripple.radius += ripple.speed;
        ripple.alpha = 1 - ripple.radius / ripple.maxRadius;

        if (ripple.alpha <= 0) {
          ripples.splice(index, 1);
          return;
        }

        ctx.save();
        ctx.strokeStyle = ripple.color;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = ripple.alpha;
        ctx.shadowBlur = 18;
        ctx.shadowColor = ripple.color;

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Secondary inner echo ring
        if (ripple.radius > 50) {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius - 40, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();
      });

      // Render Holographic Rotating Dials
      dials.forEach((dial) => {
        dial.angle += dial.speed;

        ctx.save();
        ctx.translate(dial.x, dial.y);
        ctx.rotate(dial.angle);
        ctx.strokeStyle = 'rgba(255, 181, 160, 0.07)'; // primary accent style
        ctx.lineWidth = 1;

        if (dial.style === 'orbital') {
          // Nested technical circles with gaps
          ctx.beginPath();
          ctx.arc(0, 0, dial.size, 0, Math.PI * 1.5);
          ctx.stroke();

          ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)'; // sky blue
          ctx.setLineDash([8, 12]);
          ctx.beginPath();
          ctx.arc(0, 0, dial.size * 0.72, 0, Math.PI * 2);
          ctx.stroke();

          ctx.strokeStyle = 'rgba(16, 185, 129, 0.03)'; // emerald
          ctx.setLineDash([4, 6]);
          ctx.beginPath();
          ctx.arc(0, 0, dial.size * 1.25, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
        } else if (dial.style === 'clock') {
          // Astrolabe/Clock notches
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.05)'; // amber
          ctx.beginPath();
          ctx.arc(0, 0, dial.size, 0, Math.PI * 2);
          ctx.stroke();

          for (let j = 0; j < 12; j++) {
            const a = (j * Math.PI) / 6;
            ctx.beginPath();
            ctx.moveTo(Math.cos(a) * (dial.size - 10), Math.sin(a) * (dial.size - 10));
            ctx.lineTo(Math.cos(a) * dial.size, Math.sin(a) * dial.size);
            ctx.stroke();
          }

          // Central core pointer
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(time * 0.2) * (dial.size * 0.5), Math.sin(time * 0.2) * (dial.size * 0.5));
          ctx.stroke();
        } else if (dial.style === 'geometric') {
          // Sacred geometry layout
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
          ctx.beginPath();
          ctx.arc(0, 0, dial.size, 0, Math.PI * 2);
          ctx.stroke();

          // Triangular Star
          ctx.beginPath();
          for (let k = 0; k < 3; k++) {
            const a = (k * Math.PI * 2) / 3;
            const x = Math.cos(a) * dial.size;
            const y = Math.sin(a) * dial.size;
            if (k === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();

          // Inner pentagon alignment
          ctx.strokeStyle = 'rgba(255, 181, 160, 0.025)';
          ctx.beginPath();
          for (let k = 0; k < 5; k++) {
            const a = (k * Math.PI * 2) / 5;
            const x = Math.cos(a) * (dial.size * 0.55);
            const y = Math.sin(a) * (dial.size * 0.55);
            if (k === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
        }

        ctx.restore();
      });

      // Update & Draw Stars with time distortion (warp) around ripples
      stars.forEach((star) => {
        // Star background drift
        star.baseX += star.speedX;
        star.baseY += star.speedY;

        // Wrap edges
        if (star.baseX < 0) star.baseX = width;
        if (star.baseX > width) star.baseX = 0;
        if (star.baseY < 0) star.baseY = height;
        if (star.baseY > height) star.baseY = 0;

        let targetX = star.baseX;
        let targetY = star.baseY;

        // Apply displacement warp for each active ripple
        ripples.forEach((ripple) => {
          const dx = star.baseX - ripple.x;
          const dy = star.baseY - ripple.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // If the star is close to the ripple ring edge, push it slightly
          const rippleWidth = 45;
          if (dist > 0 && Math.abs(dist - ripple.radius) < rippleWidth) {
            const factor = (1 - Math.abs(dist - ripple.radius) / rippleWidth) * ripple.alpha * 14;
            targetX += (dx / dist) * factor;
            targetY += (dy / dist) * factor;
          }
        });

        star.x = targetX;
        star.y = targetY;
        star.phase += star.twinkleSpeed;

        const currentAlpha = Math.max(0.12, star.alpha * (0.55 + Math.sin(star.phase) * 0.45));

        ctx.save();
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowBlur = star.size > 1.2 ? 7 : 0;
        ctx.shadowColor = star.color;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw faint cybernetic overlay grid
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 64;
      const panOffset = (time * 10) % gridSize;

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
      ctx.restore();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleCanvasClick);
    };
  }, [soundEnabled]);

  // Word-by-word headline processing and letter-by-letter staggering
  const line1Words = "History Is Not Fixed.".split(" ");
  const line2Words = "History Is A Choice.".split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const charVariants = {
    hidden: { 
      y: 18, 
      opacity: 0, 
      scale: 0.82,
      rotate: 6,
      filter: "blur(5px)" 
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
      transition: { 
        type: "spring",
        damping: 14,
        stiffness: 95
      },
    },
  };

  // Splitting CHRONOVERSE for typewriter staggering reveal
  const logoLetters = "CHRONOVERSE".split("");

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950 select-none"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Starfield & Ripple background */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full object-cover pointer-events-none" />

      {/* FLOATING ROTATING GEOMETRIC LOGO-INSPIRED SHAPES WITH PARALLAX */}
      {/* Shape 1: Cosmic Chrono-Dial (Left) */}
      <motion.div
        style={{ x: moveX1, y: moveY1 }}
        className="absolute left-[4%] sm:left-[8%] top-[15%] sm:top-[18%] w-48 h-48 sm:w-64 sm:h-64 pointer-events-none mix-blend-screen opacity-25 sm:opacity-35 z-0"
      >
        <motion.svg
          viewBox="0 0 100 100"
          className="w-full h-full text-primary"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
        >
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="12 4 2 4" />
          <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <path d="M 50 2 L 50 98 M 2 50 L 98 50" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 1" />
          <circle cx="50" cy="14" r="1.5" fill="currentColor" />
          <circle cx="50" cy="86" r="1.5" fill="currentColor" />
          <circle cx="14" cy="50" r="1.5" fill="currentColor" />
          <circle cx="86" cy="50" r="1.5" fill="currentColor" />
        </motion.svg>
      </motion.div>

      {/* Shape 2: Astrolabe Concentric Rings (Right) */}
      <motion.div
        style={{ x: moveX2, y: moveY2 }}
        className="absolute right-[3%] sm:right-[6%] bottom-[10%] sm:bottom-[12%] w-52 h-52 sm:w-80 sm:h-80 pointer-events-none mix-blend-screen opacity-20 sm:opacity-30 z-0"
      >
        <motion.svg
          viewBox="0 0 120 120"
          className="w-full h-full text-amber-400"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 55, ease: "linear" }}
        >
          <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="1.0" />
          <circle cx="60" cy="60" r="42" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="24 8" />
          <circle cx="60" cy="60" r="28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1 4" />
          <ellipse cx="60" cy="60" rx="54" ry="14" fill="none" stroke="currentColor" strokeWidth="0.8" transform="rotate(30 60 60)" />
          <ellipse cx="60" cy="60" rx="54" ry="14" fill="none" stroke="currentColor" strokeWidth="0.8" transform="rotate(-30 60 60)" />
        </motion.svg>
      </motion.div>

      {/* Shape 3: Center Sacred Geometry Core */}
      <motion.div
        style={{ x: moveX3, y: moveY3 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] pointer-events-none mix-blend-screen opacity-15 sm:opacity-20 z-0"
      >
        <motion.svg
          viewBox="0 0 100 100"
          className="w-full h-full text-white"
          animate={{ rotate: 180 }}
          transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
        >
          <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <polygon points="50,95 90,72 90,28 50,5 10,28 10,72" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(30 50 50)" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <polygon points="50,22 68,54 32,54" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <polygon points="50,78 68,46 32,46" fill="none" stroke="currentColor" strokeWidth="0.8" />
        </motion.svg>
      </motion.div>

      <div className="relative min-h-full w-full flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-12 z-10 gap-8">
        {/* Futuristic Header bar */}
        <div className="w-full flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-sm scale-150" />
            </div>
          </div>

          {/* Audio control button inside loading screen */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSound();
            }}
            className="flex items-center gap-2 px-3 py-1 bg-zinc-900/60 hover:bg-zinc-800/80 border border-white/10 rounded-full text-zinc-400 hover:text-white transition-all font-mono text-[10px]"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-primary" />
                <span>MUTED: OFF</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                <span>MUTED: ON</span>
              </>
            )}
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col items-center justify-center flex-1 max-w-4xl mx-auto w-full space-y-8 md:space-y-12 select-none text-center">
          {/* LOGO REVEAL */}
          <AnimatePresence>
            {(currentStep === 'logo' || currentStep === 'stars' || currentStep === 'headline' || currentStep === 'timeline' || currentStep === 'ready') && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="space-y-3 z-10"
              >
                <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-[0.1em] md:tracking-[0.16em] uppercase drop-shadow-[0_0_25px_rgba(255,181,160,0.25)] leading-none select-none flex justify-center items-center flex-wrap">
                  {logoLetters.slice(0, typedLength).map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.3, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className={index >= 6 ? "text-primary font-light" : "text-white font-extrabold"}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {/* Real-time active typing prompt cursor */}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                    className="text-primary font-bold ml-1 text-3xl sm:text-4xl md:text-6xl self-center"
                  >
                    _
                  </motion.span>
                </h1>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="flex justify-center items-center gap-2"
                >
                  <span className="w-8 h-[1px] bg-white/20" />
                  <p className="font-mono text-[9px] md:text-[11px] text-zinc-400 tracking-[0.6em] uppercase whitespace-nowrap pl-[0.6em]">
                    HISTORY, REIMAGINED
                  </p>
                  <span className="w-8 h-[1px] bg-white/20" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* PREMIUM HEADLINE CHARACTER-BY-CHARACTER ANIMATION */}
          <div className="min-h-[100px] md:min-h-[140px] flex flex-col justify-center items-center space-y-3 pointer-events-none z-10">
            <AnimatePresence>
              {(currentStep === 'headline' || currentStep === 'timeline' || currentStep === 'ready') && (
                <motion.div 
                  className="space-y-4"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                >
                  {/* Line 1 */}
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap justify-center font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white gap-y-2 md:gap-x-4 overflow-visible py-2"
                  >
                    {line1Words.map((word, wordIdx) => (
                      <span key={wordIdx} className="inline-block whitespace-nowrap overflow-visible mx-2 px-1">
                        {word.split("").map((char, charIdx) => (
                          <motion.span
                            key={charIdx}
                            variants={charVariants}
                            className="inline-block overflow-visible"
                          >
                            {char}
                          </motion.span>
                        ))}
                      </span>
                    ))}
                  </motion.div>

                  {/* Line 2 */}
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap justify-center font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary gap-y-2 md:gap-x-4 overflow-visible py-2"
                  >
                    {line2Words.map((word, wordIdx) => (
                      <span key={wordIdx} className="inline-block whitespace-nowrap overflow-visible mx-2 px-2">
                        {word.split("").map((char, charIdx) => (
                          <motion.span
                            key={charIdx}
                            variants={charVariants}
                            className="inline-block italic overflow-visible"
                            style={{ textShadow: '0 0 25px rgba(255,181,160,0.35)' }}
                          >
                            {char}
                          </motion.span>
                        ))}
                      </span>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* HUD TIMELINE PROGRESS EMERGENCE */}
          <div className="w-full max-w-xl min-h-[110px] md:min-h-[150px] flex flex-col justify-end z-10">
            <AnimatePresence>
              {(currentStep === 'timeline' || currentStep === 'ready') && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="w-full space-y-4 md:space-y-6"
                >
                  {/* Progress bar and milestone */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 tracking-wider">
                      <span className="flex items-center gap-1.5 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                        Calibrating Temporal Horizon
                      </span>
                      <span className="text-primary font-bold">{loaderTimeline[timelineIndex].year}</span>
                    </div>

                    {/* Progress Line */}
                    <div className="relative w-full bg-zinc-900/80 h-1.5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                      <motion.div
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-rose-400"
                        initial={{ width: "0%" }}
                        animate={{ width: `${((timelineIndex + 1) / loaderTimeline.length) * 100}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        style={{ boxShadow: '0 0 8px rgba(255,181,160,0.6)' }}
                      />
                    </div>
                  </div>

                  {/* Sequence list ticker */}
                  <div className="h-14 overflow-hidden relative">
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={timelineIndex}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-start gap-3 bg-zinc-900/30 backdrop-blur-md p-3 rounded-xl border border-white/5 text-left"
                      >
                        <span className="text-primary font-mono text-xs font-bold whitespace-nowrap">
                          {loaderTimeline[timelineIndex].year}
                        </span>
                        <span className="text-zinc-300 font-mono text-xs leading-none pt-0.5">
                          {loaderTimeline[timelineIndex].milestone}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Button Action */}
        <div className="w-full flex flex-col items-center justify-center pt-4 border-t border-white/5 min-h-[90px] z-10">
          <AnimatePresence>
            {currentStep === 'ready' && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-full max-w-sm"
              >
                <button
                  onClick={onEnter}
                  className="w-full relative py-3.5 bg-primary text-zinc-950 font-mono text-xs font-extrabold tracking-[0.25em] rounded-xl hover:bg-white hover:text-black transition-all duration-300 group shadow-[0_0_30px_rgba(255,181,160,0.4)] hover:shadow-[0_0_45px_rgba(255,255,255,0.6)] flex items-center justify-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  ENTER CHRONOVERSE
                  <span className="absolute -inset-0.5 rounded-xl border border-primary opacity-30 group-hover:scale-105 transition-transform duration-300" />
                </button>
                <p className="text-[10px] font-mono text-zinc-500 text-center mt-3">
                  Tap to synchronize spatial audio and enter
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
