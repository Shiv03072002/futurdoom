import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Info, ArrowRight, Mail, Sparkles, Globe2, ChevronRight } from 'lucide-react';

/* ── Particle Canvas ── */
const ParticleField = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      dx: (Math.random() - 0.5) * 0.32,
      dy: (Math.random() - 0.5) * 0.32,
      o: Math.random() * 0.45 + 0.1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147,197,253,${p.o})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 85) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(147,197,253,${0.14 * (1 - dist / 85)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

/* ── Typewriter ── */
const Typewriter = ({ words, className }) => {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[idx];
    let timeout;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else {
      setDeleting(false);
      setIdx((idx + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx, words]);
  return (
    <span className={className}>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.75, repeat: Infinity }}
        className="inline-block w-[2px] h-[0.85em] bg-blue-300 ml-0.5 align-middle rounded-full"
      />
    </span>
  );
};

/* ── Tilt Card ── */
const TiltCard = ({ children, href, delay }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useTransform(y, [-40, 40], [7, -7]);
  const rotY = useTransform(x, [-40, 40], [-7, 7]);
  const handleMouse = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  };
  return (
    <motion.a
      href={href}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 700 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 240, damping: 24, delay }}
      whileTap={{ scale: 0.96 }}
      className="group flex flex-col p-3.5 rounded-2xl border border-slate-100/80 hover:border-blue-200 bg-white hover:bg-gradient-to-br hover:from-blue-50/70 hover:to-white transition-all duration-200 cursor-pointer"
      style={{ boxShadow: "0 1px 4px rgba(37,99,235,0.05)" }}
    >
      {children}
    </motion.a>
  );
};

