import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Gamepad2, ShieldCheck, Mic, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import clsx from 'clsx';

const NavItem = ({ to, icon: Icon, label, active, darkMode }) => (
  <Link to={to} className="flex flex-col items-center justify-center w-full h-full relative no-underline">
    {active && (
      <motion.div
        layoutId="nav-pill"
        className={clsx(
          "absolute inset-0 rounded-2xl mx-1 my-1 shadow-sm",
          darkMode ? "bg-white/10" : "bg-white/40"
        )}
        initial={false}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    )}
    <span className="relative z-10 flex flex-col items-center">
      <Icon 
        size={24} 
        strokeWidth={active ? 2.5 : 2}
        className={clsx(
          "transition-colors duration-200",
          active ? (darkMode ? "text-indigo-400" : "text-indigo-600") : (darkMode ? "text-slate-500" : "text-slate-500")
        )} 
      />
      <span className={clsx(
        "text-[10px] font-bold mt-1 transition-colors duration-200",
        active ? (darkMode ? "text-indigo-400" : "text-indigo-600") : (darkMode ? "text-slate-500" : "text-slate-500")
      )}>
        {label}
      </span>
    </span>
  </Link>
);

const Layout = ({ children }) => {
  const location = useLocation();
  const { darkMode, t } = useAppContext();

  const isLoginPage = location.pathname === '/login';

  const navItems = [
    { path: '/', icon: Home, label: t.nav_home },
    { path: '/games', icon: Gamepad2, label: t.nav_play },
    { path: '/community', icon: Users, label: t.nav_groups },
    { path: '/vault', icon: ShieldCheck, label: t.nav_vault },
    { path: '/reminders', icon: Mic, label: t.nav_voice },
  ];

  return (
    // Base container: Use fixed screen size to prevent layout shifts
    <div className={clsx(
      "fixed inset-0 w-full h-full flex items-center justify-center transition-colors duration-500",
      darkMode ? "bg-slate-950" : "bg-gradient-to-br from-[#e0c3fc] to-[#8ec5fc]"
    )}>
      
      {/* Main App Shell */}
      <div className={clsx(
        "relative flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.2)] overflow-hidden transition-all duration-500",
        darkMode ? "bg-slate-900 border-slate-800" : "bg-[#f8f9fa]",
        "w-full h-full", // Mobile
        "md:w-[390px] md:h-[844px] md:rounded-[55px] md:border-[10px] md:border-[#1a1a1a] md:ring-2 md:ring-black/10" // Desktop
      )}>
        
        {/* Notch (Desktop Only) */}
        <div className="hidden md:block absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-[60]" />

        {/* Content Area */}
        <main className={clsx(
          "flex-1 overflow-y-auto scroll-smooth",
          "pt-4 md:pt-16 px-6 pb-32",
          darkMode ? "bg-slate-900" : "bg-gradient-to-br from-[#f0f2f5] to-white"
        )}>
          {children}
        </main>

        {/* Bottom Nav */}
        {!isLoginPage && (
          <nav className={clsx(
            "absolute bottom-0 left-0 right-0 z-50",
            "h-24 glass-panel border-t transition-colors duration-500",
            darkMode ? "bg-slate-900/80 border-slate-700/50" : "bg-white/70 border-white/40",
            "flex items-center justify-around px-2 pb-8 pt-2",
            "md:rounded-b-[43px]"
          )}>
            {navItems.map((item) => (
              <NavItem 
                key={item.path}
                to={item.path}
                icon={item.icon}
                label={item.label}
                active={location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))}
                darkMode={darkMode}
              />
            ))}
            <div className={clsx(
              "absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full",
              darkMode ? "bg-white/10" : "bg-black/5"
            )} />
          </nav>
        )}
      </div>

      {/* Frame Buttons (Desktop only) */}
      <div className="hidden md:block absolute left-[calc(50%-202px)] top-[180px] w-[3px] h-8 bg-[#1a1a1a] rounded-l-md" />
      <div className="hidden md:block absolute left-[calc(50%-202px)] top-[240px] w-[3px] h-14 bg-[#1a1a1a] rounded-l-md" />
      <div className="hidden md:block absolute right-[calc(50%-202px)] top-[240px] w-[3px] h-20 bg-[#1a1a1a] rounded-r-md" />
    </div>
  );
};

export default Layout;