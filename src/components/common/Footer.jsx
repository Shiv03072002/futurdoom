// // import React, { useEffect, useRef } from "react";
// // import { Link } from "react-router-dom";
// // import { motion, useInView, useAnimation } from "framer-motion";
// // import { ArrowUp, Github, Linkedin, Twitter, Facebook, Mail, Heart, Sparkles } from "lucide-react";

// // /* ══════════════════════════════════════════
// //    FOOTER  —  white background with black & blue text
// // ══════════════════════════════════════════ */
// // const Footer = () => {
// //   const ref = useRef(null);
// //   const isInView = useInView(ref, { once: true, margin: "-80px" });
// //   const controls = useAnimation();
// //   const currentYear = new Date().getFullYear();

// //   useEffect(() => {
// //     if (isInView) controls.start("visible");
// //   }, [isInView, controls]);

// //   const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

// //   const socialLinks = [
// //     { Icon: Github,   href: "https://github.com/futurdoom",           label: "Github"   },
// //     { Icon: Linkedin, href: "https://linkedin.com/company/futurdoom", label: "LinkedIn" },
// //     { Icon: Twitter,  href: "https://twitter.com/futurdoom",          label: "Twitter"  },
// //     { Icon: Facebook, href: "https://facebook.com/futurdoom",         label: "Facebook" },
// //     { Icon: Mail, href: "mailto:feedback@futurdoom.com", label: "Email" },
// //   ];

// //   const fadeUp = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: (i = 0) => ({
// //       opacity: 1,
// //       y: 0,
// //       transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
// //     }),
// //   };

// //   return (
// //     <footer ref={ref} className="relative bg-white overflow-hidden px-8 sm:px-12 lg:px-16 py-10 border-t border-blue-200">

// //       {/* Subtle blue gradient orbs */}
// //       <div className="absolute inset-0 overflow-hidden pointer-events-none">
// //         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-50 to-blue-100/70 rounded-full blur-3xl" />
// //         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-50 to-blue-100/70 rounded-full blur-3xl" />
// //       </div>

// //       {/* ── TOP ROW: copyright left · back to top right ── */}
// //       <motion.div
// //         custom={0} variants={fadeUp} initial="hidden" animate={controls}
// //         className="flex items-center justify-between mb-12 relative z-10"
// //       >
// //         <span className="text-[13px] text-slate-600 tracking-wide flex items-center gap-1.5">
// //           <span className="text-base leading-none text-blue-600">©</span> {currentYear} futurdoom
// //         </span>

// //         <div className="flex items-center gap-3">
// //           <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-blue-600">
// //             Back to Top
// //           </span>
// //           <motion.button
// //             onClick={scrollToTop}
// //             className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-md shadow-blue-200"
// //             whileHover={{ scale: 1.08 }}
// //             whileTap={{ scale: 0.93 }}
// //             aria-label="Back to top"
// //           >
// //             <ArrowUp size={17} />
// //           </motion.button>
// //         </div>
// //       </motion.div>

// //       {/* ── HERO TEXT BLOCK ── */}
// //       <div className="relative mb-14">
// //         {/* small label above */}
// //         <motion.p
// //           custom={1} variants={fadeUp} initial="hidden" animate={controls}
// //           className="text-[12px] font-medium tracking-[0.12em] uppercase text-blue-500 mb-2"
// //         >
// //           Where emotions meet AI
// //         </motion.p>

// //         {/* giant display text - black with blue stroke */}
// //         <div className="relative overflow-hidden">
          
// // <div className="relative overflow-hidden">
// //   <motion.h2
   
// //     className="text-[clamp(72px,13vw,160px)] font-bold leading-[0.9] tracking-[-0.03em] select-none"
// //   >
// //     <span className="text-slate-900">futur</span>
// //     <span className="text-blue-600">DooM</span>
// //   </motion.h2>

// //   {/* blue stroke outline */}
 
// // </div>
// //         </div>
        
// //         {/* Tagline - black text with blue link */}
// //         <motion.p
// //           custom={2.5} variants={fadeUp} initial="hidden" animate={controls}
// //           className="text-sm text-slate-600 mt-4 max-w-xl"
// //         >
// //           Connect, share, and express yourself freely in a safe, 
// //           supportive community powered by <span className="text-blue-600 font-medium">AI</span>.
// //         </motion.p>
// //       </div>

