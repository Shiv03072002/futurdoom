import React from 'react';
import { motion } from 'framer-motion';
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

  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
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
        className="w-full max-w-xl"
      >
        <motion.div 
          variants={cardVariants}
          className="bg-white rounded-xl border border-blue-50 w-full overflow-hidden"
        >
          {/* Card Header */}
          <motion.div 
            variants={headerVariants}
            className="bg-gradient-to-br from-[#0f1f6e] via-[#1a3aad] to-[#2563eb] p-8 relative overflow-hidden"
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
                className="text-4xl font-black text-white tracking-tight"
              >
                Futur
                <motion.span 
                  className="text-blue-300"
                  animate={pulseAnimation}
                >
                  DooM
                </motion.span>
              </motion.h1>

              <motion.p 
                variants={subtitleVariants}
                className="text-blue-100/70 text-sm mt-2 leading-relaxed"
              >
                Your gateway to amazing possibilities.
              </motion.p>
            </div>
          </motion.div>

          {/* Card Body */}
          <motion.div 
            variants={sectionTitleVariants}
            className="p-6 flex flex-col gap-3"
          >
            <motion.p 
              className="text-xs font-semibold text-blue-500 tracking-[0.2em] uppercase mb-1"
              animate={{ letterSpacing: ['0.2em', '0.25em', '0.2em'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Get Started
            </motion.p>

            {/* About Us Link */}
            <motion.a
              href="/about"
              custom={0}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors duration-200"
                  whileHover={{ rotate: 5 }}
                >
                  <Info size={16} className="text-blue-600 group-hover:text-white transition-colors duration-200" />
                </motion.div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">About Us</p>
                  <p className="text-xs text-slate-400">Learn about our story</p>
                </div>
              </div>
              <motion.div
                animate={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                <ArrowRight size={15} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all duration-200" />
              </motion.div>
            </motion.a>

            {/* Let's Go Link */}
            <motion.a
              href="/searchpeople"
              custom={1}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#1a3aad] to-[#2563eb] shadow-md shadow-blue-300/30 hover:shadow-lg hover:shadow-blue-400/40 hover:-translate-y-0.5 transition-all duration-200"
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
                <ArrowRight size={15} className="text-white group-hover:translate-x-0.5 transition-transform duration-200" />
              </motion.div>
            </motion.a>

            {/* Contact Us Link */}
            <motion.a
              href="/contact"
              custom={2}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors duration-200"
                  whileHover={{ rotate: 5 }}
                >
                  <Mail size={16} className="text-blue-600 group-hover:text-white transition-colors duration-200" />
                </motion.div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Contact Us</p>
                  <p className="text-xs text-slate-400">Get in touch</p>
                </div>
              </div>
              <motion.div
                animate={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                <ArrowRight size={15} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all duration-200" />
              </motion.div>
            </motion.a>
          </motion.div>

          {/* Footer */}
          <motion.div 
            variants={footerVariants}
            className="px-6 pb-6"
          >
            <p className="text-xs text-slate-300 text-center">© 2025 futurdoom · All rights reserved</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;