import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProfileCard from "../components/userProfile/ProfileCard";
import ChatSection from "../components/userProfile/ChatSection";

// ... (your dummy data remains the same)
const dummyUsers = {
  shivkumar: {
    id: 1,
    name: "Shiv Kumar",
    initials: "SK",
    color: "from-blue-400 to-indigo-500",
    location: "San Francisco, CA",
    username: "shivkumar",
    bio: "Hey 👋✨ Welcome to my digital space — express yourself freely, no judgment here 🎤😂☕",
    posts: 128,
    followers: 4200,
    following: 312,
    isPro: true,
    coverGradient: "from-[#0f1f6e] via-[#1a3aad] to-[#2563eb]"
  },
  dipankar_porey: {
    id: 2,
    name: "Dipankar Porey",
    initials: "DP",
    color: "from-pink-500 to-rose-500",
    location: "Kolkata, India",
    username: "dipankar_porey",
    bio: "Full-stack developer | AI enthusiast | Tech blogger | Building cool stuff with React and Node.js | Cricket lover 🏏",
    posts: 256,
    followers: 8900,
    following: 425,
    isPro: true,
    coverGradient: "from-purple-600 via-pink-500 to-rose-500"
  },
  sneha_rao: {
    id: 3,
    name: "Sneha Rao",
    initials: "SR",
    color: "from-emerald-400 to-teal-500",
    location: "Bangalore, India",
    username: "sneha_rao",
    bio: "Backend developer | Pythonista | Cloud enthusiast ☁️ | Love building scalable systems | Foodie 🍜",
    posts: 89,
    followers: 3400,
    following: 278,
    isPro: false,
    coverGradient: "from-emerald-500 via-teal-500 to-cyan-600"
  },
  priya_patel: {
    id: 4,
    name: "Priya Patel",
    initials: "PP",
    color: "from-amber-400 to-orange-500",
    location: "Mumbai, India",
    username: "priya_patel",
    bio: "Data Scientist @TechCorp | ML researcher | Kaggle expert | I turn data into stories 📊 | Yoga enthusiast 🧘",
    posts: 167,
    followers: 5600,
    following: 401,
    isPro: true,
    coverGradient: "from-amber-500 via-orange-500 to-red-500"
  },
  aarav_mehta: {
    id: 5,
    name: "Aarav Mehta",
    initials: "AM",
    color: "from-violet-400 to-purple-500",
    location: "Delhi, India",
    username: "aarav_mehta",
    bio: "UI/UX Designer | Creating beautiful experiences | Design thinker | Artist 🎨 | Love sketching in free time",
    posts: 203,
    followers: 7200,
    following: 389,
    isPro: true,
    coverGradient: "from-violet-600 via-purple-600 to-fuchsia-600"
  },
  amit_kumar: {
    id: 6,
    name: "Amit Kumar",
    initials: "AK",
    color: "from-cyan-400 to-blue-500",
    location: "Pune, India",
    username: "amit_kumar",
    bio: "DevOps Engineer | AWS Certified | Docker enthusiast | Automation freak | Love solving complex problems 🚀",
    posts: 145,
    followers: 4800,
    following: 267,
    isPro: true,
    coverGradient: "from-cyan-500 via-blue-500 to-indigo-600"
  },
  neha_gupta: {
    id: 7,
    name: "Neha Gupta",
    initials: "NG",
    color: "from-rose-400 to-pink-500",
    location: "Hyderabad, India",
    username: "neha_gupta",
    bio: "Product Manager | Tech enthusiast | Agile coach | Love building products that users love 📱 | Mom 👶",
    posts: 98,
    followers: 2900,
    following: 345,
    isPro: false,
    coverGradient: "from-rose-500 via-pink-500 to-fuchsia-500"
  },
  rahul_sharma: {
    id: 8,
    name: "Rahul Sharma",
    initials: "RS",
    color: "from-lime-400 to-green-500",
    location: "Chennai, India",
    username: "rahul_sharma",
    bio: "Mobile Developer | React Native | Flutter | Building apps that make a difference 📱 | Gamer 🎮",
    posts: 178,
    followers: 3100,
    following: 298,
    isPro: false,
    coverGradient: "from-lime-500 via-green-500 to-emerald-600"
  }
};

