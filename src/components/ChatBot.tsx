import React, { useState, useRef, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";
import data from "../config/data.json";
type Message = { text: string; from: "user" | "bot" };

// Define the type for each experience entry
type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  location: string;
  achievements: string[];
};

// Update the type for skillExperience to be an array of ExperienceEntry
const skillExperience: ExperienceEntry[] = data.experience; // Ensure this matches your data structure

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

  const handleSend = () => {
    if (!input.trim() || isBotTyping) return;

    const userMessage: Message = { text: input, from: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsBotTyping(true);

    // Simulate bot typing
    setTimeout(() => {
      let botReply: Message = {
        text: "I didn't quite catch that. Could you rephrase?",
        from: "bot",
      };

      const lowerInput = input.toLowerCase();

      // Greeting
      if (
        ["hi", "hello", "hey", "greetings"].some((greet) =>
          lowerInput.includes(greet)
        )
      ) {
        botReply = {
          text: "Hey there! 👋 How can I assist you today?",
          from: "bot",
        };
      }
      // Who is Harsha
      else if (
        lowerInput.includes("who is harsha") ||
        lowerInput.includes("about you") ||
        lowerInput.includes("yourself") ||
        lowerInput.includes("who are you")
      ) {
        botReply = {
          text: `I'm Harsha Vardhan — ${data.about}`,
          from: "bot",
        };
      }
      // Name
      else if (lowerInput.includes("name")) {
        botReply = { text: `My name is ${data.name}.`, from: "bot" };
      }
      // Location
      else if (lowerInput.includes("location")) {
        botReply = { text: `I'm based in ${data.location}.`, from: "bot" };
      }
      // Email
      else if (lowerInput.includes("email") || lowerInput.includes("mail")) {
        botReply = {
          text: `You can reach me at ${data.contact.email}.`,
          from: "bot",
        };
      }
      // Phone
      else if (
        lowerInput.includes("phone") ||
        lowerInput.includes("number") ||
        lowerInput.includes("contact")
      ) {
        botReply = {
          text: `My phone number is ${data.contact.phone}.`,
          from: "bot",
        };
      }
      // GitHub
      else if (lowerInput.includes("github")) {
        botReply = {
          text: `You can check out my GitHub profile here: ${data.contact.github}`,
          from: "bot",
        };
      }
      // LinkedIn
      else if (lowerInput.includes("linkedin")) {
        botReply = {
          text: `Here's my LinkedIn: ${data.contact.linkedin}`,
          from: "bot",
        };
      }
      // Role or Title
      else if (lowerInput.includes("role") || lowerInput.includes("job")) {
        botReply = {
          text: `I work as a ${data.titles.join(", ")}.`,
          from: "bot",
        };
      }
      // Education
      else if (lowerInput.includes("education")) {
        const educationDetails = data.education
          .map(
            (edu) =>
              `${edu.degree} from ${edu.school} (${edu.period}) - Grade: ${edu.grade}`
          )
          .join("\n");
        botReply = {
          text: `Here's my education background:\n${educationDetails}`,
          from: "bot",
        };
      }
      // Experience
      else if (lowerInput.includes("experience")) {
        const current = data.experience[0];
        const previous = data.experience[1];
        botReply = {
          text: `Currently at ${current.company} as ${current.role} (${current.period}). Previously worked at ${previous.company} as ${previous.role} (${previous.period}).`,
          from: "bot",
        };
      } else if (
        lowerInput.includes("how much experience") ||
        lowerInput.includes("since when")
      ) {
        const mentionedSkill = skillExperience.find(
          (entry) => lowerInput.includes(entry.role.toLowerCase()) // Assuming role is the skill you're checking
        );

        if (mentionedSkill) {
          botReply = {
            text: `I've been working with ${mentionedSkill.role} for ${mentionedSkill.period}.`,
            from: "bot",
          };
        } else {
          botReply = {
            text: `Could you mention the specific technology or skill you'd like to know my experience in?`,
            from: "bot",
          };
        }
      }

      // Skills
      else if (
        lowerInput.includes("skills") ||
        lowerInput.includes("technical skills") ||
        lowerInput.includes("technologies")
      ) {
        const skills = Object.entries(data.technical_skills)
          .map(([key, val]) => `${key}: ${(val as string[]).join(", ")}`)
          .join("\n");
        botReply = {
          text: `Here are my technical skills:\n${skills}`,
          from: "bot",
        };
      }

      // Projects
      else if (lowerInput.includes("project")) {
        const projectMatch = data.projects.find((p) =>
          lowerInput.includes(p.title.toLowerCase())
        );

        if (projectMatch) {
          const desc = projectMatch.description.join(", ");
          const tech = projectMatch.technologies
            ? `\nTech Stack: ${projectMatch.technologies}`
            : "";
          botReply = {
            text: `${projectMatch.title} (${projectMatch.type} project):\n${desc}${tech}`,
            from: "bot",
          };
        } else {
          const projList = data.projects.map((p) => `• ${p.title}`).join("\n");
          botReply = {
            text: `Here are some of my projects:\n${projList}\n\nAsk about any specific one for more details.`,
            from: "bot",
          };
        }
      }

      // Roles Description
      else if (lowerInput.includes("roles")) {
        const rolesDesc = data.roles
          .map((role) => `${role.title}: ${role.description}`)
          .join("\n");
        botReply = {
          text: `Here are the roles I specialize in:\n${rolesDesc}`,
          from: "bot",
        };
      }
      // Default response
      else {
        botReply = {
          text: "Sorry, I didn't quite understand that. Could you rephrase?",
          from: "bot",
        };
      }

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
