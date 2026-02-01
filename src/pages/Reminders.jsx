import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, CheckCircle2, Clock } from 'lucide-react';

const ReminderItem = ({ time, text, completed }) => (
  <div className={`glass-panel p-4 rounded-2xl flex items-center gap-4 mb-3 transition-opacity ${completed ? 'opacity-50' : 'opacity-100'}`}>
    <button className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${completed ? 'bg-indigo-500 border-indigo-500' : 'border-slate-300'}`}>
      {completed && <CheckCircle2 size={14} className="text-white" />}
    </button>
    <div className="flex-1">
      <p className={`font-medium ${completed ? 'text-slate-500 line-through' : 'text-slate-800'}`}>{text}</p>
      <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
        <Clock size={12} />
        {time}
      </div>
    </div>
  </div>
);

const Reminders = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setTranscript("Remind me to call the doctor...");
      }, 1000);
      setTimeout(() => {
        setIsListening(false);
        setTranscript("");
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Voice Note</h1>

      <div className="flex-1 overflow-y-auto pb-32">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Today</h3>
        <ReminderItem time="08:00 AM" text="Take Blood Pressure Medicine" completed={true} />
        <ReminderItem time="10:30 AM" text="Water Plants" completed={false} />
        <ReminderItem time="05:00 PM" text="Call Dr. Smith" completed={false} />
      </div>

      {/* Voice Interaction Area */}
      <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center justify-center pointer-events-none">
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="glass-panel px-6 py-3 rounded-2xl mb-6 backdrop-blur-xl border border-indigo-200 shadow-xl"
            >
              <p className="text-indigo-600 font-medium animate-pulse">
                {transcript || "Listening..."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={toggleListening}
          className={`pointer-events-auto w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
            isListening ? 'bg-red-500 scale-110 shadow-red-300' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-300'
          }`}
        >
          <Mic size={32} className="text-white" />
          
          {isListening && (
            <span className="absolute w-full h-full rounded-full border-4 border-red-500 opacity-50 animate-ping" />
          )}
        </button>
        <p className="text-slate-400 text-sm mt-3 font-medium">Tap to Speak</p>
      </div>
    </div>
  );
};

export default Reminders;