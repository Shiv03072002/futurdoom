import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Search,
  Home,
  User,
  PlayCircle,
  Bell,
  Menu as MenuIcon,
  Settings,
  MessageCircle,
  Users,
  HelpCircle,
  X,
  Sparkles,
  ChevronUp,
  LogOut,
  Star,
  Heart
} from "lucide-react";

const navItems = [
  { to: "/searchpeople", icon: Search, tooltip: "Search" },
  { to: "/chatbotmain", icon: Home, tooltip: "Home" },
  { to: "/profile", icon: User, tooltip: "Me", isProfile: true },
  { to: "/share", icon: PlayCircle, tooltip: "Share" },
  { to: "/notification", icon: Bell, tooltip: "Notifications", badge: true },
];

const profileMenuItems = [
  { to: "/profile", icon: User, tooltip: "My Profile", color: "from-blue-400 to-blue-600" },
  { to: "/settings", icon: Settings, tooltip: "Settings", color: "from-purple-400 to-purple-600" },
  { to: "/groups", icon: Users, tooltip: "Groups", color: "from-green-400 to-green-600" },
  { to: "/discussion", icon: MessageCircle, tooltip: "Discussion", color: "from-orange-400 to-orange-600" },
  { to: "/contact", icon: HelpCircle, tooltip: "Contact", color: "from-pink-400 to-pink-600" },
  { to: "/about", icon: Star, tooltip: "About Us", color: "from-indigo-400 to-indigo-600" },
  { to: "/favorites", icon: Heart, tooltip: "Favorites", color: "from-red-400 to-red-600" },
  { to: "/logout", icon: LogOut, tooltip: "Logout", color: "from-gray-400 to-gray-600" },
];

const MobileTabBar = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const menuRef = useRef();
  const profileRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && 
          profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setProfileMenuOpen(false);
    setExpanded(false);
  }, [location]);

  const handleProfileClick = (e) => {
    e.preventDefault();
    setProfileMenuOpen(!profileMenuOpen);
    setExpanded(!expanded);
  };

  const isProfileActive = location.pathname === "/profile";

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-blue-100 shadow-lg md:hidden z-50">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            if (item.isProfile) {
              return (
                <button
                  key={item.to}
                  ref={profileRef}
                  onClick={handleProfileClick}
                  className="flex flex-col items-center justify-center relative flex-1"
                >
                  <div className="relative">
                    <div className={`p-1.5 rounded-lg transition-all duration-200 ${
                      profileMenuOpen || isProfileActive
                        ? "text-blue-600" 
                        : "text-slate-400 hover:text-blue-500"
                    }`}>
                      <User size={22} strokeWidth={profileMenuOpen || isProfileActive ? 2.2 : 1.8} />
                    </div>
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full ring-2 ring-white">
                        3
                      </span>
                    )}
                  </div>
                  <span className={`text-[9px] mt-0.5 font-medium flex items-center gap-0.5 ${
                    profileMenuOpen || isProfileActive ? "text-blue-600" : "text-slate-400"
                  }`}>
                    {item.tooltip}
                    <ChevronUp 
                      size={10} 
                      className={`transition-transform duration-200 ${
                        profileMenuOpen ? "rotate-180" : ""
                      }`} 
                    />
                  </span>
                  {(profileMenuOpen || isProfileActive) && (
                    <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-[#1a3aad] to-[#2563eb] rounded-full" />
                  )}
                </button>
              );
            }

            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex flex-col items-center justify-center relative flex-1"
              >
                <div className="relative">
                  <div className={`p-1.5 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? "text-blue-600" 
                      : "text-slate-400 hover:text-blue-500"
                  }`}>
                    <item.icon size={22} strokeWidth={isActive ? 2.2 : 1.8} />
                  </div>
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full ring-2 ring-white">
                      3
                    </span>
                  )}
                </div>
                <span className={`text-[9px] mt-0.5 font-medium ${
                  isActive ? "text-blue-600" : "text-slate-400"
                }`}>
                  {item.tooltip}
                </span>
                {isActive && (
                  <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-[#1a3aad] to-[#2563eb] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Profile Menu Overlay */}
      {profileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setProfileMenuOpen(false)}
          />
          
          {/* Profile Menu Panel */}
          <div 
            ref={menuRef}
            className="fixed bottom-20 left-4 right-4 bg-white rounded-2xl shadow-2xl shadow-blue-500/20 border border-blue-100 z-50 md:hidden animate-in slide-in-from-bottom duration-300 max-h-[70vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-br from-[#0f1f6e] via-[#1a3aad] to-[#2563eb] rounded-t-2xl relative overflow-hidden sticky top-0">
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
                  backgroundSize: "24px 24px"
                }}
              />
              <div className="relative flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">FD</span>
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold flex items-center gap-1 text-lg">
                    futurdoom
                    <Sparkles size={14} className="text-blue-200" />
                  </p>
                  <p className="text-blue-200 text-xs">@futurdoom · Online</p>
                </div>
                <button 
                  onClick={() => setProfileMenuOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-3 mt-4">
                <div className="flex-1 bg-white/10 rounded-lg px-3 py-2">
                  <p className="text-white text-sm font-bold">128</p>
                  <p className="text-blue-200 text-[10px]">Posts</p>
                </div>
                <div className="flex-1 bg-white/10 rounded-lg px-3 py-2">
                  <p className="text-white text-sm font-bold">2.1k</p>
                  <p className="text-blue-200 text-[10px]">Followers</p>
                </div>
                <div className="flex-1 bg-white/10 rounded-lg px-3 py-2">
                  <p className="text-white text-sm font-bold">420</p>
                  <p className="text-blue-200 text-[10px]">Following</p>
                </div>
              </div>
            </div>

            {/* Menu Items Grid */}
            <div className="p-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">
                ✦ Your Menu
              </p>
              <div className="grid grid-cols-4 gap-3">
                {profileMenuItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:shadow-md transition-all duration-200 group"
                    style={{
                      background: location.pathname === item.to 
                        ? "linear-gradient(135deg, #1a3aad, #2563eb)" 
                        : "#f8fafc",
                    }}
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform`}>
                      <item.icon size={16} />
                    </div>
                    <span className={`text-[9px] font-medium text-center ${
                      location.pathname === item.to ? "text-white" : "text-slate-600"
                    }`}>
                      {item.tooltip}
                    </span>
                  </Link>
                ))}
              </div>

              {/* View Profile Button */}
              <Link
                to="/profile"
                onClick={() => setProfileMenuOpen(false)}
                className="mt-4 block text-center py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-md hover:shadow-lg transition-all"
              >
                View Full Profile
              </Link>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-blue-100">
              <p className="text-[10px] text-slate-400 text-center">
                © 2025 futurdoom · v1.0
              </p>
            </div>
          </div>
        </>
      )}

      {/* Spacer for content */}
      <div className="h-16 md:hidden" />
    </>
  );
};

export default MobileTabBar;