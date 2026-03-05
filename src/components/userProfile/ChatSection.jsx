import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, Sparkles, Send, Smile, Paperclip, Mic, Image, FileText, X,
  Trash2, Heart, Copy, Share2, CheckCheck, Brain, MoreVertical, MessageCircle, ArrowRight, ChevronDown, ChevronUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChatSection = () => {
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showAttachments, setShowAttachments] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [expandedMessages, setExpandedMessages] = useState({});
  const [showFullConversation, setShowFullConversation] = useState(false);
  
  // Messages state with dummy data
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "them",
      text: "Hey! How's it going?",
      time: "10:30 AM",
      read: true,
    },
    {
      id: 2,
      from: "me",
      text: "I'm doing great! Working on some React components.",
      time: "10:32 AM",
      read: true,
    },
    {
      id: 3,
      from: "them",
      text: "That's awesome! Need any help?",
      time: "10:33 AM",
      read: true,
    },
    {
      id: 4,
      from: "them",
      text: "I've been working on similar stuff lately. I built a whole dashboard with React and Tailwind. The components are reusable and the performance is great. You should check it out sometime!",
      time: "10:33 AM",
      read: false,
    },
    {
      id: 5,
      from: "me",
      text: "That sounds really interesting! Can you share some code examples? I'm particularly interested in how you handled state management.",
      time: "10:35 AM",
      read: true,
    },
    {
      id: 6,
      from: "them",
      text: "Sure! I used Redux Toolkit for global state and React Query for server state. Here's a quick example of how I set up the store...",
      time: "10:36 AM",
      read: false,
    },
  ]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
  };

  const toggleMessage = (messageId) => {
    setExpandedMessages(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }));
  };

  // Truncate message function
  const truncateMessage = (text, limit = 80) => {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + "...";
  };

  // Check if message is long
  const isLongMessage = (text) => text.length > 80;

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        from: "me",
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
      };
      setMessages([...messages, newMessage]);
      setMessage("");
      setIsTyping(false);
      
      // Simulate reply after 2 seconds
      setTimeout(() => {
        const replyMessage = {
          id: messages.length + 2,
          from: "them",
          text: "Thanks for your message! I'll get back to you soon.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false,
        };
        setMessages(prev => [...prev, replyMessage]);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const removeMsg = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const handleOpenDeepPage = () => {
  const threadData = {
    id: 1,
    userMessage: "Can you help me with React?",
    aiResponse: "Sure! I'd be happy to help with React.",
    time: "10:30 AM",
    responseTime: "10:32 AM",
    context: "full-conversation",
    messages: messages
  };

  navigate(`/thread/${threadData.id}`, {
    state: { thread: threadData }
  });
};
  const attachments = [
    { icon: Image, label: "Image", color: "from-green-400 to-emerald-500" },
    { icon: FileText, label: "Document", color: "from-blue-400 to-indigo-500" },
    { icon: Mic, label: "Audio", color: "from-purple-400 to-pink-500" },
    { icon: Paperclip, label: "File", color: "from-amber-400 to-orange-500" },
  ];

  // Avatar component
  const Avatar = ({ size = 32, status = true, initial = "fD" }) => (
    <div className="relative flex-shrink-0">
      <div 
        className="rounded-xl bg-gradient-to-br from-[#1a3aad] to-[#2563eb] flex items-center justify-center text-white font-bold shadow-md"
        style={{ width: size, height: size, fontSize: size * 0.35 }}
      >
        {initial}
      </div>
      {status && (
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full ring-2 ring-white" />
      )}
    </div>
  );

  // Get preview messages (first 4 messages)
  const previewMessages = messages.slice(0, 4);
  const hasMoreMessages = messages.length > 4;
  const nextMessages = messages.slice(4, 6);

  return (
    <motion.div 
      className="bg-white rounded-xl border border-blue-50 overflow-hidden w-full "
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
          },
        },
      }}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50"
        variants={itemVariants}
      >
        <div className="flex items-center gap-3">
          <motion.span 
            className="text-sm font-semibold text-slate-800 flex items-center gap-1"
            animate={{
              color: ["#1e293b", "#2563eb", "#1e293b"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            futurDooM
            <Sparkles size={12} className="text-blue-400" />
          </motion.span>
          <span className="text-xs text-slate-400 bg-white px-2.5 py-0.5 rounded-full border border-blue-100">
            Feb 20, 2026
          </span>
        </div>
        
        <div className="flex items-center gap-2 relative">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="w-8 h-8 rounded-xl hover:bg-blue-100 flex items-center justify-center text-slate-500 hover:text-blue-600 transition-colors"
          >
            <MoreVertical size={16} />
          </motion.button>

          <AnimatePresence>
            {settingsOpen && (
              <motion.div 
                className="absolute right-0 top-10 mt-2 w-48 bg-white rounded-xl shadow-xl border border-blue-100 z-10 overflow-hidden"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="p-2">
                  {["Mute", "Block", "Report", "Hide", "Clear Chat", "Export Chat"].map((item, i) => (
                    <motion.button
                      key={item}
                      className="w-full text-left px-3 py-2 text-xs text-slate-600 hover:bg-blue-50 rounded-lg transition-colors"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (item === "Clear Chat") setMessages([]);
                        setSettingsOpen(false);
                      }}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Messages Area */}
      <motion.div 
        className="px-4 sm:px-6 py-5 space-y-4 bg-gradient-to-b from-blue-50/50 to-white min-h-[400px] max-h-[500px] overflow-y-auto"
        variants={itemVariants}
      >
        <AnimatePresence mode="popLayout">
          {previewMessages.map((msg, i) => {
            const isMe = msg.from === "me";
            const prevSame = i > 0 && previewMessages[i - 1].from === msg.from;

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
                        className="p-1 rounded-lg hover:bg-indigo-50 text-slate-400 hover:text-indigo-500 transition-colors relative"
                        title="Deep Ask Share"
                      >
                        <Brain size={14} />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[8px] font-bold rounded-full h-3.5 w-3.5 flex items-center justify-center">
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
                <div className={`flex items-end gap-2 max-w-[85%] sm:max-w-[70%] ${isMe ? 'ml-auto justify-end' : 'mr-auto justify-start'}`}>
                  {/* Avatar for their messages */}
                  {!isMe && !prevSame && (
                    <Avatar size={36} status={true} initial="JD" />
                  )}
                  {!isMe && prevSame && <div className="w-9" />}

                  {/* Message bubble */}
                  <div className={`flex flex-col w-full ${isMe ? 'items-end' : 'items-start'}`}>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className={`px-4 py-2.5 text-sm break-words max-w-full ${
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
                      <div>
                        {expandedMessages[msg.id] 
                          ? msg.text 
                          : truncateMessage(msg.text)
                        }
                      </div>
                      
                      {/* Show more/less button for long messages */}
                      {isLongMessage(msg.text) && (
                        <button
                          onClick={() => toggleMessage(msg.id)}
                          className={`flex items-center gap-1 text-[10px] mt-2 font-medium ${
                            isMe ? 'text-blue-200 hover:text-white' : 'text-blue-600 hover:text-blue-700'
                          }`}
                        >
                          {expandedMessages[msg.id] ? (
                            <>Show less <ChevronUp size={10} /></>
                          ) : (
                            <>Show more <ChevronDown size={10} /></>
                          )}
                        </button>
                      )}
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

                  {/* Avatar for my messages - only show if first in sequence */}
                  {isMe && !prevSame && (
                    <Avatar size={36} status={true} initial="ME" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Continue Reading Wrapper - Shows when there are more messages */}
        {hasMoreMessages && !showFullConversation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleOpenDeepPage}
              className="cursor-pointer group"
            >
              <div className="bg-gradient-to-b from-blue-50/50 to-white rounded-xl border border-blue-100 p-4 hover:border-blue-300 hover:shadow-md transition-all duration-300">
                {/* Header */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                    <MessageCircle size={12} className="text-blue-600" />
                  </div>
                  <span className="text-xs font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
                    Continue reading...
                  </span>
                  <span className="text-[10px] text-slate-400 bg-white px-2 py-0.5 rounded-full ml-auto">
                    +{messages.length - 4} more
                  </span>
                </div>

                {/* Next Q&A Preview with smaller font */}
                <div className="space-y-3">
                  {nextMessages.map((msg, index) => {
                    const isMe = msg.from === "me";
                    return (
                      <div key={msg.id} className={`flex items-start gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                        {!isMe && (
                          <div className="w-5 h-5 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-[8px] font-medium text-blue-600">fD</span>
                          </div>
                        )}
                        
                        <div className={`flex-1 max-w-[85%] ${isMe ? 'text-right' : 'text-left'}`}>
                          <p className="text-[10px] text-slate-400 mb-0.5">
                            {isMe ? 'You' : 'futurdoom'}
                          </p>
                          <div className={`text-[11px] p-2 rounded-lg ${
                            isMe 
                              ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                              : 'bg-white text-slate-600 border border-blue-50'
                          }`}>
                            {msg.text.length > 50 ? msg.text.substring(0, 50) + '...' : msg.text}
                          </div>
                        </div>

                        {isMe && (
                          <div className="w-5 h-5 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-[8px] font-medium text-slate-500">U</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Click hint */}
                <div className="flex items-center justify-center gap-1 mt-3 text-[9px] text-slate-400">
                  <span>Click to view full conversation</span>
                  <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Full conversation (when expanded) */}
        {showFullConversation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <AnimatePresence>
              {messages.slice(4).map((msg) => {
                const isMe = msg.from === "me";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-end gap-2 max-w-[85%] sm:max-w-[70%] ${isMe ? 'flex-row-reverse' : ''}`}>
                      <Avatar size={28} status={false} initial={isMe ? "ME" : "fD"} />
                      <div className="flex flex-col">
                        <div className={`px-3 py-2 text-xs ${
                          isMe 
                            ? 'bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white rounded-2xl rounded-br-sm' 
                            : 'bg-white text-slate-700 rounded-2xl rounded-bl-sm border border-blue-100'
                        }`}>
                          {msg.text}
                        </div>
                        <span className="text-[8px] text-slate-400 mt-0.5">{msg.time}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Typing indicator */}
        {isTyping && (
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Avatar size={32} status={false} />
            <div className="bg-white border border-blue-100 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <motion.span 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 bg-blue-400 rounded-full"
                />
                <motion.span 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-blue-400 rounded-full"
                />
                <motion.span 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 bg-blue-400 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

    
    </motion.div>
  );
};

export default ChatSection;