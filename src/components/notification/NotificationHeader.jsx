import React from "react";
import { Sparkles } from "lucide-react";

const NotificationHeader = ({ unreadCount }) => {
  return (
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
          <span className="text-blue-200 text-xs tracking-[0.2em] uppercase font-medium">Updates</span>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Notifications
            <Sparkles size={18} className="text-blue-300" />
          </h2>
          {unreadCount > 0 && (
            <span className="bg-white/20 text-white text-xs font-semibold px-2 py-1 rounded-full border border-white/30">
              {unreadCount} unread
            </span>
          )}
        </div>
        <p className="text-blue-100/70 text-sm mt-1 leading-relaxed">
          Stay updated with your activity
        </p>
      </div>
    </div>
  );
};

export default NotificationHeader;