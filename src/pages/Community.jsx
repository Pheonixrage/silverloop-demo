import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Users, Search, Plus, Phone, ChevronRight, Medal } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import clsx from 'clsx';

const GroupCard = ({ group, t, darkMode }) => (
  <motion.div
    whileTap={{ scale: 0.98 }}
    className={clsx(
      "glass-panel p-4 rounded-3xl flex items-center justify-between mb-3 shadow-sm",
      darkMode ? "bg-slate-800/40" : ""
    )}
  >
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-2xl shadow-inner">
        {group.icon}
      </div>
      <div>
        <h3 className={clsx("font-black text-sm", darkMode ? "text-white" : "text-slate-800")}>{group.name}</h3>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{group.members} {t.members}</p>
      </div>
    </div>
    <div className="flex flex-col items-end">
      <div className="flex items-center gap-1 text-orange-500 font-black italic">
        <Trophy size={14} />
        <span>#{group.rank}</span>
      </div>
      <p className="text-[9px] text-slate-400 font-black uppercase">{t.your_rank}</p>
    </div>
  </motion.div>
);

const FriendItem = ({ friend, onSelect, t, darkMode }) => (
  <motion.div
    layout
    whileTap={{ scale: 0.98 }}
    onClick={() => onSelect(friend)}
    className={clsx(
      "flex items-center gap-4 p-4 transition-colors cursor-pointer border-b last:border-0",
      darkMode ? "hover:bg-white/5 border-slate-700/50" : "hover:bg-white/30 border-slate-100"
    )}
  >
    <div className="relative">
      <img src={friend.avatar} alt={friend.name} className="w-12 h-12 rounded-full bg-slate-200 border-2 border-white shadow-md" />
      {friend.status.includes("Online") || friend.status.includes("Playing") ? (
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm"></div>
      ) : null}
    </div>
    <div className="flex-1">
      <h4 className={clsx("font-black text-sm", darkMode ? "text-slate-200" : "text-slate-800")}>{friend.name}</h4>
      <p className={clsx("text-[10px] font-bold", friend.status.includes("Playing") ? "text-indigo-400" : "text-slate-500")}>
        {friend.status}
      </p>
    </div>
    <div className="text-right">
      <span className={clsx("font-black italic text-base block", darkMode ? "text-slate-100" : "text-slate-700")}>{friend.score}</span>
      <span className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">PTS</span>
    </div>
  </motion.div>
);

