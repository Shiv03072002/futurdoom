import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import MobileFooterMenu from "../components/common/MobileFooterMenu";
import ScrollToTop from "../utils/ScrollToTop";

const ChatLayout = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: "#fafafa" }}>
      <ScrollToTop />

      {/* Navbar — fixed height at top */}
      <Navbar />

      {/* Body row: left sidebar + chat content */}
      <div className="flex flex-1 overflow-hidden max-w-7xl w-full mx-auto px-2 ">

        {/* Left Sidebar — same as MainLayout but doesn't scroll */}
        <div className="w-[320px] hidden md:flex flex-col shrink-0 py-6  pr-4">
          <Sidebar />
        </div>

        {/* Chat content — fills all remaining space */}
        <div className="flex-1 min-w-0 overflow-hidden py-2 lg:py-6 pb-16 md:pb-6">
          <Outlet />
        </div>
      </div>

      {/* Mobile footer */}
      <div className="block md:hidden">
        <MobileFooterMenu />
      </div>
    </div>
  );
};

export default ChatLayout;