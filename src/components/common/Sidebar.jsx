import React, { useState } from "react";
import { MapPin, Heart, UserPlus, UserCheck, X } from "lucide-react";

// ── Social links — real colored logos via img ──────────────────────────────────
const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/330px-Instagram_logo_2022.svg.png",
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/240px-2023_Facebook_icon.svg.png",
  },
  {
    name: "X (Twitter)",
    href: "https://twitter.com",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/X_%28formerly_Twitter%29_logo_late_2025.svg/330px-X_%28formerly_Twitter%29_logo_late_2025.svg.png",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
  },
  {
    name: "GitHub",
    href: "https://github.com",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
];

// ── Interest list users ────────────────────────────────────────────────────────
const interestedInMe = [
  { id: 1, name: "Dipankar Porey", avatar: "https://i.pravatar.cc/40?img=1", role: "Frontend Developer", mutual: true },
  { id: 2, name: "Sneha Rao", avatar: "https://i.pravatar.cc/40?img=3", role: "Backend Developer", mutual: false },
  { id: 3, name: "Priya Patel", avatar: "https://i.pravatar.cc/40?img=5", role: "Data Scientist", mutual: true },
];

const iAmInterestedIn = [
  { id: 4, name: "Aarav Mehta", avatar: "https://i.pravatar.cc/40?img=2", role: "UI/UX Designer", mutual: true },
  { id: 5, name: "Rahul Sharma", avatar: "https://i.pravatar.cc/40?img=4", role: "Product Manager", mutual: false },
  { id: 6, name: "Amit Kumar", avatar: "https://i.pravatar.cc/40?img=6", role: "DevOps Engineer", mutual: true },
];

// ── User List Panel ────────────────────────────────────────────────────────────
const UserListPanel = ({ title, icon, users, buttonColor, hoverColor, borderColor, bgGradient, onClose }) => (
  <div className={`mt-4 border ${borderColor} rounded-xl overflow-hidden bg-white shadow-lg`}>
    <div className={`${bgGradient} p-3 border-b ${borderColor}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-xs font-semibold text-slate-600">{title} ({users.length})</span>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
          <X size={14} />
        </button>
      </div>
    </div>
    <div className="max-h-60 overflow-y-auto p-2">
      {users.map((user) => (
        <div key={user.id} className={`flex items-center gap-3 p-2 rounded-lg hover:${hoverColor} transition-all duration-200`}>
          <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-800 truncate">{user.name}</p>
            <p className="text-[10px] text-slate-400 truncate">{user.role}</p>
          </div>
          {user.mutual && (
            <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-100 shrink-0">
              Mutual
            </span>
          )}
          <button className={`text-xs ${buttonColor} text-white px-3 py-1 rounded-lg transition-colors shrink-0`}>
            Message
          </button>
        </div>
      ))}
    </div>
  </div>
);

// ── Main Component ─────────────────────────────────────────────────────────────
const Sidebar = () => {
  const [showInterestedList, setShowInterestedList] = useState(false);
  const [showInterestingList, setShowInterestingList] = useState(false);

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
      <div className="bg-white rounded-xl border border-blue-50 w-full max-w-md overflow-hidden relative">

        {/* Cover */}
        <div
          className="bg-gradient-to-br from-[#0f1f6e] via-[#1a3aad] to-[#2563eb] relative overflow-hidden"
          style={{ height: 120 }}
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
          <div className="absolute bottom-0 left-1/2 w-24 h-24 rounded-full bg-blue-400/10" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.3) 1px,transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* Avatar — left-aligned, overlaps cover */}
        <div className="px-5" style={{ marginTop: -40 }}>
          <div className="relative inline-block">
            <img
              src="https://i.pravatar.cc/120?img=7"
              alt="Shiv Kumar"
              className="rounded-full object-cover ring-4 ring-white"
              style={{ width: 80, height: 80, boxShadow: "0 8px 20px rgba(0,0,0,0.12)" }}
            />
            <span
              className="absolute rounded-full"
              style={{
                width: 14, height: 14,
                background: "#22c55e",
                border: "3px solid #fff",
                bottom: 2, right: 2,
                boxShadow: "0 0 0 1px rgba(34,197,94,0.3)",
              }}
            />
          </div>
        </div>

        {/* Body */}
        <div className="px-5 pt-3 pb-5">

          {/* Name — left aligned */}
          <h2 className="font-bold text-slate-800 text-lg mb-1">Shiv Kumar</h2>

          {/* Location — left aligned, no pill */}
          <div className="flex items-center gap-1.5 text-blue-500 mb-4">
            <MapPin size={12} />
            <span className="text-xs">San Francisco, CA</span>
          </div>

          {/* About Section */}
          <div className="p-3 border rounded-sm border-slate-100 mb-4 ">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">About</p>
            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
              Full-stack engineer with 6+ years building scalable web products. Passionate about open-source, clean architecture, and shipping things people love. ☕
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-100 mb-4" />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleInterestedClick}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer
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

            <button
              onClick={handleInterestingClick}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer
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

          {/* Interested In Me Panel */}
          {showInterestedList && (
            <UserListPanel
              title="Interested in you"
              icon={<Heart size={14} className="text-pink-500" fill="currentColor" />}
              users={interestedInMe}
              buttonColor="bg-pink-500 hover:bg-pink-600"
              hoverColor="bg-pink-50"
              borderColor="border-pink-100"
              bgGradient="bg-gradient-to-r from-pink-50 to-rose-50"
              onClose={() => setShowInterestedList(false)}
            />
          )}

          {/* I'm Interested In Panel */}
          {showInterestingList && (
            <UserListPanel
              title="You're interested in"
              icon={<UserCheck size={14} className="text-blue-500" />}
              users={iAmInterestedIn}
              buttonColor="bg-blue-500 hover:bg-blue-600"
              hoverColor="bg-blue-50"
              borderColor="border-blue-100"
              bgGradient="bg-gradient-to-r from-blue-50 to-indigo-50"
              onClose={() => setShowInterestingList(false)}
            />
          )}

          {/* Social Icons */}
          <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.name}
                className="w-7 h-7 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center hover:scale-110 hover:shadow-md transition-all duration-200"
              >
                <img src={social.img} alt={social.name} className="w-5 h-5 object-contain" />
              </a>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Sidebar;