// Dummy data for people interested in each user
const interestedInMeData = {
  shivkumar: [
    { 
      id: 2, 
      name: "Dipankar Porey", 
      username: "dipankar_porey",
      avatar: "https://i.pravatar.cc/40?img=1", 
      role: "Full-stack Developer", 
      isPro: true,
      mutual: true,
      bio: "Love your work on React!"
    },
    { 
      id: 3, 
      name: "Sneha Rao", 
      username: "sneha_rao",
      avatar: "https://i.pravatar.cc/40?img=3", 
      role: "Backend Developer", 
      isPro: false,
      mutual: false,
      bio: "Great profile!"
    },
    { 
      id: 5, 
      name: "Aarav Mehta", 
      username: "aarav_mehta",
      avatar: "https://i.pravatar.cc/40?img=2", 
      role: "UI/UX Designer", 
      isPro: true,
      mutual: true,
      bio: "Would love to collaborate"
    },
    { 
      id: 7, 
      name: "Neha Gupta", 
      username: "neha_gupta",
      avatar: "https://i.pravatar.cc/40?img=8", 
      role: "Product Manager", 
      isPro: false,
      mutual: false,
      bio: "Impressive work!"
    }
  ],
  dipankar_porey: [
    { 
      id: 1, 
      name: "Shiv Kumar", 
      username: "shivkumar",
      avatar: "https://i.pravatar.cc/40?img=7", 
      role: "Full-stack Developer", 
      isPro: true,
      mutual: true,
      bio: "Great work on your projects!"
    },
    { 
      id: 4, 
      name: "Priya Patel", 
      username: "priya_patel",
      avatar: "https://i.pravatar.cc/40?img=5", 
      role: "Data Scientist", 
      isPro: true,
      mutual: true,
      bio: "Love your tech blogs"
    },
    { 
      id: 6, 
      name: "Amit Kumar", 
      username: "amit_kumar",
      avatar: "https://i.pravatar.cc/40?img=6", 
      role: "DevOps Engineer", 
      isPro: true,
      mutual: false,
      bio: "Interesting projects!"
    }
  ],
  sneha_rao: [
    { 
      id: 1, 
      name: "Shiv Kumar", 
      username: "shivkumar",
      avatar: "https://i.pravatar.cc/40?img=7", 
      role: "Full-stack Developer", 
      isPro: true,
      mutual: false,
      bio: "Great Python work!"
    },
    { 
      id: 8, 
      name: "Rahul Sharma", 
      username: "rahul_sharma",
      avatar: "https://i.pravatar.cc/40?img=2", 
      role: "Mobile Developer", 
      isPro: false,
      mutual: true,
      bio: "Love your backend architecture"
    }
  ],
  priya_patel: [
    { 
      id: 2, 
      name: "Dipankar Porey", 
      username: "dipankar_porey",
      avatar: "https://i.pravatar.cc/40?img=1", 
      role: "Full-stack Developer", 
      isPro: true,
      mutual: true,
      bio: "Your ML projects are inspiring!"
    },
    { 
      id: 5, 
      name: "Aarav Mehta", 
      username: "aarav_mehta",
      avatar: "https://i.pravatar.cc/40?img=2", 
      role: "UI/UX Designer", 
      isPro: true,
      mutual: false,
      bio: "Data visualization expert!"
    },
    { 
      id: 6, 
      name: "Amit Kumar", 
      username: "amit_kumar",
      avatar: "https://i.pravatar.cc/40?img=6", 
      role: "DevOps Engineer", 
      isPro: true,
      mutual: true,
      bio: "Love your Kaggle work"
    }
  ],
  aarav_mehta: [
    { 
      id: 1, 
      name: "Shiv Kumar", 
      username: "shivkumar",
      avatar: "https://i.pravatar.cc/40?img=7", 
      role: "Full-stack Developer", 
      isPro: true,
      mutual: true,
      bio: "Your designs are amazing!"
    },
    { 
      id: 4, 
      name: "Priya Patel", 
      username: "priya_patel",
      avatar: "https://i.pravatar.cc/40?img=5", 
      role: "Data Scientist", 
      isPro: true,
      mutual: false,
      bio: "Beautiful UI work"
    }
  ],
  amit_kumar: [
    { 
      id: 2, 
      name: "Dipankar Porey", 
      username: "dipankar_porey",
      avatar: "https://i.pravatar.cc/40?img=1", 
      role: "Full-stack Developer", 
      isPro: true,
      mutual: true,
      bio: "Great DevOps practices!"
    },
    { 
      id: 3, 
      name: "Sneha Rao", 
      username: "sneha_rao",
      avatar: "https://i.pravatar.cc/40?img=3", 
      role: "Backend Developer", 
      isPro: false,
      mutual: true,
      bio: "Love your AWS expertise"
    },
    { 
      id: 8, 
      name: "Rahul Sharma", 
      username: "rahul_sharma",
      avatar: "https://i.pravatar.cc/40?img=2", 
      role: "Mobile Developer", 
      isPro: false,
      mutual: false,
      bio: "Docker master!"
    }
  ]
};

