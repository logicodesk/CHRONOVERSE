import React, { useState } from 'react';
import { MedievalTech } from '../types';
import { AudioEngine } from '../utils/audio';
import { AnimatedText } from './AnimatedCounter';

interface MedievalProps {
  techs: MedievalTech[];
  accentColor: string;
}

export const InteractiveMedieval: React.FC<MedievalProps> = ({ techs, accentColor }) => {
  const [activeTab, setActiveTab] = useState<'castle' | 'tech'>('tech');
  const [selectedTechName, setSelectedTechName] = useState<string>(techs[0]?.name || '');

  const handleSelectTech = (name: string) => {
    setSelectedTechName(name);
    AudioEngine.playClick();
  };

  const handleTabToggle = (tab: 'castle' | 'tech') => {
    setActiveTab(tab);
    AudioEngine.playClick();
  };

  const selectedTech = techs.find(t => t.name === selectedTechName) || techs[0];

  // Castle hotspots structure static
  const castleHotspots = [
    { name: "Fortress Moat", desc: "Large fluid trench that mitigated siege trebuchets and high mining shafts.", impact: "Elevated regional fortress lifespans over 150 years." },
    { name: "Monastic Scriptorium", desc: "Halls where scholars meticulously hand-copied mathematics, astronomy, and philosophy.", impact: "Preserved Roman/Greek logic and integrated Eastern algebra." },
    { name: "The Blacksmith Armory", desc: "Coal furnace for smelting high-carbon steel plates, chainmail, and farm gear.", impact: "Fueled state militaries and early heavy agrarian tools." },
    { name: "Guild Great Hall", desc: "Council rooms regulating masonry techniques, trade rules, and artisan rates.", impact: "Inception of standardized wage structures and building templates." }
  ];

  const [activeCastleIdx, setActiveCastleIdx] = useState<number>(0);

  return (
    <div className="space-y-6">
      {/* Tab select header */}
      <div className="flex border-b border-white/10">
        <button
          onClick={() => handleTabToggle('tech')}
          className={`flex-1 py-3 font-mono text-xs tracking-widest uppercase border-b-2 transition-all ${
            activeTab === 'tech'
              ? 'border-sky-400 text-sky-400 font-bold'
              : 'border-transparent text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Technological Epistles
        </button>
        <button
          onClick={() => handleTabToggle('castle')}
          className={`flex-1 py-3 font-mono text-xs tracking-widest uppercase border-b-2 transition-all ${
            activeTab === 'castle'
              ? 'border-sky-400 text-sky-400 font-bold'
              : 'border-transparent text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Castle Administrative Zones
        </button>
      </div>

      {activeTab === 'tech' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {techs.map((tech) => (
              <button
                key={tech.name}
                onClick={() => handleSelectTech(tech.name)}
                className={`p-3 text-left rounded-lg bg-zinc-900/30 border transition-all duration-300 ${
                  selectedTechName === tech.name
                    ? 'border-sky-450 bg-sky-950/10 text-white shadow-[0_0_12px_rgba(56,189,248,0.15)]'
                    : 'border-white/5 text-zinc-400 hover:border-white/20 hover:text-white'
                }`}
              >
                <div className="text-[10px] font-mono text-sky-400 uppercase tracking-widest mb-1">
                  Active Treatise
                </div>
                <div className="font-semibold text-sm tracking-tight">{tech.name}</div>
              </button>
            ))}
          </div>

          {selectedTech && (
            <div className="p-5 rounded-lg bg-zinc-950/80 border border-white/20 backdrop-blur-lg relative overflow-hidden flex flex-col md:flex-row gap-5">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="flex-1 space-y-2">
                <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded">
                  MEDIEVAL PATENT SPECIFICATION
                </span>
                <h5 className="text-xl font-display font-semibold text-white">
                  {selectedTech.name}
                </h5>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {selectedTech.description}
                </p>
              </div>

              <div className="w-full md:w-56 p-4 rounded bg-zinc-900/40 border border-white/5 space-y-1 text-xs font-mono">
                <span className="text-sky-450 uppercase tracking-widest block font-bold">Societal impact</span>
                <p className="text-zinc-300 italic">"{selectedTech.impact}"</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* List of areas */}
          <div className="md:col-span-4 flex flex-col gap-2">
            {castleHotspots.map((spot, idx) => (
              <button
                key={spot.name}
                onClick={() => {
                  setActiveCastleIdx(idx);
                  AudioEngine.playClick();
                }}
                className={`p-3 text-left rounded-lg border transition-all ${
                  activeCastleIdx === idx
                    ? 'border-sky-400 bg-sky-500/10 text-sky-300'
                    : 'border-white/5 bg-zinc-950/30 text-zinc-400 hover:border-white/10 hover:text-white'
                }`}
              >
                <div className="font-mono text-[10px] uppercase opacity-50">Segment 0{idx + 1}</div>
                <div className="font-semibold text-sm">{spot.name}</div>
              </button>
            ))}
          </div>

          {/* Details of area */}
          <div className="md:col-span-8 p-6 rounded-lg bg-zinc-950/80 border border-white/5 relative min-h-[180px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl pointer-events-none"></div>
            <div className="space-y-4">
              <span className="text-[10px] font-mono bg-sky-500/10 text-sky-300 px-2 py-0.5 rounded border border-sky-400/20">
                FORTRESS GEOGRAPHIC AUDIT
              </span>
              <h5 className="text-xl font-display font-semibold text-white">
                {castleHotspots[activeCastleIdx]?.name}
              </h5>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {castleHotspots[activeCastleIdx]?.desc}
              </p>
              <div className="pt-3 border-t border-white/5 text-xs font-mono text-zinc-500">
                STRUCTURAL BENEFIT: <span className="text-sky-300"><AnimatedText>{castleHotspots[activeCastleIdx]?.impact}</AnimatedText></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
