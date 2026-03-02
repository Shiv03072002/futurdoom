import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Compass } from "lucide-react";

const Chatbotmain = () => {
  const navigate = useNavigate();

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

  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1,
      },
    },
  };

  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-20, 20, -20],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const reverseFloatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [20, -20, 20],
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseAnimation = {
    initial: { scale: 1, opacity: 0.6 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const spinAnimation = {
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const waveAnimation = {
    animate: {
      rotate: [0, 20, -10, 0],
      transition: {
        duration: 1.6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const buttonHover = {
    scale: 1.02,
    y: -4,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  };

  const buttonTap = {
    scale: 0.98,
    y: 0,
  };

  return (
    <>
      <style>{`
        .bg-grid {
          background-image: 
            linear-gradient(rgba(37,99,235,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .header-grid {
          background-image: 
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 28px 28px;
        }
      `}</style>

      {/* Page Container */}
      <div className="relative w-full flex items-center justify-center overflow-hidden px-4 mt-6">

        {/* Animated Background Elements */}
        <motion.div
          className="absolute inset-0 bg-grid opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
        />

        {/* Floating Blobs */}
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 rounded-full bg-gradient-to-br from-blue-200/30 to-indigo-200/30 blur-3xl"
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-gradient-to-br from-blue-300/20 to-purple-200/20 blur-3xl"
          variants={reverseFloatingAnimation}
          initial="initial"
          animate="animate"
        />

        {/* Decorative Rings */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-blue-200/30 rounded-full"
          variants={spinAnimation}
          animate="animate"
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-blue-300/20 rounded-full"
          variants={spinAnimation}
          animate="animate"
          style={{ animationDirection: 'reverse' }}
        />

        {/* Main Card */}
        <motion.div
          className="relative z-10 w-full max-w-lg rounded-xl overflow-hidden backdrop-blur-sm bg-white border border-blue-100"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.2,
          }}
        >

          {/* Card Header Gradient with Grid Pattern */}
          <motion.div
            className="h-24 bg-gradient-to-br from-[#0f1f6e] via-[#1a3aad] to-[#2563eb] relative overflow-hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
          >
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 header-grid opacity-30" />
            
            {/* Decorative Circles */}
            <motion.div
              className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-blue-400/20"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            {/* Glowing Orb */}
            <motion.div
              className="absolute top-4 right-8 w-12 h-12 rounded-full bg-blue-300/20 blur-xl"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Welcome Badge */}
            <div className="absolute top-4 left-6 flex items-center gap-2">
              <motion.div
                className="w-1 h-1 rounded-full bg-blue-200"
                variants={pulseAnimation}
                initial="initial"
                animate="animate"
              />
              <motion.span 
                className="text-blue-200 text-[10px] font-medium tracking-widest uppercase"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Welcome
              </motion.span>
              <motion.div 
                className="w-4 h-[2px] bg-blue-300"
                animate={{ width: [16, 20, 16] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Card Content */}
          <motion.div
            className="px-8 py-10 flex flex-col items-center text-center relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >

            {/* Logo Mark */}
            <motion.div
              className="-mt-16 mb-6 relative"
              variants={logoVariants}
            >
              <motion.div
                className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1a3aad] to-[#2563eb] flex items-center justify-center shadow-xl shadow-blue-500/30 cursor-pointer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="text-white text-2xl font-black tracking-tight">fD</span>
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>

            {/* App Name */}
            <motion.h1
              className="text-5xl leading-none mb-2"
              variants={itemVariants}
            >
              <span className="text-slate-800 font-light">
                futur
              </span>

              <motion.span
                className="bg-gradient-to-r from-[#1a3aad] to-[#2563eb] bg-clip-text text-transparent inline-block font-bold"
                animate={{
                  textShadow: [
                    "0 0 8px rgba(37,99,235,0.3)",
                    "0 0 16px rgba(37,99,235,0.6)",
                    "0 0 8px rgba(37,99,235,0.3)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                DooM
              </motion.span>
            </motion.h1>

            {/* Tagline */}
            <motion.div
              className="flex items-center gap-2 mb-6"
              variants={itemVariants}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={14} className="text-blue-400" />
              </motion.div>
              <span className="text-xs text-slate-400 font-medium tracking-wide">Your gateway to the future</span>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={14} className="text-blue-400" />
              </motion.div>
            </motion.div>

            {/* Greeting Card */}
            <motion.div
              className="w-full mb-8 p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100"
              variants={itemVariants}
              whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(37,99,235,0.15)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <motion.span
                    className="relative flex h-2 w-2"
                    animate={{
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </motion.span>
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Welcome back</span>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Compass size={14} className="text-blue-400" />
                </motion.div>
              </div>

              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-2xl font-bold text-slate-800">Hey, Shiv</span>
                <motion.span
                  className="text-2xl inline-block"
                  variants={waveAnimation}
                  animate="animate"
                  style={{ transformOrigin: "70% 80%" }}
                >
                  👋
                </motion.span>
              </div>
              <p className="text-sm text-slate-500">
                Nice to meet you. Ready to explore?
              </p>
            </motion.div>

            {/* Primary CTA */}
            <motion.button
              onClick={() => navigate("/chat")}
              className="w-full py-4 rounded-xl text-sm font-semibold text-white tracking-wide mb-3 flex items-center justify-center gap-2 group relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #0f1f6e, #1a3aad, #2563eb)",
                backgroundSize: "200% 200%",
              }}
              variants={itemVariants}
              whileHover={buttonHover}
              whileTap={buttonTap}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{
                backgroundPosition: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1,
                }}
              />
              <span>Explore Here</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={16} />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Chatbotmain;