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
    category: "discussion",
    read: false,
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
    category: "likes", // Changed from "unread" to "likes"
    read: false,
  },
  {
    id: 3,
    initials: "SR",
    avatarColor: "from-emerald-400 to-teal-500",
    user: "Sneha Rao",
    action: "started following",
    target: "you",
    suffix: "",
    preview: null,
    date: "Feb 18, 2026",
    type: "follow",
    category: "follows", // Changed from "unread" to "follows"
    read: true,
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
    category: "mentions", // Changed from "groupchat" to "mentions"
    read: false,
  },
  {
    id: 5,
    initials: "PJ",
    avatarColor: "from-amber-400 to-orange-500",
    user: "Priya Jain",
    action: "sent a message in",
    target: "Design",
    suffix: "group",
    preview: "New mockups are ready",
    date: "Feb 16, 2026",
    type: "groupchat",
    category: "groupchats", // Changed from "groupchat" to "groupchats"
    read: true,
  },
  {
    id: 6,
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
  },
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

  const getFilteredNotifications = () => {
    let filtered = [];
    
    switch (activeFilter) {
      case "unread":
        filtered = notifications.filter((n) => !n.read);
        break;
      case "comments":
        filtered = notifications.filter((n) => n.category === "comments");
        break;
      case "likes":
        filtered = notifications.filter((n) => n.category === "likes");
        break;
      case "follows":
        filtered = notifications.filter((n) => n.category === "follows");
        break;
      case "mentions":
        filtered = notifications.filter((n) => n.category === "mentions");
        break;
      case "groupchats":
        filtered = notifications.filter((n) => n.category === "groupchats");
        break;
      case "discussion":
        filtered = notifications.filter((n) => n.category === "discussion");
        break;
      case "groupchat":
        filtered = notifications.filter((n) => n.category === "groupchat");
        break;
      case "all":
      default:
        filtered = notifications;
        break;
    }
    
    // Debug log to see what's being filtered
    console.log(`Filter: ${activeFilter}`, filtered);
    return filtered;
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen flex items-start justify-center">
      {/* Card */}
      <div className="bg-white rounded-xl border border-blue-50 w-full overflow-hidden">
        
        {/* Header Component */}
        <NotificationHeader unreadCount={unreadCount} />

        {/* Card Body */}
        <div className="p-6">
          
          {/* Filter Tabs - Updated to match categories */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            <button
              onClick={() => setActiveFilter("all")}
              className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === "all"
                  ? "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-sm"
                  : "text-slate-600 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter("unread")}
              className={`py-2 rounded-lg text-xs font-semibold transition-all relative ${
                activeFilter === "unread"
                  ? "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-sm"
                  : "text-slate-600 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              Unread
              {unreadCount > 0 && activeFilter !== "unread" && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveFilter("comments")}
              className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === "comments"
                  ? "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-sm"
                  : "text-slate-600 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              Comments
            </button>
            <button
              onClick={() => setActiveFilter("likes")}
              className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === "likes"
                  ? "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-sm"
                  : "text-slate-600 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              Likes
            </button>
            <button
              onClick={() => setActiveFilter("follows")}
              className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === "follows"
                  ? "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-sm"
                  : "text-slate-600 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              Follows
            </button>
            <button
              onClick={() => setActiveFilter("mentions")}
              className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === "mentions"
                  ? "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-sm"
                  : "text-slate-600 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              Mentions
            </button>
            <button
              onClick={() => setActiveFilter("groupchats")}
              className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === "groupchats"
                  ? "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-sm"
                  : "text-slate-600 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              Group Chats
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-100 mb-2" />

          {/* List */}
          <div className="divide-y divide-slate-100">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <Bell size={24} className="text-slate-400" />
                </div>
                <p className="text-sm text-slate-400 font-medium">No notifications</p>
                <p className="text-xs text-slate-300 mt-1">
                  {activeFilter === "all" 
                    ? "You're all caught up!" 
                    : `No ${activeFilter} notifications`}
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
              className="w-full mt-4 py-2.5 rounded-lg text-xs font-semibold text-blue-600 hover:bg-blue-50 border border-blue-200 transition-all duration-200"
            >
              Mark all as read
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;