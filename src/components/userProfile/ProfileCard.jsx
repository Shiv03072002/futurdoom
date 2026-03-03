import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin, Facebook, Instagram, Twitter, Linkedin,
  Accessibility, Headphones, MessageCircle,
  MoreHorizontal, Sparkles, Heart, X, UserPlus, UserCheck,Info,Home,Calendar,User,Mail,Phone,Briefcase
} from "lucide-react";

const ProfileCard = ({ user, interested, setInterested, interestedInMe = [], iAmInterestedIn = [] }) => {
  const [showInterestedList, setShowInterestedList] = useState(false);
  const [showInterestingList, setShowInterestingList] = useState(false);

  // Animation variants
  const avatarVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2,
      },
    },
  };

  const coverVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const socialIconHover = {
    scale: 1.1,
    transition: { type: "spring", stiffness: 400, damping: 17 },
  };

  const buttonHover = {
    scale: 1.02,
    y: -2,
    transition: { type: "spring", stiffness: 400, damping: 17 },
  };

  const buttonTap = {
    scale: 0.98,
    y: 0,
  };

  const handleInterestedClick = () => {
    setShowInterestedList(!showInterestedList);
    setShowInterestingList(false);
  };

  const handleInterestingClick = () => {
    setShowInterestingList(!showInterestingList);
    setShowInterestedList(false);
  };

  return (
    <motion.div 
      className="bg-white rounded-xl border border-blue-50 overflow-hidden"
      variants={{
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
      }}
    >
      {/* Cover with animation */}
      <motion.div 
        className="relative h-36 bg-gradient-to-br from-[#0f1f6e] via-[#1a3aad] to-[#2563eb] overflow-hidden"
        variants={coverVariants}
      >
        {/* Animated overlay pattern */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "30px 30px"
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Floating circles */}
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
        <motion.div 
          className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-blue-400/20"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <div className="px-6 pb-6">
        {/* Avatar row */}
        <div className="flex items-end justify-between -mt-10 mb-4">
          <motion.div 
            className="relative"
            variants={avatarVariants}
          >
            <motion.div 
              className={`w-20 h-20 rounded-full bg-gradient-to-br ${user.color} ring-4 ring-white shadow-xl flex items-center justify-center text-3xl select-none text-white font-bold`}
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {user.initials}
            </motion.div>
            <motion.span 
              className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full ring-2 ring-white"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Action buttons */}
          <motion.div 
            className="flex gap-2 items-center"
            variants={{
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
            }}
          >
            
            
            <motion.button
              variants={buttonHover}
              whileHover="hover"
              whileTap={buttonTap}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-blue-50 transition-colors"
            >
              <MessageCircle size={12} />
              Message
            </motion.button>
            
            <motion.button
              variants={buttonHover}
              whileHover="hover"
              whileTap={buttonTap}
              className="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-blue-50 transition-colors"
            >
              <MoreHorizontal size={15} />
            </motion.button>
          </motion.div>
        </div>

        {/* Name & bio */}
      
<motion.div 
  className="mb-4"
  variants={{
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
  }}
>
  {/* Name and Email Row */}
  <div className="mb-4">
    <h2 className="text-xl font-bold text-slate-800">{user.name || "Shiv Kumar"}</h2>
    <div className="flex items-center gap-2 mt-1">
      <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
        <Mail size={10} className="text-blue-500" />
      </div>
      <p className="text-xs text-slate-500">{user.email || "shiv.kumar@email.com"}</p>
      <button className="text-[9px] text-blue-600 hover:text-blue-700 font-medium px-1.5 py-0.5 bg-blue-50 rounded">
        Copy
      </button>
    </div>
  </div>

  {/* Address Section - Side by Side */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
    {/* Home Address */}
    <motion.div 
      whileHover={{ y: -2, scale: 1.01 }}
      className="bg-gradient-to-br from-white to-blue-50/30 border border-blue-100 rounded-xl p-4 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-200">
          <Home size={14} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="text-[8px] text-blue-400 uppercase tracking-wider font-semibold mb-1">Home Address</p>
          <p className="text-sm font-medium text-slate-700">{user.homeAddress || "42 Park Avenue, New York, NY 10022"}</p>
          
        </div>
      </div>
    </motion.div>

    {/* Current Location */}
    <motion.div 
      whileHover={{ y: -2, scale: 1.01 }}
      className="bg-gradient-to-br from-white to-purple-50/30 border border-purple-100 rounded-xl p-4 hover:shadow-lg hover:shadow-purple-100/50 transition-all duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md shadow-purple-200">
          <MapPin size={14} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="text-[8px] text-purple-400 uppercase tracking-wider font-semibold mb-1">Current Location</p>
          <p className="text-sm font-medium text-slate-700">{user.currentLocation || "123 Market Street, San Francisco, CA 94105"}</p>
          
        </div>
      </div>
    </motion.div>
  </div>

  {/* Personal Details Grid - 4 columns on larger screens */}
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
    {/* Gender */}
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-white border border-slate-100 rounded-xl p-3 hover:border-blue-200 transition-all duration-200"
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center mb-2">
          <User size={14} className="text-blue-600" />
        </div>
        <p className="text-[9px] text-slate-400 uppercase tracking-wider mb-1">Gender</p>
        <p className="text-xs font-semibold text-slate-700">{user.gender || "Male"}</p>
      </div>
    </motion.div>

    {/* Date of Birth */}
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-white border border-slate-100 rounded-xl p-3 hover:border-purple-200 transition-all duration-200"
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center mb-2">
          <Calendar size={14} className="text-purple-600" />
        </div>
        <p className="text-[9px] text-slate-400 uppercase tracking-wider mb-1">Birthday</p>
        <p className="text-xs font-semibold text-slate-700">{user.birthday || "15.05.1995"}</p>
        <p className="text-[8px] text-slate-400 mt-1">Age: 29 years</p>
      </div>
    </motion.div>

    {/* Phone */}
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-white border border-slate-100 rounded-xl p-3 hover:border-green-200 transition-all duration-200"
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center mb-2">
          <Phone size={14} className="text-green-600" />
        </div>
        <p className="text-[9px] text-slate-400 uppercase tracking-wider mb-1">Phone</p>
        <p className="text-xs font-semibold text-slate-700">{user.phone || "+1 (555) 123-4567"}</p>
        <span className="text-[8px] text-green-600 mt-1">Verified</span>
      </div>
    </motion.div>

    {/* Occupation */}
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-white border border-slate-100 rounded-xl p-3 hover:border-orange-200 transition-all duration-200"
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center mb-2">
          <Briefcase size={14} className="text-orange-600" />
        </div>
        <p className="text-[9px] text-slate-400 uppercase tracking-wider mb-1">Occupation</p>
        <p className="text-xs font-semibold text-slate-700">{user.occupation || "Product Designer"}</p>
        <p className="text-[8px] text-slate-400 mt-1">at TechCorp Inc.</p>
      </div>
    </motion.div>
  </div>

  {/* Bio Section with Enhanced Design */}
  <motion.div 
    className="relative group"
    whileHover={{ scale: 1.01 }}
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur" />
    <div className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-5 rounded-xl border border-blue-100">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
          <Sparkles size={12} className="text-white" />
        </div>
        <p className="text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 uppercase tracking-wider">
          About Me
        </p>
        <div className="h-px flex-1 bg-gradient-to-r from-blue-200 to-transparent" />
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">
        {user.bio || "Passionate product designer with 5+ years of experience creating meaningful digital experiences. Love solving complex problems and making things simple and beautiful."}
      </p>
      
    </div>
  </motion.div>
</motion.div>
        {/* Stats */}
        <motion.div 
          className="flex gap-8 mb-4"
          variants={{
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
          }}
        >
          <div className="text-center">
            <p className="text-xl font-bold text-slate-800">{user.posts}</p>
            <p className="text-xs text-slate-400">Posts</p>
          </div>
          <div 
            className="text-center cursor-pointer"
            onClick={handleInterestedClick}
          >
            <p className="text-xl font-bold text-slate-800">{user.followers.toLocaleString()}</p>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <Heart size={10} className="text-pink-500" />
              Interested
            </p>
          </div>
          <div 
            className="text-center cursor-pointer"
            onClick={handleInterestingClick}
          >
            <p className="text-xl font-bold text-slate-800">{user.following}</p>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <UserPlus size={10} className="text-blue-500" />
              Interesting
            </p>
          </div>
        </motion.div>

        {/* Action Buttons Row - Sidebar style */}
        <motion.div 
          className="flex gap-3 mb-4"
          variants={{
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
          }}
        >
          {/* Interested Button - Shows who are interested in user */}
          <motion.button
            onClick={handleInterestedClick}
            whileHover={buttonHover}
            whileTap={buttonTap}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200
              ${showInterestedList 
                ? "bg-pink-50 text-pink-600 border border-pink-200" 
                : "bg-gradient-to-r from-pink-400 to-rose-500 text-white shadow-md shadow-pink-300/30 hover:shadow-lg hover:shadow-pink-400/40"
              }`}
          >
            <Heart size={14} fill={showInterestedList ? "currentColor" : "none"} />
            Interested
            {interestedInMe.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded-full text-[10px]">
                {interestedInMe.length}
              </span>
            )}
          </motion.button>

          {/* Interesting Button - Shows who user is interested in */}
          <motion.button
            onClick={handleInterestingClick}
            whileHover={buttonHover}
            whileTap={buttonTap}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200
              ${showInterestingList 
                ? "bg-blue-50 text-blue-600 border border-blue-200" 
                : "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-300/30 hover:shadow-lg hover:shadow-blue-400/40"
              }`}
          >
            <UserPlus size={14} />
            Interesting
            {iAmInterestedIn.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded-full text-[10px]">
                {iAmInterestedIn.length}
              </span>
            )}
          </motion.button>
        </motion.div>

        {/* Interested In Me List - People interested in user's profile */}
        {showInterestedList && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 border border-pink-100 rounded-xl overflow-hidden bg-white shadow-lg"
          >
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-3 border-b border-pink-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart size={14} className="text-pink-500" fill="currentColor" />
                  <span className="text-xs font-semibold text-slate-600">
                    Interested in you ({interestedInMe.length})
                  </span>
                </div>
                <button 
                  onClick={() => setShowInterestedList(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto p-2">
              {interestedInMe.length > 0 ? (
                interestedInMe.map((interestedUser) => (
                  <motion.div
                    key={interestedUser.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-pink-50 transition-all duration-200 group"
                  >
                    <div className="relative">
                      <img
                        src={interestedUser.avatar}
                        alt={interestedUser.name}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full ring-1 ring-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="text-sm font-medium text-slate-800 truncate">{interestedUser.name}</p>
                        {interestedUser.isPro && (
                          <Sparkles size={10} className="text-blue-500" />
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400">@{interestedUser.username}</p>
                    </div>
                   
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-6">
                  <Heart size={24} className="text-pink-200 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">No one has shown interest yet</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* I'm Interested In List - People user is interested in */}
        {showInterestingList && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 border border-blue-100 rounded-xl overflow-hidden bg-white shadow-lg"
          >
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 border-b border-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck size={14} className="text-blue-500" />
                  <span className="text-xs font-semibold text-slate-600">
                    You're interested in ({iAmInterestedIn.length})
                  </span>
                </div>
                <button 
                  onClick={() => setShowInterestingList(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto p-2">
              {iAmInterestedIn.length > 0 ? (
                iAmInterestedIn.map((interestingUser) => (
                  <motion.div
                    key={interestingUser.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200 group"
                  >
                    <div className="relative">
                      <img
                        src={interestingUser.avatar}
                        alt={interestingUser.name}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full ring-1 ring-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="text-sm font-medium text-slate-800 truncate">{interestingUser.name}</p>
                        {interestingUser.isPro && (
                          <Sparkles size={10} className="text-blue-500" />
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400">@{interestingUser.username}</p>
                    </div>
                   
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-6">
                  <UserPlus size={24} className="text-blue-200 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">You haven't shown interest in anyone yet</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Social icons */}
        <motion.div 
          className="flex items-center gap-2"
          variants={{
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
          }}
        >
          {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
            <motion.a 
              key={i} 
              href="#"
              variants={socialIconHover}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-blue-500 hover:border-blue-300 transition-all duration-150"
            >
              <Icon size={14} />
            </motion.a>
          ))}
          <div className="h-4 w-px bg-slate-100 mx-1" />
          
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;