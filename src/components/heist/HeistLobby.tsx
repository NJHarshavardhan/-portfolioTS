import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Copy, Check, Play, User as UserIcon, Shield, Swords } from 'lucide-react';
import SpotlightCard from '@/components/portfolio/SpotlightCard';
import type { HeistPlayer, Team } from './types';
import { HEIST_MISSIONS } from '@/data/heists';

interface HeistLobbyProps {
  playerName: string;
  setPlayerName: (name: string) => void;
  roomId: string;
  setRoomId: (id: string) => void;
  players: HeistPlayer[];
  onJoinRoom: () => void;
  onChangeTeam: (team: Team) => void;
  onStartGame: (missionId: string) => void;
  isConnecting: boolean;
  isJoined: boolean;
  localPlayerId: string;
}

export default function HeistLobby({
  playerName, setPlayerName,
  roomId, setRoomId,
  players,
  onJoinRoom, onChangeTeam, onStartGame,
  isConnecting, isJoined,
  localPlayerId
}: HeistLobbyProps) {
  const [copied, setCopied] = useState(false);
  const [selectedMission, setSelectedMission] = useState(HEIST_MISSIONS[0].id);
  const localPlayer = players.find(p => p.id === localPlayerId);
  const isHost = localPlayer?.isHost;

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateRoomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'HEIST-';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setRoomId(code);
  };

  const alphaTeam = players.filter(p => p.team === 'Alpha');
  const bravoTeam = players.filter(p => p.team === 'Bravo');

  return (
    <div className="flex justify-center items-center py-12">
      <SpotlightCard className="w-full max-w-2xl glass p-8 rounded-3xl border border-white/5 relative overflow-hidden">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-heading font-black mb-2 uppercase tracking-widest"><span className="text-primary">Puzzle</span> Heist</h2>
          <p className="text-muted-foreground">Crack the codes, steal the loot, beat the rival team.</p>
        </div>

        {!isJoined ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-lg mx-auto">
            <div>
              <label className="block text-sm font-bold mb-2 text-primary uppercase tracking-wider">Operative Alias</label>
              <input
                type="text"
                placeholder="Enter hacker name..."
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full bg-black/60 border border-primary/20 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-primary font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-primary uppercase tracking-wider">Mission Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. HEIST-1234"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                  className="w-full bg-black/60 border border-primary/20 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-primary font-mono uppercase tracking-widest"
                  maxLength={10}
                />
                <button
                  onClick={generateRoomCode}
                  className="px-4 py-2 flex-shrink-0 bg-primary/20 text-primary border border-primary/50 font-bold uppercase rounded-xl hover:bg-primary/30 transition-colors"
                >
                  Random
                </button>
              </div>
            </div>
            <button
              onClick={onJoinRoom}
              disabled={isConnecting || !playerName.trim() || !roomId.trim()}
              className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-black uppercase tracking-widest hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              {isConnecting ? 'Establishing Connection...' : <><Shield className="w-5 h-5" /> Brech Network</>}
            </button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex flex-col items-center p-4 bg-black/40 border border-primary/20 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 w-full h-1 bg-primary/50" />
              <span className="text-xs font-bold text-primary mb-1 uppercase tracking-widest">Active Server</span>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-mono font-bold text-white tracking-widest">{roomId}</span>
                <button onClick={copyRoomId} className="p-2 bg-white/5 hover:bg-primary/20 rounded-lg transition-colors">
                  {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-primary" />}
                </button>
              </div>
            </div>

            {/* Team Selection */}
            <div className="grid grid-cols-2 gap-4">
              {/* Alpha Team */}
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 flex flex-col">
                <h3 className="font-black text-red-500 uppercase tracking-widest mb-3 flex items-center gap-2 border-b border-red-500/20 pb-2">
                  <Swords className="w-4 h-4" /> Team Alpha
                </h3>
                <div className="space-y-2 flex-1 mb-4 leading-none">
                  {alphaTeam.map(p => (
                    <div key={p.id} className="flex flex-col gap-1 text-sm bg-black/40 px-3 py-2 rounded border border-white/5">
                      <span className="font-mono text-red-100">{p.name} {p.id === localPlayerId && '(You)'}</span>
                    </div>
                  ))}
                </div>
                {localPlayer?.team !== 'Alpha' && (
                  <button 
                    onClick={() => onChangeTeam('Alpha')}
                    className="w-full py-2 bg-red-500/20 text-red-400 rounded-lg text-sm font-bold hover:bg-red-500/30 transition-colors uppercase mt-auto"
                  >
                    Join Alpha
                  </button>
                )}
              </div>
              
              {/* Bravo Team */}
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 flex flex-col">
                <h3 className="font-black text-blue-500 uppercase tracking-widest mb-3 flex items-center gap-2 border-b border-blue-500/20 pb-2">
                  <Swords className="w-4 h-4" /> Team Bravo
                </h3>
                <div className="space-y-2 flex-1 mb-4 leading-none">
                  {bravoTeam.map(p => (
                    <div key={p.id} className="flex flex-col gap-1 text-sm bg-black/40 px-3 py-2 rounded border border-white/5">
                      <span className="font-mono text-blue-100">{p.name} {p.id === localPlayerId && '(You)'}</span>
                    </div>
                  ))}
                </div>
                {localPlayer?.team !== 'Bravo' && (
                  <button 
                    onClick={() => onChangeTeam('Bravo')}
                    className="w-full py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-bold hover:bg-blue-500/30 transition-colors uppercase mt-auto"
                  >
                    Join Bravo
                  </button>
                )}
              </div>
            </div>

            {/* Host Controls */}
            {isHost && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <label className="block text-sm font-bold mb-2 text-foreground uppercase tracking-widest">Select Target Mission:</label>
                <select 
                  value={selectedMission} 
                  onChange={(e) => setSelectedMission(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-white outline-none mb-4"
                >
                  {HEIST_MISSIONS.map(m => (
                    <option key={m.id} value={m.id}>{m.title} ({m.difficulty})</option>
                  ))}
                </select>

                <button 
                  onClick={() => onStartGame(selectedMission)}
                  disabled={alphaTeam.length === 0 && bravoTeam.length === 0}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold uppercase tracking-widest hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Initiate Hack
                </button>
              </div>
            )}
            
            {!isHost && (
              <div className="text-center text-primary py-4 rounded-xl font-mono uppercase tracking-widest bg-primary/10 border border-primary/20 animate-pulse">
                Awaiting Host Commands...
              </div>
            )}
            
          </motion.div>
        )}
      </SpotlightCard>
    </div>
  );
}
