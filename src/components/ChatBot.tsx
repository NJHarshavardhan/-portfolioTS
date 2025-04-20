import React, { useState } from "react";
import { X, MessageCircle } from "lucide-react";

type Message = { text: string; from: "user" | "bot" };

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim() || isBotTyping) return;

    const userMessage: Message = { text: input, from: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsBotTyping(true);

    // Simulate bot typing
    setTimeout(() => {
      const botReply: Message = { text: "Thanks for your message!", from: "bot" };
      setMessages((prev) => [...prev, botReply]);
      setIsBotTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-3 rounded-full shadow-xl hover:scale-105 transition-all"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 max-h-[70vh] bg-white dark:bg-slate-900 border dark:border-slate-700 shadow-2xl rounded-xl flex flex-col z-50 overflow-hidden">
          <div className="p-4 border-b dark:border-slate-700 font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            💬 Chat with us
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 custom-scroll">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-2xl text-sm max-w-[75%] whitespace-pre-wrap transition-all duration-300 ${
                  msg.from === "user"
                    ? "bg-blue-600 text-white self-end ml-auto animate-fade-in"
                    : "bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white self-start animate-fade-in"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isBotTyping && (
              <div className="bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 p-3 rounded-2xl max-w-[75%] text-sm animate-pulse self-start">
                Typing<span className="dot-flash">...</span>
              </div>
            )}
          </div>
          <div className="p-3 border-t dark:border-slate-700 flex items-center gap-2 bg-slate-50 dark:bg-slate-800">
            <input
              className="flex-1 px-3 py-2 rounded-full border dark:bg-slate-700 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={isBotTyping}
            />
            {input.trim() && !isBotTyping && (
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-blue-700 transition"
              >
                Send
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
