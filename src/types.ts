/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GreetingTemplate {
  id: string;
  text: string;
  language: 'bn' | 'en';
}

export interface CardStylePreset {
  id: string;
  name: string;
  bgGradient: string;
  borderClass: string;
  textColor: string;
  accentColor: string;
}

export interface FunLine {
  id: number;
  text: string;
  votes: number;
}

export interface Animal {
  id: string;
  name: string;
  emoji: string;
  soundName: 'moo' | 'bleat' | 'grunt' | 'snort';
  character: string;
  speedMultiplier: number;
  bgStyle: string;
}

export const GREETING_TEMPLATES: GreetingTemplate[] = [
  {
    id: 't1',
    text: 'ত্যাগের মহিমায় ভরে উঠুক সবার জীবন, সুখ, শান্তি আর ভালোবাসায় কাটুক ঈদের প্রতিটি মুহূর্ত। ঈদ মোবারক!',
    language: 'bn',
  },
  {
    id: 't2',
    text: 'কোরবানির এই পবিত্র দিনে আপনার সকল ত্যাগ কবুল হোক এবং জীবন ভরে উঠুক অফুরন্ত সুন্দর ঈদ খুশিতে।',
    language: 'bn',
  },
  {
    id: 't3',
    text: 'ঈদের অবিল আনন্দ ছড়িয়ে পড়ুক সবার মাঝে। আপনার ও আপনার পরবারের সবার জন্য রইল পবিত্র ঈদুল আযহার আন্তরিক শুভেচ্ছা।',
    language: 'bn',
  },
  {
    id: 't4',
    text: 'ত্যাগের শিক্ষায় দীক্ষিত হোক আমাদের মন। হিংসা, বিদ্বেষ ও অহংকার ভুলে হাসিমুখে কাটুক আজকের ঈদ উৎসব। ঈদ মোবারক!',
    language: 'bn',
  },
  {
    id: 't5',
    text: 'May the divine blessings of Eid-ul-Adha bring peace, prosperity, and joy to your life. Eid Mubarak!',
    language: 'en',
  },
  {
    id: 't6',
    text: 'Wishing you a blessed Eid filled with love, laughter, sacrifice, and endless spiritual growth.',
    language: 'en',
  },
];

export const STYLE_PRESETS: CardStylePreset[] = [
  {
    id: 'preset-emerald',
    name: 'মরু ফেস্টিভ সবুজ',
    bgGradient: 'from-emerald-950 via-emerald-800 to-teal-950',
    borderClass: 'border-emerald-400/30',
    textColor: 'text-amber-100',
    accentColor: 'text-yellow-300 bg-emerald-500/20 border-emerald-400/40',
  },
  {
    id: 'preset-crimson',
    name: 'মখমল লাল শাহি',
    bgGradient: 'from-rose-950 via-red-900 to-burgundy-950',
    borderClass: 'border-rose-500/30',
    textColor: 'text-rose-50',
    accentColor: 'text-yellow-300 bg-rose-500/20 border-rose-400/40',
  },
  {
    id: 'preset-royal',
    name: 'শাহি গোল্ড ও ভায়োলেট',
    bgGradient: 'from-violet-950 via-purple-900 to-indigo-950',
    borderClass: 'border-orange-400/30',
    textColor: 'text-stone-100',
    accentColor: 'text-amber-300 bg-purple-500/20 border-orange-300/40',
  },
];

export const FUN_LINES: FunLine[] = [
  {
    id: 1,
    text: '“গরু বলছে: ভাই একটু আস্তে হাঁটেন, মনে হচ্ছে আজকে আমার VIP প্রোগ্রাম আছে!” 🐄😂',
    votes: 142,
  },
  {
    id: 2,
    text: '“হাটের সবচেয়ে হাসিখুশি গরুটিকে কিনে আনলাম, এখন দেখি সে সারাদিন ঘরের কোণে বসে মোবাইল ঘাটতে চায়!” 📱🐂',
    votes: 98,
  },
  {
    id: 3,
    text: '“কুরবানির হাটে গিয়ে গরুর সাথে দামাদামি করতে করতে একপর্যায়ে মনে হচ্ছিল আমি নিজেই যেন নিলামে উঠে গেছি!” 💸🤠',
    votes: 115,
  },
  {
    id: 4,
    text: '“গরু বাসায় আসার পর থেকে আমাদের বিড়ালের ভাবসাব এমন, যেন সে এই বাড়ির পরম হেড সিকিউরিটি ইন-চার্জ!” 🐈‍⬛🐄',
    votes: 76,
  },
  {
    id: 5,
    text: '“ঈদের দিন মাংস কাটতে বসার পর নিজেকে হঠাৎ কোনো জটিল কার্ডিওভাসকুলার অপারেশন থিয়েটারের মস্ত বড় সার্জন ডাক্তার মনে হয়!” 🩺🍖',
    votes: 210,
  },
  {
    id: 6,
    text: '“হাটের খাসির ভাব দেখে মনে হাসছে, সে যেন বলছে: ভাই, অন্য খাসিদের বলেন আমি কিন্তু স্পেশাল ভিআইপি ক্যাটাগরির!” 🐐👑',
    votes: 89,
  },
  {
    id: 7,
    text: '“আজকে সকাল বেলা গরু হাত থেকে ছুটে যে গতিতে দৌড় দিলো, উসাইন বোল্টও পাশে থাকলে রিটায়ারমেন্ট ঘোষণা করত!” 🏃‍♂️💨',
    votes: 184,
  },
];

export const ANIMALS: Animal[] = [
  {
    id: 'cow-brown',
    name: 'লাল টুকটুকে গরু',
    emoji: '🐄',
    soundName: 'moo',
    character: 'বিরাট সাইজ, শান্ত মন, কিন্তু খেতে দিলে রাজা!',
    speedMultiplier: 1.0,
    bgStyle: 'from-amber-600/20 to-yellow-500/10 border-amber-500/30',
  },
  {
    id: 'goat',
    name: 'কালো তোতাপুরী খাসি',
    emoji: '🐐',
    soundName: 'bleat',
    character: 'ছটফটে মেজাজ, লাফানো জাদুকর, ফুল স্পিড চঞ্চল!',
    speedMultiplier: 1.6,
    bgStyle: 'from-neutral-600/20 to-neutral-500/10 border-neutral-500/30',
  },
  {
    id: 'camel',
    name: 'রাজস্থানি মরু উট',
    emoji: '🐪',
    soundName: 'grunt',
    character: 'রাজকীয় ধীর হাঁটা, শান্ত চোখের মরুভূমির জাহাজ!',
    speedMultiplier: 0.7,
    bgStyle: 'from-orange-600/20 to-amber-500/10 border-orange-500/30',
  },
  {
    id: 'buffalo',
    name: ' কালো গর্জন মহিষ',
    emoji: '🐃',
    soundName: 'snort',
    character: 'অসীম শক্তি, ভারী কদম, কড়া চ্যালেঞ্জের বস!',
    speedMultiplier: 1.2,
    bgStyle: 'from-slate-700/20 to-zinc-500/10 border-slate-500/30',
  }
];
