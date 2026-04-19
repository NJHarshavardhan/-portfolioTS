import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Grid3X3, BookOpen } from "lucide-react";
import Header from "@/components/portfolio/Header";
import Footer from "@/components/portfolio/Footer";
import portfolioData from "@/data/portfolio.json";
import MiniSudoku from "@/components/portfolio/MiniSudoku";

const SudokuPage = () => {
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
            <Grid3X3 className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-heading font-bold">Mini Sudoku</h1>
          </div>
          <p className="text-muted-foreground">
            A compact 4x4 logic puzzle. Perfect for a quick mental workout.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
            {/* Game Board */}
            <div className="w-full lg:w-1/2">
                <MiniSudoku />
            </div>

            {/* instructions & Stats */}
            <div className="w-full lg:w-1/3 space-y-6">
                <div className="glass p-6 rounded-3xl border border-white/5 relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-4">
                        <BookOpen className="w-5 h-5 text-primary" />
                        <h3 className="font-heading font-bold">How to Play</h3>
                    </div>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex gap-2">
                            <span className="text-primary font-bold">•</span>
                            Fill the 4x4 grid with numbers 1 to 4.
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary font-bold">•</span>
                            Each number must appear exactly once in every row.
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary font-bold">•</span>
                            Each number must appear exactly once in every column.
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary font-bold">•</span>
                            Each number must appear exactly once in every 2x2 subgrid.
                        </li>
                    </ul>
                </div>

                <div className="glass p-6 rounded-3xl border border-white/5 bg-primary/5">
                    <h3 className="font-heading font-bold mb-2">Did you know?</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Mini Sudoku is a great way to introduce logic puzzles to beginners before tackling the standard 9x9 grid.
                    </p>
                </div>
            </div>
        </div>
      </main>

      <Footer name={d.name} contact={d.contact} />
    </div>
  );
};

export default SudokuPage;
