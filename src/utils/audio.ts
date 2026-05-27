/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Generate procedurally synthesized animal sounds using Web Audio API
export function playAnimalSound(type: 'moo' | 'bleat' | 'grunt' | 'snort'): void {
  try {
    const ctx = getAudioContext();
    const time = ctx.currentTime;

    if (type === 'moo') {
      // --- Procedural Cow Moo ---
      // Low fundamental around 100Hz with strong harmonics for that rich bovine chesty resonance
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const osc3 = ctx.createOscillator();
      
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(115, time);
      osc1.frequency.exponentialRampToValueAtTime(80, time + 1.2);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(230, time);
      osc2.frequency.exponentialRampToValueAtTime(160, time + 1.2);

      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(345, time);
      osc3.frequency.exponentialRampToValueAtTime(240, time + 1.2);

      // Low pass filter mimics the vocal tract opening/closing ("M"-to-"Ooo")
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(150, time);
      filter.frequency.exponentialRampToValueAtTime(600, time + 0.3);
      filter.frequency.exponentialRampToValueAtTime(120, time + 1.2);
      filter.Q.setValueAtTime(5, time);

      // Gain envelope
      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime(0.3, time + 0.15); // gentle swell "M..."
      gainNode.gain.setValueAtTime(0.3, time + 0.4);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + 1.3); // fade out "ooo"

      // Connections
      osc1.connect(filter);
      osc2.connect(filter);
      osc3.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start(time);
      osc2.start(time);
      osc3.start(time);

      osc1.stop(time + 1.4);
      osc2.stop(time + 1.4);
      osc3.stop(time + 1.4);

    } else if (type === 'bleat') {
      // --- Procedural Goat Bleat ("Meh-eh-eh-eh") ---
      // Higher pitched with rapid amplitude modulation (Vibrato/Flutter)
      const osc = ctx.createOscillator();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      
      const filter = ctx.createBiquadFilter();
      const gainNode = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, time);
      // Slight pitch drift downward
      osc.frequency.linearRampToValueAtTime(270, time + 0.8);

      // LFO for the characteristic rapid flutter (13Hz)
      lfo.frequency.value = 13;
      lfoGain.gain.value = 40; // Pitch vibrato depth

      // Amplitude vibrato setup
      const ampLfo = ctx.createOscillator();
      const ampLfoGain = ctx.createGain();
      ampLfo.frequency.value = 14;
      ampLfoGain.gain.value = 0.25;

      filter.type = 'bandpass';
      filter.frequency.value = 800;
      filter.Q.value = 2.0;

      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime(0.18, time + 0.08);
      // Let it decay with the flutter
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.95);

      // Connect LFO for pitch vibrato
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      // Connect everything together
      osc.connect(filter);
      
      // Connect Amplitude LFO to gainNode gain parameter
      ampLfo.connect(ampLfoGain);
      // Wait, let's keep it simple and robust by combining oscillators or simple volume envelope nodes
      // To work on all standard browsers without parameter crashing, we use clean gain modulation
      const modGain = ctx.createGain();
      modGain.gain.setValueAtTime(0.6, time);
      
      filter.connect(modGain);
      modGain.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Start oscillators
      osc.start(time);
      lfo.start(time);
      
      osc.stop(time + 1.0);
      lfo.stop(time + 1.0);

    } else if (type === 'grunt') {
      // --- Procedural Camel Grunt (Deep, guttery rumble) ---
      // Uses a very low oscillator combined with a bit of noise
      const osc = ctx.createOscillator();
      const noise = createNoiseBufferNode(ctx);
      const noiseGain = ctx.createGain();
      const oscGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      const finalGain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(65, time);
      osc.frequency.linearRampToValueAtTime(45, time + 1.0);

      if (noise) {
        noiseGain.gain.value = 0.12;
        noise.connect(filter);
      }

      oscGain.gain.value = 0.15;
      osc.connect(oscGain);
      oscGain.connect(filter);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, time);
      filter.frequency.linearRampToValueAtTime(70, time + 1.0);

      finalGain.gain.setValueAtTime(0, time);
      finalGain.gain.linearRampToValueAtTime(0.35, time + 0.1);
      finalGain.gain.exponentialRampToValueAtTime(0.001, time + 1.1);

      filter.connect(finalGain);
      finalGain.connect(ctx.destination);

      osc.start(time);
      if (noise) noise.start(time);

      osc.stop(time + 1.2);
      if (noise) noise.stop(time + 1.2);

    } else if (type === 'snort') {
      // --- Procedural Buffalo Snort (Heavy burst of air/friction) ---
      const noise = createNoiseBufferNode(ctx);
      const filter = ctx.createBiquadFilter();
      const gainNode = ctx.createGain();

      if (noise) {
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1000, time);
        filter.frequency.exponentialRampToValueAtTime(180, time + 0.45);
        filter.Q.value = 1.5;

        gainNode.gain.setValueAtTime(0, time);
        gainNode.gain.linearRampToValueAtTime(0.4, time + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.6);

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        noise.start(time);
        noise.stop(time + 0.7);
      } else {
        // Fallback to low synth snort if noise buffer fails
        const fallbackOsc = ctx.createOscillator();
        fallbackOsc.type = 'triangle';
        fallbackOsc.frequency.setValueAtTime(130, time);
        fallbackOsc.frequency.exponentialRampToValueAtTime(40, time + 0.4);

        gainNode.gain.setValueAtTime(0, time);
        gainNode.gain.linearRampToValueAtTime(0.3, time + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

        fallbackOsc.connect(gainNode);
        gainNode.connect(ctx.destination);

        fallbackOsc.start(time);
        fallbackOsc.stop(time + 0.5);
      }
    }
  } catch (error) {
    console.warn("Web Audio is restricted or unsupported on this device/run:", error);
  }
}

// Helper to construct a white noise buffer
function createNoiseBufferNode(ctx: AudioContext): AudioBufferSourceNode | null {
  try {
    const bufferSize = ctx.sampleRate * 2; // 2 seconds of noise buffer
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    return source;
  } catch (e) {
    return null;
  }
}

// Procedural high-quality grass-chewing/crunch sound synthesis
export function playCrunchSound(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // We trigger 3 consecutive short crunchy bites spaced by 250ms
    for (let i = 0; i < 3; i++) {
      const time = now + i * 0.25;

      // 1. Friction high-pass noise for the dry grass crunch
      const noise = createNoiseBufferNode(ctx);
      if (noise) {
        const filter = ctx.createBiquadFilter();
        const gainNode = ctx.createGain();

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400, time);
        filter.frequency.exponentialRampToValueAtTime(800, time + 0.15);
        filter.Q.setValueAtTime(3.0, time);

        gainNode.gain.setValueAtTime(0, time);
        gainNode.gain.linearRampToValueAtTime(0.18, time + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        noise.start(time);
        noise.stop(time + 0.2);
      }

      // 2. Heavy jaw wet munch (low-frequency triangle/sine thud)
      const osc = ctx.createOscillator();
      const munchGain = ctx.createGain();
      const lowFilter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, time);
      osc.frequency.exponentialRampToValueAtTime(45, time + 0.12);

      lowFilter.type = 'lowpass';
      lowFilter.frequency.value = 300;

      munchGain.gain.setValueAtTime(0, time);
      munchGain.gain.linearRampToValueAtTime(0.25, time + 0.03);
      munchGain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

      osc.connect(lowFilter);
      lowFilter.connect(munchGain);
      munchGain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + 0.2);
    }
  } catch (error) {
    console.warn("AudioContext chew synthesis failed or blocked:", error);
  }
}

