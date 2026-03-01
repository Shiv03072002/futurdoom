import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Sparkles } from "lucide-react";

const ChatSection = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

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

  return (
    <motion.div 
      className="bg-white rounded-xl border border-blue-50 overflow-hidden"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
          },
        },
      }}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50"
        variants={itemVariants}
      >
        <div className="flex items-center gap-3">
          <motion.span 
            className="text-sm font-semibold text-slate-800 flex items-center gap-1"
            animate={{
              color: ["#1e293b", "#2563eb", "#1e293b"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            futurDooM
            <Sparkles size={12} className="text-blue-400" />
          </motion.span>
          <span className="text-xs text-slate-400 bg-white px-2.5 py-0.5 rounded-full border border-blue-100">
            Feb 20, 2026
          </span>
        </div>
        
        <div className="flex items-center gap-2 relative">
          <motion.button 
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-blue-100 hover:text-blue-500 transition-colors relative"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSettingsOpen(!settingsOpen)}
          >
            <Settings size={14} />
            <motion.span 
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white flex items-center justify-center rounded-full text-[8px] font-bold"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              3
            </motion.span>
          </motion.button>

          <AnimatePresence>
            {settingsOpen && (
              <motion.div 
                className="absolute right-0 top-10 mt-2 w-48 bg-white rounded-xl shadow-xl border border-blue-100 z-10 overflow-hidden"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="p-2">
                  {["Mute", "Block", "Report", "Hide"].map((item, i) => (
                    <motion.button
                      key={item}
                      className="w-full text-left px-3 py-2 text-xs text-slate-600 hover:bg-blue-50 rounded-lg transition-colors"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Chat bubbles */}
      <motion.div 
        className="px-6 py-5 space-y-4 bg-gradient-to-b from-blue-50/50 to-white"
        variants={itemVariants}
      >
        {/* User bubble */}
        <motion.div 
          className="flex items-end gap-2 group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <motion.div 
            className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            SK
          </motion.div>
          <motion.div 
            className="bg-white border border-blue-100 shadow-sm text-slate-700 px-4 py-3 rounded-2xl rounded-bl-sm text-sm max-w-[75%] group-hover:shadow-md transition-shadow"
            whileHover={{ scale: 1.01 }}
          >
            how to do frontend in html
            <motion.p 
              className="text-xs text-slate-400 mt-1 flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              2:10 PM
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Bot bubble */}
        <motion.div 
          className="flex items-end gap-2 flex-row-reverse group"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          <motion.div 
            className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1a3aad] to-[#2563eb] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md"
            whileHover={{ scale: 1.1, rotate: -5 }}
          >
            fD
          </motion.div>
          <motion.div 
            className="bg-gradient-to-r from-[#0f1f6e] to-[#2563eb] text-white px-4 py-3 rounded-2xl rounded-br-sm text-sm max-w-[78%] shadow-lg group-hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.01 }}
          >
            <motion.p 
              className="mb-2 flex items-center gap-1"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              To create a frontend in HTML:
              <Sparkles size={10} className="text-blue-200" />
            </motion.p>
            <motion.ol className="space-y-1.5">
              {["Define Structure", "Use HTML Tags & Attributes", "Create Navigation Menu", "Style Your Webpage"].map((s, i) => (
                <motion.li 
                  key={i} 
                  className="flex items-start gap-1.5 text-xs text-blue-100"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <span className="font-bold text-white mt-0.5">{i + 1}.</span> 
                  <motion.span
                    whileHover={{ x: 3 }}
                  >
                    {s}
                  </motion.span>
                </motion.li>
              ))}
            </motion.ol>
            <motion.p 
              className="text-xs text-blue-200 mt-3 text-right flex items-center justify-end gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              2:11 PM
              <span className="w-1 h-1 rounded-full bg-blue-300" />
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ChatSection;