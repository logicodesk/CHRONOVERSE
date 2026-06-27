import React, { useState } from 'react';
import { Hotspot } from '../types';
import { AudioEngine } from '../utils/audio';
import { AnimatedText } from './AnimatedCounter';

interface DinosaurProps {
  hotspots: Hotspot[];
  accentColor: string;
}

export const InteractiveDinosaur: React.FC<DinosaurProps> = ({ hotspots, accentColor }) => {
  const [selectedId, setSelectedId] = useState<string | null>(hotspots[0]?.id || null);

  const selectedHotspot = hotspots.find(h => h.id === selectedId) || hotspots[0];

  const handleSelect = (id: string) => {
    setSelectedId(id);
    AudioEngine.playClick();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
        <h4 className="font-mono text-xs text-emerald-400/80 tracking-widest uppercase">
          Prehistoric Specimen Registry
        </h4>
      </div>

      {/* Grid selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {hotspots.map((spot) => (
          <button
            key={spot.id}
            onClick={() => handleSelect(spot.id)}
            className={`p-3 text-left rounded-lg bg-zinc-900/40 border transition-all duration-300 ${
              selectedId === spot.id
                ? 'border-emerald-400/80 bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.15)] text-white'
                : 'border-white/5 text-zinc-400 hover:border-white/20 hover:text-white'
            }`}
          >
            <div className="text-[10px] uppercase font-mono tracking-wider opacity-60">
              {spot.name}
            </div>
            <div className="font-bold text-sm tracking-tight">{spot.shortFact}</div>
          </button>
        ))}
      </div>

      {/* Detail presentation */}
      {selectedHotspot && (
        <div className="p-5 rounded-lg bg-zinc-950/80 border border-white/20 backdrop-blur-lg relative overflow-hidden flex flex-col md:flex-row gap-6">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 text-[9px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded">
                CLASSIFIED DATA
              </span>
              <span className="font-mono text-[10px] text-zinc-500">REF: JUR-X9{selectedHotspot.id.slice(-1)}</span>
            </div>
            
            <h5 className="text-xl font-display font-semibold text-white">
              {selectedHotspot.shortFact}
            </h5>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {selectedHotspot.details}
            </p>
          </div>

          <div className="w-full md:w-48 grid grid-cols-2 gap-2 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 text-xs font-mono">
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Ecosystem role</div>
              <div className="font-semibold text-emerald-300">Dominant Alpha</div>
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Est. Lifespan</div>
              <div className="font-semibold text-zinc-200">
                <AnimatedText>~28 - 40 Years</AnimatedText>
              </div>
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Mobility Scale</div>
              <div className="font-semibold text-zinc-200">Terrestrial V2</div>
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Fossil Recovery</div>
              <div className="font-semibold text-emerald-400">
                <AnimatedText>92% Complete</AnimatedText>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
