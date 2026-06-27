import React, { useState } from 'react';
import { Hotspot } from '../types';
import { AudioEngine } from '../utils/audio';
import { BookOpen, Crown, Shield, Sparkles, Quote, Calendar } from 'lucide-react';
import { AnimatedText } from './AnimatedCounter';

interface IndiaProps {
  hotspots: Hotspot[];
  accentColor: string;
}

interface GreatKing {
  id: string;
  name: string;
  title: string;
  reign: string;
  legacy: string;
  achievement: string;
  quote: string;
  imageUrl: string;
  tagline: string;
}

const GREAT_KINGS: GreatKing[] = [
  {
    id: "maurya-chandra",
    name: "Chandragupta Maurya",
    title: "Sovereign Unifier & Strategist",
    reign: "321 BCE – 297 BCE",
    legacy: "Founded the Mauryan Empire, the first pan-Indian superpower. Alongside philosopher-advisor Chanakya, he dismantled the oppressive Nanda dynasty and defeated the Greek satraps of Alexander the Great's general Seleucus Nicator, securing borders up to Persia.",
    achievement: "Pioneered a unified monetary network, central intelligence bureaus, and comprehensive road highways connecting East & West trade lanes.",
    quote: "All people are my children. What I desire for my own children, I desire for all men.",
    imageUrl: "https://wallpapercave.com/wp/wp8750724.jpg",
    tagline: "FOUNDER OF THE MAURYAN SUPERPOWER"
  },
  {
    id: "maurya-ashoka",
    name: "Ashoka The Great",
    title: "Emperor of Righteous Dharma",
    reign: "268 BCE – 232 BCE",
    legacy: "Expanded the Empire to its peak zenith. Following the tragic Kalinġa war, he underwent a spiritual awakening, converted to Buddhism, and renounced violent conquest. He introduced 'Dharma-vijaya' (victory by moral law) and promoted cosmic benevolence.",
    achievement: "Erected monolithic Pillars of Ashoka and rock edicts across Asia, dispatched ambassadors to Athens and Alexandria, and built hundreds of free veterinary and human medical clinics.",
    quote: "Amidst triumph, true victory lies only in conquering the hearts of men with the message of peaceful Dharma.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfK0M5Z6YuyYi7gi6q5hQza7_m6GilDLfQfX4VIqAUiYLqTebsZvi8Hso&s=10",
    tagline: "THE DHARMA KING OF PEACE"
  },
  {
    id: "gupta-samudra",
    name: "Samudragupta",
    title: "The Classical Golden Age Monarch",
    reign: "335 CE – 375 CE",
    legacy: "A supreme military genius of the Gupta Dynasty who never lost a single conflict. Dubbed the 'Napoleon of India', he successfully united northern and southern realms while cultivating a peak classical Renaissance in science, Sanskrit poetry, and philosophy.",
    achievement: "Championed exquisite gold coin minting systems, composed Sanskrit ragas, pioneered astronomical calculations, and actively funded the ancient Nalanda University.",
    quote: "A king's ultimate treasure is not the land he conquers using swords, but the science and poetry he fosters using wisdom.",
    imageUrl: "https://miro.medium.com/v2/resize:fit:1204/0*YXLVtBnqUOHr8QZj",
    tagline: "PATRON OF CLASSICAL MUSIC & SCIENCE"
  },
  {
    id: "chola-rajaraja",
    name: "Rajaraja Chola I",
    title: "Maritime Emperor & Temple Architect",
    reign: "985 CE – 1014 CE",
    legacy: "Architect of the Chola Empire's golden age. From his base in southern India, he forged a mighty blue-water navy that dominated the Indian Ocean Trade, establishing secured commercial routes reaching Indonesia, Maldives, and Song Dynasty China.",
    achievement: "Commissioned the Brihadisvara Temple at Thanjavur—a colossal, gravity-defying granite monolith towering 216 feet—and established highly advanced decentralized village democracy systems.",
    quote: "True sovereignty is built in solid stone temples that outlive crowns, and trade bridges that traverse deep seas.",
    imageUrl: "https://i.pinimg.com/736x/74/69/0e/74690e1c23c277bcf5c8173de7a55db3.jpg",
    tagline: "EMPEROR OF THE SOUTHERN MARITIME SEAS"
  }
];

