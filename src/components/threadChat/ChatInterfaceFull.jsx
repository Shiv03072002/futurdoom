import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  Sparkles,
  CheckCheck,
  Copy,
  Trash2,
  Heart,
  Brain,
  Terminal,
  Smile,
  Paperclip,
  ChevronLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const formatMessage = (text) => {
  if (!text) return text;
  const parts = text.split(/(```[\s\S]*?```)/g);
  return parts.map((part, index) => {
    if (!part) return null;
    if (part.startsWith('```') && part.endsWith('```')) return renderCodeBlock(part, index);
    return renderTextContent(part, index);
  });
};

const renderCodeBlock = (part, key) => {
  const firstLineEnd = part.indexOf('\n');
  const language = firstLineEnd > 3 ? part.substring(3, firstLineEnd).trim() : 'text';
  const code = part.substring(firstLineEnd + 1, part.length - 3).trimEnd();
  const handleCopy = () => navigator.clipboard.writeText(code).catch(console.error);
  return (
    <div key={key} className="my-2 rounded-xl overflow-hidden border border-slate-700/50 w-full max-w-full">
      <div className="flex items-center justify-between bg-slate-800 px-3 py-1.5 sm:px-4 sm:py-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
          </div>
          <Terminal size={11} className="text-slate-400 flex-shrink-0 ml-1" />
          <span className="text-[10px] sm:text-xs font-mono text-slate-300 truncate">{language}</span>
        </div>
        <button onClick={handleCopy} className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors flex-shrink-0">
          <Copy size={12} />
        </button>
      </div>
      <pre className="bg-slate-900 p-2 sm:p-4 overflow-x-auto max-w-full" style={{ WebkitOverflowScrolling: 'touch' }}>
        <code className="text-[10px] sm:text-sm font-mono text-slate-300 whitespace-pre-wrap break-words">{code}</code>
      </pre>
    </div>
  );
};

