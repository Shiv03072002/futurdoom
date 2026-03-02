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
  },
  {
    id: 7,
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
      case "discussion":
        filtered = notifications.filter((n) => n.category === "discussion");
        break;
      case "mentions":
        filtered = notifications.filter((n) => n.category === "mentions");
        break;
      case "interested":
        filtered = notifications.filter((n) => n.category === "interested");
        break;
      case "interesting":
        filtered = notifications.filter((n) => n.category === "interesting");
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

  // Get counts for each category
  const commentsCount = notifications.filter(n => n.category === "comments").length;
  const likesCount = notifications.filter(n => n.category === "likes").length;
  const discussionCount = notifications.filter(n => n.category === "discussion").length;
  const mentionsCount = notifications.filter(n => n.category === "mentions").length;
  const interestedCount = notifications.filter(n => n.category === "interested").length;
  const interestingCount = notifications.filter(n => n.category === "interesting").length;

  return (
    <div className="min-h-screen flex items-start justify-center ">
      {/* Card */}
      <div className="bg-white rounded-xl border border-blue-100 w-full overflow-hidden shadow-sm">
        
        {/* Header Component */}
        <NotificationHeader unreadCount={unreadCount} />

        {/* Card Body */}
        <div className="p-6">
          
          {/* Filter Tabs - Updated with new categories */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            <button
              onClick={() => setActiveFilter("all")}
              className={`py-2 px-1 rounded-lg text-xs font-medium transition-all ${
                activeFilter === "all"
                  ? "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-sm"
                  : "text-slate-600 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              All ({notifications.length})
            </button>
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
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveFilter("comments")}
              className={`py-2 px-1 rounded-lg text-xs font-medium transition-all ${
                activeFilter === "comments"
                  ? "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-sm"
                  : "text-slate-600 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              Comments {commentsCount > 0 && `(${commentsCount})`}
            </button>
            <button
              onClick={() => setActiveFilter("likes")}
              className={`py-2 px-1 rounded-lg text-xs font-medium transition-all ${
                activeFilter === "likes"
                  ? "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-sm"
                  : "text-slate-600 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              Likes {likesCount > 0 && `(${likesCount})`}
            </button>
            <button
              onClick={() => setActiveFilter("discussion")}
              className={`py-2 px-1 rounded-lg text-xs font-medium transition-all ${
                activeFilter === "discussion"
                  ? "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-sm"
                  : "text-slate-600 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              Discussion {discussionCount > 0 && `(${discussionCount})`}
            </button>
            <button
              onClick={() => setActiveFilter("mentions")}
              className={`py-2 px-1 rounded-lg text-xs font-medium transition-all ${
                activeFilter === "mentions"
                  ? "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-sm"
                  : "text-slate-600 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              Mentions {mentionsCount > 0 && `(${mentionsCount})`}
            </button>
            <button
              onClick={() => setActiveFilter("interested")}
              className={`py-2 px-1 rounded-lg text-xs font-medium transition-all ${
                activeFilter === "interested"
                  ? "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-sm"
                  : "text-slate-600 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              Interested {interestedCount > 0 && `(${interestedCount})`}
            </button>
            <button
              onClick={() => setActiveFilter("interesting")}
              className={`py-2 px-1 rounded-lg text-xs font-medium transition-all ${
                activeFilter === "interesting"
                  ? "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white shadow-sm"
                  : "text-slate-600 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              Interesting {interestingCount > 0 && `(${interestingCount})`}
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-100 mb-2" />

          {/* List */}
          <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
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
              Mark all as read ({unreadCount})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;