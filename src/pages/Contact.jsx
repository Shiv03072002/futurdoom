import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Send,
  MessageCircle,
  Clock,
  CheckCircle,
  User,
  Edit,
  Twitter,
  Facebook,
  Linkedin,
  Github,
  Copy,
  Check,
  Sparkles,
  Headphones,
  MapPin,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("feedbackfuturdoom@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
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

  const pulseAnimation = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="min-h-screen  flex items-center justify-center ">
      <motion.div 
        className="w-full max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Card */}
        <motion.div 
          className="bg-white rounded-xl  border border-blue-50 overflow-hidden"
          variants={cardVariants}
        >
          {/* Header */}
          <motion.div 
            className="bg-gradient-to-br from-[#0f1f6e] via-[#1a3aad] to-[#2563eb] p-6 relative overflow-hidden"
            variants={itemVariants}
          >
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
                <span className="text-blue-200 text-xs tracking-[0.2em] uppercase font-medium">Get in Touch</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Mail size={24} className="text-white" />
                  </motion.div>
                  <h1 className="text-3xl font-black text-white tracking-tight">Contact Us</h1>
                </div>
                <Sparkles size={20} className="text-blue-300" />
              </div>
              <p className="text-blue-100/70 text-sm mt-2 leading-relaxed">
                We're here to help – reach out anytime!
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row">
            {/* Left — info panel */}
            <motion.div 
              className="lg:w-72 flex-shrink-0 p-6 space-y-4 bg-gradient-to-b from-blue-50/50 to-white border-r border-blue-100"
              variants={itemVariants}
            >
              <motion.h3 
                className="text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                style={{ color: "#2563eb" }}
                variants={itemVariants}
              >
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Contact Info
              </motion.h3>

              {/* Email */}
              <motion.div 
                className="p-4 space-y-2 bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Mail size={14} className="text-blue-600" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">Email</span>
                </div>
                <p className="text-xs text-slate-500 break-all px-2">
                  feedbackfuturdoom@gmail.com
                </p>
                <motion.button
                  onClick={copyEmail}
                  className="flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors"
                  style={{ color: "#2563eb" }}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copied ? (
                    <><Check size={12} /> Copied!</>
                  ) : (
                    <><Copy size={12} /> Copy email</>
                  )}
                </motion.button>
              </motion.div>

              {/* Phone */}
              <motion.div 
                className="p-4 space-y-2 bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
                    <Phone size={14} className="text-green-600" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">Phone</span>
                </div>
                <p className="text-xs text-slate-500 px-2">+91 8972834354</p>
                <p className="text-xs text-slate-400 px-2 flex items-center gap-1">
                  <Clock size={10} /> Mon–Fri, 9am–6pm IST
                </p>
              </motion.div>

              {/* Response Time */}
              <motion.div 
                className="p-4 space-y-2 bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center">
                    <Headphones size={14} className="text-purple-600" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">Response Time</span>
                </div>
                <p className="text-xs text-slate-500 px-2">Within 24 hours</p>
                <div className="flex items-center gap-1 px-2">
                  <motion.span 
                    className="w-2 h-2 bg-green-400 rounded-full"
                    animate={pulseAnimation}
                  />
                  <span className="text-xs text-slate-400">Online</span>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div 
                className="p-4 space-y-2 bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center">
                    <MapPin size={14} className="text-orange-600" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">Location</span>
                </div>
                <p className="text-xs text-slate-500 px-2">San Francisco, CA</p>
              </motion.div>

              {/* Social */}
              <motion.div variants={itemVariants}>
                <p className="text-xs text-slate-500 mb-3 px-2">Connect with us</p>
                <div className="flex gap-2 px-2">
                  {[Twitter, Facebook, Linkedin, Github].map((Icon, i) => (
                    <motion.button
                      key={i}
                      className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-blue-200 text-slate-500 hover:text-blue-600 hover:border-blue-300 transition-all duration-200"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={16} />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right — form */}
            <motion.div 
              className="flex-1 p-6"
              variants={itemVariants}
            >
              <motion.h3
                className="flex items-center gap-2 text-base font-semibold mb-5 text-slate-800"
                variants={itemVariants}
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Edit size={15} className="text-blue-600" />
                </div>
                Any questions or remarks?
              </motion.h3>

              {/* Success Message */}
              
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 mb-5 p-3 rounded-xl bg-green-50 border border-green-200"
                  >
                    <CheckCircle size={16} className="text-green-600" />
                    <p className="text-xs font-medium text-green-700">
                      Thank you! We'll get back to you soon.
                    </p>
                  </motion.div>
                )}
            

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <motion.div variants={itemVariants}>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                    <User size={12} /> Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </motion.div>

                {/* Email */}
                <motion.div variants={itemVariants}>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                    <Mail size={12} /> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </motion.div>

                {/* Message */}
                <motion.div variants={itemVariants}>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                    <MessageCircle size={12} /> Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message or suggestion..."
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                  />
                </motion.div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white text-sm font-semibold shadow-md shadow-blue-500/30"
                  variants={buttonHover}
                  whileHover="hover"
                  whileTap={buttonTap}
                >
                  <Send size={16} />
                  Send Message
                </motion.button>
              </form>

              <motion.p 
                className="text-center text-xs text-slate-400 mt-5"
                variants={itemVariants}
              >
                We'll never share your information with anyone.
              </motion.p>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div 
            className="px-6 py-4 border-t border-blue-100 bg-gradient-to-r from-blue-50/50 to-white"
            variants={itemVariants}
          >
            <p className="text-xs text-slate-400 text-center">
              © 2025 futurdoom · Contact Support
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;