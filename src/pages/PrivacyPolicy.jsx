import React from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Cookie, 
  Database, 
  Mail, 
  Globe,
  Lock,
  Eye,
  FileText,
  AlertCircle,
  Users,
  Target,
  Clock,
  Link as LinkIcon,
  Sparkles,
  Heart,
  CheckCircle,
  XCircle,
  Info
} from "lucide-react";

const PrivacyPolicy = () => {
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

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
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
        className="max-w-7xl mx-auto px-4 "
      >
        {/* Header Card */}
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
              
              <div className="flex items-center gap-4 mb-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center"
                >
                  <Shield className="w-6 h-6 text-white" />
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  Privacy Policy
                </h1>
              </div>
              
              <p className="text-blue-100/70 text-sm leading-relaxed max-w-2xl">
                Your privacy matters to us. Learn how we collect, use, and protect your personal information.
              </p>
            </div>
          </div>

          {/* Introduction Bar */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 p-6">
            <p className="text-slate-600 leading-relaxed">
              At <span className="font-bold bg-gradient-to-r from-[#1a3aad] to-[#2563eb] bg-clip-text text-transparent">futurDooM</span>, accessible from{' '}
              <a href="https://www.futurdoom.com" className="text-blue-600 hover:underline font-medium">
                https://www.futurdoom.com
              </a>, protecting your privacy is a top priority. This Privacy Policy outlines the types of personal data we collect and how it is used, disclosed, and safeguarded.
            </p>
          </div>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl border border-blue-50 overflow-hidden"
        >
          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-blue-100 border-b border-blue-100">
            {[
              { icon: Shield, label: "Data Protection", value: "256-bit" },
              { icon: Clock, label: "Policy Updated", value: "Jan 2026" },
              { icon: Users, label: "Users Protected", value: "10K+" },
              { icon: CheckCircle, label: "Compliant", value: "GDPR/CCPA" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="p-4 text-center"
                whileHover={{ y: -2 }}
              >
                <stat.icon className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                <p className="text-xs font-semibold text-slate-800">{stat.value}</p>
                <p className="text-[10px] text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Content Sections */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Section 1 - Consent */}
            <motion.section
              custom={0}
              variants={sectionVariants}
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50/30 transition-colors"
            >
              <motion.div 
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center flex-shrink-0 shadow-md"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Shield className="w-5 h-5 text-white" />
              </motion.div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-slate-800 mb-1">1. Consent</h2>
                <p className="text-slate-600">
                  By using our website, you consent to our Privacy Policy and agree to its terms.
                </p>
              </div>
            </motion.section>

            {/* Section 2 - Information We Collect */}
            <motion.section
              custom={1}
              variants={sectionVariants}
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50/30 transition-colors"
            >
              <motion.div 
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center flex-shrink-0 shadow-md"
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <Database className="w-5 h-5 text-white" />
              </motion.div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-slate-800 mb-2">2. Information We Collect</h2>
                <div className="space-y-2">
                  {[
                    'Personal identifiers (name, email address, etc.)',
                    'Usage data (pages visited, time spent, actions taken)',
                    'Technical data (browser type, IP address, device info)'
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-start gap-3 bg-blue-50/50 p-2 rounded-lg"
                      whileHover={{ x: 5 }}
                    >
                      <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Section 3 - How We Use Your Information */}
            <motion.section
              custom={2}
              variants={sectionVariants}
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50/30 transition-colors"
            >
              <motion.div 
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center flex-shrink-0 shadow-md"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Target className="w-5 h-5 text-white" />
              </motion.div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-slate-800 mb-2">3. How We Use Your Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    'To operate and maintain our website',
                    'To improve user experience',
                    'To communicate updates',
                    'To prevent fraudulent activities'
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-center gap-2 bg-purple-50/50 p-2 rounded-lg"
                      whileHover={{ x: 3 }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                      <span className="text-sm text-slate-600">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Section 4 - Log Files */}
            <motion.section
              custom={3}
              variants={sectionVariants}
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50/30 transition-colors"
            >
              <motion.div 
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center flex-shrink-0 shadow-md"
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <FileText className="w-5 h-5 text-white" />
              </motion.div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-slate-800 mb-1">4. Log Files</h2>
                <p className="text-slate-600">
                  futurDooM follows a standard procedure of using log files. These files log visitors when they visit websites. This includes IP addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.
                </p>
              </div>
            </motion.section>

            {/* Section 5 - Cookies */}
            <motion.section
              custom={4}
              variants={sectionVariants}
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50/30 transition-colors"
            >
              <motion.div 
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-400 flex items-center justify-center flex-shrink-0 shadow-md"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Cookie className="w-5 h-5 text-white" />
              </motion.div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-slate-800 mb-1">5. Cookies and Web Beacons</h2>
                <p className="text-slate-600">
                  We use cookies to store information such as visitors' preferences and the pages on the site that the visitor accessed or visited. This helps us optimize the user experience.
                </p>
              </div>
            </motion.section>

            {/* Section 6 - Google DART Cookie */}
            <motion.section
              custom={5}
              variants={sectionVariants}
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50/30 transition-colors"
            >
              <motion.div 
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-400 to-rose-400 flex items-center justify-center flex-shrink-0 shadow-md"
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <AlertCircle className="w-5 h-5 text-white" />
              </motion.div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-slate-800 mb-1">6. Google DoubleClick DART Cookie</h2>
                <p className="text-slate-600">
                  Google is one of the third-party vendors on our site. It uses cookies, known as DART cookies, to serve ads based on a user's visit to www.futurdoom.com and other sites on the internet. Users may opt out by visiting the Google ad and content network Privacy Policy.
                </p>
              </div>
            </motion.section>

            {/* Section 9 - CCPA Rights */}
            <motion.section
              custom={6}
              variants={sectionVariants}
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50/30 transition-colors"
            >
              <motion.div 
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center flex-shrink-0 shadow-md"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Eye className="w-5 h-5 text-white" />
              </motion.div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-slate-800 mb-2">9. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
                <p className="text-slate-600 mb-3">
                  Under the California Consumer Privacy Act (CCPA), users have the right to:
                </p>
                <div className="space-y-2 mb-3">
                  {[
                    'Request disclosure of collected data',
                    'Request deletion of personal data',
                    'Opt-out of the sale of personal data'
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-start gap-2 bg-teal-50/50 p-2 rounded-lg"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-teal-600 font-bold">•</span>
                      <span className="text-sm text-slate-600">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Section 13 - Contact */}
            <motion.section
              custom={7}
              variants={sectionVariants}
              className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200"
            >
              <motion.div 
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center flex-shrink-0 shadow-md"
                animate={pulseAnimation}
              >
                <Mail className="w-5 h-5 text-white" />
              </motion.div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-slate-800 mb-2">13. Contact Us</h2>
                <p className="text-slate-600 mb-3">
                  If you have any questions or concerns about this Privacy Policy, please contact us:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <motion.a
                    href="mailto:feedbackfuturdoom@gmail.com"
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-blue-200 hover:shadow-md transition-all"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-slate-700">feedbackfuturdoom@gmail.com</span>
                  </motion.a>
                  <motion.a
                    href="https://www.futurdoom.com"
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-blue-200 hover:shadow-md transition-all"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-slate-700">www.futurdoom.com</span>
                  </motion.a>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-100">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Heart size={14} className="text-pink-500" />
                <p className="text-xs text-slate-500">Your privacy is our priority</p>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-blue-600" />
                <p className="text-xs text-slate-500">Last updated: January 25, 2026</p>
              </div>
            </div>
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

export default PrivacyPolicy;