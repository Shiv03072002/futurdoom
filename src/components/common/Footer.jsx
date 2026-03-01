import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart,
  Sparkles,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Globe,
  Shield,
  FileText,
  AlertTriangle,
  Info,
  MessageCircle
} from "lucide-react";

const Footer = () => {
  const links = [
    { label: "About", to: "/about", icon: Info },
    { label: "Contact", to: "/contact", icon: Mail },
    { label: "Privacy", to: "/privacy", icon: Shield },
    { label: "Terms", to: "/terms", icon: FileText },
    { label: "Disclaimer", to: "/disclaimer", icon: AlertTriangle },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/futurdoom", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com/futurdoom", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/futurdoom", label: "LinkedIn" },
    { icon: Mail, href: "mailto:feedbackfuturdoom@gmail.com", label: "Email" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
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

  const buttonHover = {
    scale: 1.05,
    y: -2,
    transition: { type: "spring", stiffness: 400, damping: 17 },
  };

  const buttonTap = {
    scale: 0.95,
    y: 0,
  };

  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white border-t border-blue-100 shadow-lg shadow-blue-500/5"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
      }}
    >
      <div className="max-w-9xl mx-auto px-6 py-8">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          {/* Left Section - Brand */}
          <motion.div 
            variants={itemVariants}
            className="flex-1 min-w-[200px]"
          >
            <Link to="/" className="inline-block mb-3">
              <span className="text-xl font-black tracking-tight">
                <span className="">
                  futur
                </span>
                <span className="text-[#2563eb]">DooM</span>
              </span>
            </Link>
            
            <p className="text-sm text-slate-500 mb-3 max-w-xs">
              Where emotions meet AI. Connect, share, and express yourself freely.
            </p>
            
            {/* Trust Badge */}
            
          </motion.div>

          {/* Center Section - Navigation Links */}
          <motion.div 
            variants={itemVariants}
            className="flex-1"
          >
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.label}
                    variants={itemVariants}
                    whileHover={{ x: 3 }}
                  >
                    <Link
                      to={link.to}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                    >
                      <Icon size={14} className="text-slate-400 group-hover:text-blue-600" />
                      <span className="text-xs font-medium">{link.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Section - Social & Contact */}
          <motion.div 
            variants={itemVariants}
            className="flex-1"
          >
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Connect With Us
            </h3>
            
            {/* Social Icons */}
            <div className="flex flex-wrap gap-2 mb-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-white border border-blue-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                    variants={buttonHover}
                    whileHover="hover"
                    whileTap={buttonTap}
                    aria-label={social.label}
                  >
                    <Icon size={16} />
                  </motion.a>
                );
              })}
            </div>

            {/* Contact Info */}
            <motion.a
              href="mailto:feedbackfuturdoom@gmail.com"
              className="flex items-center gap-2 text-xs text-slate-500 hover:text-blue-600 transition-colors group"
              whileHover={{ x: 3 }}
            >
              <Mail size={12} className="group-hover:text-blue-600" />
              <span>feedbackfuturdoom@gmail.com</span>
            </motion.a>
            
            <motion.a
              href="https://www.futurdoom.com"
              className="flex items-center gap-2 text-xs text-slate-500 hover:text-blue-600 transition-colors group mt-2"
              whileHover={{ x: 3 }}
            >
              <Globe size={12} className="group-hover:text-blue-600" />
              <span>www.futurdoom.com</span>
            </motion.a>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div 
          variants={itemVariants}
          className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent my-6"
        />

        {/* Bottom Bar */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          {/* Copyright */}
          <p className="text-xs text-slate-400 flex items-center gap-2">
            <span>© 2025 futurdoom</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="flex items-center gap-1">
              Made with <Heart size={10} className="text-pink-500" /> for the community
            </span>
          </p>

          {/* Version */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] px-2 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
              v2.0.0
            </span>
            <span className="text-[10px] px-2 py-1 rounded-full bg-purple-50 text-purple-600 border border-purple-200 flex items-center gap-1">
              <Sparkles size={8} />
              AI-Powered
            </span>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div 
          variants={itemVariants}
          className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[10px] text-slate-400"
        >
          <span className="flex items-center gap-1">
            <Shield size={10} /> SSL Secure
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span className="flex items-center gap-1">
            <MessageCircle size={10} /> 24/7 Support
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span className="flex items-center gap-1">
            <Globe size={10} /> Global Community
          </span>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;