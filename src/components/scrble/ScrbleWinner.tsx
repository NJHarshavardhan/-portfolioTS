import { motion } from 'framer-motion';
import { Trophy, Star, ArrowRight } from 'lucide-react';
import SpotlightCard from '@/components/portfolio/SpotlightCard';

interface ScrbleWinnerProps {
  winnerName: string;
  word: string;
  isHost: boolean;
  onNextRound: () => void;
}

export default function ScrbleWinner({ winnerName, word, isHost, onNextRound }: ScrbleWinnerProps) {
  return (
    <div className="flex justify-center items-center py-12 w-full h-[70vh]">
      <SpotlightCard className="w-full max-w-2xl glass p-12 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col items-center text-center shadow-2xl">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full" />
          <Trophy className="w-32 h-32 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)] relative z-10" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-5xl font-heading font-black mb-4 bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-600 bg-clip-text text-transparent pb-2">
            {winnerName} won!
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            They successfully guessed the word:
          </p>
          <div className="inline-block relative">
            <div className="absolute inset-x-0 -bottom-2 h-1 bg-primary/20 blur-sm rounded-full" />
            <span className="text-4xl font-mono font-bold tracking-widest text-primary px-8 py-3 bg-black/40 border border-white/10 rounded-2xl relative block">
              {word.toUpperCase()}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 w-full max-w-sm"
        >
          {isHost ? (
            <button
              onClick={onNextRound}
              className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-lg shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
            >
              Back to Lobby <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <div className="text-muted-foreground py-4 rounded-xl bg-white/5 border border-white/5 animate-pulse flex items-center justify-center gap-2">
              <Star className="w-5 h-5 text-yellow-400/50" />
              Waiting for Host...
            </div>
          )}
        </motion.div>
      </SpotlightCard>
    </div>
  );
}
