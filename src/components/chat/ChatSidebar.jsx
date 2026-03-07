import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Search, 
  Bot, 
  Sparkles, 
  Cpu, 
  Zap, 
  Globe, 
  Brain,
  Plus,
  MessageCircle,
  Trash2,
  Clock,
  Share2,
  MoreHorizontal
} from "lucide-react";

const BLUE = "#2563eb";
const DARK_BLUE = "#1a3aad";

// AI Chat history with full conversation data
const chatHistory = [
  {
    id: 1,
    name: "ChatGPT-4",
    lastMessage: "How can I help with your React component?",
    time: "2:10 PM",
    date: "Today",
    unread: 2,
    icon: <Brain size={16} />,
    messages: [
      { id: 101, from: "user", text: "Can you help me with React components?", time: "2:05 PM", read: true },
      { id: 102, from: "ai", text: "Of course! I'd be happy to help with React components. What specifically would you like to know?", time: "2:07 PM", read: true },
      { id: 103, from: "user", text: "How can I create a reusable button component?", time: "2:10 PM", read: true },
      { id: 104, from: "ai", text: "How can I help with your React component?", time: "2:10 PM", read: false }
    ]
  },
  {
    id: 2,
    name: "Claude 3",
    lastMessage: "Here's an optimized solution for your problem",
    time: "11:30 AM",
    date: "Yesterday",
    unread: 0,
    icon: <Sparkles size={16} />,
    messages: [
      { id: 201, from: "user", text: "I need help optimizing my algorithm", time: "11:15 AM", read: true },
      { id: 202, from: "ai", text: "Here's an optimized solution for your problem", time: "11:30 AM", read: true }
    ]
  },
  {
    id: 3,
    name: "Gemini Pro",
    lastMessage: "Let me analyze that code for you",
    time: "9:15 AM",
    date: "Yesterday",
    unread: 1,
    icon: <Zap size={16} />,
    messages: [
      { id: 301, from: "user", text: "Can you review this code snippet?", time: "9:10 AM", read: true },
      { id: 302, from: "ai", text: "Let me analyze that code for you", time: "9:15 AM", read: false }
    ]
  },
  {
    id: 4,
    name: "Llama 3",
    lastMessage: "I can help you debug that issue",
    time: "6:20 PM",
    date: "Feb 25",
    unread: 0,
    icon: <Cpu size={16} />,
    messages: [
      { id: 401, from: "user", text: "I'm getting a TypeError in my code", time: "6:15 PM", read: true },
      { id: 402, from: "ai", text: "I can help you debug that issue", time: "6:20 PM", read: true }
    ]
  },
  {
    id: 5,
    name: "Copilot",
    lastMessage: "Here's a suggestion for your code",
    time: "3:45 PM",
    date: "Feb 24",
    unread: 0,
    icon: <Bot size={16} />,
    messages: [
      { id: 501, from: "user", text: "How do I implement authentication?", time: "3:30 PM", read: true },
      { id: 502, from: "ai", text: "Here's a suggestion for your code", time: "3:45 PM", read: true }
    ]
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
      <span
        className="absolute rounded-full ring-2 ring-white"
        style={{ 
          width: size * 0.25, 
          height: size * 0.25, 
          background: "#22c55e", 
          bottom: 0, 
          right: 0 
        }}
      />
    )}
  </div>
);

const ChatSidebar = ({ onSelectChat, onNewChat, isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && 
          buttonRef.current && !buttonRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredHistory = chatHistory.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      name: "New Chat",
      lastMessage: "Start a new conversation",
      time: "Just now",
      date: "Today",
      unread: 0,
      icon: <Sparkles size={16} />,
      messages: [
        { 
          id: Date.now() + 1, 
          from: "ai", 
          text: "Hello! I'm futurDooM. How can I help you today?", 
          time: "Just now", 
          read: true 
        }
      ]
    };
    
    onNewChat(newChat);
    onClose();
  };

  const handleChatSelect = (chat) => {
    const updatedChat = {
      ...chat,
      unread: 0,
      messages: chat.messages.map(msg => ({ ...msg, read: true }))
    };
    onSelectChat(updatedChat);
    onClose();
  };

  const handleDeleteChat = (e, chatId) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this conversation?")) {
      console.log("Deleting chat:", chatId);
      setActiveMenu(null);
    }
  };

  const toggleMenu = (e, chatId) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === chatId ? null : chatId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="lg:w-80 bg-white rounded-xl border border-blue-100 overflow-hidden flex flex-col"
      style={{ height: 600 }}
    >
      {/* History Header */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
        <div className="hidden lg:flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <MessageSquare size={18} className="text-blue-600" />
            Chat History
          </h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-white/50 transition-colors"
          >
            <span className="text-lg">✕</span>
          </button>
        </div>
        
        {/* Search */}
        <div className="relative mb-3">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-blue-200 bg-white text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Start New Chat Button */}
        <button
          onClick={handleNewChat}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Plus size={16} />
          Start New Chat
        </button>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto p-2">
        {filteredHistory.map((chat) => (
          <div
            key={chat.id}
            onClick={() => handleChatSelect(chat)}
            className="p-3 mb-2 rounded-xl cursor-pointer bg-slate-50 hover:bg-blue-50 border border-slate-100 transition-all relative group"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {chat.lastMessage}
                </p>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[9px] text-slate-400 flex items-center gap-1">
                    <Clock size={8} />
                    {chat.date} · {chat.time}
                  </span>
                  
                  {/* Menu Button */}
                  <div className="relative">
                    <button
                      ref={activeMenu === chat.id ? buttonRef : null}
                      onClick={(e) => toggleMenu(e, chat.id)}
                      className=" transition-opacity p-1 rounded hover:bg-gray-200"
                    >
                      <MoreHorizontal size={12} className="text-gray-500" />
                    </button>

                    {/* Menu Dropdown */}
                    {activeMenu === chat.id && (
                      <div
                        ref={menuRef}
                        className="absolute right-0 bottom-0 w-36 bg-white rounded-lg border border-gray-200 shadow-xl z-50 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => {
                            console.log("Share chat:", chat.id);
                            setActiveMenu(null);
                          }}
                          className="w-full px-4 py-2.5 flex items-center gap-2 text-left text-xs text-gray-700 hover:bg-blue-50 transition-colors border-b border-gray-100"
                        >
                          <Share2 size={12} className="text-blue-500" />
                          Share
                        </button>

                        <button
                          onClick={(e) => handleDeleteChat(e, chat.id)}
                          className="w-full px-4 py-2.5 flex items-center gap-2 text-left text-xs text-gray-700 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={12} className="text-red-500" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredHistory.length === 0 && (
          <div className="text-center py-8">
            <MessageSquare size={32} className="mx-auto text-slate-300 mb-2" />
            <p className="text-sm text-slate-400">No conversations found</p>
            <button
              onClick={handleNewChat}
              className="mt-3 px-4 py-2 bg-blue-500 text-white text-xs rounded-lg inline-flex items-center gap-1 hover:bg-blue-600 transition-colors"
            >
              <Plus size={12} />
              Start a new chat
            </button>
          </div>
        )}
      </div>

      {/* History Footer */}
      <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-100">
        <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
          <MessageCircle size={10} />
          {chatHistory.length} conversations • AI Powered
        </p>
      </div>
    </motion.div>
  );
};

export default ChatSidebar;