/* ── Home ── */
const Home = () => {
  const navItems = [
    { href: "/about", icon: Info, label: "About Us", sub: "Our story" },
    { href: "/contact", icon: Mail, label: "Contact", sub: "Get in touch" },
   
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse 90% 65% at 50% -5%, #cdd9ff 0%, #e8eeff 35%, #f0f4ff 100%)" }}
    >
      {/* BG orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-8 left-8 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(96,165,250,0.2) 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ y: [0, 16, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-8 right-8 w-[28rem] h-[28rem] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(79,70,229,0.1) 0%, transparent 70%)" }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 22 }}
        className="w-full max-w-xl relative z-10"
      >
        {/* Glow halo */}
        <motion.div
          animate={{ opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          className="absolute -inset-px rounded-[22px] pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(96,165,250,0.5) 0%, rgba(37,99,235,0.08) 50%, rgba(96,165,250,0.35) 100%)" }}
        />

        <div
          className="rounded-xl overflow-hidden bg-white relative"
          style={{ boxShadow: "0 8px 16px -4px rgba(37,99,235,0.07), 0 24px 48px -8px rgba(37,99,235,0.12), 0 2px 4px rgba(0,0,0,0.04)" }}
        >

          {/* ════ HEADER ════ */}
          <div
            className="relative overflow-hidden"
            style={{
              background: "linear-gradient(140deg, #090f3d 0%, #0f1f6e 25%, #1535a8 60%, #2563eb 100%)",
              minHeight: 210,
            }}
          >
            <ParticleField />

            {/* Dot-grid overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
                opacity: 0.7,
              }}
            />

            {/* Rotating rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -right-24 -top-24 w-80 h-80 rounded-full border border-white/[0.06] pointer-events-none"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute -right-14 -top-14 w-52 h-52 rounded-full border border-blue-300/10 pointer-events-none"
            />

            {/* Bottom diagonal cut */}
            <div
              className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
              style={{ background: "linear-gradient(to bottom right, transparent 49.5%, white 50%)" }}
            />

            <div className="relative p-7 pb-11">
              {/* Live badge */}
              <motion.div
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.38, type: "spring", stiffness: 220 }}
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-5 border border-white/12 backdrop-blur-sm"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  className="block w-1.5 h-1.5 rounded-full bg-blue-300"
                />
                <span className="text-blue-100/80 text-[9.5px] tracking-[0.22em] uppercase font-semibold">Est. 2026 · Live</span>
              </motion.div>

              {/* Brand name */}
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.46, type: "spring", stiffness: 190 }}
                className="font-black text-white font-normal leading-none tracking-tight mb-1"
                style={{ fontSize: "clamp(2.8rem,9vw,3.6rem)", letterSpacing: "-0.03em" }}
              >
                Futur
                <motion.span
                  className="text-blue-300 font-extrabold"
                  animate={{ textShadow: ["0 0 0px rgba(147,197,253,0)", "0 0 28px rgba(147,197,253,0.7)", "0 0 0px rgba(147,197,253,0)"] }}
                  transition={{ duration: 2.8, repeat: Infinity }}
                >
                  DooM
                </motion.span>
              </motion.h1>

              {/* Taglines */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.62, duration: 0.55 }}
                className="mt-3.5 space-y-1.5"
              >
                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                  <span className="text-white/80 font-medium text-[0.92rem]">A new space where</span>
                  <span className="font-black text-[0.95rem]">
                    <Typewriter
                      words={["Intelligence", "Innovation", "Imagination"]}
                      className="text-blue-200"
                    />
                  </span>
                  <span className="text-blue-300/60 text-sm font-light italic">meets</span>
                  <span
                    className="font-black text-[0.95rem]"
                    style={{
                      background: "linear-gradient(90deg, #bfdbfe, #e0eaff, #93c5fd)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Community
                  </span>
                </div>
                <p className="text-blue-200/45 text-[11px] tracking-wide">
                  Enjoy a new experience with—<span className="text-blue-300/75 font-semibold">futurDooM</span>
                </p>
              </motion.div>
            </div>
          </div>

          {/* ════ BODY ════ */}
          <div className="px-5 pt-4 pb-2">
            {/* Section label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.64 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="block h-px w-3.5 bg-blue-200" />
              <span className="text-[9px] font-black text-blue-400 tracking-[0.32em] uppercase">Get Started</span>
              <span className="block h-px flex-1" style={{ background: "linear-gradient(90deg,#bfdbfe,transparent)" }} />
            </motion.div>

            {/* ── CTA Let's Go ── */}
            <motion.a
              href="/searchpeople"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, type: "spring", stiffness: 230, damping: 22 }}
              whileHover={{ scale: 1.018, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-center justify-between p-4 rounded-2xl overflow-hidden mb-3.5"
              style={{
                background: "linear-gradient(115deg, #0d1b62 0%, #1535a8 40%, #2563eb 80%, #3b82f6 100%)",
                boxShadow: "0 10px 28px -4px rgba(37,99,235,0.50), 0 2px 8px -2px rgba(37,99,235,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              {/* Shimmer sweep */}
              <motion.div
                animate={{ x: ["-130%", "230%"] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 3.5 }}
                className="absolute inset-0 w-2/5 pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.13), transparent)", transform: "skewX(-18deg)" }}
              />
              {/* Bottom glow */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-3/4 h-10 blur-2xl pointer-events-none" style={{ background: "rgba(59,130,246,0.5)" }} />

              <div className="relative z-10 flex items-center gap-3.5">
                <div className="relative flex-shrink-0">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-xl border border-dashed border-white/20"
                  />
                  <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
                    <motion.div animate={{ scale: [1, 1.22, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
                      <Sparkles size={17} className="text-white" />
                    </motion.div>
                  </div>
                </div>
                <div>
                  <p className="font-black text-white text-[13px] tracking-wide">Let's Go</p>
                  <p className="text-[10.5px] text-blue-200/65 font-light">Start your journey now</p>
                </div>
              </div>

              <motion.div
                className="relative z-10"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronRight size={18} className="text-white/90" />
              </motion.div>
            </motion.a>

            {/* ── 3-col grid ── */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {navItems.map(({ href, icon: Icon, label, sub }, i) => (
                <TiltCard key={href} href={href} delay={0.8 + i * 0.1}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2.5 transition-all duration-200"
                    style={{ background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)", border: "1px solid #bfdbfe" }}
                  >
                    <Icon size={14} className="text-blue-600 group-hover:text-blue-700 transition-colors" />
                  </div>
                  <p className="font-bold text-slate-700 text-[11px] mb-0.5 group-hover:text-blue-700 transition-colors">{label}</p>
                  <p className="text-[9.5px] text-slate-400 leading-snug mb-2">{sub}</p>
                  <motion.div className="mt-auto self-end" whileHover={{ x: 3 }}>
                    <ArrowRight size={11} className="text-slate-200 group-hover:text-blue-400 transition-colors" />
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* ════ FOOTER ════ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="px-5 pb-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ scaleY: [0.5, 1.8, 0.5] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
                  className="w-[3px] h-2.5 rounded-full bg-blue-300/60 origin-center"
                />
              ))}
              <span className="text-[9px] text-slate-300 font-medium tracking-widest uppercase ml-1">Active</span>
            </div>
            <p className="text-[9px] text-slate-300 tracking-wide">© 2025 futurdoom · All rights reserved</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;