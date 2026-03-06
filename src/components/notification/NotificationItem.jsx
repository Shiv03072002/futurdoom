import React from "react";
import { X, Clock, Bell, Heart, MessageCircle, UserPlus, Users, CheckCircle, Circle } from "lucide-react";

const NotificationItem = ({ notification, onMarkAsRead, onRemove }) => {
  // If notification is undefined or null, don't render anything
  if (!notification) {
    console.error("NotificationItem: notification prop is undefined or null");
    return null;
  }

  const getIcon = (type) => {
    switch(type) {
      case 'comment': return <MessageCircle size={10} className="text-blue-500" />;
      case 'like': return <Heart size={10} className="text-red-500" />;
      case 'follow': return <UserPlus size={10} className="text-green-500" />;
      case 'mention': return <MessageCircle size={10} className="text-purple-500" />;
      case 'groupchat': return <Users size={10} className="text-amber-500" />;
      default: return <Bell size={10} className="text-blue-500" />;
    }
  };

  // Helper function to generate random last seen time
  const getRandomLastSeen = () => {
    const times = [
      "online now",
      "last seen 2m ago",
      "last seen 15m ago",
      "last seen 1h ago",
      "last seen 3h ago",
      "last seen yesterday",
      "last seen 2d ago",
      "last seen 1w ago"
    ];
    return times[Math.floor(Math.random() * times.length)];
  };

  // Helper function to determine if user is online
  const isOnline = () => {
    return Math.random() > 0.7; // 30% chance of being online
  };

  // Generate online status and last seen
  const online = isOnline();
  const lastSeen = online ? "online now" : getRandomLastSeen();

  // Safe access with default values
  const {
    read = false,
    avatarColor = 'from-blue-400 to-indigo-500',
    initials = '?',
    type = 'default',
    user = 'Unknown User',
    action = 'performed action on',
    target = 'item',
    suffix = '',
    preview = null,
    date = 'Unknown date',
    id,
    showStatus = true // New prop to control status display
  } = notification;

  const handleMarkAsRead = () => {
    if (onMarkAsRead && id) {
      onMarkAsRead(id);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (onRemove && id) {
      onRemove(id);
    }
  };

  return (
    <div 
      className={`flex items-start gap-3 py-4 group hover:bg-blue-50/30 transition-colors duration-200 px-2 rounded-lg ${
        !read ? 'bg-blue-50/20' : ''
      }`}
      onClick={handleMarkAsRead}
    >
      {/* Avatar with type indicator and online status */}
      <div className="relative">
        <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm`}>
          {initials}
        </div>
        
        {/* Online/Offline Indicator */}
        {showStatus && (
          <div className="absolute -bottom-1 -right-1">
            {online ? (
              <div className="relative">
                <div className="w-5 h-5 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-sm">
                  <CheckCircle size={12} className="text-green-500" fill="currentColor" />
                </div>
                <span className="absolute -top-8 right-0 bg-gray-800 text-white text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  Online
                </span>
              </div>
            ) : (
              <div className="relative">
                <div className="w-5 h-5 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-sm">
                  <Circle size={12} className="text-gray-400" fill="currentColor" />
                </div>
                <span className="absolute -top-8 right-0 bg-gray-800 text-white text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {lastSeen}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Notification Type Icon - Moved to bottom-left to avoid conflict */}
        {!showStatus && (
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-sm">
            {getIcon(type)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm text-slate-600 leading-snug flex-1">
            <span className="font-semibold text-slate-800 hover:text-blue-600 cursor-pointer transition-colors">
              {user}
            </span>{" "}
            {action}{" "}
            <span className="font-semibold text-slate-800">{target}</span>{" "}
            {suffix}
            {!read && (
              <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
            )}
          </p>
          
          {/* Online/Offline Text for Mobile/Quick View */}
          {showStatus && (
            <span className={`text-[8px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap ${
              online 
                ? 'bg-green-100 text-green-600' 
                : 'bg-gray-100 text-gray-500'
            }`}>
              {online ? '● Online' : '○ Offline'}
            </span>
          )}
        </div>

        {preview && (
          <div className="mt-1.5 p-2 bg-slate-50 rounded-lg border border-slate-100">
            <p className="text-xs text-slate-500 italic">"{preview}"</p>
          </div>
        )}
        
        <div className="flex items-center gap-3 mt-1.5">
          <div className="flex items-center gap-1">
            <Clock size={10} className="text-slate-400" />
            <p className="text-xs text-slate-400">{date}</p>
          </div>
          
          {/* Last Seen Indicator */}
          {showStatus && !online && (
            <div className="flex items-center gap-1">
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <p className="text-[9px] text-slate-400">{lastSeen}</p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button
          onClick={handleRemove}
          className="w-7 h-7 flex items-center justify-center rounded-full text-slate-400 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default NotificationItem;