import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, RefreshCw, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [selectedCell, setSelectedCell] = useState(null); // [row, col]

  const handleNumberInput = (num) => {
    if (!selectedCell) return;
    const [r, c] = selectedCell;
    
    // Don't overwrite initial non-zero values
    if (INITIAL_BOARD[r][c] !== 0) return;

    const newBoard = [...board];
    newBoard[r] = [...newBoard[r]];
    newBoard[r][c] = num;
    setBoard(newBoard);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/games" className="p-2 -ml-2 rounded-full hover:bg-white/20">
          <ChevronLeft size={24} className="text-slate-800" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">Daily Sudoku</h1>
        <div className="w-8" /> {/* Spacer */}
      </div>

      {/* Game Board */}
      <div className="glass-panel p-2 rounded-2xl aspect-square mb-6 flex flex-col justify-center">
        {board.map((row, rIndex) => (
          <div key={rIndex} className="flex">
            {row.map((cell, cIndex) => {
              const isInitial = INITIAL_BOARD[rIndex][cIndex] !== 0;
              const isSelected = selectedCell?.[0] === rIndex && selectedCell?.[1] === cIndex;
              
              // Border logic for 3x3 grids
              const borderRight = (cIndex + 1) % 3 === 0 && cIndex !== 8 ? 'border-r-2 border-slate-300' : 'border-r border-slate-200';
              const borderBottom = (rIndex + 1) % 3 === 0 && rIndex !== 8 ? 'border-b-2 border-slate-300' : 'border-b border-slate-200';

              return (
                <motion.div
                  key={`${rIndex}-${cIndex}`}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedCell([rIndex, cIndex])}
                  className={`flex-1 aspect-square flex items-center justify-center text-lg font-medium 
                    ${borderRight} ${borderBottom}
                    ${isSelected ? 'bg-indigo-200' : isInitial ? 'bg-slate-50' : 'bg-white'}
                    ${isInitial ? 'text-slate-900 font-bold' : 'text-indigo-600'}
                  `}
                >
                  {cell !== 0 ? cell : ''}
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Numpad */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberInput(num)}
            className="glass-button h-14 rounded-xl text-xl font-bold text-slate-700 flex items-center justify-center shadow-sm"
          >
            {num}
          </button>
        ))}
        <button 
          onClick={() => handleNumberInput(0)}
          className="glass-button h-14 rounded-xl text-slate-500 flex items-center justify-center"
        >
          ✖
        </button>
      </div>

      {/* Footer Info */}
      <div className="glass-panel p-4 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
            <Trophy size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500">Best Score</p>
            <p className="font-bold text-slate-800">14:20 min</p>
          </div>
        </div>
        <button className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
          <RefreshCw size={20} />
        </button>
      </div>
    </div>
  );
};

export default SudokuGame;