import React, { useState } from "react";
import { Calendar, Sparkles, Share2, ArrowRight, Trash2, Reply, Copy,Heart, Brain, Settings, CheckCheck, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ShareItem = ({ share, onDelete }) => {
  const navigate = useNavigate();
  const [expandedMessages, setExpandedMessages] = useState({});

  const handleDelete = () => {
    if (onDelete) {
      onDelete(share.id);
    }
  };

  const handleDeepAskShare = () => {
    navigate("/chat");
  };

  const handleOpenDeepPage = () => {
    navigate(`/thread/${share.id}`, { 
  state: { 
    thread: {
      id: share.id,
      userMessage: share.message,
      aiResponse: share.reply,
      time: share.time,
      responseTime: share.replyTime,
      context: "full-conversation"
    }
  } 
});
  };

  const toggleMessage = (messageId) => {
    setExpandedMessages(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }));
  };

  // Truncate message function
  const truncateMessage = (text, limit = 100) => {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + "...";
  };

  // Check if message is long
  const isLongMessage = (text) => text.length > 100;

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
    
    <div className="flex items-center gap-2">
      {/* Share Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="p-1.5 rounded-lg hover:bg-white text-slate-500 hover:text-blue-600 transition-colors"
        title="Share"
      >
        <Share2 size={14} />
      </motion.button>
      
      {/* Delete Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="p-1.5 rounded-lg hover:bg-white text-slate-500 hover:text-red-500 transition-colors"
        title="Delete"
      >
        <Trash2 size={14} />
      </motion.button>
      
      <span className="text-xs text-blue-400 font-medium ml-2">#{share.id}</span>
    </div>
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
  className="p-1.5 rounded-lg hover:bg-pink-50 text-slate-400 hover:text-pink-500 transition-colors"
  title="Like"
>
  <Heart size={14} />
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
                <div>
                  {expandedMessages[`user-${share.id}`] 
                    ? share.message 
                    : truncateMessage(share.message)
                  }
                </div>
                
                {/* Show more/less button for long messages */}
                {isLongMessage(share.message) && (
                  <button
                    onClick={() => toggleMessage(`user-${share.id}`)}
                    className="flex items-center gap-1 text-[10px] text-blue-600 hover:text-blue-700 mt-2 font-medium"
                  >
                    {expandedMessages[`user-${share.id}`] ? (
                      <>Show less <ChevronUp size={12} /></>
                    ) : (
                      <>Show more <ChevronDown size={12} /></>
                    )}
                  </button>
                )}
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
  className="p-1.5 rounded-lg hover:bg-pink-50 text-slate-400 hover:text-pink-500 transition-colors"
  title="Like"
>
  <Heart size={14} />
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
                <div>
                  {expandedMessages[`ai-${share.id}`] 
                    ? share.reply 
                    : truncateMessage(share.reply)
                  }
                </div>

                {/* Show more/less button for long messages */}
                {isLongMessage(share.reply) && (
                  <button
                    onClick={() => toggleMessage(`ai-${share.id}`)}
                    className="flex items-center gap-1 text-[10px] text-blue-200 hover:text-white mt-2 font-medium mx-auto"
                  >
                    {expandedMessages[`ai-${share.id}`] ? (
                      <>Show less <ChevronUp size={12} /></>
                    ) : (
                      <>Show more <ChevronDown size={12} /></>
                    )}
                  </button>
                )}
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

        {/* Continue Reading Wrapper - Clickable */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleOpenDeepPage}
          className="cursor-pointer group"
        >
          <div className="bg-gradient-to-b from-blue-50/50 to-white rounded-xl border border-blue-100 p-4 hover:border-blue-300 transition-all duration-300">
            {/* Header with icon */}
          <div className="flex items-center gap-2 mb-3">
  <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
    <Brain size={12} className="text-blue-600" />
  </div>
  <span className="text-xs font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
    Continue reading...
  </span>
  <ArrowRight size={12} className="text-blue-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all ml-auto" />
</div>

            {/* Next Q&A Preview with smaller font */}
            <div className="space-y-3">
              {/* Next User Question */}
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[8px] font-medium text-slate-500">U</span>
                </div>
                <div className="flex-1">
                  <p className="text-[11px] text-slate-500 mb-1">Next question</p>
                  <p className="text-xs text-slate-700 bg-white/80 p-2 rounded-lg border border-blue-50">
                    Can you show me a complete example with CSS?
                  </p>
                </div>
              </div>

              {/* Next AI Response */}
              <div className="flex items-start gap-2 justify-end">
                <div className="flex-1 text-right">
                  <p className="text-[11px] text-slate-500 mb-1">AI response</p>
                  <p className="text-xs text-blue-700 bg-blue-50/80 p-2 rounded-lg border border-blue-100">
                    Absolutely! Here's a complete example with responsive design...
                  </p>
                </div>
                <div className="w-5 h-5 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles size={8} className="text-blue-600" />
                </div>
              </div>
            </div>

            {/* Click hint */}
            <p className="text-[9px] text-slate-400 text-center mt-3">
              Click to view full conversation
            </p>
          </div>
        </motion.div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-2 pt-4 border-t border-blue-100">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
            <Share2 size={14} />
            Share
          </button>
          <button 
            onClick={handleOpenDeepPage}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-md hover:shadow-lg transition-all duration-200"
          >
            View Thread
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ShareItem;