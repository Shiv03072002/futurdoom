import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Paperclip,
  Smile,
  CheckCheck,
  Copy,
  Trash2,
  Heart,
  X,
  MoreVertical,
  Phone,
  Video,
  Info,
  Image
} from "lucide-react";

const ChatModal = ({ isOpen, onClose, recipient }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "recipient",
      text: "Hey! How are you?",
      time: "10:30 AM",
      status: "read"
    },
    {
      id: 2,
      sender: "me",
      text: "I'm good! How about you?",
      time: "10:32 AM",
      status: "read"
    },
    {
      id: 3,
      sender: "recipient",
      text: "Do you have time to discuss the project?",
      time: "10:33 AM",
      status: "delivered"
    }
  ]);
  
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "me",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sent"
    };

    setMessages([...messages, newMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate reply
    setTimeout(() => {
      setIsTyping(false);
      const reply = {
        id: Date.now() + 1,
        sender: "recipient",
        text: "Thanks for your message! I'll get back to you soon.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: "delivered"
      };
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          style={{ maxHeight: "80vh" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={recipient?.avatar || "https://i.pravatar.cc/40?img=7"}
                  alt={recipient?.name || "User"}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white/50"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full ring-2 ring-white" />
              </div>
              
              {/* Info */}
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {recipient?.name || "Shiv Kumar"}
                </h3>
                <p className="text-[10px] text-blue-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  Online
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white transition-colors">
                <Phone size={16} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white transition-colors">
                <Video size={16} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white transition-colors">
                <Info size={16} />
              </button>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div 
            className="flex-1 overflow-y-auto p-4 space-y-3"
            style={{ background: "#f8faff" }}
          >
            {/* Date divider */}
            <div className="flex justify-center">
              <span className="text-[9px] font-medium text-slate-400 bg-white px-2 py-1 rounded-full border border-slate-200">
                Today
              </span>
            </div>

            {messages.map((msg, index) => {
              const isMe = msg.sender === "me";
              const showAvatar = index === 0 || messages[index - 1]?.sender !== msg.sender;

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Avatar for recipient */}
                  {!isMe && showAvatar && (
                    <img
                      src={recipient?.avatar || "https://i.pravatar.cc/40?img=7"}
                      alt="avatar"
                      className="w-6 h-6 rounded-full ring-2 ring-white flex-shrink-0"
                    />
                  )}
                  {!isMe && !showAvatar && <div className="w-6" />}

                  {/* Message bubble */}
                  <div className={`flex flex-col max-w-[75%] ${isMe ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`px-3 py-2 text-xs rounded-2xl ${
                        isMe 
                          ? 'bg-blue-600 text-white rounded-br-none' 
                          : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none'
                      }`}
                    >
                      <p className="break-words">{msg.text}</p>
                    </div>
                    
                    {/* Time and status */}
                    <div className="flex items-center gap-1 mt-1 px-1">
                      <span className="text-[8px] text-slate-400">{msg.time}</span>
                      {isMe && (
                        <CheckCheck size={10} className={msg.status === "read" ? "text-blue-500" : "text-slate-300"} />
                      )}
                    </div>
                  </div>

                  {/* Avatar for me */}
                  {isMe && showAvatar && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 ring-2 ring-white flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                      ME
                    </div>
                  )}
                  {isMe && !showAvatar && <div className="w-6" />}
                </motion.div>
              );
            })}

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <img
                    src={recipient?.avatar || "https://i.pravatar.cc/40?img=7"}
                    alt="avatar"
                    className="w-6 h-6 rounded-full ring-2 ring-white"
                  />
                  <div className="bg-white border border-slate-200 px-3 py-2 rounded-2xl rounded-bl-none">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-200">
            <div className="flex items-center gap-2">
              {/* Attachments */}
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
                <Paperclip size={16} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
                <Image size={16} />
              </button>

              {/* Input field */}
              <div className="flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type a message..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              {/* Emoji */}
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
                <Smile size={16} />
              </button>

              {/* Send button */}
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${
                  input.trim()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatModal;