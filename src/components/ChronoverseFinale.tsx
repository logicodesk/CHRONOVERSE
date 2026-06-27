import React, { useState } from 'react';
import { AudioEngine } from '../utils/audio';
import { AnimatedText } from './AnimatedCounter';

interface ComparisonMetric {
  eraName: string;
  pop: string;
  energy: string;
  travel: string;
  comm: string;
  intellect: string;
}

const CIVILIZATION_CHRONICLE_STATS: Record<string, ComparisonMetric> = {
  "Dinosaurs": {
    eraName: "Age of Giants",
    pop: "No Human Species",
    energy: "Geothermal / Biomass Absorption",
    travel: "80 km/h (Sprinting)",
    comm: "Acoustic Screeches (0.2km range)",
    intellect: "Zero Abstract Conceptions"
  },
  "Civilizations": {
    eraName: "Dawn of Cities",
    pop: "Estimated ~5,000,000 Globally",
    energy: "Agriculture & Water Channels",
    travel: "20 km/h (Domesticated Beasts)",
    comm: "Clay Tablet Scribes (Weeks delay)",
    intellect: "First codified symbols"
  },
  "Empires": {
    eraName: "Rise of Empires",
    pop: "Estimated ~150,000,000 Globally",
    energy: "Animal Muscle & Aqueducts",
    travel: "35 km/h (Empire highways)",
    comm: "Postal Horse relays (Days delay)",
    intellect: "Legal civil codes, basic geometry"
  },
  "Kingdoms": {
    eraName: "Medieval World",
    pop: "Estimated ~400,000,000 Globally",
    energy: "Windmills / Heavy ploughs",
    travel: "40 km/h (Caravels / Horses)",
    comm: "Handwritten parchments (Weeks delay)",
    intellect: "Preserved ancient mathematical grids"
  },
  "Exploration": {
    eraName: "Age of Exploration",
    pop: "Estimated ~550,000,005 Globally",
    energy: "Wind Propulsion & Timber Harvest",
    travel: "25 km/h (Deep ocean caravels)",
    comm: "Gutenberg print letters (Months delay)",
    intellect: "Precise global cartography & astronomy"
  },
  "Industry": {
    eraName: "Industrial Revolution",
    pop: "Estimated ~1.5 Billion Globally",
    energy: "Superheated Steam & Coal",
    travel: "80 km/h (Iron-clad locomotives)",
    comm: "Electric Morse Telegraphy (Minutes)",
    intellect: "Thermodynamics & factory automation"
  },
  "Modern": {
    eraName: "Digital Era",
    pop: "Estimated ~8.2 Billion Globally",
    energy: "Carbon Combustion & Solar Grid",
    travel: "28,000 km/h (Orbiting Spaceships)",
    comm: "Subsea Lightwaves (< 10 Milliseconds)",
    intellect: "Generative neural models, deep cosmos mappings"
  },
  "Future": {
    eraName: "Future Civilization",
    pop: "Estimated ~100 Billion (Multi-planetary)",
    energy: "Solar Fusion & Dyson Swarm Arrays",
    travel: "Light Speed Propulsion Vectors",
    comm: "Quantum Non-Locality Telemetry (Instant)",
    intellect: "Kardashev Scale Type II cognition"
  }
};

