import React from 'react';
import { motion } from 'framer-motion';
import { Play, Brain, Target, Calculator, Music, Coffee, Grid3X3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const GameCard = ({ title, category, icon: Icon, color, image, link }) => (
  <Link to={link || "#"} className="block">
    <motion.div
      whileTap={{ scale: 0.95 }}
      className="glass-panel p-0 rounded-3xl overflow-hidden relative aspect-[4/5] flex flex-col justify-end shadow-lg"
    >
      <div className={`absolute inset-0 ${color} opacity-80 mix-blend-overlay z-10`} />
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20" />
      
      <div className="relative z-30 p-4">
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 border border-white/30">
          <Icon size={20} className="text-white" />
        </div>
        <h3 className="text-white font-bold text-xl leading-tight mb-1">{title}</h3>
        <p className="text-white/70 text-xs font-medium uppercase tracking-wider">{category}</p>
      </div>
    </motion.div>
  </Link>
);

const Games = () => {
  const games = [
    { 
      title: "Sudoku Classic", 
      category: "Logic", 
      icon: Grid3X3, 
      color: "bg-indigo-500", 
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400",
      link: "/games/sudoku"
    },
    { 
      title: "Chai & Chat", 
      category: "Social", 
      icon: Coffee, 
      color: "bg-orange-500", 
      image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=400" 
    },
    { 
      title: "Bollywood Trivia", 
      category: "Memory", 
      icon: Music, 
      color: "bg-rose-500", 
      image: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80&w=400" 
    },
    { 
      title: "Bubble Pop", 
      category: "Reflexes", 
      icon: Target, 
      color: "bg-blue-500", 
      image: "https://images.unsplash.com/photo-1558486012-817176f84c6d?auto=format&fit=crop&q=80&w=400" 
    },
    { 
      title: "Hisab Kitab", 
      category: "Math", 
      icon: Calculator, 
      color: "bg-emerald-500", 
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400" 
    },
    { 
      title: "Teen Patti Logic", 
      category: "Cards", 
      icon: Brain, 
      color: "bg-purple-500", 
      image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=400" 
    },
  ];

  return (
    <div className="flex flex-col gap-6 pb-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Arcade</h1>
        <p className="text-slate-500">Sharpen your mind, Sharma Ji!</p>
      </motion.div>

      {/* Featured Banner */}
      <div className="glass-panel p-5 rounded-3xl bg-gradient-to-r from-orange-400 to-rose-500 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10">
          <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-2 backdrop-blur-md">
            RECOMMENDED
          </div>
          <h2 className="text-2xl font-bold mb-1">Sudoku Challenge</h2>
          <p className="text-white/90 text-sm mb-4">Beat Aunty Meena's score of 1200!</p>
          <Link to="/games/sudoku" className="inline-block bg-white text-orange-600 px-6 py-2 rounded-xl font-bold text-sm shadow-md">
            Play Now
          </Link>
        </div>
        <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {games.map((game, index) => (
          <GameCard key={index} {...game} />
        ))}
      </div>

      {/* Leaderboard Snippet */}
      <div className="mt-4">
        <h3 className="font-bold text-slate-700 mb-3">Family Leaderboard</h3>
        <div className="glass-panel p-4 rounded-2xl flex items-center gap-4">
          <div className="font-bold text-orange-500 text-xl">#1</div>
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-10 h-10 rounded-full bg-slate-200" alt="You" />
          <div className="flex-1">
            <h4 className="font-bold text-slate-800">You</h4>
            <p className="text-xs text-slate-500">2,450 pts</p>
          </div>
          <Trophy size={20} className="text-yellow-500" />
        </div>
      </div>
    </div>
  );
};

// Simple Trophy Icon helper
const Trophy = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

export default Games;