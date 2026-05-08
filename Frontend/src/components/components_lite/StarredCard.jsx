import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  IndianRupee,
  Briefcase,
  Users,
  ArrowRight,
  Star,
} from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../../utils/data";
import { useDispatch } from "react-redux";
import { setStarredJobs } from "../../redux/jobSlice";
import { toast } from "sonner";

const jobTypeStyles = {
  "Full-time": {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  "Part-time": {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
  },
  Remote: {
    bg: "bg-teal-50",
    text: "text-teal-700",
    border: "border-teal-200",
  },
  Hybrid: {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
  },
  Internship: {
    bg: "bg-pink-50",
    text: "text-pink-700",
    border: "border-pink-200",
  },
};

const avatarColors = [
  ["bg-blue-100", "text-blue-700"],
  ["bg-amber-100", "text-amber-700"],
  ["bg-teal-100", "text-teal-700"],
  ["bg-purple-100", "text-purple-700"],
  ["bg-rose-100", "text-rose-700"],
];

function getAvatarColor(name) {
  if (!name || typeof name !== "string") return avatarColors[0];
  const idx = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[idx];
}

function getJobTypeStyle(type) {
  return (
    jobTypeStyles[type] || {
      bg: "bg-slate-50",
      text: "text-slate-600",
      border: "border-slate-200",
    }
  );
}

const StarredCard = ({ job, onUnstar }) => {
  const navigate = useNavigate();
  const [starred, setStarred] = useState(true);
  const dispatch = useDispatch();
  if (!job) return null;

  const typeStyle = getJobTypeStyle(job.jobType);
  const [avatarBg, avatarText] = getAvatarColor(job.company?.name);

  const handleUnstar = (e) => {
    e.stopPropagation(); // card click thay nahi
    setStarred(false);
    onUnstar?.(job._id);
  };

  const UnsaveButton = async() => {
    try {
      const res = await axios.delete(`${JOB_API_ENDPOINT}/removeStarredJob/${job._id}`, { withCredentials: true });
      if (res.data.status) {
        dispatch(setStarredJobs(res.data.starredJobs));
      }
      toast.success(res.data.message);

    } catch (error) {
      console.error("Error removing starred job:", error);
    }
  }

  return (
    <div
      
      className="group relative bg-white border border-slate-200 rounded-2xl p-5  transition-all duration-200 hover:border-[#0f1f35] hover:shadow-[0_6px_24px_rgba(15,31,53,0.10)] hover:-translate-y-1 active:scale-[0.98]"
    >
      {/* Star button */}
      <button
        onClick={handleUnstar}
        className="absolute top-4 right-4 p-1 text-amber-400  transition-colors duration-150"
      >
        <Star size={18} fill={starred ? "currentColor" : "none"} />
      </button>

      {/* Saved badge */}
      {starred && (
        <span className="inline-flex items-center gap-1 mb-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          <Star size={10} fill="currentColor" /> Saved
        </span>
      )}

      {/* Company row */}
      <div className="flex items-center gap-3 mb-4 pr-6">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${avatarBg} ${avatarText}`}
        >
          <Button className="p-6" variant="outline" size="icon">
            <Avatar>
              <AvatarImage src={job?.company?.logo} />
            </Avatar>
          </Button>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-[#0f1f35] truncate leading-tight">
            {job.company?.name || "Company"}
          </p>
          <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
            <MapPin size={11} className="flex-shrink-0" />
            <span className="truncate">{job.location || "India"}</span>
          </div>
        </div>
        {job.jobType && (
          <span
            className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${typeStyle.bg} ${typeStyle.text} ${typeStyle.border}`}
          >
            {job.jobType}
          </span>
        )}
      </div>

      {/* Job title */}
      <h2 className="text-base font-extrabold text-[#0f1f35] leading-snug mb-3 group-hover:text-amber-600 transition-colors duration-150">
        {job.title || "Job Title"}
      </h2>

      {/* Stats row */}
      <div className="flex items-center gap-3 flex-wrap mb-5">
        {job.position && (
          <>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Users size={13} className="text-slate-400" />
              <span>
                <span className="font-semibold text-[#0f1f35]">
                  {job.position}
                </span>{" "}
                Openings
              </span>
            </div>
            <div className="w-px h-3.5 bg-slate-200" />
          </>
        )}
        {job.salary && (
          <>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <IndianRupee size={12} className="text-slate-400" />
              <span>
                <span className="font-semibold text-[#0f1f35]">
                  {job.salary}
                </span>{" "}
                LPA
              </span>
            </div>
            <div className="w-px h-3.5 bg-slate-200" />
          </>
        )}
        {job.jobType && (
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Briefcase size={12} className="text-slate-400" />
            <span className="font-semibold text-[#0f1f35]">{job.jobType}</span>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between pt-3.5 border-t border-slate-100">
        <Button onClick={UnsaveButton} className="inline-flex items-center gap-1.5 px-4 py-1 bg-[#0f1f35] text-white text-xs font-semibold rounded-full group-hover:bg-amber-400 group-hover:text-[#0f1f35] transition-all duration-150">
          Unsaved
          <ArrowRight size={12} />
        </Button>
        <Button onClick={() => navigate(`/description/${job._id}`)} className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#0f1f35] text-white text-xs font-semibold rounded-full group-hover:bg-amber-400 group-hover:text-[#0f1f35] transition-all duration-150">
          Apply Now
          <ArrowRight size={12} />
        </Button>
      </div>
    </div>
  );
};

export default StarredCard;
