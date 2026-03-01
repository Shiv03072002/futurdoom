import React from "react";
import { X, Clock, Bell, Heart, MessageCircle, UserPlus, Users } from "lucide-react";

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
    id
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
      {/* Avatar with type indicator */}
      <div className="relative">
        <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm`}>
          {initials}
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-sm">
          {getIcon(type)}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-600 leading-snug">
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
        {preview && (
          <div className="mt-1.5 p-2 bg-slate-50 rounded-lg border border-slate-100">
            <p className="text-xs text-slate-500 italic">"{preview}"</p>
          </div>
        )}
        <div className="flex items-center gap-2 mt-1.5">
          <Clock size={10} className="text-slate-400" />
          <p className="text-xs text-slate-400">{date}</p>
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