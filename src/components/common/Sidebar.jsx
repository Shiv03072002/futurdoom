import React, { useState } from "react";
import { MapPin, Github, Twitter, Linkedin, Heart, MessageSquare, Sparkles, Send, X, UserPlus, UserCheck } from "lucide-react";

const Sidebar = () => {
  const [showInterestedList, setShowInterestedList] = useState(false);
  const [showInterestingList, setShowInterestingList] = useState(false);

  // Users interested in Shiv's profile
  const interestedInMe = [
    { id: 1, name: "Dipankar Porey", avatar: "https://i.pravatar.cc/40?img=1", role: "Frontend Developer", mutual: true },
    { id: 2, name: "Sneha Rao", avatar: "https://i.pravatar.cc/40?img=3", role: "Backend Developer", mutual: false },
    { id: 3, name: "Priya Patel", avatar: "https://i.pravatar.cc/40?img=5", role: "Data Scientist", mutual: true },
  ];

  // Users Shiv is interested in
  const iAmInterestedIn = [
    { id: 4, name: "Aarav Mehta", avatar: "https://i.pravatar.cc/40?img=2", role: "UI/UX Designer", mutual: true },
    { id: 5, name: "Rahul Sharma", avatar: "https://i.pravatar.cc/40?img=4", role: "Product Manager", mutual: false },
    { id: 6, name: "Amit Kumar", avatar: "https://i.pravatar.cc/40?img=6", role: "DevOps Engineer", mutual: true },
  ];

  const handleInterestedClick = () => {
    setShowInterestedList(!showInterestedList);
    setShowInterestingList(false);
  };

  const handleInterestingClick = () => {
    setShowInterestingList(!showInterestingList);
    setShowInterestedList(false);
  };

  return (
    <div className="flex items-start justify-center">
      
      {/* Card */}
      <div className="bg-white rounded-xl border border-blue-50 w-full max-w-md overflow-hidden relative">
        
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
            {/* Interested Button - Shows who are interested in Shiv */}
            <button
              onClick={handleInterestedClick}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200
                ${showInterestedList 
                  ? "bg-pink-50 text-pink-600 border border-pink-200" 
                  : "bg-gradient-to-r from-pink-400 to-rose-500 text-white shadow-md shadow-pink-300/30 hover:shadow-lg hover:shadow-pink-400/40 hover:-translate-y-0.5"
                }`}
            >
              <Heart size={14} fill={showInterestedList ? "currentColor" : "none"} />
              Interested
              {interestedInMe.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded-full text-[10px]">
                  {interestedInMe.length}
                </span>
              )}
            </button>

            {/* Interesting Button - Shows who Shiv is interested in */}
            <button
              onClick={handleInterestingClick}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200
                ${showInterestingList 
                  ? "bg-blue-50 text-blue-600 border border-blue-200" 
                  : "bg-gradient-to-r from-blue-500 to-blue-900 text-white shadow-md shadow-blue-300/30 hover:shadow-lg hover:shadow-blue-400/40 hover:-translate-y-0.5"
                }`}
            >
              <UserPlus size={14} />
              Interesting
              {iAmInterestedIn.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded-full text-[10px]">
                  {iAmInterestedIn.length}
                </span>
              )}
            </button>
          </div>

          {/* Interested In Me List - People interested in Shiv's profile */}
          {showInterestedList && (
            <div className="mt-4 border border-pink-100 rounded-xl overflow-hidden bg-white shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-3 border-b border-pink-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart size={14} className="text-pink-500" fill="currentColor" />
                    <span className="text-xs font-semibold text-slate-600">
                      Interested in you ({interestedInMe.length})
                    </span>
                  </div>
                  <button 
                    onClick={() => setShowInterestedList(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
              <div className="max-h-60 overflow-y-auto p-2">
                {interestedInMe.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-pink-50 transition-all duration-200"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-slate-800 line-clamp-1">{user.name}</p>
                        
                      </div>
                     
                    </div>
                    <button className="text-xs bg-pink-500 text-white px-3 py-1 rounded-lg hover:bg-pink-600 transition-colors">
                      Message
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* I'm Interested In List - People Shiv is interested in */}
          {showInterestingList && (
            <div className="mt-4 border border-blue-100 rounded-xl overflow-hidden bg-white shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 border-b border-blue-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCheck size={14} className="text-blue-500" />
                    <span className="text-xs font-semibold text-slate-600">
                      You're interested in ({iAmInterestedIn.length})
                    </span>
                  </div>
                  <button 
                    onClick={() => setShowInterestingList(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
              <div className="max-h-60 overflow-y-auto p-2">
                {iAmInterestedIn.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-slate-800 line-clamp-1">{user.name}</p>
                        
                      </div>
                     
                    </div>
                    <button className="text-xs bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors">
                      Message
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

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