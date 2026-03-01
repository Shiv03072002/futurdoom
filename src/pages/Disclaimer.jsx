import React from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Mail,
  Globe,
  ExternalLink,
  CheckCircle,
  Shield,
  Info,
  Heart,
  Sparkles,
  BookOpen,
  Scale,
  XCircle,
  Bell
} from "lucide-react";

const Disclaimer = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: i * 0.15,
      },
    }),
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

  const pulseAnimation = {
    scale: [1, 1.05, 1],
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
    <div className="min-h-screen ">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4"
      >
        {/* Main Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl border border-blue-50 overflow-hidden"
        >
          {/* Header with Gradient */}
          <div className="bg-gradient-to-br from-[#0f1f6e] via-[#1a3aad] to-[#2563eb] p-8 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
            <div className="absolute bottom-0 left-1/2 w-24 h-24 rounded-full bg-blue-400/10" />
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "32px 32px"
              }}
            />
            
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-4 h-[2px] bg-blue-300" />
                <span className="text-blue-200 text-xs tracking-[0.2em] uppercase font-medium">Legal Notice</span>
              </div>
              
              <div className="flex items-center gap-4 mb-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center"
                >
                  <AlertTriangle className="w-6 h-6 text-white" />
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  Disclaimer
                </h1>
              </div>
              
              <p className="text-blue-100/70 text-sm leading-relaxed max-w-2xl">
                Important information about your use of futurdoom. Please read this disclaimer carefully.
              </p>
            </div>
          </div>

          {/* Contact Info Bar */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 p-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Bell size={16} className="text-blue-600" />
                <span className="text-sm text-slate-600">Questions? Reach out anytime:</span>
              </div>
              <motion.a
                href="mailto:feedbackfuturdoom@gmail.com"
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-blue-200 text-blue-600 hover:shadow-md transition-all"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail size={14} />
                <span className="text-sm font-medium">feedbackfuturdoom@gmail.com</span>
              </motion.a>
            </div>
          </div>

          {/* Content Sections */}
          <div className="p-6 md:p-8 space-y-8">
            {/* Section 1 - Main Disclaimer */}
            <motion.section
              custom={0}
              variants={sectionVariants}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center shadow-md"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  animate={floatAnimation}
                >
                  <AlertTriangle className="w-5 h-5 text-white" />
                </motion.div>
                <h2 className="text-xl font-bold text-slate-800">
                  1. Disclaimers for futurDooM.com
                </h2>
              </div>

              <div className="pl-4 space-y-4">
                <motion.p 
                  className="text-slate-600 leading-relaxed"
                  whileHover={{ x: 5 }}
                >
                  Welcome to <span className="font-bold bg-gradient-to-r from-[#1a3aad] to-[#2563eb] bg-clip-text text-transparent">futurDooM</span> – an AI-powered social platform designed to connect, empower, and inspire users through intelligent and engaging interactions. All information provided on this website – 
                  <a href="https://www.futurdoom.com" className="text-blue-600 hover:underline mx-1">https://www.futurdoom.com</a> 
                  – is published in good faith and for general informational purposes only.
                </motion.p>

                <motion.div 
                  className="bg-amber-50/50 rounded-xl p-5 border border-amber-200"
                  whileHover={{ scale: 1.01 }}
                >
                  <p className="text-slate-600 flex items-start gap-3">
                    <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>While we leverage advanced technologies to enhance your experience, futurDooM makes no guarantees regarding the accuracy, reliability, or completeness of any information displayed.</span>
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-red-50/50 rounded-xl p-5 border border-red-200"
                  whileHover={{ scale: 1.01 }}
                >
                  <p className="text-slate-600 flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Any actions you take based on the content found on this website are strictly at your own discretion. futurDooM will not be held responsible for any losses or damages arising from the use or misuse of information presented on our platform.</span>
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-blue-50/50 rounded-xl p-5 border border-blue-200"
                  whileHover={{ scale: 1.01 }}
                >
                  <p className="text-slate-600 flex items-start gap-3">
                    <ExternalLink className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>Our website may include links to external websites for your convenience and broader engagement. While we strive to include only high-quality and ethical links, we do not have control over the content or updates of these third-party sites. The inclusion of such links does not imply endorsement.</span>
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-purple-50/50 rounded-xl p-5 border border-purple-200"
                  whileHover={{ scale: 1.01 }}
                >
                  <p className="text-slate-600 flex items-start gap-3">
                    <Info className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    <span>Please note that once you leave www.futurdoom.com, you are subject to the terms and privacy policies of the external sites you visit. We encourage you to review their terms and privacy practices before engaging with them or sharing any personal information.</span>
                  </p>
                </motion.div>
              </div>
            </motion.section>

            {/* Section 2 - Your Consent */}
            <motion.section
              custom={1}
              variants={sectionVariants}
              className="border-t border-blue-100 pt-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center shadow-md"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <CheckCircle className="w-5 h-5 text-white" />
                </motion.div>
                <h2 className="text-xl font-bold text-slate-800">
                  2. Your Consent
                </h2>
              </div>

              <motion.div 
                className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200"
                whileHover={{ scale: 1.01 }}
              >
                <p className="text-slate-700 text-center font-medium">
                  By accessing and using futurDooM, you acknowledge that you have read, understood, and agreed to this disclaimer in full.
                </p>
                <motion.div 
                  className="w-12 h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mx-auto mt-4"
                  animate={{ width: ["3rem", "5rem", "3rem"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </motion.section>

            {/* Section 3 - Updates */}
            <motion.section
              custom={2}
              variants={sectionVariants}
              className="border-t border-blue-100 pt-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center shadow-md"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <BookOpen className="w-5 h-5 text-white" />
                </motion.div>
                <h2 className="text-xl font-bold text-slate-800">
                  3. Updates to This Disclaimer
                </h2>
              </div>

              <motion.div 
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200"
                whileHover={{ scale: 1.01 }}
              >
                <p className="text-slate-600 leading-relaxed">
                  We may update or revise this disclaimer periodically to reflect changes to our services, policies, or legal requirements. Any such updates will be clearly posted on this page.
                </p>
                
                {/* Last Updated Badge */}
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-blue-200 mt-4"
                  animate={pulseAnimation}
                >
                  <Sparkles size={14} className="text-blue-600" />
                  <span className="text-xs font-medium text-slate-600">Last updated: January 25, 2026</span>
                </motion.div>
              </motion.div>
            </motion.section>

            {/* Contact Cards */}
            <motion.section
              custom={3}
              variants={sectionVariants}
              className="border-t border-blue-100 pt-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.a
                  href="mailto:feedbackfuturdoom@gmail.com"
                  className="flex items-center gap-4 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.02, y: -3 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Email us anytime</p>
                    <p className="text-sm font-semibold text-slate-800">feedbackfuturdoom@gmail.com</p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://www.futurdoom.com"
                  className="flex items-center gap-4 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.02, y: -3 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Visit our website</p>
                    <p className="text-sm font-semibold text-slate-800">www.futurdoom.com</p>
                  </div>
                </motion.a>
              </div>
            </motion.section>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-100">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Heart size={14} className="text-pink-500" />
                <p className="text-xs text-slate-500">Trusted by thousands of users worldwide</p>
              </div>
              <div className="flex items-center gap-3">
                <Scale size={14} className="text-blue-600" />
                <p className="text-xs text-slate-500">© 2025 futurdoom · All rights reserved</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back to Top Button */}
        <motion.button
          className="fixed bottom-6 right-6 w-12 h-12 rounded-xl bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-lg shadow-blue-500/30 flex items-center justify-center md:hidden"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Disclaimer;