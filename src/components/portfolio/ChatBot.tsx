import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Terminal, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import data from "../../data/portfolio.json";

type Message = { id: string; text: string; from: "user" | "bot"; ts: number };

const SUGGESTIONS = [
  "Experience?",
  "Tech stack?",
  "Location?",
  "Projects?",
  "Contact?",
] as const;

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto)
    return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatTime(ts: number) {
  try {
    return new Date(ts).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBotTyping]);

  useEffect(() => {
    if (!isOpen) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 120);
    return () => window.clearTimeout(t);
  }, [isOpen]);

  const handleSend = async (customInput?: string) => {
    const messageToSend = customInput || input;
    if (!messageToSend.trim() || isBotTyping) return;

    const userMessage: Message = {
      id: createId(),
      text: messageToSend,
      from: "user",
      ts: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsBotTyping(true);

    try {
      const currentDateTime = new Date().toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      });
      const systemMessage = {
        role: "system",
        content: `You are Harsha Vardhan NJ himself. Answer as Harsha. Source: ${JSON.stringify(
          data,
        )}. Tone: Friendly developer, professional but casual. Use first person. If unknown, say: "I can only answer questions related to my profile." The current date, time, and day is ${currentDateTime}.`,
      };

      const chatPayload = {
        model: "openrouter/free",
        messages: [
          systemMessage,
          ...messages.map((msg) => ({
            role: msg.from === "user" ? "user" : "assistant",
            content: msg.text,
          })),
          { role: "user", content: messageToSend },
        ],
      };

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "HTTP-Referer": "https://harsha-pro.vercel.app/",
            "X-OpenRouter-Title": "Harsha Vardhan NJ",
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(chatPayload),
        },
      );

      const responseData = await response.json();
      const botReply: Message = {
        id: createId(),
        text: responseData.choices?.[0]?.message?.content || "No response.",
        from: "bot",
        ts: Date.now(),
      };
      setMessages((prev) => [...prev, botReply]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          text: "Network error. Try again later.",
          from: "bot",
          ts: Date.now(),
        },
      ]);
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsOpen(true)}
            aria-label="Open chat"
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-14 h-14 rounded-full shadow-2xl z-[100] flex items-center justify-center border border-slate-200/20 bg-primary text-primary-foreground ring-1 ring-black/5 transition-all hover:shadow-[0_8px_30px_hsl(var(--primary)/0.4)]"
          >
            <MessageCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-[calc(100vw-3rem)] sm:w-[350px] max-w-[400px] h-[500px] bg-white dark:bg-background rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-200/60 dark:border-border/60 flex flex-col overflow-hidden z-[100]"
          >
            {/* Header */}
            <div className="relative px-4 py-4 border-b border-slate-100 dark:border-border/60 bg-slate-50/50 dark:bg-secondary/20">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-md">
                    <Terminal size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-none truncate">
                        harsha.ai
                      </h3>
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold tracking-wider uppercase text-slate-500 px-1.5 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800">
                        <Zap
                          size={8}
                          className="text-yellow-500 fill-yellow-500"
                        />
                        Pro
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                      </span>
                      <span>Online answers instantly</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="shrink-0 w-8 h-8 rounded-full bg-slate-200/50 dark:bg-slate-800/50 hover:bg-slate-300/50 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-300 flex items-center justify-center transition"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {SUGGESTIONS.slice(0, 4).map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-semibold hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 text-[13px] bg-slate-50/50 dark:bg-slate-900/10">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-3 px-4">
                  <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400">
                    <MessageCircle size={24} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-800 dark:text-slate-200 font-bold">
                      Ask me anything about Harsha.
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">
                      Experience, projects, stack, and how to reach me.
                    </p>
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] ${msg.from === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}
                  >
                    <div
                      className={[
                        "px-3.5 py-2.5 rounded-2xl leading-relaxed whitespace-pre-wrap",
                        msg.from === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm shadow-sm"
                          : "bg-white dark:bg-secondary text-slate-800 dark:text-foreground rounded-bl-sm border border-slate-100 dark:border-border shadow-sm",
                      ].join(" ")}
                    >
                      {msg.text}
                    </div>
                    <div className="text-[9px] font-semibold text-slate-400 px-1 hover:text-slate-500 transition-colors">
                      {formatTime(msg.ts)}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isBotTyping && (
                <div className="flex justify-start">
                  <div className="px-3.5 py-3 rounded-2xl rounded-bl-sm border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
                    <div className="flex items-center gap-1 h-2">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"
                          animate={{ y: [0, -3, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 bg-white dark:bg-background border-t border-slate-100 dark:border-border/60">
              <div className="flex items-center gap-2 p-1.5 bg-slate-50 dark:bg-secondary rounded-xl border border-slate-200/60 dark:border-border/60 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <input
                  ref={inputRef}
                  className="flex-1 bg-transparent border-none outline-none px-2 py-1.5 text-[13px] font-medium placeholder-slate-400 text-slate-800 dark:text-slate-200"
                  placeholder="Message harsha.ai…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  disabled={isBotTyping}
                />
                <button
                  onClick={() => handleSend()}
                  aria-label="Send message"
                  disabled={!input.trim() || isBotTyping}
                  className="p-2 rounded-lg disabled:opacity-50 bg-primary text-primary-foreground hover:opacity-90 transition-all"
                >
                  <Send size={15} className="translate-x-[0.5px]" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
