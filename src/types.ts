export interface SlideTheme {
  bgType: 'image' | 'video' | 'shader';
  bgUrl: string;
  overlayColor: string;
  accentColor: string;
  indicatorColor: string;
}

export interface Hotspot {
  id: string;
  name: string;
  shortFact: string;
  details: string;
  icon?: string;
  coordinates?: { x: number; y: number }; // Percentage position on a map or card
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon?: string;
}

export interface EmpireData {
  id: string;
  name: string;
  era: string;
  subtitle: string;
  leader: string;
  capital: string;
  contribution: string;
  mapCoordinates: string; // SVG path or circle highlights
}

export interface MedievalTech {
  name: string;
  description: string;
  impact: string;
  icon: string;
}

export interface ExplorerRoute {
  explorer: string;
  years: string;
  origin: string;
  destinations: string;
  ship: string;
  impact: string;
}

export interface FuturityPrediction {
  year: string;
  gridTitle: string;
  techBreakthrough: string;
  societalShift: string;
  planetaryScale: string;
}

export interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  eraName: string;
  summary: string;
  bullets: string[];
  theme: SlideTheme;
  hotspots?: Hotspot[];
  timeline?: TimelineItem[];
  empires?: EmpireData[];
  medievalTech?: MedievalTech[];
  explorerRoutes?: ExplorerRoute[];
  predictions?: FuturityPrediction[];
}
