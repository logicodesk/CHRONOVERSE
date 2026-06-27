import React, { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  activeSlide: number;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ activeSlide }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle/Effect state storage
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      decay?: number;
      life?: number;
      angle?: number;
      speed?: number;
      pType?: string;
      rotationSpeed?: number;
    }

    let particles: Particle[] = [];

    interface StorytellingParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      depth: number;
      char?: string;
      wobble?: number;
      wobbleSpeed?: number;
    }

    let storytellingParticles: StorytellingParticle[] = [];

    const initStorytellingParticles = () => {
      storytellingParticles = [];
      let count = 40;
      let eraType = 'ancient';
      
      if (activeSlide >= 0 && activeSlide <= 4) {
        eraType = 'ancient';
        count = 45;
      } else if (activeSlide === 5 || activeSlide === 6) {
        eraType = 'medieval';
        count = 40;
      } else if (activeSlide === 7) {
        eraType = 'industrial';
        count = 30;
      } else if (activeSlide >= 8) {
        eraType = 'future';
        count = 50;
      }

      for (let i = 0; i < count; i++) {
        const depth = Math.random() < 0.4 ? 0.2 : (Math.random() > 0.5 ? 0.8 : 0.5);
        const sizeMultiplier = depth === 0.2 ? 0.6 : (depth === 0.8 ? 1.4 : 1.0);
        const opacityMultiplier = depth === 0.2 ? 0.4 : (depth === 0.8 ? 0.8 : 0.6);
        
        let x = Math.random() * width;
        let y = Math.random() * height;
        let vx = (Math.random() - 0.5) * 0.2;
        let vy = -Math.random() * 0.3 - 0.12;
        let size = 0;
        let color = '';
        let alpha = 0;
        let char = '';
        let wobble = Math.random() * Math.PI * 2;
        let wobbleSpeed = Math.random() * 0.02 + 0.005;

        if (eraType === 'ancient') {
          size = (Math.random() * 2 + 0.8) * sizeMultiplier;
          const colors = [
            'rgba(217, 119, 6,',  
            'rgba(230, 225, 218,', 
            'rgba(234, 179, 8,',   
            'rgba(255, 255, 255,'  
          ];
          color = colors[Math.floor(Math.random() * colors.length)];
          alpha = (Math.random() * 0.15 + 0.04) * opacityMultiplier;
        } else if (eraType === 'medieval') {
          size = (Math.random() * 2.5 + 1.0) * sizeMultiplier;
          color = 'rgba(249, 115, 22,'; 
          alpha = (Math.random() * 0.22 + 0.06) * opacityMultiplier;
          vy = -Math.random() * 0.4 - 0.18; 
        } else if (eraType === 'industrial') {
          size = (Math.random() * 18 + 10) * sizeMultiplier;
          color = Math.random() > 0.5 ? 'rgba(120, 113, 108,' : 'rgba(82, 82, 91,'; 
          alpha = (Math.random() * 0.035 + 0.008) * opacityMultiplier; 
          vx = (Math.random() - 0.3) * 0.12; 
          vy = -Math.random() * 0.12 - 0.04;
        } else if (eraType === 'future') {
          size = (Math.random() * 2.0 + 0.8) * sizeMultiplier;
          const colors = [
            'rgba(34, 211, 238,', 
            'rgba(52, 211, 153,', 
            'rgba(167, 139, 250,' 
          ];
          color = colors[Math.floor(Math.random() * colors.length)];
          alpha = (Math.random() * 0.2 + 0.04) * opacityMultiplier;
          char = Math.random() > 0.5 ? '0' : '1';
          vy = Math.random() * 0.25 + 0.1; 
        }

        storytellingParticles.push({
          x,
          y,
          vx,
          vy,
          size,
          color,
          alpha,
          depth,
          char,
          wobble,
          wobbleSpeed,
        });
      }
    };

    // Helper to initialize particles
    const initParticles = (count: number, type: string) => {
      particles = [];
      for (let i = 0; i < count; i++) {
        if (type === 'embers') {
          particles.push({
            x: Math.random() * width,
            y: height + Math.random() * 100,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -Math.random() * 2 - 1,
            size: Math.random() * 4 + 1.5,
            color: `rgba(${250 + Math.random() * 5}, ${100 + Math.random() * 100}, ${30 + Math.random() * 40},`,
            alpha: Math.random() * 0.7 + 0.3,
            decay: Math.random() * 0.005 + 0.002,
          });
        } else if (type === 'modern-network') {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            size: Math.random() * 3 + 1,
            color: 'rgba(99, 102, 241,',
            alpha: Math.random() * 0.6 + 0.2,
          });
        } else if (type === 'future-stars') {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 1.2,
            vy: (Math.random() - 0.5) * 1.2,
            size: Math.random() * 3.2 + 0.8,
            color: Math.random() > 0.5 ? 'rgba(6, 182, 212,' : 'rgba(244, 63, 94,',
            alpha: Math.random() * 0.85 + 0.15,
            speed: Math.random() * 5 + 2,
          });
        } else if (type === 'india-gold') {
          const rand = Math.random();
          let pType = 'gold-spark';
          let size = Math.random() * 3 + 1.2;
          let color = Math.random() > 0.55 ? 'rgba(249, 115, 22,' : 'rgba(234, 179, 8,'; // saffron or gold
          let vx = (Math.random() - 0.5) * 0.35;
          let vy = -Math.random() * 0.5 - 0.2; // slow gentle upward drift
          let angle = Math.random() * Math.PI * 2;
          let rotationSpeed = (Math.random() - 0.5) * 0.012;

          if (rand < 0.22) {
            pType = 'sanskrit';
            size = Math.random() * 11 + 12; // Sanskrit character visual size
            color = Math.random() > 0.6 ? 'rgba(249, 115, 22,' : 'rgba(234, 179, 8,';
            vx = (Math.random() - 0.5) * 0.15;
            vy = -Math.random() * 0.25 - 0.12;
          } else if (rand < 0.42) {
            pType = 'constellation';
            size = Math.random() * 3.2 + 1.5;
            color = 'rgba(56, 189, 248,'; // clear celestial sky blue
            vx = (Math.random() - 0.5) * 0.25;
            vy = -Math.random() * 0.35 - 0.15;
          } else if (rand < 0.55) {
            pType = 'observatory';
            size = Math.random() * 11 + 10;
            color = 'rgba(234, 179, 8,'; // luxury pure gold
            vx = (Math.random() - 0.5) * 0.2;
            vy = -Math.random() * 0.2 - 0.1;
          }

          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx,
            vy,
            size,
            color,
            alpha: Math.random() * 0.55 + 0.15,
            pType,
            angle,
            rotationSpeed
          });
        } else if (type === 'temporal-quanta') {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            size: Math.random() * 3.5 + 1.2,
            color: Math.random() > 0.5 ? 'rgba(255, 181, 160,' : 'rgba(238, 142, 237,', // Peach/violet glow
            alpha: Math.random() * 0.8 + 0.2,
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.02 + 0.005
          });
        } else if (type === 'prehistoric') {
          const rand = Math.random();
          let pType = 'spore';
          let size = Math.random() * 2 + 1;
          let color = 'rgba(52, 211, 153,'; // emerald green
          let vx = (Math.random() - 0.5) * 0.4;
          let vy = -Math.random() * 0.5 - 0.2; // slow upward drift
          let angle = Math.random() * Math.PI * 2;
          let rotationSpeed = (Math.random() - 0.5) * 0.015;

          if (rand < 0.35) {
            pType = 'amber';
            size = Math.random() * 5 + 3;
            color = 'rgba(245, 158, 11,'; // amber gold
            vx = (Math.random() - 0.5) * 0.5;
            vy = -Math.random() * 0.7 - 0.3;
          } else if (rand < 0.5) {
            pType = 'footprint';
            size = Math.random() * 12 + 12; // footprint size
            color = 'rgba(245, 158, 11,'; // amber/orange footprint
            vx = (Math.random() - 0.5) * 0.2;
            vy = -Math.random() * 0.25 - 0.1;
          }

          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx,
            vy,
            size,
            color,
            alpha: Math.random() * 0.5 + 0.15,
            pType,
            angle,
            rotationSpeed
          });
        } else if (type === 'sandstone') {
          const rand = Math.random();
          let pType = 'sand';
          let size = Math.random() * 2.5 + 1.2;
          let color = 'rgba(217, 119, 6,'; // earthy amber/ochre
          let vx = Math.random() * 0.4 + 0.1; // slow river flow to the right
          let vy = (Math.random() - 0.5) * 0.15;
          let angle = Math.random() * Math.PI * 2;
          let rotationSpeed = (Math.random() - 0.5) * 0.01;

          if (rand < 0.25) {
            pType = 'river-spark';
            size = Math.random() * 3.5 + 1.8;
            color = 'rgba(120, 113, 108,'; // limestone grey
            vx = Math.random() * 0.8 + 0.3; // faster river flow
          } else if (rand < 0.5) {
            pType = 'glyph';
            size = Math.random() * 12 + 10; // ancient glyph size
            color = 'rgba(217, 119, 6,'; // amber sandstone
            vx = (Math.random() - 0.5) * 0.2;
            vy = (Math.random() - 0.5) * 0.2;
          }

          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx,
            vy,
            size,
            color,
            alpha: Math.random() * 0.5 + 0.15,
            pType,
            angle,
            rotationSpeed
          });
        } else if (type === 'roman-empire') {
          const rand = Math.random();
          let pType = 'marble-dust';
          let size = Math.random() * 2.5 + 1.2;
          let color = 'rgba(230, 225, 218,'; // marble white/beige
          let vx = (Math.random() - 0.5) * 0.25;
          let vy = -Math.random() * 0.35 - 0.12; // slow upward drift
          let angle = Math.random() * Math.PI * 2;
          let rotationSpeed = (Math.random() - 0.5) * 0.012;

          if (rand < 0.28) {
            pType = 'laurel';
            size = Math.random() * 8 + 6; // leaf size
            color = Math.random() > 0.5 ? 'rgba(180, 110, 48,' : 'rgba(141, 122, 101,'; // bronze / burnished gold hues
            vx = (Math.random() - 0.5) * 0.4;
            vy = -Math.random() * 0.4 - 0.18;
          } else if (rand < 0.52) {
            pType = 'trade-spark';
            size = Math.random() * 3 + 1.5;
            color = 'rgba(217, 119, 6,'; // warm bronze glow
            vx = (Math.random() - 0.5) * 0.45;
            vy = -Math.random() * 0.35 - 0.15;
          }

          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx,
            vy,
            size,
            color,
            alpha: Math.random() * 0.5 + 0.15,
            pType,
            angle,
            rotationSpeed
          });
        } else {
          // Standard dust particles
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size: Math.random() * 3 + 1,
            color: 'rgba(255, 255, 255,',
            alpha: Math.random() * 0.4 + 0.1,
          });
        }
      }
    };

    // Initialize custom variables dependent on slide
    let lastSlide = activeSlide;
    const reinitType = () => {
      if (activeSlide === 0) initParticles(75, 'temporal-quanta');
      else if (activeSlide === 1) initParticles(55, 'prehistoric');
      else if (activeSlide === 2) initParticles(60, 'sandstone');
      else if (activeSlide === 3) initParticles(60, 'india-gold');
      else if (activeSlide === 4) initParticles(50, 'roman-empire');
      else if (activeSlide === 5) initParticles(60, 'dust');
      else if (activeSlide === 6) initParticles(30, 'dust');
      else if (activeSlide === 7) initParticles(50, 'embers');
      else if (activeSlide === 8) initParticles(70, 'modern-network');
      else if (activeSlide === 9) initParticles(120, 'future-stars');
      else initParticles(80, 'dust'); // slide 10
      initStorytellingParticles();
    };
    reinitType();

    // Resize observer
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      reinitType();
    };
    window.addEventListener('resize', handleResize);

    let tick = 0;

    // Drawing loops for separate chapters
    const drawAnimation = () => {
      tick += 0.01;
      
      // Handle slide change resets
      if (activeSlide !== lastSlide) {
        lastSlide = activeSlide;
        reinitType();
      }

      ctx.clearRect(0, 0, width, height);

      const isDesktop = width > 768;
      const contentCenterX = isDesktop ? (width + 256) / 2 : width / 2;
      const contentWidth = isDesktop ? width - 256 : width;

      const scrollY = window.scrollY || 0;
      const parallaxOffsetY = scrollY * 0.08;

      // Opacity pulse: gentle pulsing every 8-10 seconds
      const opacityPulse = 0.85 + 0.15 * Math.sin((Date.now() / 1000) * (2 * Math.PI / 9.0));

      // Smooth 360-degree rotation over 60-90 seconds
      const symbolRotation = (Date.now() / 1000) * (2 * Math.PI / 75.0);

      // Render base dark ambient gradient dependent on slide
      const gradient = ctx.createRadialGradient(
        contentCenterX, height / 2, 10,
        contentCenterX, height / 2, Math.max(width, height)
      );

      // Dynamic color maps
      let c1 = '#09090b'; // solid dark
      let c2 = '#18181b';

      if (activeSlide === 0) {
        // Temporal opening page (Deep universe violet / cosmic peach and void black)
        c1 = '#130a1c'; // deeply spiritual/temporal dark violet
        c2 = '#020205'; // near pitch black
      } else if (activeSlide === 1) {
        // Prehistoric Jungle (Deep moss green tone)
        c1 = '#022c22';
        c2 = '#040d0c';
      } else if (activeSlide === 2) {
        // Dawn of Civilization (Teal & Golden grain clay)
        c1 = '#134e4a';
        c2 = '#020606';
      } else if (activeSlide === 3) {
        // Ancient India (Sandalwood / Orange saffron)
        c1 = '#451a03';
        c2 = '#030707';
      } else if (activeSlide === 4) {
        // Roman expansion (Crimson and bronze)
        c1 = '#450a0a';
        c2 = '#030712';
      } else if (activeSlide === 5) {
        // Middle Ages (Cobalt Stone grey fog)
        c1 = '#0f172a';
        c2 = '#020617';
      } else if (activeSlide === 6) {
        // Age of Exploration (Marine Oceanic Navy deep slate)
        c1 = '#134e4a';
        c2 = '#022c22';
      } else if (activeSlide === 7) {
        // Industrial revolution (Superheated charcoal steam, high purple)
        c1 = '#3b0764';
        c2 = '#090514';
      } else if (activeSlide === 8) {
        // Modern Information Space (Cosmic space indigo)
        c1 = '#030712';
        c2 = '#1e1b4b';
      } else if (activeSlide === 9) {
        // Future Kardashev scale (Neon Rose / Magenta cosmos)
        c1 = '#4c0519';
        c2 = '#030712';
      } else {
        // Finale super synthesis
        c1 = '#030712';
        c2 = '#1c1917';
      }

      gradient.addColorStop(0, c1);
      gradient.addColorStop(1, c2);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // DRAW SUBTLE STORYTELLING PARALLAX PARTICLES (GPU/Canvas Optimized)
      storytellingParticles.forEach((p) => {
        // 1. Slow atmospheric floating movement with gentle horizontal sway
        p.y += p.vy;
        p.x += p.vx + Math.sin(tick * 1.5 + p.y * 0.008) * 0.12;

        // Wrapping boundaries perfectly
        if (p.x < -40) p.x = width + 40;
        if (p.x > width + 40) p.x = -40;
        if (p.y < -40) p.y = height + 40;
        if (p.y > height + 40) p.y = -40;

        // 2. Parallax scrolling shift relative to scrollY and particle depth
        const parallaxY = scrollY * p.depth * 0.18;
        let drawY = (p.y - parallaxY) % height;
        if (drawY < 0) drawY += height;
        let drawX = p.x;

        // 3. Ambient shimmer pulsing every few seconds
        const shimmer = 0.75 + Math.sin(tick * 2.0 + p.x * 0.02) * 0.25;
        const currentAlpha = p.alpha * shimmer * opacityPulse;

        ctx.save();
        ctx.shadowBlur = p.depth > 0.5 ? 4 : 2;

        if (activeSlide >= 0 && activeSlide <= 4) {
          // Ancient: Dust particles
          ctx.shadowColor = `${p.color}0.35)`;
          ctx.fillStyle = `${p.color}${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (activeSlide === 5 || activeSlide === 6) {
          // Medieval: Floating sparks
          ctx.shadowColor = `${p.color}0.45)`;
          ctx.fillStyle = `${p.color}${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
          ctx.fill();

          if (p.depth > 0.4) {
            ctx.fillStyle = `rgba(255, 237, 213, ${currentAlpha * 0.8})`;
            ctx.beginPath();
            ctx.arc(drawX, drawY, p.size * 0.4, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (activeSlide === 7) {
          // Industrial: Smoke particles
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
          const grad = ctx.createRadialGradient(drawX, drawY, p.size * 0.1, drawX, drawY, p.size);
          grad.addColorStop(0, `${p.color}${currentAlpha})`);
          grad.addColorStop(0.5, `${p.color}${currentAlpha * 0.45})`);
          grad.addColorStop(1, `${p.color}0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (activeSlide >= 8) {
          // Future: Digital particles
          ctx.shadowColor = `${p.color}0.55)`;
          ctx.fillStyle = `${p.color}${currentAlpha})`;
          if (p.char && p.depth > 0.4) {
            ctx.font = `bold ${Math.floor(p.size * 5 + 6)}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(p.char, drawX, drawY);
          } else {
            ctx.fillRect(drawX - p.size / 2, drawY - p.size / 2, p.size, p.size);
          }
        }

        ctx.restore();
      });

      // DRAW SLIDE SPECIFIC CINEMATIC BACKGROUND EFFECTS
      if (activeSlide === 0) {
        // TEMPORAL ORBIT/WORMHOLE (Glowing concentric circles and starry trails)
        const cx = contentCenterX;
        const cy = height / 2;
        const clockTicks = tick * 0.12;

        // Large abstract clock orbits
        ctx.strokeStyle = 'rgba(255, 181, 160, 0.16)';
        ctx.lineWidth = 1;
        const orbits = [150, 300, 450, 600];
        orbits.forEach((radius, oIdx) => {
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.stroke();

          // Draw some tick ticks along these orbits
          const numTicks = 4 + oIdx * 4;
          const speedFactor = (1 / (oIdx + 1)) * 0.7;
          ctx.fillStyle = 'rgba(255, 181, 160, 0.35)';
          for (let i = 0; i < numTicks; i++) {
            const angle = clockTicks * speedFactor + (i * Math.PI * 2) / numTicks;
            const tx = cx + Math.cos(angle) * radius;
            const ty = cy + Math.sin(angle) * radius;
            ctx.beginPath();
            ctx.arc(tx, ty, 3.5, 0, Math.PI * 2);
            ctx.fill();
            
            // Connecting hair-line to center
            ctx.strokeStyle = 'rgba(255, 181, 160, 0.08)';
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(tx, ty);
            ctx.stroke();
          }
        });

        // Drifting quantum temporal code / sparks
        particles.forEach((p) => {
          p.x += p.vx * 0.8;
          p.y += p.vy * 0.8;
          if (p.x < 0 || p.x > width) p.x = Math.random() * width;
          if (p.y < 0 || p.y > height) p.y = Math.random() * height;

          // shimmer brightness
          const shimmer = 0.6 + Math.sin(tick * 3 + p.x * 0.1) * 0.4;
          ctx.fillStyle = `${p.color}${p.alpha * shimmer})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          if (p.size > 2) {
            ctx.fillStyle = `${p.color}${p.alpha * shimmer * 0.35})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
            ctx.fill();
          }
        });

      } else if (activeSlide === 1) {
        // PREHISTORIC COGNITIVE BIOGRAPHY: Massive glowing DNA Helix, Fossil patterns, Amber fragments & Footprints
        
        // 1. Cinematic Ambient Lighting (Subtle emerald-green and gold-amber spotlights)
        const amberGlow = ctx.createRadialGradient(0, height, 100, 0, height, 600);
        amberGlow.addColorStop(0, 'rgba(245, 158, 11, 0.08)');
        amberGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = amberGlow;
        ctx.fillRect(0, 0, width, height);

        const emeraldGlow = ctx.createRadialGradient(width, 0, 100, width, 0, 700);
        emeraldGlow.addColorStop(0, 'rgba(16, 185, 129, 0.06)');
        emeraldGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = emeraldGlow;
        ctx.fillRect(0, 0, width, height);

        // 2. Fossil Outline Patterns (Ammonite Spiral and Seed Fern leaf)
        // Ammonite on Left Side
        const ammoX = contentCenterX - contentWidth * 0.35;
        const ammoY = height * 0.38;
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.15)'; // warm glowing amber trace
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let theta = 0; theta < Math.PI * 8; theta += 0.05) {
          const radius = 12 + theta * 10;
          const fX = ammoX + Math.cos(theta + tick * 0.002) * radius;
          const fY = ammoY + Math.sin(theta + tick * 0.002) * radius;
          if (theta === 0) ctx.moveTo(fX, fY);
          else ctx.lineTo(fX, fY);
        }
        ctx.stroke();

        // Chamber dividers for Ammonite shell structure
        for (let c = 0; c < 24; c += 1) {
          const theta = c * (Math.PI / 4);
          const radiusStart = 12 + theta * 1;
          const radiusEnd = 12 + theta * 10;
          const angle = theta + tick * 0.002;
          ctx.beginPath();
          ctx.moveTo(ammoX + Math.cos(angle) * radiusStart, ammoY + Math.sin(angle) * radiusStart);
          ctx.lineTo(ammoX + Math.cos(angle) * radiusEnd, ammoY + Math.sin(angle) * radiusEnd);
          ctx.stroke();
        }

        // Seed Fern leaf fossil on Right Side
        const fernX = contentCenterX + contentWidth * 0.35;
        const fernY = height * 0.62;
        const fernAngle = -Math.PI / 3.2 + Math.sin(tick * 0.001) * 0.03;
        const fernLen = 280;
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.15)'; // warm glowing emerald green leaf trace
        ctx.lineWidth = 2.5;

        // Main stem of the fossil fern
        ctx.beginPath();
        ctx.moveTo(fernX, fernY);
        const endX = fernX + Math.cos(fernAngle) * fernLen;
        const endY = fernY + Math.sin(fernAngle) * fernLen;
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Alternating leafy pinnules
        ctx.lineWidth = 1.25;
        const numLeaflets = 15;
        for (let i = 1; i <= numLeaflets; i++) {
          const t = i / numLeaflets;
          const ptX = fernX + Math.cos(fernAngle) * fernLen * t;
          const ptY = fernY + Math.sin(fernAngle) * fernLen * t;
          const leafletLen = 65 * (1 - t * 0.75);

          const leftA = fernAngle - Math.PI / 2.25 + Math.sin(tick * 0.0015 + t * 4) * 0.02;
          const rightA = fernAngle + Math.PI / 2.25 + Math.sin(tick * 0.0015 + t * 4) * 0.02;

          // Left lateral leaf
          ctx.beginPath();
          ctx.moveTo(ptX, ptY);
          ctx.lineTo(ptX + Math.cos(leftA) * leafletLen, ptY + Math.sin(leftA) * leafletLen);
          ctx.stroke();

          // Right lateral leaf
          ctx.beginPath();
          ctx.moveTo(ptX, ptY);
          ctx.lineTo(ptX + Math.cos(rightA) * leafletLen, ptY + Math.sin(rightA) * leafletLen);
          ctx.stroke();
        }

        // 3. Massive Glowing slowly-rotating DNA Double Helix (Depth-scaled viewport)
        const dnaCenterX = contentCenterX;
        const dnaBaseTilt = 0.15; // horizontal angle tilt across screen
        const dnaAmplitude = 150; // massive screen-filling wave width
        const dnaPeriod = 0.0055; // wave density scaling
        const dnaNodesCount = 32;
        const dnaRotSpeed = tick * 0.015; // slow rotational speed

        for (let i = 0; i < dnaNodesCount; i++) {
          const py = (height / (dnaNodesCount - 1)) * i;
          const axisX = dnaCenterX + (py - height / 2) * dnaBaseTilt;
          const phase1 = py * dnaPeriod - dnaRotSpeed;
          const phase2 = phase1 + Math.PI;

          const sinV1 = Math.sin(phase1);
          const cosV1 = Math.cos(phase1);
          const sinV2 = Math.sin(phase2);
          const cosV2 = Math.cos(phase2);

          const x1 = axisX + sinV1 * dnaAmplitude;
          const x2 = axisX + sinV2 * dnaAmplitude;

          // Compute perspective values from cos (Z-depth)
          const z1 = cosV1; // ranges -1 to 1
          const z2 = cosV2; // ranges -1 to 1

          const alpha1 = 0.12 + (z1 + 1) * 0.22; // scales matching cinematic visibility
          const alpha2 = 0.12 + (z2 + 1) * 0.22;

          const size1 = 3 + (z1 + 1) * 2.8; // node radius scale
          const size2 = 3 + (z2 + 1) * 2.8;

          // Draw the nucleobase ladder rung connecting code pairs
          ctx.strokeStyle = `rgba(16, 185, 129, ${(alpha1 + alpha2) * 0.35})`; // translucent green
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x1, py);
          ctx.lineTo(x2, py);
          ctx.stroke();

          // Highlight the hydrogen base pair junction spark
          const hx = (x1 + x2) / 2;
          ctx.fillStyle = `rgba(245, 158, 11, ${(alpha1 + alpha2) * 0.55})`; // amber center dot
          ctx.beginPath();
          ctx.arc(hx, py, 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Strand A Node - Phosphate Green base
          ctx.fillStyle = `rgba(52, 211, 153, ${alpha1})`;
          ctx.beginPath();
          ctx.arc(x1, py, size1, 0, Math.PI * 2);
          ctx.fill();

          if (z1 > 0) {
            ctx.fillStyle = `rgba(52, 211, 153, ${alpha1 * 0.3})`;
            ctx.beginPath();
            ctx.arc(x1, py, size1 * 2.5, 0, Math.PI * 2);
            ctx.fill();
          }

          // Strand B Node - Phosphate Amber base
          ctx.fillStyle = `rgba(245, 158, 11, ${alpha2})`;
          ctx.beginPath();
          ctx.arc(x2, py, size2, 0, Math.PI * 2);
          ctx.fill();

          if (z2 > 0) {
            ctx.fillStyle = `rgba(245, 158, 11, ${alpha2 * 0.3})`;
            ctx.beginPath();
            ctx.arc(x2, py, size2 * 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // 4. Update and render drifting Prehistoric Spores, Amber fragments, and Footprints
        particles.forEach((p) => {
          // Slowly drift upward while swaying side to side
          p.y += p.vy;
          p.x += Math.cos(tick * 0.8 + p.y * 0.01) * 0.22 + p.vx * 0.15;

          if (p.angle !== undefined && p.rotationSpeed !== undefined) {
            p.angle += p.rotationSpeed;
          }

          // Screen edge viewport wrap
          if (p.x < -30) p.x = width + 30;
          if (p.x > width + 30) p.x = -30;
          if (p.y < -30) {
            p.y = height + 30;
            p.x = Math.random() * width;
          }

          const shimmer = 0.5 + Math.sin(tick * 2 + p.x * 0.05) * 0.45;

          if (p.pType === 'amber') {
            // Draw geometric brilliant amber crystallite
            const size = p.size;
            const color = p.color; // 'rgba(245, 158, 11,'
            const alpha = p.alpha * shimmer * 0.5;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle || 0);
            ctx.fillStyle = `${color}${alpha})`;
            ctx.strokeStyle = `rgba(252, 211, 77, ${alpha * 0.8})`; // gold highlights
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, -size);
            ctx.lineTo(size * 0.8, -size * 0.3);
            ctx.lineTo(size * 0.6, size * 0.7);
            ctx.lineTo(-size * 0.5, size * 0.8);
            ctx.lineTo(-size * 0.8, -size * 0.2);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();

          } else if (p.pType === 'footprint') {
            // Fossilized 3-toed dinosaur footprint outlines
            const size = p.size;
            const color = p.color; // 'rgba(245, 158, 11,'
            const alpha = p.alpha * shimmer * 0.35; // increased visibility overlay

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle || 0);
            ctx.strokeStyle = `${color}${alpha})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();

            // Theropod/Bird-like dinosaur foot print shape
            ctx.moveTo(0, size * 0.4); // Heel
            ctx.quadraticCurveTo(-size * 0.4, size * 0.1, -size * 0.6, -size * 0.1); // Left digit
            ctx.quadraticCurveTo(-size * 0.65, -size * 0.25, -size * 0.5, -size * 0.2); 
            ctx.quadraticCurveTo(-size * 0.25, 0, -size * 0.15, size * 0.1); 
            ctx.quadraticCurveTo(-size * 0.1, -size * 0.4, 0, -size * 0.65); // Center digit
            ctx.quadraticCurveTo(size * 0.1, -size * 0.4, size * 0.15, size * 0.1);
            ctx.quadraticCurveTo(size * 0.25, 0, size * 0.5, -size * 0.2); // Right digit
            ctx.quadraticCurveTo(size * 0.65, -size * 0.25, size * 0.6, -size * 0.1); 
            ctx.quadraticCurveTo(size * 0.4, size * 0.1, 0, size * 0.4); // back to heel
            ctx.closePath();

            ctx.fillStyle = `${color}${alpha * 0.16})`; // inner soft imprint
            ctx.fill();
            ctx.stroke();
            ctx.restore();

          } else {
            // Forest spore / green bioluminescent dust
            const color = p.color;
            const size = p.size;
            const alpha = p.alpha * shimmer * 0.45;

            ctx.fillStyle = `${color}${alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
            ctx.fill();

            if (size > 1.8) {
              ctx.fillStyle = `${color}${alpha * 0.28})`;
              ctx.beginPath();
              ctx.arc(p.x, p.y, size * 2.5, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        });

      } else if (activeSlide === 2) {
        // PREHISTORIC CITIES / ANCIENT CIVILIZATION: Sandstone textures, Giant wooden wheel, cave painting illustrations, primitive tools & flowing river particles
        
        // 1. Earthy Sandstone Texture and Soft Golden Sunlight Glow
        const sunGlow = ctx.createRadialGradient(width * 0.8, 0, 50, width * 0.8, 0, 800);
        sunGlow.addColorStop(0, 'rgba(251, 191, 36, 0.12)'); // soft warm sunlight
        sunGlow.addColorStop(0.5, 'rgba(217, 119, 6, 0.04)');
        sunGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = sunGlow;
        ctx.fillRect(0, 0, width, height);

        // Thin sandstone stratigraphic bedding layers
        ctx.strokeStyle = 'rgba(217, 119, 6, 0.025)';
        ctx.lineWidth = 1;
        for (let i = 1; i <= 6; i++) {
          const baseH = height * (i / 7);
          ctx.beginPath();
          for (let x = 0; x <= width + 50; x += 60) {
            const waveY = baseH + Math.sin(x * 0.0035 + i * 2) * 22;
            if (x === 0) ctx.moveTo(x, waveY);
            else ctx.lineTo(x, waveY);
          }
          ctx.stroke();
        }

        // 2. Giant Ancient Wooden Wheel slowly rotating
        const wheelX = contentCenterX;
        const wheelY = height * 0.48;
        const wheelRadius = Math.min(width * 0.22, 230);
        const wheelAngle = tick * 0.055;

        ctx.save();
        ctx.translate(wheelX, wheelY);
        ctx.rotate(wheelAngle);

        // Outer rim
        ctx.strokeStyle = 'rgba(217, 119, 6, 0.22)';
        ctx.lineWidth = 20;
        ctx.beginPath();
        ctx.arc(0, 0, wheelRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner rim definitions
        ctx.strokeStyle = 'rgba(120, 113, 108, 0.22)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, wheelRadius - 10, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(217, 119, 6, 0.18)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, wheelRadius + 10, 0, Math.PI * 2);
        ctx.stroke();

        // Hub in the center
        ctx.fillStyle = 'rgba(217, 119, 6, 0.22)';
        ctx.beginPath();
        ctx.arc(0, 0, 35, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(120, 113, 108, 0.22)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, 15, 0, Math.PI * 2);
        ctx.stroke();

        // Spokes (8 robust spokes)
        ctx.strokeStyle = 'rgba(217, 119, 6, 0.20)';
        ctx.lineWidth = 7;
        for (let s = 0; s < 8; s++) {
          const spokeAngle = (s * Math.PI) / 4;
          ctx.beginPath();
          ctx.moveTo(Math.cos(spokeAngle) * 35, Math.sin(spokeAngle) * 35);
          ctx.lineTo(Math.cos(spokeAngle) * (wheelRadius - 10), Math.sin(spokeAngle) * (wheelRadius - 10));
          ctx.stroke();

          // Triangular spoke reinforcement braces
          ctx.fillStyle = 'rgba(217, 119, 6, 0.08)';
          ctx.beginPath();
          const tipX = Math.cos(spokeAngle) * (wheelRadius - 10);
          const tipY = Math.sin(spokeAngle) * (wheelRadius - 10);
          const s1 = spokeAngle - 0.12;
          const s2 = spokeAngle + 0.12;
          ctx.moveTo(tipX, tipY);
          ctx.lineTo(Math.cos(s1) * (wheelRadius - 35), Math.sin(s1) * (wheelRadius - 35));
          ctx.lineTo(Math.cos(s2) * (wheelRadius - 35), Math.sin(s2) * (wheelRadius - 35));
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();

        // 3. Cave Painting Illustration (Bison / Ox outline)
        const bisonX = contentCenterX - contentWidth * 0.35;
        const bisonY = height * 0.65;
        ctx.save();
        ctx.translate(bisonX, bisonY);
        ctx.strokeStyle = 'rgba(217, 119, 6, 0.22)';
        ctx.lineWidth = 2.5;
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(-60, 0); 
        ctx.quadraticCurveTo(-40, -10, -30, -15);
        ctx.quadraticCurveTo(-15, -35, 10, -35);
        ctx.quadraticCurveTo(25, -30, 35, -20);
        ctx.lineTo(45, -22); // head
        ctx.lineTo(42, -5);
        ctx.quadraticCurveTo(25, 0, 15, 5);
        ctx.lineTo(12, 35); // foreleg
        ctx.lineTo(5, 35);
        ctx.lineTo(8, 5);
        ctx.quadraticCurveTo(-20, 10, -35, 5); // belly
        ctx.lineTo(-40, 32); // hindleg
        ctx.lineTo(-48, 32);
        ctx.lineTo(-45, 0);
        ctx.closePath();
        ctx.stroke();

        ctx.fillStyle = 'rgba(217, 119, 6, 0.05)';
        ctx.fill();

        // horns
        ctx.beginPath();
        ctx.moveTo(35, -20);
        ctx.quadraticCurveTo(40, -38, 48, -42);
        ctx.stroke();
        ctx.restore();

        // 4. Primitive Flint-Axe Silhouette
        const axeX = contentCenterX + contentWidth * 0.35;
        const axeY = height * 0.25;
        ctx.save();
        ctx.translate(axeX, axeY);
        ctx.rotate(-0.4);
        ctx.strokeStyle = 'rgba(120, 113, 108, 0.18)'; // flint-stone grey
        ctx.fillStyle = 'rgba(120, 113, 108, 0.05)';
        ctx.lineWidth = 1.8;

        // Wooden shaft
        ctx.beginPath();
        ctx.rect(-4, -15, 8, 80);
        ctx.stroke();

        // Flint stone head
        ctx.beginPath();
        ctx.moveTo(-15, -12);
        ctx.lineTo(25, -25);
        ctx.lineTo(28, -5);
        ctx.lineTo(15, 12);
        ctx.lineTo(-12, 8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Cord wraps
        ctx.strokeStyle = 'rgba(217, 119, 6, 0.20)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (let w = 0; w < 4; w++) {
          ctx.moveTo(-8, -4 + w * 4);
          ctx.lineTo(8, -8 + w * 4);
          ctx.moveTo(8, -4 + w * 4);
          ctx.lineTo(-8, -8 + w * 4);
        }
        ctx.stroke();

        ctx.restore();

        // 5. Flowing River-inspired Particles and Ancient Glyphs
        particles.forEach((p) => {
          if (p.pType === 'river-spark') {
            // River currents
            p.x += p.vx * 1.5;
            p.y = p.y + Math.sin(tick * 1.5 + p.x * 0.008) * 0.35 + p.vy;

            if (p.x > width + 20) {
              p.x = -20;
              p.y = Math.random() * height;
            }

            const shimmer = 0.6 + Math.sin(tick * 3 + p.x * 0.08) * 0.4;
            ctx.fillStyle = `rgba(139, 92, 26, ${p.alpha * shimmer * 0.3})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            // central ember
            ctx.fillStyle = `rgba(251, 191, 36, ${p.alpha * shimmer * 0.55})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
            ctx.fill();

          } else if (p.pType === 'glyph') {
            // Slow rotating, floating sandstone glyph codes
            p.x += p.vx * 0.5;
            p.y += p.vy * 0.5;
            if (p.angle !== undefined && p.rotationSpeed !== undefined) {
              p.angle += p.rotationSpeed * 0.45;
            }

            if (p.x < -30) p.x = width + 30;
            if (p.x > width + 30) p.x = -30;
            if (p.y < -30) p.y = height + 30;
            if (p.y > height + 30) p.y = -30;

            const shimmer = 0.55 + Math.sin(tick * 1.8 + p.x * 0.02) * 0.45;
            const alpha = p.alpha * shimmer * 0.12;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle || 0);
            ctx.strokeStyle = `rgba(217, 119, 6, ${alpha})`;
            ctx.lineWidth = 1.6;
            ctx.beginPath();

            const iconType = Math.floor((p.x + p.y) % 3);
            if (iconType === 0) {
              // 8-pointed star/glyph
              ctx.moveTo(-p.size * 0.5, 0);
              ctx.lineTo(p.size * 0.5, 0);
              ctx.moveTo(0, -p.size * 0.5);
              ctx.lineTo(0, p.size * 0.5);
              ctx.moveTo(-p.size * 0.35, -p.size * 0.35);
              ctx.lineTo(p.size * 0.35, p.size * 0.35);
            } else if (iconType === 1) {
              // All-seeing eye symbol
              ctx.arc(0, 0, p.size * 0.32, 0, Math.PI * 2);
              ctx.moveTo(-p.size * 0.6, 0);
              ctx.quadraticCurveTo(0, -p.size * 0.4, p.size * 0.6, 0);
              ctx.moveTo(-p.size * 0.6, 0);
              ctx.quadraticCurveTo(0, p.size * 0.4, p.size * 0.6, 0);
            } else {
              // Solar wheel glyph
              ctx.arc(0, 0, p.size * 0.25, 0, Math.PI * 2);
              for (let r = 0; r < 4; r++) {
                const a = r * (Math.PI / 2);
                ctx.moveTo(Math.cos(a) * (p.size * 0.25), Math.sin(a) * (p.size * 0.25));
                ctx.lineTo(Math.cos(a) * (p.size * 0.55), Math.sin(a) * (p.size * 0.55));
              }
            }
            ctx.stroke();
            ctx.restore();

          } else {
            // Earthy sand grain
            p.x += p.vx * 1.1;
            p.y += p.vy + Math.cos(tick + p.x * 0.004) * 0.15;
            if (p.x > width + 20) p.x = -20;
            if (p.y < -20) p.y = height + 20;

            const shimmer = 0.5 + Math.sin(tick * 2.2 + p.x * 0.04) * 0.5;
            ctx.fillStyle = `rgba(217, 119, 6, ${p.alpha * shimmer * 0.32})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }
        });

      } else if (activeSlide === 3) {
        // GIGANTIC ANCIENT INDIAN KNOWLEDGE MANDALA: Maths, Astronomy, Sacred Geometry & Celestial Constellations
        const clockTicks = tick * 0.015; // Elegant slow cinematic rotate speed
        const cx = contentCenterX;
        const cy = height * 0.48;

        // 1. Rich gold, saffron, and deep blue gradient atmospheres
        const deepSkyGlow = ctx.createRadialGradient(cx, cy, 30, cx, cy, 550);
        deepSkyGlow.addColorStop(0, 'rgba(30, 27, 75, 0.15)'); // deep Vedic indigo-blue space
        deepSkyGlow.addColorStop(0.5, 'rgba(15, 23, 42, 0.03)');
        deepSkyGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = deepSkyGlow;
        ctx.fillRect(0, 0, width, height);

        const goldenSunGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, 280);
        goldenSunGlow.addColorStop(0, 'rgba(249, 115, 22, 0.16)'); // rich saffron
        goldenSunGlow.addColorStop(0.5, 'rgba(234, 179, 8, 0.08)'); // pure gold
        goldenSunGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = goldenSunGlow;
        ctx.fillRect(0, 0, width, height);

        // 2. Sacred Yantra / Mandala Geometry Layers
        ctx.save();
        ctx.translate(cx, cy);

        // Layer A: Double Outer Astronomical ring with star degree ticks
        ctx.strokeStyle = 'rgba(234, 179, 8, 0.18)'; // pure gold
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.arc(0, 0, 310, 0, Math.PI * 2);
        ctx.arc(0, 0, 302, 0, Math.PI * 2);
        ctx.stroke();

        // 36 stellar degree/tick marks on the dial
        ctx.save();
        ctx.rotate(clockTicks * 0.3);
        ctx.strokeStyle = 'rgba(234, 179, 8, 0.14)';
        for (let t = 0; t < 36; t++) {
          const angle = (t * Math.PI) / 18;
          ctx.beginPath();
          ctx.moveTo(Math.cos(angle) * 302, Math.sin(angle) * 302);
          ctx.lineTo(Math.cos(angle) * 310, Math.sin(angle) * 310);
          ctx.stroke();
        }
        ctx.restore();

        // Layer B: Concentric Geometry Squares (Traditional Sacred Vedic Yantra model)
        ctx.strokeStyle = 'rgba(249, 115, 22, 0.16)'; // saffron
        ctx.lineWidth = 1;
        ctx.save();
        ctx.rotate(-clockTicks * 0.15);
        for (let s = 0; s < 3; s++) {
          const side = 210 - s * 30;
          ctx.beginPath();
          ctx.rect(-side, -side, side * 2, side * 2);
          ctx.stroke();
          // Diagonal square rotations (octagram star)
          ctx.beginPath();
          ctx.rotate(Math.PI / 4);
          ctx.rect(-side, -side, side * 2, side * 2);
          ctx.stroke();
        }
        ctx.restore();

        // Layer C: Cosmic Orbiting Trigonometrical Sinusoids (Early sine/cosine mathematics)
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)'; // deep blue/cyan mathematical waves
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        const sineAmplit = 12;
        const sineFreq = 16;
        for (let a = 0; a <= Math.PI * 2 + 0.05; a += 0.02) {
          const r = 240 + Math.sin(a * sineFreq + clockTicks * 3) * sineAmplit;
          const sx = Math.cos(a) * r;
          const sy = Math.sin(a) * r;
          if (a === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.stroke();

        // Layer D: The 12-petaled Sacred Knowledge Lotus Ring
        ctx.fillStyle = 'rgba(249, 115, 22, 0.03)'; // faint orange fill
        ctx.strokeStyle = 'rgba(249, 115, 22, 0.18)'; // golden-saffron outline
        ctx.lineWidth = 1.5;
        ctx.save();
        ctx.rotate(clockTicks * 0.5);
        for (let i = 0; i < 12; i++) {
          const pAngle = (i * Math.PI) / 6;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.quadraticCurveTo(
            Math.cos(pAngle - 0.15) * 110, Math.sin(pAngle - 0.15) * 110,
            Math.cos(pAngle) * 155, Math.sin(pAngle) * 155
          );
          ctx.quadraticCurveTo(
            Math.cos(pAngle + 0.15) * 110, Math.sin(pAngle + 0.15) * 110,
            0, 0
          );
          ctx.fill();
          ctx.stroke();
        }
        ctx.restore();

        // Layer E: Core Astronomical Sighting ring & Central Sanskrit Seed Symbol
        ctx.strokeStyle = 'rgba(234, 179, 8, 0.22)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 48, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(249, 115, 22, 0.18)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, 60, 0, Math.PI * 2);
        ctx.stroke();

        // Central glowing seed character "ॐ" (Pranava symbol)
        ctx.save();
        ctx.rotate(Math.sin(clockTicks * 0.4) * 0.08); // micro wobble to emphasize rotation
        ctx.fillStyle = 'rgba(234, 179, 8, 0.45)'; // glowing gold
        ctx.font = 'normal bold 36px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('ॐ', 0, 2);
        ctx.restore();

        ctx.restore(); // Exit Mandala scale translations

        // 3. Render and drift Saffron/Gold knowledge elements, Sanskrit symbols, celestial starry nodes
        // Drawing lines for adjacent constellation stars to create deep astronomical blueprint feel
        const constellationStars = particles.filter(p => p.pType === 'constellation');
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.09)'; // blue geometry coordinate connections
        ctx.lineWidth = 0.8;
        for (let m = 0; m < constellationStars.length; m++) {
          for (let n = m + 1; n < constellationStars.length; n++) {
            const dx = constellationStars[m].x - constellationStars[n].x;
            const dy = constellationStars[m].y - constellationStars[n].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 115) {
              ctx.beginPath();
              ctx.moveTo(constellationStars[m].x, constellationStars[m].y);
              ctx.lineTo(constellationStars[n].x, constellationStars[n].y);
              ctx.stroke();
            }
          }
        }

        const sanskritChars = ['ॐ', 'अ', 'ऋ', 'श', 'ध', 'त', 'य', 'क', 'म', 'न', 'व', 'ऋ', 'ब', 'श'];

        particles.forEach((p) => {
          // Particles orbit / rotate around the central mandala if close, otherwise drift upward gently
          const dx = p.x - cx;
          const dy = p.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 380 && p.pType === 'gold-spark') {
            // Orbital pull around ancient mandala structure (rotating solar system feel)
            const orbitSpeed = 0.0035;
            let currentAngle = Math.atan2(dy, dx);
            currentAngle += orbitSpeed * (p.size > 2 ? 1 : -1);
            p.x = cx + Math.cos(currentAngle) * dist + (Math.random() - 0.5) * 0.12;
            p.y = cy + Math.sin(currentAngle) * dist + (Math.random() - 0.5) * 0.12;
          } else {
            // General upward cinematic drift
            p.y += p.vy;
            p.x += Math.sin(tick * 1.1 + p.y * 0.012) * 0.28 + p.vx * 0.15;
          }

          if (p.angle !== undefined && p.rotationSpeed !== undefined) {
            p.angle += p.rotationSpeed * 0.4;
          }

          // Screen edge wrap logic
          if (p.x < -30) p.x = width + 30;
          if (p.x > width + 30) p.x = -30;
          if (p.y < -30) {
            p.y = height + 30;
            p.x = Math.random() * width;
          }

          const shimmer = 0.45 + Math.sin(tick * 2.2 + p.x * 0.04) * 0.55;

          if (p.pType === 'sanskrit') {
            // Saffron/gold glowing Sanskrit glyph floating upward
            const charIdx = Math.floor(Math.abs(p.x + p.y) % sanskritChars.length);
            const charStr = sanskritChars[charIdx];
            const size = p.size;
            const alpha = p.alpha * shimmer * 0.38; // increased visibility

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle || 0);
            ctx.fillStyle = `${p.color}${alpha})`;
            ctx.font = `italic ${Math.round(size)}px serif`;
            ctx.fillText(charStr, 0, 0);
            ctx.restore();

          } else if (p.pType === 'observatory') {
            // Golden Multi-Point star or ancient solar alignment shape (astronomy / Jantar Mantar focus)
            const size = p.size;
            const alpha = p.alpha * shimmer * 0.35; // increased visibility

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle || 0);
            ctx.strokeStyle = `rgba(234, 179, 8, ${alpha})`;
            ctx.lineWidth = 1.25;

            // Draw a fine cosmic coordinate alignment cross coordinate
            ctx.beginPath();
            ctx.moveTo(-size, 0);
            ctx.lineTo(size, 0);
            ctx.moveTo(0, -size);
            ctx.lineTo(0, size);
            ctx.stroke();

            // Diamond star center
            ctx.fillStyle = `rgba(249, 115, 22, ${alpha * 0.4})`;
            ctx.beginPath();
            ctx.moveTo(0, -size * 0.4);
            ctx.lineTo(size * 0.4, 0);
            ctx.lineTo(0, size * 0.4);
            ctx.lineTo(-size * 0.4, 0);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();

          } else if (p.pType === 'constellation') {
            // Blue starry nodes (celestial mapping)
            const size = p.size;
            const alpha = p.alpha * shimmer * 0.35;

            ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
            ctx.fill();

            if (p.size > 2.2) {
              ctx.fillStyle = `rgba(56, 189, 248, ${alpha * 0.25})`;
              ctx.beginPath();
              ctx.arc(p.x, p.y, size * 2.8, 0, Math.PI * 2);
              ctx.fill();
            }

          } else {
            // Classical Golden Spark / Saffron dust
            const size = p.size;
            const alpha = p.alpha * shimmer * 0.35;

            ctx.fillStyle = `${p.color}${alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
            ctx.fill();

            if (size > 2.0) {
              ctx.fillStyle = `${p.color}${alpha * 0.22})`;
              ctx.beginPath();
              ctx.arc(p.x, p.y, size * 2.5, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        });

      } else if (activeSlide === 4) {
        // GIANT ROMAN EAGLE EMBLEM, SHATTERED MARBLE TEXTURES, EMPIRE MAPS & TRADE ROUTES
        
        // 1. Cinematic Roman imperial backgrounds & light glow
        const imperialGlow = ctx.createRadialGradient(contentCenterX, height * 0.5, 30, contentCenterX, height * 0.5, 600);
        imperialGlow.addColorStop(0, 'rgba(180, 83, 9, 0.09)'); // rich bronze amber
        imperialGlow.addColorStop(0.5, 'rgba(4, 120, 87, 0.02)'); // touch of empire laurels
        imperialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = imperialGlow;
        ctx.fillRect(0, 0, width, height);

        // Marble texture veining background
        ctx.strokeStyle = 'rgba(230, 225, 218, 0.012)'; // faint marble cracks
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        for (let v = 1; v <= 4; v++) {
          let lineY = height * (v / 5);
          ctx.moveTo(-50, lineY - 100);
          ctx.bezierCurveTo(width * 0.35, lineY + 120, width * 0.65, lineY - 140, width + 50, lineY + 40);
        }
        ctx.stroke();

        const ox = contentCenterX;
        const oy = height * 0.48;

        // 2. Classical Corinthian Architectural Blueprint Lines
        ctx.strokeStyle = 'rgba(230, 225, 218, 0.14)'; // faint marble drafting lines
        ctx.lineWidth = 1;
        const colStartX = ox - 280;
        const colEndX = ox + 280;

        // Pair of support columns
        [colStartX, colEndX].forEach((colX) => {
          ctx.beginPath();
          ctx.moveTo(colX - 12, 0); ctx.lineTo(colX - 12, height);
          ctx.moveTo(colX + 12, 0); ctx.lineTo(colX + 12, height);
          // Fluting details
          for (let f = -8; f <= 8; f += 4) {
            ctx.moveTo(colX + f, 0); ctx.lineTo(colX + f, height);
          }
          ctx.stroke();

          // Column Capitals
          ctx.fillStyle = 'rgba(230, 225, 218, 0.08)';
          ctx.beginPath();
          ctx.rect(colX - 22, oy - 140, 44, 12);
          ctx.rect(colX - 18, oy - 128, 36, 6);
          ctx.fill();
          ctx.stroke();
        });

        // Architrave/Pediment line
        ctx.beginPath();
        ctx.moveTo(colStartX - 35, oy - 170);
        ctx.lineTo(colEndX + 35, oy - 170);
        ctx.lineTo((colStartX + colEndX) / 2, oy - 250);
        ctx.closePath();
        ctx.stroke();

        // 3. Ancient Mediterranean Empire Maps & Glowing Trade Routes
        const cities = [
          { name: 'Roma', rx: -150, ry: -90 },
          { name: 'Byzantium', rx: 110, ry: -60 },
          { name: 'Carthago', rx: -180, ry: 60 },
          { name: 'Athenae', rx: -20, ry: 10 },
          { name: 'Alexandria', rx: 140, ry: 120 },
        ];

        // Dotted trade networks
        ctx.strokeStyle = 'rgba(217, 119, 6, 0.16)'; // bronze-glowing route coordinates
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        // Rome connections
        ctx.moveTo(ox + cities[0].rx, oy + cities[0].ry);
        ctx.lineTo(ox + cities[1].rx, oy + cities[1].ry);
        ctx.moveTo(ox + cities[0].rx, oy + cities[0].ry);
        ctx.lineTo(ox + cities[2].rx, oy + cities[2].ry);
        // Athens connections
        ctx.moveTo(ox + cities[3].rx, oy + cities[3].ry);
        ctx.lineTo(ox + cities[1].rx, oy + cities[1].ry);
        ctx.moveTo(ox + cities[3].rx, oy + cities[3].ry);
        ctx.lineTo(ox + cities[4].rx, oy + cities[4].ry);
        // Carthage to Alexandria
        ctx.moveTo(ox + cities[2].rx, oy + cities[2].ry);
        ctx.lineTo(ox + cities[4].rx, oy + cities[4].ry);
        ctx.stroke();
        ctx.setLineDash([]); // Reset line dash

        // Draw physical map markers
        cities.forEach((c) => {
          const cx_lbl = ox + c.rx;
          const cy_lbl = oy + c.ry;

          ctx.fillStyle = 'rgba(217, 119, 6, 0.25)'; // bronze marker
          ctx.beginPath();
          ctx.arc(cx_lbl, cy_lbl, 4, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = 'rgba(217, 119, 6, 0.15)';
          ctx.beginPath();
          ctx.arc(cx_lbl, cy_lbl, 9 + Math.sin(tick * 1.5 + cx_lbl) * 3, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = 'rgba(230, 225, 218, 0.25)'; // map text font
          ctx.font = 'italic 10px serif';
          ctx.fillText(c.name, cx_lbl + 10, cy_lbl + 3);
        });

        // Little traveling glow particles on Sea/Land trade route pathways
        ctx.fillStyle = 'rgba(251, 191, 36, 0.22)';
        cities.forEach((c, idx) => {
          const nextCity = cities[(idx + 1) % cities.length];
          const startX = ox + c.rx;
          const startY = oy + c.ry;
          const endX = ox + nextCity.rx;
          const endY = oy + nextCity.ry;

          const t = (tick * 0.12 + idx * 0.3) % 1.0;
          const px = startX + (endX - startX) * t;
          const py = startY + (endY - startY) * t;

          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fill();
        });

        // 4. Gigantic Rome Eagle Emblem (Aquila)
        ctx.save();
        ctx.translate(ox, oy);
        // Slowly breathe/pulse the eagle scale
        const breathScale = 1.0 + Math.sin(tick * 0.5) * 0.02;
        ctx.scale(breathScale, breathScale);

        ctx.strokeStyle = 'rgba(180, 110, 48, 0.22)'; // beautiful warm bronze
        ctx.fillStyle = 'rgba(180, 110, 48, 0.12)'; // semi-translucent gold/bronze fill
        ctx.lineWidth = 1.5;

        // Eagle drawing paths
        ctx.beginPath();
        // Beak & Head profile looking Left
        ctx.moveTo(-10, -50);
        ctx.quadraticCurveTo(-16, -62, -24, -62); // crown
        ctx.quadraticCurveTo(-30, -59, -32, -50); // beak tip
        ctx.lineTo(-24, -46); // jaw
        ctx.quadraticCurveTo(-14, -40, -10, -35); // throat

        // Back skull
        ctx.moveTo(-10, -50);
        ctx.quadraticCurveTo(0, -44, 6, -35); // right neck

        // Outspread wings (feather levels)
        // Left Wing
        ctx.moveTo(-10, -35);
        ctx.quadraticCurveTo(-70, -66, -165, -45); // wing top left
        ctx.bezierCurveTo(-155, -15, -125, 15, -40, 5); // feathers curves
        ctx.lineTo(-25, -10);

        // Right Wing
        ctx.moveTo(6, -35);
        ctx.quadraticCurveTo(66, -66, 161, -45); // wing top right
        ctx.bezierCurveTo(151, -15, 121, 15, 36, 5);
        ctx.lineTo(21, -10);

        // Claws & tail feathers at base
        ctx.moveTo(-25, 10);
        ctx.lineTo(-32, 55);
        ctx.lineTo(-12, 65);
        ctx.lineTo(12, 65);
        ctx.lineTo(32, 55);
        ctx.lineTo(25, 10);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // SPQR Banner inscription under claws
        ctx.fillStyle = 'rgba(234, 179, 8, 0.45)'; // pure bright golden badge SPQR
        ctx.font = 'bold 18px serif';
        ctx.textAlign = 'center';
        ctx.fillText('S • P • Q • R', 0, 94);

        ctx.strokeStyle = 'rgba(180, 110, 48, 0.22)';
        ctx.rect(-60, 76, 120, 24);
        ctx.stroke();

        ctx.restore();

        // 5. Slowly rotating Laurel Wreath branch framing
        ctx.save();
        ctx.translate(ox, oy);
        ctx.rotate(tick * 0.055); // slow elegant circular rotation

        ctx.strokeStyle = 'rgba(141, 122, 101, 0.16)'; // bronze laurel twigs
        ctx.lineWidth = 2.5;
        const wreathRadius = 188;

        // Left half arc
        ctx.beginPath();
        ctx.arc(0, 0, wreathRadius, Math.PI * 0.5, Math.PI * 1.5);
        ctx.stroke();

        // Right half arc
        ctx.beginPath();
        ctx.arc(0, 0, wreathRadius, Math.PI * 1.5, Math.PI * 2.5);
        ctx.stroke();

        // Golden bronze leaves sprouting at intervals
        const leafCount = 14;
        ctx.fillStyle = 'rgba(180, 110, 48, 0.18)';
        for (let l = 0; l < leafCount; l++) {
          const progress = l / (leafCount - 1);
          const angleL = Math.PI * 0.5 + progress * Math.PI;
          const angleR = Math.PI * 1.5 + progress * Math.PI;

          [angleL, angleR].forEach((ang, gIdx) => {
            const lx = Math.cos(ang) * wreathRadius;
            const ly = Math.sin(ang) * wreathRadius;

            ctx.save();
            ctx.translate(lx, ly);
            // Orient outwards with wave wobble
            const rotBase = ang + (gIdx === 0 ? Math.PI / 2 : -Math.PI / 2);
            ctx.rotate(rotBase + Math.sin(tick * 1.8 + l) * 0.08);

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(-6, -13, 0, -20);
            ctx.quadraticCurveTo(6, -13, 0, 0);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
          });
        }
        ctx.restore();

        // 6. Draw drifting Laurel leaves, trade node sparks, and marble grains
        particles.forEach((p) => {
          // Drifts upward with natural atmospheric sway
          p.y += p.vy;
          p.x += Math.sin(tick * 1.3 + p.y * 0.012) * 0.28 + p.vx * 0.15;

          if (p.angle !== undefined && p.rotationSpeed !== undefined) {
            p.angle += p.rotationSpeed * 0.45;
          }

          // Edge wrapping bounds
          if (p.x < -30) p.x = width + 30;
          if (p.x > width + 30) p.x = -30;
          if (p.y < -30) {
            p.y = height + 30;
            p.x = Math.random() * width;
          }

          const shimmer = 0.45 + Math.sin(tick * 2.5 + p.x * 0.035) * 0.55;

          if (p.pType === 'laurel') {
            // Rotating drifting bronze leaves
            const size = p.size;
            const alpha = p.alpha * shimmer * 0.38; // increased visibility

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle || 0);
            ctx.fillStyle = `${p.color}${alpha})`;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(-size * 0.42, -size * 0.6, 0, -size);
            ctx.quadraticCurveTo(size * 0.42, -size * 0.6, 0, 0);
            ctx.closePath();
            ctx.fill();
            ctx.restore();

          } else if (p.pType === 'trade-spark') {
            // Energetic warm trade sparks
            const size = p.size;
            const alpha = p.alpha * shimmer * 0.38;

            ctx.fillStyle = `rgba(245, 158, 11, ${alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
            ctx.fill();

            if (size > 2.2) {
              ctx.fillStyle = `rgba(245, 158, 11, ${alpha * 0.22})`;
              ctx.beginPath();
              ctx.arc(p.x, p.y, size * 2.4, 0, Math.PI * 2);
              ctx.fill();
            }

          } else {
            // Limestone grey/marble dust specs
            const size = p.size;
            const alpha = p.alpha * shimmer * 0.25;

            ctx.fillStyle = `rgba(230, 225, 218, ${alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
            ctx.fill();
          }
        });

      } else if (activeSlide === 5) {
        // DARK FANTASY MEDIEVAL ZONE (Flickering Torchlights, Castle Silhouettes, Shields, Crossed Swords, and Crown)
        
        // 1. Cinematic Torchlight Reflections (flickering warm glow in corners & behind castle)
        const torchFlicker1 = Math.sin(tick * 0.08) * 20;
        const torchFlicker2 = Math.cos(tick * 0.06) * 25;
        
        // Left Flame Glow
        const leftTorch = ctx.createRadialGradient(contentCenterX - contentWidth * 0.38, height * 0.7, 5, contentCenterX - contentWidth * 0.38, height * 0.7, 300 + torchFlicker1);
        leftTorch.addColorStop(0, 'rgba(239, 68, 68, 0.22)'); // Deep crimson center
        leftTorch.addColorStop(0.4, 'rgba(245, 158, 11, 0.12)'); // Amber flame aura
        leftTorch.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = leftTorch;
        ctx.fillRect(0, 0, width, height);

        // Right Flame Glow
        const rightTorch = ctx.createRadialGradient(contentCenterX + contentWidth * 0.38, height * 0.65, 5, contentCenterX + contentWidth * 0.38, height * 0.65, 280 + torchFlicker2);
        rightTorch.addColorStop(0, 'rgba(249, 115, 22, 0.24)'); // Saffron center
        rightTorch.addColorStop(0.5, 'rgba(220, 38, 38, 0.09)'); // Warm scarlet aura
        rightTorch.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = rightTorch;
        ctx.fillRect(0, 0, width, height);

        // 2. Subtle Stony Castle Silhouettes (Towering turrets & crenellated battlements)
        ctx.fillStyle = 'rgba(15, 23, 42, 0.38)'; // Dark slate stonework shadow
        
        // Far Left Castle structure
        ctx.beginPath();
        ctx.moveTo(-40, height);
        ctx.lineTo(-40, height * 0.52);
        ctx.lineTo(80, height * 0.52);
        ctx.lineTo(80, height * 0.55); // Crenelation notch
        ctx.lineTo(120, height * 0.55);
        ctx.lineTo(120, height * 0.52);
        ctx.lineTo(180, height * 0.52);
        // Left Tower
        ctx.lineTo(180, height * 0.40);
        ctx.lineTo(165, height * 0.40);
        ctx.lineTo(165, height * 0.37); // cap
        ctx.lineTo(235, height * 0.37);
        ctx.lineTo(235, height * 0.40);
        ctx.lineTo(220, height * 0.40);
        ctx.lineTo(220, height * 0.56);
        ctx.lineTo(width * 0.32, height * 0.56);
        ctx.lineTo(width * 0.32, height);
        ctx.closePath();
        ctx.fill();

        // Far Right Castle structure
        ctx.beginPath();
        ctx.moveTo(width + 40, height);
        ctx.lineTo(width + 40, height * 0.50);
        ctx.lineTo(width - 90, height * 0.50);
        ctx.lineTo(width - 90, height * 0.53);
        ctx.lineTo(width - 130, height * 0.53);
        ctx.lineTo(width - 130, height * 0.50);
        ctx.lineTo(width - 200, height * 0.50);
        // Tall Guard Lookout Turret (with conical slate roof outline)
        ctx.lineTo(width - 200, height * 0.36);
        ctx.lineTo(width - 215, height * 0.36);
        ctx.lineTo(width - 165, height * 0.28); // cone point
        ctx.lineTo(width - 115, height * 0.36);
        ctx.lineTo(width - 130, height * 0.36);
        ctx.lineTo(width - 130, height * 0.54);
        ctx.lineTo(width * 0.68, height * 0.54);
        ctx.lineTo(width * 0.68, height);
        ctx.closePath();
        ctx.fill();

        // 3. Middle Ground Heraldry & Weaponry (Shield & Swords crossed behind crown)
        const ox = contentCenterX;
        const oy = height * 0.46 + Math.sin(tick * 0.035) * 14; // Floating sway
        const rotation = Math.sin(tick * 0.018) * 0.035; // Gentle float tilt

        ctx.save();
        ctx.translate(ox, oy);
        ctx.rotate(rotation);

        // A. CROSSED MEDIEVAL SWORDS (Detailed engraving handles, guards, blades)
        // Two separate rotations for crossed weapons (angled at 45deg)
        const dBlades = [Math.PI / 4, -Math.PI / 4];
        dBlades.forEach((bladeRotation) => {
          ctx.save();
          ctx.rotate(bladeRotation);

          ctx.strokeStyle = 'rgba(148, 163, 184, 0.38)'; // Polished forged steel look
          ctx.fillStyle = 'rgba(71, 85, 105, 0.22)';
          ctx.lineWidth = 1.6;

          // Draw Pommel (Round steel capping at end of hilt)
          ctx.beginPath();
          ctx.arc(0, 160, 11, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Draw Hilt Grip
          ctx.fillStyle = 'rgba(30, 41, 59, 0.45)';
          ctx.beginPath();
          ctx.rect(-5, 110, 10, 39);
          ctx.fill();
          ctx.stroke();

          // Grip leather wraps (ribbed detail lines)
          ctx.strokeStyle = 'rgba(217, 119, 6, 0.3)';
          ctx.lineWidth = 1;
          for (let gripL = 0; gripL < 5; gripL++) {
            ctx.beginPath();
            ctx.moveTo(-5, 115 + gripL * 7);
            ctx.lineTo(5, 115 + gripL * 7);
            ctx.stroke();
          }

          // Draw Heavy Crossguard
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
          ctx.fillStyle = 'rgba(51, 65, 85, 0.35)';
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(-35, 110);
          ctx.lineTo(35, 110);
          ctx.lineTo(25, 102);
          ctx.lineTo(-25, 102);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Draw Longsword Blade (pointing outwards)
          ctx.fillStyle = 'rgba(203, 213, 225, 0.16)';
          ctx.beginPath();
          ctx.moveTo(-7, 102);
          ctx.lineTo(-6, -180); // Blade length
          ctx.lineTo(0, -205);  // Blade point tip
          ctx.lineTo(6, -180);
          ctx.lineTo(7, 102);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Sword fuller groove down the center of the blade
          ctx.strokeStyle = 'rgba(100, 116, 139, 0.32)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, 95);
          ctx.lineTo(0, -170);
          ctx.stroke();

          ctx.restore();
        });

        // B. THE MAJESTIC HERALDIC SHIELD (Centered behind Crown)
        ctx.strokeStyle = 'rgba(120, 113, 108, 0.45)'; // Burnished bronze trim
        ctx.lineWidth = 2.5;

        // Draw outer shield path
        ctx.beginPath();
        ctx.moveTo(0, -110);
        ctx.bezierCurveTo(45, -110, 80, -75, 80, -35);
        ctx.bezierCurveTo(80, 20, 50, 75, 0, 105);
        ctx.bezierCurveTo(-50, 75, -80, 20, -80, -35);
        ctx.bezierCurveTo(-80, -75, -45, -110, 0, -110);
        ctx.closePath();
        ctx.fillStyle = 'rgba(15, 23, 42, 0.55)'; // Deep dark iron shield body
        ctx.fill();
        ctx.stroke();

        // Shield Quartering & Heraldic Engravings (Warm color fillings, lion charge, medieval crosses)
        ctx.save();
        // Clip layout inside shield boundaries to draw heraldic quarterly charges perfectly
        ctx.beginPath();
        ctx.moveTo(0, -110);
        ctx.bezierCurveTo(45, -110, 80, -75, 80, -35);
        ctx.bezierCurveTo(80, 20, 50, 75, 0, 105);
        ctx.bezierCurveTo(-50, 75, -80, 20, -80, -35);
        ctx.bezierCurveTo(-80, -75, -45, -110, 0, -110);
        ctx.closePath();
        ctx.clip();

        // Quarter I & IV filling: Warm Deep Gules (Crimson red checker pattern)
        ctx.fillStyle = 'rgba(153, 27, 27, 0.16)';
        ctx.beginPath();
        ctx.rect(0, -115, 85, 80); // Top Right quarter
        ctx.rect(-85, -35, 85, 145); // Bottom Left quarter
        ctx.fill();

        // Quarter II & III filling: Saffron Lion Aurum
        ctx.fillStyle = 'rgba(217, 119, 6, 0.16)';
        ctx.beginPath();
        ctx.rect(-85, -115, 85, 80); // Top Left quarter
        ctx.rect(0, -35, 85, 145); // Bottom Right quarter
        ctx.fill();

        // Vertical and Horizontal divider lines
        ctx.strokeStyle = 'rgba(120, 113, 108, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, -115);
        ctx.lineTo(0, 110);
        ctx.moveTo(-85, -35);
        ctx.lineTo(85, -35);
        ctx.stroke();

        // Engrave Knightly emblem inside the center of shield: double-headed crown cross
        ctx.fillStyle = 'rgba(234, 179, 8, 0.25)'; // Glowing golden cross charge
        ctx.beginPath();
        // Horizontal bar
        ctx.rect(-28, -42, 56, 14);
        // Vertical bar
        ctx.rect(-7, -65, 14, 60);
        ctx.fill();

        ctx.restore(); // end of shield clipping

        // C. FLOATING ROYAL CROWN (In front of shield with 3D metallic bevel layers)
        // Draw deep inner state headcap velvet backing (deep medieval purple velvet)
        ctx.fillStyle = 'rgba(88, 28, 135, 0.18)'; // Translucent royal bishop purple
        ctx.beginPath();
        ctx.moveTo(-90, -15);
        ctx.bezierCurveTo(-90, -75, 90, -75, 90, -15);
        ctx.closePath();
        ctx.fill();

        // Double Arching Velvet Ribbons
        ctx.strokeStyle = 'rgba(217, 119, 6, 0.35)'; // gold arches crossing
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(-80, -20);
        ctx.quadraticCurveTo(-40, -85, 0, -85);
        ctx.moveTo(80, -20);
        ctx.quadraticCurveTo(40, -85, 0, -85);
        ctx.stroke();

        // Crest point on arch center
        ctx.fillStyle = 'rgba(234, 179, 8, 0.40)';
        ctx.beginPath();
        ctx.arc(0, -85, 6, 0, Math.PI * 2);
        ctx.fill();

        // Draw Outer Golden Crown Band Base (Thick heavy rim)
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = 'rgba(217, 119, 6, 0.40)'; // warm bronze rim
        ctx.fillStyle = 'rgba(30, 41, 59, 0.50)'; // heavy cast iron dark fill
        
        ctx.beginPath();
        ctx.moveTo(-92, -10);
        ctx.quadraticCurveTo(0, 8, 92, -10); // Band curve
        ctx.lineTo(95, 10);
        ctx.quadraticCurveTo(0, 27, -95, 10);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Embedded Emerald/Saphire jewels on the crown band
        const gemCols = ['rgba(16, 185, 129,', 'rgba(239, 68, 68,', 'rgba(14, 165, 233,', 'rgba(245, 158, 11,'];
        for (let g = 0; g < 6; g++) {
          const progressG = g / 5;
          const gx = -75 + progressG * 150;
          const gy = 0 + (1 - Math.pow(progressG - 0.5, 2) * 4) * 8; // align onto the curved band

          ctx.fillStyle = `${gemCols[g % gemCols.length]}${0.45 + Math.sin(tick * 0.1 + g) * 0.2})`;
          ctx.beginPath();
          ctx.arc(gx, gy, 4.5, 0, Math.PI * 2);
          ctx.fill();
          
          // gold socket trim
          ctx.strokeStyle = 'rgba(234, 179, 8, 0.35)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Draw Majestic Crown Battlements (5 Sharp towering gold spikes)
        ctx.fillStyle = 'rgba(217, 119, 6, 0.35)'; // heavy bronze spike plate
        ctx.strokeStyle = 'rgba(234, 179, 8, 0.42)'; // sparkling golden highlights
        ctx.lineWidth = 1.8;

        ctx.beginPath();
        ctx.moveTo(-92, -10); // Start left outer peak
        
        // Spike 1 (Outer Left)
        ctx.bezierCurveTo(-82, -35, -78, -35, -70, -32);
        ctx.lineTo(-58, -10); 

        // Spike 2 (Mid Left)
        ctx.bezierCurveTo(-46, -55, -42, -55, -34, -45);
        ctx.lineTo(-24, -5); 

        // Spike 3 (Tall Central Peak)
        ctx.bezierCurveTo(-14, -75, 14, -75, 24, -5); 

        // Spike 4 (Mid Right)
        ctx.lineTo(34, -45);
        ctx.bezierCurveTo(42, -55, 46, -55, 58, -10);

        // Spike 5 (Outer Right)
        ctx.lineTo(70, -32);
        ctx.bezierCurveTo(78, -35, 82, -35, 92, -10);

        // Curved inner contour line for peaks back to base
        ctx.quadraticCurveTo(0, 8, -92, -10);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Top Crown Fleur-de-lis of State on Major Peaks
        const peakXCoords = [-75, -40, 0, 40, 75];
        const peakYHeight = [-33, -50, -68, -50, -33];
        peakXCoords.forEach((px, pidx) => {
          const py = peakYHeight[pidx] + (pidx === 2 ? Math.sin(tick * 0.05) * 1.5 : 0);
          
          // Draw a sparkling diamond gold peak sphere
          ctx.fillStyle = 'rgba(234, 179, 8, 0.55)';
          ctx.beginPath();
          ctx.arc(px, py, 4.5, 0, Math.PI * 2);
          ctx.fill();
          
          // Light ray trace
          ctx.strokeStyle = 'rgba(234, 179, 8, 0.18)';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px, py - 18);
          ctx.stroke();
        });

        ctx.restore(); // Restore floating translation

        // 4. Heavy Mountain Cliff / Dungeon Dungeon Gate Drifting Fog
        ctx.fillStyle = 'rgba(30, 41, 59, 0.16)'; // Fog layer A
        for (let j = 0; j < 3; j++) {
          ctx.beginPath();
          const mistYOffset = height * 0.38 + j * 105;
          ctx.moveTo(0, height);
          for (let x = 0; x <= width; x += 40) {
            const relativeY = mistYOffset + Math.sin(x * 0.0028 + tick * 0.08 + j * 1.5) * 45;
            ctx.lineTo(x, relativeY);
          }
          ctx.lineTo(width, height);
          ctx.closePath();
          ctx.fill();
        }

        // 5. Atmospheric Particles (Flickering gold embers rising + cold blue mountain sparks dropping)
        particles.forEach((p, idx) => {
          if (idx % 2 === 0) {
            // FLICKERING TORCH EMBER SPARKS (Drifting upwards)
            p.y -= Math.abs(p.vy) + 0.6;
            p.x += Math.sin(tick * 0.015 + idx) * 0.45;
            
            // Boundary reset
            if (p.y < -10) {
              p.y = height + 10;
              p.x = Math.random() * width;
            }

            // Draw orange flare glow ring
            ctx.fillStyle = `rgba(245, 158, 11, ${p.alpha * 0.65})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 1.6, 0, Math.PI * 2);
            ctx.fill();

            // Saffron center core
            ctx.fillStyle = `rgba(254, 215, 170, ${p.alpha * 0.85})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // COLD CASTLE SNOWY ASH FLAKES (Drifting downwards)
            p.y += Math.abs(p.vy) + 0.45;
            p.x += Math.cos(tick * 0.012 + idx) * 0.4;

            if (p.y > height + 10) {
              p.y = -10;
              p.x = Math.random() * width;
            }

            // Draw cold slate-blue crystalline speck
            ctx.fillStyle = `rgba(186, 230, 253, ${p.alpha * 0.55})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 1.1, 0, Math.PI * 2);
            ctx.fill();
          }
        });

      } else if (activeSlide === 6) {
        // WORLD CARTOGRAPHY & ANTIQUE COMPASS ZONE (Parchment hues, Sea Currents, Navigation Rhumb Lines, Sailing Routes, and Beveled Compass Rose)
        
        const cx = contentCenterX;
        const cy = height * 0.48 + Math.sin(tick * 0.02) * 12; // Floating dynamic sea swell height
        
        // 1. Old Map Parchment Gradient & Sea-current backdrop
        const mapGlow = ctx.createRadialGradient(cx, cy, 30, cx, cy, 380);
        mapGlow.addColorStop(0, 'rgba(180, 110, 48, 0.08)'); // Antique bronze center glow
        mapGlow.addColorStop(0.5, 'rgba(14, 165, 233, 0.04)'); // Soft sea blue blend
        mapGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = mapGlow;
        ctx.fillRect(0, 0, width, height);

        // 2. Map Coordinates Overlay (Latitude & Longitude grid lines)
        ctx.strokeStyle = 'rgba(180, 110, 48, 0.14)';
        ctx.lineWidth = 0.8;
        
        // Draw latitude lines (Horizontal arcs)
        const latIntervals = [-150, -75, 0, 75, 150];
        latIntervals.forEach((offset) => {
          ctx.beginPath();
          ctx.arc(cx, cy - 600, Math.sqrt(600 * 600 + offset * 600), 0, Math.PI * 2);
          ctx.stroke();

          // Coordinate label text
          ctx.fillStyle = 'rgba(180, 110, 48, 0.32)';
          ctx.font = 'italic 9px serif';
          ctx.fillText(`${Math.abs(offset / 10)}° N`, cx + 320, cy + offset * 0.8);
        });

        // Draw longitude lines (Radiational arcs from pole)
        const poleY = cy - 600;
        for (let lng = -3; lng <= 3; lng++) {
          ctx.beginPath();
          ctx.moveTo(cx, poleY);
          ctx.quadraticCurveTo(cx + lng * 100, cy, cx + lng * 200, height);
          ctx.stroke();
        }

        // 3. Classical Navigation Rhumb Lines radiating across the map
        // Radiates from the center of the ocean map
        ctx.strokeStyle = 'rgba(14, 165, 233, 0.09)'; // Cyan ocean rhumb
        ctx.lineWidth = 0.5;
        ctx.setLineDash([8, 12]);
        const rhumbs = 16;
        ctx.beginPath();
        for (let r = 0; r < rhumbs; r++) {
          const angle = (r * Math.PI * 2) / rhumbs;
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(angle) * width, cy + Math.sin(angle) * width);
        }
        ctx.stroke();
        ctx.setLineDash([]); // Reset dashed state

        // 4. Abstract Continent Coastline Overlays (Soft antique washes representing mysterious islands and coastlines)
        ctx.fillStyle = 'rgba(180, 110, 48, 0.055)'; // Sandy landmass shadow
        ctx.strokeStyle = 'rgba(180, 110, 48, 0.16)';
        ctx.lineWidth = 1.25;
        
        // Terra Incognita (Top Left)
        ctx.beginPath();
        ctx.moveTo(-100, -50);
        ctx.bezierCurveTo(width * 0.15, -40, width * 0.18, height * 0.15, width * 0.06, height * 0.3);
        ctx.bezierCurveTo(width * 0.03, height * 0.35, -50, height * 0.4, -100, height * 0.42);
        ctx.lineTo(-100, -50);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Mysterious Archipelago (Bottom Right)
        ctx.beginPath();
        const archyX = contentCenterX + contentWidth * 0.28;
        const archyY = height * 0.68;
        ctx.arc(archyX, archyY, 55, 0, Math.PI * 2);
        ctx.arc(archyX + 85, archyY + 45, 45, 0, Math.PI * 2);
        ctx.arc(archyX - 60, archyY + 70, 25, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // 5. INTUITIVE SAILING ROUTE ANIMATIONS (A dynamic trading route spline with an active ship marker)
        const p0 = { x: contentCenterX - contentWidth * 0.38, y: height * 0.76 };
        const p1 = { x: cx - 180, y: cy + 120 };
        const p2 = { x: cx + 180, y: cy - 110 };
        const p3 = { x: contentCenterX + contentWidth * 0.36, y: height * 0.22 };

        // Draw dotted route line
        ctx.strokeStyle = 'rgba(217, 119, 6, 0.32)'; // gold voyage route
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        ctx.stroke();
        ctx.setLineDash([]); // Reset

        // Animated Galleon/Trading Ship crossing the ocean route
        const tRoute = (tick * 0.0028) % 1.0;
        
        // Bezier formula calculating coordinates at tRoute
        const mt = 1 - tRoute;
        const shipX = mt * mt * mt * p0.x + 3 * mt * mt * tRoute * p1.x + 3 * mt * tRoute * tRoute * p2.x + tRoute * tRoute * tRoute * p3.x;
        const shipY = mt * mt * mt * p0.y + 3 * mt * mt * tRoute * p1.y + 3 * mt * tRoute * tRoute * p2.y + tRoute * tRoute * tRoute * p3.y;

        // Tangent angle of the bezier curve for ship direction rotation
        const tangentX = 3 * mt * mt * (p1.x - p0.x) + 6 * mt * tRoute * (p2.x - p1.x) + 3 * tRoute * tRoute * (p3.x - p2.x);
        const tangentY = 3 * mt * mt * (p1.y - p0.y) + 6 * mt * tRoute * (p2.y - p1.y) + 3 * tRoute * tRoute * (p3.y - p2.y);
        const shipAngle = Math.atan2(tangentY, tangentX);

        // Draw Ship icon & trailing wake ripple
        ctx.save();
        ctx.translate(shipX, shipY);
        ctx.rotate(shipAngle);

        // Sea Wake
        ctx.strokeStyle = 'rgba(14, 165, 233, 0.32)';
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.moveTo(-15, 0);
        ctx.quadraticCurveTo(-28, -8, -45, -12);
        ctx.moveTo(-15, 0);
        ctx.quadraticCurveTo(-28, 8, -45, 12);
        ctx.stroke();

        // Galleon Hull (Minimalist high-contrast sails)
        ctx.fillStyle = 'rgba(217, 119, 6, 0.42)'; // Bronze hull
        ctx.strokeStyle = 'rgba(234, 179, 8, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-12, -4);
        ctx.lineTo(8, -2);
        ctx.lineTo(14, 0);
        ctx.lineTo(8, 2);
        ctx.lineTo(-12, 4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Main Lateen Sail
        ctx.fillStyle = 'rgba(230, 225, 218, 0.55)'; // Billowing sails
        ctx.beginPath();
        ctx.moveTo(-2, -3);
        ctx.quadraticCurveTo(6, -14, -8, -22);
        ctx.quadraticCurveTo(-1, -10, -2, -3);
        ctx.fill();

        ctx.restore();

        // 6. GIANT ANTIQUE BEVELED COMPASS ROSE
        const compassRotation = tick * 0.028; // Increased rotation speed as requested
        
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(compassRotation);

        // A. Multi-tiered heavy brass circular rims
        // Extreme outer collar
        ctx.strokeStyle = 'rgba(180, 110, 48, 0.28)'; // Bronze
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(0, 0, 195, 0, Math.PI * 2);
        ctx.stroke();

        // Main division calibration wheel ring
        ctx.strokeStyle = 'rgba(217, 119, 6, 0.32)'; // Gold
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(0, 0, 185, 0, Math.PI * 2);
        ctx.stroke();

        // Inner frame track
        ctx.strokeStyle = 'rgba(180, 110, 48, 0.38)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 172, 0, Math.PI * 2);
        ctx.stroke();

        // Degree division graduations/ticks on outer ring
        ctx.strokeStyle = 'rgba(217, 119, 6, 0.32)';
        ctx.lineWidth = 1;
        for (let d = 0; d < 72; d++) {
          const tAngle = (d * Math.PI) / 36;
          const len = d % 9 === 0 ? 9 : 4; // Major octants are longer
          ctx.beginPath();
          ctx.moveTo(Math.cos(tAngle) * 172, Math.sin(tAngle) * 172);
          ctx.lineTo(Math.cos(tAngle) * (172 + len), Math.sin(tAngle) * (172 + len));
          ctx.stroke();
        }

        // B. 16-Point Multi-shaded Beveled Star Compass Points
        // Draw 16 point layout - 8 subpoints first, then 4 midpoints, then 4 cardinal points (so they overlap correctly)
        
        // Tier 1: 8 Tertiary Tiny Points (Light slate/bronze)
        for (let p = 0; p < 8; p++) {
          const angleStart = (p * Math.PI / 4) + (Math.PI / 8);
          ctx.save();
          ctx.rotate(angleStart);
          
          // Left side (Light)
          ctx.fillStyle = 'rgba(14, 165, 233, 0.22)'; // ocean blue tint
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(-12, -92);
          ctx.lineTo(0, -115);
          ctx.closePath();
          ctx.fill();

          // Right side (Dark)
          ctx.fillStyle = 'rgba(180, 110, 48, 0.18)'; // bronze shadow
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(12, -92);
          ctx.lineTo(0, -115);
          ctx.closePath();
          ctx.fill();

          ctx.restore();
        }

        // Tier 2: 4 Secondary Mid-points (NE, SE, SW, NW)
        for (let p = 0; p < 4; p++) {
          const angleStart = (p * Math.PI / 2) + (Math.PI / 4);
          ctx.save();
          ctx.rotate(angleStart);
          
          // Left side (Saffron Gold)
          ctx.fillStyle = 'rgba(217, 119, 6, 0.34)';
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(-20, -115);
          ctx.lineTo(0, -145);
          ctx.closePath();
          ctx.fill();

          // Right side (Deep Amber/Bronze shadow)
          ctx.fillStyle = 'rgba(146, 64, 14, 0.32)';
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(20, -115);
          ctx.lineTo(0, -145);
          ctx.closePath();
          ctx.fill();

          ctx.restore();
        }

        // Tier 3: 4 Major Primary Cardinal Points (North, East, South, West)
        for (let p = 0; p < 4; p++) {
          const angleStart = (p * Math.PI / 2);
          ctx.save();
          ctx.rotate(angleStart);
          
          // Left portion - Metallic Bright Gold
          ctx.fillStyle = 'rgba(234, 179, 8, 0.48)';
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(-28, -135);
          ctx.lineTo(0, -170); // Full reach
          ctx.closePath();
          ctx.fill();

          // Right portion - Dark Antique Bronze
          ctx.fillStyle = 'rgba(120, 113, 108, 0.44)';
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(28, -135);
          ctx.lineTo(0, -170);
          ctx.closePath();
          ctx.fill();

          // Golden ridge highlight line down the central spine
          ctx.strokeStyle = 'rgba(234, 179, 8, 0.55)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -170);
          ctx.stroke();

          ctx.restore();
        }

        // North Fleur-de-lis Crest overlay pointing North (located on the Compass N)
        ctx.save();
        // Pointing North, so 0 translation/heading
        ctx.translate(0, -155);
        ctx.scale(0.85, 0.85);
        ctx.fillStyle = 'rgba(234, 179, 8, 0.52)'; // sparkling crowning gold
        ctx.beginPath();
        // Center Petal
        ctx.moveTo(0, -18);
        ctx.bezierCurveTo(-5, -6, -5, 4, 0, 10);
        ctx.bezierCurveTo(5, 4, 5, -6, 0, -18);
        // Left Wing
        ctx.moveTo(0, 2);
        ctx.bezierCurveTo(-14, -8, -18, 4, -8, 8);
        ctx.bezierCurveTo(-4, 9, -2, 5, 0, 2);
        // Right Wing
        ctx.moveTo(0, 2);
        ctx.bezierCurveTo(14, -8, 18, 4, 8, 8);
        ctx.bezierCurveTo(4, 9, 2, 5, 0, 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // C. Central Brass Dial & Cardinal Letter Placement (N, S, E, W)
        ctx.strokeStyle = 'rgba(180, 110, 48, 0.4)';
        ctx.fillStyle = 'rgba(30, 41, 59, 0.65)'; // deep iron center hub
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(0, 0, 52, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = 'rgba(217, 119, 6, 0.38)';
        ctx.beginPath();
        ctx.arc(0, 0, 44, 0, Math.PI * 2);
        ctx.stroke();

        // Central Mini 8-Point Star
        for (let j = 0; j < 8; j++) {
          ctx.save();
          ctx.rotate((j * Math.PI) / 4);
          ctx.fillStyle = j % 2 === 0 ? 'rgba(234, 179, 8, 0.45)' : 'rgba(146, 64, 14, 0.45)';
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(-6, -26);
          ctx.lineTo(0, -32);
          ctx.lineTo(6, -26);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }

        // Draw Letters (compated back to global heading by drawing them rotated reverse relative to compass)
        const directions = [
          { text: 'N', x: 0, y: -188 },
          { text: 'E', x: 188, y: 0 },
          { text: 'S', x: 0, y: 188 },
          { text: 'W', x: -188, y: 0 }
        ];

        directions.forEach((dir) => {
          ctx.save();
          // Offset text positioning
          ctx.translate(dir.x, dir.y);
          // Zero back rotation so characters are upright
          ctx.rotate(-compassRotation);
          
          ctx.fillStyle = 'rgba(234, 179, 8, 0.72)'; // Clear visible gold N/S/E/W
          ctx.font = 'bold italic 15px Georgia, serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(dir.text, 0, 0);
          ctx.restore();
        });

        ctx.restore(); // Restore Compass Translation

        // 7. Dynamic Sea-Current Particles (Gold, bronze, and ocean-blue currents sweeping around)
        particles.forEach((p, idx) => {
          // Circular ocean spiral vector swifting + wave float drift
          const dx = p.x - cx;
          const dy = p.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Force a circular orbital velocity around the compass for sea current particles
          if (dist > 20 && dist < 380) {
            const orbitalSpeed = (200 / dist) * 0.28;
            const angle = Math.atan2(dy, dx);
            // Swirl velocity vector
            p.vx = -Math.sin(angle) * orbitalSpeed + (Math.random() - 0.5) * 0.15;
            p.vy = Math.cos(angle) * orbitalSpeed + (Math.random() - 0.5) * 0.15;
          } else {
            // Standard linear drift
            if (Math.abs(p.vx) > 1.2) p.vx *= 0.8;
            if (Math.abs(p.vy) > 1.2) p.vy *= 0.8;
          }

          p.x += p.vx;
          p.y += p.vy;

          // Boundary bounce or reset
          if (p.x < -10 || p.x > width + 10 || p.y < -10 || p.y > height + 10) {
            p.x = Math.random() * width;
            p.y = Math.random() * height;
            p.vx = (Math.random() - 0.5) * 0.8;
            p.vy = (Math.random() - 0.5) * 0.8;
          }

          // Shimmer visibility
          const shimmer = 0.5 + Math.sin(tick * 0.04 + idx) * 0.45;
          const finalOpacity = p.alpha * shimmer * 1.5;

          if (idx % 3 === 0) {
            // Premium Ocean-blue current particle
            ctx.fillStyle = `rgba(14, 165, 233, ${finalOpacity * 0.8})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 1.4, 0, Math.PI * 2);
            ctx.fill();
          } else if (idx % 3 === 1) {
            // Bright Sailing Gold dust sparkle
            ctx.fillStyle = `rgba(234, 179, 8, ${finalOpacity * 0.95})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.9, 0, Math.PI * 2);
            ctx.fill();
            
            // Halo glow
            ctx.strokeStyle = `rgba(217, 119, 6, ${finalOpacity * 0.25})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 2.8, 0, Math.PI * 2);
            ctx.stroke();
          } else {
            // Antique Bronze mapping node
            ctx.fillStyle = `rgba(180, 110, 48, ${finalOpacity * 0.75})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
        });

      } else if (activeSlide === 7) {
        // COLOSSAL MECHANICAL CLOCK TOWER (Industrial Revolution engine of progress)
        // Dark steel, brass, copper, glowing furnaces, interlocking gears, reciprocating pistons, steam plumes, and pressure gauges.

        const cx = contentCenterX;
        const cy = height * 0.46 + Math.sin(tick * 0.018) * 85 * 0.1; // Gentle swaying gravity float

        // 1. Molten Furnace Firebox Glow (representing coal/fire power behind the mechanism)
        const furnaceFlicker = Math.sin(tick * 0.14) * 18 + Math.cos(tick * 0.08) * 12;
        const furnaceRadius = 140 + furnaceFlicker;
        const fireboxGlow = ctx.createRadialGradient(cx, cy + 180, 10, cx, cy + 180, furnaceRadius);
        fireboxGlow.addColorStop(0, 'rgba(249, 115, 22, 0.35)'); // Bright glowing molten orange
        fireboxGlow.addColorStop(0.4, 'rgba(239, 68, 68, 0.18)'); // Smoldering crimson aura
        fireboxGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = fireboxGlow;
        ctx.fillRect(cx - 300, cy - 100, 600, 480);

        // 2. Blueprint / Engineering Grid Underlay (Faint drafting circles & technical coordinate grids)
        ctx.strokeStyle = 'rgba(217, 119, 6, 0.085)'; // Antique brass drafting ink
        ctx.lineWidth = 0.8;
        
        // Circular grid lines concentric from clock face center
        for (let gridR = 100; gridR <= 350; gridR += 120) {
          ctx.beginPath();
          ctx.arc(cx, cy, gridR, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Crosshairs & diagonal radial drafting angles
        ctx.beginPath();
        ctx.moveTo(cx - 400, cy); ctx.lineTo(cx + 400, cy);
        ctx.moveTo(cx, cy - 350); ctx.lineTo(cx, cy + 350);
        ctx.stroke();

        // 3. Heavy Iron Support Truss Structures (Vertical industrial arches framing the background)
        ctx.fillStyle = 'rgba(15, 23, 42, 0.48)'; // Deep coal colored girder silhouettes
        ctx.strokeStyle = 'rgba(71, 85, 105, 0.28)';
        ctx.lineWidth = 1.6;

        // Left Truss Tower Column
        ctx.beginPath();
        ctx.rect(cx - 240, cy - 260, 32, height);
        ctx.fill();
        ctx.stroke();

        // Left Truss internal cross-braces (X pattern)
        ctx.beginPath();
        for (let braceY = cy - 250; braceY < height; braceY += 70) {
          ctx.moveTo(cx - 240, braceY);
          ctx.lineTo(cx - 208, braceY + 60);
          ctx.moveTo(cx - 208, braceY);
          ctx.lineTo(cx - 240, braceY + 60);
          // Rivets
          ctx.arc(cx - 224, braceY + 30, 2, 0, Math.PI * 2);
        }
        ctx.stroke();

        // Right Truss Tower Column
        ctx.beginPath();
        ctx.rect(cx + 208, cy - 260, 32, height);
        ctx.fill();
        ctx.stroke();

        // Right Truss internal cross-braces (X pattern)
        ctx.beginPath();
        for (let braceY = cy - 250; braceY < height; braceY += 70) {
          ctx.moveTo(cx + 208, braceY);
          ctx.lineTo(cx + 240, braceY + 60);
          ctx.moveTo(cx + 240, braceY);
          ctx.lineTo(cx + 208, braceY + 60);
        }
        ctx.stroke();

        // 4. CHIMNEYS & PERIODIC EXHAUST STEAM PLUMES (Venting industrial steam pressure)
        // Left Steam Chimney Vent
        ctx.fillStyle = 'rgba(30, 41, 59, 0.55)';
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
        ctx.beginPath();
        ctx.rect(cx - 190, cy - 250, 18, 90);
        ctx.fill();
        ctx.stroke();
        
        // Copper band on chimney
        ctx.fillStyle = 'rgba(180, 110, 48, 0.45)';
        ctx.fillRect(cx - 192, cy - 230, 22, 6);

        // Right Steam Chimney Vent
        ctx.fillStyle = 'rgba(30, 41, 59, 0.55)';
        ctx.beginPath();
        ctx.rect(cx + 172, cy - 280, 20, 120);
        ctx.fill();
        ctx.stroke();
        
        // Copper band on right chimney
        ctx.fillStyle = 'rgba(180, 110, 48, 0.45)';
        ctx.fillRect(cx + 170, cy - 250, 24, 7);

        // Steam plume calculations based on pressure release times
        // A cyclic puff that occurs every few seconds
        const puffCycle = (tick * 0.015) % Math.PI;
        const scaleSteam = Math.max(0, Math.sin(puffCycle) - 0.25) * 1.33; // Fire venting phase
        
        if (scaleSteam > 0) {
          ctx.save();
          // Draw three expanding white-grey volumetric steam clouds rolling out of chimneys
          ctx.fillStyle = 'rgba(226, 232, 240, 0.08)'; // Steam mist
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
          
          for (let pIdx = 0; pIdx < 4; pIdx++) {
            const plumeXOffset = Math.sin(tick * 0.08 + pIdx) * 12;
            const puffDisp = pIdx * 25 * scaleSteam;
            
            // Left Plume billowing upwards
            ctx.beginPath();
            ctx.arc(cx - 181 + plumeXOffset, cy - 255 - puffDisp, (18 + pIdx * 12) * scaleSteam, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Right Plume billowing upwards
            ctx.beginPath();
            ctx.arc(cx + 182 + plumeXOffset * 0.8, cy - 285 - puffDisp, (20 + pIdx * 14) * scaleSteam, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          }
          ctx.restore();
        }

        // 5. HELPER FUNCTION TO DRAW DETAILED RETRO-INDUSTRIAL GEARS
        const drawEngineGear = (
          gX: number,
          gY: number,
          innerRadius: number,
          outerRadius: number,
          teethCount: number,
          cRotation: number,
          baseColor: string,
          highlightColor: string,
          hasBevelLines = true
        ) => {
          ctx.save();
          ctx.translate(gX, gY);
          ctx.rotate(cRotation);

          ctx.fillStyle = baseColor;
          ctx.strokeStyle = highlightColor;
          ctx.lineWidth = 1.5;

          // Outermost gear profile drawing (teeth notches)
          ctx.beginPath();
          for (let tc = 0; tc < teethCount; tc++) {
            const angle = (tc * Math.PI * 2) / teethCount;
            const step_div = Math.PI / teethCount;

            const tStartX = Math.cos(angle - step_div * 0.35) * innerRadius;
            const tStartY = Math.sin(angle - step_div * 0.35) * innerRadius;

            const tTip1X = Math.cos(angle - step_div * 0.2) * outerRadius;
            const tTip1Y = Math.sin(angle - step_div * 0.2) * outerRadius;

            const tTip2X = Math.cos(angle + step_div * 0.2) * outerRadius;
            const tTip2Y = Math.sin(angle + step_div * 0.2) * outerRadius;

            const tEndX = Math.cos(angle + step_div * 0.35) * innerRadius;
            const tEndY = Math.sin(angle + step_div * 0.35) * innerRadius;

            const wellEndX = Math.cos(angle + step_div) * innerRadius;
            const wellEndY = Math.sin(angle + step_div) * innerRadius;

            if (tc === 0) ctx.moveTo(tStartX, tStartY);
            else ctx.lineTo(tStartX, tStartY);

            ctx.lineTo(tTip1X, tTip1Y);
            ctx.lineTo(tTip2X, tTip2Y);
            ctx.lineTo(tEndX, tEndY);
            ctx.lineTo(wellEndX, wellEndY);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Bevel / Rim styling (Circular ridge cuts)
          if (hasBevelLines) {
            ctx.beginPath();
            ctx.arc(0, 0, innerRadius - 10, 0, Math.PI * 2);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(0, 0, innerRadius * 0.65, 0, Math.PI * 2);
            ctx.stroke();
          }

          // Gear spokes (Heavy industrial slots)
          ctx.lineWidth = 6;
          ctx.strokeStyle = highlightColor;
          const spokes = 6;
          for (let sp = 0; sp < spokes; sp++) {
            const spAngle = (sp * Math.PI * 2) / spokes;
            ctx.beginPath();
            ctx.moveTo(Math.cos(spAngle) * (innerRadius * 0.18), Math.sin(spAngle) * (innerRadius * 0.18));
            ctx.lineTo(Math.cos(spAngle) * (innerRadius - 12), Math.sin(spAngle) * (innerRadius - 12));
            ctx.stroke();
          }

          // Gear hub ring and center pin
          ctx.lineWidth = 1.5;
          ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
          ctx.beginPath();
          ctx.arc(0, 0, innerRadius * 0.22, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = 'rgba(180, 110, 48, 0.55)'; // brass center cap
          ctx.beginPath();
          ctx.arc(0, 0, 7, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        };

        // 6. DRAW INTERLOCKING GEAR DRIVE TRAIN
        // Gear A: Colossal deep background steel gear (slowly rotating clock driving engine)
        const gearA_Color = 'rgba(30, 41, 59, 0.38)'; // slate-dark iron
        const gearA_Highlight = 'rgba(71, 85, 105, 0.26)';
        drawEngineGear(cx - 120, cy - 80, 140, 165, 18, -tick * 0.005, gearA_Color, gearA_Highlight);

        // Gear B: Mid-size bright copper gear (top right interlocking Gear A)
        const gearB_Color = 'rgba(180, 110, 48, 0.18)'; // copper alloy
        const gearB_Highlight = 'rgba(180, 110, 48, 0.32)';
        drawEngineGear(cx + 90, cy - 130, 75, 90, 12, tick * 0.0075 + 0.3, gearB_Color, gearB_Highlight);

        // Gear C: Brass escape escapement wheel centered left
        const gearC_Color = 'rgba(217, 119, 6, 0.2)'; // warm golden brass
        const gearC_Highlight = 'rgba(234, 179, 8, 0.32)';
        drawEngineGear(cx - 150, cy + 90, 50, 62, 10, tick * 0.015, gearC_Color, gearC_Highlight);

        // Gear D: Small crankshaft driver behind steam piston (bottom left)
        const gearD_Color = 'rgba(51, 65, 85, 0.45)';
        const gearD_Highlight = 'rgba(148, 163, 184, 0.3)';
        drawEngineGear(cx - 140, cy + 210, 32, 42, 8, -tick * 0.022, gearD_Color, gearD_Highlight, false);

        // 7. STEAM PISTON RECIPROCATING MECHANISM (Crankshaft sliding piston rod)
        // Pivot point traveling around bottom gear D wheel
        const crankRadius = 18;
        const pivotAngle = -tick * 0.022;
        const pivotX = cx - 140 + Math.cos(pivotAngle) * crankRadius;
        const pivotY = cy + 210 + Math.sin(pivotAngle) * crankRadius;

        // Reciprocating slider head location (slides horizontally left/right in channel)
        const sliderY = cy + 295;
        const sliderX = cx - 210 + Math.sin(tick * 0.022) * 22; // Reciprocating path

        // Connecting Hinge Steel Rod
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.42)'; // Polished forged alloy
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(pivotX, pivotY);
        ctx.lineTo(sliderX, sliderY);
        ctx.stroke();

        // Pin joints at end of rod
        ctx.fillStyle = 'rgba(234, 179, 8, 0.6)'; // burnished gold cap
        ctx.beginPath();
        ctx.arc(pivotX, pivotY, 4, 0, Math.PI * 2);
        ctx.arc(sliderX, sliderY, 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Draws the industrial steel cylinder sleeve / slide-box housing
        ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.28)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.rect(cx - 245, cy + 288, 70, 14);
        ctx.fill();
        ctx.stroke();

        // 8. BRONZE PIPE METERS & PRESSURE GAUGES (Monitoring mechanical steam load)
        // Heavy copper connection pipe looping behind gears
        ctx.strokeStyle = 'rgba(180, 110, 48, 0.28)'; // cast copper pipe
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(cx - 220, cy + 302);
        ctx.lineTo(cx - 220, cy + 180);
        ctx.quadraticCurveTo(cx - 220, cy + 140, cx - 170, cy + 140);
        ctx.lineTo(cx + 110, cy + 140);
        ctx.stroke();

        // Shiny highlights on pipe center line
        ctx.strokeStyle = 'rgba(251, 146, 60, 0.18)'; 
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Pressure Gauge 1 (Large Gauge right side)
        const gaugeX = cx + 130;
        const gaugeY = cy + 40;
        const gaugeR = 25;
        
        ctx.fillStyle = 'rgba(30, 41, 59, 0.72)'; // Cast plate backer
        ctx.strokeStyle = 'rgba(180, 110, 48, 0.45)'; // bronze bezels
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.arc(gaugeX, gaugeY, gaugeR, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Clock graduation marks inside gauge
        ctx.strokeStyle = 'rgba(230, 225, 218, 0.18)';
        ctx.lineWidth = 1;
        for (let gT = 0; gT < 8; gT++) {
          const gAngle = Math.PI * 0.7 + (gT * Math.PI * 1.6) / 7;
          ctx.beginPath();
          ctx.moveTo(gaugeX + Math.cos(gAngle) * (gaugeR - 8), gaugeY + Math.sin(gAngle) * (gaugeR - 8));
          ctx.lineTo(gaugeX + Math.cos(gAngle) * (gaugeR - 2), gaugeY + Math.sin(gAngle) * (gaugeR - 2));
          ctx.stroke();
        }

        // Trembling steam pressure indicator needle
        const throttleNeedle = Math.PI * 0.75 + Math.abs(Math.sin(tick * 0.16) + Math.cos(tick * 0.28) * 0.25) * Math.PI * 1.1;
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.58)'; // scarlet pressure arrow
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(gaugeX, gaugeY);
        ctx.lineTo(gaugeX + Math.cos(throttleNeedle) * (gaugeR - 5), gaugeY + Math.sin(throttleNeedle) * (gaugeR - 5));
        ctx.stroke();

        // Center needle pin
        ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
        ctx.beginPath();
        ctx.arc(gaugeX, gaugeY, 3, 0, Math.PI * 2);
        ctx.fill();

        // 9. COLOSSAL GEOMETRIC CLOCK FACE DIAL
        const clockRadius = 135;
        const clockBezelGlow = ctx.createRadialGradient(cx, cy, clockRadius - 20, cx, cy, clockRadius + 12);
        clockBezelGlow.addColorStop(0, 'rgba(15, 23, 42, 0.33)'); // Smoky translucent dark backing
        clockBezelGlow.addColorStop(0.9, 'rgba(180, 110, 48, 0.1)'); // soft copper outline glow
        clockBezelGlow.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.fillStyle = clockBezelGlow;
        ctx.beginPath();
        ctx.arc(cx, cy, clockRadius + 12, 0, Math.PI * 2);
        ctx.fill();

        // Thick Outer Brass Track Rings
        ctx.strokeStyle = 'rgba(180, 110, 48, 0.38)'; // Old cast bronze
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.arc(cx, cy, clockRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Thin interior calibration track ring
        ctx.strokeStyle = 'rgba(217, 119, 6, 0.24)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, clockRadius - 10, 0, Math.PI * 2);
        ctx.stroke();

        // Inner frame track
        ctx.strokeStyle = 'rgba(180, 110, 48, 0.18)';
        ctx.beginPath();
        ctx.arc(cx, cy, clockRadius * 0.6, 0, Math.PI * 2);
        ctx.stroke();

        // Clock division hour wedge ticks
        ctx.strokeStyle = 'rgba(234, 179, 8, 0.38)'; // metallic clock marks
        for (let ch = 0; ch < 12; ch++) {
          const hAngle = (ch * Math.PI * 2) / 12 - Math.PI / 2;
          const isCardinal = ch % 3 === 0;
          const tLength = isCardinal ? 15 : 8;
          ctx.lineWidth = isCardinal ? 2.8 : 1.2;

          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(hAngle) * (clockRadius - tLength), cy + Math.sin(hAngle) * (clockRadius - tLength));
          ctx.lineTo(cx + Math.cos(hAngle) * (clockRadius - 2), cy + Math.sin(hAngle) * (clockRadius - 2));
          ctx.stroke();

          // Roman numerals etched for cardinal ticks (XII, III, VI, IX)
          if (isCardinal) {
            const romLabels = ['XII', 'III', 'VI', 'IX'];
            const rX = cx + Math.cos(hAngle) * (clockRadius - 28);
            const rY = cy + Math.sin(hAngle) * (clockRadius - 28);
            
            ctx.fillStyle = 'rgba(230, 225, 218, 0.35)'; // Faint gothic text
            ctx.font = 'bold 10px serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(romLabels[ch / 3], rX, rY);
          }
        }

        // 10. GRACEFUL SLOW-MOVING MECHANICAL HANDS
        // Ultra-slow rotation rates representing relentless acceleration of historical eras
        const hourRotation = tick * 0.0012 - Math.PI / 2;
        const minuteRotation = tick * 0.014 - Math.PI / 2;

        // Draw Hour Hand (Shorter, highly detailed spade/iron shape)
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(hourRotation);
        
        // Spear shaft base
        ctx.strokeStyle = 'rgba(120, 113, 108, 0.44)'; // Dark grey steel
        ctx.fillStyle = 'rgba(180, 110, 48, 0.35)';   // Bronze core highlights
        ctx.lineWidth = 2.8;
        ctx.beginPath();
        ctx.moveTo(0, 15); // counterweight tail
        ctx.lineTo(0, -clockRadius * 0.52);
        ctx.stroke();

        // Spear spade crest
        ctx.beginPath();
        const spearH = -clockRadius * 0.52;
        ctx.moveTo(-10, spearH);
        ctx.quadraticCurveTo(0, spearH - 18, 0, spearH - 24);
        ctx.quadraticCurveTo(0, spearH - 18, 10, spearH);
        ctx.lineTo(0, spearH + 8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.restore();

        // Draw Minute Hand (Longer, slender Lance shape)
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(minuteRotation);

        ctx.strokeStyle = 'rgba(180, 110, 48, 0.45)'; // copper lance line
        ctx.fillStyle = 'rgba(15, 23, 42, 0.52)';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(0, 20); // Longer tail
        ctx.lineTo(0, -clockRadius * 0.8);
        ctx.stroke();

        // Minute pointer tip leaf
        ctx.beginPath();
        const tipH = -clockRadius * 0.8;
        ctx.moveTo(-6, tipH + 10);
        ctx.lineTo(0, tipH - 14);
        ctx.lineTo(6, tipH + 10);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.restore();

        // Heavy central clock rivet hub
        ctx.strokeStyle = 'rgba(180, 110, 48, 0.55)';
        ctx.fillStyle = 'rgba(30, 41, 59, 0.8)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(cx, cy, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Central brass core pin
        ctx.fillStyle = 'rgba(234, 179, 8, 0.65)';
        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fill();

        // 11. INDUSTRIAL SPARKS & ASH ATMOSPHERICS
        particles.forEach((p, idx) => {
          if (idx % 2 === 0) {
            // FLAMING CORUSCATING COAL SPARKS (Sparks shooting upwards out of the furnace core)
            p.y -= Math.abs(p.vy) * 0.8 + 1.1; // rapid float up
            p.x += Math.sin(tick * 0.02 + idx) * 0.5;

            // boundary wrap around
            if (p.y < -10) {
              p.y = height + 10;
              p.x = Math.random() * width;
            }

            // Draw glowing orange spark core
            ctx.fillStyle = `rgba(249, 115, 22, ${p.alpha * 0.75})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
            ctx.fill();

            // Inner hot white core
            ctx.fillStyle = `rgba(254, 243, 199, ${p.alpha * 0.9})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // FLOATING GREY SMOKE AND ENGINE ASH PARTICLES (Drifting downward & sideways)
            p.y += Math.abs(p.vy) * 0.35 + 0.3;
            p.x += Math.cos(tick * 0.015 + idx) * 0.65;

            if (p.y > height + 10) {
              p.y = -10;
              p.x = Math.random() * width;
            }

            // Dark graphite ash circle
            ctx.fillStyle = `rgba(100, 116, 139, ${p.alpha * 0.45})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 1.25, 0, Math.PI * 2);
            ctx.fill();
          }
        });

      } else if (activeSlide === 8) {
        // MASSIVE AI-powered neural network surrounding a digital Earth
        // Digital Earth sphere, latitude/longitude wireframes, city beacon pulses, information Highways, orbiting satellites, holographic coordinate rings, pulsing data packets, and dynamic cybernetic nodes.

        const cx = contentCenterX;
        const cy = height * 0.48 + Math.sin(tick * 0.012) * 12; // Gentle hover swell

        // 1. Digital Cyber Atmosphere Glow (Deep space holographic blue)
        const outerSpaceGlow = ctx.createRadialGradient(cx, cy, 50, cx, cy, 380);
        outerSpaceGlow.addColorStop(0, 'rgba(6, 182, 212, 0.09)'); // Cyan neural core
        outerSpaceGlow.addColorStop(0.5, 'rgba(99, 102, 241, 0.04)'); // Indigo matrix blend
        outerSpaceGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = outerSpaceGlow;
        ctx.fillRect(0, 0, width, height);

        // 2. Holographic Digital Earth (Rotating sphere grid & atmosphere envelope)
        const earthRadius = 145;
        
        // Atmosphere sheath ring
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.28)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, earthRadius + 8, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.arc(cx, cy, earthRadius + 16, 0, Math.PI * 2);
        ctx.stroke();

        // Rotating Earth Coordinate Grid (Wireframe Grid lines)
        const earthRotation = tick * 0.007;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(earthRotation);

        // Latitude lines (Horizontal ellipses inside sphere boundary)
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.12)';
        ctx.lineWidth = 1;
        const latSlices = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
        latSlices.forEach((slice) => {
          const sliceY = (slice * earthRadius) / 5;
          const sliceW = Math.sqrt(earthRadius * earthRadius - sliceY * sliceY);
          
          ctx.beginPath();
          ctx.ellipse(0, sliceY, sliceW, sliceW * 0.3, 0, 0, Math.PI * 2);
          ctx.stroke();
        });

        // Longitude lines (Vertical ellipses representing globe curves)
        for (let l = 0; l < 6; l++) {
          const lAngle = (l * Math.PI) / 6;
          ctx.beginPath();
          ctx.ellipse(0, 0, earthRadius, earthRadius * 0.35, lAngle, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Global City Beacons / Synthesized landmass point arrays
        // Static array of relative land coordinates on the rotating sphere
        const cityAnchors = [
          { name: 'HUB_TOKYO', lat: -25, lon: 42, color: 'rgba(234, 179, 8,' },
          { name: 'HUB_LONDON', lat: 35, lon: -12, color: 'rgba(6, 182, 212,' },
          { name: 'HUB_NY', lat: 15, lon: -80, color: 'rgba(168, 85, 247,' },
          { name: 'HUB_SYDNEY', lat: -65, lon: 75, color: 'rgba(16, 185, 129,' },
          { name: 'HUB_SF', lat: 20, lon: -120, color: 'rgba(239, 68, 68,' },
          { name: 'HUB_PARIS', lat: 40, lon: 5, color: 'rgba(6, 182, 212,' }
        ];

        cityAnchors.forEach((city) => {
          // Continuous 3D vector calculations for rotating land dots
          const rLat = (city.lat * Math.PI) / 180;
          const rLon = (city.lon * Math.PI) / 180 + tick * 0.007; // Coupled to rotation

          // Spherical projections
          const x3d = earthRadius * Math.cos(rLat) * Math.sin(rLon);
          const y3d = earthRadius * Math.sin(rLat);
          const z3d = earthRadius * Math.cos(rLat) * Math.cos(rLon);

          // Only draw points if they are on the front hemisphere relative to viewer (z3d > 0)
          if (z3d > 0) {
            const pulseRate = 0.5 + Math.sin(tick * 0.12 + city.lat) * 0.5;

            // Beacon core
            ctx.fillStyle = `${city.color}${0.5 + pulseRate * 0.4})`;
            ctx.beginPath();
            ctx.arc(x3d, y3d, 4, 0, Math.PI * 2);
            ctx.fill();

            // Broad signal ring expander
            ctx.strokeStyle = `${city.color}${0.35 - pulseRate * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(x3d, y3d, 4 + pulseRate * 12, 0, Math.PI * 2);
            ctx.stroke();

            // Terminal typography label tag
            ctx.fillStyle = 'rgba(230, 225, 218, 0.4)';
            ctx.font = '500 8px monospace';
            ctx.fillText(city.name, x3d + 6, y3d + 3);
          }
        });

        ctx.restore(); // end rotating globe coordinate system

        // 3. Satellites and Orbital rings (Encircling global telemetry loops)
        const satOrbits = [220, 290];
        satOrbits.forEach((orbRadius, oIdx) => {
          // Orbit Ring paths
          ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.ellipse(cx, cy, orbRadius, orbRadius * 0.45, (oIdx === 0 ? Math.PI / 12 : -Math.PI / 10), 0, Math.PI * 2);
          ctx.stroke();

          // Satellite Node tracking coordinates
          const sAngle = tick * (0.008 - oIdx * 0.003) + oIdx * 2.2;
          const satTilt = (oIdx === 0 ? Math.PI / 12 : -Math.PI / 10);
          
          // Orbital coordinates
          const sCos = Math.cos(sAngle) * orbRadius;
          const sSin = Math.sin(sAngle) * orbRadius * 0.45;

          // Projected orbital positions on rotated plane
          const sX = cx + sCos * Math.cos(satTilt) - sSin * Math.sin(satTilt);
          const sY = cy + sCos * Math.sin(satTilt) + sSin * Math.cos(satTilt);

          // Draw Satellites (Tiny structural vectors)
          ctx.strokeStyle = 'rgba(6, 182, 212, 0.42)';
          ctx.fillStyle = 'rgba(30, 41, 59, 0.8)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.rect(sX - 5, sY - 4, 10, 8);
          ctx.fill();
          ctx.stroke();

          // Solar panel grid vanes
          ctx.strokeStyle = 'rgba(14, 165, 233, 0.45)';
          ctx.beginPath();
          ctx.moveTo(sX - 14, sY); ctx.lineTo(sX - 5, sY);
          ctx.moveTo(sX + 5, sY); ctx.lineTo(sX + 14, sY);
          ctx.stroke();

          // Telemetry coordinate label
          ctx.fillStyle = 'rgba(6, 182, 212, 0.45)';
          ctx.font = '6px monospace';
          ctx.fillText(`SAT_LINK_0${oIdx + 1}`, sX - 18, sY - 8);

          // Glowing laser telemetry link down to Earth core
          ctx.strokeStyle = 'rgba(6, 182, 212, 0.06)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(sX, sY);
          ctx.lineTo(cx, cy);
          ctx.stroke();
        });

        // 4. Dynamic AI-Powered Neural Core Web (Proximity mesh routing data)
        particles.forEach((p) => {
          // Standard neural particles drift
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Shimmer cyber visibility
          const neuralGlow = 0.4 + Math.sin(tick * 0.035 + p.x) * 0.55;

          // Drawing neural synaptic node
          ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha * neuralGlow * 1.5})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.35, 0, Math.PI * 2);
          ctx.fill();

          // Spark accent halo
          ctx.strokeStyle = `rgba(99, 102, 241, ${p.alpha * neuralGlow * 0.45})`;
          ctx.lineWidth = 0.58;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.8, 0, Math.PI * 2);
          ctx.stroke();
        });

        // 5. SYNAPSE CONNECTIONS & PULSING INFORMATION STREAMS
        // Build mesh connections with active travelling data packet bullets
        ctx.lineWidth = 0.8;
        for (let i = 0; i < particles.length; i++) {
          const maxConnections = 3;
          let currentConnections = 0;

          for (let k = i + 1; k < particles.length; k++) {
            if (currentConnections >= maxConnections) break;

            const dx = particles[i].x - particles[k].x;
            const dy = particles[i].y - particles[k].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Close proximity threshold triggers synapse path
            if (dist < 118) {
              const synapseStrength = (1.0 - (dist / 118)) * 0.28;
              
              ctx.strokeStyle = `rgba(6, 182, 212, ${synapseStrength})`;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[k].x, particles[k].y);
              ctx.stroke();

              currentConnections++;

              // Pulsing data packet travelling along the active neural route
              // Formula calculates continuous travel between node i and k
              const tData = (tick * 0.012 + i * 0.1) % 1.0;
              const packetX = particles[i].x + dx * -tData;
              const packetY = particles[i].y + dy * -tData;

              // Golden sparking intelligence packet
              ctx.fillStyle = `rgba(234, 179, 8, ${synapseStrength * 3.5})`;
              ctx.beginPath();
              ctx.arc(packetX, packetY, 1.8, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }

        // 6. Cybernetic labels / Binary Telemetry Floating stream (representing code logs of the AI)
        ctx.fillStyle = 'rgba(6, 185, 129, 0.18)'; // Green terminal matrix coloring
        ctx.font = '5px monospace';
        const numBlocks = 6;
        for (let b = 0; b < numBlocks; b++) {
          const streamX = width * 0.08 + (b * width * 0.18);
          // falling y speed coupled to tick modulo height
          const streamY = (tick * (0.8 + b * 0.15) + b * 150) % height;
          
          const binaryChar1 = Math.round(Math.abs(Math.sin(tick * 0.1 + b))) ? '1' : '0';
          const binaryChar2 = Math.round(Math.abs(Math.cos(tick * 0.08 + b))) ? '0' : '1';
          
          ctx.fillText(`AI_STREAM [${binaryChar1}${binaryChar2}]`, streamX, streamY);
          ctx.fillText(`SYS_SYNAPSE_OK`, streamX, streamY + 12);
        }

      } else if (activeSlide === 9) {
        // GIGANTIC FUTURISTIC DYSON SPHERE orbiting a glowing energy star
        // Central star, latitude/longitude shell meshes, rotating holographic power tracks, orbiting collector stations, interplanetary routing networks, solar panels, and glowing core exhaust.

        const cx = contentCenterX;
        const cy = height * 0.48 + Math.sin(tick * 0.01) * 10; // Gentle space levitation

        // 1. Deep Space Cosmic Background Dust Glow
        const backgroundCosmic = ctx.createRadialGradient(cx, cy, 10, cx, cy, 420);
        backgroundCosmic.addColorStop(0, 'rgba(124, 58, 237, 0.075)'); // Deep purple energy shield
        backgroundCosmic.addColorStop(0.5, 'rgba(6, 182, 212, 0.025)'); // Cyber cyan edge
        backgroundCosmic.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = backgroundCosmic;
        ctx.fillRect(0, 0, width, height);

        // 2. Central Stellar Dynamo (Power Core Star)
        // Pulsing and flares
        const flarePulsation = Math.sin(tick * 0.04) * 4 + Math.cos(tick * 0.02) * 2;
        const starR = 42 + flarePulsation;
        
        ctx.save();
        ctx.shadowBlur = 40;
        ctx.shadowColor = 'rgba(251, 146, 60, 0.45)'; // Amber coronal radiance
        
        const coreGradient = ctx.createRadialGradient(cx, cy, 2, cx, cy, starR);
        coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)'); // Hot star core white
        coreGradient.addColorStop(0.2, 'rgba(254, 215, 170, 0.65)'); // Hot yellow envelope
        coreGradient.addColorStop(0.5, 'rgba(249, 115, 22, 0.35)'); // Outer orange chromosphere
        coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(cx, cy, starR, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Magnetic loops (solar flares looping off the star's surface)
        ctx.strokeStyle = 'rgba(249, 115, 22, 0.22)';
        ctx.lineWidth = 1.5;
        const maxFlares = 3;
        for (let f = 0; f < maxFlares; f++) {
          const fAngle = (f * Math.PI * 2) / maxFlares + tick * 0.005;
          const cosFA = Math.cos(fAngle);
          const sinFA = Math.sin(fAngle);
          
          const loopStartX = cx + cosFA * starR;
          const loopStartY = cy + sinFA * starR;
          const loopEndX = cx + Math.cos(fAngle + 0.4) * starR;
          const loopEndY = cy + Math.sin(fAngle + 0.4) * starR;
          
          const midX = cx + Math.cos(fAngle + 0.2) * (starR + 15 + Math.sin(tick * 0.08) * 5);
          const midY = cy + Math.sin(fAngle + 0.2) * (starR + 15 + Math.sin(tick * 0.08) * 5);
          
          ctx.beginPath();
          ctx.moveTo(loopStartX, loopStartY);
          ctx.quadraticCurveTo(midX, midY, loopEndX, loopEndY);
          ctx.stroke();
        }

        // 3. Dyson Sphere Shield Segments (Segmented physical grid wrapping the star)
        const dOuterR = 85;
        const dInnerR = 72;

        ctx.strokeStyle = 'rgba(6, 182, 212, 0.18)'; // Nanomaterial steel
        ctx.lineWidth = 1.2;
        
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(tick * 0.004); // Relentless orbital rotation

        // Draw segmented circular arcs (outer shielding cage)
        const totalShieldPanels = 12;
        for (let pIdx = 0; pIdx < totalShieldPanels; pIdx++) {
          const startAngle = (pIdx * Math.PI * 2) / totalShieldPanels;
          const endAngle = startAngle + (Math.PI * 2) / totalShieldPanels * 0.65; // gap in between panels
          
          // Draw outer concentric shield segment
          ctx.beginPath();
          ctx.arc(0, 0, dOuterR, startAngle, endAngle);
          ctx.stroke();

          // Connective radial spokes to inner ring
          const midArcAngle = startAngle + (Math.PI * 2) / totalShieldPanels * 0.325;
          ctx.beginPath();
          ctx.moveTo(Math.cos(midArcAngle) * dInnerR, Math.sin(midArcAngle) * dInnerR);
          ctx.lineTo(Math.cos(midArcAngle) * dOuterR, Math.sin(midArcAngle) * dOuterR);
          ctx.stroke();
        }

        // Inner cage ring
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.12)';
        ctx.beginPath();
        ctx.arc(0, 0, dInnerR, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();

        // 4. Rotating Holographic Collector Rings (Large orbits containing instrumentation & telemetry)
        const holoOrbits = [
          { r: 140, rot: -tick * 0.006, color: 'rgba(6, 182, 212,', tilt: Math.PI / 8 },
          { r: 210, rot: tick * 0.0028, color: 'rgba(99, 102, 241,', tilt: -Math.PI / 14 },
          { r: 280, rot: -tick * 0.0015, color: 'rgba(168, 85, 247,', tilt: Math.PI / 6 }
        ];

        holoOrbits.forEach((orb) => {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(orb.tilt);

          // Draw the orbit ellipse track itself
          ctx.strokeStyle = `${orb.color}0.085)`;
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          ctx.ellipse(0, 0, orb.r, orb.r * 0.4, 0, 0, Math.PI * 2);
          ctx.stroke();

          // Holographic Tick Marks along the orbit rings
          ctx.strokeStyle = `${orb.color}0.18)`;
          ctx.lineWidth = 0.8;
          const ticksOnRing = 20;
          for (let tk = 0; tk < ticksOnRing; tk++) {
            const tkAngle = (tk * Math.PI * 2) / ticksOnRing + orb.rot;
            const tCos = Math.cos(tkAngle);
            const tSin = Math.sin(tkAngle);
            
            const startX = tCos * orb.r;
            const startY = tSin * orb.r * 0.4;
            const endX = tCos * (orb.r + 5);
            const endY = tSin * (orb.r + 5) * 0.4;

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
          }

          // Orbit stations / collector pods crawling along the track
          const podAngles = [tick * 0.003, tick * 0.003 + Math.PI, tick * 0.003 * -0.5 + 1];
          podAngles.forEach((pAngle, podIdx) => {
            const pX = Math.cos(pAngle) * orb.r;
            const pY = Math.sin(pAngle) * orb.r * 0.4;

            // Draw glowing orbital mega collector structures
            ctx.fillStyle = 'rgba(15, 23, 42, 0.72)';
            ctx.strokeStyle = `${orb.color}0.45)`;
            ctx.lineWidth = 1.25;

            ctx.beginPath();
            ctx.rect(pX - 6, pY - 5, 12, 10);
            ctx.fill();
            ctx.stroke();

            // Tiny solar collector wings attached to pods
            ctx.strokeStyle = `${orb.color}0.38)`;
            ctx.beginPath();
            ctx.moveTo(pX - 15, pY); ctx.lineTo(pX - 6, pY);
            ctx.moveTo(pX + 6, pY); ctx.lineTo(pX + 15, pY);
            ctx.stroke();

            // Energy beam laser down to the core
            ctx.strokeStyle = `${orb.color}0.04)`;
            ctx.beginPath();
            ctx.moveTo(pX, pY);
            ctx.lineTo(0, 0);
            ctx.stroke();

            // Floating Node identifier labels (holographic text)
            if (podIdx === 0) {
              ctx.fillStyle = `${orb.color}0.42)`;
              ctx.font = '500 6.5px monospace';
              ctx.fillText(`COLLECTOR_0${orb.r}_A`, pX - 25, pY - 9);
            }
          });

          ctx.restore();
        });

        // 5. Interplanetary mesh network & energy pulse lines
        particles.forEach((p) => {
          p.x += p.vx * 0.6;
          p.y += p.vy * 0.6;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Pulse glowing node states
          const flareFactor = 0.5 + Math.sin(tick * 0.03 + p.x) * 0.5;

          // Drawing solar harvesting nodes
          ctx.fillStyle = `${p.color || "rgba(14, 165, 233,"}${p.alpha * flareFactor * 1.2})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.1, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = `rgba(168, 85, 247, ${p.alpha * flareFactor * 0.35})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.stroke();
        });

        // Connecting energetic grid beams with floating data bullets
        for (let i = 0; i < particles.length; i++) {
          const maxConnections = 2;
          let currentConnections = 0;
          
          for (let k = i + 1; k < particles.length; k++) {
            if (currentConnections >= maxConnections) break;

            const dx = particles[i].x - particles[k].x;
            const dy = particles[i].y - particles[k].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 125) {
              const energyGridStrength = (1.0 - (dist / 125)) * 0.16;
              ctx.strokeStyle = `rgba(14, 165, 233, ${energyGridStrength})`;
              ctx.lineWidth = 0.7;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[k].x, particles[k].y);
              ctx.stroke();

              currentConnections++;

              // Glowing plasma wave packet moving along the grid lines
              const tTravel = (tick * 0.015 + i * 0.15) % 1.0;
              const pkgX = particles[i].x + dx * -tTravel;
              const pkgY = particles[i].y + dy * -tTravel;

              ctx.fillStyle = `rgba(249, 115, 22, ${energyGridStrength * 3.5})`;
              ctx.beginPath();
              ctx.arc(pkgX, pkgY, 2.0, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }

        // 6. Cybernetic overlay indicators (Holo metrics)
        ctx.fillStyle = 'rgba(6, 182, 212, 0.28)';
        ctx.font = '500 7px monospace';
        ctx.fillText(`REACTOR_CORE_TEMPERATURE: 4.8E7 K`, width * 0.05, height * 0.88);
        ctx.fillText(`DYSON_GRID_EFFICIENCY: 94.21%`, width * 0.05, height * 0.91);
        ctx.fillText(`HARVEST_ACTIVE: NODE_ARRAY_308`, width * 0.05, height * 0.94);

      } else {
        // SLIDE 10: BREATHTAKING DNA HELIX IN AN INFINITY LOOP
        // Merging biology and historical timestamps, symbolizing the complete journey of human existence and progress.
        // Opacity 40% (as requested, all visual elements rendered with translucent premium glowing colors)

        const cx = contentCenterX;
        const cy = height * 0.44; // Placed slightly higher to avoid overlapping core comparison dashboard text
        
        const A = Math.min(contentWidth * 0.30, 420); // Scale of Lemniscate of Bernoulli
        const DNA_Radius = 18 + A * 0.02; // Twist width of helix
        const twists = 8.5; // Number of twists around the loop

        // 1. Cosmic Amethyst Nebula Glow behind the Helix
        const nebulaOuter = ctx.createRadialGradient(cx, cy, 20, cx, cy, 400);
        nebulaOuter.addColorStop(0, 'rgba(124, 58, 237, 0.08)'); // Deep spiritual violet
        nebulaOuter.addColorStop(0.5, 'rgba(236, 72, 153, 0.025)'); // Interspersed hot pink
        nebulaOuter.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = nebulaOuter;
        ctx.fillRect(0, 0, width, height);

        // Faint coordinate background alignment circles
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(cx, cy, A * 0.85, 0, Math.PI * 2);
        ctx.stroke();

        // 2. Timeline Milestones data definition
        const milestones = [
          { t: 0.08, label: "Age of Giants", tag: "230M BCE", color: "rgba(16, 185, 129," }, // Emerald green
          { t: 0.22, label: "First Cities", tag: "10K BCE", color: "rgba(234, 179, 8," }, // Saffron yellow
          { t: 0.36, label: "Ancient India Cradle", tag: "3300 BCE", color: "rgba(249, 115, 22," }, // Saffron orange
          { t: 0.48, label: "Rise of Empires", tag: "500 BCE", color: "rgba(239, 68, 68," }, // Roman crimson
          { t: 0.60, label: "Age of Kingdoms", tag: "500 CE", color: "rgba(56, 189, 248," }, // Cobalt sky-blue
          { t: 0.72, label: "Exploring Unknowns", tag: "1500 CE", color: "rgba(20, 184, 166," }, // Teal voyage
          { t: 0.84, label: "Industrial Engines", tag: "1760 CE", color: "rgba(168, 85, 247," }, // Purple Watt
          { t: 0.94, label: "Connected Silicon Era", tag: "Present", color: "rgba(99, 102, 241," } // Neural Indigo
        ];

        // 3. Helper color mapping based on location along loop
        const getMilestoneColor = (pt: number, alpha = 1.0) => {
          let normT = pt % (Math.PI * 2);
          if (normT < 0) normT += Math.PI * 2;
          
          let closestMilestone = milestones[0];
          let minDiff = Math.PI * 2;
          
          for (const m of milestones) {
            const mRad = m.t * Math.PI * 2;
            let diff = Math.abs(normT - mRad);
            if (diff > Math.PI) diff = Math.PI * 2 - diff;
            if (diff < minDiff) {
              minDiff = diff;
              closestMilestone = m;
            }
          }
          return `${closestMilestone.color}${alpha})`;
        };

        // 4. Sample and build the 3D Coordinates geometry
        interface HelixPoint {
          xA: number; yA: number; zA: number;
          xB: number; yB: number; zB: number;
          xMid: number; yMid: number;
          t: number;
        }

        const helixPoints: HelixPoint[] = [];
        const steps = 140;

        for (let i = 0; i < steps; i++) {
          const t = (i / steps) * Math.PI * 2;
          
          // Lemniscate of Bernoulli formulation
          const s2 = Math.sin(t) * Math.sin(t);
          const xm = (A * Math.cos(t)) / (1 + s2);
          const ym = (A * Math.sin(t) * Math.cos(t)) / (1 + s2);
          
          // Tangent & Perp Normal vector calculations (using infinite small step delta)
          const t2 = t + 0.005;
          const s2_2 = Math.sin(t2) * Math.sin(t2);
          const xm2 = (A * Math.cos(t2)) / (1 + s2_2);
          const ym2 = (A * Math.sin(t2) * Math.cos(t2)) / (1 + s2_2);
          
          const dx = xm2 - xm;
          const dy = ym2 - ym;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const nx = -dy / len;
          const ny = dx / len;
          
          // DNA twist rotation angle around mid axis
          const theta = t * twists - tick * 1.6;
          
          const xA = cx + xm + nx * DNA_Radius * Math.cos(theta);
          const yA = cy + ym + ny * DNA_Radius * Math.cos(theta);
          const zA = DNA_Radius * Math.sin(theta);
          
          const xB = cx + xm - nx * DNA_Radius * Math.cos(theta);
          const yB = cy + ym - ny * DNA_Radius * Math.cos(theta);
          const zB = -DNA_Radius * Math.sin(theta);
          
          helixPoints.push({
            xA, yA, zA,
            xB, yB, zB,
            xMid: cx + xm,
            yMid: cy + ym,
            t
          });
        }

        // 5. Populate and build DrawBuffer to render things in depth-sorted order (back-to-front / negative Z to positive Z)
        interface DrawAction {
          depth: number;
          draw: () => void;
        }
        const drawBuffer: DrawAction[] = [];

        // Add Helix Backbone Connection Segments (Strand ribbon connectors)
        for (let i = 0; i < steps; i++) {
          const iNext = (i + 1) % steps;
          const p1 = helixPoints[i];
          const p2 = helixPoints[iNext];

          // Strand A wire segment
          const depthA = (p1.zA + p2.zA) / 2;
          const mColorA = getMilestoneColor(p1.t, 0.42); // 40% target opacity
          drawBuffer.push({
            depth: depthA,
            draw: () => {
              ctx.strokeStyle = mColorA;
              ctx.lineWidth = 1.8 + (depthA / DNA_Radius) * 0.8;
              ctx.beginPath();
              ctx.moveTo(p1.xA, p1.yA);
              ctx.lineTo(p2.xA, p2.yA);
              ctx.stroke();
            }
          });

          // Strand B wire segment
          const depthB = (p1.zB + p2.zB) / 2;
          const mColorB = getMilestoneColor(p1.t, 0.42);
          drawBuffer.push({
            depth: depthB,
            draw: () => {
              ctx.strokeStyle = mColorB;
              ctx.lineWidth = 1.8 + (depthB / DNA_Radius) * 0.8;
              ctx.beginPath();
              ctx.moveTo(p1.xB, p1.yB);
              ctx.lineTo(p2.xB, p2.yB);
              ctx.stroke();
            }
          });
        }

        // Add Helix Rungs (Base pairs linking the strands)
        // Draw a rung every 3 steps for optimal detail density
        for (let i = 0; i < steps; i += 3) {
          const p = helixPoints[i];
          const mColorRung = getMilestoneColor(p.t, 0.28);
          // Rung average depth is zero (balanced centerline)
          drawBuffer.push({
            depth: 0,
            draw: () => {
              ctx.strokeStyle = mColorRung;
              ctx.lineWidth = 1.0;
              ctx.beginPath();
              ctx.moveTo(p.xA, p.yA);
              ctx.lineTo(p.xB, p.yB);
              ctx.stroke();

              // Tiny nucleotide center junction cap
              const midX = (p.xA + p.xB) / 2;
              const midY = (p.yA + p.yB) / 2;
              ctx.fillStyle = getMilestoneColor(p.t, 0.35);
              ctx.beginPath();
              ctx.arc(midX, midY, 1.8, 0, Math.PI * 2);
              ctx.fill();
            }
          });
        }

        // Add Helix Synapse Nodes (Strand A and B joints)
        for (let i = 0; i < steps; i += 2) {
          const p = helixPoints[i];

          // Strand A Node
          const sizeA = 2.4 + (p.zA / DNA_Radius) * 1.0;
          const alphaA = 0.38 + (p.zA / DNA_Radius) * 0.22;
          const colorNodeA = getMilestoneColor(p.t, alphaA);
          drawBuffer.push({
            depth: p.zA,
            draw: () => {
              ctx.fillStyle = colorNodeA;
              ctx.beginPath();
              ctx.arc(p.xA, p.yA, sizeA, 0, Math.PI * 2);
              ctx.fill();
              
              if (p.zA > DNA_Radius * 0.5) { // Foreground highlight halo
                ctx.strokeStyle = getMilestoneColor(p.t, 0.22);
                ctx.lineWidth = 0.6;
                ctx.beginPath();
                ctx.arc(p.xA, p.yA, sizeA * 2.2, 0, Math.PI * 2);
                ctx.stroke();
              }
            }
          });

          // Strand B Node
          const sizeB = 2.4 + (p.zB / DNA_Radius) * 1.0;
          const alphaB = 0.38 + (p.zB / DNA_Radius) * 0.22;
          const colorNodeB = getMilestoneColor(p.t, alphaB);
          drawBuffer.push({
            depth: p.zB,
            draw: () => {
              ctx.fillStyle = colorNodeB;
              ctx.beginPath();
              ctx.arc(p.xB, p.yB, sizeB, 0, Math.PI * 2);
              ctx.fill();

              if (p.zB > DNA_Radius * 0.5) {
                ctx.strokeStyle = getMilestoneColor(p.t, 0.22);
                ctx.lineWidth = 0.6;
                ctx.beginPath();
                ctx.arc(p.xB, p.yB, sizeB * 2.2, 0, Math.PI * 2);
                ctx.stroke();
              }
            }
          });
        }

        // 6. Timeline Energy Flow Pulses (Dynamic flares traveling along the helix tracks)
        const totalPulses = 12;
        for (let j = 0; j < totalPulses; j++) {
          // Half pulses flow along Strand A, half along Strand B
          const direction = j % 2 === 0 ? 'A' : 'B';
          const progress = (tick * 0.12 + j * (1 / totalPulses)) % 1.0;
          
          const iFloat = progress * (steps - 1);
          const iBase = Math.floor(iFloat);
          const iNext = (iBase + 1) % steps;
          const frac = iFloat - iBase;

          const p1 = helixPoints[iBase];
          const p2 = helixPoints[iNext];

          let pX = 0, pY = 0, pZ = 0;
          if (direction === 'A') {
            pX = p1.xA * (1 - frac) + p2.xA * frac;
            pY = p1.yA * (1 - frac) + p2.yA * frac;
            pZ = p1.zA * (1 - frac) + p2.zA * frac;
          } else {
            pX = p1.xB * (1 - frac) + p2.xB * frac;
            pY = p1.yB * (1 - frac) + p2.yB * frac;
            pZ = p1.zB * (1 - frac) + p2.zB * frac;
          }

          const pulseColor = getMilestoneColor(p1.t, 0.72);
          const coreColor = 'rgba(255, 255, 255, 0.9)';

          drawBuffer.push({
            depth: pZ,
            draw: () => {
              // Outer energy glow halo
              ctx.fillStyle = pulseColor;
              ctx.shadowBlur = 12;
              ctx.shadowColor = pulseColor;
              ctx.beginPath();
              ctx.arc(pX, pY, 5, 0, Math.PI * 2);
              ctx.fill();

              // Central hot white kinetic energy core
              ctx.fillStyle = coreColor;
              ctx.shadowBlur = 0;
              ctx.beginPath();
              ctx.arc(pX, pY, 2, 0, Math.PI * 2);
              ctx.fill();
            }
          });
        }

        // 7. Add Historical Milestone text placards & connection rigs
        milestones.forEach((m) => {
          const stepIdx = Math.floor(m.t * steps) % steps;
          const p = helixPoints[stepIdx];

          // Outward coordinate projection factor mapping labels away from center
          let ox = p.xMid - cx;
          let oy = p.yMid - cy;
          const dC = Math.sqrt(ox * ox + oy * oy) || 1;
          ox /= dC;
          oy /= dC;

          // Milestone elements are placed at center depth index zero (neutral)
          drawBuffer.push({
            depth: 0.1,
            draw: () => {
              // Elegant coordinates for placing the placards
              const rigDist = 65 + (p.t * 12345 % 3) * 12; // varying distance prevents overlap
              const labelX = p.xMid + ox * rigDist;
              const labelY = p.yMid + oy * (rigDist * 0.9);

              // Dotted structural connector wire
              ctx.strokeStyle = `${m.color}0.22)`;
              ctx.lineWidth = 1;
              ctx.setLineDash([2, 4]);
              ctx.beginPath();
              ctx.moveTo(p.xMid, p.yMid);
              ctx.lineTo(labelX, labelY);
              ctx.stroke();
              ctx.setLineDash([]); // Reset standard stroke

              // Focal milestone contact node
              ctx.fillStyle = `${m.color}0.65)`;
              ctx.beginPath();
              ctx.arc(p.xMid, p.yMid, 4, 0, Math.PI * 2);
              ctx.fill();

              // Small ring aura
              ctx.strokeStyle = `${m.color}0.38)`;
              ctx.beginPath();
              ctx.arc(p.xMid, p.yMid, 9, 0, Math.PI * 2);
              ctx.stroke();

              // Typography layout fanning alignment
              let tAlign: CanvasTextAlign = 'center';
              if (ox > 0.28) tAlign = 'left';
              else if (ox < -0.28) tAlign = 'right';

              ctx.textAlign = tAlign;
              ctx.textBaseline = 'middle';

              // Background shadow support text backing
              ctx.shadowColor = 'rgba(0,0,0,1)';
              ctx.shadowBlur = 6;

              // Milestone Erasure date label (Monospace)
              ctx.fillStyle = `${m.color}0.85)`;
              ctx.font = 'bold 8.5px monospace';
              ctx.fillText(m.tag, labelX, labelY - 7);

              // Main Milestone Plain Translation (Gothic display)
              ctx.fillStyle = 'rgba(244, 244, 245, 0.88)';
              ctx.font = 'bold 11.5px sans-serif';
              ctx.fillText(m.label, labelX, labelY + 6);
              
              ctx.shadowColor = 'transparent';
              ctx.shadowBlur = 0;
            }
          });
        });

        // 8. SORT AND EXECUTE ALL DRAW PROCESSES
        drawBuffer.sort((da, db) => da.depth - db.depth);
        drawBuffer.forEach((action) => action.draw());

        // 9. Extra ambient particulate drift (floating stardust in the infinite void)
        particles.forEach((p) => {
          // Slow orbital gravitational drift around infinity core
          p.x += p.vx * 0.4;
          p.y += p.vy * 0.4;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.5})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      animationId = requestAnimationFrame(drawAnimation);
    };

    drawAnimation();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeSlide]);

  // Determine ambient glow colors based on the current activeSlide (era-specific)
  const getAmbientColors = () => {
    if (activeSlide >= 1 && activeSlide <= 4) {
      // Ancient: Warm amber lighting
      return {
        glow1: 'rgba(245, 158, 11, 0.16)', // Amber 500
        glow2: 'rgba(217, 119, 6, 0.12)',  // Amber 600
        glow3: 'rgba(120, 53, 4, 0.08)',   // Amber 800
      };
    } else if (activeSlide === 5 || activeSlide === 6) {
      // Medieval: Golden lighting
      return {
        glow1: 'rgba(234, 179, 8, 0.16)',  // Yellow 500 / Gold
        glow2: 'rgba(251, 191, 36, 0.12)', // Amber 400
        glow3: 'rgba(180, 83, 9, 0.08)',   // Amber 700 / Golden aura
      };
    } else if (activeSlide === 7) {
      // Industrial: Orange smoky lighting
      return {
        glow1: 'rgba(249, 115, 22, 0.18)',  // Orange 500
        glow2: 'rgba(194, 65, 12, 0.12)',  // Orange 700
        glow3: 'rgba(82, 82, 91, 0.15)',    // Smoky Zinc-500
      };
    } else if (activeSlide === 8) {
      // Modern: White lighting
      return {
        glow1: 'rgba(255, 255, 255, 0.12)', // Crisp soft white
        glow2: 'rgba(226, 232, 240, 0.08)', // Slate 200
        glow3: 'rgba(99, 102, 241, 0.06)',  // Indigo 500 (digital depth)
      };
    } else if (activeSlide === 9) {
      // Future: Blue neon lighting
      return {
        glow1: 'rgba(6, 182, 212, 0.18)',   // Cyan 500 (neon)
        glow2: 'rgba(59, 130, 246, 0.12)',  // Blue 500
        glow3: 'rgba(168, 85, 247, 0.08)',  // Purple 500
      };
    } else {
      // Default / Cosmic Opening / Finale
      return {
        glow1: 'rgba(236, 72, 153, 0.10)',  // Rose 500
        glow2: 'rgba(124, 58, 237, 0.10)',  // Violet 600
        glow3: 'rgba(255, 181, 160, 0.06)', // Peach 300
      };
    }
  };

  const { glow1, glow2, glow3 } = getAmbientColors();

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none">
      {/* Dynamic Ambient Glow Blobs - GPU-Accelerated & Soft Transitions */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute left-[-15%] top-[-10%] w-[55%] h-[55%] rounded-full filter blur-[120px] md:blur-[180px] animate-ambient-left"
          style={{ 
            backgroundColor: glow1, 
            transition: 'background-color 2000ms cubic-bezier(0.4, 0, 0.2, 1)' 
          }}
        />
        <div 
          className="absolute right-[-15%] bottom-[-10%] w-[55%] h-[55%] rounded-full filter blur-[120px] md:blur-[180px] animate-ambient-right"
          style={{ 
            backgroundColor: glow2, 
            transition: 'background-color 2000ms cubic-bezier(0.4, 0, 0.2, 1)' 
          }}
        />
        <div 
          className="absolute left-[25%] top-[20%] w-[50%] h-[50%] rounded-full filter blur-[140px] md:blur-[200px] animate-ambient-center"
          style={{ 
            backgroundColor: glow3, 
            transition: 'background-color 2000ms cubic-bezier(0.4, 0, 0.2, 1)' 
          }}
        />
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-10 block pointer-events-none transition-all duration-1000 ease-in-out"
      />
    </div>
  );
};
