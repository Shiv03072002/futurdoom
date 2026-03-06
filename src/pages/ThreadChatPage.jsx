import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ChatInterfaceFull from "../components/threadChat/ChatInterfaceFull";

const ThreadPage = () => {
  const navigate = useNavigate();
  const { messageId } = useParams();
  const location = useLocation();

  const thread = location.state?.thread;

  return (
    // Top navbar = ~64px, bottom navbar = ~64px, total = 128px
    // Extra 16px for any padding/gap = 144px total
    <div style={{ height: "calc(98dvh - 144px)" }} className="overflow-hidden">
      <ChatInterfaceFull thread={thread} />
    </div>
  );
};

export default ThreadPage;