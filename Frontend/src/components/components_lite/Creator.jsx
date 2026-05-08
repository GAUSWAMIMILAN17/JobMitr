import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Palette,
  Server,
  Smartphone,
} from "lucide-react";

const skills = [
  { name: "React.js",     level: 92, color: "#61dafb" },
  { name: "Node.js",      level: 88, color: "#84cc16" },
  { name: "MongoDB",      level: 83, color: "#4ade80" },
  { name: "Tailwind CSS", level: 95, color: "#f59e0b" },
  { name: "Express.js",   level: 85, color: "#94a3b8" },
  { name: "Redux",        level: 80, color: "#a78bfa" },
];

const timeline = [
  {
    year: "2022",
    title: "Started Coding Journey",
    desc: "Fell in love with web development, began learning HTML, CSS & JavaScript from scratch.",
    icon: "💡",
  },
  {
    year: "2023",
    title: "Mastered React & Node",
    desc: "Built my first full-stack projects, dived deep into the MERN stack ecosystem.",
    icon: "⚡",
  },
  {
    year: "2024",
    title: "Built JobMitra",
    desc: "Created a full-featured job portal connecting thousands of job seekers with top employers.",
    icon: "🚀",
  },
  {
    year: "2025",
    title: "Open to Opportunities",
    desc: "Looking for exciting roles where I can build products that make a real difference.",
    icon: "🎯",
  },
];

const services = [
  { icon: <Code2 size={22} />,      title: "Frontend Dev",  desc: "React, Tailwind, animations & pixel-perfect UIs." },
  { icon: <Server size={22} />,     title: "Backend Dev",   desc: "Node.js, Express REST APIs & MongoDB databases." },
  { icon: <Palette size={22} />,    title: "UI/UX Design",  desc: "Clean, user-friendly interfaces that convert." },
  { icon: <Smartphone size={22} />, title: "Responsive",    desc: "Flawless experience on every screen size." },
];

const SkillBar = ({ name, level, color }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setWidth(level);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-semibold text-[#0f1f35]">{name}</span>
        <span className="text-xs font-bold" style={{ color }}>{level}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%`, background: color }}
        />
      </div>
    </div>
  );
};

const Creator = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative bg-[#0f1f35] overflow-hidden">
        {/* decorative bg */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-5"
            style={{
              background: "radial-gradient(circle, #4a90d9 0%, transparent 70%)",
              transform: "translate(-30%, 30%)",
            }}
          />
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-14">
          {/* Avatar */}
          <div className="flex-shrink-0 relative">
            <div className="w-44 h-44 rounded-3xl bg-gradient-to-br from-[#4a90d9] to-[#2563a8] flex items-center justify-center text-6xl font-black text-white shadow-2xl select-none">
              MG
            </div>
            <div className="absolute -bottom-3 -right-3 bg-amber-400 text-[#0f1f35] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
              Open to Work 🎯
            </div>
          </div>

          {/* Text */}
          <div className="text-center lg:text-left">
            <span className="inline-block text-amber-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">
              👋 Hello, I'm
            </span>
            <h1 className="text-5xl lg:text-6xl font-black text-white leading-none tracking-tight mb-2">
              Milan<br />
              <span className="text-amber-400">Gauswami</span>
            </h1>
            <p className="text-slate-400 text-lg font-medium mt-4 mb-6 max-w-lg">
              Full-Stack Developer & the creator of{" "}
              <span className="text-white font-bold">JobMitra</span> — building
              products that bridge talent with opportunity.
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/15 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition-all duration-150"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0a66c2] text-white text-sm font-semibold rounded-full hover:bg-[#0958a8] transition-all duration-150"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                href="mailto:milan@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-[#0f1f35] text-sm font-semibold rounded-full hover:bg-amber-300 active:scale-95 transition-all duration-150"
              >
                <Mail size={16} /> Hire Me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold text-amber-700 uppercase tracking-wider mb-4">
            About Me
          </span>
          <h2 className="text-3xl font-extrabold text-[#0f1f35] leading-tight mb-4 tracking-tight">
            Passionate about building{" "}
            <span className="text-amber-500">things that matter</span>
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-4">
            I'm a full-stack developer from India with a passion for creating clean,
            performant, and user-centric web applications. I specialize in the MERN
            stack and love turning complex problems into simple, beautiful solutions.
          </p>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            JobMitra was born from a personal frustration with clunky job portals.
            I wanted to build something that genuinely helps job seekers find their
            dream role and helps recruiters discover great talent — fast, clean, and
            without the noise.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "15+",  label: "Projects Built" },
              { value: "3+",   label: "Years Coding"   },
              { value: "100%", label: "Passion"         },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm"
              >
                <p className="text-2xl font-black text-[#0f1f35]">{value}</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1 h-5 bg-amber-400 rounded-full" />
            <h3 className="text-base font-bold text-[#0f1f35]">Tech Skills</h3>
          </div>
          {skills.map((s) => (
            <SkillBar key={s.name} {...s} />
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="bg-[#0f1f35] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-400/10 border border-amber-400/25 rounded-full text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
              What I Do
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Services &amp; <span className="text-amber-400">Expertise</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-amber-400/10 hover:border-amber-400/30 transition-all duration-200 cursor-default"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-400/15 border border-amber-400/25 flex items-center justify-center text-amber-400 mb-4 group-hover:bg-amber-400 group-hover:text-[#0f1f35] transition-all duration-200">
                  {icon}
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5">{title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold text-amber-700 uppercase tracking-wider mb-3">
            My Journey
          </span>
          <h2 className="text-3xl font-extrabold text-[#0f1f35] tracking-tight">
            How I <span className="text-amber-500">Got Here</span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-slate-200" />
          <div className="space-y-8">
            {timeline.map(({ year, title, desc, icon }, i) => (
              <div key={i} className="relative flex gap-6 items-start">
                <div className="relative z-10 w-16 h-16 flex-shrink-0 rounded-2xl bg-white border-2 border-amber-400 flex items-center justify-center text-2xl shadow-sm">
                  {icon}
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 flex-1 shadow-sm">
                  <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                    {year}
                  </span>
                  <h3 className="text-sm font-bold text-[#0f1f35] mt-0.5 mb-1.5">{title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-br from-[#0f1f35] to-[#1a3354] py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-4xl mb-4">🤝</div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-3">
            Let's Build Something{" "}
            <span className="text-amber-400">Great Together</span>
          </h2>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            Whether you're looking to hire a developer, collaborate on a project,
            or just want to chat about tech — my inbox is always open.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="mailto:milan@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-[#0f1f35] font-bold text-sm rounded-full hover:bg-amber-300 active:scale-95 transition-all duration-150 shadow-lg"
            >
              <Mail size={16} /> Get In Touch
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/15 text-white font-semibold text-sm rounded-full hover:bg-white/20 transition-all duration-150"
            >
              <ExternalLink size={16} /> View Portfolio
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Creator;