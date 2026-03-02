import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Search, Bot, Sparkles, Cpu, Zap, Globe, Brain } from "lucide-react";

const BLUE = "#2563eb";
const DARK_BLUE = "#1a3aad";

// AI Chat history with names (stored but not displayed)
const chatHistory = [
  {
    id: 1,
    name: "ChatGPT-4", // Stored but not shown
    lastMessage: "How can I help with your React component?",
    time: "2:10 PM",
    date: "Today",
    unread: 2,
    icon: <Brain size={16} />
  },
  {
    id: 2,
    name: "Claude 3", // Stored but not shown
    lastMessage: "Here's an optimized solution for your problem",
    time: "11:30 AM",
    date: "Yesterday",
    unread: 0,
    icon: <Sparkles size={16} />
  },
  {
    id: 3,
    name: "Gemini Pro", // Stored but not shown
    lastMessage: "Let me analyze that code for you",
    time: "9:15 AM",
    date: "Yesterday",
    unread: 1,
    icon: <Zap size={16} />
  },
  {
    id: 4,
    name: "Llama 3", // Stored but not shown
    lastMessage: "I can help you debug that issue",
    time: "6:20 PM",
    date: "Feb 25",
    unread: 0,
    icon: <Cpu size={16} />
  },
  {
    id: 5,
    name: "Copilot", // Stored but not shown
    lastMessage: "Here's a suggestion for your code",
    time: "3:45 PM",
    date: "Feb 24",
    unread: 0,
    icon: <Bot size={16} />
  },
];

const Avatar = ({ size = 36, status = true, icon }) => (
  <div className="relative flex-shrink-0">
    <div
      className="flex items-center justify-center rounded-xl text-white"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${DARK_BLUE}, ${BLUE})`,
        boxShadow: "0 4px 10px rgba(37,99,235,0.3)",
      }}
    >
      {icon || <Bot size={size * 0.5} />}
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

const ChatSidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHistory = chatHistory.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
      className="w-80 bg-white rounded-xl border border-blue-50 overflow-hidden flex flex-col"
      style={{ height: 700 }}
    >
      {/* History Header */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <MessageSquare size={18} className="text-blue-600" />
            Chat History
          </h2>
          <span className="text-xs font-semibold text-blue-600 bg-white px-2 py-1 rounded-full border border-blue-200">
            {chatHistory.length}
          </span>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-blue-200 bg-white text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto p-2">
        <AnimatePresence mode="popLayout">
          {filteredHistory.map((chat) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 100 }}
              whileHover={{ scale: 1.02 }}
              className="p-3 mb-2 rounded-xl cursor-pointer bg-slate-50 hover:bg-blue-50 border border-slate-100 transition-all"
            >
              <div className="flex items-start gap-3">
                {/* <Avatar size={40} status={chat.unread > 0} icon={chat.icon} /> */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    {/* Name is removed from here */}
                   
                  </div>
                  
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {chat.lastMessage}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                     
                       {chat.date} • {chat.time}
                    </span>
                    
                    {chat.unread > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-blue-500 text-white text-[8px] font-bold">
                        {chat.unread} new
                      </span>
                    )}
                    
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredHistory.length === 0 && (
          <div className="text-center py-8">
            <MessageSquare size={32} className="mx-auto text-slate-300 mb-2" />
            <p className="text-sm text-slate-400">No conversations found</p>
          </div>
        )}
      </div>

      {/* History Footer */}
      <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-100">
        <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
          
          {chatHistory.length}  conversations
        </p>
      </div>
    </motion.div>
  );
};

export default ChatSidebar;