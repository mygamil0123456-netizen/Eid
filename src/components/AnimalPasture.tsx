/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ANIMALS, Animal } from '../types';
import { playAnimalSound, playCrunchSound } from '../utils/audio';
import { Volume2, Sliders, ChevronRight, Sparkles, Laugh, X, Play } from 'lucide-react';

export default function AnimalPasture() {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal>(ANIMALS[0]);
  const [speed, setSpeed] = useState<number>(10); // duration in seconds (lower is faster)
  const [isFeeding, setIsFeeding] = useState(false);
  const [isChewing, setIsChewing] = useState(false);
  const [feederName, setFeederName] = useState<string>('');
  const [showGrass, setShowGrass] = useState(false);
  const [showFriendFeedModal, setShowFriendFeedModal] = useState(false);
  const [friendName, setFriendName] = useState('');

  // When animal change, automatically play its sound and slightly adjust duration
  useEffect(() => {
    playAnimalSound(selectedAnimal.soundName);
    // Adjust speed based on animal profile multiplier
    setSpeed(Math.round(10 / selectedAnimal.speedMultiplier));
  }, [selectedAnimal]);

  const handleAnimalSelect = (animal: Animal) => {
    setSelectedAnimal(animal);
  };

  const handleFeedGrass = () => {
    if (isFeeding) return;
    setIsFeeding(true);
    setShowGrass(true);
    playAnimalSound(selectedAnimal.soundName);
    
    // Animate feeding stop
    setTimeout(() => {
      setIsChewing(true);
      setShowGrass(false);
      setTimeout(() => {
        setIsChewing(false);
        setIsFeeding(false);
      }, 1500);
    }, 1000);
  };

  const handleFriendFeed = () => {
    playCrunchSound();
    setShowFriendFeedModal(true);
  };

  return (
    <div className="bg-emerald-950/40 backdrop-blur-md rounded-3xl border border-emerald-500/20 shadow-2xl p-6 md:p-8 overflow-hidden transition-all duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2 font-display">
            🌿 <span className="text-yellow-300 text-glow">পশুর আলপনা ও মাঠ</span> 
          </h2>
          <p className="text-gray-300 text-sm mt-1">
            পছন্দের পশু নির্বাচন করুন, তাদের ডাক শুনুন ও ঘাস খাইয়ে আনন্দ নিন!
          </p>
        </div>
        
        {/* Quick controls */}
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => playAnimalSound(selectedAnimal.soundName)}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-2xl shadow-lg hover:shadow-yellow-400/20 transition-all text-xs sm:text-sm cursor-pointer"
          >
            <Volume2 size={16} />
            ডাক শুনুন 🔊
          </button>
          
          <button 
            type="button"
            onClick={handleFeedGrass}
            disabled={isFeeding}
            className={`flex items-center gap-2 px-4 py-2 font-bold rounded-2xl shadow-lg transition-all text-xs sm:text-sm cursor-pointer ${
              isFeeding 
                ? 'bg-emerald-800 text-emerald-300 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-400 text-white hover:shadow-green-500/20'
            }`}
          >
            <span>🌿</span>
            {isFeeding ? 'খাওয়ানো হচ্ছে...' : 'ঘাস খাওয়ান'}
          </button>
        </div>
      </div>

      {/* Main Pasture Stage */}
      <div className="relative h-56 rounded-2xl bg-gradient-to-b from-sky-950 via-teal-900/60 to-emerald-900 border border-emerald-500/30 overflow-hidden shadow-inner mb-6">
        
        {/* Moon & Sky decorative */}
        <div className="absolute top-4 right-8 w-16 h-16 rounded-full bg-yellow-100/10 backdrop-blur-xs flex items-center justify-center border border-yellow-200/10">
          <div className="absolute w-12 h-12 rounded-full bg-yellow-200/90 shadow-[0_0_20px_rgba(253,224,71,0.6)]" />
        </div>
        
        {/* Twinkling stars */}
        <div className="absolute top-6 left-12 text-yellow-300/40 animate-pulse text-sm">✦</div>
        <div className="absolute top-16 left-1/3 text-yellow-200/50 animate-bounce duration-2000 text-xs">✦</div>
        <div className="absolute top-8 left-2/3 text-white/30 animate-pulse text-lg">✦</div>
        <div className="absolute top-20 right-1/4 text-yellow-100/40 animate-bounce duration-3000 text-sm">✦</div>

        {/* Back hills silhouettes */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-emerald-950 to-emerald-900/80 rounded-t-[50%] scale-x-125 translate-y-12 blur-xs opacity-60" />
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-green-950 to-emerald-800/80 rounded-t-[40%] scale-x-110 translate-y-4 shadow-[0_-5px_15px_rgba(16,185,129,0.15)]" />

        {/* Floating Grass pile on floor when feed grass clicked */}
        <AnimatePresence>
          {showGrass && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.1, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.2, y: 20 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-3xl"
              style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}
            >
              🌱🌿🍃
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Walking Animal and Farmer loop */}
        <div className="absolute bottom-4 left-0 w-full h-20 overflow-visible">
          <motion.div
            key={selectedAnimal.id + '-' + speed + '-' + (isChewing ? 'chewing' : 'walking')}
            initial={{ x: isChewing ? '50%' : '-150px' }}
            animate={
              isChewing 
              ? { x: '50%', y: [0, -4, 0] } 
              : { x: '105vw' }
            }
            transition={
              isChewing 
              ? { repeat: Infinity, duration: 0.5 } 
              : { repeat: Infinity, ease: 'linear', duration: speed }
            }
            className="flex items-baseline gap-4 whitespace-nowrap absolute bottom-0 select-none cursor-pointer"
          >
            {/* Farmer/Cowboy indicator */}
            <div className="flex flex-col items-center">
              {isChewing && (
                <span className="text-xs bg-yellow-400 text-black px-2 py-0.5 rounded-full font-bold mb-1 animate-bounce">
                  দারুণ খাচ্ছে! 😋
                </span>
              )}
              <span className="text-5xl md:text-6xl animate-bounce duration-1500">🧑‍🌾</span>
            </div>

            {/* Selected Animal with bounce walk */}
            <div className="relative group flex flex-col items-center">
              {/* Voice popbubble on hover or chewing */}
              <AnimatePresence>
                {(isChewing || isFeeding) && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: -10 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute -top-12 bg-white text-emerald-950 font-extrabold text-xs px-2.5 py-1.5 rounded-xl shadow-lg border border-yellow-400 flex items-center gap-1 z-20"
                  >
                    <Sparkles size={12} className="text-yellow-500 fill-yellow-500" />
                    <span className="capitalize">
                      {selectedAnimal.soundName === 'moo' && 'হাম্বাআআ! 🐄'}
                      {selectedAnimal.soundName === 'bleat' && 'ম্যাঁ ম্যাঁঁঁঁঁঁ! 🐐'}
                      {selectedAnimal.soundName === 'grunt' && 'হুরুম হুরুম! 🐪'}
                      {selectedAnimal.soundName === 'snort' && 'হোঁৎ হোঁৎঁ! 🐃'}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* The Animal Emoji with bouncy custom keyframes */}
              <motion.span 
                animate={{ 
                  y: isChewing ? [0, -3, 0] : [0, -10, 0],
                  rotate: isChewing ? [0, 1, 0, -1, 0] : [0, 4, 0, -4, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: isChewing ? 0.3 : 0.65,
                  ease: 'easeInOut'
                }}
                className="text-6xl md:text-7xl block filter drop-shadow-[0_8px_8px_rgba(0,0,0,0.5)]"
              >
                {selectedAnimal.emoji}
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/* Fence graphics for depth */}
        <div className="absolute bottom-0 left-0 w-full h-3 flex justify-around pointer-events-none opacity-40">
          {Array.from({ length: 12 }).map((_, idx) => (
            <div key={idx} className="w-1 bg-yellow-900 border-t-2 border-yellow-800 h-6" style={{ transform: 'translateY(-12px)' }} />
          ))}
          <div className="absolute bottom-2 left-0 w-full h-1 bg-yellow-950" />
        </div>
      </div>

      {/* Select Tab Panel */}
      <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
        <Sparkles size={14} className="text-yellow-400" />
        পশুর জাত বদল করুন:
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {ANIMALS.map((animal) => {
          const isSelected = selectedAnimal.id === animal.id;
          return (
            <button
              key={animal.id}
              type="button"
              onClick={() => handleAnimalSelect(animal)}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-400 text-white shadow-lg box-glow'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300 hover:text-white'
              }`}
            >
              {/* Highlighting badge */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              )}
              
              <div className="flex items-center gap-3">
                <span className="text-3xl filter drop-shadow-md group-hover:scale-115 transition duration-300 block">
                  {animal.emoji}
                </span>
                <div>
                  <div className="font-bold text-sm leading-tight">{animal.name}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5 font-sans">
                    {animal.soundName === 'moo' && 'হাম্বা 🐄'}
                    {animal.soundName === 'bleat' && 'ম্যাঁ ম্যাঁ 🐐'}
                    {animal.soundName === 'grunt' && 'হুরুম 🐪'}
                    {animal.soundName === 'snort' && 'হোঁৎ হোঁৎ 🐃'}
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-gray-300 mt-2.5 leading-relaxed italic border-t border-white/5 pt-1.5 line-clamp-1">
                {animal.character}
              </p>
            </button>
          );
        })}
      </div>

      {/* Config/Speed Controls */}
      <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Sliders className="text-yellow-400 flex-shrink-0" size={18} />
          <div className="w-full">
            <div className="flex justify-between text-xs text-gray-300 mb-1">
              <span>যাওয়ার স্পিড (সেকেন্ড):</span>
              <span className="font-bold text-yellow-300 font-mono">{speed}s {speed <= 5 ? '(দ্রুত ⚡)' : speed >= 15 ? '(ধীর 🐢)' : '(স্বাভাবিক 🚶)'}</span>
            </div>
            <input
              type="range"
              min="3"
              max="20"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-yellow-400"
            />
          </div>
        </div>

        <div className="text-[11px] text-gray-400 bg-black/30 px-3.5 py-2 rounded-xl border border-white/5 md:max-w-xs">
          💡 <span className="font-semibold text-gray-300">টিপস:</span> পশুকে ঘাস খাওয়ালে সে মাঠের মাঝখানে একটু বিরতি নেয় এবং খুশি হয়ে তার ভাষায় চমৎকার ডাক দেয়!
        </div>
      </div>

      {/* SECTION For Feeding Grass to Someone (Meme Feature requested by User) */}
      <div className="bg-yellow-400 text-black rounded-3xl p-6 border border-yellow-500 shadow-xl mt-6 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 text-7xl select-none opacity-10 pointer-events-none">👬</div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <div>
            <h3 className="text-xl font-black flex items-center gap-2">
              <Laugh size={22} className="text-black" />
              বন্ধুকে ঘাস খাওয়ানোর ফান জোন! 🌿👬
            </h3>
            <p className="text-xs text-black/85 mt-1 font-medium max-w-md">
              আপনার ছাগল বা গরু মার্কেট কোন বন্ধুকে ঘাস খাইয়ে ত্যাগের পবিত্র উৎসবে ফানি শুভেচ্ছা পাঠান ও মজাদার ভিডিওটি উপভোগ করুন!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
            <div className="relative flex-grow">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-black/60 font-black font-sans">বন্ধুর নাম:</span>
              <input
                type="text"
                placeholder="নাম লিখুন..."
                maxLength={20}
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                className="w-full pl-22 pr-4 py-2.5 text-sm bg-white/70 backdrop-blur-md rounded-xl text-black placeholder:text-black/45 focus:outline-none focus:bg-white font-sans font-bold border border-black/10 shadow-inner"
              />
            </div>
            <button
              type="button"
              onClick={handleFriendFeed}
              className="px-5 py-3 bg-slate-950 hover:bg-slate-900 text-white rounded-xl font-black text-xs sm:text-sm shadow-md hover:shadow-black/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95"
            >
              <span>🌿</span>
              {friendName.trim() ? `${friendName}-কে ঘাস খাওয়ান!` : 'ঘাস খাওয়ান!'}
            </button>
          </div>
        </div>
      </div>

      {/* Friend Feed Modal Overlay */}
      <AnimatePresence>
        {showFriendFeedModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setShowFriendFeedModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-zinc-950 border border-yellow-400/50 rounded-3xl p-6 max-w-lg w-full shadow-[0_0_50px_rgba(253,224,71,0.15)] relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setShowFriendFeedModal(false)}
                className="absolute top-4 right-4 p-1.5 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition cursor-pointer z-50"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="text-center mb-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-xs text-yellow-300 font-bold mb-3 font-sans">
                  🍿 কন্টেন্ট রিকমেন্ডেশন ডায়েরি
                </div>
                <h3 className="text-xl md:text-2xl font-black font-display text-white text-glow flex items-center justify-center gap-2">
                  🌿 {friendName.trim() ? `${friendName}-এর ঘাস খাওয়ার ভিডিও!` : 'কাউকে ঘাস খাওয়ানো!' } 😂
                </h3>
                <p className="text-xs text-gray-400 mt-1.5">
                  গরু মহিষ সব একাকার! আপনার অবগতির জন্য ঘাস খাওয়ানোর ফানি দৃশ্যটি স্ক্রিনে হাজির:
                </p>
              </div>

              {/* Procedural Chew Audio State feedback */}
              <div className="bg-yellow-400/10 border border-yellow-400/25 p-3 rounded-2xl mb-4 text-center">
                <p className="text-xs text-yellow-200 flex items-center justify-center gap-2 font-bold animate-pulse">
                  🔊 {friendName.trim() ? `${friendName}` : 'বন্ধুটি'} এখন মনের সুখে ঘাস মড়মড় করে চিবুচ্ছে! (Crunch! Crunch!)
                </p>
              </div>

              {/* TikTok Iframe Player Mockup / Direct load */}
              <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 bg-black flex flex-col items-center justify-center py-6 px-4 text-center">
                
                {/* TikTok Embedded responsive Container */}
                <iframe
                  src="https://www.tiktok.com/embed/v2/ZS9YwjQGX6v1P-NQXe8"
                  className="absolute inset-0 w-full h-full border-0 rounded-2xl z-10"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="TikTok video player"
                />

                {/* Styled Backup Banner if iframe is blocked by frame sandbox */}
                <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex flex-col justify-center items-center p-4">
                  <span className="text-4xl mb-2 animate-bounce">🎬</span>
                  <div className="text-xs text-glow font-bold text-yellow-300 uppercase tracking-widest font-sans mb-1">TIKTOK MEME STREAM</div>
                  <h4 className="text-sm font-extrabold text-white">"কাউকে ঘাস খাওয়ানোর ঐতিহাসিক মুহূর্ত"</h4>
                  <p className="text-[10px] text-gray-400 max-w-xs mt-1 leading-normal">
                    টিকটক নিরাপত্তা বিধির কারণে সরাসরি আইফ্রেমে লোড না হলে নিচের বোতামটি চেপে সরাসরি উপভোগ করুন!
                  </p>
                </div>

              </div>

              {/* Highlighted Launch CTA Button */}
              <div className="mt-5 space-y-2.5">
                <a
                  href="https://vm.tiktok.com/ZS9YwjQGX6v1P-NQXe8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 hover:scale-101 hover:shadow-lg hover:shadow-pink-500/10 active:scale-98 transition duration-300 rounded-xl font-black text-xs md:text-sm flex items-center justify-center gap-2 text-white"
                >
                  <Play size={16} className="fill-current" />
                  ভিডিওটি সরাসরি টিকটকে প্লে করুন 🚀
                </a>

                <button
                  type="button"
                  onClick={() => {
                    playCrunchSound();
                  }}
                  className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold font-sans text-gray-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  🔊 ঘাস খাওয়ার সাউন্ড আরেকবার শুনুন! (Crunch Sound)
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
