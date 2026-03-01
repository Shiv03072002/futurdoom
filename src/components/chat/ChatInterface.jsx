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
  Reply,
  Copy,
  Trash2,
  Heart,
  Brain
} from "lucide-react";
import { useNavigate } from "react-router-dom";
const BLUE = "#2563eb";
const DARK_BLUE = "#1a3aad";

const initialMessages = [
  { id: 1, from: "them", text: "how to do frontend in html", time: "2:10 PM", read: true },
  {
    id: 2,
    from: "me",
    text: "To create a frontend in HTML, follow these steps: start with a basic HTML structure, add CSS for styling, and use JavaScript for interactivity.",
    time: "2:11 PM",
    read: true,
  },
  {
    id: 3,
    from: "them",
    text: "Can you give me a simple example?",
    time: "2:13 PM",
    read: false,
  },
];

const Avatar = ({ size = 36, status = true }) => (
  <div className="relative flex-shrink-0">
    <div
      className="flex items-center justify-center rounded-xl text-white font-bold"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${DARK_BLUE}, ${BLUE})`,
        fontSize: size * 0.35,
        boxShadow: "0 4px 10px rgba(37,99,235,0.3)",
      }}
    >
      DP
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
        from: "me", 
        text: input.trim(), 
        time: "Just now", 
        read: false,
      },
    ]);
    setInput("");
    
    // Simulate typing response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { 
          id: Date.now() + 1, 
          from: "them", 
          text: "Thanks for the info! 😊", 
          time: "Just now", 
          read: false 
        },
      ]);
    }, 2000);
  };

  const removeMsg = (id) => setMessages((prev) => prev.filter((m) => m.id !== id));

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
      className="flex-1"
    >
      <div
        className="flex flex-col overflow-hidden bg-white rounded-xl border border-blue-50"
        style={{
          height: 700,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {/* ── Header ── */}
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex items-center gap-3 flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 px-5 py-3"
        >
          {/* Avatar + status */}
          <Avatar size={48} status={true} />

          {/* Name + status */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-base font-bold text-slate-800">
                Dipankar Porey
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
                Active now
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1">
            {[
              { Icon: Phone, label: "Call" },
              { Icon: Video, label: "Video" },
              { Icon: Info, label: "Info" },
              { Icon: MoreHorizontal, label: "More" },
            ].map(({ Icon, label }) => (
              <motion.button
                key={label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center rounded-xl hover:bg-white w-9 h-9 text-blue-600 transition-all"
              >
                <Icon size={18} strokeWidth={1.8} />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── Messages ── */}
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
              Feb 20, 2026
            </span>
          </motion.div>

          {/* Messages */}
          <AnimatePresence mode="popLayout">
            {messages.map((msg, i) => {
              const isMe = msg.from === "me";
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
                  {/* Action Icons - Always visible above message */}
                  <div className={`flex items-center gap-1 mb-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                    {/* Left side icons for their messages */}
                    {!isMe && (
                      <>
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
                          title="Reply"
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
  onClick={() => navigate("/deepaskshare")}
  className="p-1 rounded-lg hover:bg-indigo-50 text-slate-400 hover:text-indigo-500 transition-colors relative"
  title="Deep Ask Share - 4 notifications"
>
  <Brain size={14} />
  
  {/* Static "4" notification badge */}
  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
    4
  </span>
</motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-1 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                          title="Share"
                        >
                          <Share2 size={14} />
                        </motion.button>
                      </>
                    )}

                    {/* Right side icons for my messages */}
                    {isMe && (
                      <>
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
                          title="Edit"
                        >
                          <Settings size={14} />
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
                      </>
                    )}
                  </div>

                  {/* Message bubble with avatar */}
                  <div className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                    {/* Avatar for them messages */}
                    {!isMe && !prevSame && (
                      <Avatar size={36} status={false} />
                    )}
                    {!isMe && prevSame && <div className="w-9" />}

                    {/* Message bubble */}
                    <div className={`flex flex-col max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className={`px-4 py-2.5 text-sm ${
                          isMe 
                            ? 'bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white rounded-2xl rounded-br-sm' 
                            : 'bg-white text-slate-700 rounded-2xl rounded-bl-sm border border-blue-100'
                        }`}
                        style={{
                          boxShadow: isMe 
                            ? '0 4px 15px rgba(37,99,235,0.3)'
                            : '0 2px 8px rgba(0,0,0,0.03)',
                        }}
                      >
                        {msg.text}
                      </motion.div>

                      {/* Time + read receipt */}
                      <div className={`flex items-center gap-1.5 mt-1 text-xs ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-slate-400">{msg.time}</span>
                        {isMe && (
                          <CheckCheck
                            size={14}
                            className={msg.read ? "text-blue-600" : "text-slate-300"}
                          />
                        )}
                      </div>
                    </div>

                    {/* Spacer for alignment */}
                    {isMe && <div className="w-9" />}
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
                className="flex items-center gap-2"
              >
                <Avatar size={30} status={false} />
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm border border-blue-100 flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      variants={typingAnimation}
                      animate="animate"
                      className="w-1.5 h-1.5 bg-blue-600 rounded-full"
                      style={{
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* ── Input bar ── */}
        <motion.div
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          className="flex items-center gap-2 flex-shrink-0 px-4 py-3 border-t border-slate-200 bg-white"
        >
          {/* Attachment + emoji */}
          {[Paperclip, Smile].map((Icon, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.1, rotate: i === 1 ? 15 : 0 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center rounded-xl hover:bg-blue-50 w-10 h-10 text-slate-500 transition-colors"
            >
              <Icon size={18} strokeWidth={1.8} />
            </motion.button>
          ))}

          {/* Input */}
          <div className="flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Write a message…"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>

          {/* Send */}
          <motion.button
            onClick={send}
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
      </div>
    </motion.div>
  );
};

export default ChatInterface;