import React, { useState } from 'react';
import { TimelineItem } from '../types';
import { AudioEngine } from '../utils/audio';
import { AnimatedText } from './AnimatedCounter';

interface CivilizationProps {
  timeline: TimelineItem[];
  accentColor: string;
}

export const InteractiveCivilization: React.FC<CivilizationProps> = ({ timeline, accentColor }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const handleSelect = (idx: number) => {
    setActiveIdx(idx);
    AudioEngine.playClick();
  };

  const activeItem = timeline[activeIdx] || timeline[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-amber-400 rounded-full animate-ping"></span>
        <h4 className="font-mono text-xs text-amber-400/80 tracking-widest uppercase">
          Tigris & Euphrates Progress Log
        </h4>
      </div>

      {/* Horizontal timeline bar */}
      <div className="relative mt-8">
        <div className="absolute top-1/2 left-0 h-[2px] bg-zinc-800 w-full transform -translate-y-1/2 roundedUnit"></div>
        {/* Dynamic completed track fill */}
        <div 
          className="absolute top-1/2 left-0 h-[2px] bg-amber-400 transform -translate-y-1/2 roundedUnit transition-all duration-500"
          style={{ width: `${(activeIdx / (timeline.length - 1)) * 100}%` }}
        ></div>

        <div className="relative flex justify-between">
          {timeline.map((item, idx) => {
            const isCompleted = idx <= activeIdx;
            const isActive = idx === activeIdx;

            return (
              <button
                key={item.year}
                onClick={() => handleSelect(idx)}
                className="flex flex-col items-center group relative focus:outline-none"
              >
                {/* Node circle */}
                <div 
                  className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 ${
                    isActive
                      ? 'bg-zinc-950 border-amber-400 text-amber-400 scale-110 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                      : isCompleted
                      ? 'bg-amber-500 border-amber-500 text-zinc-950 hover:scale-105'
                      : 'bg-zinc-900 border-zinc-700 text-zinc-500 hover:border-zinc-400 hover:text-zinc-300'
                  }`}
                >
                  <span className="text-[10px] font-bold font-mono">
                    {idx + 1}
                  </span>
                </div>

                {/* Micro Label */}
                <span className={`text-[11px] font-mono font-semibold mt-2 transition-all ${
                  isActive ? 'text-amber-400 scale-105' : 'text-zinc-500 group-hover:text-zinc-300'
                }`}>
                  {item.year}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Milestones details */}
      {activeItem && (
        <div className="p-5 rounded-lg bg-zinc-950/80 border border-white/20 backdrop-blur-lg flex flex-col md:flex-row gap-5 relative">
          <div className="flex-1 space-y-2">
            <div className="text-[10px] font-mono text-amber-500 leading-none tracking-widest uppercase">
              Milestone Active Era
            </div>
            <h5 className="text-xl font-display font-semibold text-white">
              {activeItem.title}
            </h5>
            <p className="text-sm text-zinc-400 leading-relaxed">
              <AnimatedText>{activeItem.description}</AnimatedText>
            </p>
          </div>

          <div className="w-full md:w-56 p-4 rounded bg-zinc-900/40 border border-white/5 space-y-3 font-mono text-xs">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-zinc-500 uppercase tracking-widest">Scribe registry</span>
              <span className="text-amber-400 font-semibold">Active</span>
            </div>
            <div className="space-y-1">
              <span className="text-zinc-500 uppercase tracking-widest block">Sumerian Cuneiform Equivalent</span>
              <div className="text-base text-zinc-350 p-2 bg-zinc-950/80 rounded border border-white/5 font-sans whitespace-nowrap text-center">
                 楔形文字 |  🪵 🌾 🌊 
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
