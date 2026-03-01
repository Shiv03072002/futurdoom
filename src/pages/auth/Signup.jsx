import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Phone,
  UserPlus,
  Eye,
  EyeOff,
  Check,
  Sparkles,
  Calendar,
  MapPin,
  Shield,
  Globe,
  Github,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    location: "",
    dob: "",
    acceptTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = "Password must contain an uppercase letter";
    } else if (!/(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = "Password must contain a number";
    } else if (!/(?=.*[!@#$%^&*])/.test(formData.password)) {
      newErrors.password = "Password must contain a special character";
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    // Terms validation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSignupSuccess(true);
      setTimeout(() => setSignupSuccess(false), 3000);
      console.log("Form submitted:", formData);
    }
  };

  const handleGoogleSignUp = () => {
    setGoogleLoading(true);
    setTimeout(() => {
      setGoogleLoading(false);
      setSignupSuccess(true);
      setTimeout(() => setSignupSuccess(false), 3000);
    }, 1500);
  };

  const handleGithubSignUp = () => {
    setGithubLoading(true);
    setTimeout(() => {
      setGithubLoading(false);
      setSignupSuccess(true);
      setTimeout(() => setSignupSuccess(false), 3000);
    }, 1500);
  };

  // Password strength checker
  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { score: 0, label: "None", color: "bg-slate-200" };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/(?=.*[A-Z])/.test(password)) score++;
    if (/(?=.*[0-9])/.test(password)) score++;
    if (/(?=.*[!@#$%^&*])/.test(password)) score++;
    
    const strengths = {
      0: { label: "Very Weak", color: "bg-red-500" },
      1: { label: "Weak", color: "bg-orange-500" },
      2: { label: "Fair", color: "bg-yellow-500" },
      3: { label: "Good", color: "bg-blue-500" },
      4: { label: "Strong", color: "bg-green-500" },
    };
    
    return { score, ...strengths[score] };
  };

  const passwordStrength = getPasswordStrength();

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto px-4"
      >
        {/* Header Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl border border-blue-50 overflow-hidden mb-6 shadow-xl shadow-blue-100/50"
        >
          <div className="bg-gradient-to-br from-[#0f1f6e] via-[#1a3aad] to-[#2563eb] p-8 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
            <div className="absolute bottom-0 left-1/2 w-24 h-24 rounded-full bg-blue-400/10" />
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "32px 32px"
              }}
            />
            
            <div className="relative text-center">
              <motion.div
               
                className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mx-auto mb-4"
              >
                <UserPlus className="w-8 h-8 text-white" />
              </motion.div>
              
              <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                Create Account
              </h1>
              <p className="text-blue-100/70 text-sm">
                Join 10,000+ creators on futurDooM
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl border border-blue-50 overflow-hidden shadow-xl shadow-blue-100/50"
        >
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                  <User size={12} /> Full Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                      errors.name ? 'border-red-300 bg-red-50' : 'border-blue-200'
                    } bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                  <Mail size={12} /> Email Address <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-blue-200'
                    } bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                  <Phone size={12} /> Phone Number <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                      errors.phone ? 'border-red-300 bg-red-50' : 'border-blue-200'
                    } bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                    placeholder="+91 98765 43210"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                  <MapPin size={12} /> Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="City"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                  <Calendar size={12} /> Date of Birth
                </label>
                <input
                  type="text"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="DD/MM/YYYY"
                />
              </div>

              {/* Password */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                  <Lock size={12} /> Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 rounded-xl border ${
                      errors.password ? 'border-red-300 bg-red-50' : 'border-blue-200'
                    } bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                  <Lock size={12} /> Confirm Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 rounded-xl border ${
                      errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-blue-200'
                    } bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${passwordStrength.color} transition-all duration-300`}
                      style={{ width: `${(passwordStrength.score / 4) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-600">
                    {passwordStrength.label}
                  </span>
                </div>
              </div>
            )}

            {/* Password Requirements */}
            <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 mt-4">
              <p className="text-xs font-medium text-slate-700 mb-2 flex items-center gap-1">
                <Shield size={12} className="text-blue-600" />
                Password requirements:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { text: "At least 8 characters", test: (p) => p.length >= 8 },
                  { text: "Uppercase letter", test: (p) => /[A-Z]/.test(p) },
                  { text: "One number", test: (p) => /[0-9]/.test(p) },
                  { text: "Special character", test: (p) => /[!@#$%^&*]/.test(p) },
                ].map((req, index) => {
                  const met = req.test(formData.password || "");
                  return (
                    <div key={index} className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${met ? 'bg-green-500' : 'bg-slate-300'}`} />
                      <span className={`text-[10px] ${met ? 'text-slate-600' : 'text-slate-400'}`}>
                        {req.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="mt-6">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs text-slate-500">
                  I agree to the{" "}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="text-red-500 text-xs mt-1">{errors.acceptTerms}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white rounded-xl font-semibold text-sm shadow-md shadow-blue-500/30 mt-6"
              variants={buttonHover}
              whileHover="hover"
              whileTap={buttonTap}
            >
              {signupSuccess ? (
                <>
                  <Check size={16} />
                  Account Created!
                </>
              ) : (
                <>
                  <UserPlus size={16} />
                  Create Account
                </>
              )}
            </motion.button>

            {/* Social Sign Up */}
            <div className="mt-8">
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-blue-100"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-4 bg-white text-slate-400">or sign up with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  onClick={handleGoogleSignUp}
                  className="flex items-center justify-center gap-2 py-3 bg-white border border-blue-200 text-slate-700 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-all"
                  variants={buttonHover}
                  whileHover="hover"
                  whileTap={buttonTap}
                  disabled={googleLoading}
                >
                  {googleLoading ? (
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Google
                    </>
                  )}
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleGithubSignUp}
                  className="flex items-center justify-center gap-2 py-3 bg-[#24292e] text-white rounded-xl font-semibold text-sm hover:bg-[#2f363d] transition-all"
                  variants={buttonHover}
                  whileHover="hover"
                  whileTap={buttonTap}
                  disabled={githubLoading}
                >
                  {githubLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Github size={18} />
                      GitHub
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-xs text-slate-500">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </motion.div>

     
        {/* Footer */}
        <motion.p 
          variants={itemVariants}
          className="text-xs text-slate-400 text-center mt-6"
        >
          © 2025 futurDooM · All rights reserved
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Signup;