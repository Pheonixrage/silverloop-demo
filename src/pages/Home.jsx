import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Activity, Heart, ChevronRight, Zap, Target, Flame, Settings as SettingsIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ActionCard = ({ title, subtitle, icon: Icon, color, delay, highlight }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className={`glass-panel p-5 rounded-3xl mb-4 relative overflow-hidden group cursor-pointer active:scale-95 transition-transform ${highlight ? 'border-indigo-300 ring-2 ring-indigo-200 ring-offset-2 ring-offset-transparent' : ''}`}
  >
    <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-20 ${color}`} />
    <div className="flex items-center justify-between relative z-10">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-2xl ${color} bg-opacity-20 text-white shadow-inner`}>
          <Icon size={24} className="text-gray-800" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>
      <ChevronRight className="text-gray-400 group-hover:text-gray-600 transition-colors" />
    </div>
  </motion.div>
);

const Home = () => {
  const { t } = useAppContext();

  return (
    <div className="flex flex-col gap-6 pb-20">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex justify-between items-end"
      >
        <div>
          <p className="text-slate-500 font-medium text-sm">{t.greeting}</p>
          <h1 className="text-3xl font-black text-slate-800 leading-tight">{t.user}</h1>
        </div>
        <div className="flex gap-2">
           <Link to="/settings" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-500">
             <SettingsIcon size={20} />
           </Link>
           <Link to="/community">
            <div className="w-12 h-12 rounded-full bg-indigo-100 border-2 border-white shadow-md overflow-hidden relative">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
          </Link>
        </div>
      </motion.div>

      {/* Hero Widget: Daily Streak */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2.5rem] p-6 text-white shadow-xl relative overflow-hidden shrink-0"
      >
        <div className="absolute top-0 right-0 p-32 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-indigo-100 font-bold uppercase tracking-widest text-[10px]">{t.streak}</p>
              <h2 className="text-4xl font-black italic">12 {t.days}</h2>
            </div>
            <Flame className="text-orange-300 animate-pulse" size={40} />
          </div>
          
          <div className="w-full bg-black/20 h-2.5 rounded-full mb-2 overflow-hidden shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '80%' }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-full bg-white/90 rounded-full" 
            />
          </div>
          <p className="text-xs text-indigo-100 font-medium">{t.streak_desc}</p>
        </div>
      </motion.div>

      {/* Live Feed Section */}
      <div>
        <h2 className="text-lg font-black text-slate-800 mb-4 px-1 flex items-center gap-2">
          <Zap size={18} className="text-amber-500 fill-amber-500" />
          {t.live_challenges}
        </h2>
        
        <div className="flex gap-4 overflow-x-auto pb-6 -mx-6 px-6 snap-x">
          {[1, 2, 3].map((_, i) => (
            <motion.div 
              key={i} 
              whileTap={{ scale: 0.98 }}
              className="snap-center shrink-0 w-64 glass-panel p-5 rounded-[2.5rem] relative overflow-hidden bg-white/60 border-indigo-100 shadow-lg"
            >
               <div className="flex items-center gap-3 mb-4">
                 <div className="relative">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i === 0 ? 'Sarah' : i === 1 ? 'Raj' : 'Maya'}`} className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm" alt="Friend" />
                   <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                 </div>
                 <div>
                   <p className="text-xs font-black text-slate-800 leading-tight">
                     {i === 0 ? 'Sarah' : i === 1 ? 'Raj' : 'Maya'}
                   </p>
                   <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-tighter">Sudoku Duel</p>
                 </div>
               </div>
               <p className="text-sm text-slate-600 mb-4 font-bold">{t.accept} <span className="text-slate-900 underline decoration-indigo-300">Beat 1,500 pts</span></p>
               <Link to="/games/sudoku" className="w-full block text-center text-xs font-black text-white bg-indigo-600 py-3 rounded-xl shadow-md active:bg-indigo-700 transition-colors uppercase">
                 {t.accept}
               </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Jump Back In */}
      <div>
        <h2 className="text-lg font-black text-slate-800 mb-4 px-1">{t.jump_back}</h2>
        <ActionCard 
          title={t.brain_gym} 
          subtitle={t.brain_gym_desc} 
          icon={Target} 
          color="bg-orange-400" 
          delay={0.2} 
          highlight={true}
        />
        <ActionCard 
          title={t.health_check} 
          subtitle={t.health_check_desc} 
          icon={Heart} 
          color="bg-rose-400" 
          delay={0.3} 
        />
        <ActionCard 
          title={t.practice_math} 
          subtitle={t.practice_math_desc} 
          icon={Activity} 
          color="bg-emerald-400" 
          delay={0.4} 
        />
      </div>
    </div>
  );
};

export default Home;