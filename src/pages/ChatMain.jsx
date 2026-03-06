import React, { useState } from "react";
import ChatInterface from "../components/chat/ChatInterface";
import ChatSidebar from "../components/chat/ChatSidebar";
import { ChevronDown, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ChatMain = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  const handleSelectChat = (chat) => {
    setCurrentMessages(chat.messages || []);
    setCurrentChatId(chat.id);
    if (window.innerWidth < 1024) setShowSidebar(false);
  };

  const handleNewChat = (newChat) => {
    setCurrentMessages([]);
    setCurrentChatId(newChat.id);
    if (window.innerWidth < 1024) setShowSidebar(false);
  };

  return (
    <div className="">
      {/* ── Desktop Layout ──
          Your navbar is ~80px tall, so we subtract that.
          Adjust 80px if your navbar is taller/shorter.
      -->*/}
      <div
        className="hidden lg:flex gap-4"
        style={{ height: "calc(98dvh - 80px)" }}
      >
        {/* Chat fills all remaining vertical space */}
        <div className="flex-1 min-h-0">
          <ChatInterface
            messages={currentMessages}
            currentChatId={currentChatId}
          />
        </div>

        {/* Sidebar scrolls independently */}
        <div className="w-80 flex-shrink-0 overflow-y-auto">
          <ChatSidebar
            onSelectChat={handleSelectChat}
            onNewChat={handleNewChat}
          />
        </div>
      </div>

      {/* ── Mobile Layout ──
          Subtract top navbar (~64px) + bottom navbar (~64px) + page padding (~16px)
          Adjust if things still clip.
      -->*/}
      <div
        className="lg:hidden flex flex-col"
        style={{ height: "calc(98dvh - 140px)" }}
      >
        {/* Chat History toggle — never shrinks */}
        <div className="flex-shrink-0 pb-2">
          <button
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

        {/* Sidebar — flex-shrink-0 so it never squishes the chat */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex-shrink-0 overflow-hidden"
            >
              <ChatSidebar
                onSelectChat={handleSelectChat}
                onNewChat={handleNewChat}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat — flex-1 + min-h-0 fills remaining space, input stays visible */}
        <div className="flex-1 min-h-0 pt-2 overflow-hidden ">
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