import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  Home,
  Calendar,
  Users,
  Briefcase,
  Phone,
  Mail,
  Link as LinkIcon,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Save,
  X,
  Camera,
  Sparkles,
  Check,
  Edit,
  Globe,
  Heart,
  Image
} from "lucide-react";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "Shiv Kumar",
    about: "Hey, I'm using futurDooM",
    currentLocation: "",
    homeAddress: "",
    birthday: "",
    gender: "",
    profession: "",
    contactNo: "",
    email: "shivaku5544@gmail.com",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: ""
  });

  const [activeTab, setActiveTab] = useState("personal");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const buttonHover = {
    scale: 1.02,
    y: -2,
    transition: { type: "spring", stiffness: 400, damping: 17 },
  };

  const buttonTap = {
    scale: 0.98,
    y: 0,
  };

  return (
    <div className="min-h-screen ">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4"
      >
        {/* Header Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl border border-blue-50 overflow-hidden mb-6"
        >
          <div className="bg-gradient-to-br from-[#0f1f6e] via-[#1a3aad] to-[#2563eb] p-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
            <div className="absolute bottom-0 left-1/2 w-24 h-24 rounded-full bg-blue-400/10" />
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "32px 32px"
              }}
            />
            
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-[2px] bg-blue-300" />
                <span className="text-blue-200 text-xs tracking-[0.2em] uppercase font-medium">Profile</span>
              </div>
              
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center"
                >
                  <Edit className="w-5 h-5 text-white" />
                </motion.div>
                <h1 className="text-2xl font-black text-white tracking-tight">
                  Edit Profile
                </h1>
              </div>
              <p className="text-blue-100/70 text-sm mt-2">
                Update your personal information and social links
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-blue-100">
            {[
              { id: "personal", label: "Personal Info", icon: User },
              { id: "contact", label: "Contact", icon: Phone },
              { id: "social", label: "Social Links", icon: Globe },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all relative ${
                  activeTab === tab.id
                    ? "text-blue-600"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1a3aad] to-[#2563eb]"
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl border border-blue-50 overflow-hidden"
        >
          {/* Cover Photo Section */}
          <div className="relative h-48 bg-gradient-to-r from-[#0f1f6e] to-[#2563eb] group">
            {/* Cover Image Placeholder with Pattern */}
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "24px 24px"
              }}
            />
            
            {/* Cover Photo Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Cover Photo Actions */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <motion.button
                className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 text-white text-sm font-medium flex items-center gap-2 hover:bg-white/30 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Camera size={16} />
                Change Cover
              </motion.button>
              <motion.button
                className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 text-white flex items-center justify-center hover:bg-white/30 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={16} />
              </motion.button>
            </div>

            {/* Cover Photo Hint */}
            
          </div>

          {/* Profile Picture Section - Adjusted positioning */}
          <div className="px-6 pb-6 relative">
            <div className="flex items-end gap-6 -mt-12">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#1a3aad] to-[#2563eb] flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-white">
                  SK
                </div>
                <motion.button
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-white border-2 border-blue-500 flex items-center justify-center text-blue-600 shadow-md"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Camera size={14} />
                </motion.button>
              </div>
              <div className="mb-2">
               
                <div className="flex gap-2 mt-2">
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-blue-600 text-white">Upload</button>
                  <button className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600">Remove</button>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 pt-0">
            {/* Personal Info Tab */}
            {activeTab === "personal" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-5"
              >
                {/* Name */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                    <User size={12} /> Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="Your full name"
                  />
                </div>

                {/* About */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                    <Heart size={12} /> About
                  </label>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                    placeholder="Tell us about yourself"
                  />
                </div>

                {/* Current Location */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                    <MapPin size={12} /> Current Location
                  </label>
                  <input
                    type="text"
                    name="currentLocation"
                    value={formData.currentLocation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="e.g., San Francisco, CA"
                  />
                </div>

                {/* Home Address */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                    <Home size={12} /> Home Address
                  </label>
                  <input
                    type="text"
                    name="homeAddress"
                    value={formData.homeAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="Your home address"
                  />
                </div>

                {/* Birthday */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                    <Calendar size={12} /> Birthday (xx.xx.xxxx)
                  </label>
                  <input
                    type="text"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="DD.MM.YYYY"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                    <Users size={12} /> Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not">Prefer not to say</option>
                  </select>
                </div>

                {/* Profession */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                    <Briefcase size={12} /> Profession
                  </label>
                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="e.g., Software Engineer"
                  />
                </div>
              </motion.div>
            )}

            {/* Contact Tab */}
            {activeTab === "contact" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-5"
              >
                {/* Contact No. */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                    <Phone size={12} /> Contact No. (+xx xxxxx xxxxx)
                  </label>
                  <input
                    type="tel"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                    <Mail size={12} /> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="your@email.com"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Your primary email address</p>
                </div>
              </motion.div>
            )}

            {/* Social Links Tab */}
            {activeTab === "social" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-5"
              >
                <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 mb-4">
                  <p className="text-xs text-slate-600 flex items-center gap-2">
                    <LinkIcon size={12} className="text-blue-600" />
                    Add your social media profiles to connect with the community
                  </p>
                </div>

                {/* Facebook */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                    <Facebook size={12} className="text-blue-600" /> Facebook Link
                  </label>
                  <input
                    type="url"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="https://facebook.com/username"
                  />
                </div>

                {/* Instagram */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                    <Instagram size={12} className="text-pink-600" /> Instagram Link
                  </label>
                  <input
                    type="url"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="https://instagram.com/username"
                  />
                </div>

                {/* Twitter */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                    <Twitter size={12} className="text-sky-500" /> Twitter Link
                  </label>
                  <input
                    type="url"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="https://twitter.com/username"
                  />
                </div>

                {/* LinkedIn */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                    <Linkedin size={12} className="text-blue-700" /> LinkedIn Link
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div 
              className="flex items-center gap-3 mt-8 pt-4 border-t border-blue-100"
              variants={itemVariants}
            >
              <motion.button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white rounded-xl font-semibold text-sm shadow-md shadow-blue-500/30"
                variants={buttonHover}
                whileHover="hover"
                whileTap={buttonTap}
              >
                {saveSuccess ? (
                  <>
                    <Check size={16} />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </motion.button>
              
              <motion.button
                className="px-6 py-3 border-2 border-blue-200 text-slate-600 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors"
                variants={buttonHover}
                whileHover="hover"
                whileTap={buttonTap}
              >
                Cancel
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p 
          variants={itemVariants}
          className="text-xs text-slate-400 text-center mt-6"
        >
          Your information is kept private and secure
        </motion.p>
      </motion.div>
    </div>
  );
};

export default EditProfile;