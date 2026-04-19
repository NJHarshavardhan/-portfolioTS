import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RealtimeChannel } from '@supabase/supabase-js';
import confetti from 'canvas-confetti';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import Header from '@/components/portfolio/Header';
import Footer from '@/components/portfolio/Footer';
import portfolioData from '@/data/portfolio.json';

import { supabase } from '@/lib/supabase';
import HeistLobby from '@/components/heist/HeistLobby';
import HeistBoard from '@/components/heist/HeistBoard';
import HeistWinner from '@/components/heist/HeistWinner';
import type { HeistPlayer, HeistGameState, Team } from '@/components/heist/types';
import { HEIST_MISSIONS } from '@/data/heists';

export default function HeistPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const d = portfolioData;

  const [gameState, setGameState] = useState<HeistGameState>('lobby');
  const [playerName, setPlayerName] = useState('');
  const [roomId, setRoomId] = useState(searchParams.get('room') || '');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  
  const [players, setPlayers] = useState<HeistPlayer[]>([]);
  const [alphaProgress, setAlphaProgress] = useState(0);
  const [bravoProgress, setBravoProgress] = useState(0);
  
  const [activeMissionId, setActiveMissionId] = useState(HEIST_MISSIONS[0].id);
  const [winningTeam, setWinningTeam] = useState<Team | null>(null);
  const [lastFailedGuess, setLastFailedGuess] = useState('');
  
  const channelRef = useRef<RealtimeChannel | null>(null);
  const localPlayerIdRef = useRef(`hacker-${Math.random().toString(36).substring(2, 9)}`);

  useEffect(() => {
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, []);

  const localPlayer = players.find(p => p.id === localPlayerIdRef.current);
  const isHost = localPlayer?.isHost ?? false;
  const myTeam = localPlayer?.team || 'Alpha';
  const mission = HEIST_MISSIONS.find(m => m.id === activeMissionId) || HEIST_MISSIONS[0];

  const handleJoinRoom = async () => {
    if (!roomId || !playerName) return;
    setIsConnecting(true);

    const channel = supabase.channel(`heist:${roomId}`, {
      config: { presence: { key: localPlayerIdRef.current } },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const presenceState = channel.presenceState();
        const updatedPlayers: HeistPlayer[] = [];
        
        Object.keys(presenceState).forEach(key => {
          const presences = presenceState[key] as any[];
          presences.forEach(p => {
            updatedPlayers.push({
              id: key,
              name: p.name,
              isHost: p.joinedAt === Math.min(...Object.values(presenceState).flatMap((ps: any) => ps.map((x: any) => x.joinedAt))),
              team: p.team || 'Alpha'
            });
          });
        });

        updatedPlayers.sort((a, b) => {
           if (a.isHost) return -1;
           if (b.isHost) return 1;
           return 0;
        });

        setPlayers(updatedPlayers);
      })
      .on('broadcast', { event: 'START_HEIST' }, ({ payload }) => {
        setActiveMissionId(payload.missionId);
        setGameState('playing');
        setAlphaProgress(0);
        setBravoProgress(0);
        setWinningTeam(null);
        setLastFailedGuess('');
      })
      .on('broadcast', { event: 'TEAM_PROGRESS' }, ({ payload }) => {
        if (payload.team === 'Alpha') {
          setAlphaProgress(payload.progress);
        } else {
          setBravoProgress(payload.progress);
        }
      })
      .on('broadcast', { event: 'HEIST_WON' }, ({ payload }) => {
        setWinningTeam(payload.team);
        setGameState('postgame');
        
        // Confetti colors based on winning team
        const colors = payload.team === 'Alpha' ? ['#ff0000', '#ff4d4d'] : ['#0000ff', '#4d4dff'];
        
        const duration = 4000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 40, spread: 360, ticks: 60, zIndex: 0, colors };
        const interval: any = setInterval(function() {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) {
            return clearInterval(interval);
          }
          const particleCount = 50 * (timeLeft / duration);
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } }));
        }, 250);
      })
      .on('broadcast', { event: 'BACK_TO_LOBBY' }, () => {
        setGameState('lobby');
        setAlphaProgress(0);
        setBravoProgress(0);
        setWinningTeam(null);
        setLastFailedGuess('');
      });

    await channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        const existingPresence = channel.presenceState();
        const existingAlphas = Object.values(existingPresence).flatMap((p: any) => p).filter((p: any) => p.team === 'Alpha').length;
        const existingBravos = Object.values(existingPresence).flatMap((p: any) => p).filter((p: any) => p.team === 'Bravo').length;
        const autoTeam = existingBravos < existingAlphas ? 'Bravo' : 'Alpha';

        await channel.track({
          name: playerName,
          joinedAt: Date.now(),
          team: autoTeam
        });
        setIsConnecting(false);
        setIsJoined(true);
        setSearchParams({ room: roomId });
      }
    });

    channelRef.current = channel;
  };

  const handleChangeTeam = async (newTeam: Team) => {
    if (!channelRef.current || !isJoined) return;
    const me = players.find(p => p.id === localPlayerIdRef.current);
    if (!me) return;
    
    await channelRef.current.track({
      name: me.name,
      joinedAt: (me as any).joinedAt || Date.now(),
      team: newTeam
    });
  };

  const handleStartGame = (missionId: string) => {
    if (!isHost) return;
    setActiveMissionId(missionId);
    setGameState('playing');
    setAlphaProgress(0);
    setBravoProgress(0);
    setWinningTeam(null);
    setLastFailedGuess('');

    channelRef.current?.send({
      type: 'broadcast',
      event: 'START_HEIST',
      payload: { missionId }
    });
  };

  const handleGuessPassword = (guess: string) => {
    setLastFailedGuess('');
    const myProgress = myTeam === 'Alpha' ? alphaProgress : bravoProgress;
    
    if (myProgress >= mission.clues.length) return;
    
    const currentClue = mission.clues[myProgress];
    if (guess.toLowerCase() === currentClue.answer.toLowerCase()) {
       // Correct!
       const newProgress = myProgress + 1;
       
       if (myTeam === 'Alpha') setAlphaProgress(newProgress);
       else setBravoProgress(newProgress);

       channelRef.current?.send({
         type: 'broadcast',
         event: 'TEAM_PROGRESS',
         payload: { team: myTeam, progress: newProgress }
       });

       // Check win condition
       if (newProgress === mission.clues.length) {
         setWinningTeam(myTeam);
         setGameState('postgame');
         
         const colors = myTeam === 'Alpha' ? ['#ff0000', '#ff4d4d'] : ['#0000ff', '#4d4dff'];
         confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors });

         channelRef.current?.send({
           type: 'broadcast',
           event: 'HEIST_WON',
           payload: { team: myTeam }
         });
       }
    } else {
       // Incorrect
       setLastFailedGuess(guess);
    }
  };

  const handleBackToLobby = () => {
    if (!isHost) return;
    setGameState('lobby');
    setAlphaProgress(0);
    setBravoProgress(0);
    setWinningTeam(null);
    setLastFailedGuess('');

    channelRef.current?.send({
      type: 'broadcast',
      event: 'BACK_TO_LOBBY'
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-foreground font-body flex flex-col pt-24 pb-12">
      <Header />
      
      <main className="flex-1 container mx-auto px-6 max-w-7xl pt-8">
        <Link 
          to="/games" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 group text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Abort Mission
        </Link>

        {gameState === 'lobby' || !isJoined ? (
          <HeistLobby 
            playerName={playerName}
            setPlayerName={setPlayerName}
            roomId={roomId}
            setRoomId={setRoomId}
            players={players}
            onJoinRoom={handleJoinRoom}
            onChangeTeam={handleChangeTeam}
            onStartGame={handleStartGame}
            isConnecting={isConnecting}
            isJoined={isJoined}
            localPlayerId={localPlayerIdRef.current}
          />
        ) : gameState === 'postgame' && winningTeam ? (
          <HeistWinner 
            winningTeam={winningTeam}
            myTeam={myTeam}
            isHost={isHost}
            mission={mission}
            onNextRound={handleBackToLobby}
          />
        ) : (
          <HeistBoard 
            mission={mission}
            myTeam={myTeam}
            myProgress={myTeam === 'Alpha' ? alphaProgress : bravoProgress}
            enemyProgress={myTeam === 'Alpha' ? bravoProgress : alphaProgress}
            onGuessPassword={handleGuessPassword}
            lastFailedGuess={lastFailedGuess}
          />
        )}
      </main>

      <Footer name={d.name} contact={d.contact} />
    </div>
  );
}
