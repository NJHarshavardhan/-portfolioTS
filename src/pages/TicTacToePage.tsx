import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Gamepad2, Wifi, UserPlus, Users, LogIn, Copy, Check } from "lucide-react";
import Header from "@/components/portfolio/Header";
import Footer from "@/components/portfolio/Footer";
import portfolioData from "@/data/portfolio.json";
import TicTacToe from "@/components/portfolio/TicTacToe";

const TicTacToePage = () => {
  const d = portfolioData;
  const [joinRoomId, setJoinRoomId] = useState("");
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCreateRoom = () => {
    // Generate a random 6-character alphanumeric room code
    const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    setActiveRoomId(newRoomId);
  };

  const handleJoinRoom = () => {
    if (joinRoomId.trim()) {
      setActiveRoomId(joinRoomId.trim().toUpperCase());
      setJoinRoomId("");
    }
  };

  const copyRoomId = () => {
    if (activeRoomId) {
      navigator.clipboard.writeText(activeRoomId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Header />
      
      <main className="pt-32 pb-24 container mx-auto px-6">
        <div className="max-w-4xl mx-auto mb-12">
          <Link 
            to="/games" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Game Zone
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <Gamepad2 className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-heading font-bold">Tic Tac Toe</h1>
          </div>
          <p className="text-muted-foreground">
            A classic game of strategy. Experience smooth animations and a challenging AI opponent.
          </p>

          {/* Multiplayer Room Basic UI */}
          <div className="mt-12 space-y-6">
            <h2 className="text-xl font-heading font-bold flex items-center gap-2">
              <Wifi className="w-5 h-5 text-primary animate-pulse" />
              Online Multiplayer
            </h2>
            
            <div className="flex flex-col md:flex-row items-stretch gap-4">
              {/* Host Room */}
              <div className="flex-1 glass p-6 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-primary/30 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <UserPlus className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold">Host a Match</h3>
                      <p className="text-xs text-muted-foreground">Create a room and invite a friend</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleCreateRoom}
                    disabled={!!activeRoomId}
                    className="w-full py-3 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/30 hover:border-primary rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Generate Room Code
                  </button>
                </div>
              </div>

              {/* Join Room */}
              <div className="flex-1 glass p-6 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-white/20 transition-colors">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <Users className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold">Join a Match</h3>
                      <p className="text-xs text-muted-foreground">Enter code to join existing room</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="ROOM CODE"
                      value={joinRoomId}
                      onChange={(e) => setJoinRoomId(e.target.value)}
                      maxLength={6}
                      disabled={!!activeRoomId}
                      className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono uppercase tracking-widest text-sm disabled:opacity-50"
                    />
                    <button 
                      onClick={handleJoinRoom}
                      disabled={!joinRoomId.trim() || !!activeRoomId}
                      className="px-6 bg-white/10 hover:bg-white/20 text-foreground rounded-xl font-bold disabled:opacity-50 transition-all flex items-center gap-2"
                    >
                      <LogIn className="w-4 h-4" />
                      Join
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Room Status */}
            <AnimatePresence>
              {activeRoomId && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, y: 10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-primary/10 border border-primary/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_30px_hsl(var(--primary)/0.15)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                    
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                      <div>
                        <p className="text-sm font-medium text-primary">Active Room</p>
                        <p className="text-xs text-muted-foreground">Waiting for opponent...</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto relative z-10">
                      <button
                        onClick={copyRoomId}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-black/40 hover:bg-black/60 border border-white/10 hover:border-primary/50 px-4 py-2 rounded-xl transition-all group"
                      >
                        <span className="font-mono font-bold tracking-widest text-lg group-hover:text-primary transition-colors">
                          {activeRoomId}
                        </span>
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />}
                      </button>
                      <button
                        onClick={() => setActiveRoomId(null)}
                        className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-400/70 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                      >
                        Leave
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="glass-strong rounded-[2.5rem] p-8 sm:p-12 border border-white/5 relative overflow-hidden shadow-2xl">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />
          
          <TicTacToe />
        </div>
      </main>

      <Footer name={d.name} contact={d.contact} />
    </div>
  );
};

export default TicTacToePage;
