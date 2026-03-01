import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProfileCard from "../components/userProfile/ProfileCard";
import ChatSection from "../components/userProfile/ChatSection";

const UserProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Mock user data - in real app, fetch based on username
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // This would be replaced with actual API call
      const mockUser = {
        id: 1,
        name: username === "dipankar_porey" ? "Dipankar Porey" : "Shiv Kumar",
        initials: username === "dipankar_porey" ? "DP" : "SK",
        color: username === "dipankar_porey" ? "from-pink-400 to-red-400" : "from-blue-400 to-indigo-500",
        location: username === "dipankar_porey" ? "Kolkata, India" : "San Francisco, CA",
        username: username,
        bio: username === "dipankar_porey" 
          ? "Full-stack developer | AI enthusiast | Tech blogger | Building cool stuff with React and Node.js"
          : "Hey 👋✨ Welcome to my digital space — express yourself freely, no judgment here 🎤😂☕",
        posts: 128,
        followers: 4200,
        following: 312
      };
      setUser(mockUser);
      setLoading(false);
    }, 500);
  }, [username]);

  // Animation variants
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 shadow-xl text-center">
          <p className="text-slate-600 mb-4">User not found</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="">
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Card Component */}
          <ProfileCard 
            user={user} 
            following={following} 
            setFollowing={setFollowing} 
          />

          {/* Chat Section Component */}
          <ChatSection />

          {/* Footer */}
          <motion.p 
            variants={itemVariants}
            className="text-xs text-slate-400 text-center"
          >
            © 2025 futurdoom · Profile Page
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfilePage;