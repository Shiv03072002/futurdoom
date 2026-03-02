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
    <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center p-6">

      {/* Animated background elements (kept minimal) */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-200/20 blur-3xl"
        animate={floatAnimation}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-blue-300/20 blur-3xl"
        animate={floatAnimation}
        transition={{ delay: 1 }}
      />

      {/* Single Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg mx-auto"
      >
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-xl border border-blue-50 w-full overflow-hidden shadow-lg"
        >
          {/* Card Header */}
          <motion.div
            variants={headerVariants}
            className="bg-gradient-to-br from-[#0f1f6e] via-[#1a3aad] to-[#2563eb] p-6 relative overflow-hidden"
          >
            {/* Animated decorative elements */}
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5"
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
              className="absolute bottom-0 left-1/2 w-24 h-24 rounded-full bg-blue-400/10"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="absolute inset-0 opacity-10"
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
                  Est. 2025
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
                className="mt-3 space-y-1"
              >
                <div className="flex items-baseline gap-1 flex-wrap">
                  <span className="text-white/90 text-xs font-medium">A new space where</span>
                  <motion.span
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      opacity: [0.9, 1, 0.9]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="text-xs font-bold"
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
                  <span className="text-blue-200/70 text-[10px] font-medium italic">meets</span>
                  <motion.span
                    animate={{
                      backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
                      opacity: [0.9, 1, 0.9]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="text-xs font-bold"
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
                to="/searchpeople"
                className="block group w-auto"
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between gap-6 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#1a3aad] to-[#2563eb] shadow-md shadow-blue-300/30 hover:shadow-lg hover:shadow-blue-400/40 transition-all duration-200"
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
            <div className="grid grid-cols-2 gap-3 mt-1">
              {/* About Us Card */}
              <motion.div
                custom={2}
                variants={itemVariants}
              >
                <Link
                  to="/about"
                  className="block group"
                >
                  <motion.div
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <motion.div
                        className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors duration-200"
                        whileHover={{ rotate: 5 }}
                      >
                        <Info size={14} className="text-blue-600 group-hover:text-white transition-colors duration-200" />
                      </motion.div>
                    </div>
                    <p className="font-semibold text-slate-800 text-xs text-center mb-0.5">About Us</p>
                    <p className="text-[10px] text-slate-400 text-center mb-2">Learn our story</p>
                    <div className="flex justify-end mt-auto">
                      <ArrowRight size={12} className="text-slate-300 group-hover:text-blue-500 transition-colors duration-200" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Contact Us Card */}
              <motion.div
                custom={3}
                variants={itemVariants}
              >
                <Link
                  to="/contact"
                  className="block group"
                >
                  <motion.div
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <motion.div
                        className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors duration-200"
                        whileHover={{ rotate: 5 }}
                      >
                        <Mail size={14} className="text-blue-600 group-hover:text-white transition-colors duration-200" />
                      </motion.div>
                    </div>
                    <p className="font-semibold text-slate-800 text-xs text-center mb-0.5">Contact Us</p>
                    <p className="text-[10px] text-slate-400 text-center mb-2">Get in touch</p>
                    <div className="flex justify-end mt-auto">
                      <ArrowRight size={12} className="text-slate-300 group-hover:text-blue-500 transition-colors duration-200" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            variants={footerVariants}
            className="px-5 pb-4"
          >
            <p className="text-xs text-slate-300 text-center">© 2025 futurdoom · All rights reserved</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;