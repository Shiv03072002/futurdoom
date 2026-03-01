import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon, Sparkles } from "lucide-react";
import UserCard from "../components/search/UserCard";

const users = [
  { 
    id: 1, 
    name: "Dipankar Porey", 
    location: "Kolkata, India", 
    initials: "DP", 
    color: "from-pink-400 to-red-400",
    username: "dipankar_porey",
    bio: "Full-stack developer | AI enthusiast | Tech blogger",
    followers: 1240,
    following: 342,
    posts: 89
  },
  { 
    id: 2, 
    name: "Aarav Mehta", 
    location: "Mumbai, India", 
    initials: "AM", 
    color: "from-blue-400 to-indigo-500",
    username: "aarav_mehta",
    bio: "UI/UX Designer | Creative director | Design thinker",
    followers: 3450,
    following: 567,
    posts: 234
  },
  { 
    id: 3, 
    name: "Sneha Rao", 
    location: "Bengaluru, India", 
    initials: "SR", 
    color: "from-emerald-400 to-teal-500",
    username: "sneha_rao",
    bio: "Product Manager | Tech lead | Startup mentor",
    followers: 890,
    following: 234,
    posts: 56
  },
];

const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleUserClick = (user) => {
    navigate(`/profile/${user.username}`, { state: { user } });
  };

  return (
    <div className="min-h-screen flex items-start justify-center">
      {/* Card */}
      <div className="bg-white rounded-xl border border-blue-50 w-full overflow-hidden">
        
        {/* Card Header */}
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
              <span className="text-blue-200 text-xs tracking-[0.2em] uppercase font-medium">Search</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              Find People
              <Sparkles size={18} className="text-blue-300" />
            </h2>
            <p className="text-blue-100/70 text-sm mt-1 leading-relaxed">
              Connect with amazing individuals
            </p>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          {/* Search Input */}
          <div className="relative mb-6">
            <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search people..."
              className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200"
            />
          </div>

          {/* Suggested label */}
          <p className="text-xs font-semibold text-blue-500 tracking-[0.2em] uppercase mb-2">
            {query ? "Results" : "Suggested"}
          </p>

          {/* Divider */}
          <div className="h-px bg-slate-100 mb-1" />

          {/* User List */}
          <div className="divide-y divide-slate-100">
            {filtered.length > 0 ? (
              filtered.map((u) => (
                <UserCard 
                  key={u.id} 
                  user={u} 
                  onUserClick={handleUserClick}
                />
              ))
            ) : (
              <p className="text-sm text-slate-400 text-center py-8">No users found</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <p className="text-xs text-slate-300 text-center">© 2025 futurdoom · Connect with others</p>
        </div>
      </div>
    </div>
  );
};

export default Search;