// //       {/* ── MIDDLE ROW: quick links ── */}
// //       <motion.div
// //         custom={2.8} variants={fadeUp} initial="hidden" animate={controls}
// //         className="flex flex-wrap gap-6 mb-10 pb-6 border-b border-blue-200"
// //       >
// //         {["About", "Contact", "Privacy", "Terms", "Disclaimer"].map((item) => (
// //           <Link 
// //             key={item}
// //             to={`/${item.toLowerCase()}`} 
// //             className="text-sm text-slate-700 hover:text-blue-600 transition-colors font-medium"
// //           >
// //             {item}
// //           </Link>
// //         ))}
// //       </motion.div>

// //       {/* ── BOTTOM ROW: social pills left · credits right ── */}
// //       <motion.div
// //         custom={3} variants={fadeUp} initial="hidden" animate={controls}
// //         className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10"
// //       >
// //         {/* Social pill buttons - white bg with black text, blue on hover */}
// //         <div className="flex flex-wrap items-center gap-3">
// //           {socialLinks.map(({ Icon, href, label }) => (
// //             <motion.a
// //               key={label}
// //               href={href}
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               aria-label={label}
// //               className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-300 text-[12px] font-semibold tracking-[0.1em] uppercase text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 bg-white shadow-sm"
// //               whileHover={{ scale: 1.04 }}
// //               whileTap={{ scale: 0.96 }}
// //             >
// //               <Icon size={13} className="text-slate-500 group-hover:text-white" />
// //               {label}
// //             </motion.a>
// //           ))}
// //         </div>

// //         {/* Version badge + Credits */}
// //         <div className="text-right text-[12px] leading-relaxed">
// //           <div className="flex items-center gap-2 justify-end mb-1">
// //             <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full flex items-center gap-1 border border-blue-200">
// //               <Sparkles size={10} className="text-blue-500" /> 
// //               <span className="font-medium">v2.0</span>
// //             </span>
// //           </div>
// //           <p className="flex items-center gap-1 justify-end text-slate-500">
// //             <span>Made with</span> 
// //             <Heart size={10} className="text-pink-500 fill-current" /> 
// //             <span>by</span>
// //             <a
// //               href="https://www.futurdoom.com"
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
// //             >
// //               futurdoom
// //             </a>
// //           </p>
// //         </div>
// //       </motion.div>

// //       {/* Bottom subtle blue line */}
// //       <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
// //     </footer>
// //   );
// // };

// // export default Footer;


// import React, { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion, useInView, useAnimation } from "framer-motion";
// import {
//   Github, Linkedin, Twitter, Facebook, Mail,
//   ArrowUpRight, Sparkles, Globe, Shield, FileText,
// } from "lucide-react";

// /* ── tiny animated gradient orb ── */
// const Orb = ({ style }) => (
//   <div
//     aria-hidden
//     className="pointer-events-none absolute rounded-full"
//     style={{ filter: "blur(72px)", ...style }}
//   />
// );

// /* ── single social icon ── */
// const SocialIcon = ({ Icon, href, label }) => (
//   <motion.a
//     href={href}
//     target={href.startsWith("mailto") ? "_self" : "_blank"}
//     rel="noopener noreferrer"
//     aria-label={label}
//     className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-500 transition-colors"
//     style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
//     whileHover={{ scale: 1.15, color: "#fff", borderColor: "rgba(139,92,246,0.5)", backgroundColor: "rgba(139,92,246,0.12)" }}
//     whileTap={{ scale: 0.9 }}
//   >
//     <Icon size={15} strokeWidth={1.8} />
//   </motion.a>
// );

// /* ── footer link ── */
// const FLink = ({ to, label }) => (
//   <motion.div whileHover={{ x: 2 }}>
//     <Link
//       to={to}
//       className="flex items-center gap-1.5 text-[12px] text-zinc-500 hover:text-white transition-colors group"
//     >
//       <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-violet-400" />
//       {label}
//     </Link>
//   </motion.div>
// );

// /* ══════════════════════════════════════════
//    FOOTER
// ══════════════════════════════════════════ */
// const Footer = ({ logoSrc }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-40px" });
//   const controls = useAnimation();
//   const [email, setEmail] = useState("");
//   const [done, setDone] = useState(false);

