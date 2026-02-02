import React from 'react';
import { motion } from 'framer-motion';
import { Play, Brain, Target, Calculator, Music, Coffee, Grid3X3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import clsx from 'clsx';

const GameCard = ({ title, category, icon: Icon, color, image, link, badge, darkMode }) => (
  <Link to={link || "#"} className="block">
    <motion.div
      whileTap={{ scale: 0.95 }}
      className={clsx(
        "glass-panel p-0 rounded-3xl overflow-hidden relative aspect-[4/5] flex flex-col justify-end shadow-lg",
        darkMode ? "border-white/10" : "border-white/20"
      )}
    >
      <div className={`absolute inset-0 ${color} opacity-80 mix-blend-overlay z-10`} />
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-20" />
      
      {badge && (
        <div className="absolute top-3 right-3 z-40 bg-orange-500 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg border border-white/20 uppercase tracking-tighter">
          {badge}
        </div>
      )}

      <div className="relative z-30 p-4">
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 border border-white/30">
          <Icon size={20} className="text-white" />
        </div>
        <h3 className="text-white font-bold text-xl leading-tight mb-1">{title}</h3>
        <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest">{category}</p>
      </div>
    </motion.div>
  </Link>
);

const Games = () => {
  const { t, darkMode } = useAppContext();

  const games = [
    { 
      title: t.game_sudoku, 
      category: t.cat_logic, 
      icon: Grid3X3, 
      color: "bg-indigo-600", 
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400",
      link: "/games/sudoku",
      badge: t.live_challenges
    },
    { 
      title: t.game_chai, 
      category: t.cat_social, 
      icon: Coffee, 
      color: "bg-orange-600", 
      image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=400" 
    },
    { 
      title: t.game_bollywood, 
      category: t.cat_memory, 
      icon: Music, 
      color: "bg-rose-600", 
      image: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80&w=400" 
    },
    { 
      title: t.game_bubble, 
      category: t.cat_reflexes, 
      icon: Target, 
      color: "bg-blue-600", 
      image: "https://images.unsplash.com/photo-1558486012-817176f84c6d?auto=format&fit=crop&q=80&w=400" 
    },
    { 
      title: t.game_hisab, 
      category: t.cat_math, 
      icon: Calculator, 
      color: "bg-emerald-600", 
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400" 
    },
    { 
      title: t.game_teenpatti, 
      category: t.cat_cards, 
      icon: Brain, 
      color: "bg-purple-600", 
      image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=400" 
    },
  ];

  return (
    <div className="flex flex-col gap-6 pb-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className={clsx("text-3xl font-black mb-2", darkMode ? "text-white" : "text-slate-800")}>{t.arcade}</h1>
        <p className={darkMode ? "text-slate-400" : "text-slate-500"}>{t.sharpen}</p>
      </motion.div>

      {/* Featured Banner */}
      <div 
        className="p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl border border-white/20"
        style={{ background: 'linear-gradient(135deg, #FF4D00 0%, #FF0055 100%)' }}
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="px-3 py-1 bg-white text-[#FF4D00] rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm">
              {t.recommended}
            </div>
            <div className="w-2 h-2 bg-white rounded-full animate-ping" />
          </div>
          <h2 className="text-4xl font-black mb-2 leading-tight text-white drop-shadow-md">{t.game_sudoku}</h2>
          <p className="text-white/90 font-bold text-sm mb-6 drop-shadow-sm">{t.beat_meena}</p>
          <Link to="/games/sudoku" className="inline-flex items-center gap-3 bg-white text-[#FF0055] px-10 py-4 rounded-2xl font-black text-base shadow-xl active:scale-95 transition-transform">
            {t.play_now}
            <Play size={18} fill="currentColor" />
          </Link>
        </div>
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {games.map((game, index) => (
          <GameCard key={index} {...game} darkMode={darkMode} />
        ))}
      </div>

      {/* Leaderboard Snippet */}
      <div className="mt-4">
        <h3 className={clsx("font-black mb-3", darkMode ? "text-slate-200" : "text-slate-700")}>{t.weekly_leaderboard}</h3>
        <div className={clsx("p-4 rounded-3xl flex items-center gap-4 glass-panel shadow-sm", darkMode ? "bg-slate-800/50" : "")}>
          <div className="font-black text-orange-500 text-xl italic">#1</div>
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm" alt="You" />
          <div className="flex-1">
            <h4 className={clsx("font-black", darkMode ? "text-white" : "text-slate-800")}>{t.user}</h4>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">2,450 pts</p>
          </div>
          <Trophy size={20} className="text-yellow-500" />
        </div>
      </div>
    </div>
  );
};

const Trophy = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

export default Games;