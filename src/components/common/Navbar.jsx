import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Search,
  Home,
  User,
  PlayCircle,
  Bell,
  X,
  Settings,
  MessageCircle,
  Users,
  HelpCircle,
  ChevronDown,
  Sparkles,
  LogOut
} from "lucide-react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";

const navItems = [
  { to: "/searchpeople", icon: Search, tooltip: "Search" },
  { to: "/chatbotmain", icon: Home, tooltip: "Home" },
  { to: "/profile", icon: User, tooltip: "Me", isProfile: true },
  { to: "/share", icon: PlayCircle, tooltip: "Share" },
  { to: "/notification", icon: Bell, tooltip: "Notifications", badge: true },
];

const profileMenuItems = [
  { to: "/profile", icon: User, tooltip: "Profile" },
  { to: "/settings", icon: Settings, tooltip: "Settings" },
  { to: "/groups", icon: Users, tooltip: "Groups" },
  { to: "/discussion", icon: MessageCircle, tooltip: "Discussion" },
  { to: "/contact", icon: HelpCircle, tooltip: "Contact" },
  { to: "/about", icon: PlayCircle, tooltip: "Visit Us" },
];

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef();
  const profileButtonRef = useRef();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileRef.current && !profileRef.current.contains(e.target) &&
        profileButtonRef.current && !profileButtonRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setProfileOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-blue-500/10 border-b border-blue-100" 
            : "bg-white border-b border-blue-50"
        }`}
      >
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src="https://futurdoom.com/assets/gemini242-B2wd8wXY.png"
                alt="FuturDoom Logo"
                className="w-10 h-10 object-contain"
              />
              <h1 className="text-3xl tracking-wide leading-none font-medium">
                <span className="text-slate-800 font-medium">futur</span>
                <span className="bg-[#2364eb] bg-clip-text text-transparent inline-block font-bold">
                  DooM
                </span>
              </h1>
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex items-center h-full">
              {navItems.map((item) => {
                const isActive = location.pathname === item.to;
                
                if (item.isProfile) {
                  return (
                    <div key={item.to} className="relative h-full">
                      <button
                        ref={profileButtonRef}
                        onClick={() => setProfileOpen(!profileOpen)}
                        className={`flex items-center gap-1.5 px-5 h-full transition-all duration-200 relative group ${
                          isActive || profileOpen ? "text-[#1a3aad]" : "text-slate-600 hover:text-[#2563eb]"
                        }`}
                      >
                        {/* Active indicator */}
                        <span 
                          className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1a3aad] to-[#2563eb] transition-opacity duration-200 ${
                            isActive || profileOpen ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                          }`} 
                        />
                        
                        <div className="relative">
                          <User size={20} strokeWidth={1.75} />
                          {item.badge && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                          )}
                        </div>
                        <span className="text-sm font-medium flex items-center gap-0.5">
                          {item.tooltip}
                          <ChevronDown 
                            size={14} 
                            className={`transition-transform duration-200 ${
                              profileOpen ? "rotate-180" : ""
                            }`}
                          />
                        </span>
                      </button>

                      {/* Profile Dropdown */}
                      {profileOpen && ReactDOM.createPortal(
                        <motion.div
                          ref={profileRef}
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          className="fixed z-[100] w-96"
                          style={{
                            top: profileButtonRef.current?.getBoundingClientRect().bottom + 8,
                            left: profileButtonRef.current?.getBoundingClientRect().right - 384,
                          }}
                        >
                          <div className="bg-white rounded-2xl shadow-2xl shadow-blue-500/20 border border-blue-100 overflow-hidden">
                            {/* Header with gradient */}
                            <div className="bg-gradient-to-br from-[#0f1f6e] via-[#1a3aad] to-[#2563eb] p-5 relative">
                              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                              <div className="relative">
                                <div className="flex items-center gap-4">
                                  <motion.div 
                                    className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white font-bold text-2xl"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                  >
                                    FD
                                  </motion.div>
                                  <div className="flex-1">
                                    <p className="text-white font-semibold flex items-center gap-1 text-lg">
                                      futurDooM User
                                      <Sparkles size={14} className="text-blue-200" />
                                    </p>
                                    <p className="text-blue-200 text-xs">@futurdoom</p>
                                    
                                    
                                   
                                  </div>
                                </div>
                                
                                <motion.div
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  className="mt-3"
                                >
                                  <Link
                                    to="/profile"
                                    onClick={() => setProfileOpen(false)}
                                    className="block text-center py-2 rounded-xl text-xs font-semibold bg-white/20 text-white border border-white/30 hover:bg-white/30 transition-all"
                                  >
                                    View Full Profile
                                  </Link>
                                </motion.div>
                              </div>
                            </div>

                            <div className="p-5">
                              {/* Grid layout - 3 columns */}
                              <div className="grid grid-cols-3 gap-3">
                                {profileMenuItems.map((menuItem, idx) => (
                                  <motion.div
                                    key={menuItem.to}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.03 }}
                                    whileHover={{ y: -3, scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <Link
                                      to={menuItem.to}
                                      onClick={() => setProfileOpen(false)}
                                      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group"
                                    >
                                      <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 group-hover:from-blue-100 group-hover:to-indigo-100 flex items-center justify-center text-blue-600 shadow-sm">
                                        <menuItem.icon size={18} />
                                      </span>
                                      <span className="text-[11px] font-medium text-slate-600 group-hover:text-blue-600 text-center">
                                        {menuItem.tooltip}
                                      </span>
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>

                              {/* Quick actions footer */}
                              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                  <span className="text-[10px] text-slate-500">Active now</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] text-slate-400">v2.0</span>
                                  <span className="text-slate-300">•</span>
                                  <Link to="/privacy" className="text-[10px] text-blue-600 hover:underline">Privacy</Link>
                                  <span className="text-slate-300">•</span>
                                  <Link to="/terms" className="text-[10px] text-blue-600 hover:underline">Terms</Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>,
                        document.body
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-1.5 px-5 h-full transition-all duration-200 relative group ${
                      isActive ? "text-[#1a3aad]" : "text-slate-600 hover:text-[#2563eb]"
                    }`}
                  >
                    <span 
                      className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1a3aad] to-[#2563eb] transition-opacity duration-200 ${
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                      }`} 
                    />
                    <div className="relative">
                      <item.icon size={20} strokeWidth={1.75} />
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{item.tooltip}</span>
                  </Link>
                );
              })}
            </div>

            {/* Right Section - Only Close Icon */}
            <div className="flex items-center gap-2">
              <Link
                to="/close"
                className="flex items-center gap-1.5 px-3 md:px-4 h-9 rounded-lg text-slate-600 hover:text-[#2563eb] hover:bg-blue-50 transition-all duration-200"
              >
                <LogOut size={18} strokeWidth={1.75} />
                <span className="hidden md:inline text-sm font-medium">Close</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;