import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Sparkles, ArrowRight, Chrome, Shield } from 'lucide-react';

const LoginPage = () => {
  const [emailHover, setEmailHover] = useState(false);
  const [googleHover, setGoogleHover] = useState(false);

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
        stiffness: 200,
        damping: 20,
      },
    },
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
    <div className="min-h-screen flex  justify-center items-center p-5  relative overflow-hidden">
      {/* Background decorative elements */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[10%] right-[5%] w-[600px] h-[400px] rounded-full z-0"
      />
      
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] rounded-full  z-0"
      />


      {/* Main Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-xl relative z-10"
      >
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl border border-blue-100 overflow-hidden backdrop-blur-sm"
        >
          {/* Header with gradient */}
          <div className="bg-gradient-to-br from-[#0f1f6e] via-[#1a3aad] to-[#2563eb] p-12 pb-8 relative overflow-hidden">
            {/* Decorative elements */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-10 -right-10 w-[200px] h-[200px] rounded-full bg-white/10"
            />
            
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -10, 0],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-12 -left-8 w-[150px] h-[150px] rounded-full bg-blue-400/20"
            />

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-15" style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "32px 32px"
            }} />

            {/* Content */}
            <div className="relative z-10">
             

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-['Syne'] font-black text-4xl md:text-5xl text-white leading-tight mb-3"
              >
                Welcome to{' '}
                <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  futurDooM
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-base text-blue-100 leading-relaxed max-w-xs"
              >
                Log in & explore a new adventure with futurDooM
              </motion.p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Description */}
           
            {/* Google Login Button */}
            <motion.div
              variants={itemVariants}
              onHoverStart={() => setGoogleHover(true)}
              onHoverEnd={() => setGoogleHover(false)}
              className="mb-6"
            >
              <motion.button
                variants={buttonHover}
                whileHover="hover"
                whileTap={buttonTap}
                className={`w-full py-4 px-5 rounded-full relative overflow-hidden transition-all duration-300 ${
                  googleHover 
                    ? 'bg-[#1a3aad] shadow-[0_15px_30px_-8px_rgba(37,99,235,0.5)]' 
                    : 'bg-[#2563eb] shadow-[0_10px_25px_-5px_rgba(37,99,235,0.4)]'
                }`}
              >
                {/* Shimmer effect */}
                {googleHover && (
                  <motion.div
                    className="absolute top-0 bottom-0 w-[100px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ left: '-100px' }}
                    animate={{ left: '110%' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                )}

                <div className="flex items-center justify-center gap-3">
                  <Chrome size={20} className="text-white" />
                  <span className="text-base font-semibold text-white tracking-wide">
                    Continue with Google
                  </span>
                </div>
              </motion.button>
            </motion.div>

            {/* OR Divider */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 mb-6"
            >
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                or
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </motion.div>

            {/* Email Login Button */}
            <motion.div
              variants={itemVariants}
              onHoverStart={() => setEmailHover(true)}
              onHoverEnd={() => setEmailHover(false)}
            >
              <Link to="/login/email" className="block">
                <motion.button
                  variants={buttonHover}
                  whileHover="hover"
                  whileTap={buttonTap}
                  className={`w-full py-4 px-5 rounded-full border-2 transition-all duration-300 relative overflow-hidden ${
                    emailHover 
                      ? 'bg-blue-50 border-blue-600' 
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    <Mail size={20} className={emailHover ? 'text-blue-600' : 'text-slate-400'} />
                    <span className={`text-base font-semibold ${
                      emailHover ? 'text-blue-600' : 'text-slate-700'
                    }`}>
                      Continue with email
                    </span>
                    <ArrowRight size={18} className={emailHover ? 'text-blue-600' : 'text-slate-300'} />
                  </div>
                </motion.button>
              </Link>
            </motion.div>

            {/* Footer Links */}
            <motion.div
              variants={itemVariants}
              className="mt-8 text-center"
            >
              <p className="text-xs text-slate-400 leading-relaxed">
                By continuing, you agree to our{' '}
                <Link to="/terms" className="text-blue-600 font-medium hover:underline">
                  Terms
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-blue-600 font-medium hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </motion.div>
          </div>

          {/* Footer bar */}
          <motion.div
            variants={itemVariants}
            className="px-8 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-center gap-3"
          >
            <Sparkles size={14} className="text-blue-600" />
            <span className="text-xs text-slate-500">
              Join thousands sharing AI conversations
            </span>
            <Sparkles size={14} className="text-blue-600" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;