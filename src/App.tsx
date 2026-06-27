import { useState, useEffect } from 'react';
import { EXHAUSTIVE_SLIDE_DATA } from './data';
import { AudioEngine } from './utils/audio';
import { AnimatePresence } from 'motion/react';

// Interactive Sub-components
import { InteractiveDinosaur } from './components/InteractiveDinosaur';
import { InteractiveCivilization } from './components/InteractiveCivilization';
import { InteractiveIndia } from './components/InteractiveIndia';
import { InteractiveEmpires } from './components/InteractiveEmpires';
import { InteractiveMedieval } from './components/InteractiveMedieval';
import { InteractiveExploration } from './components/InteractiveExploration';
import { InteractiveIndustrial } from './components/InteractiveIndustrial';
import { InteractiveModern } from './components/InteractiveModern';
import { InteractiveFuture } from './components/InteractiveFuture';
import { ChronoverseFinale } from './components/ChronoverseFinale';
import { AnimatedBackground } from './components/AnimatedBackground';
import { AnimatedText } from './components/AnimatedCounter';
import { EraTransitionCinematic } from './components/EraTransitionCinematic';
import { DiscoveryPanel } from './components/DiscoveryPanel';
import { ChampionshipIntro } from './components/ChampionshipIntro';

// Lucide Icons
import {
  Volume2,
  VolumeX,
  Compass,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles,
  Info,
  CalendarDays
} from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);
  const [activeSlide, setActiveSlide] = useState(1); // 1 to 10
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [playedEras, setPlayedEras] = useState<number[]>([]);
  const [transitionEra, setTransitionEra] = useState<number | null>(null);
  const [showDiscovery, setShowDiscovery] = useState(false);

  // Dynamic colors matching existing slide designs
  const getSlideThemeDetails = (id: number) => {
    switch (id) {
      case 1:
        return {
          glowColor: 'rgba(16, 185, 129, 0.45)',
          bgSolid: '#10b981',
          borderClass: 'border-emerald-500/70',
          bgClass: 'bg-emerald-500/10',
          shadowClass: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]',
        };
      case 2:
        return {
          glowColor: 'rgba(245, 158, 11, 0.45)',
          bgSolid: '#f59e0b',
          borderClass: 'border-amber-500/70',
          bgClass: 'bg-amber-500/10',
          shadowClass: 'shadow-[0_0_15px_rgba(245,158,11,0.3)]',
        };
      case 3:
        return {
          glowColor: 'rgba(249, 115, 22, 0.45)',
          bgSolid: '#f97316',
          borderClass: 'border-orange-500/70',
          bgClass: 'bg-orange-500/10',
          shadowClass: 'shadow-[0_0_15px_rgba(249,115,22,0.3)]',
        };
      case 4:
        return {
          glowColor: 'rgba(239, 68, 68, 0.45)',
          bgSolid: '#ef4444',
          borderClass: 'border-red-500/70',
          bgClass: 'bg-red-500/10',
          shadowClass: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]',
        };
      case 5:
        return {
          glowColor: 'rgba(56, 189, 248, 0.45)',
          bgSolid: '#38bdf8',
          borderClass: 'border-sky-500/70',
          bgClass: 'bg-sky-500/10',
          shadowClass: 'shadow-[0_0_15px_rgba(56,189,248,0.3)]',
        };
      case 6:
        return {
          glowColor: 'rgba(20, 184, 166, 0.45)',
          bgSolid: '#14b8a6',
          borderClass: 'border-teal-500/70',
          bgClass: 'bg-teal-500/10',
          shadowClass: 'shadow-[0_0_15px_rgba(20,184,166,0.3)]',
        };
      case 7:
        return {
          glowColor: 'rgba(168, 85, 247, 0.45)',
          bgSolid: '#a855f7',
          borderClass: 'border-purple-500/70',
          bgClass: 'bg-purple-500/10',
          shadowClass: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]',
        };
      case 8:
        return {
          glowColor: 'rgba(99, 102, 241, 0.45)',
          bgSolid: '#6366f1',
          borderClass: 'border-indigo-500/70',
          bgClass: 'bg-indigo-500/10',
          shadowClass: 'shadow-[0_0_15px_rgba(99,102,241,0.3)]',
        };
      case 9:
        return {
          glowColor: 'rgba(244, 63, 94, 0.45)',
          bgSolid: '#f43f5e',
          borderClass: 'border-rose-500/70',
          bgClass: 'bg-rose-500/10',
          shadowClass: 'shadow-[0_0_15px_rgba(244,63,94,0.3)]',
        };
      case 10:
      default:
        return {
          glowColor: 'rgba(255, 181, 160, 0.42)',
          bgSolid: '#ffb5a0',
          borderClass: 'border-primary',
          bgClass: 'bg-primary/10',
          shadowClass: 'shadow-[0_0_15px_rgba(255,181,160,0.3)]',
        };
    }
  };

  // Scroll position, progress tracking and scroll-to-top reset
  useEffect(() => {
    // Reset window scroll when active slide/era changes
    window.scrollTo(0, 0);
    setScrollProgress(0);

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress(scrollTop / scrollHeight);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Initial triggers for accurate progress after rendering cycles
    const timer1 = setTimeout(handleScroll, 100);
    const timer2 = setTimeout(handleScroll, 400);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [activeSlide]);

  // Loading Steps
  const loaderTimeline = [
    { year: "-13.8B Years", milestone: "The Big Bang — Universe Ignition" },
    { year: "-4.5B Years", milestone: "Earth Formation & Core Coalescence" },
    { year: "-230M Years", milestone: "Age of Giants — Dinosaur Dominance" },
    { year: "-10,000 Years", milestone: "Dawn of Cities — Agricultural Revolution" },
    { year: "-2,500 Years", milestone: "Golden Age of Indian Wisdom & Science" },
    { year: "2026", milestone: "Digital & Modern Information Age" },
    { year: "Future", milestone: "Mars Colonization & Star Voyage Era... Ready." }
  ];

  // Auto-increment loading steps for cinematic timeline effect
  useEffect(() => {
    if (loading && loadingStep < loaderTimeline.length - 1) {
      const timer = setTimeout(() => {
        setLoadingStep((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [loading, loadingStep, loaderTimeline.length]);

  const handleEnterApp = () => {
    setLoading(false);
    // Auto-enable sound if browser allows to create immediate immersion
    toggleSound(true);
    AudioEngine.playSuccess();
  };

  const toggleSound = (forceState?: boolean) => {
    const targetState = forceState !== undefined ? forceState : !soundEnabled;
    setSoundEnabled(targetState);
    if (targetState) {
      AudioEngine.startAmbient();
    } else {
      AudioEngine.stopAmbient();
    }
  };

  const handleNextSlide = () => {
    if (activeSlide < 10) {
      setActiveSlide((prev) => prev + 1);
      AudioEngine.playSweep();
    }
  };

  const handlePrevSlide = () => {
    if (activeSlide > 1) {
      setActiveSlide((prev) => prev - 1);
      AudioEngine.playSweep();
    }
  };

  const handleJumpToSlide = (id: number) => {
    setActiveSlide(id);
    AudioEngine.playSweep();
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        handleNextSlide();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        handlePrevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlide]);

  // Trigger cinematic transitions once per era when activeSlide changes
  useEffect(() => {
    if (!loading) {
      if (!playedEras.includes(activeSlide)) {
        setTransitionEra(activeSlide);
        setPlayedEras((prev) => [...prev, activeSlide]);
      }
    }
  }, [activeSlide, loading, playedEras]);

  const getEraTransitionData = (id: number) => {
    if (id === 10) {
      return {
        title: "The Story of Time",
        year: "Eternity",
        subtitle: "Temporal integration complete"
      };
    }
    const slide = EXHAUSTIVE_SLIDE_DATA.find((s) => s.id === id);
    return {
      title: slide?.title || "",
      year: slide?.eraName || "",
      subtitle: slide?.subtitle || ""
    };
  };

  // Retrieve current slide's structured data
  const currentSlide = EXHAUSTIVE_SLIDE_DATA.find((s) => s.id === activeSlide);

  return (
    <div className="relative min-h-screen bg-stone-950 text-on-surface font-sans selection:bg-rose-500/30 selection:text-white hide-scrollbar overflow-hidden">
      
      {/* ⚠️ INTRO LOAD SCREEN WITH ANIMATED TIMELINE */}
      {loading && (
        <ChampionshipIntro 
          onEnter={handleEnterApp} 
          soundEnabled={soundEnabled} 
          toggleSound={toggleSound} 
        />
      )}

      {/* GLOBAL BACKGROUND METEOR/DUST PARTICLES */}
      {!loading && <AnimatedBackground activeSlide={activeSlide} />}

      {/* MAIN APPLICATION FRAME */}
      {!loading && (
        <div className={`transition-all duration-700 ease-in-out ${transitionEra !== null ? 'opacity-30 filter blur-[2px] pointer-events-none' : 'opacity-100 filter blur-none'}`}>
          {/* TOP HEADER */}
          <header className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/60 backdrop-blur-lg border-b border-white/20 flex justify-between items-center px-12 md:pl-72 py-5 transition-transform duration-500">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-primary animate-pulse" />
          <span className="font-mono text-xs text-primary/80 tracking-widest font-semibold">
            CHRONOVERSE RESIDENTIAL HUB
          </span>
        </div>
        
        {/* Interactions controls */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setShowInfoModal(true)}
            className="text-zinc-400 hover:text-white transition-colors"
            title="Sovereign info ledger"
          >
            <Info className="w-5 h-5" />
          </button>

          {/* Sound Synthesizer toggle */}
          <button
            onClick={() => toggleSound()}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-zinc-900/40 text-xs font-mono text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-tertiary" />
                <span className="text-tertiary animate-pulse">SOUND ON</span>
                {/* Simulated equalizer wave */}
                <div className="flex gap-[2px] items-end h-3">
                  <span className="w-[1.5px] bg-tertiary animate-[float_0.8s_infinite] h-2"></span>
                  <span className="w-[1.5px] bg-tertiary animate-[float_1.2s_infinite] h-3"></span>
                  <span className="w-[1.5px] bg-tertiary animate-[float_1s_infinite] h-1.5"></span>
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-zinc-500" />
                <span className="text-zinc-400">MUTED</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* LEFT SIDEBAR NAVIGATION (DESKTOP) */}
      <aside className="fixed left-0 top-0 bottom-0 z-40 w-64 bg-zinc-950 border-r border-white/5 py-6 px-5 hidden md:flex flex-col justify-between overflow-y-auto hide-scrollbar">
        <div className="space-y-6">
          {/* Logo brand */}
          <div className="space-y-2">
            <h2 className="font-display text-3xl font-extrabold text-primary tracking-tighter">
              CHRONOVERSE
            </h2>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest font-semibold">TEMPORAL SCAN ACTIVE</span>
            </div>
          </div>

          {/* List of 10 slides */}
          <nav className="flex flex-col gap-2">
            {EXHAUSTIVE_SLIDE_DATA.map((slide) => {
              const isActive = slide.id === activeSlide;
              const themeDetails = getSlideThemeDetails(slide.id);
              return (
                <button
                  key={slide.id}
                  onClick={() => handleJumpToSlide(slide.id)}
                  className={`py-2 px-3 rounded-lg border text-left font-mono text-xs transition-all duration-300 relative overflow-visible flex items-center justify-between group ${
                    isActive
                      ? 'text-white font-bold'
                      : 'border-white/5 text-zinc-400 hover:bg-white/5 hover:text-white'
                  }`}
                  style={isActive ? {
                    borderColor: themeDetails.bgSolid,
                    backgroundColor: `${themeDetails.bgSolid}1a`,
                    boxShadow: `0 0 14px ${themeDetails.glowColor}, inset 0 0 4px ${themeDetails.glowColor}`
                  } : undefined}
                >
                  {/* Subtle animated pulse around the currently active era */}
                  {isActive && (
                    <span 
                      className="absolute inset-0 rounded-lg pointer-events-none animate-subtle-pulse"
                      style={{ 
                        border: `1px solid ${themeDetails.bgSolid}`,
                        margin: '-1px'
                      }}
                    />
                  )}
                  {/* Thin progress indicator */}
                  {isActive && (
                    <div 
                      className="absolute bottom-0 left-0 h-[2px] rounded-b-md transition-all duration-150 ease-out"
                      style={{ 
                        width: `${scrollProgress * 100}%`,
                        backgroundColor: themeDetails.bgSolid,
                        boxShadow: `0 0 6px ${themeDetails.bgSolid}`
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="font-bold" style={{ color: isActive ? themeDetails.bgSolid : undefined }}>0{slide.id}.</span> 
                    {slide.title}
                  </span>
                  <span className={`text-[9px] relative z-10`} style={{ color: isActive ? themeDetails.bgSolid : undefined }}>
                    ➔
                  </span>
                </button>
              );
            })}

            {/* Slide 10 button */}
            {(() => {
              const isActive = activeSlide === 10;
              const themeDetails = getSlideThemeDetails(10);
              return (
                <button
                  onClick={() => handleJumpToSlide(10)}
                  className={`py-2 px-3 rounded-lg border text-left font-mono text-xs transition-all duration-300 relative overflow-visible flex items-center justify-between group ${
                    isActive
                      ? 'text-white font-bold'
                      : 'border-white/5 text-zinc-400 hover:bg-white/5 hover:text-white'
                  }`}
                  style={isActive ? {
                    borderColor: themeDetails.bgSolid,
                    backgroundColor: `${themeDetails.bgSolid}1a`,
                    boxShadow: `0 0 14px ${themeDetails.glowColor}, inset 0 0 4px ${themeDetails.glowColor}`
                  } : undefined}
                >
                  {/* Subtle animated pulse around the currently active era */}
                  {isActive && (
                    <span 
                      className="absolute inset-0 rounded-lg pointer-events-none animate-subtle-pulse"
                      style={{ 
                        border: `1px solid ${themeDetails.bgSolid}`,
                        margin: '-1px'
                      }}
                    />
                  )}
                  {/* Thin progress indicator */}
                  {isActive && (
                    <div 
                      className="absolute bottom-0 left-0 h-[2px] rounded-b-md transition-all duration-150 ease-out"
                      style={{ 
                        width: `${scrollProgress * 100}%`,
                        backgroundColor: themeDetails.bgSolid,
                        boxShadow: `0 0 6px ${themeDetails.bgSolid}`
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="font-bold" style={{ color: isActive ? themeDetails.bgSolid : undefined }}>10.</span> Finale
                  </span>
                  <span className={`text-[9px] relative z-10`} style={{ color: isActive ? themeDetails.bgSolid : undefined }}>
                    ➔
                  </span>
                </button>
              );
            })()}
          </nav>
        </div>

        {/* Global Statistics ticker on Sidebar */}
        <div className="pt-6 border-t border-white/5 text-xs font-mono text-zinc-500 space-y-1 tracking-tight">
          <div className="flex justify-between">
            <span className="uppercase text-[10px]">T-Coordinate:</span>
            <span className="text-primary">E-{9 - activeSlide}X72</span>
          </div>
          <div className="flex justify-between">
            <span className="uppercase text-[10px]">Active Entropy:</span>
            <span className="text-white">
              <AnimatedText>0.32%</AnimatedText>
            </span>
          </div>
        </div>
      </aside>

      {/* CORE CANVAS WORKSPACE */}
      <main className="md:pl-64 pt-24 min-h-screen pb-16 relative z-10 flex flex-col justify-between">
        
        {/* CURRENT SLIDE RENDER */}
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-8 w-full">
          {activeSlide <= 9 && currentSlide ? (
            <div className="space-y-12">
              
              {/* Slide Hero Header */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-white/5 pb-8">
                
                {/* Left col: Title, Subtitle, and metadata block */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 text-[10px] font-mono bg-zinc-900 border border-white/10 text-primary font-bold rounded-full uppercase tracking-wider">
                      {currentSlide.eraName}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">ERA PROLOGUE LOG</span>
                  </div>

                  <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tighter leading-tight">
                    {currentSlide.title} <span className="text-primary/75">{currentSlide.subtitle}</span>
                  </h2>

                  <p className="text-sm md:text-base text-zinc-400 font-sans leading-relaxed max-w-2xl">
                    {currentSlide.summary}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      id="explore-deeper-btn"
                      onClick={() => setShowDiscovery(true)}
                      className="group relative flex items-center gap-2.5 px-5 py-2.5 rounded-lg border text-xs font-mono font-bold uppercase tracking-wider bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 active:scale-95 cursor-pointer overflow-hidden shadow-sm"
                    >
                      <span 
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                        style={{ backgroundColor: getSlideThemeDetails(activeSlide).bgSolid }}
                      />
                      <Sparkles 
                        className="w-4 h-4 transition-transform duration-500 group-hover:rotate-12" 
                        style={{ color: getSlideThemeDetails(activeSlide).bgSolid }}
                      />
                      <span>Explore Deeper</span>
                    </button>
                  </div>
                </div>

                {/* Right col: Image Frame */}
                <div className="lg:col-span-4 relative rounded-xl overflow-hidden h-40 border border-white/5 shadow-lg group">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10"></div>
                  <img 
                    alt={currentSlide.title}
                    src={currentSlide.theme.bgUrl}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  />
                  <div className="absolute bottom-3 left-4 z-20 font-mono text-[9px] uppercase tracking-widest text-zinc-400 bg-zinc-950/80 px-2 py-0.5 rounded">
                    Chronoview active
                  </div>
                </div>

              </div>

              {/* Informative Bullets & Interactive sandbox grid split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Narrative Bullets */}
                <div className="lg:col-span-4 space-y-4 text-zinc-300">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                    <CalendarDays className="w-4 h-4 text-primary" />
                    <span className="font-mono text-xs uppercase tracking-widest font-bold text-zinc-400">Core Narratives</span>
                  </div>
                  <ul className="space-y-4 text-xs font-sans">
                    {currentSlide.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start">
                        <span className="text-primary font-bold font-mono">0{idx+1}.</span>
                        <p className="leading-relaxed">{bullet}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Switchable Interactive Module */}
                <div className="lg:col-span-8 p-6 rounded-xl border border-white/20 bg-zinc-950/50 backdrop-blur-lg shadow-2xl">
                  {activeSlide === 1 && currentSlide.hotspots && (
                    <InteractiveDinosaur 
                      hotspots={currentSlide.hotspots} 
                      accentColor={currentSlide.theme.accentColor} 
                    />
                  )}
                  {activeSlide === 2 && currentSlide.timeline && (
                    <InteractiveCivilization 
                      timeline={currentSlide.timeline} 
                      accentColor={currentSlide.theme.accentColor} 
                    />
                  )}
                  {activeSlide === 3 && currentSlide.hotspots && (
                    <InteractiveIndia 
                      hotspots={currentSlide.hotspots} 
                      accentColor={currentSlide.theme.accentColor} 
                    />
                  )}
                  {activeSlide === 4 && currentSlide.empires && (
                    <InteractiveEmpires 
                      empires={currentSlide.empires} 
                      accentColor={currentSlide.theme.accentColor} 
                    />
                  )}
                  {activeSlide === 5 && currentSlide.medievalTech && (
                    <InteractiveMedieval 
                      techs={currentSlide.medievalTech} 
                      accentColor={currentSlide.theme.accentColor} 
                    />
                  )}
                  {activeSlide === 6 && currentSlide.explorerRoutes && (
                    <InteractiveExploration 
                      routes={currentSlide.explorerRoutes} 
                      accentColor={currentSlide.theme.accentColor} 
                    />
                  )}
                  {activeSlide === 7 && currentSlide.timeline && (
                    <InteractiveIndustrial 
                      timeline={currentSlide.timeline} 
                      accentColor={currentSlide.theme.accentColor} 
                    />
                  )}
                  {activeSlide === 8 && currentSlide.hotspots && (
                    <InteractiveModern 
                      hotspots={currentSlide.hotspots} 
                      accentColor={currentSlide.theme.accentColor} 
                    />
                  )}
                  {activeSlide === 9 && currentSlide.predictions && (
                    <InteractiveFuture 
                      predictions={currentSlide.predictions} 
                      accentColor={currentSlide.theme.accentColor} 
                    />
                  )}
                </div>

              </div>

            </div>
          ) : (
            // SLIDE 10 — CHRONOVERSE FINALE Custom layout
            <div className="space-y-10">
              <div className="text-center space-y-4 max-w-3xl mx-auto border-b border-white/5 pb-8">
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="font-mono text-xs text-primary tracking-[0.3em] font-semibold uppercase">Temporal Synthesis Complete</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tighter">
                  The Story of Time
                </h2>
                <h4 className="font-mono text-sm text-zinc-400">"Every Era Shaped the Future."</h4>
                <p className="text-sm text-zinc-400 font-sans max-w-2xl mx-auto">
                  Evaluate complete historical metrics, compare development thresholds side-by-side, and find how civilizations scale exponentially across dimensions of population, communication latency, and planetary energy harvests.
                </p>
              </div>

              {/* Finale comparison & jumping dashboard */}
              <div className="grid grid-cols-1 gap-8">
                <ChronoverseFinale />
              </div>

              {/* Inspiring Final Call to Action */}
              <div className="p-8 rounded-xl bg-gradient-to-r from-primary/10 via-zinc-950/80 to-primary/10 border border-white/10 text-center space-y-4">
                <h5 className="font-display text-2xl text-white italic">
                  "History Is Not The Past. It Is The Foundation Of Tomorrow."
                </h5>
                <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                  Chronoverse Deep Exploration Deck — Operational Complete
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => handleJumpToSlide(1)}
                    className="px-6 py-2.5 font-mono text-xs text-primary border border-primary/30 rounded-lg bg-primary/5 hover:bg-primary hover:text-zinc-950 transition-all duration-300"
                  >
                    RESET TIMELINE VECTORS
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM STEPS INDICATORS */}
        <div className="max-w-xl mx-auto flex items-center justify-between w-full px-6 sticky bottom-4 z-40 bg-zinc-950/85 backdrop-blur-lg pb-4 pt-2 rounded-xl border border-white/20">
          <button
            onClick={handlePrevSlide}
            disabled={activeSlide === 1}
            className={`p-2.5 rounded-lg border transition-all ${
              activeSlide === 1
                ? 'border-white/5 bg-zinc-900/20 text-zinc-600 cursor-not-allowed'
                : 'border-white/10 bg-zinc-900 text-primary hover:bg-white/10'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Miniature step indicators */}
          <div className="flex gap-2 items-center">
            {EXHAUSTIVE_SLIDE_DATA.map((slide) => (
              <button
                key={slide.id}
                onClick={() => handleJumpToSlide(slide.id)}
                className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 ${
                  activeSlide === slide.id
                    ? 'bg-primary border-primary scale-120'
                    : 'bg-zinc-900 border-white/10 hover:border-white/40'
                }`}
                title={slide.title}
              />
            ))}
            {/* Finale indicator circle */}
            <button
              onClick={() => handleJumpToSlide(10)}
              className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 ${
                activeSlide === 10
                  ? 'bg-primary border-primary scale-120'
                  : 'bg-zinc-900 border-white/10 hover:border-white/40'
              }`}
              title="Chronoverse Finale"
            />
          </div>

          <button
            onClick={handleNextSlide}
            disabled={activeSlide === 10}
            className={`p-2.5 rounded-lg border transition-all ${
              activeSlide === 10
                ? 'border-white/5 bg-zinc-900/20 text-zinc-600 cursor-not-allowed'
                : 'border-white/10 bg-zinc-900 text-primary hover:bg-white/10'
            }`}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </main>
        </div>
      )}

      {/* MODAL WINDOW FOR INFORMATION */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-zinc-950/80 backdrop-blur-sm">
          <div className="max-w-md w-full p-6 glass-panel rounded-xl border border-white/20 bg-zinc-950/85 backdrop-blur-lg space-y-4">
            <h3 className="font-display text-xl font-bold text-primary">Chronoverse Ledger</h3>
            <div className="font-sans text-xs text-zinc-400 space-y-3 leading-relaxed">
              <p>
                Welcome to <strong>Chronoverse: The Story of Time</strong>, an interactive documentary-grade historical presentation exploring the complete history of Earth and Humanity.
              </p>
              <p>
                Utilize the left sidebar menu or the arrows at the bottom of the screen to smoothly traverse among the 9 active chapters and our finale comparison metrics module. 
              </p>
              <p>
                Toggle the spatial <strong>Sound</strong> controller to enjoy procedurally generated ambient frequencies aligned dynamically with historical steps.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => setShowInfoModal(false)}
                className="w-full py-2.5 bg-primary text-zinc-950 font-mono text-xs font-bold rounded-lg hover:bg-white transition-colors"
              >
                DISMISS LEDGER
              </button>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {transitionEra !== null && (() => {
          const eraData = getEraTransitionData(transitionEra);
          const theme = getSlideThemeDetails(transitionEra);
          return (
            <EraTransitionCinematic
              key={transitionEra}
              id={transitionEra}
              title={eraData.title}
              year={eraData.year}
              subtitle={eraData.subtitle}
              glowColor={theme.glowColor}
              bgSolid={theme.bgSolid}
              onComplete={() => setTransitionEra(null)}
            />
          );
        })()}
      </AnimatePresence>

      <DiscoveryPanel 
        isOpen={showDiscovery}
        eraId={activeSlide}
        onClose={() => setShowDiscovery(false)}
        theme={getSlideThemeDetails(activeSlide)}
      />

    </div>
  );
}
