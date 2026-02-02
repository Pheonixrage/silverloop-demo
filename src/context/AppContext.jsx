import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('silverloop_lang') || 'en');
  const [darkMode, setDarkMode] = useState(localStorage.getItem('silverloop_dark') === 'true');

  useEffect(() => {
    localStorage.setItem('silverloop_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('silverloop_dark', darkMode);
  }, [darkMode]);

  const t = translations[lang];

  return (
    <AppContext.Provider value={{ lang, setLang, darkMode, setDarkMode, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);