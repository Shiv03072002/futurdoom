import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, EyeOff, User, Globe, ShieldCheck,
  Settings, LogOut, Trash2, Phone, FileText, AlertTriangle,
  Sparkles, Bell, Lock, HelpCircle, Moon, Sun,
} from "lucide-react";

const sections = [
  {
    title: "Profile Information",
    icon: User,
    color: "from-blue-400 to-indigo-400",
    items: [
      { label: "Edit Profile", icon: User, description: "Update your personal info", to: "/edit" },
      { label: "User Credentials", icon: EyeOff, description: "Change password & security", to: "/credentials" },
    ],
  },
  {
    title: "Preferences",
    icon: Settings,
    color: "from-purple-400 to-pink-400",
    items: [
      { label: "Appearance", icon: Sun, description: "Theme & display settings", to: "/appearance" },
      { label: "Language", icon: Globe, description: "English (US)", to: "/language" },
      { label: "Privacy", icon: Lock, description: "Control your data", to: "/privacy-settings" },
      { label: "Notifications", icon: Bell, description: "Manage alerts", to: "/notifications" },
    ],
  },
  {
    title: "About Us",
    icon: Globe,
    color: "from-green-400 to-teal-400",
    items: [
      { label: "Visit Us", icon: Globe, description: "Learn about futurdoom", to: "/about" },
      { label: "Contacts", icon: Phone, description: "Get in touch", to: "/contact" },
      { label: "Help Center", icon: HelpCircle, description: "FAQs & support", to: "/help" },
    ],
  },
  {
    title: "Privacy & Terms",
    icon: ShieldCheck,
    color: "from-orange-400 to-red-400",
    items: [
      { label: "Disclaimer", icon: AlertTriangle, description: "Important notices", to: "/disclaimer" },
      { label: "Privacy Policy", icon: ShieldCheck, description: "How we handle data", to: "/privacy" },
      { label: "Terms & Conditions", icon: FileText, description: "Rules & guidelines", to: "/terms" },
    ],
  },
  {
    title: "Account Management",
    icon: Settings,
    color: "from-gray-400 to-gray-600",
    items: [
      { label: "Logout", icon: LogOut, description: "Sign out from all devices", to: "/logout", danger: false },
      { label: "Delete Account", icon: Trash2, description: "Permanently remove account", to: "/delete-account", danger: true },
    ],
  },
];

const Setting = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
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

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: i * 0.08,
      },
    }),
  };

  const buttonHover = {
    scale: 1.02,
    x: 5,
    transition: { type: "spring", stiffness: 400, damping: 17 },
  };

  const buttonTap = {
    scale: 0.98,
  };

  return (
    <div className="min-h-screen ">
      <motion.div 
        className="max-w-7xl mx-auto px-4 flex flex-col gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Page Header */}
        <motion.div 
          className="bg-white rounded-xl border border-blue-50 overflow-hidden mb-2"
          variants={itemVariants}
        >
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
                <span className="text-blue-200 text-xs tracking-[0.2em] uppercase font-medium">Settings</span>
              </div>
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center"
                >
                  <Settings size={20} className="text-white" />
                </motion.div>
                <h1 className="text-2xl font-black text-white tracking-tight">Settings</h1>
              </div>
              <p className="text-blue-100/70 text-sm mt-2 leading-relaxed">
                Manage your account preferences and privacy
              </p>
            </div>
          </div>
        </motion.div>

        {/* Settings Sections - All expanded with Links */}
        {sections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            custom={sectionIndex}
            variants={sectionVariants}
            className="bg-white rounded-2xl  border border-blue-50 overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            {/* Section Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
              <div className="flex items-center gap-3">
                <motion.div 
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center text-white shadow-md`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <section.icon size={18} />
                </motion.div>
                <div>
                  <h2 className="text-sm font-bold text-slate-800">{section.title}</h2>
                  <p className="text-xs text-slate-400">{section.items.length} options</p>
                </div>
              </div>
            </div>

            {/* Section Items - Always visible with Links */}
            <div className="divide-y divide-blue-50">
              {section.items.map(({ label, icon: Icon, danger, description, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="block"
                >
                  <motion.div
                    className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-all duration-200 group relative overflow-hidden cursor-pointer
                      ${danger ? "hover:bg-red-50/50" : "hover:bg-blue-50/50"}`}
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                  >
                    {/* Animated background on hover */}
                    <motion.div 
                      className={`absolute left-0 top-0 bottom-0 w-1 ${danger ? 'bg-red-500' : 'bg-blue-500'}`}
                      initial={{ scaleY: 0 }}
                      whileHover={{ scaleY: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    
                    {/* Icon */}
                    <motion.div 
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                        ${danger 
                          ? "bg-red-50 group-hover:bg-red-100" 
                          : "bg-blue-50 group-hover:bg-blue-100"
                        } transition-colors duration-200`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Icon size={16} className={danger ? "text-red-500" : "text-blue-600"} />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1">
                      <span className={`text-sm font-semibold block ${danger ? "text-red-600" : "text-slate-800"}`}>
                        {label}
                      </span>
                      {description && (
                        <span className="text-xs text-slate-400 mt-0.5 block">
                          {description}
                        </span>
                      )}
                    </div>

                    {/* Arrow */}
                    <motion.div
                      animate={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <ArrowRight size={16} className={danger ? "text-red-300" : "text-blue-300"} />
                    </motion.div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        ))}

        {/* User Info Card */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-200 mt-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1a3aad] to-[#2563eb] flex items-center justify-center text-white font-bold text-lg shadow-md">
              FD
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-800">futurdoom User</p>
              <p className="text-xs text-slate-500 mt-0.5">@futurdoom · Member since 2025</p>
            </div>
            <Link to="/profile">
              <motion.div
                className="px-3 py-1.5 bg-white rounded-lg border border-blue-200 text-xs font-medium text-blue-600 cursor-pointer hover:bg-blue-50 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                Account Info
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p 
          variants={itemVariants}
          className="text-xs text-slate-400 text-center mt-4"
        >
          © 2025 futurdoom · v1.0.0
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Setting;