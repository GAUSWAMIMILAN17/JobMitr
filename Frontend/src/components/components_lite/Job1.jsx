import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bookmark,
  BookMarked,
  MapPin,
  Briefcase,
  IndianRupee,
  Users,
} from "lucide-react";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { setStarredJobs } from "../../redux/jobSlice";
import { toast } from "sonner";

const Job1 = ({ job }) => {
  const navigate = useNavigate();
  // var [bookmarked, setBookmarked] = useState(false);
  const dispatch = useDispatch();
  const starredJobs = useSelector((store) => store.job.starredJobs);

  const bookmarked = starredJobs?.some(
    (savedJob) => (savedJob._id || savedJob).toString() === job._id.toString(),
  );

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const daysAgo = daysAgoFunction(job?.createdAt);

  const saveButton = async () => {
    try {
      if (bookmarked) return;

      const res = await axios.post(
        `${JOB_API_ENDPOINT}/starJob/${job._id}`,
        {},
        { withCredentials: true },
      );
      if (res.data.status) {
        dispatch(setStarredJobs(res.data.starredJobs));
      }
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error removing starred job:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="group bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 transition-all duration-200 hover:border-[#0f1f35]/20 hover:shadow-[0_8px_32px_rgba(15,31,53,0.1)] hover:-translate-y-0.5 cursor-pointer">
      {/* Top row: date + bookmark */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium">
          {daysAgo === 0 ? (
            <span className="text-emerald-500 font-semibold">● Today</span>
          ) : (
            <span className="text-slate-400">{daysAgo} days ago</span>
          )}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            saveButton();
          }}
          className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-150 cursor-pointer
            ${
              bookmarked
                ? "bg-amber-400 border-amber-400 text-[#0f1f35]"
                : "bg-white border-slate-200 text-slate-400 hover:bg-amber-400 hover:border-amber-400 hover:text-[#0f1f35]"
            }`}
        >
          {bookmarked ? <BookMarked size={14} /> : <Bookmark size={14} />}
        </button>
      </div>

      {/* Company info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
          {job?.company?.logo ? (
            <img
              src={job.company.logo}
              alt={job?.company?.name}
              className="w-full h-full object-contain p-1.5"
            />
          ) : (
            <span className="text-base font-bold text-[#0f1f35]">
              {job?.company?.name?.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-800 leading-tight">
            {job?.company?.name}
          </h2>
          <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
            <MapPin size={11} />
            India
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-100" />

      {/* Job title */}
      <h1 className="text-base font-bold text-slate-900 leading-snug">
        {job?.title}
      </h1>

      {/* Badges */}
      <div className="flex items-center flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0f1f35]/[0.06] border border-[#0f1f35]/10 text-[#0f1f35] text-xs font-semibold">
          <Users size={11} />
          {job?.position} {job?.position > 1 ? "Positions" : "Position"}
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/25 text-amber-600 text-xs font-semibold">
          <Briefcase size={11} />
          {job?.jobType}
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-semibold">
          <IndianRupee size={11} />
          {job?.salary} LPA
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2.5 mt-auto pt-1">
        {/* Primary — Navbar amber */}
        <button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#0f1f35] text-sm font-bold transition-all duration-150 hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(245,158,11,0.35)] cursor-pointer border-none"
        >
          View Details
        </button>

        {/* Secondary — Navbar navy */}
        <button
          onClick={saveButton}
          className={`py-2.5 px-4 rounded-xl text-sm font-semibold border transition-all duration-150 cursor-pointer
            ${
              bookmarked
                ? "bg-amber-400 border-amber-400 text-[#0f1f35]"
                : "bg-white border-[#0f1f35]/20 text-[#0f1f35] hover:bg-[#0f1f35] hover:text-white hover:border-[#0f1f35]"
            }`}
        >
          {bookmarked ? "Saved ✓" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default Job1;
