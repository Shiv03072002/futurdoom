import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Facebook, Instagram, Twitter, Linkedin,
  MessageCircle, MoreHorizontal, Sparkles, Heart, X,
  UserPlus, UserCheck, Home, Calendar, User, Mail, Phone, Briefcase, Send, Smile, Paperclip, Star
} from "lucide-react";

// Inline Chat Panel Component
const InlineChatPanel = ({ recipient, onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, from: "them", text: "Hey! How are you doing?", time: "10:30 AM" },
    { id: 2, from: "me", text: "I'm great, thanks! How about you?", time: "10:31 AM" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now(),
      from: "me",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }]);
    setInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="overflow-hidden"
    >
      <div className="border-t border-blue-100 bg-gradient-to-b from-slate-50 to-white">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                {recipient?.name?.charAt(0) || "U"}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full ring-1 ring-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800">{recipient?.name || "User"}</p>
              <p className="text-[9px] text-green-500 font-medium">● Online</p>
            </div>
          </div>
          <button onClick={onClose} className="w-6 h-6 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
            <X size={13} />
          </button>
        </div>
        <div className="h-52 overflow-y-auto px-4 py-3 flex flex-col gap-2 scroll-smooth">
          {messages.map((msg) => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] flex flex-col gap-0.5 ${msg.from === "me" ? "items-end" : "items-start"}`}>
                <div className={`px-3 py-1.5 rounded-2xl text-xs leading-relaxed
                  ${msg.from === "me"
                    ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-br-sm"
                    : "bg-white border border-slate-200 text-slate-700 rounded-bl-sm shadow-sm"}`}>
                  {msg.text}
                </div>
                <span className="text-[8px] text-slate-400 px-1">{msg.time}</span>
              </div>
            </motion.div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="px-3 pb-3 pt-2 border-t border-slate-100 bg-white">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
            <button className="text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"><Smile size={14} /></button>
            <input type="text" value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 text-xs bg-transparent outline-none text-slate-700 placeholder:text-slate-400 min-w-0" />
            <button className="text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"><Paperclip size={13} /></button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={sendMessage} disabled={!input.trim()}
              className="w-6 h-6 flex items-center justify-center rounded-lg bg-blue-500 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors flex-shrink-0">
              <Send size={10} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProfileCard = ({ user = {}, interested, setInterested, interestedInMe = [], iAmInterestedIn = [],isChatOpen,setIsChatOpen   }) => {
  const [showInterestedList, setShowInterestedList] = useState(false);
  const [showInterestingList, setShowInterestingList] = useState(false);
  const [showChat, setShowChat] = useState(isChatOpen);
  const [showMenu, setShowMenu] = useState(false);
  

  // Sync local state with parent state
  useEffect(() => {
    setShowChat(isChatOpen);
  }, [isChatOpen]);

  const handleChatToggle = () => {
    const newState = !showChat;
    setShowChat(newState);
    setIsChatOpen(newState); // Update parent state
  };

  const avatarVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 260, damping: 20, delay: 0.2 } },
  };
  const coverVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };
  const socialIconHover = { scale: 1.1, transition: { type: "spring", stiffness: 400, damping: 17 } };
  const buttonHover = { scale: 1.02, y: -2, transition: { type: "spring", stiffness: 400, damping: 17 } };
  const buttonTap = { scale: 0.98, y: 0 };

  const handleInterestedClick = () => { setShowInterestedList(!showInterestedList); setShowInterestingList(false); };
  const handleInterestingClick = () => { setShowInterestingList(!showInterestingList); setShowInterestedList(false); };

  const sampleUser = {
    name: "Shiv Kumar",
    role: "Senior Product Designer",
    email: "shiv.kumar@email.com",
    initials: "SK",
    color: "from-blue-500 to-indigo-600",
    homeAddress: "42 Park Avenue, New York, NY 10022",
    currentLocation: "123 Market Street, San Francisco, CA 94105",
    gender: "Male",
    birthday: "15.05.1995",
    phone: "+1 (555) 123-4567",
    occupation: "Product Designer",
    bio: "Passionate product designer with 5+ years of experience creating meaningful digital experiences. Love solving complex problems and making things simple and beautiful.",
    posts: 128,
    followers: 4820,
    following: 312,
    ...user
  };

  return (
    <motion.div
      className="bg-white rounded-xl border border-blue-50 overflow-hidden"
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } }}
      initial="hidden" animate="visible"
    >
      {/* Cover */}
      <motion.div className="relative h-36 bg-gradient-to-br from-[#0f1f6e] via-[#1a3aad] to-[#2563eb] overflow-hidden" variants={coverVariants}>
        <motion.div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }}
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
        <motion.div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10"
          animate={{ scale: [1, 1.2, 1], x: [0, -20, 0], y: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-blue-400/20"
          animate={{ scale: [1, 1.3, 1], x: [0, 20, 0], y: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
      </motion.div>

      <div className="px-6 pb-6">
        {/* Avatar row */}
        <div className="flex items-end justify-between -mt-10 mb-4">
  <div className="flex items-end gap-3">
    <motion.div className="relative group" variants={avatarVariants}>
      <motion.div
        className={`w-20 h-20 rounded-full bg-gradient-to-br ${sampleUser.color} ring-4 ring-white shadow-xl flex items-center justify-center text-3xl select-none text-white font-bold`}
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {sampleUser.initials || sampleUser.name?.charAt(0) || "U"}
      </motion.div>
      
      {/* Online dot */}
      <motion.span
        className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full ring-2 ring-white"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>

    {/* Online text on the right side of avatar */}
    <div className="flex flex-col mb-2">
      <div className="flex items-center gap-1.5">
        
        <div className="flex items-center gap-1">
         
          <span className="text-xs font-semibold text-green-600">Online</span>
        </div>
      </div>
     
    </div>
  </div>

  <div className="flex gap-2 items-center mt-10">
    <motion.button 
      onClick={handleChatToggle} 
      whileHover={buttonHover} 
      whileTap={buttonTap}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-colors
        ${showChat ? "bg-blue-50 border-blue-300 text-blue-600" : "border-slate-200 text-slate-700 hover:bg-blue-50"}`}
    >
      <MessageCircle size={12} />
      {showChat ? "Hide Chat" : "Message"}
    </motion.button>
    <motion.button onClick={() => setShowMenu(!showMenu)} whileHover={buttonHover} whileTap={buttonTap}
      className="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-blue-50 transition-colors relative">
      <MoreHorizontal size={15} />
      <AnimatePresence>
        {showMenu && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }} className="absolute right-0 top-full mt-2 w-40 bg-white rounded-lg border border-gray-200 z-10 overflow-hidden">
            <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100">Edit Profile</button>
            <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">Share Profile</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  </div>
