import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Users, Search, Plus, Phone, ChevronRight, Medal } from 'lucide-react';

// --- Mock Data ---
const GROUPS = [
  { id: 1, name: "The Maluchurus", members: 8, rank: 2, icon: "🏡" },
  { id: 2, name: "Morning Walk Gang", members: 12, rank: 1, icon: "🚶" },
  { id: 3, name: "Chess Club", members: 4, rank: 4, icon: "♟️" },
  { id: 4, name: "College Batch '65", members: 25, rank: 10, icon: "🎓" },
];

const FRIENDS = [
  { id: 1, name: "Grandma Sarah", score: 2450, status: "Playing Wordle...", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
  { id: 2, name: "Uncle Raj", score: 2100, status: "Online", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Raj" },
  { id: 3, name: "Cousin Vinny", score: 1850, status: "Last seen 2h ago", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vinny" },
  { id: 4, name: "Dr. Anjali", score: 3200, status: "Online", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali" },
  { id: 5, name: "Ramesh (Neighbor)", score: 1200, status: "Offline", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ramesh" },
  { id: 6, name: "Sister Maya", score: 2900, status: "Playing Sudoku...", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya" },
  { id: 7, name: "Grandpa Joe", score: 2450, status: "You", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" },
];

// --- Components ---

const GroupCard = ({ group }) => (
  <motion.div
    whileTap={{ scale: 0.98 }}
    className="glass-panel p-4 rounded-2xl flex items-center justify-between mb-3"
  >
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-2xl shadow-sm">
        {group.icon}
      </div>
      <div>
        <h3 className="font-bold text-slate-800">{group.name}</h3>
        <p className="text-xs text-slate-500">{group.members} Members</p>
      </div>
    </div>
    <div className="flex flex-col items-end">
      <div className="flex items-center gap-1 text-orange-500 font-bold">
        <Trophy size={14} />
        <span>#{group.rank}</span>
      </div>
      <p className="text-[10px] text-slate-400">Your Rank</p>
    </div>
  </motion.div>
);

const FriendItem = ({ friend, onSelect }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onSelect(friend)}
    className="flex items-center gap-4 p-3 hover:bg-white/30 rounded-xl transition-colors cursor-pointer border-b border-slate-100/50 last:border-0"
  >
    <div className="relative">
      <img src={friend.avatar} alt={friend.name} className="w-12 h-12 rounded-full bg-slate-200 border-2 border-white shadow-sm" />
      {friend.status.includes("Online") || friend.status.includes("Playing") ? (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
      ) : null}
    </div>
    <div className="flex-1">
      <h4 className="font-bold text-slate-800 text-sm">{friend.name}</h4>
      <p className={`text-xs ${friend.status.includes("Playing") ? "text-indigo-600 font-medium" : "text-slate-500"}`}>
        {friend.status}
      </p>
    </div>
    <div className="text-right">
      <span className="font-bold text-slate-700 block">{friend.score}</span>
      <span className="text-[10px] text-slate-400 uppercase tracking-wide">PTS</span>
    </div>
  </motion.div>
);

const ProfileModal = ({ friend, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 z-50 flex items-end justify-center bg-black/20 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="bg-white/90 backdrop-blur-xl w-full h-[85%] rounded-t-[2.5rem] p-6 shadow-2xl overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-8" />
      
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-indigo-500 to-purple-500 mb-4 shadow-lg">
          <img src={friend.avatar} alt={friend.name} className="w-full h-full rounded-full bg-white border-2 border-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{friend.name}</h2>
        <p className="text-indigo-600 font-medium">{friend.score} Lifetime Points</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="glass-panel p-4 rounded-2xl text-center bg-orange-50">
          <p className="text-xs text-slate-500 mb-1">Global Rank</p>
          <p className="text-2xl font-bold text-orange-600">#1,240</p>
        </div>
        <div className="glass-panel p-4 rounded-2xl text-center bg-emerald-50">
          <p className="text-xs text-slate-500 mb-1">Win Rate</p>
          <p className="text-2xl font-bold text-emerald-600">68%</p>
        </div>
      </div>

      <h3 className="font-bold text-slate-800 mb-4">Head-to-Head</h3>
      <div className="glass-panel p-5 rounded-2xl mb-6">
        <div className="flex justify-between text-sm font-bold text-slate-600 mb-2">
          <span>You</span>
          <span>Vs</span>
          <span>{friend.name.split(' ')[0]}</span>
        </div>
        
        {/* Simple Bar Chart */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Memory Match</span>
              <span>+12 pts</span>
            </div>
            <div className="flex h-3 rounded-full overflow-hidden bg-slate-100">
              <div className="w-[60%] bg-indigo-500"></div>
              <div className="w-[40%] bg-rose-400"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Bubble Pop</span>
              <span>-50 pts</span>
            </div>
            <div className="flex h-3 rounded-full overflow-hidden bg-slate-100">
              <div className="w-[30%] bg-indigo-500"></div>
              <div className="w-[70%] bg-rose-400"></div>
            </div>
          </div>
        </div>
      </div>

      <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-transform">
        Challenge Now
      </button>

    </motion.div>
  </motion.div>
);

const Community = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [activeTab, setActiveTab] = useState('groups'); // groups | friends

  return (
    <div className="flex flex-col min-h-full pb-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Community</h1>
        <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-indigo-600">
          <Plus size={24} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-white/40 rounded-xl mb-6 backdrop-blur-sm">
        <button 
          onClick={() => setActiveTab('groups')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'groups' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
        >
          My Groups
        </button>
        <button 
          onClick={() => setActiveTab('friends')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'friends' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
        >
          Friends
        </button>
      </div>

      {activeTab === 'groups' && (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="mb-8">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">Pinned Groups</h2>
            {GROUPS.map(group => <GroupCard key={group.id} group={group} />)}
          </div>
          
          <div className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center border-dashed border-2 border-slate-300 bg-transparent shadow-none">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-3 text-slate-400">
              <Users size={32} />
            </div>
            <h3 className="font-bold text-slate-700">Create a New Circle</h3>
            <p className="text-sm text-slate-500 mb-4">Connect with family, poker buddies, or neighbors.</p>
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-medium text-sm">
              Start Group
            </button>
          </div>
        </motion.div>
      )}

      {activeTab === 'friends' && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search contacts or phone..." 
              className="w-full bg-white/60 backdrop-blur-md pl-12 pr-4 py-3 rounded-2xl border-none text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="glass-panel rounded-3xl overflow-hidden p-0 mb-6">
            <div className="bg-indigo-50/50 p-3 border-b border-indigo-100">
              <p className="text-xs font-bold text-indigo-600 text-center">🏆 Weekly Leaderboard</p>
            </div>
            {FRIENDS.sort((a,b) => b.score - a.score).map((friend, i) => (
              <FriendItem key={friend.id} friend={friend} onSelect={setSelectedFriend} />
            ))}
          </div>

          <button className="w-full py-4 glass-button rounded-2xl flex items-center justify-center gap-2 text-slate-700 font-bold">
            <Phone size={20} />
            Invite via Phone Number
          </button>
        </motion.div>
      )}

      {/* Profile Modal */}
      <AnimatePresence>
        {selectedFriend && (
          <ProfileModal friend={selectedFriend} onClose={() => setSelectedFriend(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Community;