export const InteractiveIndia: React.FC<IndiaProps> = ({ hotspots, accentColor }) => {
  const [activeTab, setActiveTab] = useState<'knowledge' | 'kings'>('knowledge');
  const [selectedId, setSelectedId] = useState<string | null>(hotspots[0]?.id || null);
  const [selectedKingId, setSelectedKingId] = useState<string>(GREAT_KINGS[0].id);
  const [rotation, setRotation] = useState<number>(0);

  const selectedHotspot = hotspots.find(h => h.id === selectedId) || hotspots[0];
  const selectedKing = GREAT_KINGS.find(k => k.id === selectedKingId) || GREAT_KINGS[0];

  const handleSelectKnowledge = (id: string, idx: number) => {
    setSelectedId(id);
    setRotation(idx * 72);
    AudioEngine.playClick();
  };

  const handleSelectKing = (id: string) => {
    setSelectedKingId(id);
    AudioEngine.playClick();
  };

  const switchTab = (tab: 'knowledge' | 'kings') => {
    setActiveTab(tab);
    AudioEngine.playClick();
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Tab Selector */}
      <div className="flex border-b border-orange-500/10 pb-0.5 max-w-md mx-auto justify-center gap-4">
        <button
          onClick={() => switchTab('knowledge')}
          className={`flex items-center gap-2 pb-2.5 px-4 font-mono text-xs uppercase tracking-widest border-b-2 transition-all duration-300 ${
            activeTab === 'knowledge'
              ? 'border-orange-500 text-orange-400 font-bold'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          Science & Knowledge
        </button>
        <button
          onClick={() => switchTab('kings')}
          className={`flex items-center gap-2 pb-2.5 px-4 font-mono text-xs uppercase tracking-widest border-b-2 transition-all duration-300 ${
            activeTab === 'kings'
              ? 'border-orange-500 text-orange-400 font-bold'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Crown className="w-3.5 h-3.5" />
          The Great Kings
        </button>
      </div>

      {activeTab === 'knowledge' ? (
        /* SCIENCE & KNOWLEDGE TAB Content */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center animate-[fadeIn_0.5s_ease-out]">
          
          {/* Column 1: Rotating Ashoka Chakra Graphic */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <div 
                className="w-44 h-44 md:w-52 md:h-52 rounded-full border-4 border-orange-500/80 my-4 flex items-center justify-center transition-transform duration-1000 ease-out shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {/* Spokes of Ashoka Chakra */}
                {Array.from({ length: 24 }).map((_, idx) => (
                  <div 
                    key={idx}
                    className="absolute top-0 bottom-0 w-[2px] bg-orange-400/30 origin-center"
                    style={{ transform: `rotate(${idx * 15}deg)` }}
                  ></div>
                ))}
                
                {/* Center wheel core */}
                <div className="w-10 h-10 rounded-full bg-zinc-950 border-4 border-orange-500 z-10 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-400"></div>
                </div>
              </div>
              
              <div className="absolute inset-0 bg-orange-500/15 filter blur-3xl rounded-full pointer-events-none animate-[pulse_4s_infinite_ease-in-out]"></div>
            </div>

            <p className="font-mono text-[10px] text-zinc-500 tracking-wider text-center">
              ASHOKA CHAKRA WHEEL OF SCIENTIFIC DHARMA
            </p>
          </div>

          {/* Column 2: Hotspot selection & Description panel */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></span>
              <h4 className="font-mono text-xs text-orange-400 tracking-widest uppercase">
                Sanskrit Scientific Manuscripts
              </h4>
            </div>

            <div className="flex flex-wrap gap-2">
              {hotspots.map((spot, idx) => (
                <button
                  key={spot.id}
                  onClick={() => handleSelectKnowledge(spot.id, idx)}
                  className={`px-4 py-2 text-xs font-mono rounded border transition-all duration-300 ${
                    selectedId === spot.id
                      ? 'border-orange-500 bg-orange-500/10 text-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.1)]'
                      : 'border-white/5 bg-zinc-900/30 text-zinc-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {spot.name}
                </button>
              ))}
            </div>

            {selectedHotspot && (
              <div className="p-5 rounded-lg bg-zinc-950/85 border border-orange-500/20 backdrop-blur-lg space-y-3 relative overflow-hidden shadow-[0_0_25px_rgba(249,115,22,0.06)] hover:border-orange-500/35 transition-all duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/15 rounded-full blur-3xl pointer-events-none animate-[pulse_3s_infinite_ease-in-out]"></div>
                
                <span className="text-[10px] font-mono bg-orange-500/15 text-orange-300 border border-orange-500/20 px-2 py-0.5 rounded">
                  {selectedHotspot.name}
                </span>
                
                <h5 className="text-xl font-display font-semibold text-white">
                  <AnimatedText>{selectedHotspot.shortFact}</AnimatedText>
                </h5>
                
                <p className="text-sm text-zinc-300 leading-relaxed">
                  <AnimatedText>{selectedHotspot.details}</AnimatedText>
                </p>

                <div className="pt-3 border-t border-white/5 flex gap-4 text-[10px] font-mono text-zinc-500">
                  <div>
                    PRIMARY DEPOSITORIES: <span className="text-orange-400">Takshashila / Nalanda</span>
                  </div>
                  <div>
                    MATHEMATICAL FIELD: <span className="text-zinc-350">Vedic calculus</span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      ) : (
        /* THE GREAT KINGS TAB Content */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch animate-[fadeIn_0.5s_ease-out] text-left">
          
          {/* Column 1: Cinematic Kings representation (Images) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="relative rounded-xl overflow-hidden border border-white/20 h-56 lg:h-full min-h-[220px] flex items-end p-4 group">
              <img 
                src={selectedKing.imageUrl} 
                alt={selectedKing.name} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/45 to-transparent"></div>
              
              <div className="relative z-10 space-y-1">
                <span className="text-[10px] font-mono text-amber-400 tracking-wider font-semibold block uppercase">
                  Cinematic Legacy Detail
                </span>
                <h4 className="text-base font-display font-semibold text-white leading-tight">
                  {selectedKing.name}
                </h4>
                <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
                  {selectedKing.tagline}
                </p>
              </div>
            </div>

            {/* Quick stats board */}
            <div className="p-3.5 bg-zinc-900/30 rounded-lg border border-white/5 font-mono text-[10px] text-zinc-400 flex items-center gap-3">
              <Calendar className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <div>
                DYNASTIC EPOCH: <span className="text-white font-semibold"><AnimatedText>{selectedKing.reign}</AnimatedText></span>
              </div>
            </div>
          </div>

          {/* Column 2: Kings list selector and description cards */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <Crown className="w-3.5 h-3.5 text-orange-400" />
                <h4 className="font-mono text-xs text-orange-400 tracking-widest uppercase">
                  Select Sovereign Dynasty
                </h4>
              </div>

              {/* Selector Kings Buttons */}
              <div className="grid grid-cols-2 gap-2">
                {GREAT_KINGS.map((king) => (
                  <button
                    key={king.id}
                    onClick={() => handleSelectKing(king.id)}
                    className={`p-2 w-full text-left font-mono text-xs rounded border transition-all duration-300 flex flex-col justify-center leading-tight ${
                      selectedKingId === king.id
                        ? 'border-orange-500 bg-orange-500/15 text-orange-300 shadow-[0_0_12px_rgba(249,115,22,0.15)] font-bold'
                        : 'border-white/5 bg-zinc-900/35 text-zinc-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <span className="block text-[8px] opacity-75 font-normal">Sovereign King</span>
                    <span className="truncate">{king.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected King detailed view */}
            <div className="p-5 flex-1 rounded-lg bg-zinc-950/85 border border-orange-500/20 backdrop-blur-lg space-y-3 relative overflow-hidden flex flex-col justify-between shadow-[0_0_25px_rgba(249,115,22,0.06)] hover:border-orange-500/35 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/15 rounded-full blur-3xl pointer-events-none animate-[pulse_4s_infinite_ease-in-out]"></div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-start border-b border-white/5 pb-2">
                  <div>
                    <span className="text-[10px] font-mono text-orange-400 uppercase leading-none tracking-wider">
                      {selectedKing.title}
                    </span>
                    <h5 className="text-xl font-display font-bold text-white leading-tight">
                      {selectedKing.name}
                    </h5>
                  </div>
                  <span className="text-[10px] font-mono bg-orange-500/10 text-orange-300 border border-orange-500/20 px-2 py-0.5 rounded leading-none">
                    <AnimatedText>{selectedKing.reign}</AnimatedText>
                  </span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  <AnimatedText>{selectedKing.legacy}</AnimatedText>
                </p>

                <div className="p-3 rounded bg-zinc-900/40 border border-white/5 space-y-1">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-orange-300 font-bold block">
                    Key Historical Achievement
                  </span>
                  <p className="text-[11px] text-zinc-300 leading-snug">
                    <AnimatedText>{selectedKing.achievement}</AnimatedText>
                  </p>
                </div>
              </div>

              {/* Royal quote descriptor block */}
              <div className="pt-2 border-t border-white/5 flex gap-2 items-center text-xs text-zinc-400 italic">
                <Quote className="w-4 h-4 text-orange-500 opacity-60 shrink-0" />
                <span className="leading-snug">"{selectedKing.quote}"</span>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