const ProfileModal = ({ friend, onClose, t, darkMode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-md"
    onClick={onClose}
  >
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className={clsx(
        "w-full h-[85%] rounded-t-[3rem] p-6 shadow-2xl overflow-y-auto border-t border-white/20",
        darkMode ? "bg-slate-900" : "bg-white/95"
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-10 opacity-30" />
      
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full p-1.5 bg-gradient-to-tr from-indigo-500 to-purple-500 mb-4 shadow-xl">
          <img src={friend.avatar} alt={friend.name} className="w-full h-full rounded-full bg-white border-2 border-white" />
        </div>
        <h2 className={clsx("text-3xl font-black leading-tight", darkMode ? "text-white" : "text-slate-800")}>{friend.name}</h2>
        <p className="text-indigo-400 font-bold uppercase tracking-widest text-xs mt-1">{friend.score} Lifetime Points</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className={clsx("p-5 rounded-[2rem] text-center shadow-sm", darkMode ? "bg-slate-800" : "bg-orange-50")}>
          <p className="text-[10px] text-slate-500 font-black uppercase mb-1">{t.global_rank}</p>
          <p className="text-2xl font-black italic text-orange-500">#1,240</p>
        </div>
        <div className={clsx("p-5 rounded-[2rem] text-center shadow-sm", darkMode ? "bg-slate-800" : "bg-emerald-50")}>
          <p className="text-[10px] text-slate-500 font-black uppercase mb-1">{t.win_rate}</p>
          <p className="text-2xl font-black italic text-emerald-500">68%</p>
        </div>
      </div>

      <h3 className={clsx("font-black mb-4 px-2", darkMode ? "text-slate-300" : "text-slate-800")}>{t.vs_you}</h3>
      <div className={clsx("glass-panel p-6 rounded-3xl mb-8 shadow-inner", darkMode ? "bg-slate-800/40" : "")}>
        <div className="flex justify-between text-xs font-black text-slate-500 mb-4 uppercase tracking-widest">
          <span>YOU</span>
          <span className="opacity-30">VS</span>
          <span>{friend.name.split(' ')[0]}</span>
        </div>
        
        <div className="space-y-5">
          <div>
            <div className="flex justify-between text-[10px] font-black text-slate-400 mb-2 uppercase">
              <span>Memory Match</span>
              <span className="text-indigo-400">+12 pts</span>
            </div>
            <div className="flex h-3 rounded-full overflow-hidden bg-slate-200 shadow-inner">
              <div className="w-[65%] bg-indigo-500"></div>
              <div className="w-[35%] bg-rose-400"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[10px] font-black text-slate-400 mb-2 uppercase">
              <span>Sudoku Classic</span>
              <span className="text-rose-400">-50 pts</span>
            </div>
            <div className="flex h-3 rounded-full overflow-hidden bg-slate-200 shadow-inner">
              <div className="w-[30%] bg-indigo-500"></div>
              <div className="w-[70%] bg-rose-400"></div>
            </div>
          </div>
        </div>
      </div>

      <button className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-black shadow-xl active:scale-95 transition-transform uppercase tracking-widest">
        {t.challenge_now}
      </button>

    </motion.div>
  </motion.div>
);

const Community = () => {
  const { t, darkMode } = useAppContext();
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [activeTab, setActiveTab] = useState('groups');

  const GROUPS = [
    { id: 1, name: "The Maluchurus", members: 8, rank: 2, icon: "🏡" },
    { id: 2, name: "Morning Walk Gang", members: 12, rank: 1, icon: "🚶" },
    { id: 3, name: "Chess Club", members: 4, rank: 4, icon: "♟️" },
  ];

  const FRIENDS = [
    { id: 1, name: "Grandma Sarah", score: 2450, status: "Playing...", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
    { id: 2, name: "Uncle Raj", score: 2100, status: "Online", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Raj" },
    { id: 4, name: "Dr. Anjali", score: 3200, status: "Online", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali" },
    { id: 6, name: "Sister Maya", score: 2900, status: "Playing...", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya" },
  ];

  return (
    <div className="flex flex-col min-h-full pb-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className={clsx("text-3xl font-black leading-tight", darkMode ? "text-white" : "text-slate-800")}>{t.community}</h1>
        <button className="w-12 h-12 rounded-2xl bg-indigo-600 shadow-xl flex items-center justify-center text-white">
          <Plus size={28} />
        </button>
      </div>

      <div className={clsx("flex p-1.5 rounded-[1.5rem] mb-8 border backdrop-blur-sm shadow-inner", darkMode ? "bg-slate-800/40 border-slate-700" : "bg-white/40 border-white/60")}>
        <button 
          onClick={() => setActiveTab('groups')}
          className={clsx(
            "flex-1 py-3 text-xs font-black rounded-[1rem] transition-all uppercase tracking-widest",
            activeTab === 'groups' ? "bg-white shadow-md text-indigo-600" : "text-slate-500"
          )}
        >
          {t.groups}
        </button>
        <button 
          onClick={() => setActiveTab('friends')}
          className={clsx(
            "flex-1 py-3 text-xs font-black rounded-[1rem] transition-all uppercase tracking-widest",
            activeTab === 'friends' ? "bg-white shadow-md text-indigo-600" : "text-slate-500"
          )}
        >
          {t.friends}
        </button>
      </div>

      {activeTab === 'groups' && (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="mb-10">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-2">{t.pinned_groups}</h2>
            {GROUPS.map(group => <GroupCard key={group.id} group={group} t={t} darkMode={darkMode} />)}
          </div>
          
          <div className={clsx("p-10 rounded-[2.5rem] flex flex-col items-center text-center border-2 border-dashed shadow-none", darkMode ? "bg-transparent border-slate-700/50" : "bg-transparent border-slate-200")}>
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-4 text-indigo-400 shadow-inner">
              <Users size={36} />
            </div>
            <h3 className={clsx("font-black text-lg mb-2", darkMode ? "text-slate-200" : "text-slate-800")}>{t.create_circle}</h3>
            <p className="text-xs text-slate-500 font-bold mb-6">{t.start_group}</p>
            <button className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs shadow-lg uppercase tracking-widest">
              {t.start_group}
            </button>
          </div>
        </motion.div>
      )}

      {activeTab === 'friends' && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="relative mb-8 shadow-sm">
            <Search className="absolute left-5 top-4.5 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder={t.search_contacts} 
              className={clsx(
                "w-full pl-14 pr-6 py-4 rounded-2xl border-none outline-none font-bold text-sm",
                darkMode ? "bg-slate-800 text-white placeholder:text-slate-500" : "bg-white/60 text-slate-800 placeholder:text-slate-400"
              )}
            />
          </div>

          <div className={clsx("rounded-[2.5rem] overflow-hidden shadow-lg border mb-8", darkMode ? "bg-slate-800/40 border-slate-700/50" : "bg-white/60 border-white")}>
            <div className={clsx("p-4 border-b", darkMode ? "bg-white/5 border-slate-700" : "bg-indigo-50/50 border-indigo-100")}>
              <p className="text-[10px] font-black text-indigo-400 text-center uppercase tracking-widest italic">🏆 {t.weekly_rank}</p>
            </div>
            {FRIENDS.sort((a,b) => b.score - a.score).map((friend, i) => (
              <FriendItem key={friend.id} friend={friend} onSelect={setSelectedFriend} t={t} darkMode={darkMode} />
            ))}
          </div>

          <button className={clsx("w-full py-5 rounded-[2rem] flex items-center justify-center gap-3 font-black shadow-xl uppercase tracking-widest text-sm", darkMode ? "bg-slate-800 text-white" : "bg-white text-slate-700")}>
            <Phone size={20} className="text-indigo-500" />
            {t.invite_phone}
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {selectedFriend && (
          <ProfileModal friend={selectedFriend} onClose={() => setSelectedFriend(null)} t={t} darkMode={darkMode} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Community;