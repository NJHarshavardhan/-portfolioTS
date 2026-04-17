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
import ScrbleLobby from '@/components/scrble/ScrbleLobby';
import ScrbleBoard from '@/components/scrble/ScrbleBoard';
import ScrbleChat from '@/components/scrble/ScrbleChat';
import ScrbleWinner from '@/components/scrble/ScrbleWinner';
import type { Player, GameState, Stroke, ChatMessage } from '@/components/scrble/types';

const FALLBACK_WORDS = [
  'cat', 'dog', 'house', 'tree', 'sun', 'apple', 'car', 'flower', 
  'pizza', 'banana', 'moon', 'bird', 'fish', 'computer', 'spider',
  'ghost', 'ocean', 'mountain', 'robot', 'dragon'
];

export default function ScrblePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const d = portfolioData;

  const [dbWords, setDbWords] = useState<string[]>(FALLBACK_WORDS);
  const [gameState, setGameState] = useState<GameState>('lobby');
  const [playerName, setPlayerName] = useState('');
  const [roomId, setRoomId] = useState(searchParams.get('room') || '');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [activeWord, setActiveWord] = useState('');
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [targetPlayers, setTargetPlayers] = useState(2);
  const [winnerName, setWinnerName] = useState('');
  const [previousWord, setPreviousWord] = useState('');
  
  const channelRef = useRef<RealtimeChannel | null>(null);
  const localPlayerIdRef = useRef(`player-${Math.random().toString(36).substring(2, 9)}`);

  useEffect(() => {
    // Fetch words from Supabase DB on mount
    const fetchWords = async () => {
      const { data, error } = await supabase.from('gamewords').select('word');
      if (data && !error && data.length > 0) {
        setDbWords(data.map(d => d.word));
      } else {
        console.warn("Failed to load words from Supabase, reverting to fallback list.", error);
      }
    };
    fetchWords();

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, []);

  const localPlayer = players.find(p => p.id === localPlayerIdRef.current);
  const isHost = localPlayer?.isHost ?? false;

  const joinRoom = async () => {
    if (!roomId || !playerName) return;
    setIsConnecting(true);

    const channel = supabase.channel(`room:${roomId}`, {
      config: { presence: { key: localPlayerIdRef.current } },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const presenceState = channel.presenceState();
        const updatedPlayers: Player[] = [];
        
        Object.keys(presenceState).forEach(key => {
          const presences = presenceState[key] as any[];
          presences.forEach(p => {
            updatedPlayers.push({
              id: key,
              name: p.name,
              isHost: p.joinedAt === Math.min(...Object.values(presenceState).flatMap((ps: any) => ps.map((x: any) => x.joinedAt))),
              score: p.score || 0
            });
          });
        });

        // Sort so the oldest is host
        updatedPlayers.sort((a, b) => {
           if (a.isHost) return -1;
           if (b.isHost) return 1;
           return 0;
        });

        setPlayers(updatedPlayers);
      })
      .on('broadcast', { event: 'START_GAME' }, ({ payload }) => {
        setActiveWord(payload.word);
        setGameState('playing');
        setStrokes([]);
        setMessages([{
          id: Date.now().toString(),
          senderId: 'system',
          senderName: 'System',
          text: `Game started! The host is drawing...`,
          isCorrectGuess: false,
          system: true
        }]);
      })
      .on('broadcast', { event: 'DRAW_STROKE' }, ({ payload }) => {
        setStrokes((prev) => [...prev, payload.stroke]);
      })
      .on('broadcast', { event: 'CLEAR_CANVAS' }, () => {
        setStrokes([]);
      })
      .on('broadcast', { event: 'CHAT_MESSAGE' }, ({ payload }) => {
        setMessages((prev) => [...prev, payload.message]);
      })
      .on('broadcast', { event: 'CORRECT_GUESS' }, ({ payload }) => {
        setMessages((prev) => [...prev, {
          id: Date.now().toString(),
          senderId: 'system',
          senderName: 'System',
          text: `${payload.playerName} guessed the word! (${payload.word})`,
          isCorrectGuess: true,
          system: true
        }]);
        
        setWinnerName(payload.playerName);
        setPreviousWord(payload.word);
        setGameState('postgame'); // End round
        
        // Fire confetti for everyone!
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
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
        setActiveWord('');
        setWinnerName('');
        setPreviousWord('');
      });

    await channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({
          name: playerName,
          joinedAt: Date.now(),
          score: 0
        });
        setIsConnecting(false);
        setIsJoined(true);
        setSearchParams({ room: roomId });
      }
    });

    channelRef.current = channel;
  };

  const startGame = () => {
    if (!isHost) return;
    const word = dbWords[Math.floor(Math.random() * dbWords.length)];
    setActiveWord(word);
    setGameState('playing');
    setStrokes([]);
    
    channelRef.current?.send({
      type: 'broadcast',
      event: 'START_GAME',
      payload: { word }
    });
  };

  const handleDraw = (stroke: Stroke) => {
    setStrokes(prev => [...prev, stroke]);
    channelRef.current?.send({
      type: 'broadcast',
      event: 'DRAW_STROKE',
      payload: { stroke }
    });
  };

  const handleClearCanvas = () => {
    setStrokes([]);
    channelRef.current?.send({
      type: 'broadcast',
      event: 'CLEAR_CANVAS'
    });
  };

  const handleSkipWord = () => {
    if (!isHost) return;
    const word = dbWords[Math.floor(Math.random() * dbWords.length)];
    setActiveWord(word);
    setStrokes([]);
    channelRef.current?.send({
      type: 'broadcast',
      event: 'START_GAME',
      payload: { word }
    });
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      senderId: 'system',
      senderName: 'System',
      text: `Host skipped the word! New word selected.`,
      isCorrectGuess: false,
      system: true
    }]);
  };

  const handleSendMessage = (text: string) => {
    if (gameState !== 'playing') return;

    if (text.toLowerCase() === activeWord.toLowerCase() && !isHost) {
      // Correct guess logic
      channelRef.current?.send({
        type: 'broadcast',
        event: 'CORRECT_GUESS',
        payload: { playerName: localPlayer?.name, word: activeWord }
      });
      // End game locally
      setWinnerName(localPlayer?.name || 'You');
      setPreviousWord(activeWord);
      setGameState('postgame');
      
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } }));
      }, 250);

      return;
    }

    // Normal message
    const message: ChatMessage = {
      id: Date.now().toString() + Math.random(),
      senderId: localPlayerIdRef.current,
      senderName: localPlayer?.name || 'Unknown',
      text,
      isCorrectGuess: false,
      system: false
    };

    setMessages(prev => [...prev, message]);
    channelRef.current?.send({
      type: 'broadcast',
      event: 'CHAT_MESSAGE',
      payload: { message }
    });
  };

  const handleBackToLobby = () => {
    if (!isHost) return;
    setGameState('lobby');
    setActiveWord('');
    setWinnerName('');
    setPreviousWord('');
    channelRef.current?.send({
      type: 'broadcast',
      event: 'BACK_TO_LOBBY'
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28 pb-12 container mx-auto px-6 max-w-7xl">
        <Link 
          to="/games" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 group text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Games
        </Link>

        {gameState === 'lobby' || !isJoined ? (
          <ScrbleLobby 
            playerName={playerName}
            setPlayerName={setPlayerName}
            roomId={roomId}
            setRoomId={setRoomId}
            players={players}
            onJoinRoom={joinRoom}
            onStartGame={startGame}
            isConnecting={isConnecting}
            isJoined={isJoined}
            localPlayerId={localPlayerIdRef.current}
            targetPlayers={targetPlayers}
            setTargetPlayers={setTargetPlayers}
          />
        ) : gameState === 'postgame' ? (
          <ScrbleWinner 
            winnerName={winnerName} 
            word={previousWord} 
            isHost={isHost} 
            onNextRound={handleBackToLobby} 
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-[70vh] min-h-[600px]">
            <ScrbleBoard 
              isHost={isHost} 
              onDraw={handleDraw} 
              onClear={handleClearCanvas}
              onSkip={handleSkipWord}
              strokes={strokes}
              activeWord={activeWord}
            />
            <ScrbleChat 
              messages={messages}
              onSendMessage={handleSendMessage}
              isHost={isHost}
              players={players}
            />
          </div>
        )}
      </main>

      <Footer name={d.name} contact={d.contact} />
    </div>
  );
}
