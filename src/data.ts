import { SlideData } from './types';

export const EXHAUSTIVE_SLIDE_DATA: SlideData[] = [
  {
    id: 1,
    eraName: "230 Million Years Ago",
    title: "Before Humanity",
    subtitle: "The Age Of Giants",
    summary: "For over 160 million years, dinosaurs reigned supreme. Earth was filled with colossal beasts, warm humid rainforests, and immense volcanoes sculpting our atmosphere. Every system today has ancestors from this untamed epic.",
    bullets: [
      "Dinosaurs emerged during the Triassic period following the Great Dying wave.",
      "The warm greenhouse climate allowed flora to grow into giants, sustaining massive herbivores.",
      "Apex carnivores developed extreme sensory mechanics and raw muscle velocity to hunt prey.",
      "This era terminated with the cataclysmic asteroid collision that opened up room for modern mammals."
    ],
    theme: {
      bgType: "image",
      bgUrl: "https://images.openai.com/static-rsc-4/ZBmcAqe4t_MpsP2V44PX6WIDGQbz8HH0_cPP2k1H760VQMenREVy6RmzGkHzRQfaDKOEzmuoQ60CxojJ-MyINMZyLq3VrOM70z7FDQOR-yfo35hEHZFbng4weZY64LzZhw5n7eWPFjsohcUdACv7j2vwblpImZRvHdKubfZtRRviN4Fink_EJWnccAaPHRBC?purpose=fullsize",
      overlayColor: "from-emerald-950/90 via-zinc-950/80 to-zinc-950/95",
      accentColor: "text-emerald-400 border-emerald-500 bg-emerald-500/10",
      indicatorColor: "bg-emerald-500"
    },
    hotspots: [
      { id: "giant-1", name: "Largest Dinosaur", shortFact: "Argentinosaurus", details: "Vast titan reaching over 115 feet long and weighing upward of 100 metric tons — a mountain in motion." },
      { id: "giant-2", name: "Fastest Predator", shortFact: "Gallimimus", details: "Sprinting up to 50 miles per hour (80 km/h) on specialized shock-absorbing biological legs." },
      { id: "giant-3", name: "Flying Sovereign", shortFact: "Pterosaurs", details: "Lighter than air with hollow bones and vast wingspans reaching over 36 feet (e.g. Quetzalcoatlus)." },
      { id: "giant-4", name: "Marine Overlord", shortFact: "Mosasaurus", details: "An armored marine leviathan that dominated oceans with massive jaws capable of crushing ancient steel equivalents." }
    ]
  },
  {
    id: 2,
    eraName: "10,000 BCE to 3,000 BCE",
    title: "The First Cities",
    subtitle: "Dawn Of Civilization",
    summary: "With the recession of the Ice Age, humanity learned to tame wild crops. In the Fertile Crescent, mudbrick settlements grew into legendary trade centers governed by written codexes, giving birth to permanent civilization.",
    bullets: [
      "The domestication of wheat transformed nomadic hunters into regional sedentary producers.",
      "Elaborate canals and rivers were redirected to secure seasonal crop yields against droughts.",
      "Cuneiform scribes in ancient Sumer forged the world’s first writing system on wet clay tablets.",
      "The rise of ziggurats and common laws unified millions under single city networks."
    ],
    theme: {
      bgType: "image",
      bgUrl: "https://images.openai.com/static-rsc-4/rKT_9DOaXFrgSFePWOrXW1TOZaZa4OFnn72LFgfSin-NRi-gfHoj5yY_0NRDxqdPHkTI96f8ZKw9Q6qTN9Tb_EDA0kphWZjU7ySf976fw3y3gJFfmy5px1_ELJEVNUpCF4byuz-xEmF5ug764BYplDGvNxYFd8tjZ0ZrxdUC6fU?purpose=inline",
      overlayColor: "from-amber-950/90 via-zinc-950/80 to-zinc-950/95",
      accentColor: "text-amber-400 border-amber-500 bg-amber-500/10",
      indicatorColor: "bg-amber-400"
    },
    timeline: [
      { year: "10000 BCE", title: "Agricultural Revolution", description: "First domestication of wheat, barley, and sheep in Mesopotamian fertile valleys." },
      { year: "8000 BCE", title: "Early Fortresses", description: "Settlers in Jericho establish high defensive brick walls and standard storage silos." },
      { year: "4500 BCE", title: "Uruk Emerges", description: "The world's first true mega-city is built with high canals and complex trade networks." },
      { year: "3000 BCE", title: "Cuneiform Tablets", description: "Birth of writing in Sumer to log seasonal grain accounts and cosmic star patterns." }
    ]
  },
  {
    id: 3,
    eraName: "3300 BCE to 500 CE",
    title: "Ancient India",
    subtitle: "Cradle Of Knowledge & Sovereigns",
    summary: "Along the fertile Indus Valley and massive subcontinental plateaus, early urban master-planners established high-density mathematical cities. Guided by legendary Great Kings who unified vast territories under righteous law, this Vedic golden era nurtured cosmic philosophy, the revolutionary utility of Zero, Ayurvedic science, and global centers of scholarship.",
    bullets: [
      "Indus Valley pre-planners constructed orthogonal grid roads with underground covered stone drains.",
      "Legendary Indian sovereigns built mighty, prosperous empires that spread mathematics, arts, and global message of peace.",
      "The invention of the Decimal System and absolute Zero redefined mathematical calculations globally.",
      "Ancient universities like Nalanda and Takshashila drew thousands of international philosophers."
    ],
    theme: {
      bgType: "image",
      bgUrl: "https://images.openai.com/static-rsc-4/ADZUPRkV7H6iyosZ-cRjmPsfFD7UZ-xjkAWDLrFEFEWVQludw1dr53OQ7r6Kg6zjlw9G-0Itek6N2BN8UombLP_HXWxSUas38k7qOKEO7YOC61evJd2snJhOUgVYG6ccLX6LCUzcku_doP8mwgl0uhTql97YrhNIVs3nuLnfQA_Za3WIz9LdRY06E89ukDB5?purpose=fullsize",
      overlayColor: "from-orange-950/90 via-zinc-950/80 to-zinc-950/95",
      accentColor: "text-orange-400 border-orange-500 bg-orange-500/10",
      indicatorColor: "bg-orange-500"
    },
    hotspots: [
      { id: "india-1", name: "Srinivasa Zero", shortFact: "Numerical Nirvana", details: "Redefined mathematics by establishing Zero not just as a placeholder, but as a numeric value." },
      { id: "india-2", name: "Ayurvedic Codex", shortFact: "Sushruta Samhita", details: "Wrote exhaustive surgical methods, detailing rhinoplasty, cataracts, and clean medical instrument procedures." },
      { id: "india-3", name: "Mohenjo-daro", shortFact: "Advanced Drainage", details: "Pioneered grid architectures with standardized baked brick sizes and high-pressure waste-flushing systems." },
      { id: "india-4", name: "Nalanda Library", shortFact: "Dharmaganja", details: "A master library holding over nine million manuscripts in the ancient global cradle of higher education." }
    ]
  },
  {
    id: 4,
    eraName: "500 BCE to 400 CE",
    title: "Rise of Empires",
    subtitle: "Power, Conquest, Innovation",
    summary: "As cities merged, vast regional empires established state structures. Rome forged deep architectural conduits and universal legal codes, while Greece explored democracy, and Persia unified trade highways.",
    bullets: [
      "The Roman state engineered high multi-tiered aqueducts and massive military stone highways.",
      "Greek academies drafted classical concepts of geometry, astronomy, and citizen self-governance.",
      "The Silk Road dynamic trade loop connected China's Han dynasty to Mediterranean harbors.",
      "The Persian empire centralized legal codes, monetary coins, and highly secure courier delivery lines."
    ],
    theme: {
      bgType: "image",
      bgUrl: "https://images.openai.com/static-rsc-4/FuNtzgvugbMcQ3Lx_oMog7mhmMEMbQ5sxF00WH4LzdNWGINjl5WDf_fSz6IJooGnrR5z5n_tx7gFY396I1stxNKfdAtMfxBcLj4jtg0KXErMrgKnSWU3T1rGJ60UBUld8A1lPWwDhh2nOWH0QabtuRfFzassrtYJbDRQk8k6l8E?purpose=inline",
      overlayColor: "from-red-950/90 via-zinc-950/80 to-zinc-950/95",
      accentColor: "text-red-400 border-red-500 bg-red-400/10",
      indicatorColor: "bg-red-500"
    },
    empires: [
      { id: "emp-rome", name: "Roman Empire", era: "27 BCE - 395 CE", subtitle: "Epitome of Infrastructure", leader: "Augustus Caesar", capital: "Rome", contribution: "Aqueducts, arches, concrete masonry, civil codexes, and the Pax Romana highways.", mapCoordinates: "M 40,20 Q 55,10 70,30" },
      { id: "emp-greece", name: "Greek States", era: "500 BCE - 146 BCE", subtitle: "Intellectual Cradle", leader: "Pericles", capital: "Athens", contribution: "Democratic assemblies, philosophical logic, mathematical theorems (Pythagoras, Euclid).", mapCoordinates: "M 30,50 Q 50,40 65,55" },
      { id: "emp-persia", name: "Achaemenid Empire", era: "550 BCE - 330 BCE", subtitle: "The Silk Intercept", leader: "Cyrus the Great", capital: "Persepolis", contribution: "The Royal Road postal network, the Cyrus Cylinder human rights document, religious tolerance.", mapCoordinates: "M 20,80 Q 40,60 80,75" },
      { id: "emp-china", name: "Han Dynasty", era: "202 BCE - 220 CE", subtitle: "Eastern trade dynamo", leader: "Emperor Wu", capital: "Chang'an", contribution: "Inception of the Silk Road cross-continental networks, invention of paper, state examinations.", mapCoordinates: "M 10,10 Q 30,30 50,20" }
    ]
  },
  {
    id: 5,
    eraName: "500 CE to 1500 CE",
    title: "Age of Kingdoms",
    subtitle: "The Medieval World",
    summary: "Beneath high castle battlements, a complex synthesis of feudal codes, regional guilds, and theological architecture occurred. Monasteries and active House of Wisdom nodes preserved and evolved global science.",
    bullets: [
      "Stone keeps and thick-walled fortresses served as physical and political hubs for kingdoms.",
      "The Islamic golden age Baghdad Library translated and perfected classic Greek calculations.",
      "Feudal covenants managed agricultural production via new heavy iron plough loops.",
      "Guild systems of master artisans standardized the quality of textile-making and masonry."
    ],
    theme: {
      bgType: "image",
      bgUrl: "https://images.openai.com/static-rsc-4/7hLyJ8RXpXCRYUahtmpW4Q8dd7UzEnZbDhOXsYt_8ZCAbcFsVznQdfiRqFFqrYGI0R2VjiIIXavz6n7-Pd4Uac51Lz6hRuqdsHg3KDsbwqfKRFD5muiIDfCK9naRwwjNeeJ9njh1woKZjgASnnhHSViGyWXBXmSUmwYHiAFME6jt3BuZV6GRQ1_r805Qu4Ds?purpose=fullsize",
      overlayColor: "from-sky-950/90 via-zinc-950/80 to-zinc-950/95",
      accentColor: "text-sky-400 border-sky-500 bg-sky-500/10",
      indicatorColor: "bg-sky-400"
    },
    medievalTech: [
      { name: "Heavy Iron Plough", description: "Double-wheeled blade that churned deep dense clay fields, increasing harvest scale.", impact: "Doubled northern European agrarian population inside three centuries.", icon: "shovel" },
      { name: "Water Clocks & Escapements", description: "Hydro-mechanical gears configured to toll hours independent of solar position.", impact: "Standardized modern time segments and labor hours.", icon: "hourglass" },
      { name: "Astrolabe Perfection", description: "Portable star computing device calibrated to verify solar altitudes.", impact: "Secured safe desert and coastal marine navigational parameters.", icon: "explore" },
      { name: "Gothic Ribbed Vaults", description: "Redistributed roof pressures downwards, facilitating towering glass cathedrals.", impact: "Created vertical acoustics and visual light displays.", icon: "architecture" }
    ]
  },
  {
    id: 6,
    eraName: "1500 CE to 1700 CE",
    title: "Exploring the Unknown",
    subtitle: "Age Of Exploration",
    summary: "Seafaring caravels crossed the unknown ocean barriers, connecting isolated continents. This volatile age connected hemispheres through commerce, botanical transitions, and dangerous global voyages.",
    bullets: [
      "Ocean-going caravels with lateen sails tackled high-velocity trade wind streams.",
      "Astrolabes and dry magnetic compasses secured safer open-sea path trajectories.",
      "The exchange of western maize and Eastern rice permanently modified the global bio-diet.",
      "Cartographers drafted high-precision global maps, revealing the real geometry of continents."
    ],
    theme: {
      bgType: "image",
      bgUrl: "https://images.openai.com/static-rsc-4/h2oO9AhhG85QHEFidL6rscmXQy1GqswcF-LG1ErpN0y-gi0wBrK6sI_NrY4wmGxzrmQBBeS64OcDz64D7XwcfHVD6Q9vcHOCRZG9s6QZYrSF5YEgmuuob1uMUD7V5O9Fu3CTaC62jFxgzR9oQknjs6qpH_d2iycWkGSmLObn3OsRNTCzVccPSQ_EOQN-gpz7?purpose=fullsize",
      overlayColor: "from-teal-950/90 via-zinc-950/80 to-zinc-950/95",
      accentColor: "text-teal-400 border-teal-500 bg-teal-500/10",
      indicatorColor: "bg-teal-500"
    },
    explorerRoutes: [
      { explorer: "Zheng He", years: "1405 - 1433 CE", origin: "Nanjing, China", destinations: "East Africa, India, Persian Gulf", ship: "Vast multi-decked Wood Treasure Ships", impact: "Established grand diplomatic tribute links across the complete Indian Ocean basin." },
      { explorer: "Vasco da Gama", years: "1497 - 1499 CE", origin: "Lisbon, Portugal", destinations: "Calicut, India via Cape of Good Hope", ship: "São Gabriel Caravel", impact: "Bypassed traditional overland monopolies, paving direct ocean-trade networks to South Asia." },
      { explorer: "Ferdinand Magellan", years: "1519 - 1522 CE", origin: "Seville, Spain", destinations: "First Global Circumnavigation", ship: "Victoria Galleon", impact: "First to thread the Pacific, providing empirical proof of Earth's continuous ocean sphere." }
    ]
  },
  {
    id: 7,
    eraName: "1760 CE to 1914 CE",
    title: "Machines Change Humanity",
    subtitle: "Industrial Revolution",
    summary: "By burning coal to release superheated steam, humanity replaced hand muscles with automatic iron pistons. Heavy steam engines and railway networks reshaped human work, transportation, and city density.",
    bullets: [
      "Steam machines replaced home workshops with mass-producing city factories.",
      "Steam locomotives and metal rail webs shrank continental travel times from weeks to days.",
      "Vast rural migrations converged on industrial city networks, creating urban systems.",
      "Precision metal tool-lathes made standard replacement parts possible for global machinery."
    ],
    theme: {
      bgType: "image",
      bgUrl: "https://images.openai.com/static-rsc-4/2dThR_77GNIJwgrh9EOqsKTkq2jcMw5U_PvH3-cwG60uvo1kxcqyJJDa1hTXgG5-xqfL5_J_-Qa3gwnhO2e8zCvKVgs5D-ESZX5M-Dbf0ia5Bgs_AFunUJB1szqUPCa2U_5B-NC5ikJwi3r7k4NzqKIB7gaBK24Dw2fV7s9DlEDC5j0dFHO6PVUQvXJ4cq5P?purpose=fullsize",
      overlayColor: "from-purple-950/90 via-zinc-950/80 to-zinc-950/95",
      accentColor: "text-purple-400 border-purple-500 bg-purple-500/10",
      indicatorColor: "bg-purple-500"
    },
    timeline: [
      { year: "1769", title: "Watt's Steam Condenser", description: "James Watt invents the high-efficiency condenser, scaling up mining and mill automated power." },
      { year: "1804", title: "The Steam Locomotive", description: "First track steam engine drives in industrial Wales, starting high-speed rail transportation." },
      { year: "1856", title: "Bessemer Steel", description: "Cheaper structural steel production makes large railroads and skyscrapers a reality." },
      { year: "1879", title: "Filament Grid Electric", description: "Edisonian bulb power grids replace dangerous open fire illumination inside factories." }
    ]
  },
  {
    id: 8,
    eraName: "1950 CE to Present",
    title: "The Connected World",
    subtitle: "Digital & Modern Era",
    summary: "The invention of Silicon microchips transformed static work into instant light-speed calculations. The internet and neural networks connected the entire human brain, creating a digital layer over Earth.",
    bullets: [
      "Transistor scaling compressed massive calculators into computers that fit inside pockets.",
      "Unified network protocols woven into subsea light cables connected people instantly.",
      "Rocket launches and moon footprints expanded human boundaries into deep space.",
      "Machine learning models began mapping and analyzing complex global data patterns."
    ],
    theme: {
      bgType: "image",
      bgUrl: "https://images.openai.com/static-rsc-4/bLm7GXAxmRoUK5Z5HSRxI6ZvdrqZrkOlQEXJ1IKQdIRC11aSj6kvfkHS5FCoMfWRDbYgJqd8u14DsYql7JOrQPuFsozDE2hbFn3IcPZ7SjCrJ86eCbbKuUqwSMT9qQAt9KKUdGeAgv71jmico3If0xlkPihV8SOeIlE7OkSkcw-htAh8fif52_KjhdGx7gAi?purpose=fullsize",
      overlayColor: "from-indigo-950/90 via-zinc-950/80 to-zinc-950/95",
      accentColor: "text-indigo-400 border-indigo-500 bg-indigo-500/10",
      indicatorColor: "bg-indigo-500"
    },
    hotspots: [
      { id: "mod-1", name: "Silicon Microchip", shortFact: "Nano-Logic gates", details: "Millions of transistors integrated onto microscopic silicon, switching states at gigahertz velocity." },
      { id: "mod-2", name: "Subsea Fiber Optic", shortFact: "Light Speed Data", details: "Glass pipelines resting on tectonic ocean beds, routing the internet via laser pulses." },
      { id: "mod-3", name: "Sputnik & Apollo", shortFact: "Expanding Humanity", details: "Bypassed atmospheric bounds, placing footprints on Moon soil and launching active satellite grids." }
    ]
  },
  {
    id: 9,
    eraName: "Present to Future",
    title: "The Future Awaits",
    subtitle: "Future Civilization",
    summary: "As humanity steps forward, we merge intelligence with deep technology. From clean solar orbits to Martian bases and quantum circuits, we are designing the next steps of our civilization.",
    bullets: [
      "Intelligent neural grids automate solar energy harvesting and balance global eco-networks.",
      "Biotechnology advances and custom medicine will double healthy human life spans.",
      "Quantum computers calculate deep molecular compounds in seconds instead of millennia.",
      "Fusion cargo transports travel through deep space to create bases on Mars and the outer planets."
    ],
    theme: {
      bgType: "image",
      bgUrl: "https://images.openai.com/static-rsc-4/zAUEEyvyAJv6FTXuS9_-_ltL7-msy3P5Wi3YjJHIuceHWrdv7aF03au_pAmMGN1yPkKfeD9yZM_xbktY3Dms29GSS8RDztF5RGi6O5nJBa7kn30Vmqll2cqtTImykwf5-DEpIjsz5xca9fCnWrEqqxIhyFvGhwJvNkAHE9-y1DydhoxIBvTF9ouOMS5oGHgD?purpose=fullsize",
      overlayColor: "from-rose-950/90 via-zinc-950/80 to-zinc-950/95",
      accentColor: "text-rose-400 border-rose-500 bg-rose-500/10",
      indicatorColor: "bg-rose-500"
    },
    predictions: [
      { year: "2050", gridTitle: "Solar Orbit Grid", techBreakthrough: "Direct Orbital Energy Streams", societalShift: "Full Carbon Neutrality Woven into Cities", planetaryScale: "Near Earth Orbit Drone Networks" },
      { year: "2100", gridTitle: "Martian Base Ascent", techBreakthrough: "Sub-surface Biosphere Cities", societalShift: "First Multi-Planet Native Generation", planetaryScale: "Self-Sustaining Mars outpost" },
      { year: "2200", gridTitle: "Dyson Swarm Inception", techBreakthrough: "Star Ring Solar Harvesters", societalShift: "Type-II Kardashev Scale power levels", planetaryScale: "Complete Solar System Network" },
      { year: "2500", gridTitle: "Deep Interstellar Gate", techBreakthrough: "Warp Signature Acceleration", societalShift: "Humanity reaches beyond our local solar system", planetaryScale: "Orion Arm Exploratory Mission" }
    ]
  }
];
