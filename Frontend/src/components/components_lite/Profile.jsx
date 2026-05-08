import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Mail, Phone, Pen, Download, Briefcase, FileText, User } from "lucide-react";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";
import Footer from "./Footer";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const originalName = user?.profile?.resumeOriginalName?.replace(/\.pdf$/i, "");
  const downloadUrl = user?.profile?.resume?.replace(
    "/upload/",
    `/upload/fl_attachment:${originalName}/`
  );
  const hasResume = !!user?.profile?.resume;
  const skills = user?.profile?.skills || [];

  const getInitials = (name = "") =>
    name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-10 space-y-6">

        {/* ── Profile Card ── */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          {/* Navy header banner */}
          <div className="h-28 bg-gradient-to-r from-[#0f1f35] to-[#1a3354] relative">
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            {/* Edit button */}
            <button
              onClick={() => setOpen(true)}
              className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 border border-white/20 text-white text-xs font-semibold rounded-full hover:bg-white/20 transition-all duration-150"
            >
              <Pen size={12} />
              Edit Profile
            </button>
          </div>

          {/* Avatar + info */}
          <div className="px-7 pb-7">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12 mb-6">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="h-24 w-24 rounded-2xl border-4 border-white shadow-lg">
                  <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                </Avatar>
                {!user?.profile?.profilePhoto && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#4a90d9] to-[#2563a8] flex items-center justify-center text-white text-2xl font-black select-none">
                    {getInitials(user?.fullname)}
                  </div>
                )}
              </div>
            </div>

            {/* Name + bio */}
            <div className="mb-6">
              <h1 className="text-xl font-extrabold text-[#0f1f35] tracking-tight">
                {user?.fullname || "Your Name"}
              </h1>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed max-w-lg">
                {user?.profile?.bio || "No bio added yet."}
              </p>
            </div>

            {/* Contact row */}
            <div className="flex flex-wrap gap-4 mb-7">
              {user?.email && (
                <a
                  href={`mailto:${user.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-600 font-medium hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 transition-all duration-150"
                >
                  <Mail size={14} className="text-amber-500" />
                  {user.email}
                </a>
              )}
              {user?.phoneNumber && (
                <a
                  href={`tel:${user.phoneNumber}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-600 font-medium hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 transition-all duration-150"
                >
                  <Phone size={14} className="text-amber-500" />
                  {user.phoneNumber}
                </a>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-100 mb-6" />

            {/* Skills */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1 h-4 bg-amber-400 rounded-full" />
                <h2 className="text-sm font-bold text-[#0f1f35] uppercase tracking-wide">
                  Skills
                </h2>
              </div>
              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#0f1f35]/5 border border-[#0f1f35]/10 text-[#0f1f35] text-xs font-semibold rounded-full hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 transition-all duration-150"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic">No skills added yet.</p>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-100 mb-6" />

            {/* Resume */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1 h-4 bg-amber-400 rounded-full" />
                <h2 className="text-sm font-bold text-[#0f1f35] uppercase tracking-wide">
                  Resume
                </h2>
              </div>
              {hasResume ? (
                <a
                  href={downloadUrl}
                  download={`${originalName}.pdf`}
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#0f1f35] text-white text-sm font-semibold rounded-full hover:bg-amber-400 hover:text-[#0f1f35] active:scale-95 transition-all duration-150 shadow-sm"
                >
                  <Download size={14} />
                  {originalName ? `${originalName}.pdf` : "Download Resume"}
                </a>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-400">
                  <FileText size={14} />
                  No resume uploaded yet
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Applied Jobs ── */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 px-7 py-5 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
              <Briefcase size={15} className="text-amber-500" />
            </div>
            <h2 className="text-base font-bold text-[#0f1f35]">Applied Jobs</h2>
          </div>
          <div className="px-4 pb-4">
            <AppliedJob />
          </div>
        </div>

      </main>

      <EditProfileModal open={open} setOpen={setOpen} />
      <Footer />
    </div>
  );
};

export default Profile;