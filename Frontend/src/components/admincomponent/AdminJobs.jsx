import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components_lite/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllJAdminobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import Footer from "../components_lite/Footer";
import {
  Search,
  Plus,
  Briefcase,
  Building2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useGetAllCompanies from "@/hooks/usegetAllCompanies";

// List of companies & job categories for quick filtering
const companyCategories = [
  "All",
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Netflix",
  "Apple",
  "Frontend",
  "Backend",
  "Full Stack",
  "DevOps",
  "Data Science",
  "UI/UX Design",
  "Product Manager",
];

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const scrollContainerRef = useRef(null);
  const dispatch = useDispatch();
  const { companies } = useSelector((store) => store.company);


  useGetAllCompanies(); // Fetch all companies for filtering

  const categories = ["All", ...companies.map((company) => company.name)];

  // Sync input with Redux search state
  useEffect(() => {
    dispatch(setSearchJobByText(input));
    // console.log("Search input updated:", input);
  }, [input, dispatch]);

  // Handle filter selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setInput("");
    } else {
      setInput(category);
    }
  };

  // Scroll controls for category list
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-10">
        {/* Page header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1 h-5 bg-amber-400 rounded-full" />
            <h1 className="text-xl font-extrabold text-[#0f1f35] tracking-tight">
              All Jobs
            </h1>
          </div>
          <p className="text-sm text-slate-400 pl-3">
            Manage all posted job listings across your companies.
          </p>
        </div>

        {/* Search & Action Toolbar */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setSelectedCategory(e.target.value ? "" : "All");
              }}
              placeholder="Search by job title or company…"
              className="w-full pl-9 pr-4 py-2.5 text-sm text-[#0f1f35] bg-white border border-slate-200 rounded-xl outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-150 placeholder:text-slate-400"
            />
          </div>

          {/* Post new job button */}
          <button
            onClick={() => navigate("/admin/jobs/create")}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0f1f35] text-white text-sm font-semibold rounded-xl hover:bg-amber-400 hover:text-[#0f1f35] active:scale-95 transition-all duration-150 shadow-sm flex-shrink-0"
          >
            <Plus size={16} />
            Post New Job
          </button>
        </div>

        {/* ── Scrollable Company / Category Bar ── */}
        <div className="mb-6 flex items-center gap-2 bg-white border border-slate-200/80 rounded-2xl p-2 shadow-sm">
          {/* Label */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0f1f35] shrink-0 pl-2 pr-1">
            <Building2 size={15} className="text-amber-500" />
            <span className="hidden sm:inline">Company Filter:</span>
          </div>

          {/* Left scroll arrow button */}
          <button
            onClick={() => scroll("left")}
            className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition shrink-0"
            title="Scroll Left"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Scrollable Categories List */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none flex-1 whitespace-nowrap scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((category) => {
              const isActive = selectedCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all duration-150 shrink-0 ${
                    isActive
                      ? "bg-amber-400 text-[#0f1f35] font-bold shadow-sm ring-2 ring-amber-400/30"
                      : "bg-slate-50 border border-slate-200/80 text-slate-600 hover:border-amber-300 hover:bg-amber-50/50 hover:text-[#0f1f35]"
                  }`}
                >
                  {category !== "All" && (
                    <Building2
                      size={12}
                      className={isActive ? "text-[#0f1f35]" : "text-slate-400"}
                    />
                  )}

                  {category}
                </button>
              );
            })}
          </div>

          {/* Right scroll arrow button */}
          <button
            onClick={() => scroll("right")}
            className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition shrink-0"
            title="Scroll Right"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Table Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
              <Briefcase size={15} className="text-amber-500" />
            </div>
            <h2 className="text-sm font-bold text-[#0f1f35]">Posted Jobs</h2>
            {input && (
              <span className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-semibold text-amber-700">
                <Search size={10} />"{input}"
              </span>
            )}
          </div>
          <AdminJobsTable />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminJobs;