//   useEffect(() => {
//     if (isInView) controls.start("visible");
//   }, [isInView, controls]);

//   const handleSub = () => {
//     if (!email.trim()) return;
//     setDone(true);
//     setTimeout(() => { setDone(false); setEmail(""); }, 3000);
//   };

//   const ease = [0.16, 1, 0.3, 1];
//   const col = (i = 0) => ({
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease, delay: i * 0.1 } },
//   });

//   const links = [
//     { label: "About",       to: "/about"      },
//     { label: "Contact",     to: "/contact"    },
//     { label: "Privacy",     to: "/privacy"    },
//     { label: "Terms",       to: "/terms"      },
//     { label: "Disclaimer",  to: "/disclaimer" },
//   ];

//   const social = [
//     { Icon: Github,   href: "https://github.com/futurdoom",           label: "GitHub"   },
//     { Icon: Twitter,  href: "https://twitter.com/futurdoom",          label: "Twitter"  },
//     { Icon: Linkedin, href: "https://linkedin.com/company/futurdoom", label: "LinkedIn" },
//     { Icon: Facebook, href: "https://facebook.com/futurdoom",         label: "Facebook" },
//     { Icon: Mail,     href: "mailto:feedbackfuturdoom@gmail.com",     label: "Email"    },
//   ];

//   return (
//     <footer ref={ref} className="relative overflow-hidden" style={{ background: "#06060a" }}>

//       {/* ── ambient orbs ── */}
//       <Orb style={{ top: "-120px", left: "-80px",  width: 420, height: 420, opacity: 0.18, background: "radial-gradient(circle, #2563eb, transparent 70%)" }} />
//       <Orb style={{ bottom: "-80px", right: "-60px", width: 380, height: 380, opacity: 0.15, background: "radial-gradient(circle, #7c3aed, transparent 70%)" }} />

//       {/* ── top shimmer line ── */}
//       <div aria-hidden className="absolute top-0 inset-x-0 h-px"
//         style={{ background: "linear-gradient(90deg, transparent, #3b82f6 25%, #8b5cf6 50%, #ec4899 75%, transparent)" }} />

//       {/* ════════════════════════════════════════
//           UPPER CARD — newsletter + tagline
//       ════════════════════════════════════════ */}
//       <div className="relative px-6 sm:px-12 lg:px-20 pt-16 pb-0">
//         <motion.div
//           variants={col(0)} initial="hidden" animate={controls}
//           className="relative rounded-3xl overflow-hidden p-8 sm:p-12 mb-0"
//           style={{
//             background: "linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(124,58,237,0.1) 50%, rgba(236,72,153,0.06) 100%)",
//             border: "1px solid rgba(255,255,255,0.06)",
//           }}
//         >
//           {/* inner glow */}
//           <div aria-hidden className="absolute inset-0 opacity-30 pointer-events-none"
//             style={{ background: "radial-gradient(ellipse at top left, rgba(59,130,246,0.2) 0%, transparent 60%)" }} />

//           <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

