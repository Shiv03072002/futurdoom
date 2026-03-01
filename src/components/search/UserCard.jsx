import React from 'react';
import { motion } from 'framer-motion';
import { Star, Zap, ChevronRight } from 'lucide-react';

const UserCard = ({ user, onUserClick, onInterestToggle }) => {
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
      <div className="flex items-center gap-3">
        {/* Avatar with gradient */}
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center text-white font-semibold text-sm shadow-md`}>
          {user.initials}
        </div>
        
        {/* User info */}
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-semibold text-slate-800 text-sm">{user.name}</h3>
            {getInterestButton()}
          </div>
          <p className="text-xs text-slate-400">{user.location}</p>
          <p className="text-xs text-slate-500 mt-1 line-clamp-1">{user.bio}</p>
          
          {/* Stats */}
          {/* <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-slate-400">{user.followers} followers</span>
            <span className="text-xs text-slate-400">{user.posts} posts</span>
          </div> */}
        </div>
      </div>
      
      <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all duration-200" />
    </motion.div>
  );
};

export default UserCard;