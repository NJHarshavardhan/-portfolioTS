import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Gamepad2, ArrowLeft, Play, Brush } from "lucide-react";
import Header from "@/components/portfolio/Header";
import Footer from "@/components/portfolio/Footer";
import portfolioData from "@/data/portfolio.json";
import SpotlightCard from "@/components/portfolio/SpotlightCard";
import ScrollFloatText from "@/components/portfolio/ScrollFloatText";

const gamesList = [
  {
    id: "tictactoe",
    name: "Tic Tac Toe",
    description: "The classic X and O game with a premium look and smart AI.",
    path: "/games/tictactoe",
    icon: Gamepad2,
    color: "text-primary",
  },
  {
    id: "scrble",
    name: "Scrble",
    description: "Multiplayer real-time drawing and guessing game.",
    path: "/games/scrble",
    icon: Brush,
    color: "text-blue-400",
  }
];

const Games = () => {
  const d = portfolioData;

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Header />
      
      <main className="pt-32 pb-24 container mx-auto px-6">
        <div className="mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-[40px] bg-primary/40" />
            <ScrollFloatText
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
              containerClassName="my-0"
              textClassName="text-3xl sm:text-5xl font-heading font-bold text-foreground"
            >
              Game Zone
            </ScrollFloatText>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            A collection of mini-games built to showcase interactive logic and clean UI. Play against a friend or challenge the AI.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gamesList.map((game) => (
            <Link key={game.id} to={game.path}>
              <SpotlightCard className="glass p-8 rounded-3xl border border-white/5 hover:border-primary/20 transition-all group h-full">
                <div className="flex flex-col h-full">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <game.icon className={`w-8 h-8 ${game.color}`} />
                  </div>
                  
                  <h3 className="text-2xl font-heading font-bold mb-3 group-hover:text-primary transition-colors">
                    {game.name}
                  </h3>
                  
                  <p className="text-muted-foreground mb-8 flex-grow">
                    {game.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    Play Now
                    <Play className="w-4 h-4 fill-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </SpotlightCard>
            </Link>
          ))}
        </div>
      </main>

      <Footer name={d.name} contact={d.contact} />
    </div>
  );
};

export default Games;
