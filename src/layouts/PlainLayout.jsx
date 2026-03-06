import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import MobileFooterMenu from "../components/common/MobileFooterMenu";
import ScrollToTop from "../utils/ScrollToTop";

const PlainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
       <ScrollToTop />
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <Outlet />
      </div>

      {/* Sticky Footer */}
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

export default PlainLayout;
