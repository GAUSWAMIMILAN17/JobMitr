import React, { useEffect, useState } from "react";
import { Edit2, Eye, Briefcase, Search, Users, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { setAllAdminJobs } from "@/redux/jobSlice";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    const filtered =
      allAdminJobs?.filter((job) => {
        if (!searchJobByText) return true;
        return (
          job.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            ?.toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      }) || [];
    setFilterJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  const handleDeleteJob = async (jobId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure? This will delete the job and all applications.",
      );

      if (!confirmDelete) return;

      const response = await axios.delete(
        `${JOB_API_ENDPOINT}/deleteJob/${jobId}`,
        {
          withCredentials: true,
        },
      );

      if (response.data.status) {
        toast.success(response.data.message);
        // console.log("Job deleted successfully:", response.data);
        // Remove deleted job from UI immediately
        dispatch(
        setAllAdminJobs(
          allAdminJobs.filter((job) => job._id !== jobId)
        )
      );
      }
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to delete job");
    }
  };

  const jobTypeStyles = {
    "Full-time": "bg-blue-50 text-blue-700 border-blue-200",
    "Part-time": "bg-purple-50 text-purple-700 border-purple-200",
    Remote: "bg-teal-50 text-teal-700 border-teal-200",
    Hybrid: "bg-indigo-50 text-indigo-700 border-indigo-200",
    Internship: "bg-pink-50 text-pink-700 border-pink-200",
  };

  const getJobTypeClass = (type) =>
    jobTypeStyles[type] || "bg-slate-100 text-slate-600 border-slate-200";

  const avatarColors = [
    ["bg-blue-100", "text-blue-700"],
    ["bg-amber-100", "text-amber-700"],
    ["bg-teal-100", "text-teal-700"],
    ["bg-purple-100", "text-purple-700"],
    ["bg-rose-100", "text-rose-700"],
  ];

  const getAvatarColor = (name = "") => {
    const idx = (name?.charCodeAt(0) || 0) % avatarColors.length;
    return avatarColors[idx];
  };

  /* ── Loading ── */
  if (!allAdminJobs) {
    return (
      <div className="flex items-center justify-center py-16 gap-3">
        <div className="w-8 h-8 rounded-full border-[3px] border-slate-200 border-t-[#0f1f35] animate-spin" />
        <p className="text-sm text-slate-400 font-medium">Loading jobs…</p>
      </div>
    );
  }

  /* ── Empty ── */
  if (filterJobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
          {searchJobByText ? (
            <Search size={24} className="text-slate-300" />
          ) : (
            <Briefcase size={24} className="text-slate-300" />
          )}
        </div>
        <p className="text-sm font-semibold text-slate-500">
          {searchJobByText
            ? `No jobs found for "${searchJobByText}"`
            : "No jobs posted yet"}
        </p>
        <p className="text-xs text-slate-400">
          {searchJobByText
            ? "Try a different search term."
            : 'Click "Post New Job" to get started.'}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        {/* Head */}
        <thead>
          <tr className="border-b border-slate-100">
            {["Company", "Role", "Type", "Posted On", "Actions"].map(
              (col, i) => (
                <th
                  key={col}
                  className={`px-6 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest ${
                    i === 4 ? "text-right" : "text-left"
                  }`}
                >
                  {col}
                </th>
              ),
            )}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {filterJobs.map((job, idx) => {
            const companyName = job?.company?.name || "Unknown";
            const [avatarBg, avatarText] = getAvatarColor(companyName);
            const isLast = idx === filterJobs.length - 1;

            return (
              <tr
                key={job._id || job.id}
                className={`group hover:bg-slate-50 transition-colors duration-100 ${
                  !isLast ? "border-b border-slate-100" : ""
                }`}
              >
                {/* Company */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${avatarBg} ${avatarText}`}
                    >
                      <Button className="p-6" variant="outline" size="icon">
                        <Avatar>
                          <AvatarImage src={job?.company?.logo} />
                        </Avatar>
                      </Button>
                    </div>
                    <span className="text-sm font-semibold text-[#0f1f35]">
                      {companyName}
                    </span>
                  </div>
                </td>

                {/* Role */}
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-[#0f1f35]">
                    {job.title}
                  </p>
                  {job.location && (
                    <p className="text-xs text-slate-400 mt-0.5">
                      {job.location}
                    </p>
                  )}
                </td>

                {/* Type */}
                <td className="px-6 py-4">
                  {job.jobType ? (
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${getJobTypeClass(job.jobType)}`}
                    >
                      {job.jobType}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">—</span>
                  )}
                </td>

                {/* Date */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-500">
                    {job.createdAt?.split("T")[0] ?? "—"}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2  transition-opacity duration-150">
                    <button
                      onClick={() => navigate(`/admin/jobs/${job._id}`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0f1f35] bg-white border border-slate-200 rounded-lg hover:bg-[#0f1f35] hover:text-white hover:border-[#0f1f35] active:scale-95 transition-all duration-150"
                    >
                      <Edit2 size={11} />
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-400 hover:text-[#0f1f35] hover:border-amber-400 active:scale-95 transition-all duration-150"
                    >
                      <Users size={11} />
                      Applicants
                    </button>
                    <button
                       onClick={() => handleDeleteJob(job._id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-red-500 border border-slate-200 rounded-lg hover:bg-[#0f1f35] hover:text-white hover:border-[#0f1f35] active:scale-95 transition-all duration-150"
                    >
                      <Trash2 size={11} />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>

        {/* Footer */}
        <tfoot>
          <tr>
            <td
              colSpan={5}
              className="px-6 py-3 text-xs text-slate-400 text-center border-t border-slate-100"
            >
              Showing {filterJobs.length} of {allAdminJobs.length} jobs
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default AdminJobsTable;
