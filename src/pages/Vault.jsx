import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, FileText, Folder, Plus, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import clsx from 'clsx';

const FolderCard = ({ label, count, color, t, darkMode }) => (
  <motion.div
    whileTap={{ scale: 0.98 }}
    className={clsx(
      "glass-panel p-5 rounded-[2.5rem] flex flex-col justify-between h-40 relative overflow-hidden shadow-lg",
      darkMode ? "bg-slate-800/40 border-slate-700" : "bg-white/40 border-white"
    )}
  >
    <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-10 ${color}`} />
    <Folder size={32} className={darkMode ? "text-indigo-400" : "text-slate-600"} />
    <div>
      <h3 className={clsx("font-black text-base leading-tight", darkMode ? "text-white" : "text-slate-800")}>{label}</h3>
      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{count} {t.items}</p>
    </div>
  </motion.div>
);

const Vault = () => {
  const { t, darkMode } = useAppContext();
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (!isUnlocked) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={clsx("p-10 rounded-full mb-8 relative", darkMode ? "bg-slate-800/40" : "bg-indigo-50")}
        >
          <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full animate-pulse" />
          <Lock size={64} className={darkMode ? "text-indigo-400" : "text-indigo-600"} />
        </motion.div>
        
        <h2 className={clsx("text-3xl font-black mb-3 leading-tight", darkMode ? "text-white" : "text-slate-800")}>{t.vault}</h2>
        <p className="text-sm text-slate-500 font-bold mb-10 max-w-[240px] leading-relaxed">{t.vault_desc}</p>
        
        <button 
          onClick={() => setIsUnlocked(true)}
          className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-black shadow-2xl shadow-indigo-500/30 flex items-center justify-center gap-3 active:scale-95 transition-transform uppercase tracking-widest"
        >
          <ShieldCheck size={24} />
          {t.authenticate}
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="flex flex-col min-h-full pb-10"
    >
      <div className="flex justify-between items-center mb-10">
        <h1 className={clsx("text-3xl font-black leading-tight", darkMode ? "text-white" : "text-slate-800")}>{t.my_docs}</h1>
        <button className="w-12 h-12 bg-indigo-600 rounded-2xl shadow-xl flex items-center justify-center text-white">
          <Plus size={28} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <FolderCard label={t.folder_medical} count="3" color="bg-rose-500" t={t} darkMode={darkMode} />
        <FolderCard label={t.folder_ids} count="2" color="bg-blue-500" t={t} darkMode={darkMode} />
        <FolderCard label={t.folder_finance} count="5" color="bg-emerald-500" t={t} darkMode={darkMode} />
        <FolderCard label={t.folder_family} count="12" color="bg-purple-500" t={t} darkMode={darkMode} />
      </div>

      <section>
        <h3 className={clsx("text-[10px] font-black uppercase tracking-widest mb-4 px-2", darkMode ? "text-slate-500" : "text-slate-400")}>{t.recent_uploads}</h3>
        <div className={clsx("rounded-[2.5rem] overflow-hidden shadow-lg border", darkMode ? "bg-slate-800/40 border-slate-700/50" : "bg-white border-white")}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={clsx("flex items-center gap-4 p-5 border-b last:border-0", darkMode ? "border-slate-700/50 hover:bg-white/5" : "border-slate-50 hover:bg-slate-50/50 transition-colors")}>
              <div className={clsx("w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner", darkMode ? "bg-slate-800 text-indigo-400" : "bg-indigo-50 text-indigo-600")}>
                <FileText size={24} />
              </div>
              <div className="flex-1">
                <h4 className={clsx("font-black text-sm", darkMode ? "text-slate-200" : "text-slate-800")}>Report_Feb26.pdf</h4>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter mt-1">{t.added_days_ago}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Vault;