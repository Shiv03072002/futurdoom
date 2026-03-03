import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Send,
  CheckCheck,
  ArrowLeft,
  Brain,
  MessageSquare,
  Sparkles,
  Copy,
  Heart,
  Trash2,
  Share2,
  MoreHorizontal,
  Terminal,

} from "lucide-react";

// Function to format message with code blocks and markdown (DeepSeek style)
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
          {/* Code header */}
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

          {/* Code content - FIXED for mobile */}
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
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </div>
  );
};

const SimpleChat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [threadContext, setThreadContext] = useState(null);

  useEffect(() => {
    if (location.state?.thread) {
      setThreadContext(location.state.thread);
      setMessages([
        {
          id: 1,
          from: "user",
          text: location.state.thread.userMessage,
          time: location.state.thread.time,
          read: true
        },
        {
          id: 2,
          from: "ai",
          text: location.state.thread.aiResponse,
          time: location.state.thread.responseTime,
          read: true,
          isDeepAsk: true
        }
      ]);
    } else {
      setMessages([{
        id: 1,
        from: "ai",
        text: "Hello! I'm fD, your AI assistant. How can I help?",
        time: "10:30 AM",
        read: true
      }]);
    }
  }, [location.state]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      from: "user",
      text: input,
      time: "Just now",
      read: false,
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);

      const isCodeRequest = input.toLowerCase().includes("reverse a number") &&
        input.toLowerCase().includes("cpp");

      const response = isCodeRequest
        ? `Here's a C++ program to reverse a number:\n\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\n\nint reverseNumber(int num) {\n    int reversed = 0;\n    while (num > 0) {\n        int lastDigit = num % 10;\n        reversed = reversed * 10 + lastDigit;\n        num = num / 10;\n    }\n    return reversed;\n}\n\nint main() {\n    int n;\n    cout << "Enter number: ";\n    cin >> n;\n    cout << "Reversed: " << reverseNumber(n);\n    return 0;\n}\n\`\`\`\n\n**How it works:**\n• Extract last digit using % 10\n• Build reversed number\n• Remove last digit using / 10\n• Repeat until number becomes 0`
        : "I understand your question. Let me help you with that.";

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        from: "ai",
        text: response,
        time: "Just now",
        read: false,
        isDeepAsk: !!threadContext
      }]);
    }, 1500);
  };

  const removeMsg = (id) => setMessages((prev) => prev.filter((m) => m.id !== id));
  const handleGoBack = () => navigate(-1);

  return (
    <div className="flex items-center justify-center">
      <div className="w-full flex flex-col overflow-hidden bg-white rounded-xl border border-blue-50 h-[650px]">

        {/* Header - Mobile optimized with context */}
        <div className="flex flex-col flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">

          {/* Single row with everything */}
          <div className="flex items-center gap-2 px-3 py-2">
            <button
              onClick={handleGoBack}
              className="min-w-[36px] h-9 flex items-center justify-center rounded-xl hover:bg-white/80 text-blue-600 transition-all active:scale-95"
            >
              <ArrowLeft size={18} />
            </button>

            <Avatar size={40} status={true} type="ai" />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-800 truncate">
                {threadContext ? "DeepAsk" : "fD Assistant"}
              </p>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <p className="text-[10px] font-semibold text-green-500">Online</p>
              </div>
            </div>

            {/* Context pill - in same row */}
            <div className="flex items-center gap-1.5 max-w-[40%] bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-blue-200 shadow-sm">
              <MessageSquare size={12} className="text-blue-500 flex-shrink-0" />
              <span className="text-[11px] font-medium text-blue-700 truncate">
                {threadContext ? threadContext.userMessage : "how to do frontend in html..."}
              </span>
              {threadContext && (
                <span className="w-1 h-1 bg-blue-400 rounded-full" />
              )}
            </div>

            {/* More button - at the end */}
            <button className="min-w-[36px] h-9 flex items-center justify-center rounded-xl hover:bg-white/80 text-blue-600 transition-all active:scale-95">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>
        {/* Messages - Scrollable */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#fafcff]">

          {/* Date pill in middle of chat - exactly like your example */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </motion.div>

          {messages.map((msg, i) => {
            const isAI = msg.from === "ai";
            const prevSame = i > 0 && messages[i - 1].from === msg.from;

            return (
              <div key={msg.id}>
                {!isAI && (
                  <div className="flex items-center mb-1">
                    <button onClick={() => removeMsg(msg.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400">
                      <Trash2 size={14} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-blue-50 text-slate-400">
                      <Heart size={14} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-blue-50 text-slate-400">
                      <Copy size={14} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-blue-50 text-slate-400">
                      <Share2 size={14} />
                    </button>
                  </div>
                )}
                <div className={`flex items-end gap-2 ${isAI ? 'justify-end' : 'justify-start'}`}>
                  {!isAI && !prevSame && <Avatar size={32} status={true} type="user" />}
                  {!isAI && prevSame && <div className="w-8" />}

                  {/* Message bubble - FIXED width for mobile */}
                  <div className={`flex flex-col max-w-[85%] sm:max-w-[70%] ${isAI ? 'items-end' : 'items-start'}`}>
                    <div className={`px-3 py-2 text-xs sm:text-sm whitespace-pre-wrap break-words w-full ${isAI
                      ? 'bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white rounded-2xl rounded-br-sm'
                      : 'bg-white text-slate-700 rounded-2xl rounded-bl-sm border border-blue-100'
                      }`}>
                      {isAI && msg.isDeepAsk && (
                        <div className="flex items-center gap-1 mb-1 text-[10px] text-blue-200">
                          <Brain size={10} />
                          <span>Deep analysis</span>
                        </div>
                      )}
                      {isAI ? formatMessage(msg.text) : msg.text}
                    </div>

                    <div className="flex items-center gap-1 mt-1 text-[10px]">
                      <span className="text-slate-400">{msg.time}</span>
                      {isAI && <CheckCheck size={12} className={msg.read ? "text-blue-600" : "text-slate-300"} />}
                    </div>
                  </div>

                  {isAI && !prevSame && <Avatar size={32} status={true} type="ai" />}
                  {isAI && prevSame && <div className="w-8" />}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 justify-end">
              <div className="bg-gradient-to-r from-[#1a3aad] to-[#2563eb] px-4 py-3 rounded-2xl rounded-br-sm flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
              <Avatar size={26} status={true} type="ai" />
            </div>
          )}
        </div>

        {/* Input - Mobile optimized */}
        <div className="flex items-center gap-1 flex-shrink-0 px-2 py-2 border-t border-slate-200 bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask something... (try 'reverse a number in cpp')"
            className="flex-1 px-3 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`min-w-[44px] h-11 flex items-center justify-center rounded-xl ${input.trim() ? 'bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white' : 'bg-slate-200 text-slate-400'
              }`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleChat;