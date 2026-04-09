import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Circle, RotateCcw, Trophy, Users, Cpu, LayoutGrid } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import ScrollFloatText from "./ScrollFloatText";
import SpotlightCard from "./SpotlightCard";

type Player = "X" | "O";
type CellValue = Player | null;

const GRID_SIZES = [3, 4, 6, 8];

const TicTacToe = () => {
  const [gridSize, setGridSize] = useState(3);
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<CellValue | "Draw">(null);
  const [isSinglePlayer, setIsSinglePlayer] = useState(true);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  // Generate winning lines dynamically based on grid size
  const winningLines = useMemo(() => {
    const lines: number[][] = [];
    const size = gridSize;

    // Rows
    for (let r = 0; r < size; r++) {
      const row = [];
      for (let c = 0; c < size; c++) row.push(r * size + c);
      lines.push(row);
    }

    // Columns
    for (let c = 0; c < size; c++) {
      const col = [];
      for (let r = 0; r < size; r++) col.push(r * size + c);
      lines.push(col);
    }

    // Diagonals
    const diag1 = [];
    for (let i = 0; i < size; i++) diag1.push(i * size + i);
    lines.push(diag1);

    const diag2 = [];
    for (let i = 0; i < size; i++) diag2.push(i * size + (size - 1 - i));
    lines.push(diag2);

    return lines;
  }, [gridSize]);

  const calculateWinner = useCallback((squares: CellValue[]) => {
    for (const line of winningLines) {
      const first = squares[line[0]];
      if (first && line.every(idx => squares[idx] === first)) {
        return { winner: first, line };
      }
    }
    if (squares.every((square) => square !== null)) {
      return { winner: "Draw" as const, line: null };
    }
    return null;
  }, [winningLines]);

  const handleClick = (i: number) => {
    if (winner || board[i]) return;

    const newBoard = [...board];
    newBoard[i] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const result = calculateWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
    }
  };

  const makeAiMove = useCallback(() => {
    if (winner || isXNext) return;

    const availableMoves = board.map((val, idx) => (val === null ? idx : null)).filter((val) => val !== null) as number[];
    if (availableMoves.length === 0) return;

    let move = -1;

    // Helper to find winning/blocking move
    const findWinningMove = (player: Player) => {
      for (const moveIdx of availableMoves) {
        const tempBoard = [...board];
        tempBoard[moveIdx] = player;
        if (calculateWinner(tempBoard)?.winner === player) return moveIdx;
      }
      return -1;
    };

    // 1. Try to win
    move = findWinningMove("O");
    // 2. Try to block X
    if (move === -1) move = findWinningMove("X");
    
    // 3. Strategic moves for larger grids
    if (move === -1) {
      const mid = Math.floor(gridSize / 2);
      const centerIdx = mid * gridSize + mid;
      if (availableMoves.includes(centerIdx)) move = centerIdx;
    }

    // 4. Random
    if (move === -1) move = availableMoves[Math.floor(Math.random() * availableMoves.length)];

    setTimeout(() => handleClick(move), 600);
  }, [board, isXNext, winner, calculateWinner, gridSize]);

  useEffect(() => {
    if (isSinglePlayer && !isXNext && !winner) {
      makeAiMove();
    }
  }, [isXNext, isSinglePlayer, winner, makeAiMove]);

  const resetGame = () => {
    setBoard(Array(gridSize * gridSize).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine(null);
  };

  const handleSizeChange = (size: number) => {
    setGridSize(size);
    setBoard(Array(size * size).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine(null);
  };

  return (
    <AnimatedSection id="game" className="py-16 sm:py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.03),transparent_70%)]" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-primary/40" />
          <ScrollFloatText
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
            containerClassName="my-0"
            textClassName="text-3xl sm:text-5xl font-heading font-bold text-foreground"
          >
            Ultimate X / O
          </ScrollFloatText>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-primary/40" />
        </motion.div>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Controls & Stats */}
          <div className="w-full lg:w-[320px] flex flex-col gap-6 sticky top-24">
            <SpotlightCard className="glass p-6 rounded-3xl border border-white/5 shadow-xl">
              <h3 className="text-lg font-heading font-semibold mb-4 text-foreground flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-primary" />
                Grid Size
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {GRID_SIZES.map(size => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`h-12 rounded-xl text-sm font-bold transition-all border ${
                      gridSize === size 
                        ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_hsl(var(--primary)/0.3)]" 
                        : "glass hover:bg-white/10 border-white/10 text-muted-foreground"
                    }`}
                  >
                    {size}x{size}
                  </button>
                ))}
              </div>
            </SpotlightCard>

            <SpotlightCard className="glass p-6 rounded-3xl border border-white/5 shadow-xl">
              <h3 className="text-lg font-heading font-semibold mb-4 text-foreground flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Opponent
              </h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => { setIsSinglePlayer(true); resetGame(); }}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all border ${
                    isSinglePlayer 
                      ? "bg-primary/20 border-primary/30 text-primary" 
                      : "glass border-white/10 text-muted-foreground hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Cpu className="w-4 h-4" />
                    <span className="font-body font-medium">VS AI</span>
                  </div>
                </button>
                <button
                  onClick={() => { setIsSinglePlayer(false); resetGame(); }}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all border ${
                    !isSinglePlayer 
                      ? "bg-primary/20 border-primary/30 text-primary" 
                      : "glass border-white/10 text-muted-foreground hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4" />
                    <span className="font-body font-medium">VS Friend</span>
                  </div>
                </button>
              </div>
            </SpotlightCard>

            <SpotlightCard className="glass p-6 rounded-3xl border border-white/5 shadow-xl">
              <div className="flex flex-col items-center gap-4">
                <div className="text-xs font-body text-muted-foreground uppercase tracking-widest">
                  {winner ? "Match Result" : "Active Player"}
                </div>
                
                <AnimatePresence mode="wait">
                  {winner ? (
                    <motion.div
                      key="winner"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-xl font-heading font-bold text-primary flex flex-col items-center gap-2"
                    >
                      {winner === "Draw" ? (
                        <div className="flex items-center gap-2">🤝 Draw Match</div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Trophy className="w-6 h-6 text-yellow-500 animate-bounce" />
                          <span className="flex items-center gap-2">
                            {winner === "X" ? <X className="w-6 h-6" /> : <Circle className="w-5 h-5" />} Win!
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="turn"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xl font-heading font-bold text-foreground flex items-center gap-2"
                    >
                      {isXNext ? <X className="w-7 h-7 text-primary" /> : <Circle className="w-6 h-6 text-primary" />}
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
                        {isXNext ? "Player X" : isSinglePlayer ? "Neural AI" : "Player O"}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={resetGame}
                  className="mt-2 w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-body font-bold hover:opacity-90 transition-all shadow-[0_0_20px_hsl(var(--primary)/0.25)] group"
                >
                  <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  Restart Match
                </button>
              </div>
            </SpotlightCard>
          </div>

          {/* Game Board Container */}
          <div className="flex-1 flex justify-center w-full">
            <div 
              className="grid gap-2 sm:gap-3 p-4 glass-strong rounded-[2.5rem] border border-white/5 shadow-2xl relative"
              style={{
                gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                width: '100%',
                maxWidth: gridSize <= 4 ? '500px' : gridSize === 6 ? '600px' : '700px'
              }}
            >
              <div className="absolute -inset-10 bg-primary/5 blur-[100px] pointer-events-none -z-10" />
              
              {board.map((cell, idx) => {
                const isWinningCell = winningLine?.includes(idx);
                return (
                  <motion.button
                    key={`${gridSize}-${idx}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.01 }}
                    whileHover={{ scale: cell || winner ? 1 : 1.02 }}
                    whileTap={{ scale: cell || winner ? 1 : 0.98 }}
                    onClick={() => handleClick(idx)}
                    className={`aspect-square glass rounded-xl sm:rounded-2xl flex items-center justify-center text-primary transition-all duration-300 relative overflow-hidden ${
                      !cell && !winner ? "hover:bg-primary/5 hover:border-primary/20 cursor-pointer" : "cursor-default"
                    } ${isWinningCell ? "bg-primary/20 border-primary/40" : "border-white/10"}`}
                  >
                    {/* Blooming Effect for Winning Cells */}
                    {isWinningCell && (
                      <motion.div
                        className="absolute inset-0 bg-primary/20 blur-xl"
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                    
                    <AnimatePresence mode="popLayout">
                      {cell === "X" && (
                        <motion.div
                          key="X"
                          initial={{ scale: 0, rotate: -45, opacity: 0 }}
                          animate={{ 
                            scale: 1, 
                            rotate: 0, 
                            opacity: 1,
                            filter: isWinningCell ? "drop-shadow(0 0 10px hsl(var(--primary)))" : "none"
                          }}
                          transition={{ type: "spring", damping: 12, stiffness: 200 }}
                        >
                          <X 
                            strokeWidth={2.5}
                            className={`${
                              gridSize <= 4 ? "w-12 h-12" : gridSize === 6 ? "w-8 h-8" : "w-6 h-6"
                            }`} 
                          />
                        </motion.div>
                      )}
                      {cell === "O" && (
                        <motion.div
                          key="O"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ 
                            scale: 1, 
                            opacity: 1,
                            filter: isWinningCell ? "drop-shadow(0 0 10px hsl(var(--primary)))" : "none"
                          }}
                          transition={{ type: "spring", damping: 12, stiffness: 200 }}
                        >
                          <Circle 
                            strokeWidth={2.5}
                            className={`${
                              gridSize <= 4 ? "w-10 h-10" : gridSize === 6 ? "w-7 h-7" : "w-5 h-5"
                            }`} 
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default TicTacToe;
