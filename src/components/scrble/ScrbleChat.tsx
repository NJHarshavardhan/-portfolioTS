import React, { useState, useRef, useEffect } from 'react';
import { Send, Trophy, Info } from 'lucide-react';
import type { ChatMessage, Player } from './types';

interface ScrbleChatProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isHost: boolean;
  players: Player[];
}

export default function ScrbleChat({ messages, onSendMessage, isHost, players }: ScrbleChatProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isHost) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-[600px] h-full bg-background/50 rounded-3xl border border-white/5 overflow-hidden col-span-1 lg:col-span-1">
      {/* Leaderboard Header */}
      <div className="p-4 border-b border-white/5 bg-white/5">
        <h3 className="font-heading font-bold text-lg mb-3 flex items-center gap-2 text-primary">
          <Trophy className="w-5 h-5 text-yellow-400" /> Leaderboard
        </h3>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {[...players].sort((a, b) => b.score - a.score).map((p, idx) => (
            <div key={p.id} className="flex justify-between items-center text-sm">
              <span className="text-foreground font-medium flex items-center gap-2">
                <span className="text-muted-foreground w-4">{idx + 1}.</span> 
                {p.name} {p.isHost && <PencilIcon />}
              </span>
              <span className="font-bold text-primary">{p.score} pts</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className="text-center mb-4">
          <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full border border-primary/20">
            Welcome to the chat!
          </span>
        </div>
        
        {messages.map((msg) => (
          <div key={msg.id} className={`text-sm rounded-xl p-3 animate-in fade-in slide-in-from-bottom-2 flex flex-col ${
            msg.system 
              ? 'bg-blue-500/10 border border-blue-500/20 text-blue-200'
              : msg.isCorrectGuess 
                ? 'bg-green-500/10 border border-green-500/20 text-green-300' 
                : 'bg-white/5 border border-white/5 text-muted-foreground'
          }`}>
            <div className="flex items-center gap-2 mb-1">
              {!msg.system && !msg.isCorrectGuess && (
                <span className="font-bold text-foreground text-xs">{msg.senderName} guessed:</span>
              )}
              {msg.system && <Info className="w-3 h-3 text-blue-400" />}
              {msg.isCorrectGuess && <Trophy className="w-3 h-3 text-yellow-400" />}
            </div>
            
            <span className={msg.system ? 'font-medium' : msg.isCorrectGuess ? 'font-bold' : 'text-foreground font-medium bg-black/20 rounded p-2 border border-white/5 inline-block w-full break-all'}>
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/5 bg-white/5">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isHost}
            placeholder={isHost ? "You are drawing..." : "Type your guess..."}
            className="w-full bg-black/40 border border-white/10 rounded-xl pl-4 pr-12 py-3 outline-none focus:border-primary transition-colors text-foreground disabled:opacity-50 text-sm"
          />
          <button
            type="submit"
            disabled={isHost || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
    <path d="m15 5 4 4"/>
  </svg>
);
