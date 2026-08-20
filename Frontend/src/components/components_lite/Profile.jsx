import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  Mail,
  Phone,
  Pen,
  Download,
  Briefcase,
  FileText,
  Upload,
  Loader2,
} from "lucide-react";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";
import { useDispatch, useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";
import Footer from "./Footer";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data";
import { setUser } from "@/redux/authSlice";

const Profile = () => {
  useGetAppliedJobs();

  const [open, setOpen] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  // Remove .pdf from original filename
  const originalName = user?.profile?.resumeOriginalName?.replace(
    /\.pdf$/i,
    ""
  );

  // Cloudinary download URL
  const downloadUrl = user?.profile?.resume?.replace(
    "/upload/",
    `/upload/fl_attachment:${originalName}/`
  );

  const hasResume = !!user?.profile?.resume;

  const skills = user?.profile?.skills || [];

  // Generate initials
  const getInitials = (name = "") =>
    name
      .trim()
      .split(/\s+/)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  // ==========================================
  // RESUME UPLOAD
  // ==========================================

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // PDF validation
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      e.target.value = "";
      return;
    }

    // 5MB validation
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Resume size must be less than 5MB");
      e.target.value = "";
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {
      setUploadingResume(true);

      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        // Update Redux user
        dispatch(setUser(res.data.user));

        toast.success("Resume uploaded successfully");
      }
    } catch (error) {
      console.error("Resume upload error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to upload resume"
      );
    } finally {
      setUploadingResume(false);

      // Allow selecting the same file again
      e.target.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-10 space-y-6">

        {/* ==========================================
            PROFILE CARD
        ========================================== */}

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          {/* Header Banner */}
          <div className="h-28 bg-gradient-to-r from-[#0f1f35] to-[#1a3354] relative">

            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Edit Button */}
            <button
              onClick={() => setOpen(true)}
              className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 border border-white/20 text-white text-xs font-semibold rounded-full hover:bg-white/20 transition-all duration-150"
            >
              <Pen size={12} />
              Edit Profile
            </button>
          </div>

          {/* Avatar + Info */}
          <div className="px-7 pb-7">

            {/* Avatar */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12 mb-6">

              <div className="relative">

                <Avatar className="h-24 w-24 rounded-2xl border-4 border-white shadow-lg">

                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt={user?.fullname}
                  />

                </Avatar>

                {!user?.profile?.profilePhoto && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#4a90d9] to-[#2563a8] flex items-center justify-center text-white text-2xl font-black select-none">
                    {getInitials(user?.fullname)}
                  </div>
                )}

              </div>

            </div>

            {/* Name + Bio */}
            <div className="mb-6">

              <h1 className="text-xl font-extrabold text-[#0f1f35] tracking-tight">
                {user?.fullname || "Your Name"}
              </h1>

              <p className="text-sm text-slate-500 mt-1 leading-relaxed max-w-lg">
                {user?.profile?.bio || "No bio added yet."}
              </p>

            </div>

            {/* Contact */}
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

            {/* ==========================================
                SKILLS
            ========================================== */}

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
                <p className="text-sm text-slate-400 italic">
                  No skills added yet.
                </p>
              )}

            </div>

            {/* Divider */}
            <div className="h-px bg-slate-100 mb-6" />

            {/* ==========================================
                RESUME
            ========================================== */}

            <div>

              <div className="flex items-center gap-2 mb-3">

                <span className="w-1 h-4 bg-amber-400 rounded-full" />

                <h2 className="text-sm font-bold text-[#0f1f35] uppercase tracking-wide">
                  Resume
                </h2>

              </div>

              <div className="flex items-center gap-3 flex-wrap">

                {/* Existing Resume */}
                {hasResume ? (
                  <a
                    href={downloadUrl}
                    download={`${originalName}.pdf`}
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#0f1f35] text-white text-sm font-semibold rounded-full hover:bg-amber-400 hover:text-[#0f1f35] active:scale-95 transition-all duration-150 shadow-sm"
                  >
                    <Download size={14} />

                    {originalName
                      ? `${originalName}.pdf`
                      : "Download Resume"}
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-400">
                    <FileText size={14} />
                    No resume uploaded yet
                  </div>
                )}

                {/* ==========================================
                    UPLOAD / UPDATE RESUME ICON
                ========================================== */}

                <label
                  htmlFor="resume-upload"
                  title={
                    hasResume
                      ? "Update Resume"
                      : "Upload Resume"
                  }
                  className={`
                    cursor-pointer
                    inline-flex
                    items-center
                    justify-center
                    w-10
                    h-10
                    rounded-full
                    border
                    transition-all
                    duration-200
                    active:scale-95
                    ${
                      uploadingResume
                        ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                        : "bg-slate-100 border-slate-200 text-slate-500 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200"
                    }
                  `}
                >

                  {uploadingResume ? (
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                  ) : (
                    <Upload size={18} />
                  )}

                  <input
                    id="resume-upload"
                    type="file"
                    accept="application/pdf"
                    onChange={handleResumeUpload}
                    disabled={uploadingResume}
                    className="hidden"
                  />

                </label>

              </div>

              {/* Helper Text */}
              <p className="text-xs text-slate-400 mt-2">
                {uploadingResume
                  ? "Uploading resume..."
                  : hasResume
                  ? "Click the upload icon to update your resume."
                  : "PDF only • Maximum size 5MB"}
              </p>

            </div>

          </div>
        </div>

        {/* ==========================================
            APPLIED JOBS
        ========================================== */}

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          <div className="flex items-center gap-3 px-7 py-5 border-b border-slate-100">

            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">

              <Briefcase
                size={15}
                className="text-amber-500"
              />

            </div>

            <h2 className="text-base font-bold text-[#0f1f35]">
              Applied Jobs
            </h2>

          </div>

          <div className="px-4 pb-4">
            <AppliedJob />
          </div>

        </div>

      </main>

      {/* Edit Profile Modal */}
      <EditProfileModal
        open={open}
        setOpen={setOpen}
      />

      <Footer />

    </div>
  );
};

export default Profile;