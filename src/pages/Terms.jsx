import React from "react";
import { motion } from "framer-motion";
import {
  Scale,
  Shield,
  FileText,
  AlertCircle,
  Mail,
  Globe,
  Link2,
  Image as ImageIcon,
  Cpu,
  Gavel,
  Info,
  CheckCircle,
  XCircle,
  ExternalLink,
  Sparkles,
  BookOpen,
  Heart,
  Download
} from "lucide-react";

const Terms = () => {
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
        delay: i * 0.1,
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
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const tabs = ["Introduction", "License", "Content", "AI Notice", "Legal"];

  return (
    <div className="min-h-screen ">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4"
      >
        {/* Hero Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl border border-blue-50 overflow-hidden mb-6"
        >
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
                <span className="text-blue-200 text-xs tracking-[0.2em] uppercase font-medium">Legal</span>
              </div>
              
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Scale size={28} className="text-white" />
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  Terms & Conditions
                </h1>
              </div>
              <p className="text-blue-100/70 text-sm leading-relaxed max-w-2xl">
                Please read these terms carefully before using futurdoom. By accessing our platform, 
                you agree to be bound by these terms.
              </p>
            </div>
          </div>

          {/* Quick Info Cards */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -3 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Website</p>
                <a
                  href="https://www.futurdoom.com"
                  className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors"
                >
                  www.futurdoom.com
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -3 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Email</p>
                <a
                  href="mailto:feedbackfuturdoom@gmail.com"
                  className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors"
                >
                  feedbackfuturdoom@gmail.com
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl border border-blue-50 overflow-hidden"
        >
          {/* Navigation Tabs */}
          <div className="border-b border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 flex flex-wrap gap-2">
            {tabs.map((tab, i) => (
              <motion.a
                key={i}
                href={`#section-${i + 1}`}
                className="text-xs px-4 py-2 rounded-full bg-white text-slate-600 hover:bg-blue-600 hover:text-white transition-all duration-200 border border-blue-200 shadow-sm"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab}
              </motion.a>
            ))}
          </div>

          <div className="p-6 md:p-8 space-y-8">
            {/* Section 1 - Introduction */}
            <motion.section
              id="section-1"
              custom={0}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="scroll-mt-8"
            >
              <div className="flex items-start gap-4">
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center flex-shrink-0 mt-1 shadow-md"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Info className="w-5 h-5 text-white" />
                </motion.div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                    1. Introduction
                    <motion.span 
                      className="text-xs bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1"
                      animate={pulseAnimation}
                    >
                      <Sparkles size={10} />
                      Updated
                    </motion.span>
                  </h2>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-600 leading-relaxed">
                      Welcome to{" "}
                      <span className="font-bold bg-gradient-to-r from-[#1a3aad] to-[#2563eb] bg-clip-text text-transparent">
                        futurdoom
                      </span>
                      , an AI-powered social platform designed to help users
                      connect, communicate, and collaborate in smarter, more
                      engaging ways. These Terms and Conditions govern your use
                      of our site and services.
                    </p>
                    <div className="mt-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                      <p className="text-sm text-slate-600 flex items-start gap-2">
                        <AlertCircle size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                        By accessing or using futurdoom, you agree to be bound by these terms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Section 2 - License */}
            <motion.section
              id="section-2"
              custom={1}
              variants={sectionVariants}
              className="scroll-mt-8 border-t border-blue-100 pt-6"
            >
              <div className="flex items-start gap-4">
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center flex-shrink-0 mt-1 shadow-md"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <FileText className="w-5 h-5 text-white" />
                </motion.div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-800 mb-3">
                    2. License & Intellectual Property
                  </h2>
                  <p className="text-slate-600 mb-4">
                    Unless otherwise stated, futurdoom.com and/or its licensors
                    own the intellectual property rights for all material on the
                    site. All rights are reserved.
                  </p>
                  <p className="text-slate-700 font-medium mb-3">
                    You may access this content for personal use, but you must
                    not:
                  </p>
                  <div className="space-y-3">
                    {[
                      "Republish material from futurdoom",
                      "Sell, rent or sub-license material from futurdoom",
                      "Reproduce or copy material for commercial purposes",
                      "Redistribute content unless specifically made for redistribution",
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3 text-slate-600 bg-red-50/50 p-3 rounded-lg border border-red-100"
                        whileHover={{ x: 5 }}
                      >
                        <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Section 3 - Hyperlinking */}
            <motion.section
              id="section-3"
              custom={2}
              variants={sectionVariants}
              className="scroll-mt-8 border-t border-blue-100 pt-6"
            >
              <div className="flex items-start gap-4">
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center flex-shrink-0 mt-1 shadow-md"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Link2 className="w-5 h-5 text-white" />
                </motion.div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-800 mb-3">
                    3. Hyperlinking to Our Content
                  </h2>
                  <p className="text-slate-600 mb-3">
                    You may link to our homepage or content, provided the link:
                  </p>
                  <div className="space-y-2 mb-4">
                    {[
                      "Is not misleading",
                      "Does not falsely imply sponsorship or endorsement",
                      "Fits within the context of your own content",
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3 text-slate-600 bg-green-50/50 p-3 rounded-lg border border-green-100"
                        whileHover={{ x: 5 }}
                      >
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Section 4 - AI Notice */}
            <motion.section
              id="section-4"
              custom={3}
              variants={sectionVariants}
              className="scroll-mt-8 border-t border-blue-100 pt-6"
            >
              <div className="flex items-start gap-4">
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center flex-shrink-0 mt-1 shadow-md"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  animate={{
                    boxShadow: ["0 4px 10px rgba(79,70,229,0.3)", "0 8px 20px rgba(79,70,229,0.5)", "0 4px 10px rgba(79,70,229,0.3)"],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Cpu className="w-5 h-5 text-white" />
                </motion.div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                    4. AI and User Content
                    <span className="text-xs bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-2 py-0.5 rounded-full">
                      Important
                    </span>
                  </h2>
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-200">
                    <p className="text-slate-700 mb-3">
                      As an AI-integrated platform, content generated by
                      futurdoom may be created or influenced by automated
                      systems. We strive for accuracy and safety, but cannot
                      guarantee that all AI-generated content is error-free.
                    </p>
                    <p className="text-slate-700 mb-3">
                      Users are responsible for any information, messages, or
                      media they share. We reserve the right to moderate,
                      remove, or restrict content that violates our guidelines.
                    </p>
                    <motion.div 
                      className="flex items-center gap-2 text-sm text-indigo-600 bg-white p-3 rounded-lg border border-indigo-200"
                      whileHover={{ scale: 1.01 }}
                    >
                      <Shield size={16} />
                      <span>Your safety is our priority</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Section 5 - Governing Law */}
            <motion.section
              id="section-5"
              custom={4}
              variants={sectionVariants}
              className="scroll-mt-8 border-t border-blue-100 pt-6"
            >
              <div className="flex items-start gap-4">
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center flex-shrink-0 mt-1 shadow-md"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <Gavel className="w-5 h-5 text-white" />
                </motion.div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-800 mb-3">
                    5. Governing Law
                  </h2>
                  <div className="bg-amber-50/50 p-5 rounded-xl border border-amber-200">
                    <p className="text-slate-700">
                      These terms are governed by and construed in accordance with
                      the laws of <span className="font-bold text-amber-600">India</span>,
                      and you irrevocably submit to the jurisdiction of its courts.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Contact Section */}
            <motion.section
              custom={5}
              variants={sectionVariants}
              className="scroll-mt-8 border-t border-blue-100 pt-6"
            >
              <div className="flex items-start gap-4">
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center flex-shrink-0 mt-1 shadow-md"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Mail className="w-5 h-5 text-white" />
                </motion.div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-800 mb-3">
                    6. Contact Us
                  </h2>
                  <p className="text-slate-600 mb-4">
                    If you have any questions regarding these Terms & Conditions, please reach out:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.a
                      href="mailto:feedbackfuturdoom@gmail.com"
                      className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-md transition-all"
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <Mail className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-slate-700">feedback@futurdoom.com</span>
                    </motion.a>
                    <motion.a
                      href="https://www.futurdoom.com"
                      className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-md transition-all"
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <Globe className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-slate-700">www.futurdoom.com/terms</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </motion.div>

        {/* Acceptance Footer */}
        <motion.div
          variants={itemVariants}
          className="mt-8 bg-white rounded-xl border border-blue-50 overflow-hidden"
        >
          <div className="p-8 text-center">
            <motion.div 
              className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center mx-auto mb-4"
              animate={pulseAnimation}
            >
              <Heart className="w-8 h-8 text-white" />
            </motion.div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Ready to accept our terms?
            </h3>
            <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
              By using futurdoom, you acknowledge that you have read and
              understood these Terms & Conditions
            </p>
            
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white rounded-xl font-semibold text-sm shadow-md shadow-blue-500/30"
                variants={buttonHover}
                whileHover="hover"
                whileTap={buttonTap}
              >
                Accept Terms
              </motion.button>
              <motion.button
                className="px-8 py-3 border-2 border-blue-200 text-slate-600 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors flex items-center gap-2"
                variants={buttonHover}
                whileHover="hover"
                whileTap={buttonTap}
              >
                <Download size={16} />
                Print PDF
              </motion.button>
            </div>
            
            <p className="text-xs text-slate-400 mt-6">
              Last updated: January 25, 2026
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p 
          variants={itemVariants}
          className="text-xs text-slate-400 text-center mt-6"
        >
          © 2025 futurdoom · All rights reserved · v1.0.0
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Terms;