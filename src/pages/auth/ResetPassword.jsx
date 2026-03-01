import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Key,
  ArrowLeft,
  Check,
  Send,
  Eye,
  EyeOff,
  Sparkles,
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: new password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      setResetSuccess(true);
      setTimeout(() => {
        setResetSuccess(false);
        // Redirect to login after success
      }, 3000);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md mx-auto px-4 py-8"
      >
        {/* Header Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl border border-blue-50 overflow-hidden mb-6"
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
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mx-auto mb-4"
              >
                <Key className="w-8 h-8 text-white" />
              </motion.div>
              
              <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                Reset Password
              </h1>
              <p className="text-blue-100/70 text-sm">
                {step === 1 && "Enter your email to receive OTP"}
                {step === 2 && "Enter the OTP sent to your email"}
                {step === 3 && "Create your new password"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between mb-6 px-2"
        >
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-lg text-xs font-medium ${
                step >= s 
                  ? "bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white" 
                  : "bg-slate-100 text-slate-400"
              }`}>
                {step > s ? <Check size={14} /> : s}
              </div>
              {s < 3 && (
                <div className={`w-12 h-[2px] mx-1 ${
                  step > s ? "bg-blue-600" : "bg-slate-200"
                }`} />
              )}
            </div>
          ))}
        </motion.div>

        {/* Form Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl border border-blue-50 overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Step 1: Email */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                    <Mail size={12} /> Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-blue-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <p className="text-xs text-slate-400 bg-blue-50/50 p-3 rounded-lg">
                  We'll send a 6-digit OTP to this email address
                </p>
              </motion.div>
            )}

            {/* Step 2: OTP */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                    <Shield size={12} /> Enter OTP
                  </label>
                  <input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    maxLength={6}
                    className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-sm text-slate-700 text-center text-2xl tracking-[0.5em] font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="••••••"
                    required
                  />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <p className="text-slate-400">
                    OTP sent to {formData.email || "your email"}
                  </p>
                  <button
                    type="button"
                    className="text-blue-600 font-medium hover:text-blue-700"
                  >
                    Resend OTP
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: New Password */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                    <Lock size={12} /> New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 rounded-xl border border-blue-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
                    <Lock size={12} /> Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 rounded-xl border border-blue-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="bg-blue-50/50 rounded-lg p-3">
                  <p className="text-[10px] font-medium text-slate-600 mb-1">Password requirements:</p>
                  <div className="grid grid-cols-2 gap-1">
                    {[
                      "Min 8 characters",
                      "One uppercase",
                      "One number",
                      "One special char"
                    ].map((req, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-blue-600" />
                        <span className="text-[9px] text-slate-500">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 mt-6">
              <motion.button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#1a3aad] to-[#2563eb] text-white rounded-xl font-semibold text-sm shadow-md shadow-blue-500/30"
                variants={buttonHover}
                whileHover="hover"
                whileTap={buttonTap}
              >
                {resetSuccess ? (
                  <>
                    <Check size={16} />
                    Password Reset!
                  </>
                ) : (
                  <>
                    {step === 1 && <><Send size={16} /> Send OTP</>}
                    {step === 2 && <><Shield size={16} /> Verify OTP</>}
                    {step === 3 && <><Key size={16} /> Reset Password</>}
                  </>
                )}
              </motion.button>

              <Link to="/login">
                <motion.button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 py-3 border-2 border-blue-200 text-slate-600 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors"
                  variants={buttonHover}
                  whileHover="hover"
                  whileTap={buttonTap}
                >
                  <ArrowLeft size={16} />
                  Back to Login
                </motion.button>
              </Link>
            </div>
          </form>
        </motion.div>

        {/* Security Note */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-blue-50 mt-6"
        >
          <Shield size={14} className="text-blue-600" />
          <p className="text-[10px] text-slate-500">
            Your security is our priority. This is a secure, encrypted connection.
          </p>
        </motion.div>

        {/* Footer */}
        <motion.p 
          variants={itemVariants}
          className="text-xs text-slate-400 text-center mt-6"
        >
          Need help? Contact support@futurdoom.com
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ResetPassword;