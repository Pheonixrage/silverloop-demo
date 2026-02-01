import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Games from './pages/Games';
import Vault from './pages/Vault';
import Reminders from './pages/Reminders';
import Community from './pages/Community';
import SudokuGame from './pages/SudokuGame';
import { AnimatePresence, motion } from 'framer-motion';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.02 }}
    transition={{ duration: 0.3 }}
    className="h-full"
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/games" element={<PageWrapper><Games /></PageWrapper>} />
        <Route path="/games/sudoku" element={<PageWrapper><SudokuGame /></PageWrapper>} />
        <Route path="/community" element={<PageWrapper><Community /></PageWrapper>} />
        <Route path="/vault" element={<PageWrapper><Vault /></PageWrapper>} />
        <Route path="/reminders" element={<PageWrapper><Reminders /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
}

export default App;