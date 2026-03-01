import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import Footer from "../components/common/Footer";
import MobileFooterMenu from "../components/common/MobileFooterMenu"; // Import your mobile footer menu
import ScrollToTop from "../utils/ScrollToTop";
const MainLayout = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafafa" }}>
       <ScrollToTop />
      {/* Fixed top navbar */}
      <Navbar />

      {/* Main content area — Instagram 2-column layout */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-4 py-6 items-start">
          {/* LEFT SIDEBAR — fixed width like Instagram */}
          <div className="w-[300px] hidden md:block shrink-0 sticky top-20 h-fit">
            <Sidebar />
          </div>

          {/* CENTER CONTENT */}
          <div className="flex-1 min-w-0 pb-16 md:pb-0">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Footer - Hidden on mobile, visible on desktop */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile Footer Menu - Only visible on mobile */}
      <div className="block md:hidden">
        <MobileFooterMenu />
      </div>
    </div>
  );
};

export default MainLayout;