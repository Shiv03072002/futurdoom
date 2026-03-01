import React from "react";
import { Calendar, Sparkles, MessageCircle, Share2, ArrowRight, Trash2, Reply, Copy, Brain } from "lucide-react";
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

  return (
    <div className="bg-white rounded-xl border border-blue-50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-300/30 hover:-translate-y-1">
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
        <div className="flex items-start gap-3 group">
          <img
            src={share.avatar}
            alt={share.name}
            className="w-10 h-10 rounded-xl ring-2 ring-white shadow-md"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-slate-600">{share.name}</span>
              <span className="text-[10px] text-slate-400">asked</span>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl rounded-tl-none px-5 py-3 inline-block max-w-[80%] border border-blue-100 relative group">
              <p className="text-sm text-slate-700">{share.message}</p>
              
              {/* Message Actions - Appear on hover */}
              <div className="absolute -top-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1 bg-white rounded-lg shadow-lg border border-slate-200 p-1 z-10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDelete}
                  className="p-1 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                  title="Reply"
                >
                  <Reply size={14} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                  title="Copy"
                >
                  <Copy size={14} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDeepAskShare}
                  className="p-1 rounded-lg hover:bg-indigo-50 text-slate-400 hover:text-indigo-500 transition-colors"
                  title="Deep Ask Share"
                >
                  <Brain size={14} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Reply Message */}
        <div className="flex items-start gap-3 justify-end group">
          <div className="flex-1 text-right">
            <div className="flex items-center gap-2 justify-end mb-1">
              <span className="text-[10px] text-slate-400">replied</span>
              <span className="text-xs font-semibold text-blue-600">futurdoom</span>
              <Sparkles size={10} className="text-blue-400" />
            </div>
            <div className="bg-gradient-to-r from-[#0f1f6e] to-[#2563eb] rounded-2xl rounded-tr-none px-5 py-3 inline-block max-w-[80%] text-white shadow-lg relative group">
              <p className="text-sm">{share.reply}</p>
              
              {/* Reply Message Actions - Appear on hover */}
              <div className="absolute -top-8 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1 bg-white rounded-lg shadow-lg border border-slate-200 p-1 z-10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDelete}
                  className="p-1 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                  title="Reply"
                >
                  <Reply size={14} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                  title="Copy"
                >
                  <Copy size={14} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDeepAskShare}
                  className="p-1 rounded-lg hover:bg-indigo-50 text-slate-400 hover:text-indigo-500 transition-colors"
                  title="Deep Ask Share"
                >
                  <Brain size={14} />
                </motion.button>
              </div>
            </div>
          </div>
          <img
            src={share.replyAvatar}
            alt="futurdoom"
            className="w-10 h-10 rounded-xl ring-2 ring-blue-300 shadow-md"
          />
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-blue-100">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
            <MessageCircle size={14} />
            Reply
          </button>
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
    </div>
  );
};

export default ShareItem;