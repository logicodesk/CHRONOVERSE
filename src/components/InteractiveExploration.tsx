import React, { useState } from 'react';
import { ExplorerRoute } from '../types';
import { AudioEngine } from '../utils/audio';

interface ExplorationProps {
  routes: ExplorerRoute[];
  accentColor: string;
}

export const InteractiveExploration: React.FC<ExplorationProps> = ({ routes, accentColor }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const handleSelect = (idx: number) => {
    setActiveIdx(idx);
    AudioEngine.playClick();
  };

  const selectedRoute = routes[activeIdx] || routes[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-teal-500 rounded-full animate-ping"></span>
        <h4 className="font-mono text-xs text-teal-400 tracking-widest uppercase">
          Oceanic Chart Ledger
        </h4>
      </div>

      {/* Selector Tabs */}
      <div className="flex bg-zinc-900/50 p-1.5 rounded-lg border border-white/5 gap-2">
        {routes.map((route, idx) => (
          <button
            key={route.explorer}
            onClick={() => handleSelect(idx)}
            className={`flex-1 py-2 text-xs font-mono rounded transition-all duration-300 ${
              activeIdx === idx
                ? 'bg-teal-500 text-zinc-950 font-bold shadow-[0_0_12px_rgba(20,184,166,0.3)]'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {route.explorer}
          </button>
        ))}
      </div>

      {/* Simulated Map Visual */}
      <div className="relative h-44 rounded-lg bg-zinc-950 border border-white/5 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>
        
        {/* Decorative Compass Circle */}
        <div className="absolute w-36 h-36 rounded-full border border-teal-500/20 flex items-center justify-center animate-[spin_240s_linear_infinite]">
          <div className="w-28 h-28 rounded-full border border-teal-500/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-teal-500/10 text-5xl">explore</span>
          </div>
          {/* Degree ticks */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-3 bg-teal-500/20"
              style={{ transform: `rotate(${i * 30}deg) translateY(-64px)` }}
            ></div>
          ))}
        </div>

        {/* Dynamic Route Indicator */}
        <div className="z-10 text-center space-y-1 p-4">
          <div className="text-[10px] font-mono text-teal-400 uppercase tracking-widest leading-none">
            Active Charter Voyage
          </div>
          <div className="text-xl font-display font-bold text-white transition-all duration-500">
            {selectedRoute.origin} ➔ {selectedRoute.destinations}
          </div>
          <div className="text-xs font-mono text-zinc-500">
            Navigator Vessel: {selectedRoute.ship}
          </div>
        </div>

        <div className="absolute top-2 left-3 text-[8px] font-mono text-zinc-600">
          SEXTANT ALIGNMENT: OK
        </div>
      </div>

      {/* Navigator details panel */}
      {selectedRoute && (
        <div className="p-5 rounded-lg bg-zinc-950/80 border border-white/20 backdrop-blur-lg grid grid-cols-1 md:grid-cols-12 gap-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="md:col-span-8 space-y-2">
            <span className="text-[10px] font-mono bg-teal-500/15 text-teal-350 border border-teal-500/25 px-2 py-0.5 rounded">
              VOYAGE CHRONOLOGY: {selectedRoute.years}
            </span>
            <h5 className="text-xl font-display font-semibold text-white">
              {selectedRoute.explorer}
            </h5>
            <p className="text-sm text-zinc-400 leading-relaxed">
              <strong className="text-zinc-200">Global Catalyst:</strong> {selectedRoute.impact}
            </p>
          </div>

          <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-5 space-y-2 font-mono text-xs">
            <div>
              <span className="text-zinc-500 uppercase tracking-widest block">Main Ship</span>
              <span className="font-semibold text-zinc-300">{selectedRoute.ship}</span>
            </div>
            <div>
              <span className="text-zinc-500 uppercase tracking-widest block">Core Route</span>
              <span className="font-semibold text-teal-400">{selectedRoute.origin} to {selectedRoute.destinations}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
