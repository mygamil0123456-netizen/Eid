/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Moon, Volume2, VolumeX, Heart, Info, Info as InfoIcon, Share } from 'lucide-react';
import AnimalPasture from './components/AnimalPasture';
import AnimalSoundButton from './components/AnimalSoundButton';
import HumorWheel from './components/HumorWheel';
import CardGenerator from './components/CardGenerator';

// Intersect sparkle particle structure
interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

// Background celebratory flower/confetti structure
interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  emoji: string;
  speed: number;
}

export default function App() {
  const [clickSparkles, setClickSparkles] = useState<SparkleParticle[]>([]);
  const [confettiEnabled, setConfettiEnabled] = useState(true);
  const [confetti, setConfetti] = useState<ConfettiParticle[]>([]);
  const [audioAmbient, setAudioAmbient] = useState(false);
  const [ambientOsc, setAmbientOsc] = useState<any>(null);

  // Sparkle generator on click
  const handlePageClick = (e: React.MouseEvent) => {
    // Generate 5 immediate sparkles around click coordinates
    const colors = ['#fde047', '#34d399', '#f472b6', '#60a5fa', '#fbbf24'];
    const newSparkles = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: e.clientX,
      y: e.clientY + window.scrollY,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setClickSparkles((prev) => [...prev, ...newSparkles].slice(-25));
  };

  // Clean old sparkles after lifetime
  useEffect(() => {
    const timer = setInterval(() => {
      setClickSparkles((prev) => prev.filter((s) => Date.now() - s.id < 1200));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Periodic falling confetti flow
  useEffect(() => {
    if (!confettiEnabled) {
      setConfetti([]);
      return;
    }

    const confettiTypes = ['🌸', '✨', '⭐', '🎈', '🌿', '💛'];
    
    // Spawn initial confetti
    const initial = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage x
      y: Math.random() * -100, // start above viewport
      size: Math.random() * 14 + 10,
      emoji: confettiTypes[Math.floor(Math.random() * confettiTypes.length)],
      speed: Math.random() * 1.5 + 0.8,
    }));
    setConfetti(initial);

    // Continuous update interval
    const interval = setInterval(() => {
      setConfetti((prev) => 
        prev.map((p) => {
          let nextY = p.y + p.speed;
          let nextX = p.x + Math.sin(nextY / 15) * 0.15; // smooth drift
          if (nextY > 115) {
            // Respawn back at top
            nextY = -20;
            nextX = Math.random() * 100;
          }
          return { ...p, y: nextY, x: nextX };
        })
      );
    }, 30);

    return () => clearInterval(interval);
  }, [confettiEnabled]);

  // Procedural dynamic ambient synthetic chimes (celebration mood)
  const toggleAmbientSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!ctxRef.current) {
        ctxRef.current = new AudioCtx();
      }
      const ctx = ctxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (audioAmbient) {
        // Turning off
        clearInterval(chimeIntervalRef.current);
        setAudioAmbient(false);
      } else {
        // Turning on chimes
        setAudioAmbient(true);
        triggerHolidayChimes(ctx);
      }
    } catch (e) {
      console.warn("AudioContext not supported or blocked:", e);
    }
  };

  const ctxRef = React.useRef<AudioContext | null>(null);
  const chimeIntervalRef = React.useRef<any>(null);

  const triggerHolidayChimes = (ctx: AudioContext) => {
    const scale = [261.63, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99]; // Pentatonic celebratory scale

    const playChime = () => {
      if (ctx.state === 'suspended') return;
      const time = ctx.currentTime;
      const freq = scale[Math.floor(Math.random() * scale.length)];
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);
      // add dynamic pitch vibrato for wind-chime realism
      osc.frequency.exponentialRampToValueAtTime(freq + (Math.random() * 4 - 2), time + 2.5);

      filter.type = 'lowpass';
      filter.frequency.value = 1500;

      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.08, time + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 2.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + 2.6);
    };

    // Play immediately and play every 1.5 seconds
    playChime();
    chimeIntervalRef.current = setInterval(playChime, 1500);
  };

  useEffect(() => {
    return () => {
      if (chimeIntervalRef.current) {
        clearInterval(chimeIntervalRef.current);
      }
    };
  }, []);

  return (
    <div 
      onClick={handlePageClick}
      className="min-h-screen relative bg-gradient-to-b from-gray-950 via-emerald-950 to-zinc-950 text-white select-none overflow-x-hidden font-sans pb-16"
    >
      
      {/* Top Sigma Brand Bar */}
      <header className="w-full max-w-6xl mx-auto px-6 pt-6 flex justify-between items-center relative z-40">
        <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300">
          <img 
            src="/src/assets/images/sigma_logo_icon_1779892833869.png" 
            alt="Sigma Logo" 
            className="w-5 h-5 object-contain rounded-md" 
            referrerPolicy="no-referrer"
          />
          <span className="text-xs font-bold font-sans tracking-widest text-yellow-300">SIGMA</span>
        </div>
      </header>

      {/* Absolute particle viewport overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-20">
        {clickSparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute rounded-full pointer-events-none animate-ping"
            style={{
              left: `${sparkle.x}px`,
              top: `${sparkle.y}px`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              backgroundColor: sparkle.color,
              boxShadow: `0 0 10px ${sparkle.color}`,
              opacity: 0.8,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}

        {/* Falling petals */}
        {confetti.map((c) => (
          <div
            key={c.id}
            className="absolute select-none pointer-events-none transition-all duration-300"
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              fontSize: `${c.size}px`,
              opacity: 0.65,
            }}
          >
            {c.emoji}
          </div>
        ))}
      </div>

      {/* Floating control buttons (top right corner) */}
      <div className="absolute top-6 right-6 z-30 flex items-center gap-3">
        
        {/* Toggle Confetti Shower */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setConfettiEnabled(!confettiEnabled);
          }}
          className={`p-2.5 rounded-full border shadow-xl transition-all cursor-pointer ${
            confettiEnabled
              ? 'bg-yellow-400 border-yellow-500 text-black shadow-yellow-400/15'
              : 'bg-white/10 border-white/10 text-gray-300 hover:text-white'
          }`}
          title={confettiEnabled ? 'বসন্ত বৃষ্টি বন্ধ করুন 🌸' : 'ফুল ও তারা বর্ষণ চালু করুন ⭐'}
        >
          <Sparkles size={18} className={confettiEnabled ? 'animate-spin duration-3000' : ''} />
        </button>

        {/* Dynamic Chime sound option */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleAmbientSound();
          }}
          className={`p-2.5 rounded-full border shadow-xl transition-all cursor-pointer ${
            audioAmbient
              ? 'bg-emerald-400 border-emerald-500 text-black shadow-emerald-400/15'
              : 'bg-white/10 border-white/10 text-gray-300 hover:text-white'
          }`}
          title={audioAmbient ? 'উৎসব সঙ্গীত অফ করুন 🔇' : 'উৎসবের আবহ সঙ্গীত বাজনুন 🔊'}
        >
          {audioAmbient ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </div>

      {/* Header / Hero Unit */}
      <div className="relative flex flex-col items-center justify-center text-center px-6 pt-16 pb-12 overflow-hidden">
        
        {/* Sky glow effect */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />
        
        {/* Top Floating Big Cow Emoticon */}
        <motion.div 
          animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="text-8xl md:text-9xl mb-4 select-none filter drop-shadow-[0_10px_15px_rgba(16,185,129,0.25)]"
        >
          🐄
        </motion.div>

        {/* Festive Moon Silhouette with Bengali Text header */}
        <div className="flex items-center gap-1.5 md:gap-3 justify-center mb-4">
          <Moon size={32} className="text-yellow-300 fill-yellow-300 filter drop-shadow-[0_0_12px_rgba(253,224,71,0.6)] animate-pulse" />
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white drop-shadow-xl font-display text-glow">
            ঈদুল আযহা
          </h1>
          <Moon size={32} className="text-yellow-300 fill-yellow-300 filter drop-shadow-[0_0_12px_rgba(253,224,71,0.6)] animate-pulse scale-x-[-1]" />
        </div>

        {/* Subtitle */}
        <motion.p 
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-2xl md:text-3.5xl font-black text-yellow-300 text-glow"
        >
          সবাইকে জানাই ঈদ মোবারক ✨
        </motion.p>

        {/* Quote Plate (Styled Card Box) */}
        <div className="mt-8 bg-white/10 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-2xl max-w-2xl border border-white/25 relative overflow-hidden text-center box-glow">
          {/* subtle gold glitter borders */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-yellow-400 to-emerald-500" />
          
          <p className="text-base md:text-xl leading-relaxed text-stone-100 font-medium">
            “ত্যাগের মহিমায় ভরে উঠুক সবার জীবন,
            সুখ, শান্তি আর ভালোবাসায় কাটুক ঈদের প্রতিটি মুহূর্ত।”
          </p>
          <div className="mt-3 text-xs md:text-sm text-yellow-300/80 font-mono tracking-widest font-sans flex items-center justify-center gap-1.5">
            <span>🌙</span> শুভ ঈদুল মাযহার আন্তরিক শুভেচ্ছা <span>🌙</span>
          </div>
        </div>

        {/* Celebration State Badge (predicted for real-time celebration) */}
        <div className="mt-6 flex items-center gap-2 bg-emerald-500/10 border border-emerald-400/25 px-4.5 py-1.5 rounded-full text-xs text-emerald-300 font-medium tracking-wide">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>উৎসবের আনন্দ সর্বত্র লাইভ! আজকের দিনটি উৎসব উদযাপনের দিন</span>
        </div>
      </div>

      {/* Main Grid Sections */}
      <main className="max-w-6xl mx-auto px-6 space-y-12 relative z-10">
        
        {/* SECTION 1: Interactivite Pasture Animal Simulator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AnimalPasture />
        </motion.div>

        {/* SECTION 1.5: Dedicated Animal Audio Loops Controller */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          <AnimalSoundButton />
        </motion.div>

        {/* SECTION 2: Curated Comedy Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <HumorWheel />
        </motion.div>

        {/* SECTION 3: Custom Greeting Cards Maker */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center md:text-left mb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center justify-center md:justify-start gap-2 font-display">
              💌 <span className="text-glow text-yellow-300">ঈদ কার্ড ও বার্তা কালেকশন</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              ত্যাগের শুভেচ্ছা কার্ডগুলো পড়ুন অথবা ইচ্ছেমতো কার্ড ডিজাইন করে প্রিয়জনকে টেক্সট পাঠান।
            </p>
          </div>
          <CardGenerator />
        </motion.div>

      </main>

      {/* Endless Scrolling Text (The requested sliding marquee at bottom) */}
      <div className="mt-20 bg-black py-4.5 overflow-hidden border-t border-emerald-500/40 border-b border-white/5 relative z-10">
        <div className="whitespace-nowrap inline-block animate-[scrollText_24s_linear_infinite] hover:[animation-play-state:paused] text-lg md:text-2xl font-bold text-green-300 select-none tracking-wider">
          🌙 ঈদ মোবারক 🌙 সবাইকে জানাই পবিত্র ঈদুল আযহার শুভেচ্ছা ✨ 🐄 ত্যাগের আনন্দ ছড়িয়ে পড়ুক সবার জীবনে ❤️ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 🌙 ঈদ মোবারক 🌙 সবাইকে জানাই পবিত্র ঈদুল আযহার শুভেচ্ছা ✨ 🐄 ত্যাগের আনন্দ ছড়িয়ে পড়ুক সবার জীবনে ❤️
        </div>
        <style>{`
          @keyframes scrollText {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* Footer view */}
      <footer className="text-center py-12 text-gray-400 text-sm md:text-base relative z-10 max-w-lg mx-auto">
        <div className="flex flex-col items-center justify-center gap-3 mb-4">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full shadow-inner hover:bg-white/10 transition duration-300">
            <img 
              src="/src/assets/images/sigma_logo_icon_1779892833869.png" 
              alt="Sigma Logo" 
              className="w-5 h-5 object-contain rounded-xs" 
              referrerPolicy="no-referrer"
            />
            <span className="text-xs font-bold font-sans tracking-widest text-yellow-300">SIGMA PLATFORM</span>
          </div>
          <div className="flex items-center gap-1.5 text-red-500">
            <span>Made with</span>
            <Heart size={14} className="fill-current animate-pulse text-red-500" />
            <span className="text-gray-300">for Eid-ul-Adha Celebration</span>
          </div>
        </div>
        <p className="text-[11px] text-gray-500 font-sans">
          © {new Date().getFullYear()} Eid Al-Adha Interactive Applet. Powered by Sigma. All rights reserved.
        </p>
      </footer>

    </div>
  );
}
