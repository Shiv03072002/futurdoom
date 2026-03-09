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
  Users,
  UserPlus,
  Crown,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BLUE = "#2563eb";
const DARK_BLUE = "#1a3aad";

const GroupChat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedUsers = [] } = location.state || { selectedUsers: [] };
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const messagesEndRef = useRef(null);
  const outerRef = useRef(null); // ← outer div scrolls

  const [groupInfo, setGroupInfo] = useState({
    id: Date.now(),
    name: "New Group",
    avatar: "NG",
    createdBy: "Shiv",
    createdAt: new Date().toLocaleString(),
    members: [
      { id: "current", name: "Shiv", avatar: "SH", color: "from-blue-400 to-indigo-500", isCreator: true, online: true },
      ...selectedUsers.map((userId) => {
        const userMap = {
          1: { id: 1, name: "Dipankar Porey", avatar: "DP", color: "from-pink-400 to-red-400", online: true },
          2: { id: 2, name: "Aarav Mehta", avatar: "AM", color: "from-blue-400 to-indigo-500", online: true },
          3: { id: 3, name: "Sneha Rao", avatar: "SR", color: "from-emerald-400 to-teal-500", online: false },
          4: { id: 4, name: "Rahul Sharma", avatar: "RS", color: "from-purple-400 to-pink-400", online: true },
          5: { id: 5, name: "Priya Patel", avatar: "PP", color: "from-orange-400 to-rose-400", online: false },
          6: { id: 6, name: "Amit Kumar", avatar: "AK", color: "from-cyan-400 to-blue-400", online: true },
        };
        return userMap[userId] || { id: userId, name: `User ${userId}`, avatar: "U", color: "from-gray-400 to-gray-500", online: false };
      })
    ]
  });

  useEffect(() => {
    if (groupInfo.members.length > 0) {
      const creatorName = groupInfo.members.find(m => m.isCreator)?.name || "Shiv";
      const memberNames = groupInfo.members.filter(m => !m.isCreator).map(m => m.name).join(", ");
      setMessages([
        { id: "system-1", type: "system", text: `${creatorName} created the group`, time: "Just now" },
        { id: "welcome-1", type: "system", text: `👋 Welcome ${memberNames ? memberNames + " and " : ""}${creatorName}! Say hello to the group.`, time: "Just now" },
      ]);
    }
  }, []);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (outerRef.current) {
      outerRef.current.scrollTop = outerRef.current.scrollHeight;
    }
  }, [messages]);

  // Show/hide scroll button
  const handleScroll = () => {
    const el = outerRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setShowScrollBtn(distanceFromBottom > 100);
  };

  const scrollToBottom = () => {
    outerRef.current?.scrollTo({ top: outerRef.current.scrollHeight, behavior: "smooth" });
  };

  const send = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: Date.now(), from: "me", text: input.trim(),
      time: "Just now", read: false, sender: "Shiv", senderAvatar: "SH",
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const otherMembers = groupInfo.members.filter(m => !m.isCreator);
      if (otherMembers.length > 0) {
        const randomMember = otherMembers[Math.floor(Math.random() * otherMembers.length)];
        const replies = ["Great to be in this group!", "Thanks for adding me!", "Let's get started!", `Hey, ${randomMember.name} here! 👋`];
        setMessages((prev) => [...prev, {
          id: Date.now() + 1, from: "them",
          text: replies[Math.floor(Math.random() * replies.length)],
          time: "Just now", read: false,
          sender: randomMember.name, senderAvatar: randomMember.avatar,
        }]);
      }
    }, 2000);
  };

  const removeMsg = (id) => setMessages((prev) => prev.filter((m) => m.id !== id));

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 500, damping: 30 } },
  };

  const MemberAvatar = ({ member, size = 36, showStatus = true }) => (
    <div className="relative flex-shrink-0">
      <div
        className={`flex items-center justify-center rounded-xl text-white font-bold bg-gradient-to-br ${member.color}`}
        style={{ width: size, height: size, fontSize: size * 0.35,
          boxShadow: member.isCreator ? `0 4px 10px ${BLUE}` : "0 2px 8px rgba(0,0,0,0.1)" }}
      >
        {member.avatar}
      </div>
      {showStatus && member.online && (
        <motion.span className="absolute rounded-full ring-2 ring-white"
          style={{ width: size * 0.25, height: size * 0.25, background: "#22c55e", bottom: 0, right: 0 }}
          animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      {member.isCreator && (
        <motion.div className="absolute -top-1 -right-1"
          animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
          <Crown size={size * 0.3} className="text-yellow-400" />
        </motion.div>
      )}
    </div>
  );

  return (
    <div className="lg:h-[calc(100dvh-100px)] h-[calc(100dvh-140px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="h-full"
        style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
      >
        {/* ✅ outer div scrolls — header scrolls away, input sticky bottom */}
        <div
          ref={outerRef}
          onScroll={handleScroll}
          className="h-full flex flex-col overflow-y-auto bg-white rounded-xl border border-blue-50"
        >

          {/* Header — scrolls away naturally */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 px-2 xs:px-3 sm:px-4 md:px-5 py-1.5 xs:py-2 sm:py-2.5 md:py-3"
          >
            <motion.button
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="flex items-center justify-center rounded-xl hover:bg-white w-7 h-7 xs:w-8 xs:h-8 sm:w-8 sm:h-8 text-blue-600"
            >
              <ArrowLeft size={16} className="xs:size-[18px]" />
            </motion.button>

            <div className="relative flex-shrink-0">
              <div
                className="flex items-center justify-center rounded-xl text-white font-bold bg-gradient-to-r from-[#1a3aad] to-[#2563eb] 
                  w-9 h-9 xs:w-10 xs:h-10 sm:w-10 sm:h-10 md:w-11 md:h-11
                  text-xs xs:text-sm sm:text-sm md:text-base"
                style={{ boxShadow: "0 4px 10px rgba(37,99,235,0.3)" }}
              >
                {groupInfo.avatar}
              </div>
              <motion.span
                className="absolute -bottom-1 -right-1 w-2.5 h-2.5 xs:w-3 xs:h-3 bg-green-400 rounded-full ring-2 ring-white"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 sm:gap-2">
                <p className="text-xs xs:text-sm sm:text-sm md:text-base font-bold text-slate-800 truncate max-w-[120px] xs:max-w-[150px] sm:max-w-[180px] md:max-w-[250px] lg:max-w-full">
                  {groupInfo.name}
                </p>
                <Sparkles size={12} className="text-blue-500 flex-shrink-0 xs:size-[14px]" />
              </div>
              <div className="flex items-center gap-1 xs:gap-1.5 mt-0.5 xs:mt-1">
                <Users size={10} className="text-blue-500 xs:size-[12px]" />
                <p className="text-[10px] xs:text-xs text-slate-500 whitespace-nowrap">
                  {groupInfo.members.length} members
                </p>
                <span className="w-0.5 h-0.5 xs:w-1 xs:h-1 rounded-full bg-slate-300" />
                <p className="text-[10px] xs:text-xs text-slate-500 truncate hidden xs:block">
                  Created by {groupInfo.createdBy}
                </p>
                <p className="text-[10px] xs:text-xs text-slate-500 truncate block xs:hidden">
                  {groupInfo.createdBy.split(' ')[0]}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-0.5 xs:gap-1 sm:gap-1">
              {[{ Icon: MoreHorizontal, label: "More", showOnMobile: true }].map(({ Icon, label, action }) => (
                <motion.button
                  key={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={action}
                  className="flex items-center justify-center rounded-xl hover:bg-white w-7 h-7 xs:w-8 xs:h-8 sm:w-8 sm:h-8 md:w-9 md:h-9 text-blue-600 transition-all"
                >
                  <Icon size={14} className="xs:size-[15px] sm:size-[16px]" strokeWidth={1.8} />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Members Panel */}
          <AnimatePresence>
            {showMembers && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="flex-shrink-0 border-b border-blue-100 bg-blue-50/50 overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Users size={14} className="text-blue-600" />
                      Group Members ({groupInfo.members.length})
                    </h3>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="text-xs text-blue-600 hover:underline">
                      <UserPlus size={14} />
                    </motion.button>
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {groupInfo.members.map((member) => (
                      <motion.div key={member.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 p-2 rounded-lg bg-white border border-blue-100">
                        <MemberAvatar member={member} size={28} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-slate-700 flex items-center gap-1">
                            {member.name}
                            {member.isCreator && (
                              <span className="text-[8px] bg-yellow-100 text-yellow-600 px-1 py-0.5 rounded">Creator</span>
                            )}
                          </p>
                          <p className="text-[10px] text-slate-400">{member.online ? 'Online' : 'Offline'}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages — flex-1, no overflow (outer scrolls) */}
          <div className="flex-1 p-3 sm:p-5 space-y-4 relative" style={{ background: "#fafcff" }}>
            {messages.filter(m => m.type === 'system').map((msg) => (
              <motion.div key={msg.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center">
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                  <p className="text-xs text-blue-600 font-medium">{msg.text}</p>
                </div>
              </motion.div>
            ))}

            <AnimatePresence mode="popLayout">
              {messages.filter(m => m.type !== 'system').map((msg) => {
                const isMe = msg.from === "me";
                return (
                  <motion.div key={msg.id} variants={messageVariants} initial="hidden" animate="visible"
                    exit={{ opacity: 0, scale: 0.8 }} layout className="flex flex-col">
                    <div className={`flex items-center gap-1 mb-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                      {[
                        { Icon: Trash2, h: "hover:bg-red-50 hover:text-red-500", fn: () => removeMsg(msg.id) },
                        { Icon: isMe ? Settings : Reply, h: "hover:bg-blue-50 hover:text-blue-600", fn: () => {} },
                        { Icon: Copy, h: "hover:bg-blue-50 hover:text-blue-600", fn: () => {} },
                        ...(!isMe ? [{ Icon: Heart, h: "hover:bg-pink-50 hover:text-pink-500", fn: () => {} }] : []),
                        { Icon: Share2, h: "hover:bg-blue-50 hover:text-blue-600", fn: () => {} },
                      ].map(({ Icon, h, fn }, idx) => (
                        <motion.button key={idx} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                          onClick={fn} className={`p-1 rounded-lg text-slate-400 transition-colors ${h}`}>
                          <Icon size={12} />
                        </motion.button>
                      ))}
                    </div>

                    <div className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                      {!isMe && (
                        <div className="relative flex-shrink-0">
                          <div className="flex items-center justify-center rounded-xl text-white font-bold bg-gradient-to-br from-blue-400 to-indigo-500"
                            style={{ width: 32, height: 32, fontSize: 12 }}>
                            {msg.senderAvatar || 'U'}
                          </div>
                        </div>
                      )}

                      <div className={`flex flex-col max-w-[85%] sm:max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>
                        {!isMe && (
                          <span className="text-[10px] text-blue-600 font-medium mb-1 ml-1">{msg.sender || 'User'}</span>
                        )}
                        <motion.div whileHover={{ scale: 1.01 }}
                          className={`px-3 sm:px-4 py-2 text-xs sm:text-sm ${isMe
                            ? 'bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white rounded-2xl rounded-br-sm'
                            : 'bg-white text-slate-700 rounded-2xl rounded-bl-sm border border-blue-100'}`}
                          style={{ boxShadow: isMe ? '0 4px 15px rgba(37,99,235,0.3)' : '0 2px 8px rgba(0,0,0,0.03)' }}>
                          {msg.text}
                        </motion.div>
                        <div className={`flex items-center gap-1.5 mt-1 text-xs ${isMe ? 'justify-end' : 'justify-start'}`}>
                          <span className="text-slate-400">{msg.time}</span>
                          {isMe && <CheckCheck size={14} className={msg.read ? "text-blue-600" : "text-slate-300"} />}
                        </div>
                      </div>

                      {isMe && <div className="w-8" />}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            <AnimatePresence>
              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">...</div>
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm border border-blue-100 flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span key={i} className="w-1.5 h-1.5 bg-blue-600 rounded-full"
                        animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.75, repeat: Infinity, delay: i * 0.15 }} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Scroll to bottom button ── */}
            <AnimatePresence>
              {showScrollBtn && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.7, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.7, y: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onClick={scrollToBottom}
                  className="sticky bottom-20 left-1/2 -translate-x-1/2 flex items-center justify-center w-9 h-9 rounded-full z-10"
                  style={{
                    background: "linear-gradient(135deg, #1a3aad 0%, #2563eb 100%)",
                    boxShadow: "0 4px 16px rgba(37,99,235,0.45)",
                  }}
                >
                  <ChevronDown size={18} className="text-white" />
                </motion.button>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* Input bar — sticky bottom-0 */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex items-center gap-1 sm:gap-2 flex-shrink-0 px-3 sm:px-4 py-2 sm:py-3 border-t border-slate-200 bg-white sticky bottom-0"
          >
            {[Paperclip, Smile].map((Icon, i) => (
              <motion.button key={i} whileHover={{ scale: 1.1, rotate: i === 1 ? 15 : 0 }} whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center rounded-xl hover:bg-blue-50 w-8 h-8 sm:w-10 sm:h-10 text-slate-500 transition-colors">
                <Icon size={16} strokeWidth={1.8} />
              </motion.button>
            ))}

            <div className="flex-1">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder={`Message ${groupInfo.name}...`}
                className="w-full px-3 sm:px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>

            <motion.button onClick={send}
              whileHover={{ scale: input.trim() ? 1.1 : 1 }} whileTap={{ scale: input.trim() ? 0.95 : 1 }}
              className={`flex items-center justify-center rounded-xl w-8 h-8 sm:w-10 sm:h-10 transition-all ${
                input.trim() ? 'bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-md shadow-blue-500/30' : 'bg-slate-200 text-slate-400'
              }`}
              disabled={!input.trim()}>
              <Send size={14} strokeWidth={2} />
            </motion.button>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default GroupChat;