export const ChronoverseFinale: React.FC = () => {
  const [selectedEraKey1, setSelectedEraKey1] = useState<string>("Industry");
  const [selectedEraKey2, setSelectedEraKey2] = useState<string>("Future");

  const eraKeys = Object.keys(CIVILIZATION_CHRONICLE_STATS);

  const era1 = CIVILIZATION_CHRONICLE_STATS[selectedEraKey1] || CIVILIZATION_CHRONICLE_STATS["Industry"];
  const era2 = CIVILIZATION_CHRONICLE_STATS[selectedEraKey2] || CIVILIZATION_CHRONICLE_STATS["Future"];

  const handleEra1Change = (key: string) => {
    setSelectedEraKey1(key);
    AudioEngine.playClick();
  };

  const handleEra2Change = (key: string) => {
    setSelectedEraKey2(key);
    AudioEngine.playClick();
  };

  return (
    <div className="space-y-6">
      
      {/* Title & Introduction */}
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
        <h4 className="font-mono text-xs text-primary/80 tracking-widest uppercase">
          CHRONOVERSE COMPARATOR ENGINE
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Selector 1 */}
        <div className="space-y-2">
          <label className="block font-mono text-[10px] text-zinc-500 uppercase">Base Reference Era</label>
          <select 
            value={selectedEraKey1}
            onChange={(e) => handleEra1Change(e.target.value)}
            className="w-full bg-zinc-950 text-white font-mono text-xs border border-white/15 rounded-lg py-2 px-3 focus:outline-none focus:border-primary"
          >
            {eraKeys.map((key) => (
              <option key={key} value={key}>{key} ({CIVILIZATION_CHRONICLE_STATS[key].eraName})</option>
            ))}
          </select>
        </div>

        {/* Selector 2 */}
        <div className="space-y-2">
          <label className="block font-mono text-[10px] text-zinc-500 uppercase">Target Projection Era</label>
          <select 
            value={selectedEraKey2}
            onChange={(e) => handleEra2Change(e.target.value)}
            className="w-full bg-zinc-950 text-white font-mono text-xs border border-white/15 rounded-lg py-2 px-3 focus:outline-none focus:border-primary"
          >
            {eraKeys.map((key) => (
              <option key={key} value={key}>{key} ({CIVILIZATION_CHRONICLE_STATS[key].eraName})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Grid Board */}
      <div className="rounded-xl overflow-hidden border border-white/20 bg-zinc-950/80 backdrop-blur-lg">
        
        {/* Table Header */}
        <div className="grid grid-cols-12 bg-zinc-900/40 p-4 border-b border-white/5 font-mono text-[10px] uppercase text-zinc-500 font-bold tracking-widest text-center">
          <div className="col-span-4 text-left">Metrics comparison</div>
          <div className="col-span-4 text-primary">{selectedEraKey1}</div>
          <div className="col-span-4 text-rose-300">{selectedEraKey2}</div>
        </div>

        {/* Metric rows */}
        <div className="divide-y divide-white/5">
          {/* Row 1: Population */}
          <div className="grid grid-cols-12 p-4 text-xs items-center">
            <div className="col-span-4 font-mono font-bold text-zinc-500 uppercase text-[10px]">Humankind Population</div>
            <div className="col-span-4 text-center font-sans text-zinc-300 px-2">
              <AnimatedText>{era1.pop}</AnimatedText>
            </div>
            <div className="col-span-4 text-center font-sans text-zinc-100 px-2 font-bold">
              <AnimatedText>{era2.pop}</AnimatedText>
            </div>
          </div>

          {/* Row 2: Energy Source */}
          <div className="grid grid-cols-12 p-4 text-xs items-center">
            <div className="col-span-4 font-mono font-bold text-zinc-500 uppercase text-[10px]">Dominant Energy Grid</div>
            <div className="col-span-4 text-center font-sans text-zinc-300 px-2">
              <AnimatedText>{era1.energy}</AnimatedText>
            </div>
            <div className="col-span-4 text-center font-sans text-zinc-100 px-2 font-bold">
              <AnimatedText>{era2.energy}</AnimatedText>
            </div>
          </div>

          {/* Row 3: Travel Speed */}
          <div className="grid grid-cols-12 p-4 text-xs items-center">
            <div className="col-span-4 font-mono font-bold text-zinc-500 uppercase text-[10px]">Maximum Travel Speed</div>
            <div className="col-span-4 text-center font-mono text-zinc-300 px-2">
              <AnimatedText>{era1.travel}</AnimatedText>
            </div>
            <div className="col-span-4 text-center font-mono text-zinc-100 px-2 font-bold">
              <AnimatedText>{era2.travel}</AnimatedText>
            </div>
          </div>

          {/* Row 4: Communication speed */}
          <div className="grid grid-cols-12 p-4 text-xs items-center">
            <div className="col-span-4 font-mono font-bold text-zinc-500 uppercase text-[10px]">Communication Latency</div>
            <div className="col-span-4 text-center font-sans text-zinc-300 px-2">
              <AnimatedText>{era1.comm}</AnimatedText>
            </div>
            <div className="col-span-4 text-center font-sans text-zinc-100 px-2 font-bold">
              <AnimatedText>{era2.comm}</AnimatedText>
            </div>
          </div>

          {/* Row 5: Intellect */}
          <div className="grid grid-cols-12 p-4 text-xs items-center font-sans">
            <div className="col-span-4 font-mono font-bold text-zinc-500 uppercase text-[10px]">Knowledge density</div>
            <div className="col-span-4 text-center text-zinc-300 px-2">
              <AnimatedText>{era1.intellect}</AnimatedText>
            </div>
            <div className="col-span-4 text-center text-rose-300 px-2 font-bold">
              <AnimatedText>{era2.intellect}</AnimatedText>
            </div>
          </div>
        </div>

      </div>

      <div className="p-4 rounded-lg bg-zinc-900/30 border border-white/5 text-center font-mono text-[10px] text-zinc-500">
        Click options above to evaluate societal energy thresholds and communication evolution.
      </div>
    </div>
  );
};