//             {/* left: brand + tagline */}
//             <div className="flex flex-col gap-4 max-w-sm">
//               {/* logo */}
//               {logoSrc ? (
//                 <img src={logoSrc} alt="futurdoom" className="h-9 w-auto object-contain" />
//               ) : (
//                 <Link to="/" className="text-[26px] tracking-tight leading-none select-none w-fit">
//                   <span className="font-thin text-zinc-400">futur</span>
//                   <span className="font-black"
//                     style={{ background: "linear-gradient(90deg,#3b82f6,#8b5cf6,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
//                     DooM
//                   </span>
//                 </Link>
//               )}
//               <p className="text-[13px] text-zinc-400 leading-relaxed">
//                 Where emotions meet AI — express freely, connect deeply, feel authentically.
//               </p>
//               {/* trust row */}
//               <div className="flex items-center gap-3 flex-wrap">
//                 {[
//                   { Icon: Sparkles, text: "AI-Powered" },
//                   { Icon: Shield,   text: "SSL Secure"  },
//                   { Icon: Globe,    text: "Global"      },
//                 ].map(({ Icon, text }) => (
//                   <span key={text} className="flex items-center gap-1.5 text-[10px] font-semibold text-zinc-500 tracking-wide">
//                     <Icon size={10} className="text-violet-400" /> {text}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* right: newsletter */}
//             <div className="flex flex-col gap-3 w-full lg:w-auto lg:min-w-[340px]">
//               <p className="text-[11px] font-black tracking-[0.18em] uppercase text-zinc-500">
//                 Stay in the loop
//               </p>
//               <p className="text-[13px] text-zinc-400">Get updates on new features & AI releases.</p>
//               <div className="flex gap-2 mt-1">
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={e => setEmail(e.target.value)}
//                   onKeyDown={e => e.key === "Enter" && handleSub()}
//                   placeholder="your@email.com"
//                   className="flex-1 px-4 py-2.5 rounded-xl text-[13px] text-white placeholder-zinc-600 outline-none transition-all"
//                   style={{
//                     background: "rgba(255,255,255,0.05)",
//                     border: "1px solid rgba(255,255,255,0.08)",
//                   }}
//                   onFocus={e => e.target.style.borderColor = "rgba(139,92,246,0.5)"}
//                   onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
//                 />
//                 <motion.button
//                   onClick={handleSub}
//                   className="px-5 py-2.5 rounded-xl text-[12px] font-black text-white whitespace-nowrap"
//                   style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)", boxShadow: "0 4px 20px rgba(124,58,237,0.35)" }}
//                   whileHover={{ scale: 1.04, boxShadow: "0 6px 28px rgba(124,58,237,0.5)" }}
//                   whileTap={{ scale: 0.96 }}
//                 >
//                   {done ? "✓ Sent!" : "Subscribe"}
//                 </motion.button>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* ════════════════════════════════════════
//           MIDDLE — nav columns + social
//       ════════════════════════════════════════ */}
//       <div className="relative px-6 sm:px-12 lg:px-20 py-12">
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">

//           {/* col 1: quick links */}
//           <motion.div variants={col(0.1)} initial="hidden" animate={controls} className="col-span-2 sm:col-span-1">
//             <p className="text-[10px] font-black tracking-[0.18em] uppercase text-zinc-600 mb-4">Quick Links</p>
//             <div className="flex flex-col gap-2.5">
//               {links.map(l => <FLink key={l.label} {...l} />)}
//             </div>
//           </motion.div>

//           {/* col 2: contact */}
//           <motion.div variants={col(0.2)} initial="hidden" animate={controls}>
//             <p className="text-[10px] font-black tracking-[0.18em] uppercase text-zinc-600 mb-4">Contact</p>
//             <div className="flex flex-col gap-2.5">
//               <a href="mailto:feedbackfuturdoom@gmail.com"
//                 className="text-[12px] text-zinc-500 hover:text-white transition-colors break-all">
//                 feedbackfuturdoom@gmail.com
//               </a>
//               <a href="https://www.futurdoom.com" target="_blank" rel="noopener noreferrer"
//                 className="text-[12px] text-zinc-500 hover:text-white transition-colors">
//                 www.futurdoom.com
//               </a>
//             </div>
//           </motion.div>

//           {/* col 3: platform */}
//           <motion.div variants={col(0.3)} initial="hidden" animate={controls}>
//             <p className="text-[10px] font-black tracking-[0.18em] uppercase text-zinc-600 mb-4">Platform</p>
//             <div className="flex flex-col gap-2.5">
//               {["Emotion Feed", "AI Chat", "Community", "Explore"].map(item => (
//                 <Link key={item} to="/"
//                   className="text-[12px] text-zinc-500 hover:text-white transition-colors">
//                   {item}
//                 </Link>
//               ))}
//             </div>
//           </motion.div>

//           {/* col 4: social */}
//           <motion.div variants={col(0.4)} initial="hidden" animate={controls}>
//             <p className="text-[10px] font-black tracking-[0.18em] uppercase text-zinc-600 mb-4">Follow Us</p>
//             <div className="flex flex-wrap gap-2">
//               {social.map(s => <SocialIcon key={s.label} {...s} />)}
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* ════════════════════════════════════════
//           BOTTOM BAR
//       ════════════════════════════════════════ */}
//       <motion.div
//         variants={col(0.5)} initial="hidden" animate={controls}
//         className="relative px-6 sm:px-12 lg:px-20 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
//         style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
//       >
//         <span className="text-[11px] text-zinc-600">© 2026 futurdoom. All rights reserved.</span>
//         <span
//           className="text-[11px] font-semibold"
//           style={{ background: "linear-gradient(90deg,#3b82f6,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
//         >
//           Built with Emotion AI ✦
//         </span>
//       </motion.div>

