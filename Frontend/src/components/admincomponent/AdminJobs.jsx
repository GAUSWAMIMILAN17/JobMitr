import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllJAdminobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import Footer from "../components_lite/Footer";
import { Search, Plus, Briefcase } from "lucide-react";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

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

        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">

          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
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

        {/* Table card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
              <Briefcase size={15} className="text-amber-500" />
            </div>
            <h2 className="text-sm font-bold text-[#0f1f35]">
              Posted Jobs
            </h2>
            {input && (
              <span className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-semibold text-amber-700">
                <Search size={10} />
                "{input}"
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