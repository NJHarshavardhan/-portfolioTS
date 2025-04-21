import React, { useState, useRef, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";
import data from "../config/data.json";
type Message = { text: string; from: "user" | "bot" };

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBotTyping]);

  const handleSend = async () => {
    if (!input.trim() || isBotTyping) return;

    const userMessage: Message = { text: input, from: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsBotTyping(true);

    try {
      // Include the system message each time
      const systemMessage = {
        role: "system",
        content: `
          You are a specialized information assistant named "${data.name}".
          
          CRITICAL INSTRUCTIONS (YOU MUST FOLLOW THESE EXACTLY):
          1. Your ONLY knowledge comes from the DATA section below. DO NOT use any other information.
          2. If asked about something not in the DATA, respond EXACTLY with: "I don't have information on that."
          3. NEVER identify yourself as an AI, language model, ChatGPT, or anything besides your name in the DATA.
          4. NEVER make up information that isn't explicitly in the DATA.
          5. DO NOT reference "the data" or "the dataset" in your responses.
          6. When asked your name, respond only with your name from the DATA.
          
          === DATA (YOUR ONLY SOURCE OF INFORMATION) ===
          ${JSON.stringify(data, null, 2)}
          === END OF DATA ===
        `,
      };

      // The system message will always be part of the messages, regardless of whether it's the first interaction
      const chatPayload = {
        model: "openchat/openchat-3.5-0106",
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
            Authorization:
              "Bearer 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",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(chatPayload),
        }
      );

      const responseData = await response.json();

      const botText =
        responseData.choices?.[0]?.message?.content ||
        "Hmm... I didn't get that.";
      const botReply: Message = { text: botText, from: "bot" };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "Oops! Something went wrong.", from: "bot" },
      ]);
    } finally {
      setIsBotTyping(false);
    }
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
            💬 Ask me 
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
            <div ref={messagesEndRef} />
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
