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
  MoreHorizontal
} from "lucide-react";

const BLUE = "#2563eb";
const DARK_BLUE = "#1a3aad";

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

const SimpleChat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [threadContext, setThreadContext] = useState(null);
  const [deepAskMode, setDeepAskMode] = useState(false);

  useEffect(() => {
    if (location.state?.thread) {
      setThreadContext(location.state.thread);
      setDeepAskMode(true);
      
      const threadMessages = [
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
        },
        {
          id: 3,
          from: "ai",
          text: `I see you're asking about "${location.state.thread.userMessage}". Let me provide a more detailed explanation with examples. What specific aspect would you like to dive deeper into?`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false,
          isDeepAsk: true
        }
      ];
      setMessages(threadMessages);
    } else {
      setMessages([
        {
          id: 1,
          from: "ai",
          text: "Hello! I'm fD, your AI assistant. Select a message with the brain icon to deep dive into a specific topic, or ask me anything!",
          time: "10:30 AM",
          read: true
        }
      ]);
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
      
      let response = "";
      if (threadContext) {
        response = `**Deep Analysis:**\n\nBased on your question about "${threadContext.userMessage}", here's a comprehensive breakdown:\n\n${input.toLowerCase().includes("example") 
          ? "**Practical Example:**\n\n<!DOCTYPE html>\n<html>\n<head>\n  <title>DeepAsk Example</title>\n  <style>\n    .container { max-width: 800px; margin: 0 auto; }\n    .highlight { background: #f0f4ff; padding: 20px; }\n  </style>\n</head>\n<body>\n  <div class='container'>\n    <h1>Deep Learning Example</h1>\n    <div class='highlight'>\n      <p>This is a detailed explanation with code.</p>\n    </div>\n  </div>\n</body>\n</html>" 
          : "**Key Insights:**\n\n• Advanced concepts explained\n• Best practices and patterns\n• Performance considerations\n• Common pitfalls to avoid"}`
      } else {
        response = "I understand your question. Let me help you with that.";
      }
      
      const aiMessage = {
        id: Date.now() + 1,
        from: "ai",
        text: response,
        time: "Just now",
        read: false,
        isDeepAsk: deepAskMode
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 2000);
  };

  const removeMsg = (id) => setMessages((prev) => prev.filter((m) => m.id !== id));

  const handleGoBack = () => {
    navigate(-1);
  };

  // Animation variants
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
  };

  const typingAnimation = {
    animate: {
      y: [0, -5, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="flex items-center justify-center "
    >
      <div
        className="w-full flex flex-col overflow-hidden bg-white rounded-xl border border-blue-50"
        style={{
          height: 700,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex items-center gap-3 flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 px-5 py-3"
        >
          {/* Back button */}
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoBack}
            className="flex items-center justify-center rounded-xl hover:bg-white w-9 h-9 text-blue-600 transition-all"
          >
            <ArrowLeft size={18} strokeWidth={1.8} />
          </motion.button>

          {/* AI Avatar */}
          <Avatar size={48} status={true} type="ai" />

          {/* AI Name + status */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-base font-bold text-slate-800">
                {deepAskMode ? "DeepAsk" : "fD Assistant"}
                {deepAskMode && <span className="ml-2 text-xs font-normal text-blue-600">(Deep Mode)</span>}
              </p>
              <Sparkles size={14} className="text-blue-500" />
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <motion.span
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <p className="text-xs font-semibold text-green-500">
                {deepAskMode ? "Deep learning mode" : "Online"}
              </p>
            </div>
          </div>

          {/* Thread context badge */}
          {threadContext && (
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/80 rounded-xl border border-blue-200 shadow-sm">
              <MessageSquare size={14} className="text-blue-500" />
              <span className="text-xs text-blue-700 font-medium max-w-[200px] truncate">
                "{threadContext.userMessage.substring(0, 30)}..."
              </span>
            </div>
          )}

          {/* More button */}
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center rounded-xl hover:bg-white w-9 h-9 text-blue-600 transition-all"
          >
            <MoreHorizontal size={18} strokeWidth={1.8} />
          </motion.button>
        </motion.div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-5 space-y-4"
          style={{ background: "#fafcff" }}
        >
          {/* Date pill */}
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

          {/* Messages */}
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
                  exit={{ opacity: 0, scale: 0.8 }}
                  layout
                  className="flex flex-col"
                >
                  {/* Action Icons - for user messages only */}
                  {isUser && (
                    <div className="flex items-center gap-1 mb-1 justify-start">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeMsg(msg.id)}
                        className="p-1 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                        title="Like"
                      >
                        <Heart size={14} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                        title="Copy"
                      >
                        <Copy size={14} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                        title="Share"
                      >
                        <Share2 size={14} />
                      </motion.button>
                    </div>
                  )}

                  {/* Message bubble with avatar */}
                  <div className={`flex items-end gap-2 ${isAI ? 'justify-end' : 'justify-start'}`}>
                    {/* Avatar for user messages */}
                    {isUser && !prevSame && (
                      <Avatar size={36} status={true} type="user" />
                    )}
                    {isUser && prevSame && <div className="w-9" />}

                    {/* Message bubble */}
                    <div className={`flex flex-col max-w-[70%] ${isAI ? 'items-end' : 'items-start'}`}>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className={`px-4 py-2.5 text-sm whitespace-pre-wrap ${
                          isAI
                            ? msg.isDeepAsk
                              ? 'bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white rounded-2xl rounded-br-sm'
                              : 'bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white rounded-2xl rounded-br-sm'
                            : 'bg-white text-slate-700 rounded-2xl rounded-bl-sm border border-blue-100'
                        }`}
                        style={{
                          boxShadow: isAI
                            ? '0 4px 15px rgba(37,99,235,0.3)'
                            : '0 2px 8px rgba(0,0,0,0.03)',
                        }}
                      >
                        {isAI && msg.isDeepAsk && (
                          <div className="flex items-center gap-1 mb-1 text-xs text-blue-200">
                            <Brain size={12} />
                            <span>Deep analysis</span>
                          </div>
                        )}
                        {msg.text}
                      </motion.div>

                      {/* Time + read receipt */}
                      <div className={`flex items-center gap-1.5 mt-1 text-xs ${isAI ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-slate-400">{msg.time}</span>
                        {isAI && (
                          <CheckCheck
                            size={14}
                            className={msg.read ? "text-blue-600" : "text-slate-300"}
                          />
                        )}
                      </div>
                    </div>

                    {/* Avatar for AI messages */}
                    {isAI && !prevSame && (
                      <Avatar size={36} status={true} type="ai" />
                    )}
                    {isAI && prevSame && <div className="w-9" />}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center gap-2 justify-end"
              >
                <div className="bg-gradient-to-r from-[#1a3aad] to-[#2563eb] px-4 py-3 rounded-2xl rounded-br-sm flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      variants={typingAnimation}
                      animate="animate"
                      className="w-1.5 h-1.5 bg-white rounded-full"
                    />
                  ))}
                </div>
                <Avatar size={30} status={true} type="ai" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input bar */}
        <motion.div
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          className="flex items-center gap-2 flex-shrink-0 px-4 py-3 border-t border-slate-200 bg-white"
        >
          {/* Input */}
          <div className="flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={deepAskMode ? "Ask a deeper question..." : "Ask fD something..."}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>

          {/* Send */}
          <motion.button
            onClick={handleSend}
            whileHover={{ scale: input.trim() ? 1.1 : 1 }}
            whileTap={{ scale: input.trim() ? 0.95 : 1 }}
            className={`flex items-center justify-center rounded-xl w-10 h-10 transition-all ${
              input.trim()
                ? 'bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-md shadow-blue-500/30'
                : 'bg-slate-200 text-slate-400'
            }`}
            disabled={!input.trim()}
          >
            <Send size={16} strokeWidth={2} />
          </motion.button>
        </motion.div>

        {/* Mobile thread context */}
        {threadContext && (
          <div className="sm:hidden px-4 py-2 bg-blue-50 border-t border-blue-100">
            <p className="text-xs text-blue-700 flex items-center gap-1">
              <MessageSquare size={10} className="text-blue-500" />
              <span className="truncate">Context: "{threadContext.userMessage.substring(0, 25)}..."</span>
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SimpleChat;