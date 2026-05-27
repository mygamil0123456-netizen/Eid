/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FUN_LINES, FunLine } from '../types';
import { Smile, ArrowRight, ArrowLeft, Heart, Share2, Sparkles, Check } from 'lucide-react';

export default function HumorWheel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [votes, setVotes] = useState<Record<number, number>>(() => {
    // Collect pre-seeded votes
    const initialVotes: Record<number, number> = {};
    FUN_LINES.forEach((line) => {
      initialVotes[line.id] = line.votes;
    });
    return initialVotes;
  });
  
  const [userVoted, setUserVoted] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const currentJoke = FUN_LINES[currentIndex];

  const handleNext = () => {
    setSlideDirection('right');
    setCurrentIndex((prev) => (prev + 1) % FUN_LINES.length);
    setCopied(false);
  };

  const handlePrev = () => {
    setSlideDirection('left');
    setCurrentIndex((prev) => (prev - 1 + FUN_LINES.length) % FUN_LINES.length);
    setCopied(false);
  };

  const handleUpvote = (id: number) => {
    if (userVoted[id]) {
      // Undo vote
      setVotes((prev) => ({ ...prev, [id]: prev[id] - 1 }));
      setUserVoted((prev) => ({ ...prev, [id]: false }));
    } else {
      // Add vote
      setVotes((prev) => ({ ...prev, [id]: prev[id] + 1 }));
      setUserVoted((prev) => ({ ...prev, [id]: true }));
    }
  };

  const handleCopy = () => {
    const shareText = `${currentJoke.text}\n\n— পবিত্র ঈদুল আযহার ফানি ডায়েরি 🌙✨`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-yellow-400 via-amber-400 to-yellow-500 text-black rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden group">
      
      {/* Decorative starry or sparkle elements */}
      <div className="absolute top-2 right-4 text-amber-600/30 text-5xl font-extrabold select-none pointer-events-none">😂</div>
      <div className="absolute -bottom-6 -left-6 text-black/5 text-9xl font-extrabold select-none pointer-events-none">🐄</div>

      {/* Sparks decoration */}
      <div className="absolute top-4 left-4 text-amber-700/40 animate-pulse text-xs">✦</div>
      <div className="absolute bottom-12 right-6 text-amber-600/30 animate-ping duration-3000 text-sm">✦</div>

      <div className="relative z-10">
        
        {/* Title area */}
        <div className="text-center mb-6">
          <span className="bg-black/15 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full text-black/80 font-sans">
            ঈদ স্পেশাল ফান পোস্টার 🤪
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold mt-2 flex items-center justify-center gap-2 drop-shadow-sm font-display">
            😂 কোরবানির ফানি ডায়েরি 😂
          </h2>
          <div className="w-16 h-1 bg-black/20 mx-auto mt-2 rounded-full" />
        </div>

        {/* Carousel Content */}
        <div className="min-h-36 md:min-h-40 flex items-center justify-center px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ 
                opacity: 0, 
                x: slideDirection === 'right' ? 50 : -50,
                scale: 0.95
              }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ 
                opacity: 0, 
                x: slideDirection === 'right' ? -50 : 50,
                scale: 0.95
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="text-center"
            >
              <p className="text-xl md:text-2xl font-bold leading-relaxed text-slate-900 drop-shadow-xs max-w-2xl mx-auto italic">
                {currentJoke.text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Custom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-black/15">
          
          {/* Index Counter */}
          <div className="text-xs font-bold text-black/70 font-sans tracking-wider order-3 sm:order-1">
            রসিকতা {currentIndex + 1} / {FUN_LINES.length}
          </div>

          {/* Quick interactive keys */}
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <button
              type="button"
              onClick={() => handleUpvote(currentJoke.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-bold border transition-all ${
                userVoted[currentJoke.id]
                  ? 'bg-rose-600 border-rose-700 text-white shadow-lg shadow-rose-600/30'
                  : 'bg-black/10 hover:bg-black/15 border-transparent text-slate-900'
              }`}
            >
              <Heart size={15} className={userVoted[currentJoke.id] ? 'fill-current' : ''} />
              <span>হাস্যকর! ({votes[currentJoke.id]})</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-bold bg-black/10 hover:bg-black/15 text-slate-900 border border-transparent transition-all`}
            >
              {copied ? (
                <>
                  <Check size={14} className="text-green-800" />
                  <span>কপিড! ✅</span>
                </>
              ) : (
                <>
                  <Share2 size={14} />
                  <span>কপি ও শেয়ার</span>
                </>
              )}
            </button>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 order-2 sm:order-3">
            <button
              type="button"
              onClick={handlePrev}
              className="p-2 rounded-xl bg-black/10 hover:bg-black/20 text-slate-900 hover:scale-105 transition active:scale-95 cursor-pointer"
              title="পূর্ববর্তী"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-white hover:scale-105 transition active:scale-95 flex items-center gap-1.5 text-xs font-bold font-sans cursor-pointer"
            >
              পরবর্তী
              <ArrowRight size={14} />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
