import React from 'react';
import { motion } from 'framer-motion';
import { Star, Zap, ChevronRight, Circle, CheckCircle } from 'lucide-react';

const UserCard = ({ user, onUserClick, onInterestToggle }) => {
  // Helper function to generate random last seen time
  const getRandomLastSeen = () => {
    const times = [
      "online now",
      "2m ago",
      "15m ago",
      "1h ago",
      "3h ago",
      "yesterday",
      "2d ago",
      "1w ago"
    ];
    return times[Math.floor(Math.random() * times.length)];
  };

  // Helper function to determine if user is online
  const isOnline = () => {
    return Math.random() > 0.7; // 30% chance of being online
  };

  // Generate online status and last seen
  const online = isOnline();
  const lastSeen = online ? "online" : getRandomLastSeen();

  const getInterestButton = () => {
    if (user.interest === "interested") {
      return (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onInterestToggle(user.id, "interested");
          }}
          className="flex items-center gap-1 px-2 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-600 text-xs font-medium hover:bg-pink-100 transition-colors"
        >
          <Star size={12} className="fill-pink-500 text-pink-500" />
          Interested
        </button>
      );
    } else if (user.interest === "interesting") {
      return (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onInterestToggle(user.id, "interesting");
          }}
          className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-xs font-medium hover:bg-amber-100 transition-colors"
        >
          <Zap size={12} className="fill-amber-500 text-amber-500" />
          Interesting
        </button>
      );
    } else {
      return (
        <div className="flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onInterestToggle(user.id, "interested");
            }}
            className="p-1 rounded-full bg-slate-50 border border-slate-200 text-slate-400 hover:text-pink-500 hover:border-pink-200 hover:bg-pink-50 transition-colors"
            title="Mark as interested"
          >
            <Star size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onInterestToggle(user.id, "interesting");
            }}
            className="p-1 rounded-full bg-slate-50 border border-slate-200 text-slate-400 hover:text-amber-500 hover:border-amber-200 hover:bg-amber-50 transition-colors"
            title="Mark as interesting"
          >
            <Zap size={14} />
          </button>
        </div>
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ scale: 1.01, x: 4 }}
      onClick={() => onUserClick(user)}
      className="group flex items-center justify-between py-3 px-2 rounded-lg cursor-pointer hover:bg-blue-50/50 transition-all duration-200"
    >
      <div className="flex items-center gap-3 flex-1">
        {/* Avatar with gradient and online status */}
        <div className="relative">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center text-white font-semibold text-sm shadow-md`}>
            {user.initials}
          </div>
          
          {/* Online/Offline Indicator */}
          <div className="absolute -bottom-1 -right-1">
            {online ? (
              <div className="relative group/status">
                <div className="w-4 h-4 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-sm">
                  <CheckCircle size={10} className="text-green-500" fill="currentColor" />
                </div>
                <span className="absolute -top-8 right-0 bg-gray-800 text-white text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover/status:opacity-100 transition-opacity whitespace-nowrap z-10">
                  Online
                </span>
              </div>
            ) : (
              <div className="relative group/status">
                <div className="w-4 h-4 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-sm">
                  <Circle size={10} className="text-gray-400" fill="currentColor" />
                </div>
                <span className="absolute -top-8 right-0 bg-gray-800 text-white text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover/status:opacity-100 transition-opacity whitespace-nowrap z-10">
                  Last seen {lastSeen}
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* User info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <h3 className="font-semibold text-slate-800 text-sm">{user.name}</h3>
            
            {/* Online/Offline Badge */}
            <span className={`text-[8px] font-medium px-1.5 py-0.5 rounded-full ${
              online 
                ? 'bg-green-100 text-green-600' 
                : 'bg-gray-100 text-gray-500'
            }`}>
              {online ? '● Online' : '○ Offline'}
            </span>
            
            {getInterestButton()}
          </div>
          
          <p className="text-xs text-slate-400">{user.location}</p>
          <p className="text-xs text-slate-500 mt-1 line-clamp-1">{user.bio}</p>
          
          {/* Last seen text for offline users */}
          {!online && (
            <p className="text-[9px] text-slate-400 mt-1">
              Last active: {lastSeen}
            </p>
          )}
        </div>
      </div>
      
      <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0" />
    </motion.div>
  );
};

export default UserCard;