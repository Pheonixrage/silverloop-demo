import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, FileText, Folder, Plus, ShieldCheck } from 'lucide-react';

const FolderCard = ({ label, count, color }) => (
  <motion.div
    whileTap={{ scale: 0.98 }}
    className="glass-panel p-4 rounded-2xl flex flex-col justify-between h-32 relative overflow-hidden"
  >
    <div className={`absolute -right-4 -bottom-4 w-20 h-20 rounded-full opacity-10 ${color}`} />
    <Folder size={28} className="text-slate-600 mb-2" />
    <div>
      <h3 className="font-bold text-slate-800">{label}</h3>
      <p className="text-xs text-slate-500">{count} items</p>
    </div>
  </motion.div>
);

const Vault = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (!isUnlocked) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-slate-800/5 p-8 rounded-full mb-6 relative"
        >
          <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full" />
          <Lock size={48} className="text-slate-800 relative z-10" />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Secure Vault</h2>
        <p className="text-slate-500 mb-8 max-w-[200px]">Touch to access your private documents.</p>
        
        <button 
          onClick={() => setIsUnlocked(true)}
          className="glass-button px-8 py-3 rounded-xl font-semibold text-slate-800 flex items-center gap-2"
        >
          <ShieldCheck size={20} />
          Authenticate
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="flex flex-col h-full"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">My Docs</h1>
        <button className="p-2 bg-indigo-600 rounded-full text-white shadow-lg shadow-indigo-300">
          <Plus size={24} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FolderCard label="Medical" count="3" color="bg-rose-500" />
        <FolderCard label="IDs" count="2" color="bg-blue-500" />
        <FolderCard label="Finance" count="5" color="bg-emerald-500" />
        <FolderCard label="Family" count="12" color="bg-purple-500" />
      </div>

      <div className="mt-8">
        <h3 className="font-bold text-slate-700 mb-3">Recent Uploads</h3>
        <div className="glass-panel rounded-2xl p-0 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 border-b border-slate-100 last:border-0 hover:bg-white/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                <FileText size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-slate-800 text-sm">Prescription_Jan24.pdf</h4>
                <p className="text-xs text-slate-400">Added 2 days ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Vault;