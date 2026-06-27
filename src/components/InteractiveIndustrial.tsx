import React, { useState } from 'react';
import { TimelineItem } from '../types';
import { AudioEngine } from '../utils/audio';
import { AnimatedCounter } from './AnimatedCounter';

interface IndustrialProps {
  timeline: TimelineItem[];
  accentColor: string;
}

export const InteractiveIndustrial: React.FC<IndustrialProps> = ({ timeline, accentColor }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [pressure, setPressure] = useState<number>(65);
  const [gearsConnected, setGearsConnected] = useState<boolean>(true);

  const handleSelect = (idx: number) => {
    setActiveIdx(idx);
    // Alter pressure values playfully
    setPressure(40 + (idx * 18) + (gearsConnected ? 12 : 0));
    AudioEngine.playClick();
  };

  const toggleGears = () => {
    setGearsConnected(prev => !prev);
    setPressure(prev => prev + (gearsConnected ? -20 : 20));
    AudioEngine.playSweep();
  };

  const selectedItem = timeline[activeIdx] || timeline[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      
      {/* Column 1: Mechanical Valve and Spinning Gears HUD */}
      <div className="lg:col-span-5 flex flex-col items-center justify-center p-5 rounded-lg bg-zinc-950/85 border border-white/5 space-y-4 relative overflow-hidden">
        
        {/* Animated Gears representation in CSS and SVG */}
        <div className="relative flex justify-center items-center h-36 w-36 gap-2">
          {/* Main Gear */}
          <div 
            className={`w-24 h-24 rounded-full border-4 border-dashed border-purple-500 flex items-center justify-center ${
              gearsConnected ? 'animate-[spin_10s_linear_infinite]' : 'opacity-60'
            }`}
          >
            <div className="w-16 h-16 rounded-full border-4 border-zinc-900 border-t-purple-400 bg-zinc-950 flex items-center justify-center">
              <span className="material-symbols-outlined text-purple-400 text-xs">settings</span>
            </div>
          </div>

          {/* Intercepting Small Gear */}
          <div 
            className={`w-14 h-14 rounded-full border-4 border-dashed border-purple-400 absolute right-1 top-4 flex items-center justify-center ${
              gearsConnected ? 'animate-[spin_6s_linear_infinite_reverse]' : 'opacity-60'
            }`}
          >
            <div className="w-8 h-8 rounded-full border border-zinc-900 bg-zinc-950"></div>
          </div>
        </div>

        {/* Control Board */}
        <div className="w-full space-y-2 text-xs font-mono">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-zinc-500">KINETIC GEAR COUPLING</span>
            <span className={gearsConnected ? 'text-purple-400' : 'text-zinc-500'}>
              {gearsConnected ? 'ENGAGED (60 RPM)' : 'DISENGAGED (STALL)'}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={toggleGears}
              className={`flex-1 py-2 text-center border font-bold rounded transition-all ${
                gearsConnected
                  ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                  : 'border-white/10 text-zinc-400 hover:border-white/20'
              }`}
            >
              {gearsConnected ? 'Disconnect Gear Clutch' : 'Engage Gear Clutch'}
            </button>
          </div>

          {/* Steam Pressure Slider representation */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-zinc-500">STEAM CONDENSER PRESSURE</span>
              <span className="text-purple-300 font-bold">
                <AnimatedCounter value={pressure} /> PSI
              </span>
            </div>
            <div className="w-full bg-zinc-900 h-2 rounded overflow-hidden relative">
              <div 
                className="h-full bg-purple-500 transition-all duration-300 shadow-[0_0_8px_#a855f7]"
                style={{ width: `${pressure}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Column 2: Industrial Milestones Selection */}
      <div className="lg:col-span-7 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 bg-purple-500 rounded-full animate-ping"></span>
          <h4 className="font-mono text-xs text-purple-400 tracking-widest uppercase">
            Watt & Stephenson Patents Journal
          </h4>
        </div>

        <div className="flex flex-wrap gap-2">
          {timeline.map((item, idx) => (
            <button
              key={item.year}
              onClick={() => handleSelect(idx)}
              className={`px-3 py-1.5 text-xs font-mono rounded border transition-all duration-300 ${
                activeIdx === idx
                  ? 'border-purple-400 bg-purple-500/10 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.15)] font-semibold'
                  : 'border-white/5 bg-zinc-900/30 text-zinc-400 hover:border-white/20 hover:text-white'
              }`}
            >
              {item.year}: {item.title}
            </button>
          ))}
        </div>

        {selectedItem && (
          <div className="p-5 rounded-lg bg-zinc-950/80 border border-white/20 backdrop-blur-lg space-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <span className="text-[9px] font-mono bg-purple-500/15 text-purple-350 border border-purple-500/20 px-2 py-0.5 rounded uppercase">
              Industrial Milestone: {selectedItem.year}
            </span>

            <h5 className="text-xl font-display font-semibold text-white">
              {selectedItem.title}
            </h5>

            <p className="text-sm text-zinc-400 leading-relaxed">
              {selectedItem.description}
            </p>

            <div className="pt-2 border-t border-white/5 flex gap-4 text-[10px] font-mono text-zinc-500">
              <div>
                FUEL CLASS: <span className="text-purple-300">Coal / Superheated Steam</span>
              </div>
              <div>
                VALVE SECURITY: <span className="text-emerald-400">Stable</span>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
