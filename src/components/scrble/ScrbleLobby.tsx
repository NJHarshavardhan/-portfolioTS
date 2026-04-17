import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Copy, Check, Play, User as UserIcon } from 'lucide-react';
import SpotlightCard from '@/components/portfolio/SpotlightCard';
import type { Player } from './types';

interface ScrbleLobbyProps {
  playerName: string;
  setPlayerName: (name: string) => void;
  roomId: string;
  setRoomId: (id: string) => void;
  players: Player[];
  onJoinRoom: () => void;
  onStartGame: () => void;
  isConnecting: boolean;
  isJoined: boolean;
  localPlayerId: string;
  targetPlayers: number;
  setTargetPlayers: (num: number) => void;
}

export default function ScrbleLobby({
  playerName, setPlayerName,
  roomId, setRoomId,
  players,
  onJoinRoom, onStartGame,
  isConnecting, isJoined,
  localPlayerId, targetPlayers, setTargetPlayers
}: ScrbleLobbyProps) {
  const [copied, setCopied] = useState(false);
  const localPlayer = players.find(p => p.id === localPlayerId);
  const isHost = localPlayer?.isHost;

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateRoomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setRoomId(code);
  };

  return (
    <div className="flex justify-center items-center py-12">
      <SpotlightCard className="w-full max-w-lg glass p-8 rounded-3xl border border-white/5 relative overflow-hidden">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-heading font-bold mb-2">Scrble <span className="text-primary">Lobby</span></h2>
          <p className="text-muted-foreground">Join a room and start drawing</p>
        </div>

        {!isJoined ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-primary">Your Name</label>
              <input
                type="text"
                placeholder="Enter a fun name..."
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-primary">Room Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. A1B2C3"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                  className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-foreground uppercase"
                  maxLength={6}
                />
                <button
                  onClick={generateRoomCode}
                  className="px-4 py-2 bg-primary/20 text-primary rounded-xl hover:bg-primary/30 transition-colors whitespace-nowrap"
                >
                  Random
                </button>
              </div>
            </div>
            <button
              onClick={onJoinRoom}
              disabled={isConnecting || !playerName.trim() || !roomId.trim()}
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
            >
              {isConnecting ? 'Connecting...' : <><Users className="w-5 h-5" /> Join Room</>}
            </button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex flex-col items-center p-4 bg-background/50 border border-white/10 rounded-xl">
              <span className="text-sm text-muted-foreground mb-1">Room Code</span>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-mono font-bold text-primary tracking-widest">{roomId}</span>
                <button onClick={copyRoomId} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-muted-foreground" />}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" /> 
                Players ({players.length})
              </h3>
              <div className="bg-background/30 rounded-xl max-h-48 overflow-y-auto p-2 space-y-2 border border-white/5">
                {players.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{p.name} {p.id === localPlayerId && <span className="text-xs text-muted-foreground ml-1">(You)</span>}</span>
                    </div>
                    {p.isHost && <span className="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded-md">HOST</span>}
                  </div>
                ))}
              </div>
            </div>

            {isHost && (
              <div className="space-y-3 pt-2">
                <label className="block text-sm font-medium text-primary">Required Players to Start</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="2" 
                    max="10" 
                    value={targetPlayers}
                    onChange={(e) => setTargetPlayers(Number(e.target.value))}
                    className="flex-1 accent-primary" 
                  />
                  <span className="text-xl font-bold font-mono text-primary w-8 text-center">{targetPlayers}</span>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-white/10">
              {isHost ? (
                <button 
                  onClick={onStartGame}
                  disabled={players.length < targetPlayers}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5 fill-current" />
                  {players.length < targetPlayers ? `Waiting for ${targetPlayers - players.length} more...` : 'Start Game'}
                </button>
              ) : (
                <div className="text-center text-muted-foreground py-3 rounded-xl bg-background/50 border border-white/5 animate-pulse">
                  Waiting for host to start...
                </div>
              )}
            </div>
          </motion.div>
        )}
      </SpotlightCard>
    </div>
  );
}
