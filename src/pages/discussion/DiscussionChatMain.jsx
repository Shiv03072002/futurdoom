import React, { useState, useRef, useEffect } from "react";
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
  Search,
  MessageSquare,
  Clock,
  ChevronRight,
  Users,
  UserPlus,
  Crown,
  ArrowLeft,
  Compass
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BLUE = "#2563eb";
const DARK_BLUE = "#1a3aad";

const DiscussionChatMain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedUsers = [] } = location.state || { selectedUsers: [] };
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const messagesEndRef = useRef(null);

  // Discussion info - Get from selected users or use default
  const [discussionInfo, setDiscussionInfo] = useState({
    id: Date.now(),
    name: selectedUsers.length === 1 ? selectedUsers[0]?.name || "New Discussion" : "Group Discussion",
    avatar: selectedUsers.length === 1 ? "DM" : "GD",
    startedBy: "Shiv", // Current user who started the discussion
    startedAt: new Date().toLocaleString(),
    participants: [
      { id: "current", name: "Shiv", avatar: "SH", color: "from-blue-400 to-indigo-500", isStarter: true, online: true },
      ...selectedUsers.map((userId, index) => {
        // Map selected user IDs to actual user objects
        const userMap = {
          1: { id: 1, name: "Dipankar Porey", avatar: "DP", color: "from-pink-400 to-red-400", online: true },
          2: { id: 2, name: "Aarav Mehta", avatar: "AM", color: "from-blue-400 to-indigo-500", online: true },
          3: { id: 3, name: "Sneha Rao", avatar: "SR", color: "from-emerald-400 to-teal-500", online: false },
          4: { id: 4, name: "Rahul Sharma", avatar: "RS", color: "from-purple-400 to-pink-400", online: true },
          5: { id: 5, name: "Priya Patel", avatar: "PP", color: "from-orange-400 to-rose-400", online: false },
        };
        return userMap[userId] || { id: userId, name: `User ${userId}`, avatar: "U", color: "from-gray-400 to-gray-500", online: false };
      })
    ]
  });

  // Initial system message showing who started the discussion
  useEffect(() => {
    if (discussionInfo.participants.length > 0) {
      const starterName = discussionInfo.participants.find(p => p.isStarter)?.name || "Shiv";
      const participantNames = discussionInfo.participants.filter(p => !p.isStarter).map(p => p.name).join(", ");
      
      const systemMessage = {
        id: "system-1",
        type: "system",
        text: `${starterName} started a discussion`,
        time: "Just now",
      };

      const welcomeMessage = {
        id: "welcome-1",
        type: "system",
        text: participantNames 
          ? `👋 ${starterName} invited ${participantNames} to discuss` 
          : `👋 ${starterName} started a discussion`,
        time: "Just now",
      };

      setMessages([systemMessage, welcomeMessage]);
    }
  }, []);

  const send = () => {
    if (!input.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      from: "me",
      text: input.trim(),
      time: "Just now",
      read: false,
      sender: "Shiv",
      senderAvatar: "SH",
    };
    
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    
    // Simulate typing response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Randomly select a participant to reply
      const otherParticipants = discussionInfo.participants.filter(p => !p.isStarter);
      if (otherParticipants.length > 0) {
        const randomParticipant = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
        const replies = [
          `Interesting point, ${randomParticipant.name} here!`,
          "I agree with that perspective",
          "Let me think about that",
          "Great discussion topic!",
        ];
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            from: "them",
            text: replies[Math.floor(Math.random() * replies.length)],
            time: "Just now",
            read: false,
            sender: randomParticipant.name,
            senderAvatar: randomParticipant.avatar,
          },
        ]);
      }
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

 
  // Avatar component for participants
  const ParticipantAvatar = ({ participant, size = 36, showStatus = true }) => (
    <div className="relative flex-shrink-0">
      <div
        className={`flex items-center justify-center rounded-xl text-white font-bold bg-gradient-to-br ${participant.color}`}
        style={{
          width: size,
          height: size,
          fontSize: size * 0.35,
          boxShadow: participant.isStarter ? `0 4px 10px ${BLUE}` : "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        {participant.avatar}
      </div>
      {showStatus && participant.online && (
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
      {participant.isStarter && (
        <motion.div
          className="absolute -top-1 -right-1"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Crown size={size * 0.3} className="text-yellow-400" />
        </motion.div>
      )}
    </div>
  );

  return (
    <div className=" bg-gray-50 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Chat - Discussion Version */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-full"
        >
          <div
            className="flex flex-col overflow-hidden bg-white rounded-xl border border-blue-50"
            style={{
              height: "calc(100vh - 2rem)",
              maxHeight: 700,
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            {/* Header - Discussion Version */}
            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="flex items-center gap-2 sm:gap-3 flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 px-3 sm:px-5 py-2 sm:py-3"
            >
              {/* Back button */}
              <motion.button
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className="flex items-center justify-center rounded-xl hover:bg-white w-8 h-8 text-blue-600"
              >
                <ArrowLeft size={18} />
              </motion.button>

              {/* Discussion Avatar */}
              <div className="relative">
                <div
                  className="flex items-center justify-center rounded-xl text-white font-bold bg-gradient-to-r from-[#1a3aad] to-[#2563eb]"
                  style={{
                    width: 40,
                    height: 40,
                    fontSize: 14,
                    boxShadow: "0 4px 10px rgba(37,99,235,0.3)",
                  }}
                >
                  {discussionInfo.avatar}
                </div>
                <motion.span 
                  className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full ring-2 ring-white"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              {/* Discussion Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm sm:text-base font-bold text-slate-800 truncate">
                    {discussionInfo.name}
                  </p>
                  <Sparkles size={14} className="text-blue-500 flex-shrink-0" />
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <Users size={12} className="text-blue-500" />
                  <p className="text-xs text-slate-500">
                    {discussionInfo.participants.length} participant{discussionInfo.participants.length > 1 ? 's' : ''}
                  </p>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <p className="text-xs text-slate-500 truncate">
                    Started by {discussionInfo.startedBy}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-0.5 sm:gap-1">
                {[
                  { Icon: Phone, label: "Call" },
                  { Icon: Video, label: "Video" },
                  { Icon: Info, label: "Info", action: () => setShowParticipants(!showParticipants) },
                  { Icon: MoreHorizontal, label: "More" },
                ].map(({ Icon, label, action }) => (
                  <motion.button
                    key={label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={action}
                    className="flex items-center justify-center rounded-xl hover:bg-white w-8 h-8 sm:w-9 sm:h-9 text-blue-600 transition-all"
                  >
                    <Icon size={16} strokeWidth={1.8} />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Participants Panel (when Info is clicked) */}
            <AnimatePresence>
              {showParticipants && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-b border-blue-100 bg-blue-50/50 overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <Users size={14} className="text-blue-600" />
                        Participants ({discussionInfo.participants.length})
                      </h3>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <UserPlus size={14} />
                        Add
                      </motion.button>
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {discussionInfo.participants.map((participant) => (
                        <motion.div
                          key={participant.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-2 p-2 rounded-lg bg-white border border-blue-100"
                        >
                          <ParticipantAvatar participant={participant} size={28} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-700 flex items-center gap-1">
                              {participant.name}
                              {participant.isStarter && (
                                <span className="text-[8px] bg-yellow-100 text-yellow-600 px-1 py-0.5 rounded">
                                  Starter
                                </span>
                              )}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              {participant.online ? 'Online' : 'Offline'}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages Area */}
            <div
              className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4"
              style={{ background: "#fafcff" }}
            >
              {/* Date indicator */}
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 sm:px-4 py-1.5 rounded-full border border-blue-200">
                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </motion.div>

              {/* System Messages */}
              {messages.filter(m => m.type === 'system').map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex justify-center"
                >
                  <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                    <p className="text-xs text-blue-600 font-medium">
                      {msg.text}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Regular Messages */}
              <AnimatePresence mode="popLayout">
                {messages.filter(m => m.type !== 'system').map((msg, i) => {
                  const isMe = msg.from === "me";

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
                      {/* Action Icons */}
                      <div className={`flex items-center gap-1 mb-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                        {!isMe && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeMsg(msg.id)}
                              className="p-1 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={12} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-1 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                              title="Reply"
                            >
                              <Reply size={12} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-1 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                              title="Copy"
                            >
                              <Copy size={12} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-1 rounded-lg hover:bg-pink-50 text-slate-400 hover:text-pink-500 transition-colors"
                              title="Heart"
                            >
                              <Heart size={12} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-1 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                              title="Share"
                            >
                              <Share2 size={12} />
                            </motion.button>
                          </>
                        )}

                        {isMe && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeMsg(msg.id)}
                              className="p-1 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={12} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-1 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                              title="Edit"
                            >
                              <Settings size={12} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-1 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                              title="Copy"
                            >
                              <Copy size={12} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-1 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                              title="Share"
                            >
                              <Share2 size={12} />
                            </motion.button>
                          </>
                        )}
                      </div>

                      <div className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                        {/* Show sender avatar for discussion messages */}
                        {!isMe && (
                          <div className="relative flex-shrink-0">
                            <div
                              className={`flex items-center justify-center rounded-xl text-white font-bold bg-gradient-to-br from-blue-400 to-indigo-500`}
                              style={{ width: 32, height: 32, fontSize: 12 }}
                            >
                              {msg.senderAvatar || 'U'}
                            </div>
                          </div>
                        )}

                        <div className={`flex flex-col max-w-[85%] sm:max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>
                          {/* Sender name for discussion messages */}
                          {!isMe && (
                            <span className="text-[10px] text-blue-600 font-medium mb-1 ml-1">
                              {msg.sender || 'User'}
                            </span>
                          )}
                          
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm ${
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

                        {isMe && <div className="w-8" />}
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
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                      ...
                    </div>
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

            {/* Input bar */}
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
              className="flex items-center gap-1 sm:gap-2 flex-shrink-0 px-3 sm:px-4 py-2 sm:py-3 border-t border-slate-200 bg-white"
            >
              {[Paperclip, Smile].map((Icon, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.1, rotate: i === 1 ? 15 : 0 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center rounded-xl hover:bg-blue-50 w-8 h-8 sm:w-10 sm:h-10 text-slate-500 transition-colors"
                >
                  <Icon size={16} strokeWidth={1.8} />
                </motion.button>
              ))}

              <div className="flex-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder={`Discuss with ${discussionInfo.participants.filter(p => !p.isStarter).map(p => p.name).join(', ') || 'participants'}...`}
                  className="w-full px-3 sm:px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>

              <motion.button
                onClick={send}
                whileHover={{ scale: input.trim() ? 1.1 : 1 }}
                whileTap={{ scale: input.trim() ? 0.95 : 1 }}
                className={`flex items-center justify-center rounded-xl w-8 h-8 sm:w-10 sm:h-10 transition-all ${
                  input.trim() 
                    ? 'bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-md shadow-blue-500/30' 
                    : 'bg-slate-200 text-slate-400'
                }`}
                disabled={!input.trim()}
              >
                <Send size={14} strokeWidth={2} />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DiscussionChatMain;