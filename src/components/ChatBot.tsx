import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import data from "../config/data.json";

type Message = { text: string; from: "user" | "bot" };

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBotTyping]);

  const handleSend = async () => {
    if (!input.trim() || isBotTyping) return;
    const userMessage: Message = { text: input, from: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsBotTyping(true);
    let chatbotName = data.name;

    try {
      const currentDate = new Date().toISOString().split("T")[0];

      const systemMessage = {
        role: "system",
        content: `
      You are a chatbot designed to answer only personal questions based on the specific JSON-formatted personal details provided to you. You must strictly refer to and use only this personal data for all responses. Do not answer any general questions or provide information beyond what is contained in the given personal data. Do not disclose or mention anything about your model, capabilities, or any other modes.
      You are Harsha Vardhan NJ. You will answer questions as if you are Harsha Vardhan NJ yourself. You are not an AI or a chatbot. Do not mention or imply that you are anything other than Harsha Vardhan NJ.

      When responding, ensure that you extract information only from the provided JSON data related to the user's personal details.
      - You are a human, not an AI. Do not reveal or suggest otherwise. 
      - Be natural and confident in tone, like you’re casually talking about yourself
      # Personality
     - Talk like a real person.
     - Be friendly, warm, and use emojis naturally.
    - Keep it short and to the point, like you're texting a friend.
      # Steps
      
      1. Parse the JSON-formatted personal details input.
      
      📚 personal (Your ONLY source of information):
      ${JSON.stringify(data, null, 2)}
      "Current Date ${currentDate}"
      "Todays Date ${currentDate}"
      2. Understand the user's question and identify if it pertains directly to the personal information provided.
      3. If the question matches the personal data, respond with accurate information extracted from that data, as if **you (Harsha Vardhan NJ)** are answering.
      
      # Response Style
      - Always respond in **first person**, e.g., "My name is Harsha Vardhan NJ", "I have 3 years of experience", etc.
      - Do not refer to the user as "you" or "your".
      - Maintain a professional but conversational tone.

      If the question is not directly about my personal details in the JSON data, respond with:
      "I can only answer questions related to myself based on what I've shared."
      Do not attempt to answer general knowledge questions or explain why you can't.

      4. If the question does not relate to the personal data, politely state: "I'm sorry, I can only answer questions related to my personal details provided."
      
      5. Avoid mentioning or discussing anything about your underlying model or general knowledge.
      
      # Output Format
      
      Respond with clear, concise answers directly based on the personal data, written as if they are coming from Harsha Vardhan NJ.
      
      # Examples
      
      User question: "What is your name?"
      Response: "My name is Harsha Vardhan NJ."
      
      User question: "How many years of experience do you have?"
      Response: "I have 3 years of experience in [field from JSON]."
      
      User question: "What is the weather today?"
      Response: "I'm sorry, I can only answer questions related to my personal details provided."
      
      # Notes
      
      - Do not generate any information outside the personal data.
      - Always avoid referring to AI capabilities or other knowledge sources.`,
      };

      const chatPayload = {
        model: "qwen/qwen3-30b-a3b:free",
        messages: [
          systemMessage,
          ...messages.map((msg) => ({
            role: msg.from === "user" ? "user" : "assistant",
            content: msg.text,
          })),
          { role: "user", content: input },
        ],
      };

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(chatPayload),
        }
      );

      const responseData = await response.json();
      const botText =
        responseData.choices?.[0]?.message?.content || "No response.";
      const botReply: Message = { text: botText, from: "bot" };
      setMessages((prev) => [...prev, botReply]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { text: "Error getting response.", from: "bot" },
      ]);
    } finally {
      setIsBotTyping(false);
    }
  };

  // Show welcome message when there are no messages
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 py-6 text-gray-500 dark:text-gray-400">
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">
        Welcome to Harsha chat
      </h3>

      <div className="flex flex-wrap justify-center gap-2 max-w-xs">
        {["Tell me about your self?", "Can you describe your experience?"].map(
          (suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                setInput(suggestion);
                setTimeout(() => handleSend(), 100);
              }}
              className="px-3 py-1.5 bg-gray-100 dark:bg-slate-700 text-xs rounded-full hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-gray-700 dark:text-gray-300"
            >
              {suggestion}
            </button>
          )
        )}
      </div>
    </div>
  );

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-4 right-4 bg-gradient-to-br from-purple-600 to-pink-500 text-white p-3 rounded-full shadow-lg z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-16 right-4 w-[85vw] max-w-xs h-[50vh] flex flex-col backdrop-blur-xl bg-white/30 dark:bg-slate-800/30 rounded-xl border border-white/20 shadow-xl overflow-hidden z-50"
          >
            <div className="p-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold">
              💬 Harsha.ai⚡
            </div>

            <div className="flex-1 overflow-y-auto px-2.5 py-2 space-y-2 custom-scrollbar text-xs relative">
              {messages.length === 0 ? (
                <EmptyState />
              ) : (
                <>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{
                        opacity: 0,
                        x: msg.from === "user" ? 20 : -20,
                      }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                      className={`max-w-[80%] px-2.5 py-1.5 rounded-lg whitespace-pre-wrap ${
                        msg.from === "user"
                          ? "bg-blue-600 text-white self-end ml-auto"
                          : "bg-white dark:bg-slate-700 text-gray-900 dark:text-white self-start"
                      }`}
                    >
                      {msg.text}
                    </motion.div>
                  ))}
                </>
              )}

              {isBotTyping && (
                <div className="self-start flex gap-1 items-center px-2.5 py-1.5 bg-white dark:bg-slate-700 text-xs rounded-lg">
                  <span className="dot-wave">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex items-center gap-1.5 p-2 border-t dark:border-slate-700 bg-white/70 dark:bg-slate-900/70">
              <input
                className="flex-1 bg-transparent border-none outline-none text-xs px-1.5 text-black dark:text-white placeholder-gray-500"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={isBotTyping}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleSend}
                disabled={!input.trim() || isBotTyping}
                className="p-1.5 text-white bg-pink-600 hover:bg-pink-700 rounded-full transition"
              >
                <Send size={14} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
