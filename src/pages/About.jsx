import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Sparkles,
  Quote,
  Bot,
  Mail,
  Linkedin,
  Twitter,
  Github,
  MapPin,
  Calendar,
  Award,
  Rocket,
  Target,
  Globe,
  MessageCircle,
  Star,
} from "lucide-react";

const About = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
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

  const buttonHover = {
    scale: 1.1,
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

  const floatAnimation = {
    y: [0, -5, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="min-h-screen  flex items-start justify-center ">
      <motion.div 
        className="w-full max-w-4xl space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Platform card */}
        <motion.div
          className="bg-white rounded-xl  border border-blue-50 overflow-hidden"
          variants={itemVariants}
        >
          {/* Header with gradient */}
          <div className="bg-gradient-to-br from-[#0f1f6e] via-[#1a3aad] to-[#2563eb] p-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
            <div className="absolute bottom-0 left-1/2 w-24 h-24 rounded-full bg-blue-400/10" />
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "32px 32px"
              }}
            />
            
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-[2px] bg-blue-300" />
                <span className="text-blue-200 text-xs tracking-[0.2em] uppercase font-medium">Our Story</span>
              </div>
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center"
                  animate={pulseAnimation}
                >
                  <Heart size={18} className="text-white" />
                </motion.div>
                <h2 className="text-xl font-bold text-white">About futurDooM</h2>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 text-center">
            <motion.div 
              className="flex items-center justify-center gap-3 mb-4"
              variants={itemVariants}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Bot size={32} className="text-blue-600" />
              </motion.div>
              <h1 className="text-3xl font-black tracking-tight">
                <span className="text-slate-800">futur</span>
                <span className="bg-gradient-to-r from-[#1a3aad] to-[#2563eb] bg-clip-text text-transparent">DooM</span>
              </h1>
              <motion.div
                animate={floatAnimation}
              >
                <Sparkles size={20} className="text-yellow-500" />
              </motion.div>
            </motion.div>

            <motion.p
              className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto"
              variants={itemVariants}
            >
              A platform where emotions meet AI. Express your feelings through AI 
              and share experiences openly. Let your emotions flow with artificial intelligence.
            </motion.p>

            {/* Feature badges */}
            <motion.div 
              className="flex flex-wrap justify-center gap-2 mt-5"
              variants={itemVariants}
            >
              {["AI-Powered", "Emotional Intelligence", "Safe Space", "24/7 Available"].map((feature, i) => (
                <span 
                  key={i}
                  className="text-xs px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200"
                >
                  {feature}
                </span>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="flex justify-center gap-8 mt-6 pt-5 border-t border-blue-100"
              variants={itemVariants}
            >
              {[
                { icon: Rocket, label: "Founded", value: "2025" },
                { icon: Target, label: "Mission", value: "AI for All" },
                { icon: Globe, label: "Users", value: "10K+" },
                { icon: MessageCircle, label: "Chats", value: "50K+" },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  className="text-center"
                  whileHover={{ y: -3 }}
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center mx-auto mb-2 border border-blue-200">
                    <stat.icon size={16} className="text-blue-600" />
                  </div>
                  <p className="text-sm font-bold text-slate-800">{stat.value}</p>
                  <p className="text-[10px] text-slate-400">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Founder card - FIXED AVATAR POSITIONING */}
        <motion.div
          className="bg-white rounded-xl  border border-blue-50 overflow-hidden relative"
          variants={itemVariants}
        >
          {/* Cover with gradient */}
          <div className="h-24 bg-gradient-to-br from-[#0f1f6e] via-[#1a3aad] to-[#2563eb] relative overflow-hidden">
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "radial-gradient(circle at 20% 30%, white 2px, transparent 2px)",
                backgroundSize: "20px 20px"
              }}
            />
            <motion.div 
              className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, -20, 0],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </div>

          {/* Avatar - FIXED: Positioned absolutely to ensure visibility */}
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 z-20"
            style={{ top: "80px" }}
            variants={avatarVariants}
          >
            <motion.img
              src="https://i.pravatar.cc/100?img=1"
              alt="Dipankar Porey"
              className="w-24 h-24 rounded-2xl ring-4 ring-white shadow-xl object-cover"
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: "spring", stiffness: 400 }}
            />
            <motion.div 
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full ring-2 ring-white flex items-center justify-center"
              animate={pulseAnimation}
            >
              <span className="text-white text-[10px]">✓</span>
            </motion.div>
          </motion.div>

          {/* Content with proper padding to account for avatar */}
          <div className="pt-16 px-6 pb-6" style={{ marginTop: "40px" }}>
            {/* Name + badge */}
            <motion.div 
              className="flex items-center justify-center gap-2 mb-2 flex-wrap"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold text-slate-800">
                Dipankar Porey
              </h3>
              <motion.span
                className="text-xs px-3 py-1 rounded-full font-medium text-white bg-gradient-to-r from-yellow-500 to-orange-500 shadow-sm flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
                animate={pulseAnimation}
              >
                <Star size={10} />
                Founder & CEO
              </motion.span>
            </motion.div>

            {/* Meta */}
            <motion.div 
              className="flex items-center justify-center gap-3 mb-4"
              variants={itemVariants}
            >
              <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                <MapPin size={11} className="text-blue-500" />
                <span>Kolkata, India</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                <Calendar size={11} className="text-blue-500" />
                <span>Est. 2025</span>
              </div>
            </motion.div>

            {/* Quote */}
            <motion.div
              className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-r-xl p-4 mb-4"
              variants={itemVariants}
              whileHover={{ x: 5 }}
            >
              <div className="flex items-start gap-3">
                <Quote size={18} className="text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium italic text-slate-700">
                    "For those we never met!"
                  </p>
                  <p className="text-xs text-slate-400 mt-1">— Vision statement</p>
                </div>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.p
              className="text-sm text-slate-500 leading-relaxed mb-5 text-center"
              variants={itemVariants}
            >
              Visionary entrepreneur on a mission to bridge the gap between
              human emotions and artificial intelligence. Creating meaningful 
              AI interactions that feel personal and authentic.
            </motion.p>

            {/* Footer row */}
            <motion.div 
              className="flex items-center justify-between pt-4 border-t border-blue-100"
              variants={itemVariants}
            >
              <div className="flex gap-2">
                {[Mail, Linkedin, Twitter, Github].map((Icon, i) => (
                  <motion.button
                    key={i}
                    className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-blue-200 text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                    variants={buttonHover}
                    whileHover="hover"
                    whileTap={buttonTap}
                  >
                    <Icon size={15} />
                  </motion.button>
                ))}
              </div>
              
              <motion.div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200"
                whileHover={{ scale: 1.05, x: -3 }}
              >
                <Award size={12} className="text-yellow-600" />
                <span className="text-yellow-700">AI Innovator 2025</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        
      </motion.div>
    </div>
  );
};

export default About;