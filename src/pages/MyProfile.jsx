import React from "react";
import { motion } from "framer-motion";
import ProfileHeader from "../components/myProfile/ProfileHeader";
import ChatSection from "../components/myProfile/ChatSection";

const MyProfile = ({ isLoggedInUser = false }) => {
  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-6">
        {/* Profile Header Component */}
        <ProfileHeader isLoggedInUser={isLoggedInUser} />

        {/* Chat Section Component */}
        <ChatSection />

        {/* Footer */}
        <motion.p 
          variants={itemVariants}
          className="text-xs text-slate-400 text-center"
        >
          © 2025 futurdoom · Profile Page
        </motion.p>
      </div>
    </div>
  );
};

export default MyProfile;