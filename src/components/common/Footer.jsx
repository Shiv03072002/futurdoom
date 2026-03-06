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
  MessageCircle,
  Facebook,
  ChevronRight
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { label: "Features", to: "/features" },
    { label: "Pricing", to: "/pricing" },
    { label: "FAQ", to: "/faq" },
    { label: "Blog", to: "/blog" },
  ];

  const companyLinks = [
    { label: "About", to: "/about", icon: Info },
    { label: "Contact", to: "/contact", icon: Mail },
    { label: "Privacy", to: "/privacy", icon: Shield },
    { label: "Terms", to: "/terms", icon: FileText },
    { label: "Disclaimer", to: "/disclaimer", icon: AlertTriangle },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/futurdoom", label: "GitHub", color: "hover:bg-gray-900" },
    { icon: Twitter, href: "https://twitter.com/futurdoom", label: "Twitter", color: "hover:bg-blue-400" },
    { icon: Linkedin, href: "https://linkedin.com/company/futurdoom", label: "LinkedIn", color: "hover:bg-blue-600" },
    { icon: Facebook, href: "https://facebook.com/futurdoom", label: "Facebook", color: "hover:bg-blue-700" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-b from-slate-50 to-white border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Section - 4 columns */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <Link to="/" className="inline-block mb-4 group">
              <span className="text-3xl font-bold tracking-tight">
                <span className="text-slate-800 group-hover:text-slate-600 transition-colors">
                  futur
                </span>
                <span className="text-blue-600 group-hover:text-blue-500 transition-colors">
                  DooM
                </span>
              </span>
            </Link>
            
            <p className="text-sm text-slate-600 mb-6 max-w-md leading-relaxed">
              Where emotions meet AI. Connect, share, and express yourself freely in a safe, supportive community.
            </p>

            {/* Trust Badges - Redesigned */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
                <Shield size={14} className="text-blue-600" />
                <span className="text-xs font-medium text-blue-700">SSL Secure</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 rounded-lg">
                <MessageCircle size={14} className="text-purple-600" />
                <span className="text-xs font-medium text-purple-700">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-lg">
                <Globe size={14} className="text-emerald-600" />
                <span className="text-xs font-medium text-emerald-700">Global Community</span>
              </div>
            </div>
          </motion.div>

          {/* Product Links - 3 columns */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-600 hover:text-blue-600 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ChevronRight size={14} className="opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links - 3 columns */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Company
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {companyLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-sm text-slate-600 hover:text-blue-600 transition-colors inline-flex items-center gap-2 group"
                  >
                    <Icon size={14} className="text-slate-400 group-hover:text-blue-600" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Newsletter/Social - 2 columns */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Stay Connected
            </h3>
            
            {/* Social Icons */}
            <div className="flex flex-wrap gap-2 mb-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-white transition-all duration-300 ${social.color} hover:border-transparent`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:feedbackfuturdoom@gmail.com"
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors group"
              >
                <Mail size={16} className="text-slate-400 group-hover:text-blue-600" />
                <span className="truncate">feedbackfuturdoom@gmail.com</span>
              </a>
              <a
                href="https://www.futurdoom.com"
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors group"
              >
                <Globe size={16} className="text-slate-400 group-hover:text-blue-600" />
                <span>www.futurdoom.com</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-8 lg:my-10"
        />

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          {/* Copyright */}
          <p className="text-sm text-slate-500 flex flex-wrap items-center justify-center gap-2">
            <span>© {currentYear} futurdoom</span>
            <span className="w-1 h-1 rounded-full bg-slate-300 hidden sm:inline-block" />
            <span className="flex items-center gap-1.5">
              Made with <Heart size={14} className="text-pink-500 fill-current" /> by futurdoom team
            </span>
          </p>

          {/* Version Badges */}
          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 font-medium">
              v2.0.0
            </span>
            <span className="text-xs px-3 py-1.5 rounded-full bg-purple-50 text-purple-600 border border-purple-200 flex items-center gap-1.5 font-medium">
              <Sparkles size={12} />
              AI-Powered
            </span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;