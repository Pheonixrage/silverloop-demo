import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Globe, Bell, Info, Shield, ChevronLeft, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const SettingToggle = ({ icon: Icon, label, value, onChange }) => (
  <div className="flex items-center justify-between p-4 glass-panel rounded-2xl mb-3">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-slate-100 rounded-xl text-slate-600">
        <Icon size={20} />
      </div>
      <span className="font-bold text-slate-800">{label}</span>
    </div>
    <button 
      onClick={() => onChange(!value)}
      className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${value ? 'bg-emerald-500' : 'bg-slate-300'}`}
    >
      <motion.div 
        animate={{ x: value ? 24 : 4 }}
        className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
      />
    </button>
  </div>
);

const LanguageButton = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${active ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-100 text-slate-500'}`}
  >
    {label}
  </button>
);

const Settings = () => {
  const { lang, setLang, darkMode, setDarkMode, t } = useAppContext();

  return (
    <div className="flex flex-col min-h-full pb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/" className="p-2 bg-white rounded-full shadow-sm text-slate-800">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-3xl font-black text-slate-800">{t.settings}</h1>
      </div>

      <section className="mb-8">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-1">{t.appearance}</h2>
        <SettingToggle 
          icon={darkMode ? Moon : Sun} 
          label={t.dark_mode} 
          value={darkMode} 
          onChange={setDarkMode} 
        />
        <SettingToggle 
          icon={Shield} 
          label={t.high_contrast} 
          value={true} 
          onChange={() => {}} 
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-1">{t.language}</h2>
        <div className="flex gap-4 glass-panel p-2 rounded-2xl">
          <LanguageButton 
            label="English" 
            active={lang === 'en'} 
            onClick={() => setLang('en')} 
          />
          <LanguageButton 
            label="తెలుగు" 
            active={lang === 'te'} 
            onClick={() => setLang('te')} 
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-1">{t.notifications}</h2>
        <SettingToggle 
          icon={Bell} 
          label="Game Reminders" 
          value={true} 
          onChange={() => {}} 
        />
      </section>

      <div className="mt-auto pt-8 border-t border-slate-200">
        <div className="flex items-center gap-3 text-slate-400 mb-2">
          <Info size={16} />
          <span className="text-xs font-bold">{t.about}</span>
        </div>
        <p className="text-[10px] text-slate-400 font-medium">{t.version}</p>
      </div>
    </div>
  );
};

export default Settings;