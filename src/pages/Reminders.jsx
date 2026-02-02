import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, CheckCircle2, Clock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import clsx from 'clsx';

const ReminderItem = ({ time, text, completed, darkMode }) => (
  <div className={clsx(
    "p-5 rounded-[2rem] flex items-center gap-5 mb-4 shadow-sm border transition-all",
    darkMode ? "bg-slate-800/40 border-slate-700/50" : "bg-white/60 border-white",
    completed ? 'opacity-40 grayscale-[0.5]' : 'opacity-100'
  )}>
    <button className={clsx(
      "w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all shadow-inner",
      completed ? 'bg-emerald-500 border-emerald-500' : (darkMode ? 'border-slate-600' : 'border-slate-200 bg-white')
    )}>
      {completed && <CheckCircle2 size={16} className="text-white" strokeWidth={3} />}
    </button>
    <div className="flex-1">
      <p className={clsx(
        "font-black text-sm tracking-tight",
        completed ? (darkMode ? 'text-slate-500 line-through' : 'text-slate-400 line-through') : (darkMode ? 'text-white' : 'text-slate-800')
      )}>{text}</p>
      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-black uppercase mt-1 tracking-widest italic">
        <Clock size={12} className="text-indigo-400" />
        {time}
      </div>
    </div>
  </div>
);

const Reminders = () => {
  const { t, darkMode } = useAppContext();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setTranscript("Remind me to call...");
      }, 800);
      setTimeout(() => {
        setTranscript("Remind me to call the doctor at 5 PM.");
      }, 1800);
      setTimeout(() => {
        setIsListening(false);
        setTranscript("");
      }, 4000);
    }
  };

  const MOCK_REMINDERS = [
    { time: "08:00 AM", text: t.health_check, completed: true },
    { time: "10:30 AM", text: t.practice_math, completed: false },
    { time: "05:00 PM", text: "Family Call", completed: false },
  ];

  return (
    <div className="flex flex-col h-full relative pb-40">
      <h1 className={clsx("text-3xl font-black leading-tight mb-8", darkMode ? "text-white" : "text-slate-800")}>{t.voice_note}</h1>

      <div className="flex-1 overflow-y-auto">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 px-2 italic">{t.today}</h3>
        {MOCK_REMINDERS.map((r, i) => (
          <ReminderItem key={i} {...r} darkMode={darkMode} />
        ))}
      </div>

      {/* Voice Interaction Area */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center pointer-events-none pb-4">
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={clsx(
                "px-8 py-5 rounded-[2rem] mb-8 backdrop-blur-2xl border shadow-[0_20px_50px_rgba(0,0,0,0.15)]",
                darkMode ? "bg-indigo-900/40 border-indigo-500/30" : "bg-white/90 border-indigo-100"
              )}
            >
              <p className={clsx("font-black italic text-lg text-center", darkMode ? "text-indigo-300" : "text-indigo-600")}>
                {transcript || "Listening..."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={toggleListening}
          className={clsx(
            "pointer-events-auto w-24 h-24 rounded-full flex items-center justify-center shadow-[0_15px_45px_rgba(0,0,0,0.1)] transition-all duration-500 relative overflow-hidden",
            isListening ? 'bg-red-500 scale-110' : 'bg-indigo-600 active:scale-95'
          )}
        >
          <div className={clsx("absolute inset-0 bg-gradient-to-br transition-opacity duration-500", isListening ? "from-red-400 to-red-600 opacity-100" : "from-indigo-500 to-indigo-700 opacity-100")} />
          <Mic size={40} className="text-white relative z-10" strokeWidth={2.5} />
          
          {isListening && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 3 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute inset-0 bg-white/20 rounded-full"
            />
          )}
        </button>
        <p className={clsx("text-[10px] font-black uppercase tracking-widest mt-5", darkMode ? "text-slate-500" : "text-slate-400")}>{t.tap_speak}</p>
      </div>
    </div>
  );
};

export default Reminders;