/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Disc, Sparkles, RefreshCw } from 'lucide-react';
import { playAnimalSound } from '../utils/audio';

export default function AnimalSoundButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [useLoop, setUseLoop] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio helper element
    const audio = new Audio("https://www.soundjay.com/animal/cow-moo1.mp3");
    audio.loop = useLoop;
    audio.preload = "auto";
    
    // Set callbacks
    audio.addEventListener('play', () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));
    audio.addEventListener('ended', () => setIsPlaying(false));
    audio.addEventListener('error', (e) => {
      console.warn("External MP3 playback had an issue, falling back to Web Audio Synthesis:", e);
      setLoadError(true);
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Sync parameters
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = useLoop;
    }
  }, [useLoop]);

  const handlePlaySound = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        setLoadError(false);
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Direct MP3 play failed (browser user-interaction rule or blocked domain). playing procedural option instead:", err);
        setLoadError(true);
        // Fallback to our procedural synthesis sound!
        playAnimalSound('moo');
        // Simulate play state briefly
        setIsPlaying(true);
        setTimeout(() => setIsPlaying(false), 2000);
      }
    }
  };

  return (
    <div className="bg-emerald-950/40 backdrop-blur-md rounded-3xl border border-yellow-500/30 p-6 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-300">
      
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/5 rounded-full blur-xl" />
      <div className="absolute -bottom-6 -left-6 text-yellow-400/5 text-8xl font-black select-none pointer-events-none">🔊</div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        
        {/* Title / Badging */}
        <div className="flex items-center justify-center gap-1.5 px-3 py-1 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-[11px] text-yellow-300 font-bold mb-3 font-sans w-fit mx-auto">
          <Sparkles size={11} className="text-yellow-400 animate-pulse" />
          উৎসবের আবহ সাউন্ড কন্ট্রোল
        </div>

        <h3 className="text-lg md:text-xl font-bold text-white mb-2 font-display">
          🐄 গরু ও ছাগলের প্রাকৃতিক ডাক 🔊
        </h3>
        
        <p className="text-xs text-gray-300 mb-5 leading-relaxed max-w-xs mx-auto">
          আজকের পবিত্র কোরবানির দিনের আমেজ ফুটিয়ে তুলতে ব্যাকগ্রাউন্ড হাম্বা ডাকটি সাউন্ডজে মিউজিক দ্বারা প্লে বা অফ করুন!
        </p>

        {/* Master Trigger block */}
        <div className="flex flex-col items-center gap-4">
          
          <button
            type="button"
            onClick={handlePlaySound}
            className={`px-8 py-4 text-base md:text-lg rounded-2xl font-black transition-all flex items-center justify-center gap-3 cursor-pointer select-none active:scale-95 shadow-xl ${
              isPlaying
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/15'
                : 'bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-black shadow-yellow-400/20'
            }`}
          >
            {isPlaying ? (
              <>
                <VolumeX size={20} className="animate-pulse" />
                <span>সাউন্ড বন্ধ করুন 🔇</span>
              </>
            ) : (
              <>
                <Volume2 size={20} className="animate-bounce" />
                <span>🔊 গরু ও ছাগলের সাউন্ড চালু করুন</span>
              </>
            )}
          </button>

          {/* Quick options */}
          <div className="flex items-center gap-4 mt-2 text-xs">
            <label className="flex items-center gap-2 text-gray-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={useLoop}
                onChange={(e) => setUseLoop(e.target.checked)}
                className="rounded accent-yellow-400 bg-white/5 border-white/20"
              />
              <span>টানা লুপে বাজান (Loop)</span>
            </label>

            {isPlaying && (
              <div className="flex items-center gap-1 text-emerald-400 font-medium">
                <Disc size={13} className="animate-spin text-emerald-400" />
                <span className="font-sans">বাজছে...</span>
              </div>
            )}
          </div>

          {/* Fallback diagnostic message (only shows if we have issues or playing synthetic audio) */}
          {loadError && (
            <div className="text-[10px] text-yellow-300/80 bg-yellow-400/5 px-3 py-1.5 rounded-xl border border-yellow-400/10 mt-1 max-w-xs font-sans">
              💡 ব্রাউজার সুরক্ষায় প্রসেডিউরাল হাম্বা সাউন্ড চালিত হচ্ছে।
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
