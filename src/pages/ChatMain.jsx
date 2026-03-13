import React, { useState, useEffect, useRef } from "react";
import ChatInterface from "../components/chat/ChatInterface";
import ChatSidebar from "../components/chat/ChatSidebar";
import { ChevronDown, MessageSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ChatMain = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

  const handleSelectChat = (chat) => {
    setCurrentMessages(chat.messages || []);
    setCurrentChatId(chat.id);
    setShowSidebar(false);
  };

  const handleNewChat = (newChat) => {
    setCurrentMessages([]);
    setCurrentChatId(newChat.id);
    setShowSidebar(false);
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showSidebar &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSidebar]);

  return (
    <div className="h-full w-full">
      {/* Desktop Layout */}
      <div
        className="hidden lg:flex gap-4"
        style={{ height: "calc(98dvh - 80px)" }}
      >
        <div className="flex-1 min-h-0">
          <ChatInterface
            messages={currentMessages}
            currentChatId={currentChatId}
          />
        </div>
        <div className="w-80 flex-shrink-0 overflow-y-auto">
          <ChatSidebar
            onSelectChat={handleSelectChat}
            onNewChat={handleNewChat}
          />
        </div>
      </div>

      {/* Mobile Layout - EXACT same chat height as original */}
      <div
        className="lg:hidden flex flex-col"
        style={{ height: "calc(98dvh - 140px)" }} /* Original height - unchanged */
      >
        {/* Chat History toggle */}
        <div className="flex-shrink-0 pb-2">
          <button
            ref={buttonRef}
            onClick={() => setShowSidebar(!showSidebar)}
            className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
          >
            <div className="flex items-center gap-2">
              <MessageSquare size={16} className="text-blue-600" />
              <span className="text-sm font-semibold text-slate-700">Chat History</span>
              <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">5</span>
            </div>
            <motion.div
              animate={{ rotate: showSidebar ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={18} className="text-blue-600" />
            </motion.div>
          </button>
        </div>

        {/* Sidebar - Overlay on top, doesn't affect chat height */}
        <AnimatePresence>
          {showSidebar && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSidebar(false)}
                className="fixed inset-0 bg-black z-40 lg:hidden"
                style={{ top: 0, left: 0, right: 0, bottom: 0 }}
              />
              
              {/* Sidebar panel - slides over, doesn't push content */}
              <motion.div
                ref={sidebarRef}
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed top-0 left-0 right-0 z-50 lg:hidden"
                style={{ maxHeight: "60vh" }}
              >
                <div className="bg-white rounded-b-2xl shadow-xl border-b border-x border-blue-100 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                    <span className="font-semibold text-slate-800">Chat History</span>
                    <button
                      onClick={() => setShowSidebar(false)}
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm"
                    >
                      <X size={14} className="text-slate-600" />
                    </button>
                  </div>
                  <div className="overflow-y-auto" style={{ maxHeight: "calc(60vh - 57px)" }}>
                    <ChatSidebar
                      onSelectChat={handleSelectChat}
                      onNewChat={handleNewChat}
                    />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Chat - EXACT same height and position as original */}
        <div className="flex-1 min-h-0 pt-2 overflow-hidden">
          <ChatInterface
            messages={currentMessages}
            currentChatId={currentChatId}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatMain;