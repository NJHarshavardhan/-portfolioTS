import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCcw, CheckCircle2, AlertCircle, Info } from "lucide-react";

type Cell = {
  value: number | null;
  isInitial: boolean;
  isConflict: boolean;
};

type Level = {
  id: number;
  difficulty: "Easy" | "Medium" | "Hard";
  initialGrid: (number | null)[][];
  solution: number[][];
};

const LEVELS: Level[] = [
  {
    id: 1,
    difficulty: "Easy",
    initialGrid: [
      [1, null, null, 4],
      [null, null, null, null],
      [null, null, null, null],
      [4, null, null, 1],
    ],
    solution: [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [2, 1, 4, 3],
      [4, 3, 2, 1],
    ],
  },
  {
    id: 2,
    difficulty: "Medium",
    initialGrid: [
      [null, 2, null, null],
      [null, null, 1, null],
      [null, 1, null, null],
      [null, null, 3, null],
    ],
    solution: [
      [1, 2, 4, 3],
      [3, 4, 1, 2],
      [2, 1, 3, 4],
      [4, 3, 2, 1],
    ],
  },
  {
    id: 3,
    difficulty: "Hard",
    initialGrid: [
      [null, null, null, 2],
      [null, 4, null, null],
      [null, null, 1, null],
      [3, null, null, null],
    ],
    solution: [
      [4, 3, 2, 1],
      [2, 4, 1, 3],
      [1, 2, 3, 4],
      [3, 1, 4, 2],
    ],
  },
];

const MiniSudoku: React.FC = () => {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [isWon, setIsWon] = useState(false);
  const [showConflicts, setShowConflicts] = useState(true);

  const currentLevel = LEVELS[currentLevelIdx];

  useEffect(() => {
    initGrid();
  }, [currentLevelIdx]);

  const initGrid = () => {
    const newGrid: Cell[][] = currentLevel.initialGrid.map((row) =>
      row.map((val) => ({
        value: val,
        isInitial: val !== null,
        isConflict: false,
      }))
    );
    setGrid(newGrid);
    setIsWon(false);
    setSelectedCell(null);
  };

  const handleCellClick = (r: number, c: number) => {
    if (grid[r][c].isInitial || isWon) return;
    setSelectedCell([r, c]);
  };

  const handleNumberInput = (num: number | null) => {
    if (!selectedCell || isWon) return;
    const [r, c] = selectedCell;
    
    const newGrid = [...grid.map(row => [...row])];
    newGrid[r][c].value = num;
    
    // Check conflicts
    validateGrid(newGrid);
    setGrid(newGrid);
    
    // Check win condition
    checkWin(newGrid);
  };

  const validateGrid = (currentGrid: Cell[][]) => {
    // Reset conflicts
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        currentGrid[r][c].isConflict = false;
      }
    }

    // Check rows, columns and 2x2 squares
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const val = currentGrid[r][c].value;
        if (!val) continue;

        // Check row
        for (let i = 0; i < 4; i++) {
          if (i !== c && currentGrid[r][i].value === val) {
            currentGrid[r][c].isConflict = true;
          }
        }

        // Check column
        for (let i = 0; i < 4; i++) {
          if (i !== r && currentGrid[i][c].value === val) {
            currentGrid[r][c].isConflict = true;
          }
        }

        // Check 2x2 square
        const startR = Math.floor(r / 2) * 2;
        const startC = Math.floor(c / 2) * 2;
        for (let i = startR; i < startR + 2; i++) {
          for (let j = startC; j < startC + 2; j++) {
            if ((i !== r || j !== c) && currentGrid[i][j].value === val) {
              currentGrid[r][c].isConflict = true;
            }
          }
        }
      }
    }
  };

  const checkWin = (currentGrid: Cell[][]) => {
    // Check if fully filled and no conflicts
    const isFull = currentGrid.every(row => row.every(cell => cell.value !== null));
    const hasConflicts = currentGrid.some(row => row.some(cell => cell.isConflict));
    
    if (isFull && !hasConflicts) {
      // Final check against solution
      const matchesSolution = currentGrid.every((row, r) => 
        row.every((cell, c) => cell.value === currentLevel.solution[r][c])
      );
      if (matchesSolution) {
        setIsWon(true);
      }
    }
  };

  const nextLevel = () => {
    setCurrentLevelIdx((prev) => (prev + 1) % LEVELS.length);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 relative z-10">
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground">Mini Sudoku</h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Level {currentLevel.id} • <span className="text-primary">{currentLevel.difficulty}</span>
            </p>
          </div>
          <button 
            onClick={initGrid}
            className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-muted-foreground hover:text-primary transition-all group"
            title="Reset Grid"
          >
            <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>

        {/* Info Banner */}
        <AnimatePresence>
          {isWon && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="mb-8 p-4 bg-primary/20 border border-primary/30 rounded-2xl flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 text-primary">
                <CheckCircle2 className="w-6 h-6" />
                <span className="font-bold">Perfectly Solved!</span>
              </div>
              <button 
                onClick={nextLevel}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:scale-105 transition-transform"
              >
                Next Level
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-2 mb-8 relative z-10">
          {grid.map((row, r) => (
            <React.Fragment key={r}>
              {row.map((cell, c) => {
                const isSelected = selectedCell?.[0] === r && selectedCell?.[1] === c;
                const isConflict = showConflicts && cell.isConflict;
                
                return (
                  <motion.button
                    key={`${r}-${c}`}
                    whileHover={!cell.isInitial && !isWon ? { scale: 1.05 } : {}}
                    whileTap={!cell.isInitial && !isWon ? { scale: 0.95 } : {}}
                    onClick={() => handleCellClick(r, c)}
                    className={`
                      aspect-square rounded-2xl flex items-center justify-center text-2xl font-bold transition-all relative
                      ${cell.isInitial ? 'bg-white/10 text-muted-foreground cursor-default' : 'bg-white/5 hover:bg-white/10'}
                      ${isSelected ? 'ring-2 ring-primary shadow-[0_0_20px_rgba(var(--primary),0.3)] bg-primary/10' : ''}
                      ${isConflict ? 'text-red-400 bg-red-400/10' : ''}
                      ${!cell.isInitial && cell.value && !isConflict ? 'text-primary' : ''}
                      ${(r === 1 && c < 4) ? 'mb-1' : ''}
                      ${(c === 1 && r < 4) ? 'mr-1' : ''}
                    `}
                  >
                    {cell.value}
                    {/* Visual markers for 2x2 borders could be added here if needed */}
                  </motion.button>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        {/* Number Pad */}
        <div className="grid grid-cols-5 gap-2 relative z-10">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberInput(num)}
              disabled={!selectedCell || isWon}
              className="aspect-square rounded-xl bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 text-xl font-bold flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:text-primary"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleNumberInput(null)}
            disabled={!selectedCell || isWon}
            className="aspect-square rounded-xl bg-white/5 hover:bg-red-400/20 border border-white/10 hover:border-red-400/50 text-xl font-bold flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed text-red-400/70 hover:text-red-400"
          >
            C
          </button>
        </div>

        {/* Extra Info */}
        <div className="mt-8 flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
          <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Fill the 4x4 grid so each row, column, and 2x2 square contains the numbers 1-4 without repetition.
          </p>
        </div>

        {/* Background Decorations */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/5 blur-3xl rounded-full" />
      </div>
    </div>
  );
};

export default MiniSudoku;
