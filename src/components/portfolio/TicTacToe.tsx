import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Circle, RotateCcw, Trophy, Users, Cpu } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import ScrollFloatText from "./ScrollFloatText";
import SpotlightCard from "./SpotlightCard";

type Player = "X" | "O";
type CellValue = Player | null;

const TicTacToe = () => {
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<CellValue | "Draw">(null);
  const [isSinglePlayer, setIsSinglePlayer] = useState(true);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const calculateWinner = useCallback((squares: CellValue[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    if (squares.every((square) => square !== null)) {
      return { winner: "Draw" as const, line: null };
    }
    return null;
  }, []);

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

    // AI logic: 
    // 1. Can AI win?
    // 2. Can AI block player?
    // 3. Take center.
    // 4. Random.
    
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
    // 3. Center
    if (move === -1 && availableMoves.includes(4)) move = 4;
    // 4. Random
    if (move === -1) move = availableMoves[Math.floor(Math.random() * availableMoves.length)];

    setTimeout(() => handleClick(move), 600);
  }, [board, isXNext, winner, calculateWinner]);

  useEffect(() => {
    if (isSinglePlayer && !isXNext && !winner) {
      makeAiMove();
    }
  }, [isXNext, isSinglePlayer, winner, makeAiMove]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
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
            Tic Tac Toe
          </ScrollFloatText>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-primary/40" />
        </motion.div>

        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12 items-center justify-center">
          {/* Controls & Stats */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <SpotlightCard className="glass p-6 rounded-2xl border border-white/5 shadow-xl">
              <h3 className="text-xl font-heading font-semibold mb-4 text-foreground flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Game Mode
              </h3>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => { setIsSinglePlayer(true); resetGame(); }}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                    isSinglePlayer 
                      ? "bg-primary/20 border-primary/30 text-primary" 
                      : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10"
                  } border`}
                >
                  <div className="flex items-center gap-3">
                    <Cpu className="w-4 h-4" />
                    <span className="font-body font-medium">Player vs AI</span>
                  </div>
                  {isSinglePlayer && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                </button>
                <button
                  onClick={() => { setIsSinglePlayer(false); resetGame(); }}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                    !isSinglePlayer 
                      ? "bg-primary/20 border-primary/30 text-primary" 
                      : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10"
                  } border`}
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4" />
                    <span className="font-body font-medium">Player vs Player</span>
                  </div>
                  {!isSinglePlayer && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                </button>
              </div>
            </SpotlightCard>

            <SpotlightCard className="glass p-6 rounded-2xl border border-white/5 shadow-xl">
              <div className="flex flex-col items-center gap-4">
                <div className="text-sm font-body text-muted-foreground uppercase tracking-widest">
                  {winner ? "Game Over" : "Current Turn"}
                </div>
                
                <AnimatePresence mode="wait">
                  {winner ? (
                    <motion.div
                      key="winner"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl font-heading font-bold text-primary flex items-center gap-2"
                    >
                      {winner === "Draw" ? (
                        "It's a Draw!"
                      ) : (
                        <>
                          {winner === "X" ? <X className="w-8 h-8" /> : <Circle className="w-7 h-7" />}
                          Wins!
                        </>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="turn"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-2xl font-heading font-bold text-foreground flex items-center gap-2"
                    >
                      {isXNext ? <X className="w-8 h-8 text-primary" /> : <Circle className="w-7 h-7 text-primary" />}
                      {isXNext ? "Player X" : isSinglePlayer ? "AI (O)" : "Player O"}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={resetGame}
                  className="mt-2 flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-body font-semibold hover:opacity-90 transition-all shadow-[0_0_20px_hsl(var(--primary)/0.2)]"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Game
                </button>
              </div>
            </SpotlightCard>
          </div>

          {/* Game Board */}
          <div className="relative">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-primary/10 blur-3xl -z-10 rounded-full" />
            
            <div className="grid grid-cols-3 gap-3">
              {board.map((cell, idx) => {
                const isWinningCell = winningLine?.includes(idx);
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: cell || winner ? 1 : 1.05 }}
                    whileTap={{ scale: cell || winner ? 1 : 0.95 }}
                    onClick={() => handleClick(idx)}
                    className={`w-24 h-24 sm:w-32 sm:h-32 glass-strong rounded-2xl flex items-center justify-center text-primary transition-all duration-300 ${
                      !cell && !winner ? "hover:bg-primary/5 cursor-pointer" : "cursor-default"
                    } ${isWinningCell ? "bg-primary/20 border-primary/50 shadow-[0_0_30px_hsl(var(--primary)/0.3)] ring-2 ring-primary/40" : "border-white/5"}`}
                  >
                    <AnimatePresence>
                      {cell === "X" && (
                        <motion.div
                          initial={{ scale: 0, rotate: -45, opacity: 0 }}
                          animate={{ scale: 1, rotate: 0, opacity: 1 }}
                          transition={{ type: "spring", damping: 12, stiffness: 200 }}
                        >
                          <X className="w-12 h-12 sm:w-16 sm:h-16 stroke-[2.5]" />
                        </motion.div>
                      )}
                      {cell === "O" && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", damping: 12, stiffness: 200 }}
                        >
                          <Circle className="w-10 h-10 sm:w-14 sm:h-14 stroke-[2.5]" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
            
            {/* Board Grid Lines (Optional decorative) */}
            <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.05),transparent_80%)]" />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default TicTacToe;
