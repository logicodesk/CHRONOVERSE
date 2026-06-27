import React, { useState } from 'react';
import { EmpireData } from '../types';
import { AudioEngine } from '../utils/audio';

interface EmpiresProps {
  empires: EmpireData[];
  accentColor: string;
}

export const InteractiveEmpires: React.FC<EmpiresProps> = ({ empires, accentColor }) => {
  const [selectedId, setSelectedId] = useState<string>(empires[0]?.id || '');

  const handleSelect = (id: string) => {
    setSelectedId(id);
    AudioEngine.playClick();
  };

  const selectedEmpire = empires.find(e => e.id === selectedId) || empires[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
        <h4 className="font-mono text-xs text-red-400 tracking-widest uppercase">
          Empire Territorial Grid
        </h4>
      </div>

      {/* SVG Interactive Map Overlay */}
      <div className="relative h-44 rounded-lg bg-zinc-950/80 border border-white/5 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
        
        {/* Simple responsive vector coordinate wires representing trade corridors */}
        <svg className="absolute inset-0 w-full h-full text-red-500/20" preserveAspectRatio="none" viewBox="0 0 100 100">
          {empires.map((e) => (
            <path
              key={e.id}
              d={e.mapCoordinates}
              fill="none"
              stroke={selectedId === e.id ? 'rgb(248,113,113)' : 'rgba(239,68,68,0.15)'}
              strokeWidth={selectedId === e.id ? '2' : '1'}
              className="transition-all duration-700"
            />
          ))}
        </svg>

        {/* Buttons overlays placed geographically */}
        <div className="absolute inset-x-0 top-1/4 bottom-1/4 flex justify-around items-center z-15 px-4 md:px-12">
          {empires.map((emp) => {
            const isSelected = emp.id === selectedId;
            return (
              <button
                key={emp.id}
                onClick={() => handleSelect(emp.id)}
                className={`py-1.5 px-3 md:px-4 rounded-lg text-[10px] md:text-xs font-mono border transition-all duration-500 ${
                  isSelected
                    ? 'border-red-400 bg-red-500/10 text-red-400 scale-110 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                    : 'border-white/5 bg-zinc-900/60 text-zinc-500 hover:border-white/20 hover:text-white'
                }`}
              >
                {emp.name}
              </button>
            );
          })}
        </div>

        <div className="absolute bottom-2 right-4 text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
          Geographic Silk Connection Active
        </div>
      </div>

      {/* Selected empire detail stats */}
      {selectedEmpire && (
        <div className="p-5 rounded-lg bg-zinc-950/80 border border-white/20 backdrop-blur-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-red-400 uppercase tracking-widest bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                  {selectedEmpire.era}
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">REGENCY LEDGER</span>
              </div>

              <h5 className="text-xl font-display font-semibold text-white">
                {selectedEmpire.name} — <span className="text-zinc-500 text-base">{selectedEmpire.subtitle}</span>
              </h5>

              <p className="text-sm text-zinc-400 leading-relaxed">
                <strong className="text-zinc-250">Key Legacy contribution:</strong> {selectedEmpire.contribution}
              </p>
            </div>

            <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 grid grid-cols-2 gap-4 font-mono text-xs">
              <div>
                <span className="text-zinc-500 uppercase tracking-widest block mb-0.5">Imperial Capital</span>
                <span className="font-semibold text-zinc-200">{selectedEmpire.capital}</span>
              </div>
              <div>
                <span className="text-zinc-500 uppercase tracking-widest block mb-0.5">Iconic Hegemon</span>
                <span className="font-semibold text-red-300">{selectedEmpire.leader}</span>
              </div>
              <div>
                <span className="text-zinc-500 uppercase tracking-widest block mb-0.5">Pax Level</span>
                <span className="font-semibold text-emerald-400">Stable</span>
              </div>
              <div>
                <span className="text-zinc-500 uppercase tracking-widest block mb-0.5">Infrastructure</span>
                <span className="font-semibold text-zinc-200">High-Fidelity</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
