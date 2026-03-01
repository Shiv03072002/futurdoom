import React from "react";
import { Calendar, Sparkles, Share2, ArrowRight, Trash2, Reply, Copy, Brain, Settings, CheckCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ShareItem = ({ share, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (onDelete) {
      onDelete(share.id);
    }
  };

  const handleDeepAskShare = () => {
    navigate("/deepaskshare");
  };

  // Animation variants
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25
      }
    }
  };

  return (
    <motion.div 
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      layout
      className="bg-white rounded-xl border border-blue-50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-300/30 hover:-translate-y-1"
    >
      {/* Item Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-blue-200">
                <Calendar size={12} className="text-blue-500" />
                <span className="text-xs font-medium text-slate-700">{share.date}</span>
              </div>
            </div>
          </div>
          <span className="text-xs text-blue-400 font-medium">#{share.id}</span>
        </div>
      </div>

      {/* Conversation */}
      <div className="p-6 space-y-6">
        {/* User Message */}
        <div className="flex flex-col">
          {/* Action Icons - Above user message */}
          <div className="flex items-center gap-1 mb-2 justify-start">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDelete}
              className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
              title="Delete"
            >
              <Trash2 size={14} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
              title="Reply"
            >
              <Reply size={14} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
              title="Copy"
            >
              <Copy size={14} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDeepAskShare}
              className="p-1.5 rounded-lg hover:bg-indigo-50 text-slate-400 hover:text-indigo-500 transition-colors"
              title="Deep Ask Share"
            >
              <Brain size={14} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
              title="Share"
            >
              <Share2 size={14} />
            </motion.button>
          </div>

          {/* Message bubble with avatar */}
          <div className="flex items-end gap-2 justify-start">
            {/* Avatar for user message */}
            <img
              src={share.avatar}
              alt={share.name}
              className="w-9 h-9 rounded-xl ring-2 ring-white shadow-md"
            />

            {/* Message bubble */}
            <div className="flex flex-col max-w-[70%] items-start">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-slate-600">{share.name}</span>
                <span className="text-[10px] text-slate-400">asked</span>
              </div>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="px-4 py-2.5 text-sm bg-white text-slate-700 rounded-2xl rounded-bl-sm border border-blue-100"
                style={{
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                }}
              >
                {share.message}
              </motion.div>

              {/* Time */}
              <div className="flex items-center gap-1.5 mt-1 text-xs justify-start">
                <span className="text-slate-400">{share.time || '10:30 AM'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reply Message */}
        <div className="flex flex-col">
          {/* Action Icons - Above reply message */}
          <div className="flex items-center gap-1 mb-2 justify-end">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDelete}
              className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
              title="Delete"
            >
              <Trash2 size={14} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
              title="Edit"
            >
              <Settings size={14} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
              title="Copy"
            >
              <Copy size={14} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
              title="Share"
            >
              <Share2 size={14} />
            </motion.button>
          </div>

          {/* Message bubble with avatar */}
          <div className="flex items-end gap-2 justify-end">
            {/* Message bubble */}
            <div className="flex flex-col max-w-[70%] items-end">
              <div className="flex items-center gap-2 justify-end mb-1">
                <span className="text-[10px] text-slate-400">replied</span>
                <span className="text-xs font-semibold text-blue-600">futurdoom</span>
                <Sparkles size={10} className="text-blue-400" />
              </div>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="px-4 py-2.5 text-sm bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white rounded-2xl rounded-br-sm"
                style={{
                  boxShadow: '0 4px 15px rgba(37,99,235,0.3)',
                }}
              >
                {share.reply}
              </motion.div>

              {/* Time + read receipt */}
              <div className="flex items-center gap-1.5 mt-1 text-xs justify-end">
                <span className="text-slate-400">{share.replyTime || '10:32 AM'}</span>
                <CheckCheck size={14} className="text-blue-600" />
              </div>
            </div>

            {/* Avatar for reply */}
            <img
              src={share.replyAvatar}
              alt="futurdoom"
              className="w-9 h-9 rounded-xl ring-2 ring-blue-300 shadow-md"
            />
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-2 pt-4 border-t border-blue-100">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
            <Share2 size={14} />
            Share
          </button>
          <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-md hover:shadow-lg transition-all duration-200">
            View Thread
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ShareItem;