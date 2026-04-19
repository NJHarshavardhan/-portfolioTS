import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCcw, CheckCircle2, Info } from "lucide-react";

type Pos = { r: number; c: number };

type Level = {
  id: number;
  size: number;
  targets: { [val: number]: Pos };
  maxVal: number;
};

const LEVELS: Level[] = [
  {
    id: 1,
    size: 4,
    targets: {
      1: { r: 0, c: 0 },
      2: { r: 1, c: 2 },
      3: { r: 3, c: 3 },
    },
    maxVal: 3,
  },
  {
    id: 2,
    size: 5,
    targets: {
      1: { r: 0, c: 0 },
      2: { r: 2, c: 2 },
      3: { r: 4, c: 0 },
      4: { r: 4, c: 4 },
    },
    maxVal: 4,
  },
];

const ZipGame: React.FC = () => {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [path, setPath] = useState<Pos[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLevel = LEVELS[currentLevelIdx];

  useEffect(() => {
    resetGame();
  }, [currentLevelIdx]);

  const resetGame = () => {
    setPath([{ ...currentLevel.targets[1] }]);
    setIsWon(false);
    setIsDrawing(false);
  };

  const getCellFromPos = (clientX: number, clientY: number): Pos | null => {
    if (!containerRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    if (x < 0 || x > rect.width || y < 0 || y > rect.height) return null;
    
    const cellSize = rect.width / currentLevel.size;
    const c = Math.floor(x / cellSize);
    const r = Math.floor(y / cellSize);
    
    return { r, c };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isWon) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const cell = getCellFromPos(clientX, clientY);
    if (!cell) return;

    // Must start from the current path end or start over if clicking the start point
    if (cell.r === currentLevel.targets[1].r && cell.c === currentLevel.targets[1].c) {
      setPath([cell]);
      setIsDrawing(true);
    } else if (path.length > 0) {
      const last = path[path.length - 1];
      if (cell.r === last.r && cell.c === last.c) {
        setIsDrawing(true);
      }
    }
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || isWon) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const cell = getCellFromPos(clientX, clientY);
    if (!cell) return;

    const last = path[path.length - 1];
    
    // Check if it's the same cell
    if (cell.r === last.r && cell.c === last.c) return;
    
    // Check if it's adjacent
    const isAdjacent = Math.abs(cell.r - last.r) + Math.abs(cell.c - last.c) === 1;
    if (!isAdjacent) return;

    // If backtracking
    if (path.length > 1) {
      const secondLast = path[path.length - 2];
      if (cell.r === secondLast.r && cell.c === secondLast.c) {
        setPath(path.slice(0, -1));
        return;
      }
    }

    // Check if already in path (cannot cross)
    const alreadyInPath = path.some(p => p.r === cell.r && p.c === cell.c);
    if (alreadyInPath) return;

    // Check if we hit a target out of order
    for (let i = 2; i <= currentLevel.maxVal; i++) {
        const target = currentLevel.targets[i];
        if (cell.r === target.r && cell.c === target.c) {
            // Find what the next target should be
            let nextTargetVal = 0;
            for(let j = 1; j < i; j++) {
                const prevTarget = currentLevel.targets[j];
                const inPath = path.some(p => p.r === prevTarget.r && p.c === prevTarget.c);
                if(inPath) nextTargetVal = j + 1;
            }
            if (i !== nextTargetVal) return; // Hitting a target too early
        }
    }

    const newPath = [...path, cell];
    setPath(newPath);
    checkWin(newPath);
  };

  const handleEnd = () => {
    setIsDrawing(false);
  };

  const checkWin = (currentPath: Pos[]) => {
    // 1. All numbers must be in path in order (implicit in move logic)
    // 2. All targets must be reached
    const reachedAllTargets = Object.values(currentLevel.targets).every(t => 
        currentPath.some(p => p.r === t.r && p.c === t.c)
    );

    // 3. Path must end on the last target
    const lastTarget = currentLevel.targets[currentLevel.maxVal];
    const pathEndsOnLastTarget = currentPath[currentPath.length - 1].r === lastTarget.r && 
                                 currentPath[currentPath.length - 1].c === lastTarget.c;

    // 4. All cells must be filled
    const filledAllCells = currentPath.length === currentLevel.size * currentLevel.size;

    if (reachedAllTargets && pathEndsOnLastTarget && filledAllCells) {
      setIsWon(true);
      setIsDrawing(false);
    }
  };

  const nextLevel = () => {
    setCurrentLevelIdx((prev) => (prev + 1) % LEVELS.length);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden select-none">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 relative z-10">
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground">Zip</h2>
            <p className="text-sm text-muted-foreground">
              Level {currentLevel.id} • Connect 1 to {currentLevel.maxVal}
            </p>
          </div>
          <button 
            onClick={resetGame}
            className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-muted-foreground hover:text-primary transition-all group"
          >
            <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {isWon && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-4 bg-primary/20 border border-primary/30 rounded-2xl flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 text-primary">
                <CheckCircle2 className="w-6 h-6" />
                <span className="font-bold">Grid Completed!</span>
              </div>
              <button 
                onClick={nextLevel}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:scale-105 transition-transform"
              >
                Next
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid Container */}
        <div 
          ref={containerRef}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          className="relative aspect-square bg-black/20 rounded-2xl overflow-hidden border border-white/5 cursor-crosshair"
          style={{ 
            display: 'grid', 
            gridTemplateColumns: `repeat(${currentLevel.size}, 1fr)`,
            gridTemplateRows: `repeat(${currentLevel.size}, 1fr)` 
          }}
        >
          {/* Paths Visual */}
          {path.map((p, i) => {
            if (i === 0) return null;
            const prev = path[i-1];
            const isHorizontal = prev.r === p.r;
            
            return (
              <motion.div
                key={`path-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bg-primary/40 pointer-events-none"
                style={{
                  top: `${(Math.min(prev.r, p.r) + 0.5) * (100 / currentLevel.size)}%`,
                  left: `${(Math.min(prev.c, p.c) + 0.5) * (100 / currentLevel.size)}%`,
                  width: isHorizontal ? `${100 / currentLevel.size}%` : '4px',
                  height: isHorizontal ? '4px' : `${100 / currentLevel.size}%`,
                  transform: isHorizontal ? 'translateY(-50%)' : 'translateX(-50%)',
                  zIndex: 5
                }}
              />
            );
          })}

          {/* Cells */}
          {Array.from({ length: currentLevel.size * currentLevel.size }).map((_, i) => {
            const r = Math.floor(i / currentLevel.size);
            const c = i % currentLevel.size;
            
            const isInPath = path.some(p => p.r === r && p.c === c);
            const pathIdx = path.findIndex(p => p.r === r && p.c === c);
            const isLast = pathIdx === path.length - 1;
            
            let targetVal = null;
            for (const [v, pos] of Object.entries(currentLevel.targets)) {
              if (pos.r === r && pos.c === c) targetVal = v;
            }

            return (
              <div 
                key={i} 
                className={`
                  relative border border-white/5 flex items-center justify-center transition-colors duration-300
                  ${isInPath ? 'bg-primary/10' : 'bg-transparent'}
                `}
              >
                {isInPath && (
                   <motion.div 
                    layoutId="path-fill"
                    className={`absolute inset-1 rounded-sm ${isLast ? 'bg-primary/40' : 'bg-primary/20'}`}
                   />
                )}
                
                {targetVal && (
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg z-10
                    ${isInPath ? 'bg-primary text-primary-foreground' : 'bg-white/10 text-foreground'}
                    border-2 ${isInPath ? 'border-primary' : 'border-white/20'}
                  `}>
                    {targetVal}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="mt-8 flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
          <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Drag to connect the numbers in order. You must fill every single square on the grid to win. Do not cross your own path!
          </p>
        </div>

        {/* Decorations */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/5 blur-3xl rounded-full" />
      </div>
    </div>
  );
};

export default ZipGame;
