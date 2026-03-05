import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Info, ArrowRight, Mail, Sparkles } from 'lucide-react';

const Home = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
        delay: 0.2,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.3,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.4,
      },
    },
  };

  const taglineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.6,
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.55,
        duration: 0.6,
      },
    },
  };

  const sectionTitleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6,
        duration: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: 0.7 + i * 0.15,
      },
    }),
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.2,
        duration: 0.4,
      },
    },
  };

  // Floating animation for decorative elements
  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center p-6 relative">
      {/* FIX 1: Added pointer-events-none to background elements */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-200/20 blur-3xl pointer-events-none"
        animate={floatAnimation}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-blue-300/20 blur-3xl pointer-events-none"
        animate={floatAnimation}
        transition={{ delay: 1 }}
      />

      {/* FIX 2: Added relative and z-10 to main container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg mx-auto relative z-10"
      >
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-xl border border-blue-50 w-full overflow-hidden "
        >
          {/* Card Header */}
          <motion.div
            variants={headerVariants}
            className="bg-gradient-to-br from-[#0f1f6e] via-[#1a3aad] to-[#2563eb] p-6 relative overflow-hidden"
          >
            {/* Animated decorative elements - FIX 3: Added pointer-events-none to all decorative elements */}
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-0 left-1/2 w-24 h-24 rounded-full bg-blue-400/10 pointer-events-none"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "32px 32px"
              }}
            />

            <div className="relative">
              <motion.div
                variants={badgeVariants}
                className="flex items-center gap-2 mb-3"
              >
                <motion.div
                  className="w-4 h-[2px] bg-blue-300"
                  animate={{ width: [16, 20, 16] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.span
                  className="text-blue-200 text-xs tracking-[0.2em] uppercase font-medium"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Est. 2026
                </motion.span>
              </motion.div>

              <motion.h1
                variants={titleVariants}
                className="text-3xl text-white tracking-tight"
              >
                <span className="font-light">
                  futur
                </span>

                <motion.span
                  className="text-blue-300 font-extrabold"
                  animate={pulseAnimation}
                >
                  DooM
                </motion.span>
              </motion.h1>

              {/* New tagline */}
         <motion.div
  variants={taglineVariants}
  className="mt-3"
>
  <div className="flex items-center gap-1 flex-wrap">
    <span className="text-white/90 text-xs font-medium">A new space where</span>
    
    {/* Intelligence with typing animation */}
    <div className="flex items-center">
      <motion.span
        animate={{
          width: ["0%", "100%", "100%", "0%"],
        }}
        transition={{
          duration: 4,
          times: [0, 0.3, 0.7, 1],
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeInOut",
        }}
        className="text-xs font-bold overflow-hidden whitespace-nowrap inline-block"
        style={{
          background: "linear-gradient(90deg, #93c5fd, #ffffff, #bfdbfe)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Intelligence
      </motion.span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="w-0.5 h-3 bg-white ml-0.5"
      />
    </div>
    
    {/* meets with pulse */}
    <motion.span 
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="text-blue-200/70 text-[10px] font-medium italic"
    >
      meets
    </motion.span>
    
    {/* Community with same typing animation as Intelligence */}
    <div className="flex items-center">
      <motion.span
        animate={{
          width: ["0%", "100%", "100%", "0%"],
        }}
        transition={{
          duration: 4,
          times: [0, 0.3, 0.7, 1],
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeInOut",
        }}
        className="text-xs font-bold overflow-hidden whitespace-nowrap inline-block"
        style={{
          background: "linear-gradient(90deg, #60a5fa, #bfdbfe, #ffffff, #93c5fd)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Community
      </motion.span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="w-0.5 h-3 bg-white ml-0.5"
      />
    </div>
  </div>
</motion.div>

              <motion.p
                variants={subtitleVariants}
                className="text-blue-100/70 text-[10px] mt-2 leading-relaxed"
              >
                Enjoy a new experience with—<span className="text-blue-200 font-semibold">futurDooM</span>
              </motion.p>
            </div>
          </motion.div>

          {/* Card Body */}
          <motion.div
            variants={sectionTitleVariants}
            className="p-5 flex flex-col gap-4"
          >
            <motion.p
              className="text-xs font-semibold text-blue-500 tracking-[0.2em] uppercase text-center"
              animate={{ letterSpacing: ['0.2em', '0.25em', '0.2em'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Get Started
            </motion.p>

            {/* Main CTA - Let's Go (centered, not full width) */}
            <motion.div
              custom={1}
              variants={itemVariants}
              className="flex justify-center"
            >
              <Link
                to="/share"
                className="block group w-auto cursor-pointer"
                onClick={(e) => {
                  // Optional: Add console log for debugging
                  // console.log('CTA clicked');
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between gap-6 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#1a3aad] to-[#2563eb] shadow-md shadow-blue-300/30 hover:shadow-lg hover:shadow-blue-400/40 transition-all duration-200"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center">
                      <Sparkles size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">Let's Go</p>
                      <p className="text-xs text-blue-200">Start your journey</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    <ArrowRight size={15} className="text-white" />
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>

            {/* Two cards grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-1">
  {/* About Us Card */}
  <motion.div
    custom={2}
    variants={itemVariants}
    className="w-full"
  >
    <Link
      to="/about"
      className="block group cursor-pointer"
      onClick={(e) => {
        // Optional: Add console log for debugging
        // console.log('About clicked');
      }}
    >
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-between gap-1.5 sm:gap-3 px-2 sm:px-4 py-4 sm:py-4 rounded-xl bg-white border border-blue-200 hover:shadow-md hover:border-blue-200 transition-all duration-200"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0 flex-1">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors duration-200 flex-shrink-0">
            <Info size={12} className="text-blue-600 group-hover:text-white transition-colors duration-200 sm:w-3.5 sm:h-3.5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-slate-800 text-[11px] sm:text-sm leading-tight sm:leading-normal line-clamp-1">
              About Us
            </p>
            <p className="text-[10px] sm:text-xs text-slate-400 leading-tight line-clamp-1">
              Learn our story
            </p>
          </div>
        </div>
        <motion.div
          animate={{ x: 0 }}
          whileHover={{ x: 3 }}
          className="flex-shrink-0"
        >
          <ArrowRight size={12} className="text-slate-400 group-hover:text-blue-500 sm:w-3.5 sm:h-3.5" />
        </motion.div>
      </motion.div>
    </Link>
  </motion.div>

  {/* Contact Us Card */}
  <motion.div
    custom={3}
    variants={itemVariants}
    className="w-full"
  >
    <Link
      to="/contact"
      className="block group cursor-pointer"
      onClick={(e) => {
        // Optional: Add console log for debugging
        // console.log('Contact clicked');
      }}
    >
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-between gap-1.5 sm:gap-3 px-2 sm:px-4 py-4 sm:py-4 rounded-xl bg-white border border-blue-200  hover:shadow-md hover:border-blue-200 transition-all duration-200"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0 flex-1">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors duration-200 flex-shrink-0">
            <Mail size={12} className="text-blue-600 group-hover:text-white transition-colors duration-200 sm:w-3.5 sm:h-3.5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-slate-800 text-[11px] sm:text-sm leading-tight sm:leading-normal line-clamp-1">
              Contact Us
            </p>
            <p className="text-[10px] sm:text-xs text-slate-400 leading-tight line-clamp-1">
              Get in touch
            </p>
          </div>
        </div>
        <motion.div
          animate={{ x: 0 }}
          whileHover={{ x: 3 }}
          className="flex-shrink-0"
        >
          <ArrowRight size={12} className="text-slate-400 group-hover:text-blue-500 sm:w-3.5 sm:h-3.5" />
        </motion.div>
      </motion.div>
    </Link>
  </motion.div>
</div>
          </motion.div>

          {/* Footer */}
          <motion.div
            variants={footerVariants}
            className="px-5 pt-4 pb-4 border-t border-blue-100/60"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <Link
                to="/terms"
                className="text-xs text-slate-400 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
              >
                Terms
              </Link>
              <span className="text-slate-300 text-xs">•</span>
              <Link
                to="/privacy"
                className="text-xs text-slate-400 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
              >
                Privacy
              </Link>
              <span className="text-slate-300 text-xs">•</span>
              <Link
                to="/disclaimer"
                className="text-xs text-slate-400 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
              >
                Disclaimer
              </Link>
            </div>
            <p className="text-xs text-slate-300 text-center">© 2026 futurdoom · All rights reserved</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;