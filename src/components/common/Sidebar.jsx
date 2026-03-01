import React, { useState } from "react";
import { MapPin, Github, Twitter, Linkedin, Heart, MessageSquare, Sparkles } from "lucide-react";

const Sidebar = () => {
  const [interested, setInterested] = useState(false);

  return (
    <div className=" flex items-start justify-center ">
      
      {/* Card */}
      <div className="bg-white rounded-xl  border border-blue-50 w-full overflow-hidden">
        
        {/* Card Header - Cover */}
        <div className="bg-gradient-to-br from-[#0f1f6e] via-[#1a3aad] to-[#2563eb] p-8 relative overflow-hidden" style={{ height: 120 }}>
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
          <div className="absolute bottom-0 left-1/2 w-24 h-24 rounded-full bg-blue-400/10" />
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "32px 32px"
            }}
          />
          
         
        </div>

        {/* Avatar — overlaps cover */}
        <div className="flex justify-center" style={{ marginTop: -40 }}>
          <div className="relative">
            <img
              src="https://i.pravatar.cc/120?img=7"
              alt="Shiv Kumar"
              className="rounded-full object-cover ring-4 ring-white"
              style={{
                width: 80,
                height: 80,
                boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
              }}
            />
            <span
              className="absolute rounded-full"
              style={{
                width: 14,
                height: 14,
                background: "#22c55e",
                border: "3px solid #fff",
                bottom: 2,
                right: 2,
                boxShadow: "0 0 0 1px rgba(34,197,94,0.3)",
              }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="p-3 pt-4">
          {/* Name */}
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <h2 className="font-bold text-slate-800 text-lg">Shiv Kumar</h2>
            <Sparkles size={14} className="text-blue-500" />
          </div>

         

          {/* Location */}
          <div className="flex items-center justify-center gap-1.5 text-slate-400 bg-slate-50 py-1.5 px-3 rounded-full w-fit mx-auto">
            <MapPin size={11} />
            <span className="text-xs">San Francisco, CA</span>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-100 my-5" />

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setInterested((v) => !v)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200
                ${interested 
                  ? "bg-blue-50 text-blue-600 border border-blue-200" 
                  : "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-md shadow-blue-300/30 hover:shadow-lg hover:shadow-blue-400/40 hover:-translate-y-0.5"
                }`}
            >
              <Heart size={14} fill={interested ? "currentColor" : "none"} />
              {interested ? "Interested" : "Interested"}
            </button>

            <button
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border border-slate-200 text-slate-700 hover:border-blue-200 hover:bg-blue-50/50"
            >
              <MessageSquare size={14} />
              Message
            </button>
          </div>

          {/* Social icons */}
          <div className="flex justify-center gap-3 mt-6 pt-4 border-t border-slate-100">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-200"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;