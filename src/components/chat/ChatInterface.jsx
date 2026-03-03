import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Share2,
  Settings,
  Phone,
  Video,
  Info,
  Smile,
  Paperclip,
  MoreHorizontal,
  CheckCheck,
  Sparkles,
  Copy,
  Trash2,
  Heart,
  Brain,
  User,
  Code,
  Terminal,
  Check,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const BLUE = "#2563eb";
const DARK_BLUE = "#1a3aad";

const initialMessages = [
  {
    id: 1,
    from: "user",
    text: "how to do frontend in html",
    time: "2:10 PM",
    read: true
  },
  {
    id: 2,
    from: "ai",
    text: "To create a frontend in HTML, follow these steps: start with a basic HTML structure, add CSS for styling, and use JavaScript for interactivity.",
    time: "2:11 PM",
    read: true,
  },
  {
    id: 3,
    from: "user",
    text: "Can you give me a simple example?",
    time: "2:13 PM",
    read: false,
  },
];

// Function to format message with code blocks and markdown
const formatMessage = (text) => {
  if (!text) return text;

  const parts = text.split(/(```[\s\S]*?```)/g);

  return parts.map((part, index) => {
    if (part.startsWith('```') && part.endsWith('```')) {
      const firstLineEnd = part.indexOf('\n');
      const language = part.substring(3, firstLineEnd).trim() || 'text';
      const code = part.substring(firstLineEnd + 1, part.length - 3).trim();

      return (
        <div key={index} className="my-2 rounded-lg overflow-hidden border border-slate-700/50 w-full max-w-full">
          <div className="flex items-center justify-between bg-slate-800 px-3 py-1.5 sm:px-4 sm:py-2">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <Terminal size={12} className="text-slate-400 flex-shrink-0" />
              <span className="text-[10px] sm:text-xs font-mono text-slate-300 truncate">{language}</span>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(code)}
              className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors flex-shrink-0"
            >
              <Copy size={12} className="sm:w-[14px] sm:h-[14px]" />
            </button>
          </div>
          <pre className="bg-slate-900 p-2 sm:p-4 overflow-x-auto max-w-full" style={{ WebkitOverflowScrolling: 'touch' }}>
            <code className="text-[10px] sm:text-sm font-mono text-slate-300 whitespace-pre-wrap break-words">
              {code}
            </code>
          </pre>
        </div>
      );
    }

    if (part) {
      const inlineParts = part.split(/(`[^`]+`)/g);
      return (
        <div key={index} className="space-y-1 sm:space-y-2">
          {inlineParts.map((inlinePart, inlineIndex) => {
            if (inlinePart.startsWith('`') && inlinePart.endsWith('`')) {
              return (
                <code key={inlineIndex} className="px-1 py-0.5 bg-slate-100 rounded text-[10px] sm:text-sm font-mono text-blue-600 break-all">
                  {inlinePart.slice(1, -1)}
                </code>
              );
            }

            const boldParts = inlinePart.split(/(\*\*[^*]+\*\*)/g);
            return boldParts.map((boldPart, boldIndex) => {
              if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
                return <strong key={boldIndex} className="font-bold text-xs sm:text-sm break-words">{boldPart.slice(2, -2)}</strong>;
              }

              const italicParts = boldPart.split(/(\*[^*]+\*)/g);
              return italicParts.map((italicPart, italicIndex) => {
                if (italicPart.startsWith('*') && italicPart.endsWith('*')) {
                  return <em key={italicIndex} className="italic text-xs sm:text-sm break-words">{italicPart.slice(1, -1)}</em>;
                }

                const lines = italicPart.split('\n');
                return lines.map((line, lineIndex) => {
                  if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
                    return (
                      <div key={lineIndex} className="flex items-start gap-1 sm:gap-2 ml-2 sm:ml-4">
                        <span className="text-blue-500 text-xs sm:text-sm">•</span>
                        <span className="text-xs sm:text-sm break-words">{line.trim().substring(2)}</span>
                      </div>
                    );
                  }

                  if (/^\d+\.\s/.test(line.trim())) {
                    const match = line.trim().match(/^(\d+)\.\s(.*)/);
                    if (match) {
                      return (
                        <div key={lineIndex} className="flex items-start gap-1 sm:gap-2 ml-2 sm:ml-4">
                          <span className="text-blue-500 font-mono text-[10px] sm:text-xs mt-0.5">{match[1]}.</span>
                          <span className="text-xs sm:text-sm break-words">{match[2]}</span>
                        </div>
                      );
                    }
                  }

                  return line ? (
                    <span key={lineIndex} className="text-xs sm:text-sm break-words">
                      {line}{lineIndex < lines.length - 1 ? <br /> : ''}
                    </span>
                  ) : <br key={lineIndex} />;
                });
              });
            });
          })}
        </div>
      );
    }
    return null;
  });
};

const Avatar = ({ size = 36, status = true, type = "user" }) => {
  let initials = "DP";
  let gradient = "from-purple-500 to-pink-500";

  if (type === "ai") {
    initials = "fD";
    gradient = "from-[#1a3aad] to-[#2563eb]";
  }

  return (
    <div className="relative flex-shrink-0">
      <div
        className={`flex items-center justify-center rounded-xl text-white font-bold bg-gradient-to-r ${gradient}`}
        style={{
          width: size,
          height: size,
          fontSize: size * 0.35,
          boxShadow: "0 4px 10px rgba(37,99,235,0.3)",
        }}
      >
        {initials}
      </div>
      {status && (
        <motion.span
          className="absolute rounded-full ring-2 ring-white"
          style={{
            width: size * 0.25,
            height: size * 0.25,
            background: "#22c55e",
            bottom: 0,
            right: 0
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
};

const ChatInterface = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const send = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        from: "user",
        text: input.trim(),
        time: "Just now",
        read: false,
      },
    ]);
    setInput("");

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);

      const userInput = input.toLowerCase();
      let responseText = "";

      if (userInput.includes("reverse a number") && userInput.includes("cpp")) {
        responseText = `Here's a C++ program to reverse a number:

\`\`\`cpp
#include <iostream>
using namespace std;

int reverseNumber(int num) {
    int reversed = 0;
    while (num > 0) {
        int lastDigit = num % 10;
        reversed = reversed * 10 + lastDigit;
        num = num / 10;
    }
    return reversed;
}

int main() {
    int number;
    cout << "Enter a number: ";
    cin >> number;
    cout << "Reversed: " << reverseNumber(number) << endl;
    return 0;
}
\`\`\`

**How it works:**
1. Extract last digit using % 10
2. Build reversed number
3. Remove last digit using / 10
4. Repeat until number becomes 0

**Example:** 12345 → 54321`;
      } else {
        responseText = "I understand your question. Let me help you with that.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "ai",
          text: responseText,
          time: "Just now",
          read: false
        },
      ]);
    }, 2000);
  };

  const removeMsg = (id) => setMessages((prev) => prev.filter((m) => m.id !== id));

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const typingAnimation = {
    animate: { y: [0, -5, 0] }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 p-2 sm:p-0"
    >
      <div
        className="flex flex-col overflow-hidden bg-white rounded-xl border border-blue-50 h-[650px] sm:h-[700px]"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="flex items-center gap-2 sm:gap-3 flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 px-3 sm:px-5 py-2 sm:py-3"
        >
          <Avatar size={window.innerWidth < 640 ? 40 : 48} status={true} type="ai" />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 sm:gap-2">
              <p className="text-sm sm:text-base font-bold text-slate-800 truncate">
                futurDooM
              </p>
              <Sparkles size={12} className="text-blue-500 flex-shrink-0" />
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              <p className="text-[10px] sm:text-xs font-semibold text-green-500">Online</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {[Phone, Video, Info, MoreHorizontal].map((Icon, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="min-w-[32px] sm:min-w-[36px] h-8 sm:h-9 flex items-center justify-center rounded-xl hover:bg-white text-blue-600"
              >
                <Icon size={16} sm:size={18} strokeWidth={1.8} />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3 sm:space-y-4 bg-[#fafcff]">

          {/* Date pill */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[10px] sm:text-xs font-semibold text-blue-600 bg-blue-50 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-blue-200">
              Feb 20, 2026
            </span>
          </motion.div>

          <AnimatePresence mode="popLayout">
            {messages.map((msg, i) => {
              const isAI = msg.from === "ai";
              const isUser = msg.from === "user";
              const prevSame = i > 0 && messages[i - 1].from === msg.from;

              return (
                <motion.div
                  key={msg.id}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                  layout
                >
                  {/* Action Icons */}
                  {isUser && (
                    <div className="flex items-center gap-1 mb-1">
                      <button onClick={() => removeMsg(msg.id)} className="p-1.5 sm:p-1 rounded-lg hover:bg-red-50 text-slate-400">
                        <Trash2 size={12} sm:size={14} />
                      </button>
                      <button className="p-1.5 sm:p-1 rounded-lg hover:bg-blue-50 text-slate-400">
                        <Heart size={12} sm:size={14} />
                      </button>
                      <button className="p-1.5 sm:p-1 rounded-lg hover:bg-blue-50 text-slate-400">
                        <Copy size={12} sm:size={14} />
                      </button>
                      <button className="p-1.5 sm:p-1 rounded-lg hover:bg-blue-50 text-slate-400">
                        <Share2 size={12} sm:size={14} />
                      </button>
                      <button
                        onClick={() => navigate("/deepaskshare", {
                          state: {
                            thread: {
                              userMessage: messages[i - 1]?.text || msg.text,
                              aiResponse: messages[i + 1]?.text || "",
                              time: msg.time,
                              responseTime: messages[i + 1]?.time,
                              conversationId: msg.id,
                              context: "full-conversation"
                            }
                          }
                        })}
                        className="p-1.5 sm:p-1 rounded-lg hover:bg-indigo-50 text-slate-400 relative"
                      >
                        <Brain size={12} sm:size={14} />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] rounded-full h-3 w-3 flex items-center justify-center">
                          4
                        </span>
                      </button>
                    </div>
                  )}

                  <div className={`flex items-end gap-1.5 sm:gap-2 ${isAI ? 'justify-end' : 'justify-start'}`}>
                    {!isAI && !prevSame && <Avatar size={window.innerWidth < 640 ? 28 : 36} status={true} type="user" />}
                    {!isAI && prevSame && <div className="w-7 sm:w-9" />}

                    <div className={`flex flex-col max-w-[85%] sm:max-w-[70%] ${isAI ? 'items-end' : 'items-start'}`}>
                      <div className={`px-3 py-2 text-xs sm:text-sm whitespace-pre-wrap break-words w-full ${isAI
                          ? 'bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white rounded-2xl rounded-br-sm'
                          : 'bg-white text-slate-800 rounded-2xl rounded-bl-sm border border-blue-100'
                        }`}>
                        {isAI ? formatMessage(msg.text) : msg.text}
                      </div>

                      <div className="flex items-center gap-1 mt-1 text-[8px] sm:text-xs">
                        <span className="text-slate-400">{msg.time}</span>
                        {isAI && <CheckCheck size={10} sm:size={14} className={msg.read ? "text-blue-600" : "text-slate-300"} />}
                      </div>
                    </div>

                    {isAI && !prevSame && <Avatar size={window.innerWidth < 640 ? 28 : 36} status={true} type="ai" />}
                    {isAI && prevSame && <div className="w-7 sm:w-9" />}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 justify-end"
              >
                <div className="bg-gradient-to-r from-[#1a3aad] to-[#2563eb] px-3 py-2 rounded-2xl rounded-br-sm flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
                <Avatar size={24} status={true} type="ai" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input bar */}
        <motion.div
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          className="flex items-center gap-1 sm:gap-2 flex-shrink-0 px-2 sm:px-4 py-2 sm:py-3 border-t border-slate-200 bg-white"
        >
          {[Paperclip, Smile].map((Icon, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="min-w-[36px] h-9 flex items-center justify-center rounded-xl hover:bg-blue-50 text-slate-500"
            >
              <Icon size={16} strokeWidth={1.8} />
            </motion.button>
          ))}

          <div className="flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask fD something..."
              className="w-full px-3 sm:px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <motion.button
            onClick={send}
            whileHover={{ scale: input.trim() ? 1.1 : 1 }}
            whileTap={{ scale: input.trim() ? 0.95 : 1 }}
            className={`min-w-[40px] h-9 flex items-center justify-center rounded-xl ${input.trim() ? 'bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white' : 'bg-slate-200 text-slate-400'
              }`}
            disabled={!input.trim()}
          >
            <Send size={14} strokeWidth={2} />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChatInterface;