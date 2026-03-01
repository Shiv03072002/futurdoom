import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin, Facebook, Instagram, Twitter, Linkedin,
  Accessibility, Headphones, UserPlus, MessageCircle,
  MoreHorizontal, Sparkles, Check, Settings
} from "lucide-react";

const ProfileHeader = ({ isLoggedInUser = false }) => {
  const [following, setFollowing] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

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

  return (
    <motion.div 
      className="bg-white rounded-2xl border border-blue-50 overflow-hidden"
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
              className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1a3aad] to-[#2563eb] ring-4 ring-white shadow-xl flex items-center justify-center text-3xl select-none text-white font-bold"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              SK
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

          {/* Action buttons - Different for logged in user vs other profiles */}
          <motion.div 
            className="flex gap-2 items-center"
            variants={itemVariants}
          >
            {!isLoggedInUser ? (
              // For other users - Show Follow/Message buttons
              <>
                <motion.button
                  onClick={() => setFollowing(v => !v)}
                  variants={buttonHover}
                  whileHover="hover"
                  whileTap={buttonTap}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200
                    ${following
                      ? "bg-slate-100 text-slate-600 border border-slate-200"
                      : "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-md shadow-blue-300/30"
                    }`}
                >
                  <motion.div
                    animate={following ? { rotate: 360 } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {following ? <Check size={12} /> : <UserPlus size={12} />}
                  </motion.div>
                  {following ? "Following" : "Follow"}
                </motion.button>
                
                <motion.button
                  variants={buttonHover}
                  whileHover="hover"
                  whileTap={buttonTap}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-blue-50 transition-colors"
                >
                  <MessageCircle size={12} />
                  Message
                </motion.button>
              </>
            ) : (
              // For logged in user - Show Edit Profile/Settings
              <>
                <motion.button
                  variants={buttonHover}
                  whileHover="hover"
                  whileTap={buttonTap}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-md shadow-blue-300/30"
                >
                  <Settings size={12} />
                  Edit Profile
                </motion.button>
              </>
            )}
            
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
          variants={itemVariants}
        >
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-slate-800">Shiv Kumar</h2>
            <motion.span 
              className="text-xs bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"
              animate={{
                boxShadow: ["0 0 0 0 rgba(37,99,235,0.4)", "0 0 0 4px rgba(37,99,235,0)", "0 0 0 0 rgba(37,99,235,0.4)"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles size={10} />
              Pro
            </motion.span>
          </div>
          <p className="text-xs text-slate-400 mb-2">@shivkumar</p>
          <motion.div 
            className="flex items-center gap-1 text-slate-400 mb-3"
            whileHover={{ x: 5 }}
          >
            <MapPin size={11} />
            <span className="text-xs">San Francisco, CA</span>
          </motion.div>
          <motion.p 
            className="text-sm text-slate-600 leading-relaxed bg-blue-50/50 p-3 rounded-xl border border-blue-100"
            whileHover={{ scale: 1.01 }}
          >
            Hey 👋✨ Welcome to your digital space — express yourself freely, no judgment here 🎤😂☕
          </motion.p>
        </motion.div>

        {/* Social icons */}
        <motion.div 
          className="flex items-center gap-2"
          variants={itemVariants}
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
          {[Accessibility, Headphones].map((Icon, i) => (
            <motion.button 
              key={i}
              variants={socialIconHover}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 text-blue-400 hover:bg-blue-100 transition-all duration-150"
            >
              <Icon size={14} />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;