import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, Share2, Settings, Phone, Video, Info, Smile, Paperclip, 
  MoreHorizontal, CheckCheck, Sparkles, Reply, Copy, Trash2, Heart,
  Users, UserPlus, Crown, ArrowLeft, ChevronDown,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const DiscussionChatMain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedUsers = [] } = location.state || {};

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const messagesEndRef = useRef(null);
  const outerRef = useRef(null); // ← outer div scrolls

  const [discussionInfo] = useState({
    name: selectedUsers.length === 1 ? selectedUsers[0]?.name || "New Discussion" : "Group Discussion",
    avatar: selectedUsers.length === 1 ? "DM" : "GD",
    startedBy: "Shiv",
    participants: [
      { id: "current", name: "Shiv", avatar: "SH", color: "from-blue-400 to-indigo-500", isStarter: true, online: true },
      ...selectedUsers.map((userId) => {
        const userMap = {
          1: { id: 1, name: "Dipankar Porey", avatar: "DP", color: "from-pink-400 to-red-400", online: true },
          2: { id: 2, name: "Aarav Mehta",    avatar: "AM", color: "from-blue-400 to-indigo-500", online: true },
          3: { id: 3, name: "Sneha Rao",      avatar: "SR", color: "from-emerald-400 to-teal-500", online: false },
          4: { id: 4, name: "Rahul Sharma",   avatar: "RS", color: "from-purple-400 to-pink-400", online: true },
          5: { id: 5, name: "Priya Patel",    avatar: "PP", color: "from-orange-400 to-rose-400", online: false },
        };
        return userMap[userId] || { id: userId, name: `User ${userId}`, avatar: "U", color: "from-gray-400 to-gray-500", online: false };
      })
    ]
  });

  useEffect(() => {
    const starter = discussionInfo.participants.find(p => p.isStarter)?.name || "Shiv";
    const others = discussionInfo.participants.filter(p => !p.isStarter).map(p => p.name).join(", ");
    setMessages([
      { id: "sys-1", type: "system", text: `${starter} started a discussion` },
      { id: "sys-2", type: "system", text: others ? `👋 ${starter} invited ${others} to discuss` : `👋 ${starter} started a discussion` },
    ]);
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
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages(prev => [...prev, { id: Date.now(), from: "me", text: input.trim(), time: now, sender: "Shiv", senderAvatar: "SH" }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const others = discussionInfo.participants.filter(p => !p.isStarter);
      if (others.length) {
        const rp = others[Math.floor(Math.random() * others.length)];
        const replies = ["Interesting point!", "I agree with that", "Let me think about that", "Great discussion!"];
        const now2 = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setMessages(prev => [...prev, { id: Date.now() + 1, from: "them", text: replies[Math.floor(Math.random() * replies.length)], time: now2, sender: rp.name, senderAvatar: rp.avatar }]);
      }
    }, 2000);
  };

  const ParticipantAvatar = ({ participant, size = 36 }) => (
    <div className="relative flex-shrink-0">
      <div className={`flex items-center justify-center rounded-xl text-white font-bold bg-gradient-to-br ${participant.color}`}
        style={{ width: size, height: size, fontSize: size * 0.35 }}>
        {participant.avatar}
      </div>
      {participant.online && (
        <motion.span className="absolute rounded-full ring-2 ring-white bg-green-400"
          style={{ width: size * 0.25, height: size * 0.25, bottom: 0, right: 0 }}
          animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      )}
      {participant.isStarter && (
        <motion.div className="absolute -top-1 -right-1" animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
          <Crown size={size * 0.3} className="text-yellow-400" />
        </motion.div>
      )}
    </div>
  );

  return (
    <div
      className="lg:h-[calc(100dvh-100px)] h-[calc(100dvh-140px)]"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#fafcff" }}
    >
      {/* ✅ outer div scrolls — header scrolls away, input sticky bottom */}
      <div
        ref={outerRef}
        onScroll={handleScroll}
        className="h-full flex flex-col overflow-y-auto bg-white rounded-xl"
        style={{ border: "1px solid #dbeafe" }}
      >

        {/* ══════════ HEADER — scrolls away ══════════ */}
        <div style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "linear-gradient(to right, #eff6ff, #eef2ff)",
          borderBottom: "1px solid #dbeafe",
          padding: "10px 14px",
        }}>
          <motion.button whileHover={{ scale: 1.1, x: -2 }} whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb", background: "transparent", border: "none", cursor: "pointer", flexShrink: 0 }}>
            <ArrowLeft size={20} />
          </motion.button>

          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg,#1a3aad,#2563eb)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14, boxShadow: "0 4px 12px rgba(37,99,235,0.35)" }}>
              {discussionInfo.avatar}
            </div>
            <motion.span style={{ position: "absolute", bottom: -2, right: -2, width: 12, height: 12, borderRadius: "50%", background: "#22c55e", border: "2px solid white" }}
              animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {discussionInfo.name}
              </p>
              <Sparkles size={14} color="#2563eb" style={{ flexShrink: 0 }} />
            </div>
            <p style={{ margin: 0, fontSize: 11, color: "#64748b", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {discussionInfo.participants.length} participant{discussionInfo.participants.length > 1 ? "s" : ""} · Started by {discussionInfo.startedBy}
            </p>
          </div>

          <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb", background: "transparent", border: "none", cursor: "pointer" }}>
              <MoreHorizontal size={17} strokeWidth={1.8} />
            </motion.button>
          </div>
        </div>

        {/* ══════════ PARTICIPANTS PANEL ══════════ */}
        <AnimatePresence>
          {showParticipants && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              style={{ flexShrink: 0, borderBottom: "1px solid #dbeafe", background: "rgba(239,246,255,0.8)", overflow: "hidden" }}>
              <div style={{ padding: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>
                    Participants ({discussionInfo.participants.length})
                  </span>
                  <button style={{ fontSize: 11, color: "#2563eb", background: "none", border: "none", cursor: "pointer" }}>+ Add</button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 150, overflowY: "auto" }}>
                  {discussionInfo.participants.map(p => (
                    <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 10px", background: "#fff", borderRadius: 10, border: "1px solid #dbeafe" }}>
                      <ParticipantAvatar participant={p} size={28} />
                      <div>
                        <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#1e293b" }}>
                          {p.name} {p.isStarter && <span style={{ fontSize: 9, background: "#fef9c3", color: "#a16207", padding: "1px 5px", borderRadius: 4 }}>Starter</span>}
                        </p>
                        <p style={{ margin: 0, fontSize: 10, color: "#94a3b8" }}>{p.online ? "Online" : "Offline"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════════ MESSAGES — flex-1, no overflow (outer scrolls) ══════════ */}
        <div style={{
          flex: 1,
          padding: "14px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          background: "#fafcff",
          position: "relative",
        }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#2563eb", background: "#eff6ff", padding: "4px 14px", borderRadius: 999, border: "1px solid #bfdbfe" }}>
              {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>

          {messages.filter(m => m.type === "system").map(msg => (
            <motion.div key={msg.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: "5px 14px" }}>
                <p style={{ margin: 0, fontSize: 11, color: "#2563eb", fontWeight: 500 }}>{msg.text}</p>
              </div>
            </motion.div>
          ))}

          <AnimatePresence mode="popLayout">
            {messages.filter(m => m.type !== "system").map(msg => {
              const isMe = msg.from === "me";
              return (
                <motion.div key={msg.id}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  layout
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div style={{ display: "flex", gap: 2, marginBottom: 3, justifyContent: isMe ? "flex-end" : "flex-start" }}>
                    {(isMe ? [Trash2, Settings, Copy, Share2] : [Trash2, Reply, Copy, Heart, Share2]).map((Icon, i) => (
                      <motion.button key={i} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                        onClick={i === 0 ? () => setMessages(p => p.filter(m => m.id !== msg.id)) : undefined}
                        style={{ padding: 4, borderRadius: 7, background: "transparent", border: "none", cursor: "pointer", color: "#94a3b8" }}>
                        <Icon size={11} />
                      </motion.button>
                    ))}
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-end", gap: 8, flexDirection: isMe ? "row-reverse" : "row" }}>
                    {!isMe && (
                      <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#60a5fa,#818cf8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                        {msg.senderAvatar}
                      </div>
                    )}
                    <div style={{ display: "flex", flexDirection: "column", maxWidth: "72%", alignItems: isMe ? "flex-end" : "flex-start" }}>
                      {!isMe && <span style={{ fontSize: 10, color: "#2563eb", fontWeight: 600, marginBottom: 2, marginLeft: 4 }}>{msg.sender}</span>}
                      <motion.div whileHover={{ scale: 1.01 }}
                        style={{
                          padding: "9px 13px", fontSize: 13, lineHeight: 1.5,
                          borderRadius: 18,
                          borderBottomRightRadius: isMe ? 4 : 18,
                          borderBottomLeftRadius: isMe ? 18 : 4,
                          background: isMe ? "linear-gradient(135deg,#1a3aad,#2563eb)" : "#ffffff",
                          color: isMe ? "#fff" : "#334155",
                          border: isMe ? "none" : "1px solid #dbeafe",
                          boxShadow: isMe ? "0 4px 14px rgba(37,99,235,0.28)" : "0 2px 6px rgba(0,0,0,0.04)",
                          wordBreak: "break-word",
                        }}>
                        {msg.text}
                      </motion.div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3, fontSize: 10, color: "#94a3b8" }}>
                        <span>{msg.time}</span>
                        {isMe && <CheckCheck size={13} color={msg.read ? "#2563eb" : "#cbd5e1"} />}
                      </div>
                    </div>
                    {isMe && <div style={{ width: 32, flexShrink: 0 }} />}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          <AnimatePresence>
            {isTyping && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#60a5fa,#818cf8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>…</div>
                <div style={{ background: "#fff", padding: "10px 14px", borderRadius: 18, borderBottomLeftRadius: 4, border: "1px solid #dbeafe", display: "flex", gap: 4 }}>
                  {[0, 1, 2].map(i => (
                    <motion.span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#2563eb", display: "block" }}
                      animate={{ y: [0, -5, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }} />
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
                style={{
                  position: "sticky",
                  bottom: 65,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #1a3aad 0%, #2563eb 100%)",
                  boxShadow: "0 4px 16px rgba(37,99,235,0.45)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 40,
                }}
              >
                <ChevronDown size={18} color="white" />
              </motion.button>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* ══════════ INPUT BAR — sticky bottom-0 ══════════ */}
        <div style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 12px",
          paddingBottom: "max(10px, env(safe-area-inset-bottom))",
          background: "#ffffff",
          borderTop: "1px solid #e2e8f0",
          position: "sticky",
          bottom: 0,
          zIndex: 10,
        }}>
          {[Paperclip, Smile].map((Icon, i) => (
            <motion.button key={i} whileHover={{ scale: 1.1, rotate: i === 1 ? 15 : 0 }} whileTap={{ scale: 0.95 }}
              style={{ width: 38, height: 38, flexShrink: 0, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }}>
              <Icon size={18} strokeWidth={1.8} />
            </motion.button>
          ))}

          <input
            type="text" value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder={`Message ${discussionInfo.participants.filter(p => !p.isStarter).map(p => p.name).join(", ") || "participants"}…`}
            style={{
              flex: 1, minWidth: 0,
              padding: "9px 14px", borderRadius: 20,
              border: "1px solid #e2e8f0", background: "#f8fafc",
              fontSize: 13, color: "#334155", outline: "none", fontFamily: "inherit",
            }}
            onFocus={e => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "#fff"; }}
            onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
          />

          <motion.button onClick={send}
            whileHover={{ scale: input.trim() ? 1.1 : 1 }} whileTap={{ scale: input.trim() ? 0.95 : 1 }}
            disabled={!input.trim()}
            style={{
              flexShrink: 0, width: 40, height: 40, borderRadius: 12,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: input.trim() ? "linear-gradient(135deg,#1a3aad,#2563eb)" : "#e2e8f0",
              color: input.trim() ? "#fff" : "#94a3b8",
              border: "none", cursor: input.trim() ? "pointer" : "default",
              boxShadow: input.trim() ? "0 4px 12px rgba(37,99,235,0.35)" : "none",
              transition: "all 0.2s",
            }}>
            <Send size={15} strokeWidth={2} />
          </motion.button>
        </div>

      </div>
    </div>
  );
};

export default DiscussionChatMain;