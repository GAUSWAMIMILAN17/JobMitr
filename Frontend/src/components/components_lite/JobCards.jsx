import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, IndianRupee, Briefcase, Users, ArrowRight } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const jobTypeStyles = {
  "Full-time":  { bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-200"   },
  "Part-time":  { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200"  },
  "Remote":     { bg: "bg-teal-50",   text: "text-teal-700",   border: "border-teal-200"    },
  "Hybrid":     { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200"  },
  "Internship": { bg: "bg-pink-50",   text: "text-pink-700",   border: "border-pink-200"    },
};

const avatarColors = [
  ["bg-blue-100",   "text-blue-700"],
  ["bg-amber-100",  "text-amber-700"],
  ["bg-teal-100",   "text-teal-700"],
  ["bg-purple-100", "text-purple-700"],
  ["bg-rose-100",   "text-rose-700"],
];

function getInitials(name) {
  if (!name || typeof name !== "string") return "JB";
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

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

const JobCards = ({ job }) => {
  const navigate = useNavigate();

  if (!job) return null;

  const typeStyle = getJobTypeStyle(job.jobType);
  const [avatarBg, avatarText] = getAvatarColor(job.name);
  

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="group bg-white border border-slate-200 rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:border-[#0f1f35] hover:shadow-[0_6px_24px_rgba(15,31,53,0.10)] hover:-translate-y-1 active:scale-[0.98]"
    >
      {/* Company row */}
      <div className="flex items-center gap-3 mb-4">
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
            {job.company.name || "Company"}
          </p>
          <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
            <MapPin size={11} className="flex-shrink-0" />
            <span className="truncate">{job.location || "India"}</span>
          </div>
        </div>

        {/* Job type badge */}
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
                <span className="font-semibold text-[#0f1f35]">{job.position}</span> Openings
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
                <span className="font-semibold text-[#0f1f35]">{job.salary}</span> LPA
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
        <span className="text-xs text-slate-400 font-medium">View details</span>
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#0f1f35] text-white text-xs font-semibold rounded-full group-hover:bg-amber-400 group-hover:text-[#0f1f35] transition-all duration-150">
          Apply Now
          <ArrowRight size={12} />
        </span>
      </div>
    </div>
  );
};

export default JobCards;