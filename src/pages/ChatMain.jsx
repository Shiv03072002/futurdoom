import React from "react";
import ChatInterface from "../components/chat/ChatInterface";
import ChatSidebar from "../components/chat/ChatSidebar";

const ChatMain = () => {
  return (
    <div className="min-h-screen flex gap-4">
      <ChatInterface />
      <ChatSidebar />
    </div>
  );
};

export default ChatMain;