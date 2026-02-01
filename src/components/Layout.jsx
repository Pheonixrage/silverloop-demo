import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Gamepad2, ShieldCheck, Mic, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const NavItem = ({ to, icon: Icon, label, active }) => (
  <Link to={to} className="flex flex-col items-center justify-center w-full h-full relative no-underline">
    {active && (
      <motion.div
        layoutId="nav-pill"
        className="absolute inset-0 bg-white/40 rounded-2xl mx-1 my-1 shadow-sm"
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
          active ? "text-indigo-600" : "text-slate-500"
        )} 
      />
      <span className={clsx(
        "text-[10px] font-medium mt-1 transition-colors duration-200",
        active ? "text-indigo-600" : "text-slate-500"
      )}>
        {label}
      </span>
    </span>
  </Link>
);

const Layout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/games', icon: Gamepad2, label: 'Play' },
    { path: '/community', icon: Users, label: 'Groups' },
    { path: '/vault', icon: ShieldCheck, label: 'Vault' },
    { path: '/reminders', icon: Mic, label: 'Voice' },
  ];

  return (
    // Outer Container:
    // Mobile: w-full h-full, no padding
    // Desktop (md): Center screen, padding
    <div className="w-full h-[100dvh] md:flex md:items-center md:justify-center md:p-4 bg-transparent md:bg-inherit">
      
      {/* Phone Frame:
          Mobile: w-full h-full, no borders, no rounding
          Desktop (md): w-[400px], borders, rounded
      */}
      <div className="w-full h-full md:max-w-[400px] md:h-[850px] md:max-h-[100dvh] flex flex-col relative overflow-hidden bg-[#f0f2f5] md:bg-white/20 md:backdrop-blur-md md:shadow-2xl md:rounded-[3rem] md:border-[8px] md:border-white/30 md:ring-1 md:ring-black/5">
        
        {/* Dynamic Notch (Desktop Only) */}
        <div className="hidden md:flex absolute top-0 left-0 right-0 h-8 z-50 justify-center items-start pointer-events-none">
          <div className="w-32 h-6 bg-black/80 rounded-b-2xl" />
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto pb-28 pt-8 md:pt-12 px-6 scroll-smooth bg-gradient-to-br from-[#e0c3fc] to-[#8ec5fc] md:bg-none">
          {children}
        </main>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 left-0 right-0 h-24 glass-panel md:rounded-t-[2rem] flex items-center justify-around px-2 pb-6 pt-2 z-40">
          {navItems.map((item) => (
            <NavItem 
              key={item.path}
              to={item.path}
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.path}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Layout;