// Dummy data for people each user is interested in
const iAmInterestedInData = {
  shivkumar: [
    { 
      id: 2, 
      name: "Dipankar Porey", 
      username: "dipankar_porey",
      avatar: "https://i.pravatar.cc/40?img=1", 
      role: "Full-stack Developer", 
      isPro: true,
      mutual: true,
      bio: "Love his tech blogs"
    },
    { 
      id: 4, 
      name: "Priya Patel", 
      username: "priya_patel",
      avatar: "https://i.pravatar.cc/40?img=5", 
      role: "Data Scientist", 
      isPro: true,
      mutual: false,
      bio: "Amazing ML work"
    },
    { 
      id: 5, 
      name: "Aarav Mehta", 
      username: "aarav_mehta",
      avatar: "https://i.pravatar.cc/40?img=2", 
      role: "UI/UX Designer", 
      isPro: true,
      mutual: true,
      bio: "Beautiful designs"
    },
    { 
      id: 6, 
      name: "Amit Kumar", 
      username: "amit_kumar",
      avatar: "https://i.pravatar.cc/40?img=6", 
      role: "DevOps Engineer", 
      isPro: true,
      mutual: false,
      bio: "DevOps expert"
    }
  ],
  dipankar_porey: [
    { 
      id: 1, 
      name: "Shiv Kumar", 
      username: "shivkumar",
      avatar: "https://i.pravatar.cc/40?img=7", 
      role: "Full-stack Developer", 
      isPro: true,
      mutual: true,
      bio: "Inspiring developer"
    },
    { 
      id: 3, 
      name: "Sneha Rao", 
      username: "sneha_rao",
      avatar: "https://i.pravatar.cc/40?img=3", 
      role: "Backend Developer", 
      isPro: false,
      mutual: true,
      bio: "Great backend skills"
    },
    { 
      id: 7, 
      name: "Neha Gupta", 
      username: "neha_gupta",
      avatar: "https://i.pravatar.cc/40?img=8", 
      role: "Product Manager", 
      isPro: false,
      mutual: false,
      bio: "Product sense"
    }
  ],
  sneha_rao: [
    { 
      id: 2, 
      name: "Dipankar Porey", 
      username: "dipankar_porey",
      avatar: "https://i.pravatar.cc/40?img=1", 
      role: "Full-stack Developer", 
      isPro: true,
      mutual: true,
      bio: "Full-stack inspiration"
    },
    { 
      id: 6, 
      name: "Amit Kumar", 
      username: "amit_kumar",
      avatar: "https://i.pravatar.cc/40?img=6", 
      role: "DevOps Engineer", 
      isPro: true,
      mutual: false,
      bio: "Cloud architecture"
    }
  ],
  priya_patel: [
    { 
      id: 1, 
      name: "Shiv Kumar", 
      username: "shivkumar",
      avatar: "https://i.pravatar.cc/40?img=7", 
      role: "Full-stack Developer", 
      isPro: true,
      mutual: false,
      bio: "React expert"
    },
    { 
      id: 5, 
      name: "Aarav Mehta", 
      username: "aarav_mehta",
      avatar: "https://i.pravatar.cc/40?img=2", 
      role: "UI/UX Designer", 
      isPro: true,
      mutual: true,
      bio: "Design inspiration"
    },
    { 
      id: 8, 
      name: "Rahul Sharma", 
      username: "rahul_sharma",
      avatar: "https://i.pravatar.cc/40?img=2", 
      role: "Mobile Developer", 
      isPro: false,
      mutual: true,
      bio: "Mobile dev skills"
    }
  ]
};
const UserProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [interested, setInterested] = useState(false);
  const [interestedInMe, setInterestedInMe] = useState([]);
  const [iAmInterestedIn, setIAmInterestedIn] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Add debug logging
  useEffect(() => {
    console.log("UserProfilePage - isChatOpen changed:", isChatOpen);
  }, [isChatOpen]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Get user data based on username
      const userData = dummyUsers[username] || dummyUsers.shivkumar;
      
      // Get interested lists for this user
      const interestedList = interestedInMeData[username] || interestedInMeData.shivkumar;
      const interestingList = iAmInterestedInData[username] || iAmInterestedInData.shivkumar;
      
      setUser(userData);
      setInterestedInMe(interestedList);
      setIAmInterestedIn(interestingList);
      
      // Randomly set initial interest state
      setInterested(Math.random() > 0.5);
      
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
    <div className="min-h-screen ">
      <div className="container mx-auto ">
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Card Component with interested data */}
          <ProfileCard 
            user={user}
            interested={interested}
            setInterested={setInterested}
            interestedInMe={interestedInMe}
            iAmInterestedIn={iAmInterestedIn}
            isChatOpen={isChatOpen}
            setIsChatOpen={setIsChatOpen}
          />

          {/* Chat Section Component - Animate presence for smooth transitions */}
          <AnimatePresence mode="wait">
            {!isChatOpen ? (
              <motion.div
                key="chat-section"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <ChatSection />
              </motion.div>
            ) : (
              <motion.div
                key="chat-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                className="hidden"
              >
                {/* Hidden placeholder when chat is open */}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer - Always visible with chat state indicator */}
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