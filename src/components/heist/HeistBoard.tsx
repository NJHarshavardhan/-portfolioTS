import React, { useState } from 'react';
import { Lock, Unlock, ShieldAlert, Key } from 'lucide-react';
import SpotlightCard from '@/components/portfolio/SpotlightCard';
import type { Team, HeistPlayer } from './types';
import { HeistMission } from '@/data/heists';

interface HeistBoardProps {
  mission: HeistMission;
  myTeam: Team;
  myProgress: number;
  enemyProgress: number;
  onGuessPassword: (guess: string) => void;
  lastFailedGuess: string;
}

export default function HeistBoard({
  mission, myTeam, myProgress, enemyProgress, onGuessPassword, lastFailedGuess
}: HeistBoardProps) {
  const [guess, setGuess] = useState('');
  const totalClues = mission.clues.length;

  const currentClue = myProgress < totalClues ? mission.clues[myProgress] : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.trim() && currentClue) {
      onGuessPassword(guess.trim());
      setGuess('');
    }
  };

  const isEnemyDone = enemyProgress >= totalClues;

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 relative">

      {/* Target Item Briefing Panel */}
      <SpotlightCard className="glass md:col-span-1 p-6 rounded-3xl border border-white/5 flex flex-col items-center text-center space-y-4">
        <div className="w-full flex items-center justify-between opacity-50 mb-2">
          <div className="h-px bg-white/20 flex-1" />
          <span className="px-2 font-mono text-xs tracking-widest">MISSION REF: {mission.id.toUpperCase()}</span>
          <div className="h-px bg-white/20 flex-1" />
        </div>
        <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
          <Key className="w-10 h-10 text-primary" />
        </div>
        <div>
          <h3 className="font-heading font-black text-xl text-primary">{mission.title}</h3>
          <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Difficulty: {mission.difficulty}</p>
        </div>
        <p className="text-sm text-muted-foreground mt-4">{mission.description}</p>

        <div className="mt-auto w-full p-4 bg-black/40 rounded-xl border border-white/5">
          <span className="block text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Target Asset</span>
          <span className="font-bold text-foreground">{mission.targetItem}</span>
        </div>
      </SpotlightCard>

      {/* Main Terminal */}
      <div className="md:col-span-2 flex flex-col gap-6">

        {/* Progress Bars */}
        <div className="bg-black/40 rounded-2xl p-4 border border-white/5 space-y-4">
          <div>
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
              <span className={myTeam === 'Alpha' ? 'text-red-400' : 'text-blue-400'}>Your Team ({myTeam})</span>
              <span className="text-muted-foreground">{myProgress} / {totalClues} Locks</span>
            </div>
            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden flex gap-1 p-[1px]">
              {Array.from({ length: totalClues }).map((_, i) => (
                <div key={i} className={`h-full flex-1 rounded-full bg-opacity-70 ${i < myProgress ? (myTeam === 'Alpha' ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-blue-500 shadow-[0_0_10px_blue]') : 'bg-transparent'}`} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
              <span className={myTeam === 'Alpha' ? 'text-blue-400/50' : 'text-red-400/50'}>Enemy Team</span>
              <span className="text-muted-foreground">{enemyProgress} / {totalClues} Locks</span>
            </div>
            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden flex gap-1 p-[1px]">
              {Array.from({ length: totalClues }).map((_, i) => (
                <div key={i} className={`h-full flex-1 rounded-full bg-opacity-20 ${i < enemyProgress ? (myTeam === 'Alpha' ? 'bg-blue-500' : 'bg-red-500') : 'bg-transparent'}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Terminal Input */}
        <SpotlightCard className="flex-1 glass rounded-3xl border border-white/5 p-6 flex flex-col">
          {currentClue ? (
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <Lock className="w-5 h-5 text-primary" />
                <h4 className="font-mono font-bold text-white tracking-widest text-lg">ENCRYPTION LOCK 0{myProgress + 1}</h4>
              </div>

              <div className="flex-1 flex flex-col justify-center items-center text-center px-4 mb-8">
                <p className="text-2xl font-medium text-foreground leading-relaxed">
                  "{currentClue.riddle}"
                </p>
                {/* Hint System */}
                <div className="mt-8 text-sm bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-lg font-mono">
                  Hint: {currentClue.hint}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="relative mt-auto">
                {lastFailedGuess && (
                  <span className="absolute -top-8 left-4 text-xs font-medium text-red-400 font-mono flex items-center gap-1 animate-pulse">
                    <ShieldAlert className="w-3 h-3" /> ACCESS DENIED: "{lastFailedGuess}"
                  </span>
                )}
                <div className="relative font-mono">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">&gt;&gt;</span>
                  <input
                    type="text"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder="Enter decryption key..."
                    className="w-full bg-black/50 border-2 border-white/10 focus:border-primary rounded-xl pl-12 pr-32 py-4 outline-none transition-colors text-white uppercase text-lg tracking-widest"
                  />
                  <button
                    type="submit"
                    disabled={!guess.trim()}
                    className="absolute right-2 top-2 bottom-2 bg-primary text-primary-foreground px-6 rounded-lg font-bold hover:opacity-90 disabled:opacity-50 transition-all"
                  >
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <Unlock className="w-20 h-20 text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
              <h3 className="text-3xl font-black text-green-400 uppercase tracking-widest">FIREWALL BREACHED</h3>
              <p className="text-muted-foreground">Extracting target asset...</p>
            </div>
          )}
        </SpotlightCard>

      </div>
    </div>
  );
}
