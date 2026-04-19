import { motion } from 'framer-motion';
import { Diamond, ArrowRight } from 'lucide-react';
import SpotlightCard from '@/components/portfolio/SpotlightCard';
import type { Team } from './types';
import { HeistMission } from '@/data/heists';

interface HeistWinnerProps {
  winningTeam: Team;
  myTeam: Team;
  isHost: boolean;
  mission: HeistMission;
  onNextRound: () => void;
}

export default function HeistWinner({ winningTeam, myTeam, isHost, mission, onNextRound }: HeistWinnerProps) {
  const isWinner = winningTeam === myTeam;
  const isAlpha = winningTeam === 'Alpha';

  return (
    <div className="flex justify-center items-center py-12 w-full h-[70vh]">
      <SpotlightCard className={`w-full max-w-3xl glass p-12 rounded-3xl border ${isAlpha ? 'border-red-500/20' : 'border-blue-500/20'} relative overflow-hidden flex flex-col items-center text-center shadow-2xl`}>
        
        {/* Glow Background */}
        <div className={`absolute inset-0 blur-3xl opacity-20 bg-gradient-to-br ${isAlpha ? 'from-red-500 to-orange-500' : 'from-blue-500 to-cyan-500'}`} />

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="mb-8 relative z-10"
        >
          <Diamond className={`w-32 h-32 ${isWinner ? 'text-green-400' : 'text-zinc-600'} drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]`} />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10"
        >
          <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
             {mission.targetItem} Secured
          </div>
          <h2 className={`text-6xl font-heading font-black mb-4 uppercase tracking-tighter ${isAlpha ? 'text-red-400' : 'text-blue-400'}`}>
            Team {winningTeam} Wins!
          </h2>
          
          <div className="mt-8">
            {isWinner ? (
              <p className="text-2xl font-medium text-green-400 bg-green-400/10 px-8 py-3 rounded-full border border-green-400/20 inline-block">
                Mission Accomplished, Operative.
              </p>
            ) : (
              <p className="text-2xl font-medium text-red-500 bg-red-500/10 px-8 py-3 rounded-full border border-red-500/20 inline-block">
                Mission Failed. They beat you to the vault.
              </p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 w-full max-w-sm relative z-10"
        >
          {isHost ? (
            <button
              onClick={onNextRound}
              className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 text-lg shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] uppercase tracking-widest"
            >
              Return to Safehouse <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <div className="text-muted-foreground py-4 rounded-xl bg-black/40 border border-white/5 animate-pulse uppercase tracking-widest text-sm font-bold">
              Waiting for Host to initiate next phase...
            </div>
          )}
        </motion.div>
      </SpotlightCard>
    </div>
  );
}