//     </footer>
//   );
// };

// export default Footer;

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  Github, Linkedin, Twitter, Facebook, Mail,
  ArrowUpRight, Sparkles, Globe, Shield,
} from "lucide-react";

/* ── social icon ── */
const SocialIcon = ({ Icon, href, label }) => (
  <motion.a
    href={href}
    target={href.startsWith("mailto") ? "_self" : "_blank"}
    rel="noopener noreferrer"
    aria-label={label}
    className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 border border-slate-200 bg-white transition-all duration-200"
    whileHover={{ scale: 1.14, color: "#2563eb", borderColor: "#bfdbfe", backgroundColor: "#eff6ff" }}
    whileTap={{ scale: 0.9 }}
  >
    <Icon size={15} strokeWidth={1.8} />
  </motion.a>
);

/* ── nav link ── */
const FLink = ({ to, label }) => (
  <motion.div whileHover={{ x: 2 }}>
    <Link
      to={to}
      className="flex items-center gap-1.5 text-[12px] text-slate-500 hover:text-blue-600 transition-colors group"
    >
      <ArrowUpRight
        size={10}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400"
      />
      {label}
    </Link>
  </motion.div>
);

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
const Footer = ({ logoSrc }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const controls = useAnimation();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const handleSub = () => {
    if (!email.trim()) return;
    setDone(true);
    setTimeout(() => { setDone(false); setEmail(""); }, 3000);
  };

  const ease = [0.16, 1, 0.3, 1];
  const col = (delay = 0) => ({
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease, delay } },
  });

  const links = [
    { label: "About",      to: "/about"      },
    { label: "Contact",    to: "/contact"    },
    { label: "Privacy",    to: "/privacy"    },
    { label: "Terms",      to: "/terms"      },
    { label: "Disclaimer", to: "/disclaimer" },
  ];

   const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/330px-Instagram_logo_2022.svg.png",
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/240px-2023_Facebook_icon.svg.png",
  },
  {
    name: "X (Twitter)",
    href: "https://twitter.com",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/X_%28formerly_Twitter%29_logo_late_2025.svg/330px-X_%28formerly_Twitter%29_logo_late_2025.svg.png",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
  },
  {
    name: "GitHub",
    href: "https://github.com",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
];

  

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden bg-white"
      style={{ borderTop: "1px solid #e8f0fe" }}
    >
      {/* ════════════════════════════════════════
          UPPER CARD — brand + newsletter
      ════════════════════════════════════════ */}
      <div className="relative px-6 sm:px-12 lg:px-6 pt-6 pb-0">
        <motion.div
          variants={col(0)} initial="hidden" animate={controls}
          className="relative rounded-xl overflow-hidden p-8 sm:p-10 mb-0"
          style={{
            background: "linear-gradient(135deg, #eff6ff 0%, #f5f3ff 60%, #fdf2f8 100%)",
            border: "1px solid #e8f0fe",
            boxShadow: "0 4px 32px rgba(37,99,235,0.07)",
          }}
        >
          {/* inner shimmer */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{ background: "radial-gradient(ellipse at top left, rgba(59,130,246,0.1) 0%, transparent 55%)" }}
          />

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

            {/* LEFT — logo, tagline, trust */}
            <div className="flex flex-col gap-4 max-w-sm">
              {logoSrc ? (
                <img src={logoSrc} alt="futurdoom" className="h-9 w-auto object-contain" />
              ) : (
                <Link to="/" className="text-[26px] tracking-tight leading-none select-none w-fit">
                  <span className="font-thin text-black">futur</span>
                  <span
                    className="font-black text-blue-500"
                    
                  >
                    DooM
                  </span>
                </Link>
              )}

              <p className="text-[13px] text-slate-500 leading-relaxed">
                Where emotions meet AI — express freely, connect deeply, feel authentically.
              </p>

              <div className="flex items-center gap-4 flex-wrap">
                {[
                  { Icon: Sparkles, text: "AI-Powered" },
                  { Icon: Shield,   text: "SSL Secure"  },
                  { Icon: Globe,    text: "Global"      },
                ].map(({ Icon, text }) => (
                  <span key={text} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 tracking-wide uppercase">
                    <Icon size={10} className="text-blue-500" /> {text}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — newsletter */}
            <div className="flex flex-col gap-3 w-full lg:w-auto lg:min-w-[340px]">
              <p className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-400">
                Stay in the loop
              </p>
              <p className="text-[13px] text-slate-500">
                Get updates on new features & AI releases.
              </p>
              <div className="flex gap-2 mt-1">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSub()}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 rounded-xl text-[13px] text-slate-700 placeholder-slate-400 bg-white outline-none transition-all"
                  style={{ border: "1.5px solid #e2e8f0" }}
                  onFocus={e => e.target.style.borderColor = "#93c5fd"}
                  onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                />
                <motion.button
                  onClick={handleSub}
                  className="px-5 py-2.5 rounded-xl text-[12px] font-black text-white whitespace-nowrap"
                  style={{
                    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                    boxShadow: "0 4px 16px rgba(124,58,237,0.25)",
                  }}
                  whileHover={{ scale: 1.04, boxShadow: "0 6px 24px rgba(124,58,237,0.38)" }}
                  whileTap={{ scale: 0.96 }}
                >
                  {done ? "✓ Done!" : "Subscribe"}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ════════════════════════════════════════
          MIDDLE — 4-column grid
      ════════════════════════════════════════ */}
      <div className="relative px-6 sm:px-12 lg:px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">

          {/* Quick Links */}
          <motion.div variants={col(0.1)} initial="hidden" animate={controls} className="col-span-2 sm:col-span-1">
            <p className="text-[10px] font-black tracking-[0.18em] uppercase text-slate-400 mb-4">
              Quick Links
            </p>
            <div className="flex flex-col gap-2.5">
              {links.map(l => <FLink key={l.label} {...l} />)}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div variants={col(0.2)} initial="hidden" animate={controls}>
            <p className="text-[10px] font-black tracking-[0.18em] uppercase text-slate-400 mb-4">
              Contact
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:feedbackfuturdoom@gmail.com"
                className="text-[12px] text-slate-500 hover:text-blue-600 transition-colors break-all"
              >
                feedbackfuturdoom@gmail.com
              </a>
              <a
                href="https://www.futurdoom.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-slate-500 hover:text-blue-600 transition-colors"
              >
                www.futurdoom.com
              </a>
            </div>
          </motion.div>

          {/* Platform */}
          <motion.div variants={col(0.3)} initial="hidden" animate={controls}>
            <p className="text-[10px] font-black tracking-[0.18em] uppercase text-slate-400 mb-4">
              Platform
            </p>
            <div className="flex flex-col gap-2.5">
              {["Emotion Feed", "AI Chat", "Community", "Explore"].map(item => (
                <Link
                  key={item}
                  to="/"
                  className="text-[12px] text-slate-500 hover:text-blue-600 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Follow */}
          <motion.div variants={col(0.4)} initial="hidden" animate={controls}>
            <p className="text-[10px] font-black tracking-[0.18em] uppercase text-slate-400 mb-4">
              Follow Us
            </p>
            <div className="flex gap-3 ">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.name}
                className="w-7 h-7 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center hover:scale-110 hover:shadow-md transition-all duration-200"
              >
                <img src={social.img} alt={social.name} className="w-5 h-5 object-contain" />
              </a>
            ))}
          </div>
          </motion.div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          BOTTOM BAR
      ════════════════════════════════════════ */}
      <motion.div
        variants={col(0.5)} initial="hidden" animate={controls}
        className="relative px-6 sm:px-12 lg:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ borderTop: "1px solid #f1f5f9" }}
      >
        <span className="text-[11px] text-slate-400">
          © 2026 futurdoom. All rights reserved.
        </span>
        <span
          className="text-[11px] font-bold"
          style={{
            background: "linear-gradient(90deg,#2563eb,#7c3aed)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Built with Emotion AI ✦
        </span>
      </motion.div>
    </footer>
  );
};

export default Footer;