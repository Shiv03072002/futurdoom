import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, MessageCircle, MoreHorizontal, Sparkles, Heart, X,
  UserPlus, UserCheck, Home, Calendar, User, Mail, Phone,
  Send, Smile, Paperclip, Star, Settings
} from "lucide-react";

const ProfileCard = ({ 
  user = {}, 
  interested, 
  setInterested, 
  interestedInMe = [], 
  iAmInterestedIn = [],
  isLoggedInUser = true
}) => {
  const [showInterestedList, setShowInterestedList] = useState(false);
  const [showInterestingList, setShowInterestingList] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const socialLinks = [
    { name: "Instagram", href: "https://instagram.com", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/330px-Instagram_logo_2022.svg.png" },
    { name: "Facebook", href: "https://facebook.com", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/240px-2023_Facebook_icon.svg.png" },
    { name: "X (Twitter)", href: "https://twitter.com", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/X_%28formerly_Twitter%29_logo_late_2025.svg/330px-X_%28formerly_Twitter%29_logo_late_2025.svg.png" },
    { name: "LinkedIn", href: "https://linkedin.com", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" },
    { name: "GitHub", href: "https://github.com", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  ];

  const avatarVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 260, damping: 20, delay: 0.2 } },
  };
  const coverVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };
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
    bio: "Hey 👋✨ Welcome to your digital space — express yourself freely, no judgment here 🎤😂☕",
    posts: 128,
    followers: 4820,
    following: 312,
    location: "San Francisco, CA",
    ...user
  };

  return (
    <motion.div
      className="bg-white rounded-xl border border-blue-50 overflow-hidden"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
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
              <motion.span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full ring-2 ring-white"
                animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
            </motion.div>
            <div className="flex flex-col mb-2">
              <span className="text-xs font-semibold text-green-600">Online</span>
            </div>
          </div>

          {/* Edit Profile + More — no Message button */}
          <div className="flex gap-2 items-center mt-10">
            <motion.button whileHover={buttonHover} whileTap={buttonTap}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-md shadow-blue-300/30">
              <Settings size={12} />
              Edit Profile
            </motion.button>
            <div className="relative">
              <motion.button onClick={() => setShowMenu(!showMenu)} whileHover={buttonHover} whileTap={buttonTap}
                className="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-blue-50 transition-colors">
                <MoreHorizontal size={15} />
              </motion.button>
              <AnimatePresence>
                {showMenu && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }} className="absolute right-0 top-full mt-2 w-40 bg-white rounded-lg border border-gray-200 z-10 overflow-hidden shadow-lg">
                    <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100">Settings</button>
                    <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">Share Profile</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* TWO COLUMN: Left = Name/Location/Role/Socials | Right = Stats/Buttons */}
        <div className="flex items-start gap-4 mb-4">

          {/* LEFT */}
          <div className="w-1/2 min-w-0 flex flex-col gap-1.5">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{sampleUser.name}</h2>
            <motion.div className="flex items-center gap-1 text-slate-400" whileHover={{ x: 5 }}>
              <MapPin size={11} />
              <span className="text-xs">{sampleUser.location}</span>
            </motion.div>
            <motion.span
              className="inline-flex items-center gap-1.5 mt-1 mb-1 px-3 py-1 rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-medium w-fit"
              animate={{ boxShadow: ["0 0 0 0 rgba(37,99,235,0.4)", "0 0 0 4px rgba(37,99,235,0)", "0 0 0 0 rgba(37,99,235,0.4)"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles size={10} />{sampleUser.role}
            </motion.span>
            <div className="flex items-center gap-0.5 mt-1">
              {socialLinks.map((social, i) => (
                <motion.a key={i} href={social.href} target="_blank" rel="noopener noreferrer" title={social.name}
                  whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}
                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-blue-50 transition-all duration-150">
                  <img src={social.img} alt={social.name} className="w-4 h-4 object-contain" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-1/2 flex flex-col gap-2">
            {/* Stats */}
            <motion.div className="flex bg-slate-50 rounded-xl overflow-hidden border border-slate-100" variants={itemVariants}>
              <div className="flex-1 text-center py-2 border-r border-slate-200">
                <p className="text-base font-bold text-slate-800">{sampleUser.posts}</p>
                <p className="text-[10px] text-slate-400">Posts</p>
              </div>
              <div className="flex-1 text-center py-2 border-r border-slate-200 cursor-pointer hover:bg-white transition-colors" onClick={handleInterestedClick}>
                <p className="text-base font-bold text-slate-800">{sampleUser.followers?.toLocaleString()}</p>
                <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                  <Heart size={9} className="text-pink-500" /> Interested
                </p>
              </div>
              <div className="flex-1 text-center py-2 cursor-pointer hover:bg-white transition-colors" onClick={handleInterestingClick}>
                <p className="text-base font-bold text-slate-800">{sampleUser.following}</p>
                <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                  <UserPlus size={9} className="text-blue-500" /> Interesting
                </p>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div className="flex gap-2" variants={itemVariants}>
              <motion.button onClick={handleInterestedClick} whileHover={buttonHover} whileTap={buttonTap}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-semibold transition-all duration-200
                  ${showInterestedList ? "bg-pink-50 text-pink-600 border border-pink-200" : "bg-gradient-to-r from-pink-400 to-rose-500 text-white shadow-md shadow-pink-300/30"}`}>
                <Heart size={12} fill={showInterestedList ? "currentColor" : "none"} />
                Interested
                {interestedInMe.length > 0 && <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded-full text-[9px]">{interestedInMe.length}</span>}
              </motion.button>
              <motion.button onClick={handleInterestingClick} whileHover={buttonHover} whileTap={buttonTap}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-semibold transition-all duration-200
                  ${showInterestingList ? "bg-blue-50 text-blue-600 border border-blue-200" : "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-300/30"}`}>
                <UserPlus size={12} />
                Interesting
                {iAmInterestedIn.length > 0 && <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded-full text-[9px]">{iAmInterestedIn.length}</span>}
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* About Me */}
        <motion.div className="relative group mb-4" whileHover={{ scale: 1.01 }} variants={itemVariants}>
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

        {/* Contact grid */}
        <motion.div className="bg-slate-50 rounded-xl p-3 mb-4" variants={itemVariants}>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0"><Mail size={12} className="text-blue-500" /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Email</p>
                  <p className="text-xs text-slate-700 font-medium truncate">{sampleUser.email}</p>
                </div>
                <button className="text-[9px] text-blue-600 font-semibold px-1.5 py-0.5 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors flex-shrink-0">Copy</button>
              </div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0"><Phone size={12} className="text-green-500" /></div>
                <div className="flex-1">
                  <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Phone</p>
                  <p className="text-xs text-slate-700 font-medium">{sampleUser.phone}</p>
                </div>
                <span className="text-[9px] text-green-600 font-semibold px-1.5 py-0.5 bg-green-50 rounded-md flex-shrink-0">✓ Verified</span>
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0"><User size={12} className="text-purple-500" /></div>
                <div>
                  <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Gender</p>
                  <p className="text-xs text-slate-700 font-medium">{sampleUser.gender}</p>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0"><Calendar size={12} className="text-amber-500" /></div>
                <div>
                  <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Birthday</p>
                  <p className="text-xs text-slate-700 font-medium">{sampleUser.birthday}</p>
                  <p className="text-[7px] text-slate-400">Age: 29</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interested / Interesting dropdowns */}
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

        {/* Addresses */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4" variants={itemVariants}>
          <motion.div whileHover={{ y: -2, scale: 1.01 }}
            className="bg-gradient-to-br from-white to-blue-50/30 border border-blue-100 rounded-xl p-4 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300">
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
          <motion.div whileHover={{ y: -2, scale: 1.01 }}
            className="bg-gradient-to-br from-white to-purple-50/30 border border-purple-100 rounded-xl p-4 hover:shadow-lg hover:shadow-purple-100/50 transition-all duration-300">
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
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;