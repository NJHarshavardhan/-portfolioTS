import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import Header from "@/components/portfolio/Header";
import Footer from "@/components/portfolio/Footer";
import portfolioData from "@/data/portfolio.json";
import TicTacToe from "@/components/portfolio/TicTacToe";

const TicTacToePage = () => {
  const d = portfolioData;

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
