import React from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";
import { Briefcase, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LatestJobs = () => {
  const allJobs = useSelector((state) => state.job?.allJobs || []);
  const navigate = useNavigate();
  const validJobs = allJobs.filter((job) => job?._id).slice(0, 6);

  return (
    <section className="bg-slate-50 py-14 px-4 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs font-semibold text-amber-700 tracking-wide uppercase mb-3">
              <Briefcase size={12} />
              Fresh Opportunities
            </span>
            <h2 className="text-3xl font-extrabold text-[#0f1f35] tracking-tight leading-tight">
              Latest &amp;{" "}
              <span className="text-amber-400">Top</span> Job Openings
            </h2>
            <p className="text-sm text-slate-500 mt-1.5">
              Hand-picked roles updated daily — apply before they're gone.
            </p>
          </div>

          {validJobs.length > 0 && (
            <button
              onClick={() => navigate("/browse")}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0f1f35] text-white text-sm font-semibold rounded-full hover:bg-amber-400 hover:text-[#0f1f35] active:scale-95 transition-all duration-150 shadow-sm"
            >
              View All Jobs
              <ArrowRight size={15} />
            </button>
          )}
        </div>

        {/* Job Cards Grid */}
        {validJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
              <Briefcase size={28} className="text-slate-300" />
            </div>
            <p className="text-base font-semibold text-slate-500">
              No job openings right now
            </p>
            <p className="text-sm text-slate-400">
              Check back soon — new roles are posted every day.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {validJobs.map((job) => (
              <JobCards key={job._id} job={job} />
            ))}
          </div>
        )}

        {/* Bottom CTA strip */}
        {validJobs.length > 0 && (
          <div className="mt-10 flex flex-col items-center gap-3">
            <p className="text-sm text-slate-400">
              Showing {validJobs.length} of {allJobs.length} available positions
            </p>
            <button
              onClick={() => navigate("/browse")}
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#0f1f35] text-[#0f1f35] text-sm font-semibold rounded-full hover:bg-[#0f1f35] hover:text-white active:scale-95 transition-all duration-150"
            >
              Explore All Openings
              <ArrowRight size={15} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default LatestJobs;