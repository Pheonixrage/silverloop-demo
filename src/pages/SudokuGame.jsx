import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, RefreshCw, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import clsx from 'clsx';

const INITIAL_BOARD = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const SudokuGame = () => {
  const { t, darkMode } = useAppContext();
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [selectedCell, setSelectedCell] = useState(null);

  const handleNumberInput = (num) => {
    if (!selectedCell) return;
    const [r, c] = selectedCell;
    if (INITIAL_BOARD[r][c] !== 0) return;
    const newBoard = [...board];
    newBoard[r] = [...newBoard[r]];
    newBoard[r][c] = num;
    setBoard(newBoard);
  };

  return (
    <div className="flex flex-col h-full min-h-[100%] pb-10">
      <div className="flex items-center justify-between mb-8">
        <Link to="/games" className={clsx("p-2 rounded-2xl shadow-sm", darkMode ? "bg-slate-800 text-white" : "bg-white text-slate-800")}>
          <ChevronLeft size={24} />
        </Link>
        <h1 className={clsx("text-2xl font-black leading-tight", darkMode ? "text-white" : "text-slate-800")}>{t.game_sudoku}</h1>
        <div className="w-10" />
      </div>

      <div className={clsx(
        "p-2 rounded-[2rem] aspect-square mb-10 flex flex-col justify-center shadow-2xl border transition-colors",
        darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-white"
      )}>
        {board.map((row, rIndex) => (
          <div key={rIndex} className="flex h-full">
            {row.map((cell, cIndex) => {
              const isInitial = INITIAL_BOARD[rIndex][cIndex] !== 0;
              const isSelected = selectedCell?.[0] === rIndex && selectedCell?.[1] === cIndex;
              const borderRight = (cIndex + 1) % 3 === 0 && cIndex !== 8 ? (darkMode ? 'border-r-4 border-slate-900' : 'border-r-4 border-slate-200') : (darkMode ? 'border-r border-slate-700/50' : 'border-r border-slate-100');
              const borderBottom = (rIndex + 1) % 3 === 0 && rIndex !== 8 ? (darkMode ? 'border-b-4 border-slate-900' : 'border-b-4 border-slate-200') : (darkMode ? 'border-b border-slate-700/50' : 'border-b border-slate-100');

              return (
                <div
                  key={`${rIndex}-${cIndex}`}
                  onClick={() => setSelectedCell([rIndex, cIndex])}
                  className={clsx(
                    "flex-1 flex items-center justify-center text-lg transition-all cursor-pointer relative",
                    borderRight, borderBottom,
                    isSelected ? (darkMode ? "bg-indigo-500/30 ring-2 ring-indigo-500 z-10" : "bg-indigo-100 ring-2 ring-indigo-500 z-10") : (isInitial ? (darkMode ? "bg-white/5" : "bg-slate-50") : ""),
                    isInitial ? (darkMode ? "text-white font-black" : "text-slate-900 font-black") : (darkMode ? "text-indigo-400 font-bold" : "text-indigo-600 font-bold")
                  )}
                >
                  {cell !== 0 ? cell : ''}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-3 mb-10">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberInput(num)}
            className={clsx(
              "h-14 rounded-2xl text-xl font-black shadow-lg transition-all active:scale-90",
              darkMode ? "bg-slate-800 text-white hover:bg-slate-700 border border-slate-700" : "bg-white text-slate-800 hover:bg-slate-50 border border-white"
            )}
          >
            {num}
          </button>
        ))}
        <button 
          onClick={() => handleNumberInput(0)}
          className={clsx(
            "h-14 rounded-2xl shadow-lg transition-all active:scale-90 flex items-center justify-center",
            darkMode ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "bg-rose-50 text-rose-500 border border-rose-100"
          )}
        >
          ✖
        </button>
      </div>

      <div className={clsx("p-5 rounded-[2rem] flex items-center justify-between shadow-xl border", darkMode ? "bg-slate-800/60 border-slate-700" : "bg-white border-white")}>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl shadow-inner">
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic mb-0.5">Record</p>
            <p className={clsx("text-lg font-black italic", darkMode ? "text-white" : "text-slate-800")}>14:20 MIN</p>
          </div>
        </div>
        <button className={clsx("p-4 rounded-2xl shadow-md transition-transform active:rotate-180 duration-500", darkMode ? "bg-slate-700 text-indigo-400" : "bg-indigo-50 text-indigo-600")}>
          <RefreshCw size={24} />
        </button>
      </div>
    </div>
  );
};

export default SudokuGame;