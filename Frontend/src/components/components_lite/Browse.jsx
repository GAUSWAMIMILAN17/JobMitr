import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Job1 from "./Job1";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import Footer from "./Footer";
import { Search, X, Briefcase, TrendingUp, Building2, SlidersHorizontal } from "lucide-react";

const POPULAR_SEARCHES = ["Frontend Developer", "Data Analyst", "UI/UX Designer", "Marketing", "Backend Developer"];

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [localQuery, setLocalQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const filteredJobs = allJobs.filter((job) => {
    const q = localQuery.toLowerCase();
    return (
      job?.title?.toLowerCase().includes(q) ||
      job?.company?.name?.toLowerCase().includes(q) ||
      job?.jobType?.toLowerCase().includes(q)
    );
  });

  const clearSearch = () => setLocalQuery("");

  const handlePopularTag = (tag) => {
    setLocalQuery(tag);
    dispatch(setSearchedQuery(tag));
  };

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* ── Hero Search Banner ── */}
      <div className="relative bg-[#0f1f35] overflow-hidden">
        {/* decorative circles */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-amber-400/[0.07] pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-[#4a90d9]/[0.08] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
          {/* Heading */}
          <div className="flex items-center gap-2 mb-1">
            <Briefcase size={15} className="text-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Job Listings
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">
            Browse All Jobs
          </h1>
          <p className="text-sm text-white/45 mb-6">
            Explore{" "}
            <span className="text-amber-400 font-semibold">{allJobs.length}</span>{" "}
            opportunities and find your perfect match
          </p>

          {/* Search bar */}
          <div
            className={`flex items-center w-full max-w-2xl bg-white rounded-2xl overflow-hidden transition-all duration-200 ${
              focused
                ? "shadow-[0_0_0_3px_rgba(245,158,11,0.4)]"
                : "shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
            }`}
          >
            <Search size={16} className="text-slate-400 shrink-0 ml-4 mr-2" />
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Search job title, company, or type…"
              className="flex-1 h-12 border-none outline-none text-sm text-slate-800 bg-transparent placeholder:text-slate-400"
            />
            {localQuery && (
              <button
                onClick={clearSearch}
                className="p-2 mr-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-150 cursor-pointer border-none bg-transparent"
              >
                <X size={14} />
              </button>
            )}
            <button className="h-12 px-6 bg-amber-400 hover:bg-amber-300 text-[#0f1f35] text-sm font-bold flex items-center gap-2 transition-all duration-150 cursor-pointer border-none shrink-0 rounded-r-2xl">
              <Search size={14} />
              Search
            </button>
          </div>

          {/* Popular tags */}
          <div className="flex items-center gap-2 flex-wrap mt-4">
            <span className="text-xs text-white/30 font-medium">Popular:</span>
            {POPULAR_SEARCHES.map((tag) => (
              <button
                key={tag}
                onClick={() => handlePopularTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-150 cursor-pointer
                  ${localQuery === tag
                    ? "bg-amber-400/20 border-amber-400/40 text-amber-300"
                    : "bg-white/[0.07] border-white/[0.12] text-white/50 hover:bg-amber-400/15 hover:text-amber-300 hover:border-amber-400/30"
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats Strip ── */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <Briefcase size={14} className="text-[#4682B4]" />
            </div>
            <div>
              <p className="text-xs text-slate-400 leading-none">Total Jobs</p>
              <p className="text-sm font-bold text-slate-800">{allJobs.length}</p>
            </div>
          </div>

          <div className="w-px h-8 bg-slate-200" />

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <TrendingUp size={14} className="text-amber-500" />
            </div>
            <div>
              <p className="text-xs text-slate-400 leading-none">Showing</p>
              <p className="text-sm font-bold text-slate-800">{filteredJobs.length} results</p>
            </div>
          </div>

          <div className="w-px h-8 bg-slate-200" />

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Building2 size={14} className="text-emerald-500" />
            </div>
            <div>
              <p className="text-xs text-slate-400 leading-none">Companies</p>
              <p className="text-sm font-bold text-slate-800">
                {[...new Set(allJobs.map((j) => j?.company?.name))].length}
              </p>
            </div>
          </div>

          {/* Right side: active filter pill */}
          {localQuery && (
            <div className="ml-auto flex items-center gap-2">
              <SlidersHorizontal size={13} className="text-slate-400" />
              <span className="text-xs text-slate-500">
                Filtered by:{" "}
                <span className="font-semibold text-slate-700">"{localQuery}"</span>
              </span>
              <button
                onClick={clearSearch}
                className="ml-1 inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-red-50 hover:text-red-500 text-slate-500 text-xs font-medium rounded-full transition-all duration-150 cursor-pointer border-none"
              >
                <X size={11} /> Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Main Content ── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {filteredJobs.length > 0 ? (
          <>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mb-5">
              {filteredJobs.length} {filteredJobs.length === 1 ? "Job" : "Jobs"} Found
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredJobs.map((job) => (
                <Job1 key={job._id} job={job} />
              ))}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 gap-5">
            <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
              <Search size={28} className="text-slate-300" />
            </div>
            <div className="text-center">
              <p className="text-slate-700 font-bold text-lg mb-1">No jobs found</p>
              <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
                {localQuery
                  ? `No results for "${localQuery}". Try a different keyword.`
                  : "No jobs available right now. Check back later."}
              </p>
            </div>
            {localQuery && (
              <button
                onClick={clearSearch}
                className="px-5 py-2.5 bg-[#4682B4] hover:bg-[#6899c2] text-white text-sm font-semibold rounded-xl transition-all duration-150 cursor-pointer border-none"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Browse;