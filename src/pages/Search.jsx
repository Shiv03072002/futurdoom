import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon, Sparkles, Star, Zap, User, Users } from "lucide-react";
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
    posts: 89,
    interest: "interested" // User is interested in this person
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
    posts: 234,
    interest: "interesting" // This person is interesting to the user
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
    posts: 56,
    interest: null
  },
  { 
    id: 4, 
    name: "Rajesh Kumar", 
    location: "Delhi, India", 
    initials: "RK", 
    color: "from-purple-400 to-pink-500",
    username: "rajesh_kumar",
    bio: "Data Scientist | ML Engineer | Researcher",
    followers: 2100,
    following: 456,
    posts: 167,
    interest: "interested"
  },
  { 
    id: 5, 
    name: "Priya Sharma", 
    location: "Pune, India", 
    initials: "PS", 
    color: "from-amber-400 to-orange-500",
    username: "priya_sharma",
    bio: "Content Creator | Digital Marketer | Storyteller",
    followers: 5670,
    following: 789,
    posts: 412,
    interest: "interesting"
  },
];

const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [userInterests, setUserInterests] = useState(users);
  const [activeTab, setActiveTab] = useState("all"); // "all", "interested", "interesting"

  const filtered = userInterests.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(query.toLowerCase());
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "interested") return matchesSearch && u.interest === "interested";
    if (activeTab === "interesting") return matchesSearch && u.interest === "interesting";
    return matchesSearch;
  });

  const handleUserClick = (user) => {
    navigate(`/profile/${user.username}`, { state: { user } });
  };

  const handleInterestToggle = (userId, type) => {
    setUserInterests(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, interest: user.interest === type ? null : type }
          : user
      )
    );
  };

  // Count statistics
  const interestedCount = userInterests.filter(u => u.interest === "interested").length;
  const interestingCount = userInterests.filter(u => u.interest === "interesting").length;

  return (
    <div className="min-h-screen  flex items-start justify-center">
      {/* Card */}
      <div className="bg-white rounded-xl border border-blue-50 w-full  overflow-hidden">
        
        {/* Card Header */}
        <div className="bg-gradient-to-br from-[#0f1f6e] via-[#1a3aad] to-[#2563eb] p-6 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5 animate-pulse" />
          <div className="absolute bottom-0 left-1/2 w-24 h-24 rounded-full bg-blue-400/10 animate-pulse" />
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "32px 32px"
            }}
          />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-[2px] bg-blue-300 animate-pulse" />
              <span className="text-blue-200 text-xs tracking-[0.2em] uppercase font-medium">Discover</span>
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
          <div className="relative mb-4">
            <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search people..."
              className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200"
            />
          </div>

          {/* Interest Tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                activeTab === "all"
                  ? "bg-blue-500 text-white shadow-md shadow-blue-500/30"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Users size={14} />
              All
            </button>
            <button
              onClick={() => setActiveTab("interested")}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                activeTab === "interested"
                  ? "bg-pink-500 text-white shadow-md shadow-pink-500/30"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Star size={14} />
              Interested ({interestedCount})
            </button>
            <button
              onClick={() => setActiveTab("interesting")}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                activeTab === "interesting"
                  ? "bg-amber-500 text-white shadow-md shadow-amber-500/30"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Zap size={14} />
              Interesting ({interestingCount})
            </button>
          </div>

          {/* Results label */}
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-blue-500 tracking-[0.2em] uppercase">
              {query ? "Search Results" : activeTab === "all" ? "All People" : activeTab === "interested" ? "People You're Interested In" : "Interesting People"}
            </p>
            <span className="text-xs text-slate-400">{filtered.length} found</span>
          </div>

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
                  onInterestToggle={handleInterestToggle}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User size={24} className="text-slate-300" />
                </div>
                <p className="text-sm text-slate-400 mb-1">No users found</p>
                <p className="text-xs text-slate-300">Try adjusting your search or filters</p>
              </div>
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