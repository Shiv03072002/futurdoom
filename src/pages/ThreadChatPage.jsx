import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ChatInterfaceFull from "../components/threadChat/ChatInterfaceFull";

const ThreadPage = () => {
  const navigate = useNavigate();
  const { messageId } = useParams();
  const location = useLocation();

  // thread data passed from Share page
  const thread = location.state?.thread;

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Chat Interface - Full height, no header */}
      <div className="flex-1 overflow-hidden">
        <ChatInterfaceFull thread={thread} />
      </div>
    </div>
  );
};

export default ThreadPage;