const renderTextContent = (text, key) => {
  const inlineParts = text.split(/(`[^`]+`)/g);
  return (
    <div key={key} className="space-y-1 sm:space-y-2">
      {inlineParts.map((part, index) => {
        if (!part) return null;
        if (part.startsWith('`') && part.endsWith('`'))
          return <code key={index} className="px-1 py-0.5 bg-white/20 rounded text-[10px] sm:text-sm font-mono text-blue-100 break-all">{part.slice(1, -1)}</code>;
        return renderFormattedText(part, index);
      })}
    </div>
  );
};

const renderFormattedText = (text, key) => {
  const boldParts = text.split(/(\*\*[^*]+\*\*)/g);
  return boldParts.map((part, index) => {
    if (!part) return null;
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={index} className="font-bold text-xs sm:text-sm break-words">{part.slice(2, -2)}</strong>;
    const italicParts = part.split(/(\*[^*]+\*)/g);
    return italicParts.map((p, idx) => {
      if (!p) return null;
      if (p.startsWith('*') && p.endsWith('*'))
        return <em key={`${key}-${idx}`} className="italic text-xs sm:text-sm break-words">{p.slice(1, -1)}</em>;
      return renderLines(p, `${key}-${idx}`);
    });
  });
};

const renderLines = (text, key) => {
  const lines = text.split('\n');
  return lines.map((line, index) => {
    const t = line.trim();
    if (t.startsWith('- ') || t.startsWith('• ')) return (
      <div key={`${key}-${index}`} className="flex items-start gap-1 sm:gap-2 ml-2 sm:ml-4">
        <span className="text-blue-200 text-xs sm:text-sm">•</span>
        <span className="text-xs sm:text-sm break-words">{t.substring(2)}</span>
      </div>
    );
    const nm = t.match(/^(\d+)\.\s(.*)/);
    if (nm) return (
      <div key={`${key}-${index}`} className="flex items-start gap-1 sm:gap-2 ml-2 sm:ml-4">
        <span className="text-blue-200 font-mono text-[10px] sm:text-xs mt-0.5">{nm[1]}.</span>
        <span className="text-xs sm:text-sm break-words">{nm[2]}</span>
      </div>
    );
    return line ? (
      <span key={`${key}-${index}`} className="text-xs sm:text-sm break-words">{line}{index < lines.length - 1 ? <br /> : ''}</span>
    ) : <br key={`${key}-${index}`} />;
  });
};

const Avatar = ({ size = 36, status = true, type = "user" }) => {
  const isAI = type === "ai";
  return (
    <div className="relative flex-shrink-0">
      <div
        className="flex items-center justify-center rounded-xl text-white font-bold"
        style={{
          width: size, height: size, fontSize: size * 0.35,
          background: isAI
            ? "linear-gradient(135deg, #1a3aad 0%, #2563eb 100%)"
            : "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)",
          boxShadow: isAI
            ? "0 4px 12px rgba(37,99,235,0.35)"
            : "0 4px 12px rgba(219,39,119,0.3)"
        }}
      >
        {isAI ? "AI" : "ME"}
      </div>
      {status && (
        <motion.span
          className="absolute rounded-full ring-2 ring-white"
          style={{ width: size * 0.25, height: size * 0.25, background: "#22c55e", bottom: 0, right: 0 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
};

const ChatInterfaceFull = ({ thread, onBack }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: thread?.userMessage || "Hey! Can you help me understand how React hooks work under the hood?",
      from: "user",
      time: "2:41 PM",
      read: true,
    },
    {
      id: 2,
      text: thread?.aiResponse || "Of course! React hooks rely on a call-order-dependent linked list React maintains per component fiber. That's why you can't call hooks conditionally — React needs the same hooks in the same order every render.",
      from: "ai",
      time: "2:41 PM",
      read: true,
    },
    {
      id: 3,
      text: "That makes sense. What about useEffect specifically?",
      from: "user",
      time: "2:43 PM",
      read: true,
    },
    {
      id: 4,
      text: "useEffect runs after the browser paints — asynchronous by design. React queues your effect and flushes it post-render. The dependency array controls when it re-runs: empty array = once on mount, no array = every render, populated array = only when those values change.",
      from: "ai",
      time: "2:43 PM",
      read: false,
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      text: message,
      from: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false,
    };
    
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: "Great question! Let me think through that carefully for you…",
          from: "ai",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          read: false,
        },
      ]);
    }, 1800);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e) => {
    setMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
  };

  const removeMsg = (id) => setMessages(prev => prev.filter(m => m.id !== id));

  const msgVariants = {
    hidden: { opacity: 0, y: 14, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 340, damping: 26 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } }
  };

  // Get the first user message for the header
  const firstUserMessage = messages.find(msg => msg.from === "user")?.text || "Conversation";

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="flex flex-col h-full bg-white rounded-xl overflow-hidden"
      style={{
        border: "1px solid #dbeafe",
      }}
    >
     {/* Header with user profile */}
<div className="px-5 py-4 bg-white border-b border-blue-100">
  <div className="flex items-center gap-3">
    {/* Avatar */}
    <img 
      src="https://ui-avatars.com/api/?name=John+Doe&background=2563eb&color=fff&bold=true" 
      alt="User" 
      className="w-10 h-10 rounded-full border-2 border-blue-100"
    />
    
    {/* User details and message */}
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <span className="font-medium text-slate-800">John Doe</span>
       
        <span className="text-xs text-slate-400">· 2h</span>
      </div>
      <p className="text-sm text-slate-600 line-clamp-1">"{firstUserMessage}"</p>
    </div>
  </div>
</div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3 sm:space-y-4"
        style={{ background: "#f8faff" }}
      >
        {/* Date separator */}
        <motion.div 
          className="flex justify-center" 
          initial={{ opacity: 0, y: -8 }} 
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-[10px] sm:text-xs font-semibold text-blue-500 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full"
            style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}>
            Today
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
                variants={msgVariants} 
                initial="hidden" 
                animate="visible" 
                exit="exit" 
                layout
              >
                {/* Action row for user messages */}
                {isUser && (
                  <div className="flex items-center gap-0.5 mb-1.5 ml-1">
                    {[
                      { I: Trash2, h: "hover:bg-red-50 hover:text-red-400", fn: () => removeMsg(msg.id) },
                      { I: Heart, h: "hover:bg-pink-50 hover:text-pink-400", fn: () => {} },
                      { I: Copy, h: "hover:bg-blue-50 hover:text-blue-500", fn: () => {} },
                    ].map(({ I, h, fn }, idx) => (
                      <motion.button 
                        key={idx} 
                        onClick={fn}
                        whileHover={{ scale: 1.15 }} 
                        whileTap={{ scale: 0.88 }}
                        className={`p-1.5 rounded-lg text-slate-400 transition-all duration-150 ${h}`}
                      >
                        <I size={11} />
                      </motion.button>
                    ))}
                    <motion.button
                      whileHover={{ scale: 1.15 }} 
                      whileTap={{ scale: 0.88 }}
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
                      className="p-1.5 rounded-lg text-slate-400 hover:bg-violet-50 hover:text-violet-500 transition-all duration-150 relative"
                    >
                      <Brain size={11} />
                    </motion.button>
                  </div>
                )}

                <div className={`flex items-end gap-1.5 sm:gap-2 ${isAI ? 'justify-end' : 'justify-start'}`}>
                  {!isAI && !prevSame && <Avatar size={window.innerWidth < 640 ? 28 : 36} status={true} type="user" />}
                  {!isAI && prevSame && <div className="w-7 sm:w-9" />}

                  <div className={`flex flex-col max-w-[82%] sm:max-w-[68%] ${isAI ? 'items-end' : 'items-start'}`}>
                    <motion.div
                      whileHover={{ scale: 1.008, transition: { duration: 0.15 } }}
                      className="px-4 py-3 text-xs sm:text-sm whitespace-pre-wrap break-words w-full relative overflow-hidden"
                      style={isAI ? {
                        background: "linear-gradient(135deg, #1a3aad 0%, #2563eb 100%)",
                        borderRadius: "20px 20px 6px 20px",
                        boxShadow: "0 6px 22px rgba(37,99,235,0.32), 0 1px 4px rgba(37,99,235,0.18), inset 0 1px 0 rgba(255,255,255,0.14)",
                        color: "white"
                      } : {
                        background: "white",
                        borderRadius: "20px 20px 20px 6px",
                        border: "1px solid #dbeafe",
                        boxShadow: "0 2px 14px rgba(37,99,235,0.07), 0 1px 3px rgba(0,0,0,0.04)",
                        color: "#1e293b"
                      }}
                    >
                      {/* Inner shine for AI bubble */}
                      {isAI && (
                        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ borderRadius: "20px 20px 6px 20px" }}>
                          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full"
                            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 70%)" }} />
                        </div>
                      )}
                      <div className="relative">
                        {isAI ? formatMessage(msg.text) : msg.text}
                      </div>
                    </motion.div>

                    <div className="flex items-center gap-1 mt-1.5 px-1">
                      <span className="text-[9px] sm:text-[10px] text-slate-400">{msg.time}</span>
                      {isAI && <CheckCheck size={10} className={msg.read ? "text-blue-500" : "text-slate-300"} />}
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
              initial={{ opacity: 0, y: 8 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0 }} 
              className="flex items-center gap-2 justify-end"
            >
              <div className="px-4 py-3"
                style={{
                  background: "linear-gradient(135deg, #1a3aad 0%, #2563eb 100%)",
                  borderRadius: "20px 20px 6px 20px",
                  boxShadow: "0 6px 22px rgba(37,99,235,0.30)"
                }}
              >
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2].map(i => (
                    <motion.span 
                      key={i} 
                      className="w-1.5 h-1.5 bg-white rounded-full"
                      animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.75, repeat: Infinity, delay: i * 0.15 }} 
                    />
                  ))}
                </div>
              </div>
              <Avatar size={window.innerWidth < 640 ? 24 : 28} status={true} type="ai" />
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 px-2 sm:px-4 py-2.5 sm:py-3 bg-white relative"
        style={{ borderTop: "1px solid #dbeafe" }}
      >
        <div className="absolute top-0 inset-x-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.35), transparent)" }} />

        {[Paperclip, Smile].map((Icon, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.1, backgroundColor: "#eff6ff" }}
            whileTap={{ scale: 0.92 }}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-blue-500 transition-all duration-150"
          >
            <Icon size={16} strokeWidth={1.8} />
          </motion.button>
        ))}

        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            rows={1}
            value={message}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Reply in thread…"
            className="w-full px-4 py-2.5 rounded-2xl text-xs sm:text-sm text-slate-700 placeholder-slate-400 focus:outline-none transition-all duration-200 resize-none"
            style={{
              background: "#f8faff",
              border: "1px solid #dbeafe",
              boxShadow: "inset 0 1px 2px rgba(37,99,235,0.04)",
              minHeight: "42px",
              maxHeight: "140px",
            }}
            onFocus={e => {
              e.target.style.border = "1px solid #93c5fd";
              e.target.style.background = "white";
              e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.10), inset 0 1px 2px rgba(37,99,235,0.04)";
            }}
            onBlur={e => {
              e.target.style.border = "1px solid #dbeafe";
              e.target.style.background = "#f8faff";
              e.target.style.boxShadow = "inset 0 1px 2px rgba(37,99,235,0.04)";
            }}
          />
        </div>

        <motion.button
          onClick={handleSend}
          whileHover={message.trim() ? { scale: 1.08 } : {}}
          whileTap={message.trim() ? { scale: 0.92 } : {}}
          className="w-10 h-10 flex items-center justify-center rounded-2xl flex-shrink-0 transition-all duration-200"
          style={message.trim() ? {
            background: "linear-gradient(135deg, #1a3aad 0%, #2563eb 100%)",
            boxShadow: "0 4px 16px rgba(37,99,235,0.38)"
          } : {
            background: "#f1f5f9"
          }}
          disabled={!message.trim()}
        >
          <ArrowUp 
            size={14} 
            strokeWidth={2.2} 
            className={message.trim() ? "text-white" : "text-slate-400"} 
          />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ChatInterfaceFull;