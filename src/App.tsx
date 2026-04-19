import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Clarity from "@microsoft/clarity";
import React, { useEffect, Suspense, lazy } from "react";
import CodePatternBackground from "@/components/portfolio/CodePatternBackground";

const queryClient = new QueryClient();

// Lazy load heavier components to prevent blocking FCP and TTI
const ChatBot = lazy(() => import("@/components/portfolio/ChatBot"));
const Games = lazy(() => import("@/pages/Games"));
const TicTacToePage = lazy(() => import("@/pages/TicTacToePage"));
const ScrblePage = lazy(() => import("@/pages/ScrblePage"));
const HeistPage = lazy(() => import("@/pages/HeistPage"));
const SudokuPage = lazy(() => import("@/pages/SudokuPage"));
const ZipPage = lazy(() => import("@/pages/ZipPage"));

function App() {
  useEffect(() => {
    const projectId = "qm1frkauta";
    // Defer Clarity to not block the main thread initially
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        Clarity.init(projectId);
      });
    } else {
      setTimeout(() => {
        Clarity.init(projectId);
      }, 3000);
    }
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <CodePatternBackground />
          <Toaster />
          <Sonner />
          <BrowserRouter
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          >
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/games" element={<Games />} />
              <Route path="/games/tictactoe" element={<TicTacToePage />} />
              <Route path="/games/scrble" element={<ScrblePage />} />
              <Route path="/games/heist" element={<HeistPage />} />
              <Route path="/games/sudoku" element={<SudokuPage />} />
              <Route path="/games/zip" element={<ZipPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Suspense fallback={null}>
            <ChatBot />
          </Suspense>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
