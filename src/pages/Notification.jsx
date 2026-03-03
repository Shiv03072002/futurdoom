import React, { useState } from "react";
import { Bell } from "lucide-react";
import NotificationHeader from "../components/notification/NotificationHeader";
import NotificationItem from "../components/notification/NotificationItem";

const initialNotifications = [
  {
    id: 1,
    initials: "DP",
    avatarColor: "from-pink-400 to-red-400",
    user: "Dipankar Porey",
    action: "commented on",
    target: "Shiv Kumar's",
    suffix: "post with query",
    preview: "Ok good, give in nextjs",
    date: "Feb 20, 2026",
    type: "comment",
    category: "comments",
    read: false,
    unreadCount: 3
  },
  {
    id: 2,
    initials: "AM",
    avatarColor: "from-blue-400 to-indigo-500",
    user: "Aarav Mehta",
    action: "liked your",
    target: "profile",
    suffix: "photo",
    preview: null,
    date: "Feb 19, 2026",
    type: "like",
    category: "likes",
    read: false,
    unreadCount: 1
  },
  {
    id: 3,
    initials: "SR",
    avatarColor: "from-emerald-400 to-teal-500",
    user: "Sneha Rao",
    action: "commented on",
    target: "your",
    suffix: "discussion thread",
    preview: "That's a great point! I'd love to learn more.",
    date: "Feb 18, 2026",
    type: "discussion",
    category: "discussion",
    read: true,
    unreadCount: 0
  },
  {
    id: 4,
    initials: "RK",
    avatarColor: "from-purple-400 to-pink-500",
    user: "Rahul Kumar",
    action: "mentioned you in",
    target: "team",
    suffix: "group chat",
    preview: "@you check this out!",
    date: "Feb 17, 2026",
    type: "mention",
    category: "mentions",
    read: false,
    unreadCount: 5
  },
  {
    id: 5,
    initials: "PJ",
    avatarColor: "from-amber-400 to-orange-500",
    user: "Priya Jain",
    action: "found your post",
    target: "interesting",
    suffix: "and saved it",
    preview: "Great insights on React!",
    date: "Feb 16, 2026",
    type: "interested",
    category: "interested",
    read: true,
    unreadCount: 0
  },
  {
    id: 6,
    initials: "VK",
    avatarColor: "from-cyan-400 to-blue-500",
    user: "Vikram Singh",
    action: "marked your",
    target: "comment as",
    suffix: "interesting",
    preview: "This approach is really innovative!",
    date: "Feb 15, 2026",
    type: "interesting",
    category: "interesting",
    read: false,
    unreadCount: 2
  }
];

