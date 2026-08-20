import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  Search,
  Bookmark,
  Bell,
  Bot,
  Sparkles,
  FileText,
  Activity,
  Building2,
  Users,
  CheckCircle2,
  ArrowRight,
  Download,
  Briefcase,
  ShieldCheck,
  Zap,
  GraduationCap,
  UserCheck,
  Layers,
  Send,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

const Creator = () => {
  const [activeTab, setActiveTab] = useState("student"); // 'student' or 'recruiter'

  // Student features list
  const studentFeatures = [
    {
      icon: <Search className="text-amber-500" size={24} />,
      title: "Browse & Search Jobs",
      desc: "Filter through thousands of verified job vacancies by category, location, salary range, and experience level.",
    },
    {
      icon: <Bookmark className="text-amber-500" size={24} />,
      title: "Save & Unsave Jobs",
      desc: "Bookmark target opportunities with one click to organize your job hunt and review saved listings anytime.",
    },
    {
      icon: <Bell className="text-amber-500" size={24} />,
      title: "Real-time Email Notifications",
      desc: "Receive instant email and portal alerts whenever new jobs matching your target role are posted.",
    },
    {
      icon: <Bot className="text-amber-500" size={24} />,
      title: "AI Career Assistant (ChatGPT-like)",
      desc: "Built-in AI helper to assist with resume refinement, cover letters, and interview preparation 24/7.",
    },
    {
      icon: <Sparkles className="text-amber-500" size={24} />,
      title: "AI Job Recommendations",
      desc: "Smart algorithm analyzes your profile skills and preference history to auto-suggest best-fit job openings.",
    },
    {
      icon: <FileText className="text-amber-500" size={24} />,
      title: "Profile & Resume Management",
      desc: "Seamlessly update profile data, upload modern PDF resumes, preview, and download your latest resume.",
    },
    {
      icon: <Activity className="text-amber-500" size={24} />,
      title: "Real-time Application Tracker",
      desc: "Track status updates (Applied → Under Review → Shortlisted → Interview → Offered) in real-time.",
    },
    {
      icon: <Send className="text-amber-500" size={24} />,
      title: "One-Click Job Application",
      desc: "Apply to multiple companies instantly using your saved profile and active resume setup.",
    },
  ];

  // Recruiter features list
  const recruiterFeatures = [
    {
      icon: <Building2 className="text-amber-500" size={24} />,
      title: "Company Profile & Listing",
      desc: "Showcase your company brand, culture, web links, and open hiring requirements in a custom directory.",
    },
    {
      icon: <Briefcase className="text-amber-500" size={24} />,
      title: "Post Job Vacancies",
      desc: "Create and publish detailed job postings with custom requirements, salary packages, and location tags.",
    },
    {
      icon: <Users className="text-amber-500" size={24} />,
      title: "Applicant Tracking System (ATS)",
      desc: "Access candidate applications organized per job listing with filtering by skills and qualifications.",
    },
    {
      icon: <UserCheck className="text-amber-500" size={24} />,
      title: "Update Hiring Status",
      desc: "Update applicant statuses live (Reviewed, Shortlisted, Rejected, Hired) with automated candidate updates.",
    },
    {
      icon: <Download className="text-amber-500" size={24} />,
      title: "Instant Resume Download",
      desc: "Inspect student profiles and download verified candidate resumes in PDF format with one click.",
    },
    {
      icon: <ShieldCheck className="text-amber-500" size={24} />,
      title: "Verified Hiring Pipeline",
      desc: "Ensure transparent, fast communication between hiring managers and top talent.",
    },
  ];

  // Statistics
  const platformStats = [
    { value: "10,000+", label: "Active Job Listings" },
    { value: "50,000+", label: "Registered Students" },
    { value: "2,500+", label: "Top Hiring Companies" },
    { value: "95%", label: "Placement Success Rate" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative bg-[#0f1f35] overflow-hidden py-24 px-6 text-white">
        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-400/10 border border-amber-400/30 rounded-full text-xs font-bold text-amber-400 uppercase tracking-widest mb-6">
            <Zap size={14} /> Reimagining Career Portals
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight mb-6">
            About <span className="text-amber-400">JobMitra</span>
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
            JobMitra is an intelligent, real-time recruitment ecosystem designed to connect 
            <span className="text-white font-semibold"> Students & Job Seekers</span> directly with 
            <span className="text-amber-400 font-semibold"> Recruiters & Hiring Companies</span>. Built with AI-driven matching, live status tracking, and seamless resume tools.
          </p>

          {/* Quick CTA Pill Switcher */}
          <div className="inline-flex p-1.5 bg-slate-800/80 border border-slate-700 rounded-2xl shadow-xl">
            <button
              onClick={() => setActiveTab("student")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                activeTab === "student"
                  ? "bg-amber-400 text-[#0f1f35] shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <GraduationCap size={18} /> For Students & Candidates
            </button>
            <button
              onClick={() => setActiveTab("recruiter")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                activeTab === "recruiter"
                  ? "bg-amber-400 text-[#0f1f35] shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Building2 size={18} /> For Employers & Recruiters
            </button>
          </div>
        </div>
      </section>

      {/* ── STATS COUNTER ── */}
      <section className="bg-white border-b border-slate-200 py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {platformStats.map((stat, i) => (
            <div key={i} className="p-4">
              <p className="text-3xl sm:text-4xl font-black text-[#0f1f35]">{stat.value}</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PORTAL CAPABILITIES BREAKDOWN ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold text-amber-700 uppercase tracking-wider mb-3">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f1f35] tracking-tight">
            Designed for Both <span className="text-amber-500">Seekers &amp; Employers</span>
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto mt-2">
            Switch tabs to see how JobMitra empowers students to land their dream jobs and recruiters to hire top talent effortlessly.
          </p>
        </div>

        {/* Dynamic Feature Grid based on Tab */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(activeTab === "student" ? studentFeatures : recruiterFeatures).map((item, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-[#0f1f35] mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-amber-600">
                <span>Explore Feature</span> <ChevronRight size={14} className="ml-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HIGHLIGHT: AI & REALTIME ENGINE ── */}
      <section className="bg-[#0f1f35] py-20 px-6 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-400/10 border border-amber-400/30 rounded-full text-xs font-bold text-amber-400 uppercase tracking-widest mb-4">
              <Sparkles size={14} /> Smart Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6 leading-tight">
              Powered by <span className="text-amber-400">AI Assistant</span> &amp; Real-time Alerts
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              JobMitra combines cutting-edge AI features with live web-socket notifications to deliver a friction-free job hunting experience:
            </p>

            <ul className="space-y-4">
              {[
                {
                  title: "ChatGPT-like AI Assistant",
                  desc: "Ask career questions, get instant resume review tips, and practice interview Q&As.",
                },
                {
                  title: "Automated Job Recommendations",
                  desc: "Intelligent matching engine analyzes candidate skills and maps them to active vacancies.",
                },
                {
                  title: "Real-time Status Tracking & Email Push",
                  desc: "Get notified immediately via email and portal banners whenever a recruiter updates your application.",
                },
                {
                  title: "Seamless PDF Resume Engine",
                  desc: "Upload, store, preview, and download updated resumes anytime for one-click job applications.",
                },
              ].map((feat, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="text-amber-400 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="text-sm font-bold text-white">{feat.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{feat.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Showcase Card Mockup */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                  <Bot size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">JobMitra AI Coach</h4>
                  <span className="text-[10px] text-green-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" /> Online &amp; Ready
                  </span>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 bg-amber-400/10 text-amber-400 rounded-full font-mono">
                GPT-Powered
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="bg-slate-800/80 rounded-xl p-3 text-slate-300">
                <p className="text-amber-400 font-bold mb-1">🤖 JobMitra AI:</p>
                "Hello! Based on your React &amp; Node.js profile, I recommend applying for 'Full-Stack Developer' at TechCorp. Would you like me to optimize your resume bullets?"
              </div>

              <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-3 text-amber-200 ml-6">
                <p className="font-bold mb-1">👤 Candidate Status:</p>
                "Application #JM-9082 updated to <span className="text-green-400 font-bold">SHORTLISTED</span>. Real-time email sent!"
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WORKFLOW: HOW IT WORKS ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold text-amber-700 uppercase tracking-wider mb-3">
            Simple &amp; Efficient
          </span>
          <h2 className="text-3xl font-extrabold text-[#0f1f35]">
            How JobMitra Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Create Account",
              desc: "Sign up as a Student or Recruiter. Build your profile or list your company in minutes.",
            },
            {
              step: "02",
              title: "Discover or Post",
              desc: "Students search, save & apply for jobs with AI recommendations. Recruiters post vacancies instantly.",
            },
            {
              step: "03",
              title: "Track & Connect",
              desc: "Get real-time application updates, download resumes, and hire top talent directly.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="relative bg-white border border-slate-200 rounded-2xl p-7 shadow-sm text-center"
            >
              <span className="text-4xl font-black text-amber-400/40 absolute top-4 right-6 font-mono">
                {item.step}
              </span>
              <div className="w-12 h-12 rounded-xl bg-[#0f1f35] text-amber-400 flex items-center justify-center font-bold text-lg mx-auto mb-4">
                {index + 1}
              </div>
              <h3 className="text-lg font-bold text-[#0f1f35] mb-2">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CREATOR / FOUNDER SECTION ── */}
      <section className="bg-white border-t border-b border-slate-200 py-16 px-6">
        <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-8 shadow-sm">
          {/* Creator Avatar */}
          <div className="flex-shrink-0 relative">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#0f1f35] to-[#2563a8] flex items-center justify-center text-4xl font-black text-white shadow-xl select-none">
              MG
            </div>
            <div className="absolute -bottom-2 -right-2 bg-amber-400 text-[#0f1f35] text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow">
              Founder &amp; Dev 🚀
            </div>
          </div>

          {/* Bio */}
          <div className="text-center sm:text-left">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              Meet the Creator
            </span>
            <h3 className="text-2xl font-black text-[#0f1f35] mt-1 mb-2">
              Milan Gauswami
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
              "JobMitra was born out of a mission to eliminate clutter from traditional job search platforms. 
              As a Full-Stack developer, I built JobMitra to provide a clean, intelligent, and transparent portal 
              that genuinely empowers job seekers while making candidate selection seamless for recruiters."
            </p>
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-full hover:bg-slate-800 transition"
              >
                <Github size={14} /> GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0a66c2] text-white text-xs font-semibold rounded-full hover:bg-[#0958a8] transition"
              >
                <Linkedin size={14} /> LinkedIn
              </a>
              <a
                href="mailto:milan@gmail.com"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-400 text-[#0f1f35] text-xs font-bold rounded-full hover:bg-amber-300 transition"
              >
                <Mail size={14} /> Contact Milan
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION ── */}
      <section className="bg-gradient-to-br from-[#0f1f35] to-[#1a3354] py-16 px-6 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold tracking-tight mb-4">
            Ready to Experience <span className="text-amber-400">JobMitra</span>?
          </h2>
          <p className="text-slate-300 text-sm mb-8 leading-relaxed">
            Join thousands of job seekers and hiring recruiters today. Explore jobs, track applications live, or post your next vacancy in minutes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-[#0f1f35] font-bold text-sm rounded-full hover:bg-amber-300 transition shadow-lg"
            >
              Get Started Now <ArrowRight size={16} />
            </a>
            <a
              href="/jobs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold text-sm rounded-full hover:bg-white/20 transition"
            >
              Browse Jobs
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Creator;