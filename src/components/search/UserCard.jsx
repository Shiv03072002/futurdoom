import React, { useState } from "react";
import { MapPin, UserPlus, Check } from "lucide-react";

const UserCard = ({ user, onUserClick }) => {
  const [followed, setFollowed] = useState(false);

  return (
    <div 
      className="flex items-center gap-3 py-3 px-1 group cursor-pointer hover:bg-blue-50/50 rounded-lg transition-colors duration-200"
      onClick={() => onUserClick(user)}
    >
      {/* Avatar */}
      <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
        {user.initials}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
          {user.name}
        </p>
        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
          <MapPin size={10} /> {user.location}
        </p>
      </div>

      {/* Follow button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setFollowed((v) => !v);
        }}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200
          ${followed
            ? "bg-slate-100 text-slate-500 hover:bg-slate-200"
            : "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-md shadow-blue-300/30 hover:shadow-lg hover:shadow-blue-400/40 hover:-translate-y-0.5"
          }`}
      >
        {followed ? <><Check size={12} /> Following</> : <><UserPlus size={12} /> Follow</>}
      </button>
    </div>
  );
};

export default UserCard;