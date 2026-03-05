import React from "react";
import { Share2, MessageCircle } from "lucide-react";

const ShareHeader = ({ totalConversations }) => {
  return (
    <div className="bg-gradient-to-br from-[#0f1f6e] via-[#1a3aad] to-[#2563eb] p-4 sm:p-5 md:p-6 relative overflow-hidden sticky top-0 rounded-t-xl">
      {/* Decorative elements - responsive sizing */}
      <div className="absolute -top-10 -right-10 w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 rounded-full bg-white/5" />
      <div className="absolute bottom-0 left-1/2 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-full bg-blue-400/10" />
      
      {/* Grid pattern - fixed */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "32px 32px", // Fixed size
        }}
      />
      
      <div className="relative">
        {/* Badge - responsive */}
        <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
          <div className="w-3 sm:w-4 h-[2px] bg-blue-300" />
          <span className="text-blue-200 text-[8px] sm:text-[10px] md:text-xs tracking-[0.2em] uppercase font-medium">
            Community
          </span>
        </div>

        {/* Main header - responsive layout */}
        <div className="flex flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-1.5 sm:gap-2">
            <span>Share & Connect</span>
            <Share2 size={14} className="text-blue-300 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          </h2>
          
          {/* Conversation count badge - responsive */}
          <span className="bg-white/20 text-white text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/30 flex items-center gap-1 w-fit">
            <MessageCircle size={10} className="sm:w-3 sm:h-3" />
            <span>{totalConversations} conversations</span>
          </span>
        </div>

        {/* Subtitle - responsive */}
        <p className="text-blue-100/70 text-[10px] sm:text-xs md:text-sm mt-1 leading-relaxed">
          Latest discussions and replies
        </p>
      </div>
    </div>
  );
};

export default ShareHeader;