</div>

        {/* ── 1. Name + Role ── */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-800">{sampleUser.name}</h2>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-[10px] font-semibold">
              <Star size={8} fill="white" />
              {sampleUser.role}
            </span>
          </div>
        </div>

        {/* ── 2. Email, Phone, Occupation ── */}
        <div className="bg-slate-50 rounded-xl p-3 mb-4">
  <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
    {/* Email */}
    <div className="col-span-2 md:col-span-1">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
          <Mail size={12} className="text-blue-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Email</p>
          <p className="text-xs text-slate-700 font-medium truncate">{sampleUser.email}</p>
        </div>
        <button className="text-[9px] text-blue-600 font-semibold px-1.5 py-0.5 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors flex-shrink-0">Copy</button>
      </div>
    </div>

    {/* Phone */}
    <div className="col-span-2 md:col-span-1">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
          <Phone size={12} className="text-green-500" />
        </div>
        <div className="flex-1">
          <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Phone</p>
          <p className="text-xs text-slate-700 font-medium">{sampleUser.phone}</p>
        </div>
        <span className="text-[9px] text-green-600 font-semibold px-1.5 py-0.5 bg-green-50 rounded-md flex-shrink-0">✓ Verified</span>
      </div>
    </div>

    {/* Gender */}
    <div className="col-span-1 md:col-span-1">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
          <User size={12} className="text-purple-500" />
        </div>
        <div>
          <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Gender</p>
          <p className="text-xs text-slate-700 font-medium">{sampleUser.gender}</p>
        </div>
      </div>
    </div>

    {/* Date of Birth */}
    <div className="col-span-1 md:col-span-1">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
          <Calendar size={12} className="text-amber-500" />
        </div>
        <div>
          <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Birthday</p>
          <p className="text-xs text-slate-700 font-medium">{sampleUser.birthday}</p>
          <p className="text-[7px] text-slate-400">Age: 29</p>
        </div>
      </div>
    </div>
  </div>
</div>

        {/* ── 3. About Me ── */}
        <motion.div className="relative group mb-4" whileHover={{ scale: 1.01 }}>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur" />
          <div className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-5 rounded-xl border border-blue-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                <Sparkles size={12} className="text-white" />
              </div>
              <p className="text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 uppercase tracking-wider">About Me</p>
              <div className="h-px flex-1 bg-gradient-to-r from-blue-200 to-transparent" />
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{sampleUser.bio}</p>
          </div>
        </motion.div>


         <div className="flex items-center gap-2 mb-4">
          {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
            <motion.a key={i} href="#" whileHover={socialIconHover} whileTap={{ scale: 0.95 }}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-blue-500 hover:border-blue-300 transition-all duration-150">
              <Icon size={14} />
            </motion.a>
          ))}
        </div>

        {/* ── 4. Stats ── */}
        <div className="flex mb-4 bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
          <div className="flex-1 text-center py-3 border-r border-slate-200">
            <p className="text-xl font-bold text-slate-800">{sampleUser.posts}</p>
            <p className="text-xs text-slate-400">Posts</p>
          </div>
          <div className="flex-1 text-center py-3 border-r border-slate-200 cursor-pointer hover:bg-white transition-colors" onClick={handleInterestedClick}>
            <p className="text-xl font-bold text-slate-800">{sampleUser.followers?.toLocaleString()}</p>
            <p className="text-xs text-slate-400 flex items-center justify-center gap-1"><Heart size={10} className="text-pink-500" />Interested</p>
          </div>
          <div className="flex-1 text-center py-3 cursor-pointer hover:bg-white transition-colors" onClick={handleInterestingClick}>
            <p className="text-xl font-bold text-slate-800">{sampleUser.following}</p>
            <p className="text-xs text-slate-400 flex items-center justify-center gap-1"><UserPlus size={10} className="text-blue-500" />Interesting</p>
          </div>
        </div>

        {/* ── 5. Action Buttons ── */}
        <div className="flex gap-3 mb-4">
          <motion.button onClick={handleInterestedClick} whileHover={buttonHover} whileTap={buttonTap}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200
              ${showInterestedList ? "bg-pink-50 text-pink-600 border border-pink-200" : "bg-gradient-to-r from-pink-400 to-rose-500 text-white shadow-md shadow-pink-300/30"}`}>
            <Heart size={14} fill={showInterestedList ? "currentColor" : "none"} />
            Interested
            {interestedInMe.length > 0 && <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded-full text-[10px]">{interestedInMe.length}</span>}
          </motion.button>
          <motion.button onClick={handleInterestingClick} whileHover={buttonHover} whileTap={buttonTap}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200
              ${showInterestingList ? "bg-blue-50 text-blue-600 border border-blue-200" : "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-300/30"}`}>
            <UserPlus size={14} />
            Interesting
            {iAmInterestedIn.length > 0 && <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded-full text-[10px]">{iAmInterestedIn.length}</span>}
          </motion.button>
        </div>

        {/* Interested In Me List */}
        <AnimatePresence>
          {showInterestedList && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="mb-4 border border-pink-100 rounded-xl overflow-hidden bg-white shadow-lg">
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-3 border-b border-pink-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart size={14} className="text-pink-500" fill="currentColor" />
                  <span className="text-xs font-semibold text-slate-600">Interested in you ({interestedInMe.length})</span>
                </div>
                <button onClick={() => setShowInterestedList(false)} className="text-slate-400 hover:text-slate-600"><X size={14} /></button>
              </div>
              <div className="max-h-60 overflow-y-auto p-2">
                {interestedInMe.length > 0 ? interestedInMe.map(u => (
                  <div key={u.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-pink-50 transition-all">
                    <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-white" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">{u.name}</p>
                      <p className="text-[10px] text-slate-400">@{u.username}</p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-6">
                    <Heart size={24} className="text-pink-200 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">No one has shown interest yet</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* I'm Interested In List */}
        <AnimatePresence>
          {showInterestingList && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="mb-4 border border-blue-100 rounded-xl overflow-hidden bg-white shadow-lg">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 border-b border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck size={14} className="text-blue-500" />
                  <span className="text-xs font-semibold text-slate-600">You're interested in ({iAmInterestedIn.length})</span>
                </div>
                <button onClick={() => setShowInterestingList(false)} className="text-slate-400 hover:text-slate-600"><X size={14} /></button>
              </div>
              <div className="max-h-60 overflow-y-auto p-2">
                {iAmInterestedIn.length > 0 ? iAmInterestedIn.map(u => (
                  <div key={u.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-all">
                    <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-white" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">{u.name}</p>
                      <p className="text-[10px] text-slate-400">@{u.username}</p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-6">
                    <UserPlus size={24} className="text-blue-200 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">You haven't shown interest in anyone yet</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 6. Addresses ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <motion.div whileHover={{ y: -2, scale: 1.01 }} className="bg-gradient-to-br from-white to-blue-50/30 border border-blue-100 rounded-xl p-4 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-200">
                <Home size={14} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[8px] text-blue-400 uppercase tracking-wider font-semibold mb-1">Home Address</p>
                <p className="text-sm font-medium text-slate-700">{sampleUser.homeAddress}</p>
              </div>
            </div>
          </motion.div>
          <motion.div whileHover={{ y: -2, scale: 1.01 }} className="bg-gradient-to-br from-white to-purple-50/30 border border-purple-100 rounded-xl p-4 hover:shadow-lg hover:shadow-purple-100/50 transition-all duration-300">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md shadow-purple-200">
                <MapPin size={14} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[8px] text-purple-400 uppercase tracking-wider font-semibold mb-1">Current Location</p>
                <p className="text-sm font-medium text-slate-700">{sampleUser.currentLocation}</p>
              </div>
            </div>
          </motion.div>
        </div>

       

        
       
      </div>

      {/* Inline Chat Panel */}
      <AnimatePresence>
        {showChat && (
          <InlineChatPanel
            recipient={{ name: sampleUser.name, email: sampleUser.email }}
            onClose={() => setShowChat(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProfileCard;