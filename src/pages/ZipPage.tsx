import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Zap, MousePointer2 } from "lucide-react";
import Header from "@/components/portfolio/Header";
import Footer from "@/components/portfolio/Footer";
import portfolioData from "@/data/portfolio.json";
import ZipGame from "@/components/portfolio/ZipGame";

const ZipPage = () => {
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
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary fill-primary" />
            </div>
            <h1 className="text-4xl font-heading font-bold">Zip</h1>
          </div>
          <p className="text-muted-foreground">
            A continuous path logic puzzle. Fill the entire grid by connecting the numbers.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
            {/* Game Board */}
            <div className="w-full lg:w-1/2">
                <ZipGame />
            </div>

            {/* instructions & Sidebar */}
            <div className="w-full lg:w-1/3 space-y-6">
                <div className="glass p-6 rounded-3xl border border-white/5 relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-4">
                        <MousePointer2 className="w-5 h-5 text-primary" />
                        <h3 className="font-heading font-bold">Controls</h3>
                    </div>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex gap-2 text-foreground font-medium">
                            <span className="text-primary font-bold">1.</span>
                            Click and drag from "1".
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary font-bold">2.</span>
                            Connect to the next numbers in order.
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary font-bold">3.</span>
                            The path must visit every single square.
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary font-bold">4.</span>
                            You cannot cross your own path.
                        </li>
                    </ul>
                </div>

                <div className="glass p-6 rounded-3xl border border-white/5 bg-primary/5 hover:bg-primary/10 transition-colors group">
                    <h3 className="font-heading font-bold mb-2 group-hover:text-primary transition-colors">LinkedIn Challenge</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Zip is a popular daily game on LinkedIn. It challenges your spatial reasoning and planning skills.
                    </p>
                </div>
            </div>
        </div>
      </main>

      <Footer name={d.name} contact={d.contact} />
    </div>
  );
};

export default ZipPage;
