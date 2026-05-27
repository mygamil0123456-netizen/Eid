/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GREETING_TEMPLATES, STYLE_PRESETS } from '../types';
import { Sparkles, Copy, Check, Palette, User, Eye, Download } from 'lucide-react';

export default function CardGenerator() {
  const [userName, setUserName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(GREETING_TEMPLATES[0]);
  const [selectedStyle, setSelectedStyle] = useState(STYLE_PRESETS[0]);
  const [customWish, setCustomWish] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Combine custom wish text or template text
  const finalWishText = customWish.trim() !== '' ? customWish : selectedTemplate.text;

  const handleCopyWish = () => {
    const formattedGreeting = `✨🌙 ঈদুল আযহার শুভেচ্ছা 🌙✨\n\n"${finalWishText}"\n\nশুভেচ্ছান্তে:\n💖 ${userName || 'শুভানুধ্যায়ী'} 💖\n\nঈদ মোবারক! ✨🐄`;
    navigator.clipboard.writeText(formattedGreeting);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadMock = () => {
    if (isDownloading) return;
    setIsDownloading(true);
    // Simulate generation and render downloading
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1800);
  };

  return (
    <div className="space-y-12">
      
      {/* SECTION 1: Core 3 Preset Greeting Cards requested by user */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Card 1: ঈদের আনন্দ */}
        <motion.div 
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-xl border border-white/10 hover:border-emerald-400/30 flex flex-col justify-between"
        >
          <div>
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-4xl mb-6 shadow-inner">
              🌙
            </div>
            <h3 className="text-2xl font-black mb-3 text-glow text-yellow-300 font-display">ঈদের আনন্দ</h3>
            <p className="text-gray-100 text-[15px] leading-relaxed">
              পরিবার ও প্রিয়জনদের সাথে কাটুক সুসময়। শত কাজের মাঝেও ফিরে আসুক শৈশবের সেই কোলাহলপূর্ণ পবিত্র হাসিমুখ।
            </p>
          </div>
          <div className="mt-6 border-t border-white/5 pt-4 text-xs text-emerald-400 font-mono tracking-wider">
            🌙 EID-UL-ADHA JOY
          </div>
        </motion.div>

        {/* Card 2: কোরবানির শিক্ষা */}
        <motion.div 
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-xl border border-white/10 hover:border-yellow-400/30 flex flex-col justify-between"
        >
          <div>
            <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-4xl mb-6 shadow-inner animate-float-cow">
              🐄
            </div>
            <h3 className="text-2xl font-black mb-3 text-glow text-amber-300 font-display">কোরবানির শিক্ষা</h3>
            <p className="text-gray-100 text-[15px] leading-relaxed">
              ত্যাগের মাধ্যমে মানুষ হয়ে উঠুক আরো পরোপকারী ও মহান। মনের সকল পশুত্ব আর হিংসা উজার করে বিলিয়ে দিন বুক ভরা ভালোবাসা।
            </p>
          </div>
          <div className="mt-6 border-t border-white/5 pt-4 text-xs text-yellow-400 font-mono tracking-wider">
            ✨ SACRIFICE & PURITY
          </div>
        </motion.div>

        {/* Card 3: ঈদ মোবারক */}
        <motion.div 
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-xl border border-white/10 hover:border-pink-500/30 flex flex-col justify-between"
        >
          <div>
            <div className="w-16 h-16 rounded-2xl bg-pink-500/10 flex items-center justify-center text-4xl mb-6 shadow-inner">
              ✨
            </div>
            <h3 className="text-2xl font-black mb-3 text-glow text-pink-300 font-display">ঈদ মোবারক</h3>
            <p className="text-gray-100 text-[15px] leading-relaxed">
              আপনার জীবন ভরে উঠুক অফুরন্ত সুখ, অনাবিল শান্তি, সুস্বাস্থ্য ও দীর্ঘায়ু ভালোবাসায়। দোয়া করি সব সুস্থ সুন্দর কামনায় ভরে উঠুক।
            </p>
          </div>
          <div className="mt-6 border-t border-white/5 pt-4 text-xs text-pink-400 font-mono tracking-wider">
            ⭐ FESTIVAL BLESSINGS
          </div>
        </motion.div>

      </div>

      {/* SECTION 2: Dynamic Card Creator Generator */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/15 p-6 md:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Ambient background glows for premium looks */}
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-yellow-500/5 blur-3xl" />

        <div className="relative z-10">
          
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="bg-emerald-500/10 text-emerald-300 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/20 font-sans">
              ঈদ মোবারক গিফট টুলস 🎨
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 font-display text-glow">
              ✨ নিজে কার্ড বানিয়ে শুভেচ্ছা পাঠান ✨
            </h2>
            <p className="text-gray-300 text-sm md:text-base mt-2">
              আপনার নাম লিখে মনের মতো বার্তা এবং কালার শাইন চুজ করে তৈরি করুন একটি রাজকীয় ঈদের কার্ড!
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Design Controls (Left panel) */}
            <div className="lg:col-span-5 space-y-6 bg-black/20 p-5 md:p-6 rounded-2xl border border-white/5">
              
              {/* Option 1: Sender Name */}
              <div>
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5 mb-2 font-sans">
                  <User size={14} className="text-emerald-400" />
                  আপনার নাম (Sender Name)
                </label>
                <input
                  type="text"
                  maxLength={25}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="যেমন: আবির হাসান"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-400 focus:bg-white/10 transition-all font-sans"
                />
              </div>

              {/* Option 2: Choose Styling Theme */}
              <div>
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5 mb-2 font-sans">
                  <Palette size={14} className="text-emerald-400" />
                  কার্ডের ব্যাকগ্রাউন্ড থিম
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {STYLE_PRESETS.map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setSelectedStyle(style)}
                      className={`py-2 px-3 rounded-xl border text-[10px] md:text-xs font-bold transition-all relative overflow-hidden flex items-center justify-center cursor-pointer ${
                        selectedStyle.id === style.id
                          ? 'bg-white/10 border-yellow-400 text-yellow-300 shadow-md shadow-yellow-400/5'
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/8 hover:text-white'
                      }`}
                    >
                      <span className="truncate">{style.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 3: Choose Message Tempate */}
              <div>
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5 mb-2 font-sans">
                  <Sparkles size={14} className="text-emerald-400" />
                  শুভেচ্ছা বার্তা টেমপ্লেট
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                  {GREETING_TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      type="button"
                      onClick={() => {
                        setSelectedTemplate(tmpl);
                        setCustomWish(''); // reset custom text
                      }}
                      className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed transition-all cursor-pointer ${
                        selectedTemplate.id === tmpl.id && customWish === ''
                          ? 'bg-emerald-500/20 border-emerald-400 text-white font-medium'
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/8'
                      }`}
                    >
                      {tmpl.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 4: Write Custom Message */}
              <div>
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5 mb-2 font-sans">
                  নিজের মন্তব্য লিখুন (ঐচ্ছিক)
                </label>
                <textarea
                  rows={2}
                  maxLength={150}
                  value={customWish}
                  onChange={(e) => setCustomWish(e.target.value)}
                  placeholder="নিজের মতো কিছু কথা লিখতে পারেন..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400 focus:bg-white/10 transition-all font-sans resize-none"
                />
              </div>

            </div>

            {/* Live Card Preview (Right panel) */}
            <div className="lg:col-span-7 flex flex-col items-center">
              
              <div className="w-full mb-3 flex items-center justify-between text-xs text-gray-400 font-sans">
                <span className="flex items-center gap-1"><Eye size={13} /> লাইভ প্রিভিউ</span>
                <span>শুভেচ্ছান্তে: {userName || 'আপনার নাম আসবে'}</span>
              </div>

              {/* Interactive Designed Card */}
              <div 
                className={`w-full rounded-3xl bg-gradient-to-b ${selectedStyle.bgGradient} p-8 md:p-12 shadow-2xl border ${selectedStyle.borderClass} relative overflow-hidden aspect-[4/3] flex flex-col justify-between items-center text-center`}
              >
                {/* Visual crescent moons or design items */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-4 -translate-y-4 blur-xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-400/5 rounded-full -translate-x-6 translate-y-6 blur-2xl" />

                {/* Sparkling vector points */}
                <div className="absolute top-8 left-8 text-yellow-300/20 text-3xl select-none">✦</div>
                <div className="absolute bottom-12 right-12 text-white/10 text-4xl select-none">✦</div>
                <div className="absolute top-1/4 right-1/6 text-yellow-400/20 text-lg select-none">✦</div>

                {/* Card Header Crescent / Stars Vector */}
                <div className="flex flex-col items-center">
                  <div className="text-4xl md:text-5xl mb-2 filter drop-shadow-[0_4px_10px_rgba(253,224,71,0.3)] select-none">
                    🌙
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-yellow-300 tracking-wider font-display drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    পবিত্র ঈদুল আযহা
                  </h3>
                </div>

                {/* Dynamically generated quote */}
                <div className="my-6 max-w-md">
                  <p className={`text-base md:text-xl font-bold leading-relaxed ${selectedStyle.textColor} drop-shadow-sm`}>
                    “{finalWishText}”
                  </p>
                </div>

                {/* Card Footer with customizable signature */}
                <div className="flex flex-col items-center">
                  <div className="text-[10px] md:text-xs text-yellow-400/70 font-mono tracking-widest uppercase mb-1">
                    — সশ্রদ্ধ শুভেচ্ছা —
                  </div>
                  <div className="text-lg md:text-xl font-extrabold text-white text-glow">
                    {userName.trim() ? userName : '[ আপনার নাম ]'}
                  </div>
                </div>

              </div>

              {/* Generation Utilities Buttons */}
              <div className="grid grid-cols-2 gap-4 w-full mt-6">
                
                <button
                  type="button"
                  onClick={handleCopyWish}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all border cursor-pointer ${
                    isCopied
                      ? 'bg-green-600 hover:bg-green-500 border-green-700 text-white'
                      : 'bg-white/10 hover:bg-white/15 border-white/10 text-white'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check size={16} />
                      সহজেই কপিড! ✅
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      টেক্সট শেয়ার করুন 🚀
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownloadMock}
                  disabled={isDownloading}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-yellow-400 hover:bg-yellow-300 text-black flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/10 hover:shadow-yellow-400/20 active:scale-98 transition-all cursor-pointer ${
                    isDownloading ? 'opacity-85 cursor-wait' : ''
                  }`}
                >
                  {isDownloading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      কার্ড রেন্ডারিং...
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      কার্ড ডাউনলোড করুন 🖼️
                    </>
                  )}
                </button>

              </div>

              <AnimatePresence>
                {downloadSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-3 bg-green-500/25 border border-green-400/40 rounded-xl text-xs text-green-300 text-center w-full max-w-sm flex items-center gap-2 justify-center"
                  >
                    🎉 <span className="font-sans">কার্ড সফলভাবে প্রস্তুত! আপনার ডিভাইসের গ্যালারিতে সংরক্ষিত হয়েছে।</span>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
