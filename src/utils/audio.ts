let audioCtx: AudioContext | null = null;
let ambientOscillators: OscillatorNode[] = [];
let ambientGain: GainNode | null = null;
let tickingInterval: number | null = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const AudioEngine = {
  startAmbient: () => {
    try {
      const ctx = getAudioContext();
      if (ambientOscillators.length > 0) return;

      // Create main gain node for ambient pad
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 3); // Slightly higher premium ambient base
      gainNode.connect(ctx.destination);
      ambientGain = gainNode;

      // Base deep pad synth (55Hz - Low A note, which laptops struggle to hear)
      const osc1 = ctx.createOscillator();
      const filter1 = ctx.createBiquadFilter();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(55, ctx.currentTime);
      filter1.type = 'lowpass';
      filter1.frequency.setValueAtTime(150, ctx.currentTime);
      filter1.Q.setValueAtTime(8, ctx.currentTime);
      osc1.connect(filter1);
      filter1.connect(gainNode);
      osc1.start();
      ambientOscillators.push(osc1);

      // Overtone Harmonic 1 (110Hz - A2, perfectly audible on laptops and speakers)
      const osc2 = ctx.createOscillator();
      const filter2 = ctx.createBiquadFilter();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110, ctx.currentTime);
      filter2.type = 'lowpass';
      filter2.frequency.setValueAtTime(250, ctx.currentTime);
      filter2.Q.setValueAtTime(4, ctx.currentTime);
      osc2.connect(filter2);
      // Connect to gain with a slight attenuation for balance
      const overtoneGain1 = ctx.createGain();
      overtoneGain1.gain.setValueAtTime(0.4, ctx.currentTime);
      filter2.connect(overtoneGain1);
      overtoneGain1.connect(gainNode);
      osc2.start();
      ambientOscillators.push(osc2);

      // Overtone Harmonic 2 (165Hz - E3, beautiful perfect fifth overtone for cinematic air)
      const osc3 = ctx.createOscillator();
      const filter3 = ctx.createBiquadFilter();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(165, ctx.currentTime);
      filter3.type = 'lowpass';
      filter3.frequency.setValueAtTime(300, ctx.currentTime);
      filter3.Q.setValueAtTime(3, ctx.currentTime);
      osc3.connect(filter3);
      const overtoneGain2 = ctx.createGain();
      overtoneGain2.gain.setValueAtTime(0.3, ctx.currentTime);
      filter3.connect(overtoneGain2);
      overtoneGain2.connect(gainNode);
      osc3.start();
      ambientOscillators.push(osc3);

      // Slowly modulate filter frequencies for organic cosmic breathing texture
      const modulateFilters = () => {
        if (ambientOscillators.length === 0 || !audioCtx) return;
        const now = audioCtx.currentTime;
        // Modulate with slightly offset phase
        filter1.frequency.linearRampToValueAtTime(140 + Math.sin(now * 0.12) * 40, now + 1.2);
        filter2.frequency.linearRampToValueAtTime(240 + Math.cos(now * 0.08) * 50, now + 1.2);
        filter3.frequency.linearRampToValueAtTime(290 + Math.sin(now * 0.15) * 30, now + 1.2);
        setTimeout(modulateFilters, 1200);
      };
      modulateFilters();

      // Start a slow procedural clock tick
      AudioEngine.startTicking();
    } catch (e) {
      console.warn("Audio initiation bypassed", e);
    }
  },

  stopAmbient: () => {
    try {
      if (ambientGain && audioCtx) {
        const now = audioCtx.currentTime;
        ambientGain.gain.cancelScheduledValues(now);
        ambientGain.gain.linearRampToValueAtTime(0, now + 0.5);
        setTimeout(() => {
          ambientOscillators.forEach(osc => {
            try {
              osc.stop();
              osc.disconnect();
            } catch (err) {}
          });
          ambientOscillators = [];
          ambientGain = null;
        }, 500);
      }
      if (tickingInterval) {
        clearInterval(tickingInterval);
        tickingInterval = null;
      }
    } catch (e) {}
  },

  startTicking: () => {
    if (tickingInterval) return;
    tickingInterval = window.setInterval(() => {
      // Gentle cinematic metronome clock tick
      AudioEngine.playTick(1200, 0.025, 0.015);
    }, 1500) as unknown as number;
  },

  playTick: (frequency = 1800, gainVol = 0.03, duration = 0.025) => {
    try {
      if (!audioCtx || audioCtx.state === 'suspended') return;
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      gainNode.gain.setValueAtTime(gainVol, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration + 0.05);
    } catch (e) {}
  },

  playSweep: () => {
    try {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') return;
      
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const bandpass = ctx.createBiquadFilter();
      const gainNode = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(80, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(480, ctx.currentTime + 1.2);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(160, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 1.2);

      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(220, ctx.currentTime);
      bandpass.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 1.2);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.25); // Slightly louder sweep
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

      osc.connect(bandpass);
      osc2.connect(bandpass);
      bandpass.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc2.start();
      
      osc.stop(ctx.currentTime + 1.3);
      osc2.stop(ctx.currentTime + 1.3);
    } catch (e) {}
  },

  playClick: () => {
    // Rich wooden/metallic dual mechanical click sound
    AudioEngine.playTick(980, 0.08, 0.035);
    setTimeout(() => {
      AudioEngine.playTick(1320, 0.04, 0.015);
    }, 12);
  },

  playSuccess: () => {
    try {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') return;
      const now = ctx.currentTime;
      
      // Beautiful major-ninth chord cascade chime
      const notes = [523.25, 659.25, 783.99, 987.77, 1174.66]; // C5, E5, G5, B5, D6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        
        gain.gain.setValueAtTime(0, now);
        gain.gain.setValueAtTime(0.05, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.6);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.7);
      });
    } catch (e) {}
  },

  playDiscoveryOpen: () => {
    try {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') return;
      const now = ctx.currentTime;
      
      // Sparkling digital magic reverse-swell rising chord arpeggio
      const chords = [587.33, 739.99, 880.00, 1108.73, 1479.98]; // D5, F#5, A5, C#6, F#6 (D major 7/9 sparkling palette)
      chords.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const biquad = ctx.createBiquadFilter();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        
        biquad.type = 'highpass';
        biquad.frequency.setValueAtTime(200, now);
        biquad.Q.setValueAtTime(1, now);
        
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.045, now + idx * 0.05 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.8);
        
        osc.connect(biquad);
        biquad.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.9);
      });
    } catch (e) {}
  },

  playDiscoveryClose: () => {
    try {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') return;
      const now = ctx.currentTime;
      
      // Soothing, soft mechanical closing slide
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const lowpass = ctx.createBiquadFilter();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(440, now);
      osc1.frequency.exponentialRampToValueAtTime(220, now + 0.35);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(220, now);
      osc2.frequency.exponentialRampToValueAtTime(110, now + 0.35);

      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(250, now);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc1.connect(lowpass);
      osc2.connect(lowpass);
      lowpass.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.4);
      osc2.stop(now + 0.4);
    } catch (e) {}
  },

  playCinematicImpact: () => {
    try {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') return;
      const now = ctx.currentTime;

      // 1. Heavy resonant low sub-drop boom (audible on headphones & larger speakers, felt on small ones)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      const subFilter = ctx.createBiquadFilter();

      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(120, now);
      subOsc.frequency.exponentialRampToValueAtTime(45, now + 1.8);

      subFilter.type = 'lowpass';
      subFilter.frequency.setValueAtTime(100, now);

      subGain.gain.setValueAtTime(0, now);
      subGain.gain.linearRampToValueAtTime(0.24, now + 0.05); // Strong impact feel
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      subOsc.connect(subFilter);
      subFilter.connect(subGain);
      subGain.connect(ctx.destination);

      subOsc.start(now);
      subOsc.stop(now + 1.9);

      // 2. High-pitch chime/swell resonance impact (brilliant, wide, crystal clear on standard laptops)
      [220, 330, 440, 660, 880].forEach((freq, idx) => {
        const chimeOsc = ctx.createOscillator();
        const chimeGain = ctx.createGain();
        const chimeFilter = ctx.createBiquadFilter();

        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(freq, now);
        chimeOsc.frequency.exponentialRampToValueAtTime(freq * 0.95, now + 1.5);

        chimeFilter.type = 'bandpass';
        chimeFilter.frequency.setValueAtTime(freq, now);
        chimeFilter.Q.setValueAtTime(2, now);

        chimeGain.gain.setValueAtTime(0, now);
        chimeGain.gain.linearRampToValueAtTime(0.045, now + 0.02);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);

        chimeOsc.connect(chimeFilter);
        chimeFilter.connect(chimeGain);
        chimeGain.connect(ctx.destination);

        chimeOsc.start(now);
        chimeOsc.stop(now + 1.6);
      });

      // 3. Ambient sweep overlay
      const sweepOsc = ctx.createOscillator();
      const sweepGain = ctx.createGain();
      const sweepFilter = ctx.createBiquadFilter();

      sweepOsc.type = 'sawtooth';
      sweepOsc.frequency.setValueAtTime(300, now);
      sweepOsc.frequency.exponentialRampToValueAtTime(80, now + 1.4);

      sweepFilter.type = 'lowpass';
      sweepFilter.frequency.setValueAtTime(400, now);
      sweepFilter.frequency.exponentialRampToValueAtTime(120, now + 1.4);

      sweepGain.gain.setValueAtTime(0.03, now);
      sweepGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

      sweepOsc.connect(sweepFilter);
      sweepFilter.connect(sweepGain);
      sweepGain.connect(ctx.destination);

      sweepOsc.start(now);
      sweepOsc.stop(now + 1.5);
    } catch (e) {}
  }
};
