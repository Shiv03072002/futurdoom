import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Plus, 
  MessageCircle, 
  Users, 
  Sparkles, 
  Compass,
  Search,
  Check,
  Clock,
  ChevronRight,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DiscussionMain = () => {
  const navigate = useNavigate();
  const [showRecipientList, setShowRecipientList] = useState(false);
  const [showPreviousChats, setShowPreviousChats] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Sample users for recipient list
  const users = [
    { id: 1, name: "Dipankar Porey", avatar: "DP", color: "from-pink-400 to-red-400", online: true },
    { id: 2, name: "Aarav Mehta", avatar: "AM", color: "from-blue-400 to-indigo-500", online: true },
    { id: 3, name: "Sneha Rao", avatar: "SR", color: "from-emerald-400 to-teal-500", online: false },
    { id: 4, name: "Rahul Sharma", avatar: "RS", color: "from-purple-400 to-pink-400", online: true },
    { id: 5, name: "Priya Patel", avatar: "PP", color: "from-orange-400 to-rose-400", online: false },
    { id: 6, name: "Amit Kumar", avatar: "AK", color: "from-cyan-400 to-blue-400", online: true },
  ];

  // Sample previous chats (user to user conversations)
 const previousChats = [
  { 
    id: 1, 
    name: "Dipankar & Shiv", 
    avatar: "DS", 
    color: "from-pink-400 to-red-400", 
    lastMessage: "Dipankar: Hey Shiv, did you check the latest updates?", 
    time: "2 min ago", 
    unread: 2,
    participants: ["Dipankar Porey", "Shiv Kumar"]
  },
  { 
    id: 2, 
    name: "Aarav & Shiv", 
    avatar: "AS", 
    color: "from-blue-400 to-indigo-500", 
    lastMessage: "Aarav: Thanks for the help with the project!", 
    time: "1 hour ago", 
    unread: 0,
    participants: ["Aarav Mehta", "Shiv Kumar"]
  },
  { 
    id: 3, 
    name: "Sneha & Shiv", 
    avatar: "SS", 
    color: "from-emerald-400 to-teal-500", 
    lastMessage: "Sneha: Can you explain that concept again?", 
    time: "3 hours ago", 
    unread: 1,
    participants: ["Sneha Rao", "Shiv Kumar"]
  },
  { 
    id: 4, 
    name: "Rahul & Shiv", 
    avatar: "RS", 
    color: "from-purple-400 to-pink-400", 
    lastMessage: "Rahul: Great discussion about the new features!", 
    time: "5 hours ago", 
    unread: 0,
    participants: ["Rahul Sharma", "Shiv Kumar"]
  },
  { 
    id: 5, 
    name: "Priya & Shiv", 
    avatar: "PS", 
    color: "from-orange-400 to-rose-400", 
    lastMessage: "Priya: See you at the meeting tomorrow", 
    time: "1 day ago", 
    unread: 0,
    participants: ["Priya Patel", "Shiv Kumar"]
  },
  { 
    id: 6, 
    name: "Amit & Shiv", 
    avatar: "AS", 
    color: "from-cyan-400 to-blue-400", 
    lastMessage: "Amit: The code changes look good to me", 
    time: "2 days ago", 
    unread: 0,
    participants: ["Amit Kumar", "Shiv Kumar"]
  }
];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const startNewDiscussion = () => {
    if (selectedUsers.length > 0) {
      setShowRecipientList(false);
      // Navigate to new discussion page with selected users
      navigate("/discussion/new", { state: { selectedUsers } });
    }
  };

  const openPreviousChat = (chatId) => {
    setShowPreviousChats(false);
    // Navigate to specific discussion page
    navigate(`/discussion/${chatId}`);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

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

  const avatarVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.3,
      },
    },
  };

  const listVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const buttonHover = {
    scale: 1.05,
    y: -2,
    transition: { type: "spring", stiffness: 400, damping: 17 },
  };

  const buttonTap = {
    scale: 0.95,
    y: 0,
  };

  const pulseAnimation = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="flex items-center justify-center  ">
      
      <motion.div 
        className="w-full max-w-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Card */}
        <motion.div 
          className="bg-white rounded-xl border border-blue-50 overflow-hidden relative"
          variants={itemVariants}
        >
          {/* Header with Gradient */}
          <motion.div 
            className="relative h-40 bg-gradient-to-br from-[#0f1f6e] via-[#1a3aad] to-[#2563eb] overflow-visible"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            {/* Decorative elements */}
            <motion.div 
              className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, -20, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "32px 32px"
              }}
            />

            {/* Header content */}
            <div className="relative h-full flex flex-col justify-between p-6 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-[2px] bg-blue-300" />
                  <span className="text-blue-200 text-xs tracking-[0.2em] uppercase font-medium">Discussion</span>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Compass size={18} className="text-blue-300" />
                </motion.div>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.h1 
                  className="text-2xl font-black text-white tracking-tight"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  Welcome to Discussion
                </motion.h1>
                <Sparkles size={16} className="text-blue-300" />
              </div>
            </div>
          </motion.div>

          {/* Avatar - positioned to overlap */}
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 z-30"
            style={{ top: "120px" }}
            variants={avatarVariants}
          >
            <motion.div 
              className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1a3aad] to-[#2563eb] ring-4 ring-white shadow-xl flex items-center justify-center text-4xl font-bold text-white"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              D
            </motion.div>
            <motion.span 
              className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full ring-2 ring-white"
              animate={pulseAnimation}
            />
          </motion.div>

          {/* Body with padding to account for avatar */}
          <motion.div 
            className="pt-16 px-6 pb-8"
            style={{ marginTop: "40px" }}
            variants={itemVariants}
          >
            {/* Welcome message */}
            <motion.div 
              className="text-center mb-6"
              variants={itemVariants}
            >
              <motion.p 
                className="text-lg font-semibold text-slate-700 mb-1"
                animate={{ color: ["#334155", "#2563eb", "#334155"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Hello <span className="text-blue-600 font-bold">Shiv</span>! 👋
              </motion.p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Join or start a discussion
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div 
              className="w-12 h-0.5 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full mx-auto my-4"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />

            {/* Buttons */}
            <motion.div 
              className="flex items-center justify-center gap-8"
              variants={itemVariants}
            >
              {/* Previous Button */}
              <motion.div className="flex flex-col items-center gap-2">
                <motion.button 
                  className="w-14 h-14 flex items-center justify-center rounded-xl border-2 border-slate-200 text-slate-400 hover:text-blue-500 hover:border-blue-300 transition-all duration-200 bg-white shadow-sm"
                  variants={buttonHover}
                  whileHover="hover"
                  whileTap={buttonTap}
                  onClick={() => {
                    setShowPreviousChats(!showPreviousChats);
                    setShowRecipientList(false);
                  }}
                >
                  <ArrowLeft size={20} />
                </motion.button>
                <span className="text-xs font-medium text-slate-400">Previous</span>
              </motion.div>

              {/* New Discussion Button */}
              <motion.div className="flex flex-col items-center gap-2">
                <motion.button 
                  className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-md shadow-blue-500/30"
                  variants={buttonHover}
                  whileHover="hover"
                  whileTap={buttonTap}
                  onClick={() => {
                    setShowRecipientList(!showRecipientList);
                    setShowPreviousChats(false);
                  }}
                >
                  <Plus size={20} />
                </motion.button>
                <span className="text-xs font-medium text-slate-400">New Discussion</span>
              </motion.div>
            </motion.div>

            {/* Previous Chats List */}
            <AnimatePresence>
              {showPreviousChats && (
                <motion.div
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="mt-4 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 mb-2">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-blue-600" />
                      <span className="text-xs font-semibold text-slate-600">Recent Chats</span>
                    </div>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {previousChats.map((chat) => (
                      <motion.div
                        key={chat.id}
                       
                        className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-300 cursor-pointer transition-all"
                        onClick={() => openPreviousChat(chat.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${chat.color} flex items-center justify-center text-white font-bold shadow-md`}>
                            {chat.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{chat.name}</p>
                            <p className="text-xs text-slate-400 mt-0.5 max-w-[180px] truncate">{chat.lastMessage}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] text-slate-400">{chat.time}</span>
                          {chat.unread > 0 && (
                            <span className="mt-1 w-5 h-5 rounded-full bg-red-500 text-white text-[8px] flex items-center justify-center font-bold">
                              {chat.unread}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Recipient Selection List */}
            <AnimatePresence>
              {showRecipientList && (
                <motion.div
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="mt-4 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 mb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-blue-600" />
                        <span className="text-xs font-semibold text-slate-600">Select Recipients</span>
                      </div>
                      {selectedUsers.length > 0 && (
                        <button
                          onClick={startNewDiscussion}
                          className="text-xs bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Start ({selectedUsers.length})
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Search */}
                  <div className="relative mb-3">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search users..."
                      className="w-full pl-9 pr-4 py-2 rounded-xl border border-blue-200 bg-blue-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>

                  {/* Users List */}
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {filteredUsers.map((user) => (
                      <motion.div
                        key={user.id}
                        
                        className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                          selectedUsers.includes(user.id)
                            ? 'bg-blue-50 border-2 border-blue-400'
                            : 'bg-white border border-slate-200 hover:border-blue-300'
                        }`}
                        onClick={() => toggleUserSelection(user.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${user.color} flex items-center justify-center text-white font-bold shadow-md`}>
                            {user.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              {user.online ? (
                                <>
                                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                  <span className="text-[10px] text-green-500">Online</span>
                                </>
                              ) : (
                                <>
                                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                                  <span className="text-[10px] text-slate-400">Offline</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          selectedUsers.includes(user.id)
                            ? 'bg-blue-500 text-white'
                            : 'border-2 border-slate-300'
                        }`}>
                          {selectedUsers.includes(user.id) && <Check size={10} />}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Selected count and clear */}
                  {selectedUsers.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-blue-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        {selectedUsers.length} selected
                      </span>
                      <button
                        onClick={() => setSelectedUsers([])}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Clear all
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Online status */}
            <motion.div 
              className="mt-4 flex items-center justify-center gap-2"
              variants={itemVariants}
            >
              <motion.span 
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={pulseAnimation}
              />
              <span className="text-xs text-slate-400">156 active discussions</span>
              <ChevronRight size={12} className="text-slate-300" />
            </motion.div>
          </motion.div>

          {/* Bottom accent */}
          <motion.div 
            className="h-1 bg-gradient-to-r from-[#0f1f6e] via-[#1a3aad] to-[#2563eb]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />
        </motion.div>

        {/* Footer */}
        <motion.p 
          className="text-xs text-slate-400 text-center mt-6"
          variants={itemVariants}
        >
          © 2025 futurdoom · Discussion Forum
        </motion.p>
      </motion.div>
    </div>
  );
};

export default DiscussionMain;