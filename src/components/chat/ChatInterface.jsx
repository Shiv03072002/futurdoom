import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Share2,
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
  Terminal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialMessages = [
  { id: 1, from: "user", text: "how to do frontend in html", time: "2:10 PM", read: true },
  { id: 2, from: "ai", text: "To create a frontend in HTML, follow these steps: start with a basic HTML structure, add CSS for styling, and use JavaScript for interactivity.", time: "2:11 PM", read: true },
  { id: 3, from: "user", text: "Can you give me a simple example?", time: "2:13 PM", read: false },
];

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
        {isAI ? "fD" : "DP"}
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

const ChatInterface = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), from: "user", text: input.trim(), time: "Just now", read: false }]);
    const userInput = input.toLowerCase();
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let responseText = "I understand your question. Let me help you with that.";
      if (userInput.includes("reverse a number") && userInput.includes("cpp")) {
        responseText = `Here's a C++ program to reverse a number:\n\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\n\nint reverseNumber(int num) {\n    int reversed = 0;\n    while (num > 0) {\n        int lastDigit = num % 10;\n        reversed = reversed * 10 + lastDigit;\n        num = num / 10;\n    }\n    return reversed;\n}\n\nint main() {\n    int number;\n    cout << "Enter a number: ";\n    cin >> number;\n    cout << "Reversed: " << reverseNumber(number) << endl;\n    return 0;\n}\n\`\`\`\n\n**How it works:**\n1. Extract last digit using % 10\n2. Build reversed number\n3. Remove last digit using / 10\n4. Repeat until number becomes 0\n\n**Example:** 12345 → 54321`;
      }
      setMessages(prev => [...prev, { id: Date.now() + 1, from: "ai", text: responseText, time: "Just now", read: false }]);
    }, 2000);
  };

  const removeMsg = (id) => setMessages(prev => prev.filter(m => m.id !== id));

  const msgVariants = {
    hidden: { opacity: 0, y: 14, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 340, damping: 26 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 p-2 sm:p-0">
      <div
        className="flex flex-col overflow-hidden bg-white h-[650px] sm:h-[700px] rounded-xl "
        style={{
        
          border: "1px solid #dbeafe",
         
        }}
      >

        {/* ── Header ── */}
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="flex items-center gap-2 sm:gap-3 flex-shrink-0 px-3 sm:px-5 py-2.5 sm:py-3 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #eff6ff 0%, #eef2ff 100%)",
            borderBottom: "1px solid #dbeafe"
          }}
        >
          {/* top shimmer line */}
          <div className="absolute top-0 inset-x-0 h-0.5 rounded-t-3xl"
            style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.45), transparent)" }} />

          {/* soft glow */}
          <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 70%)" }} />

          <Avatar size={window.innerWidth < 640 ? 40 : 48} status={true} type="ai" />

          <div className="flex-1 min-w-0 relative z-10">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <p className="text-sm sm:text-base font-extrabold text-slate-800 truncate tracking-tight">futurDooM</p>
              
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <motion.span className="w-1.5 h-1.5 rounded-full bg-green-400"
                animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              <p className="text-[10px] sm:text-xs font-semibold text-green-500">Online</p>
            </div>
          </div>

          <div className="flex items-center gap-0.5 relative z-10">
            {[Phone, Video, Info, MoreHorizontal].map((Icon, i) => (
              <motion.button key={i}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(37,99,235,0.08)" }}
                whileTap={{ scale: 0.92 }}
                className="w-8 sm:w-9 h-8 sm:h-9 flex items-center justify-center rounded-xl text-blue-500 transition-all duration-150">
                <Icon size={16} strokeWidth={1.8} />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── Messages ── */}
        <div
          className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3 sm:space-y-4"
          style={{ background: "#f8faff" }}
        >
          {/* Date pill */}
          <motion.div className="flex justify-center" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[10px] sm:text-xs font-semibold text-blue-500 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full"
              style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}>
              Feb 20, 2026
            </span>
          </motion.div>

          <AnimatePresence mode="popLayout">
            {messages.map((msg, i) => {
              const isAI = msg.from === "ai";
              const isUser = msg.from === "user";
              const prevSame = i > 0 && messages[i - 1].from === msg.from;

              return (
                <motion.div key={msg.id} variants={msgVariants} initial="hidden" animate="visible" exit="exit" layout>

                  {/* Action row */}
                  {isUser && (
                    <div className="flex items-center gap-0.5 mb-1.5 ml-1">
                      {[
                        { I: Trash2, h: "hover:bg-red-50 hover:text-red-400", fn: () => removeMsg(msg.id) },
                        { I: Heart, h: "hover:bg-pink-50 hover:text-pink-400", fn: () => {} },
                        { I: Copy, h: "hover:bg-blue-50 hover:text-blue-500", fn: () => {} },
                        { I: Share2, h: "hover:bg-indigo-50 hover:text-indigo-500", fn: () => {} },
                      ].map(({ I, h, fn }, idx) => (
                        <motion.button key={idx} onClick={fn}
                          whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.88 }}
                          className={`p-1.5 rounded-lg text-slate-400 transition-all duration-150 ${h}`}>
                          <I size={11} />
                        </motion.button>
                      ))}
                      <motion.button
                        whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.88 }}
                        onClick={() => navigate("/deepaskshare", { state: { thread: { userMessage: messages[i - 1]?.text || msg.text, aiResponse: messages[i + 1]?.text || "", time: msg.time, responseTime: messages[i + 1]?.time, conversationId: msg.id, context: "full-conversation" } } })}
                        className="p-1.5 rounded-lg text-slate-400 hover:bg-violet-50 hover:text-violet-500 transition-all duration-150 relative">
                        <Brain size={11} />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[7px] rounded-full h-3 w-3 flex items-center justify-center font-bold">4</span>
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

          {/* Typing */}
          <AnimatePresence>
            {isTyping && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 justify-end">
                <div className="px-4 py-3"
                  style={{
                    background: "linear-gradient(135deg, #1a3aad 0%, #2563eb 100%)",
                    borderRadius: "20px 20px 6px 20px",
                    boxShadow: "0 6px 22px rgba(37,99,235,0.30)"
                  }}>
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2].map(i => (
                      <motion.span key={i} className="w-1.5 h-1.5 bg-white rounded-full"
                        animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.75, repeat: Infinity, delay: i * 0.15 }} />
                    ))}
                  </div>
                </div>
                <Avatar size={window.innerWidth < 640 ? 24 : 28} status={true} type="ai" />
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* ── Input bar ── */}
        <motion.div
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 px-2 sm:px-4 py-2.5 sm:py-3 bg-white relative"
          style={{ borderTop: "1px solid #dbeafe" }}
        >
          <div className="absolute top-0 inset-x-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.35), transparent)" }} />

          {[Paperclip, Smile].map((Icon, i) => (
            <motion.button key={i}
              whileHover={{ scale: 1.1, backgroundColor: "#eff6ff" }}
              whileTap={{ scale: 0.92 }}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-blue-500 transition-all duration-150">
              <Icon size={16} strokeWidth={1.8} />
            </motion.button>
          ))}

          <div className="flex-1">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask fD something..."
              className="w-full px-4 py-2.5 rounded-2xl text-xs sm:text-sm text-slate-700 placeholder-slate-400 focus:outline-none transition-all duration-200"
              style={{
                background: "#f8faff",
                border: "1px solid #dbeafe",
                boxShadow: "inset 0 1px 2px rgba(37,99,235,0.04)"
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
            onClick={send}
            whileHover={input.trim() ? { scale: 1.08 } : {}}
            whileTap={input.trim() ? { scale: 0.92 } : {}}
            className="w-10 h-10 flex items-center justify-center rounded-2xl flex-shrink-0 transition-all duration-200"
            style={input.trim() ? {
              background: "linear-gradient(135deg, #1a3aad 0%, #2563eb 100%)",
              boxShadow: "0 4px 16px rgba(37,99,235,0.38)"
            } : {
              background: "#f1f5f9"
            }}
            disabled={!input.trim()}
          >
            <Send size={14} strokeWidth={2.2} className={input.trim() ? "text-white" : "text-slate-400"} />
          </motion.button>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default ChatInterface;