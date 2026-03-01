import React from "react";
import { Calendar, Sparkles, MessageCircle, Share2, ArrowRight } from "lucide-react";

const ShareItem = ({ share }) => {
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
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl rounded-tl-none px-5 py-3 inline-block max-w-[80%] border border-blue-100">
              <p className="text-sm text-slate-700">{share.message}</p>
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
            <div className="bg-gradient-to-r from-[#0f1f6e] to-[#2563eb] rounded-2xl rounded-tr-none px-5 py-3 inline-block max-w-[80%] text-white shadow-lg">
              <p className="text-sm">{share.reply}</p>
            </div>
          </div>
          <img
            src={share.replyAvatar}
            alt="futurdoom"
            className="w-10 h-10 rounded-xl ring-2 ring-blue-300 shadow-md"
          />
        </div>

        {/* Actions */}
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