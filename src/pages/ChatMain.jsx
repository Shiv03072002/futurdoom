import React, { useState } from "react";
import ChatInterface from "../components/chat/ChatInterface";
import ChatSidebar from "../components/chat/ChatSidebar";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ChatMain = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="">
      {/* Desktop Layout */}
      <div className="hidden lg:flex gap-4 ">
        <div className="flex-1">
          <ChatInterface />
        </div>
        <div className="w-80 flex-shrink-0">
          <ChatSidebar />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col h-full">
        {/* Chat Interface */}
        <div className="flex-1  pb-2">
          <ChatInterface />
        </div>

        {/* Toggle Button for Sidebar */}
        <div className="px-4 mb-2">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-700">Chat History</span>
              <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                5
              </span>
            </div>
            <motion.div
              animate={{ rotate: showSidebar ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={18} className="text-blue-600" />
            </motion.div>
          </button>
        </div>

        {/* Sidebar - Expandable Section */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden px-4 pb-4"
            >
              <ChatSidebar />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChatMain;