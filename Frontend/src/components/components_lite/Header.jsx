import React, { useState } from "react";
import { Search } from "lucide-react";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const popularTags = ["Frontend Developer", "Data Analyst", "UI/UX Designer", "Marketing"];

const Header = () => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = () => {
    if (!query.trim()) return;
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") searchjobHandler();
  };

  const handleTagClick = (tag) => {
    dispatch(setSearchedQuery(tag));
    navigate("/browse");
  };

  return (
    <section className="relative overflow-hidden bg-[#0f1f35] min-h-[52vh] flex items-center justify-center px-6 py-14">

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f1f35] via-[#1a3354] to-[#1e3a5f] pointer-events-none" />

      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-amber-400/[0.06] pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full bg-[#4a90d9]/[0.07] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-5 w-full max-w-2xl">

        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 px-[18px] py-[7px] bg-amber-400/[0.12] border border-amber-400/25 rounded-full text-[13px] font-semibold text-amber-400 tracking-wide">
          <PiBuildingOfficeBold className="text-[15px]" />
          No.1 Job Hunt Website
        </span>

        {/* Headline */}
        <h1 className="text-[clamp(32px,5vw,52px)] font-extrabold text-white text-center m-0 leading-[1.15] tracking-tight">
          Find Your{" "}
          <span className="text-amber-400">Dream Job</span>{" "}
          Today
        </h1>

        {/* Subtext */}
        <p className="text-[15.5px] text-white/55 text-center m-0 leading-relaxed max-w-[480px]">
          Start your hunt for the best, life-changing career opportunities
          from here in your selected areas — and get hired quickly.
        </p>

        {/* Search Bar */}
        <div
          className={`flex items-center w-full max-w-[520px] mt-2 bg-white rounded-full overflow-hidden transition-all duration-200 ${
            focused
              ? "border-2 border-amber-400 shadow-[0_0_0_4px_rgba(245,158,11,0.15)]"
              : "border-2 border-transparent shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
          }`}
        >
          <Search size={17} className="text-slate-400 shrink-0 ml-[18px] mr-1" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Job title, company, or keyword…"
            className="flex-1 h-[50px] border-none outline-none text-[14.5px] text-slate-900 bg-transparent px-2 placeholder:text-slate-400"
          />
          <button
            onClick={searchjobHandler}
            className="h-[50px] px-6 bg-[#0f1f35] hover:bg-amber-400 text-white hover:text-[#0f1f35] border-none rounded-r-full text-sm font-semibold flex items-center gap-1.5 shrink-0 tracking-wide transition-all duration-150 cursor-pointer"
          >
            <Search size={15} />
            Search
          </button>
        </div>

        {/* Popular Tags */}
        <div className="flex items-center gap-2 flex-wrap justify-center mt-0.5">
          <span className="text-[12.5px] text-white/35">Popular:</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="px-[13px] py-1 bg-white/[0.07] border border-white/[0.12] rounded-full text-[12.5px] text-white/60 cursor-pointer transition-all duration-150 hover:bg-amber-400/15 hover:text-amber-400 hover:border-amber-400/30"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Header;