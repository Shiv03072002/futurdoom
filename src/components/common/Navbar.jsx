import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Search,
  Home,
  User,
  PlayCircle,
  Bell,
  LogOut,
  Settings,
  MessageCircle,
  Users,
  HelpCircle,
  Menu,
  X,
  ChevronDown,
  Sparkles,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    setMobileMenuOpen(false);
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
            {/* Logo - hides text on mobile, shows on desktop */}
            <Link to="/" className="flex items-center gap-2">
              {/* Logo Image */}
              <img
                src="https://futurdoom.com/assets/gemini242-B2wd8wXY.png"
                alt="FuturDoom Logo"
                className="w-12 h-12 md:w-10 md:h-10 object-contain"
              />

              {/* Logo Text - hidden on mobile, visible on md and up */}
              <h1 className="hidden md:block text-3xl tracking-wide leading-none font-medium">
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
                                    
                                    {/* Stats row */}
                                    <div className="flex items-center gap-3 mt-2">
                                      <div className="flex items-center gap-1">
                                        <span className="text-white font-bold text-sm">128</span>
                                        <span className="text-[9px] text-blue-200">posts</span>
                                      </div>
                                      <span className="text-blue-300/30">|</span>
                                      <div className="flex items-center gap-1">
                                        <span className="text-white font-bold text-sm">2.1k</span>
                                        <span className="text-[9px] text-blue-200">Interested</span>
                                      </div>
                                    </div>
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

            {/* Mobile Center Navigation with Text - Improved for better fit */}
            <div className="flex md:hidden items-center justify-center flex-1 gap-2 sm:gap-4">
  <Link 
    to="/searchpeople" 
    className={`flex flex-col items-center px-1 sm:px-2 transition-all duration-200 group ${
      location.pathname === "/searchpeople" 
        ? "text-[#2563eb]" 
        : "text-slate-500 hover:text-[#2563eb]"
    }`}
  >
    <div className={`relative p-1 rounded-lg transition-all duration-200 ${
      location.pathname === "/searchpeople" 
        ? "bg-blue-50" 
        : "group-hover:bg-blue-50/50"
    }`}>
      <Search size={20} className="transition-transform duration-200 group-hover:scale-110" />
      {location.pathname === "/searchpeople" && (
        <motion.div 
          layoutId="mobileActiveIndicator"
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#2563eb] rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </div>
    <span className={`text-[9px] sm:text-xs font-medium mt-1 transition-colors duration-200 ${
      location.pathname === "/searchpeople" 
        ? "text-[#2563eb] font-semibold" 
        : "text-slate-500 group-hover:text-[#2563eb]"
    }`}>
      Search
    </span>
  </Link>

  <Link 
    to="/groups" 
    className={`flex flex-col items-center px-1 sm:px-2 transition-all duration-200 group ${
      location.pathname === "/groups" 
        ? "text-[#2563eb]" 
        : "text-slate-500 hover:text-[#2563eb]"
    }`}
  >
    <div className={`relative p-1 rounded-lg transition-all duration-200 ${
      location.pathname === "/groups" 
        ? "bg-blue-50" 
        : "group-hover:bg-blue-50/50"
    }`}>
      <Users size={20} className="transition-transform duration-200 group-hover:scale-110" />
      {location.pathname === "/groups" && (
        <motion.div 
          layoutId="mobileActiveIndicator"
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#2563eb] rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </div>
    <span className={`text-[9px] sm:text-xs font-medium mt-1 transition-colors duration-200 ${
      location.pathname === "/groups" 
        ? "text-[#2563eb] font-semibold" 
        : "text-slate-500 group-hover:text-[#2563eb]"
    }`}>
      Groups
    </span>
  </Link>

  <Link 
    to="/discussion" 
    className={`flex flex-col items-center px-1 sm:px-2 transition-all duration-200 group ${
      location.pathname === "/discussion" 
        ? "text-[#2563eb]" 
        : "text-slate-500 hover:text-[#2563eb]"
    }`}
  >
    <div className={`relative p-1 rounded-lg transition-all duration-200 ${
      location.pathname === "/discussion" 
        ? "bg-blue-50" 
        : "group-hover:bg-blue-50/50"
    }`}>
      <MessageCircle size={20} className="transition-transform duration-200 group-hover:scale-110" />
      {location.pathname === "/discussion" && (
        <motion.div 
          layoutId="mobileActiveIndicator"
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#2563eb] rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </div>
    <span className={`text-[9px] sm:text-xs font-medium mt-1 transition-colors duration-200 ${
      location.pathname === "/discussion" 
        ? "text-[#2563eb] font-semibold" 
        : "text-slate-500 group-hover:text-[#2563eb]"
    }`}>
      Discussion
    </span>
  </Link>
</div>

            {/* Right Section - Improved mobile layout */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Desktop Logout */}
              <Link
                to="/close"
                className="hidden md:flex items-center gap-1.5 px-4 h-9 rounded-lg text-slate-600 hover:text-[#2563eb] hover:bg-blue-50 transition-all duration-200"
              >
                <LogOut size={18} strokeWidth={1.75} />
                <span className="text-sm font-medium">Logout</span>
              </Link>

              {/* Mobile Actions */}
              <div className="flex md:hidden items-center gap-1">
               

                {/* Menu Toggle - Shows X when open, Menu when closed */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="w-9 h-9 rounded-lg bg-blue-50 text-[#2563eb] flex items-center justify-center hover:bg-blue-100 transition-colors"
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                >
                  {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Improved design */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 md:hidden">
          {/* Backdrop with blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl shadow-blue-500/20 overflow-y-auto"
          >
            <div className="p-5">
              
              {/* Mobile User Card */}
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-[#0f1f6e] to-[#2563eb] relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white font-bold">
                      FD
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">futurDooM User</p>
                      <p className="text-blue-200 text-[10px]">@futurdoom</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[8px] text-blue-200">128 posts</span>
                        <span className="text-blue-300/30">•</span>
                        <span className="text-[8px] text-blue-200">2.1k interested</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation Sections */}
              <div className="space-y-4">
                {/* Main Menu */}
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">Main Menu</p>
                  <div className="space-y-1">
                    {navItems.map((item) => {
                      const isActive = location.pathname === item.to;
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                            isActive
                              ? "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-md"
                              : "text-slate-600 hover:bg-blue-50"
                          }`}
                        >
                          <div className="relative">
                            <item.icon size={18} />
                            {item.badge && (
                              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                            )}
                          </div>
                          <span className="text-sm font-medium">{item.tooltip}</span>
                          {isActive && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                            />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* More Options */}
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">More</p>
                  <div className="grid grid-cols-2 gap-2">
                    {profileMenuItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex flex-col items-center gap-2 p-3 rounded-lg bg-slate-50 hover:bg-blue-50 transition-colors group"
                      >
                        <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-600 shadow-sm group-hover:shadow">
                          <item.icon size={14} />
                        </span>
                        <span className="text-[10px] font-medium text-slate-600 group-hover:text-blue-600 text-center">
                          {item.tooltip}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Footer */}
              <div className="mt-8 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[9px] text-slate-500">Active now</span>
                  </div>
                  <span className="text-[9px] text-slate-400">v2.0</span>
                </div>
                <p className="text-[9px] text-slate-400 text-center">
                  © 2025 futurDooM · All rights reserved
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;