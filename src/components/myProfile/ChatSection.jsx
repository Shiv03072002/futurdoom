import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, Sparkles, Send, Smile, Paperclip, Mic, Image, FileText, X,Calendar,
  Trash2, Heart, Copy, Share2, CheckCheck, Brain
} from "lucide-react";

const ChatSection = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showAttachments, setShowAttachments] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
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
      text: "I've been working on similar stuff lately.",
      time: "10:33 AM",
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

  const attachments = [
    { icon: Image, label: "Image", color: "from-green-400 to-emerald-500" },
    { icon: FileText, label: "Document", color: "from-blue-400 to-indigo-500" },
    { icon: Mic, label: "Audio", color: "from-purple-400 to-pink-500" },
    { icon: Paperclip, label: "File", color: "from-amber-400 to-orange-500" },
  ];

  // Avatar component
  const Avatar = ({ size = 32, status = true }) => (
    <div className="relative flex-shrink-0">
      <div 
        className="rounded-xl bg-gradient-to-br from-[#1a3aad] to-[#2563eb] flex items-center justify-center text-white font-bold shadow-md"
        style={{ width: size, height: size }}
      >
        fD
      </div>
      {status && (
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full ring-2 ring-white" />
      )}
    </div>
  );

  return (
    <motion.div 
      className="bg-white rounded-xl border border-blue-50 overflow-hidden"
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
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-blue-200">
                <Calendar size={12} className="text-blue-500" />
                <span className="text-xs font-medium text-slate-700">Feb 19, 2026</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Share Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 rounded-lg hover:bg-white text-slate-500 hover:text-blue-600 transition-colors"
              title="Share"
            >
              <Share2 size={14} />
            </motion.button>


             <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="p-1.5 rounded-lg hover:bg-white text-slate-500 hover:text-pink-500 transition-colors"
    title="Like"
  >
    <Heart size={14} />
  </motion.button>

            {/* Delete Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 rounded-lg hover:bg-white text-slate-500 hover:text-red-500 transition-colors"
              title="Delete"
            >
              <Trash2 size={14} />
            </motion.button>

           
          </div>
        </div>
      </div>
      {/* Messages Area */}
      <motion.div 
        className="px-6 py-5 space-y-4 bg-gradient-to-b from-blue-50/50 to-white  overflow-y-auto"
        variants={itemVariants}
      >
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
                <div className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                  {/* Avatar for their messages */}
                  {!isMe && !prevSame && (
                    <Avatar size={36} status={true} />
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

      {/* Message Input Area */}
      <motion.div 
        className="px-6 py-4 border-t border-slate-100 bg-white"
        variants={itemVariants}
      >
        {/* Attachment options */}
        <AnimatePresence>
          {showAttachments && (
            <motion.div 
              className="flex gap-2 mb-3 pb-3 border-b border-slate-100"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {attachments.map((att, i) => (
                <motion.button
                  key={att.label}
                  className="flex flex-col items-center gap-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${att.color} flex items-center justify-center text-white shadow-md`}>
                    <att.icon size={16} />
                  </div>
                  <span className="text-[9px] text-slate-500">{att.label}</span>
                </motion.button>
              ))}
              <motion.button
                className="flex flex-col items-center gap-1"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAttachments(false)}
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                  <X size={16} />
                </div>
                <span className="text-[9px] text-slate-500">Close</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

       

          
          
        
      </motion.div>
    </motion.div>
  );
};

export default ChatSection;