export interface DiscoveryContent {
  eraId: number;
  title: string;
  subtitle: string;
  hiddenFact: {
    title: string;
    description: string;
    significance: string;
  };
  rareArtifact: {
    name: string;
    origin: string;
    description: string;
    materialComposition: string;
    restorationStatus: string;
  };
  historicalInvention: {
    name: string;
    inventor: string;
    description: string;
    workingMechanism: string;
    lastingLegacy: string;
  };
  mapDiscovery: {
    title: string;
    region: string;
    description: string;
    coordinatesText: string;
    geographicalNote: string;
  };
  visualDiscovery: {
    name: string;
    depiction: string;
    artStyle: string;
    historicalContext: string;
  };
}

export const DISCOVERY_DATA: Record<number, DiscoveryContent> = {
  1: {
    eraId: 1,
    title: "The Primeval Sanctuary",
    subtitle: "Symphony of the Mesozoic",
    hiddenFact: {
      title: "The Sound of Giants",
      description: "Recent tomographic scans of fossilized dinosaur crests (like Parasaurolophus) reveal hollow acoustic chambers. These chambers acted as sub-harmonic resonators, producing ultra-low frequency calls that could travel for miles through primeval forest canopies.",
      significance: "Indicates a complex system of infrasonic communication analogous to modern elephants."
    },
    rareArtifact: {
      name: "Feathered Amber Inclusion",
      origin: "Northern Myanmar Deposits",
      description: "A pristine 99-million-year-old piece of amber containing a perfectly preserved, downy tail section of a coelurosaurian theropod, complete with microscopic structural pigment filaments.",
      materialComposition: "Fossilized Araucariaceae Tree Resin & Keratin",
      restorationStatus: "Micro-scanned & Digitally Reconstructed"
    },
    historicalInvention: {
      name: "The Gizzard Stone (Gastrolith)",
      inventor: "Adaptive Evolution",
      description: "Colossal sauropods lacked complex grinding teeth. They swallowed smooth, polished river stones to pulverize tough foliage inside a muscular muscular gizzard system.",
      workingMechanism: "Mechanical attrition within gastric acid chambers.",
      lastingLegacy: "Allowed the absolute digestion of high-canopy gymnosperm fibers."
    },
    mapDiscovery: {
      title: "Supercontinent Pangaea Rifting",
      region: "Global Tectonic Plate Boundaries",
      description: "The monolithic supercontinent begins its slow, massive fracture into Laurasia and Gondwana, opening vast warm seaways that altered global thermohaline circulation.",
      coordinatesText: "0.00° N, 0.00° E (Primeval Meridian)",
      geographicalNote: "Intense volcanic chains along the rift zones released huge carbon volumes, triggering a permanent greenhouse state."
    },
    visualDiscovery: {
      name: "The Ginkgo Biloba Stand",
      depiction: "A towering, fan-leafed forest line reflecting golden evening rays.",
      artStyle: "Primeval Botanics",
      historicalContext: "One of the absolute few vegetative lines to survive completely unchanged from the Triassic period directly into modern civilization."
    }
  },
  2: {
    eraId: 2,
    title: "The Cradle of Agriculture",
    subtitle: "Sovereigns of Mudbrick and Clay",
    hiddenFact: {
      title: "The Beer Currency",
      description: "In the proto-city of Uruk, municipal workers were compensated in standard daily clay vessels of high-calorie, fermented barley beer. Writing emerged largely to record these standardized agricultural transactions.",
      significance: "Demonstrates that complex logistics and social coordination predated metallic coins."
    },
    rareArtifact: {
      name: "The Obsidian Mirror of Catalhoyuk",
      origin: "Anatolian Volcanic Ridge",
      description: "A highly polished, hemispherical piece of volcanic obsidian stone reflecting a dark, perfect reflection, representing early human self-identity and shamanic visual arts.",
      materialComposition: "Pure Natural Volcanic Silica Glass",
      restorationStatus: "Polished to original reflectance by archaeological conservators"
    },
    historicalInvention: {
      name: "The Shadoof Irrigation Arm",
      inventor: "Neolithic Agrarian Engineers",
      description: "A counterweighted lever-arm apparatus designed to raise water buckets smoothly from deep river canals onto elevated dry crop terraces.",
      workingMechanism: "Fulcrum leverage using sun-dried mud as a natural counterweight.",
      lastingLegacy: "Multiplied agricultural yield potential along the dry fertile banks."
    },
    mapDiscovery: {
      title: "The Fertile Crescent Conduits",
      region: "Tigris-Euphrates River Basins",
      description: "A crescent-shaped region of moist, highly active fertile lands contrasting sharply against the surrounding arid Arabian and Syrian plains.",
      coordinatesText: "32.48° N, 44.43° E (Babylonia)",
      geographicalNote: "The periodic flood deposits laid down rich, black alluvial silt perfectly suited for rapid seed germination."
    },
    visualDiscovery: {
      name: "Neolithic Aurochs Wall Painting",
      depiction: "A dynamic, charcoal and red ochre mural depicting massive wild oxen leaping across a white plaster wall.",
      artStyle: "Mural Fresco on Lime Plaster",
      historicalContext: "Found deep inside communal domestic rooms, indicating ritual hunting sanctums."
    }
  },
  3: {
    eraId: 3,
    title: "The Indus & Vedic Sanctuary",
    subtitle: "Pioneers of Logic, Geometry, & Wisdom",
    hiddenFact: {
      title: "The Lost Sarasvati River",
      description: "Satellite radar surveys have mapped a massive, dry paleochannel running parallel to the Indus. Known historically as the Sarasvati, its gradual tectonic drying forced the migration of early advanced urbanites.",
      significance: "Explained the eventual shifting of subcontinental cultural hubs towards the fertile Ganges basin."
    },
    rareArtifact: {
      name: "The Bronze Dancing Girl",
      origin: "Mohenjo-daro Citadel Site",
      description: "A masterfully cast 10.5 cm high bronze statuette of a stylized young woman standing in a posture of confidence, adorned with dozens of bangles along her arm.",
      materialComposition: "Lost-Wax Cast Bronze Alloy",
      restorationStatus: "Stabilized against bronze disease oxidation"
    },
    historicalInvention: {
      name: "Shulba Sutras Geometry",
      inventor: "Sages & Vedic Architects",
      description: "The mathematical system of geometric rules used to design precise sacrificial altars with equivalent areas using algebraic conversions.",
      workingMechanism: "Formulated the early practical understanding of the Pythagorean theorem long before Greek documentation.",
      lastingLegacy: "Laid down the geometric foundation for advanced sacred architecture."
    },
    mapDiscovery: {
      title: "Indus Valley Trade Network",
      region: "Harappa to Meluhha (Mesopotamia)",
      description: "Maritime shipping networks utilizing clay seals to identify cargo shipments arriving at ancient Gulf docks.",
      coordinatesText: "22.84° N, 69.85° E (Lothal Dockyards)",
      geographicalNote: "The world's earliest engineered tidal basin, built to bypass siltation issues."
    },
    visualDiscovery: {
      name: "The Pashupati Seal",
      depiction: "A steatite carving of a three-faced horned figure sitting in yogic meditation posture, surrounded by wild animals.",
      artStyle: "Intaglio Carving on Steatite Stone",
      historicalContext: "Suggests the extremely early roots of proto-Shiva spiritual philosophy and animal reverence."
    }
  },
  4: {
    eraId: 4,
    title: "The Imperial Spheres",
    subtitle: "The Highways of Authority",
    hiddenFact: {
      title: "The Concrete of the Gods",
      description: "Roman concrete (opus caementicium) possessed unique self-healing mechanics. By incorporating volcanic ash from Pozzuoli, the chemical reaction with saltwater grew leucite crystals that blocked cracks from expanding.",
      significance: "Enabled harbor docks, aqueducts, and the dome of the Pantheon to withstand two millennia."
    },
    rareArtifact: {
      name: "The Antikythera Mechanism",
      origin: "Greek Shipwreck, Aegean Sea",
      description: "An incredibly complex bronze gears computer designed to calculate precise planetary orbits, solar eclipses, and Olympic schedule cycles.",
      materialComposition: "Engraved Bronze Plates & 30+ Interlocking Gear Cogs",
      restorationStatus: "Fragmented; digitally mapped with 3D X-ray tomography"
    },
    historicalInvention: {
      name: "The Silk loom",
      inventor: "Chinese Artisans (Han Dynasty)",
      description: "An advanced wooden drawloom frame configured to thread warp and weft fibers into fine, shimmering silk garments.",
      workingMechanism: "Foot-pedal operated harness selection mechanics.",
      lastingLegacy: "Generated the luxury trade system that linked East Asia to imperial Roman villas."
    },
    mapDiscovery: {
      title: "The Silk Road Nexus",
      region: "Chang'an to Rome via Pamir Passes",
      description: "A continuous cross-continental commercial pipeline spanning rugged mountain valleys and vast deserts.",
      coordinatesText: "39.14° N, 68.55° E (Samarkand Oasis)",
      geographicalNote: "A vital junction point where high-altitude mountain guides exchanged silk, spices, and glasswares."
    },
    visualDiscovery: {
      name: "Fayum Mummy Portrait",
      depiction: "A hauntingly lifelike wax encaustic portrait of a young Roman-Egyptian citizen, showing intense, expressive eyes.",
      artStyle: "Encaustic Hot-Wax Painting on Wood panel",
      historicalContext: "A rare surviving testament to the seamless melting of Egyptian funerary culture with Greek-Roman painterly realism."
    }
  },
  5: {
    eraId: 5,
    title: "The Alchemist's Keep",
    subtitle: "Knowledge in the Dark",
    hiddenFact: {
      title: "The House of Wisdom Translation",
      description: "During Europe's dark ages, the House of Wisdom in Baghdad offered translators the weight of each translated book in solid gold. They gathered texts from Greece, India, and Persia to synthesize modern algebra.",
      significance: "Preserved and expanded the scientific momentum of humanity."
    },
    rareArtifact: {
      name: "The Ivory Astrolabe of Cordoba",
      origin: "Andalusia Al-Andalus",
      description: "A remarkably intricate mechanical calculator carved in dense ivory bone, calibrated for multi-latitude celestial mapping and prayer directions.",
      materialComposition: "Ivory and Brass filigree inlay",
      restorationStatus: "Pristine preservation in monastic archive vaults"
    },
    historicalInvention: {
      name: "The Double-Acting Wind Bellows",
      inventor: "Medieval Blacksmith Guilds",
      description: "A dual-chamber mechanical pump designed to direct a constant, uninterrupted stream of oxygen into high-temperature blast furnaces.",
      workingMechanism: "Mechanical compression of leather diaphragms.",
      lastingLegacy: "Allowed ironmasters to reach temperatures high enough to liquefy iron for cast tools."
    },
    mapDiscovery: {
      title: "Medieval Castle Defensive Rings",
      region: "The Rhine Valley Castles",
      description: "High masonry walls, curtain bastions, and dry moats designed to protect the trade roads and agricultural serf domains below.",
      coordinatesText: "50.15° N, 7.72° E (Rhine Gorge)",
      geographicalNote: "Positioned on high rocky volcanic cliffs to maximize long-range archer visual fields."
    },
    visualDiscovery: {
      name: "Illuminated Codex Manuscript",
      depiction: "Gold leaf and lapis lazuli illustrations depicting medieval monks cataloging rare garden herbs.",
      artStyle: "Gilt Vellum Miniature Painting",
      historicalContext: "Represents the meticulous dedication of isolated scriptoriums to preserve agricultural and medicinal records."
    }
  },
  6: {
    eraId: 6,
    title: "The Age of Blue Horizon",
    subtitle: "Sailing the Liquid Spheres",
    hiddenFact: {
      title: "The Scurvy Cure Secret",
      description: "Long-range ocean voyages routinely lost up to half their crew to scurvy. Indigenous navigators shared knowledge of evergreen needle teas, but the commercial empires failed to adopt vitamin C rations for centuries.",
      significance: "Highlights how logistical isolation can lead to critical scientific oversights."
    },
    rareArtifact: {
      name: "The Gilded Galleon Quadrant",
      origin: "Seville Navigation House",
      description: "An engraved, heavy brass measuring arc used by deep-sea pilots to calculate latitude based on the North Star elevation above the horizon.",
      materialComposition: "Cast Brass with hand-etched degree coordinates",
      restorationStatus: "Recovered from a sunken vessel, sandblasted of coral crusts"
    },
    historicalInvention: {
      name: "The Mercator Projection Map",
      inventor: "Gerardus Mercator (1569)",
      description: "A mathematical cylinder projection map that preserved constant compass bearings (rhumb lines) as straight lines across the sheet.",
      workingMechanism: "Conformal stretching of latitude lines at high poles.",
      lastingLegacy: "Provided sea captains with the ability to navigate across oceans along single straight courses."
    },
    mapDiscovery: {
      title: "The Spanish Silver Road (Flota)",
      region: "Potosi Mines to Seville Port",
      description: "The global commercial shipping pipeline that transferred vast silver bullion across oceans, triggering inflation in Europe and Asia.",
      coordinatesText: "19.58° S, 65.75° W (Potosi Silver Peak)",
      geographicalNote: "The highest mining settlement on Earth, yielding massive volumes of precious silver ore."
    },
    visualDiscovery: {
      name: "Sino-Portuguese Nanban Screen",
      depiction: "Detailed painting of black European carracks arriving at Nagasaki docks, met by curious local merchants.",
      artStyle: "Gilded Folding Screen Ink and Color",
      historicalContext: "Captures the intense visual curiosity and cultural friction when distant civilizations met for the first time."
    }
  },
  7: {
    eraId: 7,
    title: "The Iron and Coal Crucible",
    subtitle: "Steam, Pistons, and Smog",
    hiddenFact: {
      title: "The Great Stink Sanitation",
      description: "In 1858, the industrial waste in the Thames became so intense that the British Parliament had to drape sheets soaked in chloride of lime over their windows. This forced the construction of the world's first modern metropolitan sewer network.",
      significance: "Began the transformation of industrial towns into hygienically safe modern cities."
    },
    rareArtifact: {
      name: "Early Railway Master Clock",
      origin: "London Greenwich Junction",
      description: "A high-precision regulator clock fitted with electromagnetic mercury switches, used to synchronize regional station timetables to a single standard offset.",
      materialComposition: "Polished Mahogany Frame & Brass Pendulum Mechanics",
      restorationStatus: "Kept running continuously in national railway museums"
    },
    historicalInvention: {
      name: "The Jacquard Punchcard Loom",
      inventor: "Joseph Marie Jacquard (1804)",
      description: "A mechanical textile loom that utilized rigid, punched paper cards to weave complex brocade patterns automatically.",
      workingMechanism: "Punched holes in paper cards blocked or allowed mechanical needle passes.",
      lastingLegacy: "The earliest direct predecessor to digital binary computer binary coding systems."
    },
    mapDiscovery: {
      title: "The Coal Belt Web",
      region: "Midlands of England to Ruhr Valley",
      description: "High-density rail webs connecting coal basins to massive, smoking steel smelting foundries.",
      coordinatesText: "53.48° N, 2.24° W (Manchester Basin)",
      geographicalNote: "The central core of the early cotton mills, dubbed 'Cottonopolis' due to its extreme factory density."
    },
    visualDiscovery: {
      name: "The Iron Foundry Interior Painting",
      depiction: "A dark, atmospheric painting showing workers silhouetted against a brilliant white-orange cascade of molten metal.",
      artStyle: "Industrial Realism Oil on Canvas",
      historicalContext: "Highlights the awe, hazard, and colossal physical labor that powered the early steam machine age."
    }
  },
  8: {
    eraId: 8,
    title: "The Cybernetic Domain",
    subtitle: "Calculations at the Speed of Light",
    hiddenFact: {
      title: "The First Computer Bug",
      description: "In 1947, computer pioneer Grace Hopper was troubleshooting the Harvard Mark II system. She found a physical moth trapped inside relay contact #70, which was stopping the calculation. She taped the moth to her logbook, coining the term 'debugging'.",
      significance: "Bridges the physical mechanical world with the digital software space."
    },
    rareArtifact: {
      name: "Silicon Wafer #001",
      origin: "Silicon Valley Laboratories",
      description: "An early monocrystalline silicon wafer, containing integrated circuits etched with ultraviolet light, demonstrating micro-transistor fabrication.",
      materialComposition: "High-Purity Silicon with vaporized gold wiring",
      restorationStatus: "Stored in inert nitrogen gas chambers"
    },
    historicalInvention: {
      name: "The Packet Switching Protocol",
      inventor: "ARPANET Engineers",
      description: "A decentralized transmission protocol that breaks digital data into self-contained packets, routing them across a web of nodes dynamically before reassembly.",
      workingMechanism: "Header addressing with redundant path forwarding algorithms.",
      lastingLegacy: "Provided the robust, fail-safe communication model that enabled the modern global internet."
    },
    mapDiscovery: {
      title: "Subsea Fiber Optic Lifelines",
      region: "Trans-Atlantic and Trans-Pacific Abyssal Beds",
      description: "Deep sea light-conduits carrying 99% of global financial and cultural communication networks.",
      coordinatesText: "40.71° N, 74.00° W (New York Gateway)",
      geographicalNote: "Vulnerable transit points where dozens of subsea cables converge onto single coastal landing stations."
    },
    visualDiscovery: {
      name: "The Blue Marble Photograph",
      depiction: "A stunning, perfectly illuminated view of Earth floating as a solitary glass orb in black space, taken from Apollo 17.",
      artStyle: "70mm Hasselblad Color Film Photography",
      historicalContext: "Sparked the planetary environmental consciousness, revealing our absolute isolation and fragility."
    }
  },
  9: {
    eraId: 9,
    title: "The Cosmic Horizon",
    subtitle: "Designing the Kardashev Path",
    hiddenFact: {
      title: "The Quantum Entanglement Router",
      description: "By locking atomic states at ultra-cold Kelvin temperatures, engineers are working on secure quantum network lines that prevent eavesdropping by instantly collapsing states upon unauthorized observation.",
      significance: "Promises absolute, unbreakable security for orbital and planetary servers."
    },
    rareArtifact: {
      name: "The Graphene Solar Sail Filament",
      origin: "Lunar Orbital Dry-Docks",
      description: "A microscopic fragment of a super-strong, single-atom thick graphene sheet designed to catch solar radiation pressure to sail ships through the cosmos.",
      materialComposition: "Monolayer Carbon Lattice",
      restorationStatus: "Experimental grade, stored under clean laser suspension"
    },
    historicalInvention: {
      name: "The Controlled Fusion Tokamak",
      inventor: "Planetary Fusion Alliance",
      description: "A high-intensity magnetic containment chamber designed to heat deuterium and tritium into a stable plasma ring, achieving clean, infinite net energy.",
      workingMechanism: "Superconducting magnets creating magnetic bottle parameters.",
      lastingLegacy: "Provides deep cargo ships with the power to travel to outer solar system bases."
    },
    mapDiscovery: {
      title: "The Martian Valles Marineris Settlement",
      region: "Martian Equatorial Rift Valley",
      description: "An extensive network of subterranean biospheres protected from solar rays inside the deep canyon walls.",
      coordinatesText: "13.9° S, 59.2° W (Canyon Core)",
      geographicalNote: "The deep rift location provides higher atmospheric pressure and shields citizens from cosmic rays."
    },
    visualDiscovery: {
      name: "The Dyson Swarm Ring Mockup",
      depiction: "A magnificent planetary model showing thousands of solar collectors forming a shimmering gold orbital band around our sun.",
      artStyle: "Holographic Architectural Render",
      historicalContext: "Represents the ultimate leap of our species to harvest the total energy output of our local star."
    }
  }
};
