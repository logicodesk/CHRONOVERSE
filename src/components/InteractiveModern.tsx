import React, { useState } from 'react';
import { Hotspot } from '../types';
import { AudioEngine } from '../utils/audio';
import { AnimatedText } from './AnimatedCounter';

interface ModernProps {
  hotspots: Hotspot[];
  accentColor: string;
}

export const InteractiveModern: React.FC<ModernProps> = ({ hotspots, accentColor }) => {
  const [selectedId, setSelectedId] = useState<string | null>(hotspots[0]?.id || null);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    AudioEngine.playClick();
  };

  const selectedNode = hotspots.find(h => h.id === selectedId) || hotspots[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
        <h4 className="font-mono text-xs text-indigo-400 tracking-widest uppercase font-semibold">
          Orbital Satellite & AI Node Ledger
        </h4>
      </div>

      {/* Graphical Network Nodes Visual Representation */}
      <div className="relative h-44 rounded-lg bg-zinc-950 border border-white/5 overflow-hidden flex items-center justify-center p-4">
        {/* Schematic Grid dots */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"></div>

        {/* Neural web lines in canvas look */}
        <svg className="absolute inset-x-0 top-1/4 h-1/2 w-full text-indigo-500/20" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M 10,50 L 50,20 L 90,50 L 50,80 Z" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
          <path d="M 10,50 L 90,50 M 50,20 L 50,80" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>

        <div className="relative flex justify-around w-full max-w-lg z-10">
          {hotspots.map((node) => {
            const isSelected = selectedId === node.id;
            return (
              <button
                key={node.id}
                onClick={() => handleSelect(node.id)}
                className="flex flex-col items-center group relative text-center focus:outline-none"
              >
                {/* Node beacon */}
                <div 
                  className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isSelected
                      ? 'border-indigo-450 bg-indigo-950 text-indigo-300 scale-110 shadow-[0_0_15px_rgba(99,102,241,0.5)]'
                      : 'border-white/10 bg-zinc-900 text-zinc-500 hover:border-indigo-500/50 hover:text-indigo-400'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    {node.id === 'mod-1' ? 'developer_board' : node.id === 'mod-2' ? 'settings_ethernet' : 'rocket'}
                  </span>
                </div>
                <span className={`text-[10px] uppercase font-mono tracking-wider mt-2 transition-colors ${
                  isSelected ? 'text-indigo-300 font-bold' : 'text-zinc-500 group-hover:text-zinc-300'
                }`}>
                  {node.id === 'mod-1' ? 'Silicon' : node.id === 'mod-2' ? 'Subsea' : 'Space'}
                </span>
              </button>
            );
          })}
        </div>

        <div className="absolute top-2 left-3 text-[8px] font-mono text-zinc-600 uppercase tracking-wider">
          Node latency: 4ms | Quantum encryption key active
        </div>
      </div>

      {/* Selected node telemetry */}
      {selectedNode && (
        <div className="p-5 rounded-lg bg-zinc-950/80 border border-white/20 backdrop-blur-lg relative overflow-hidden flex flex-col md:flex-row gap-5">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex-1 space-y-2">
            <span className="text-[10px] font-mono bg-indigo-500/15 text-indigo-350 border border-indigo-500/20 px-2 py-0.5 rounded">
              NODE TELEMETRY ACTIVE
            </span>
            <h5 className="text-xl font-display font-semibold text-white">
              {selectedNode.name}
            </h5>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {selectedNode.details}
            </p>
          </div>

          <div className="w-full md:w-52 p-4 rounded bg-zinc-900/40 border border-white/5 space-y-2 text-xs font-mono">
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-zinc-500 uppercase">bandwidth load</span>
              <span className="text-indigo-455 font-bold">
                <AnimatedText>120 Gbps</AnimatedText>
              </span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-zinc-500 uppercase">Node security</span>
              <span className="text-emerald-450 font-bold">
                <AnimatedText>99.98%</AnimatedText>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500 uppercase">active loops</span>
              <span className="text-zinc-300 font-semibold">
                <AnimatedText>1,024,000</AnimatedText>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