const Notification = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState("all");

  const remove = (id) => setNotifications((prev) => prev.filter((n) => n.id !== id));
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  
  // Get counts for each category
  const commentsUnread = notifications.filter(n => n.category === "comments" && !n.read).length;
  const likesUnread = notifications.filter(n => n.category === "likes" && !n.read).length;
  const discussionUnread = notifications.filter(n => n.category === "discussion" && !n.read).length;
  const mentionsUnread = notifications.filter(n => n.category === "mentions" && !n.read).length;
  const interestedUnread = notifications.filter(n => n.category === "interested" && !n.read).length;
  const interestingUnread = notifications.filter(n => n.category === "interesting" && !n.read).length;

  // Total counts
  const commentsCount = notifications.filter(n => n.category === "comments").length;
  const likesCount = notifications.filter(n => n.category === "likes").length;
  const discussionCount = notifications.filter(n => n.category === "discussion").length;
  const mentionsCount = notifications.filter(n => n.category === "mentions").length;
  const interestedCount = notifications.filter(n => n.category === "interested").length;
  const interestingCount = notifications.filter(n => n.category === "interesting").length;

  const filteredNotifications = activeFilter === "all" 
    ? notifications 
    : activeFilter === "unread"
      ? notifications.filter(n => !n.read)
      : notifications.filter(n => n.category === activeFilter);

  return (
    <div className="min-h-screen flex items-start justify-center ">
      <div className="bg-white rounded-xl border border-blue-100 w-full  overflow-hidden shadow-sm">
        
        <NotificationHeader unreadCount={unreadCount} />

        <div className="p-4 sm:p-6">
          
          {/* Filter Tabs - All with red badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            
            {/* All Tab */}
            <button
              onClick={() => setActiveFilter("all")}
              className={`py-2 px-1 rounded-lg text-xs font-medium transition-all relative ${
                activeFilter === "all"
                  ? "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-sm"
                  : "text-slate-600 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              All ({notifications.length})
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white shadow-sm">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            
            {/* Unread Tab */}
            <button
              onClick={() => setActiveFilter("unread")}
              className={`py-2 px-1 rounded-lg text-xs font-medium transition-all relative ${
                activeFilter === "unread"
                  ? "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-sm"
                  : "text-slate-600 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              Unread
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white shadow-sm">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            
            {/* Comments Tab */}
            <button
              onClick={() => setActiveFilter("comments")}
              className={`py-2 px-1 rounded-lg text-xs font-medium transition-all relative ${
                activeFilter === "comments"
                  ? "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-sm"
                  : "text-slate-600 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              Comments 
              {commentsUnread > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white shadow-sm">
                  {commentsUnread > 9 ? '9+' : commentsUnread}
                </span>
              )}
            </button>
            
            {/* Likes Tab */}
            <button
              onClick={() => setActiveFilter("likes")}
              className={`py-2 px-1 rounded-lg text-xs font-medium transition-all relative ${
                activeFilter === "likes"
                  ? "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-sm"
                  : "text-slate-600 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              Likes 
              {likesUnread > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white shadow-sm">
                  {likesUnread > 9 ? '9+' : likesUnread}
                </span>
              )}
            </button>
            
            {/* Discussion Tab */}
            <button
              onClick={() => setActiveFilter("discussion")}
              className={`py-2 px-1 rounded-lg text-xs font-medium transition-all relative ${
                activeFilter === "discussion"
                  ? "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-sm"
                  : "text-slate-600 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              Discussion 
              {discussionUnread > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white shadow-sm">
                  {discussionUnread > 9 ? '9+' : discussionUnread}
                </span>
              )}
            </button>
            
            {/* Mentions Tab */}
            <button
              onClick={() => setActiveFilter("mentions")}
              className={`py-2 px-1 rounded-lg text-xs font-medium transition-all relative ${
                activeFilter === "mentions"
                  ? "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-sm"
                  : "text-slate-600 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              Mentions 
              {mentionsUnread > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white shadow-sm">
                  {mentionsUnread > 9 ? '9+' : mentionsUnread}
                </span>
              )}
            </button>
            
            {/* Interested Tab */}
            <button
              onClick={() => setActiveFilter("interested")}
              className={`py-2 px-1 rounded-lg text-xs font-medium transition-all relative ${
                activeFilter === "interested"
                  ? "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-sm"
                  : "text-slate-600 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              Interested 
              {interestedUnread > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white shadow-sm">
                  {interestedUnread > 9 ? '9+' : interestedUnread}
                </span>
              )}
            </button>
            
            {/* Interesting Tab */}
            <button
              onClick={() => setActiveFilter("interesting")}
              className={`py-2 px-1 rounded-lg text-xs font-medium transition-all relative ${
                activeFilter === "interesting"
                  ? "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-sm"
                  : "text-slate-600 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              Interesting 
              {interestingUnread > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white shadow-sm">
                  {interestingUnread > 9 ? '9+' : interestingUnread}
                </span>
              )}
            </button>
          </div>

          <div className="h-px bg-slate-100 mb-2" />

          {/* Notifications List */}
          <div className="divide-y divide-slate-100  overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <Bell size={24} className="text-slate-400" />
                </div>
                <p className="text-sm text-slate-400 font-medium">No notifications</p>
                <p className="text-xs text-slate-300 mt-1">
                  {activeFilter === "all" ? "You're all caught up!" : `No ${activeFilter} notifications`}
                </p>
              </div>
            ) : (
              filteredNotifications.map((n) => (
                <NotificationItem
                  key={n.id}
                  notification={n}
                  onMarkAsRead={markAsRead}
                  onRemove={remove}
                />
              ))
            )}
          </div>

          {/* Mark all as read */}
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="w-full mt-4 py-2.5 rounded-lg text-xs font-semibold text-blue-600 hover:bg-blue-50 border border-blue-200 transition-all"
            >
              Mark all as read ({unreadCount})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;