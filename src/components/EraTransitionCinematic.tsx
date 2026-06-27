import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { AudioEngine } from '../utils/audio';

interface EraTransitionCinematicProps {
  id: number;
  title: string;
  year: string;
  subtitle: string;
  glowColor: string;
  bgSolid: string;
  onComplete: () => void;
}

// Bespoke background decoration component based on the active era
const EraThemeDecoration: React.FC<{ id: number; color: string }> = ({ id, color }) => {
  // Common sparks/particles helper
  const renderSparks = (count: number, colors: string[], speedRange: [number, number], yDirection: 'up' | 'down' = 'up') => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 4 + 2;
      const startX = Math.random() * 100;
      const startY = yDirection === 'up' ? 110 : -10;
      const endY = yDirection === 'up' ? -10 : 110;
      const duration = Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0];
      const delay = Math.random() * 1.5;
      const randomXOffset = (Math.random() - 0.5) * 30;

      return (
        <motion.div
          key={`spark-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: size,
            height: size,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            left: `${startX}%`,
            boxShadow: `0 0 8px ${colors[0]}`,
          }}
          initial={{ y: `${startY}vh`, x: `${startX}%`, opacity: 0 }}
          animate={{
            y: `${endY}vh`,
            x: `${startX + randomXOffset}%`,
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: duration,
            delay: delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      );
    });
  };

  switch (id) {
    case 0: // Temporal Quanta
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 mix-blend-screen">
          {/* Luminous floating quantum nodes and connections */}
          {renderSparks(30, [color, '#ffffff', '#a78bfa'], [4, 8], 'up')}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Bohr-like orbital paths */}
            {[1, 2, 3].map((idx) => (
              <motion.div
                key={idx}
                className="absolute border border-dashed rounded-full"
                style={{
                  borderColor: `${color}40`,
                  width: `${idx * 160}px`,
                  height: `${idx * 160}px`,
                }}
                animate={{
                  rotate: idx % 2 === 0 ? 360 : -360,
                }}
                transition={{
                  duration: 10 + idx * 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {/* Orbital electron */}
                <motion.div
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: color,
                    top: '-6px',
                    left: '50%',
                    boxShadow: `0 0 12px ${color}`,
                  }}
                  animate={{
                    scale: [1, 1.4, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      );

    case 1: // Prehistoric
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          {/* Drifting primeval green/amber fireflies and leaf silhouettes */}
          {renderSparks(25, [color, '#f59e0b', '#10b981'], [5, 9], 'up')}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.svg
              width="450"
              height="450"
              viewBox="0 0 100 100"
              className="absolute text-emerald-500/10"
              initial={{ rotate: 0, scale: 0.8 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              {/* Abstract primitive fern/leaf fronds */}
              <path
                d="M50 10 C 35 30, 20 40, 50 90 C 80 40, 65 30, 50 10 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />
              <path
                d="M50 25 C 40 40, 30 50, 50 90 C 70 50, 60 40, 50 25 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="1 1"
              />
            </motion.svg>
          </div>
        </div>
      );

    case 2: // Sandstone / Ancient Civilizations
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-35">
          {/* Desert/sand golden dust particles */}
          {renderSparks(25, [color, '#fbbf24', '#78350f'], [6, 10], 'up')}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Mesopotamian / Egyptian Sun Disk decoration */}
            <motion.svg
              width="360"
              height="360"
              viewBox="0 0 100 100"
              className="absolute"
              style={{ color: `${color}15` }}
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            >
              <circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="0.75" />
              <circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * Math.PI) / 4;
                const x1 = 50 + Math.cos(angle) * 24;
                const y1 = 50 + Math.sin(angle) * 24;
                const x2 = 50 + Math.cos(angle) * 42;
                const y2 = 50 + Math.sin(angle) * 42;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                );
              })}
            </motion.svg>
          </div>
        </div>
      );

    case 3: // India Gold
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          {/* Floating gold glitter */}
          {renderSparks(35, [color, '#f59e0b', '#ffffff'], [4, 8], 'up')}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Stylized Indian Lotus / Mandala outline */}
            <motion.svg
              width="400"
              height="400"
              viewBox="0 0 100 100"
              className="absolute"
              style={{ color: `${color}18` }}
              animate={{
                rotate: 360,
                scale: [0.92, 1.05, 0.92],
              }}
              transition={{
                rotate: { duration: 80, repeat: Infinity, ease: 'linear' },
                scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              {/* Petals of the lotus */}
              {Array.from({ length: 12 }).map((_, i) => {
                const rotation = i * 30;
                return (
                  <g key={i} transform={`rotate(${rotation} 50 50)`}>
                    <path
                      d="M50 50 C45 35, 40 20, 50 5 C60 20, 55 35, 50 50"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.6"
                    />
                  </g>
                );
              })}
              <circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="0.8" />
            </motion.svg>
          </div>
        </div>
      );

    case 4: // Roman Empire
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          {/* Crimson & gold sparkles */}
          {renderSparks(25, [color, '#ef4444', '#b91c1c'], [5, 9], 'up')}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Roman Laurel Wreath outline */}
            <motion.svg
              width="420"
              height="420"
              viewBox="0 0 100 100"
              className="absolute"
              style={{ color: `${color}15` }}
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Left branch */}
              <path
                d="M30 75 C15 55, 15 35, 35 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              {/* Right branch */}
              <path
                d="M70 75 C85 55, 85 35, 65 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              {/* Leaves */}
              {Array.from({ length: 6 }).map((_, i) => {
                const yPos = 25 + i * 8;
                return (
                  <g key={i}>
                    {/* Left leaves */}
                    <path d={`M ${28 - i * 1} ${yPos} Q ${18 - i * 1.5} ${yPos - 4} ${26 - i * 0.8} ${yPos - 6}`} fill="none" stroke="currentColor" strokeWidth="0.8" />
                    {/* Right leaves */}
                    <path d={`M ${72 + i * 1} ${yPos} Q ${82 + i * 1.5} ${yPos - 4} ${74 + i * 0.8} ${yPos - 6}`} fill="none" stroke="currentColor" strokeWidth="0.8" />
                  </g>
                );
              })}
            </motion.svg>
          </div>
        </div>
      );

    case 5: // Medieval
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-35">
          {/* Deep blue and iron-grey embers */}
          {renderSparks(24, [color, '#3b82f6', '#94a3b8'], [6, 10], 'up')}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Heraldic shield / fortress elements */}
            <motion.svg
              width="380"
              height="380"
              viewBox="0 0 100 100"
              className="absolute"
              style={{ color: `${color}12` }}
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path
                d="M25 20 H75 V45 C75 65, 50 85, 50 85 C50 85, 25 65, 25 45 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
              />
              <path
                d="M50 20 V85"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />
              <path
                d="M25 45 H75"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />
            </motion.svg>
          </div>
        </div>
      );

    case 6: // Exploration
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          {/* Oceanic blue sparkles drifting */}
          {renderSparks(30, [color, '#38bdf8', '#0369a1'], [5, 9], 'down')}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Nautical Compass Rose */}
            <motion.svg
              width="440"
              height="440"
              viewBox="0 0 100 100"
              className="absolute"
              style={{ color: `${color}18` }}
              animate={{ rotate: 360 }}
              transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
            >
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.4" />
              <circle cx="50" cy="50" r="37" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1 2" />
              {/* Compass points */}
              <polygon points="50,10 53,47 50,50" fill="currentColor" opacity="0.8" />
              <polygon points="50,10 47,47 50,50" fill="none" stroke="currentColor" strokeWidth="0.3" />
              <polygon points="50,90 47,53 50,50" fill="currentColor" opacity="0.8" />
              <polygon points="50,90 53,53 50,50" fill="none" stroke="currentColor" strokeWidth="0.3" />
              <polygon points="90,50 53,53 50,50" fill="currentColor" opacity="0.8" />
              <polygon points="90,50 53,47 50,50" fill="none" stroke="currentColor" strokeWidth="0.3" />
              <polygon points="10,50 47,47 50,50" fill="currentColor" opacity="0.8" />
              <polygon points="10,50 47,53 50,50" fill="none" stroke="currentColor" strokeWidth="0.3" />
            </motion.svg>
          </div>
        </div>
      );

    case 7: // Industrial
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          {/* Intense amber/coal sparks rising */}
          {renderSparks(40, [color, '#ea580c', '#f97316'], [3, 6], 'up')}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Interlocking gear cogs rotating in opposite directions */}
            <motion.div
              className="absolute"
              style={{
                width: '180px',
                height: '180px',
                transform: 'translate(-60px, -60px)',
              }}
            >
              <motion.svg
                viewBox="0 0 100 100"
                style={{ color: `${color}18` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              >
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
                {Array.from({ length: 8 }).map((_, i) => (
                  <rect
                    key={i}
                    x="45"
                    y="10"
                    width="10"
                    height="80"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    transform={`rotate(${i * 45} 50 50)`}
                  />
                ))}
              </motion.svg>
            </motion.div>
            <motion.div
              className="absolute"
              style={{
                width: '130px',
                height: '130px',
                transform: 'translate(65px, 65px)',
              }}
            >
              <motion.svg
                viewBox="0 0 100 100"
                style={{ color: `${color}18` }}
                animate={{ rotate: -360 }}
                transition={{ duration: 13, repeat: Infinity, ease: 'linear' }}
              >
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
                {Array.from({ length: 8 }).map((_, i) => (
                  <rect
                    key={i}
                    x="45"
                    y="10"
                    width="10"
                    height="80"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    transform={`rotate(${i * 45 + 22.5} 50 50)`}
                  />
                ))}
              </motion.svg>
            </motion.div>
          </div>
        </div>
      );

    case 8: // Modern Network
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-35">
          {/* Cybernetic code elements / digital pulses */}
          {renderSparks(30, [color, '#34d399', '#ffffff'], [4, 7], 'up')}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Tech network matrix mesh background */}
            <div className="w-full h-full absolute opacity-20" style={{
              backgroundImage: `radial-gradient(${color} 1.5px, transparent 1.5px)`,
              backgroundSize: '24px 24px'
            }} />
            <motion.svg
              width="450"
              height="450"
              viewBox="0 0 100 100"
              className="absolute"
              style={{ color: `${color}20` }}
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
            >
              {/* Abstract circuit node web */}
              <circle cx="50" cy="50" r="5" fill="currentColor" />
              <circle cx="20" cy="30" r="3" fill="currentColor" />
              <circle cx="80" cy="30" r="3" fill="currentColor" />
              <circle cx="30" cy="75" r="3" fill="currentColor" />
              <circle cx="70" cy="75" r="3" fill="currentColor" />
              <line x1="50" y1="50" x2="20" y2="30" stroke="currentColor" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="80" y2="30" stroke="currentColor" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="30" y2="75" stroke="currentColor" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="70" y2="75" stroke="currentColor" strokeWidth="0.5" />
              <line x1="20" y1="30" x2="80" y2="30" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1 1" />
              <line x1="30" y1="75" x2="70" y2="75" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1 1" />
            </motion.svg>
          </div>
        </div>
      );

    case 9: // Future
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-45">
          {/* Super-fast starlight streaks shooting from center */}
          {Array.from({ length: 30 }).map((_, i) => {
            const angle = Math.random() * Math.PI * 2;
            const delay = Math.random() * 1.5;
            const duration = Math.random() * 1.2 + 0.8;
            return (
              <motion.div
                key={`star-${i}`}
                className="absolute w-[2px] rounded-full pointer-events-none"
                style={{
                  height: Math.random() * 30 + 15,
                  backgroundColor: '#ffffff',
                  boxShadow: `0 0 10px ${color}, 0 0 20px #ffffff`,
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'top center',
                }}
                initial={{ rotate: `${(angle * 180) / Math.PI}deg`, scaleY: 0.1, y: 0, opacity: 0 }}
                animate={{
                  scaleY: [0.1, 1.5, 0.1],
                  y: [0, 450],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: duration,
                  delay: delay,
                  repeat: Infinity,
                  ease: 'easeIn',
                }}
              />
            );
          })}
          {/* Holographic rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="absolute rounded-full border-2 border-dashed"
              style={{
                borderColor: `${color}30`,
                width: '280px',
                height: '280px',
              }}
              animate={{ rotate: 360, scale: [0.95, 1.05, 0.95] }}
              transition={{
                rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
                scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              }}
            />
          </div>
        </div>
      );

    case 10: // Finale
    default:
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          {/* Shimmering cosmic dust and Roman/numeric glyph indicators */}
          {renderSparks(35, [color, '#f59e0b', '#ffffff'], [4, 8], 'up')}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Concentric rotating clockwork alignments */}
            {[200, 320, 440].map((radius, index) => (
              <motion.div
                key={radius}
                className="absolute border border-dashed rounded-full flex items-center justify-center"
                style={{
                  borderColor: `${color}18`,
                  width: `${radius}px`,
                  height: `${radius}px`,
                }}
                animate={{
                  rotate: index % 2 === 0 ? 360 : -360,
                }}
                transition={{
                  duration: 20 + index * 10,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {index === 1 && (
                  <div className="absolute inset-0 flex items-center justify-between px-2 font-mono text-[9px]" style={{ color: `${color}40` }}>
                    <span>XII</span>
                    <span>VI</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      );
  }
};

// Premium, lightweight, highly performant 3D HTML5 Canvas Time-Travel Warp Tunnel
const ChronoFlightTunnel: React.FC<{ color: string }> = ({ color }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialise stars/particles for warp travel
    const stars: { x: number; y: number; z: number; size: number; color: string }[] = [];
    for (let i = 0; i < 220; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 1600,
        y: (Math.random() - 0.5) * 1600,
        z: Math.random() * 2000 + 100,
        size: Math.random() * 2.2 + 0.8,
        color: Math.random() > 0.4 ? '#ffffff' : color,
      });
    }

    // Tunnel rings
    const rings: { z: number; rotation: number; speed: number }[] = [];
    for (let i = 0; i < 15; i++) {
      rings.push({
        z: (i / 15) * 2000 + 50,
        rotation: Math.random() * Math.PI * 2,
        speed: (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
      });
    }

    let startTime = Date.now();

    const draw = () => {
      if (!ctx || !canvas) return;
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / 2600, 1.0); // 2.6s total transition path

      // Clear with dark alpha trailing for motion blur
      ctx.fillStyle = `rgba(10, 10, 10, ${progress < 0.2 ? 0.35 : progress < 0.6 ? 0.18 : 0.25})`;
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // 1. ZOOMING STARS (Phase 1 & Phase 2)
      // Stars speed increases over time to create warp effect
      const warpSpeed = progress < 0.3 
        ? 5 + progress * 60 
        : progress < 0.7 
          ? 23 + Math.sin((progress - 0.3) * Math.PI) * 45 
          : 68 - (progress - 0.7) * 90; // slowdown towards portal end

      stars.forEach((star) => {
        star.z -= warpSpeed;
        if (star.z <= 0) {
          star.z = 2000;
          star.x = (Math.random() - 0.5) * 1600;
          star.y = (Math.random() - 0.5) * 1600;
        }

        // 3D perspective projection
        const px = (star.x / star.z) * width + cx;
        const py = (star.y / star.z) * height + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          // Calculate length of the speed line
          const sizeFactor = (1 - star.z / 2000);
          const size = star.size * sizeFactor * 2.5;
          const length = warpSpeed * 0.65 * sizeFactor;

          // Radial angle from center to draw speed lines
          const angle = Math.atan2(py - cy, px - cx);
          
          ctx.strokeStyle = star.color;
          ctx.lineWidth = size;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px - Math.cos(angle) * length, py - Math.sin(angle) * length);
          ctx.stroke();
        }
      });

      // 2. TIME TUNNEL SPIRAL RINGS (Phase 2 & Phase 3)
      if (progress > 0.15 && progress < 0.85) {
        const tunnelOpacity = progress < 0.4
          ? (progress - 0.15) / 0.25
          : progress > 0.7
            ? (0.85 - progress) / 0.15
            : 1.0;

        rings.forEach((ring) => {
          ring.z -= warpSpeed * 0.85;
          ring.rotation += ring.speed;
          if (ring.z <= 10) {
            ring.z = 2000;
          }

          const scale = 450 / ring.z;
          const radiusX = width * 0.35 * scale;
          const radiusY = height * 0.35 * scale;

          if (radiusX > 2 && radiusY > 2 && radiusX < width * 2) {
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(ring.rotation);

            ctx.strokeStyle = color;
            ctx.lineWidth = Math.min(6, Math.max(1, 4 * scale));
            ctx.shadowColor = color;
            ctx.shadowBlur = 10;
            ctx.globalAlpha = tunnelOpacity * 0.4;

            // Draw beautiful stylized octagonal/circular temporal rings
            ctx.beginPath();
            const segments = 8;
            for (let s = 0; s <= segments; s++) {
              const theta = (s / segments) * Math.PI * 2;
              const rx = radiusX * (1 + Math.sin(theta * 3 + elapsed * 0.01) * 0.05);
              const ry = radiusY * (1 + Math.cos(theta * 3 + elapsed * 0.01) * 0.05);
              const sx = rx * Math.cos(theta);
              const sy = ry * Math.sin(theta);
              if (s === 0) ctx.moveTo(sx, sy);
              else ctx.lineTo(sx, sy);
            }
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
          }
        });
      }

      // 3. CENTRAL PORTAL GATE APPEARS & EXPANDS (Phase 3 & Phase 4)
      if (progress > 0.55) {
        const portalProgress = (progress - 0.55) / 0.45; // 0.0 to 1.0
        const portalRadius = Math.pow(portalProgress, 3) * Math.max(width, height) * 1.6;

        ctx.save();
        // Dynamic volumetric circular gradient flare
        const grad = ctx.createRadialGradient(cx, cy, portalRadius * 0.05, cx, cy, portalRadius);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.12, `${color}f0`);
        grad.addColorStop(0.35, `${color}44`);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, portalRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // White flash/shimmer at peak portal crossing
      if (progress > 0.88) {
        const flashProgress = (progress - 0.88) / 0.12;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.sin(flashProgress * Math.PI) * 0.85})`;
        ctx.fillRect(0, 0, width, height);
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 block pointer-events-none"
    />
  );
};

export const EraTransitionCinematic: React.FC<EraTransitionCinematicProps> = ({
  id,
  title,
  year,
  subtitle,
  glowColor,
  bgSolid,
  onComplete,
}) => {
  // Setup keyboard listener to make the cinematic transition skippable
  useEffect(() => {
    const handleKeyDown = () => {
      onComplete();
    };
    
    // Add event listeners for key press and mouse click anywhere
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  // Set an auto-complete timer to close after 2.6 seconds (snappy AAA cinematic flight)
  useEffect(() => {
    // Play the premium physical sub-heavy portal crossing impact sound effect instantly!
    AudioEngine.playCinematicImpact();

    const timer = setTimeout(() => {
      onComplete();
    }, 2600);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: [0.9, 1.02, 1],
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      onClick={onComplete}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950/98 select-none overflow-hidden cursor-pointer"
    >
      {/* Cinematic letterbox bars */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-16 bg-black/90 border-b border-white/5 z-20 flex items-center px-8"
        initial={{ y: -64 }}
        animate={{ y: 0 }}
        exit={{ y: -64 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="font-mono text-[9px] text-zinc-500 tracking-[0.3em] uppercase">
          Chronoverse Recording Protocol
        </span>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-16 bg-black/90 border-t border-white/5 z-20 flex items-center justify-between px-8"
        initial={{ y: 64 }}
        animate={{ y: 0 }}
        exit={{ y: 64 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="font-mono text-[9px] text-zinc-500 tracking-[0.3em] uppercase">
          Vector Index: 0{id}.{id * 9}
        </span>
        <span className="font-mono text-[9px] text-zinc-400 hover:text-white transition-colors tracking-[0.2em] uppercase">
          [ CLICK TO SKIP ]
        </span>
      </motion.div>

      {/* Premium ambient radial glow reflecting the slide theme */}
      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-screen z-0"
        style={{
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 60%)`,
        }}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{
          scale: [0.85, 1.15, 1.05],
          opacity: [0, 0.5, 0.38],
        }}
        transition={{ duration: 2.0, ease: 'easeOut' }}
      />

      {/* High-end 3D ChronoFlight time tunnel portal transition */}
      <ChronoFlightTunnel color={bgSolid} />

      {/* Dynamic slide-specific animated background graphics */}
      <EraThemeDecoration id={id} color={bgSolid} />

      {/* Decorative center reticle */}
      <motion.div
        className="absolute w-72 h-72 rounded-full border border-white/5 pointer-events-none z-0"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1.05, opacity: 0.15 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute w-80 h-80 rounded-full border border-dashed border-white/5 pointer-events-none z-0 animate-[spin_120s_linear_infinite]"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1.0, opacity: 0.1 }}
        transition={{ duration: 2.0, ease: 'easeOut' }}
      />

      {/* Core animated metadata and titles */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center px-6 relative z-10 max-w-2xl mx-auto space-y-5"
      >
        {/* Step Indicator */}
        <motion.span
          variants={childVariants}
          className="font-mono text-[10px] md:text-xs text-zinc-500 uppercase tracking-[0.45em] block mb-1"
        >
          {id === 10 ? 'TEMPORAL INTEGRATION COMPLETE' : `TEMPORAL CHAPTER 0${id}`}
        </motion.span>

        {/* Large Animated Era Title */}
        <motion.h1
          variants={titleVariants}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-[0.1em] uppercase leading-tight select-none"
          style={{
            textShadow: `0 0 25px ${glowColor}, 0 0 50px ${glowColor}33`,
          }}
        >
          {title}
        </motion.h1>

        {/* Year/Date (with colored theme line decoration) */}
        <motion.div variants={childVariants} className="flex flex-col items-center py-2">
          <div
            className="h-[1px] w-12 mb-3"
            style={{ backgroundColor: bgSolid }}
          />
          <span
            className="font-mono text-sm md:text-base font-bold tracking-[0.3em] uppercase"
            style={{ color: bgSolid }}
          >
            {year}
          </span>
          <div
            className="h-[1px] w-12 mt-3"
            style={{ backgroundColor: bgSolid }}
          />
        </motion.div>

        {/* Short Dramatic Subtitle */}
        <motion.p
          variants={childVariants}
          className="font-serif text-sm md:text-base italic text-zinc-400 tracking-wider font-light max-w-md mx-auto"
        >
          "{subtitle}"
        </motion.p>
      </motion.div>
    </motion.div>
  );
};
