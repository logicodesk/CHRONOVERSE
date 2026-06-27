import React, { useState } from 'react';
import { FuturityPrediction } from '../types';
import { AudioEngine } from '../utils/audio';
import { AnimatedText } from './AnimatedCounter';

interface FutureProps {
  predictions: FuturityPrediction[];
  accentColor: string;
}

export const InteractiveFuture: React.FC<FutureProps> = ({ predictions, accentColor }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const handleSelect = (idx: number) => {
    setActiveIdx(idx);
    AudioEngine.playClick();
  };

  const activePrediction = predictions[activeIdx] || predictions[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
        <h4 className="font-mono text-xs text-rose-400 tracking-widest uppercase">
          Kardashev Scale Progression Vector
        </h4>
      </div>

      {/* Holographic Timeline button grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {predictions.map((pred, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={pred.year}
              onClick={() => handleSelect(idx)}
              className={`p-3 rounded-lg text-left border relative overflow-hidden transition-all duration-300 ${
                isActive
                  ? 'border-rose-450 bg-rose-950/15 text-white shadow-[0_0_15px_rgba(244,63,94,0.2)] scale-102'
                  : 'border-white/5 bg-zinc-900/40 text-zinc-400 hover:border-white/20 hover:text-white'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 right-0 w-8 h-8 bg-rose-500/20 rounded-bl-lg flex items-center justify-center font-mono text-[9px] text-rose-300">
                  ACTV
                </div>
              )}
              <div className="text-sm font-bold font-mono tracking-wider mb-1">
                YEAR {pred.year}
              </div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 leading-none">
                {pred.gridTitle.split(' ')[0]} Exploration
              </div>
            </button>
          );
        })}
      </div>

      {/* Holographic interactive data card */}
      {activePrediction && (
        <div className="p-5 rounded-lg bg-zinc-950/80 border border-white/20 backdrop-blur-lg relative overflow-hidden">
          {/* Neon Glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono bg-rose-500/15 text-rose-300 border border-rose-500/20 px-2 py-0.5 rounded">
                FORECAST VECTORS UNLOCKED
              </span>
              <span className="text-[10px] font-mono text-zinc-500">YEAR PROJECTION: {activePrediction.year} CE</span>
            </div>

            <h5 className="text-xl font-display font-semibold text-white">
              {activePrediction.gridTitle}
            </h5>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/5 pt-4">
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-rose-400 uppercase tracking-widest font-bold">
                  Tech Breakthrough
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {activePrediction.techBreakthrough}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[10px] text-rose-400 uppercase tracking-widest font-bold">
                  Societal Integration
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {activePrediction.societalShift}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[10px] text-rose-400 uppercase tracking-widest font-bold">
                  Planetary Footprint
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {activePrediction.planetaryScale}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex gap-4 text-[9px] font-mono text-zinc-500 justify-between items-center">
              <div>
                ORGANIC HIVE OPTIMALITY: <span className="text-rose-400"><AnimatedText>100%</AnimatedText></span>
              </div>
              <div className="text-zinc-600">
                PROJECTION MARGIN OF ERROR: &lt; <AnimatedText>0.05%</AnimatedText>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
