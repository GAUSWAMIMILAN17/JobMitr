import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar.jsx";
import { Button } from "../ui/button.jsx";
import {
  ArrowLeft,
  Loader2,
  Briefcase,
  MapPin,
  DollarSign,
  Users,
  ListChecks,
  BarChart2,
  Tag,
  FileText,
  CalendarDays,
} from "lucide-react";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../../utils/data.js";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetJobById from "@/hooks/useGetJobById.jsx";

const JobSetup = () => {
  const params = useParams();
  const navigate = useNavigate();

  useGetJobById(params.id);

  const { singleJob } = useSelector((store) => store.job);

  const [input, setInput] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    position: "",
    requirements: "",
    experience: "",
    jobType: "",
    applicationDeadline: "",
  });

  const [loading, setLoading] = useState(false);

  // ==============================
  // HANDLE INPUT
  // ==============================

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // ==============================
  // LOAD EXISTING JOB
  // ==============================

  useEffect(() => {
    if (singleJob) {
      setInput({
        title: singleJob.title || "",
        description: singleJob.description || "",
        location: singleJob.location || "",
        salary: singleJob.salary ?? "",
        position: singleJob.position ?? "",
        requirements: singleJob.requirements || "",
        experience: singleJob.experience ?? "",
        jobType: singleJob.jobType || "",
        applicationDeadline: singleJob.applicationDeadline
          ? new Date(singleJob.applicationDeadline)
              .toISOString()
              .split("T")[0]
          : "",
      });
    }
  }, [singleJob]);

  // ==============================
  // SUBMIT
  // ==============================

  const submitHandler = async (e) => {
    e.preventDefault();

    const fixedInput = {
      title: input.title,
      description: input.description,
      location: input.location,
      salary: input.salary,
      position: Number(input.position),
      requirements: input.requirements,
      experience: input.experience,
      jobType: input.jobType,
      applicationDeadline: input.applicationDeadline,
    };

    try {
      setLoading(true);

      const res = await axios.put(
        `${JOB_API_ENDPOINT}/update/${params.id}`,
        fixedInput,
        {
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        toast.success(
          res.data.message || "Job updated successfully"
        );

        navigate("/admin/jobs");
      }
    } catch (error) {
      console.error("Update Job Error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to update job"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* ================= HEADER ================= */}

        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate("/admin/jobs")}
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors duration-150 mb-5 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150" />

            Back to Jobs
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>

            <div>
              <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100 leading-tight">
                Update Job Posting
              </h1>

              {singleJob?.title && (
                <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
                  Editing: {singleJob.title}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ================= FORM CARD ================= */}

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">

          <form onSubmit={submitHandler}>

            <div className="p-6">

              <div className="grid grid-cols-2 gap-x-5 gap-y-5">

                {/* ================= JOB TITLE ================= */}

                <div className="col-span-2">
                  <Label
                    htmlFor="title"
                    className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5"
                  >
                    Job Title
                  </Label>

                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />

                    <Input
                      id="title"
                      type="text"
                      name="title"
                      value={input.title}
                      onChange={changeEventHandler}
                      placeholder="e.g. Senior Frontend Engineer"
                      className="pl-9 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 rounded-lg transition-all duration-150 h-10 text-sm"
                    />
                  </div>
                </div>

                {/* ================= DESCRIPTION ================= */}

                <div className="col-span-2">
                  <Label
                    htmlFor="description"
                    className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5"
                  >
                    Description
                  </Label>

                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-300 pointer-events-none" />

                    <textarea
                      id="description"
                      name="description"
                      value={input.description}
                      onChange={changeEventHandler}
                      placeholder="Brief overview of the role"
                      rows={5}
                      className="w-full pl-9 pt-2.5 pr-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 resize-none"
                    />
                  </div>
                </div>

                {/* ================= LOCATION ================= */}

                <div className="col-span-1">
                  <Label
                    htmlFor="location"
                    className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5"
                  >
                    Location
                  </Label>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />

                    <Input
                      id="location"
                      type="text"
                      name="location"
                      value={input.location}
                      onChange={changeEventHandler}
                      placeholder="e.g. Ahmedabad"
                      className="pl-9 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-lg h-10 text-sm"
                    />
                  </div>
                </div>

                {/* ================= SALARY ================= */}

                <div className="col-span-1">
                  <Label
                    htmlFor="salary"
                    className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5"
                  >
                    Salary (LPA)
                  </Label>

                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />

                    <Input
                      id="salary"
                      type="text"
                      name="salary"
                      value={input.salary}
                      onChange={changeEventHandler}
                      placeholder="e.g. 12"
                      min="0"
                      className="pl-9 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-lg h-10 text-sm"
                    />
                  </div>
                </div>

                {/* ================= POSITIONS ================= */}

                <div className="col-span-1">
                  <Label
                    htmlFor="position"
                    className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5"
                  >
                    Open Positions
                  </Label>

                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />

                    <Input
                      id="position"
                      type="number"
                      name="position"
                      value={input.position}
                      onChange={changeEventHandler}
                      placeholder="e.g. 3"
                      min="1"
                      className="pl-9 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-lg h-10 text-sm"
                    />
                  </div>
                </div>

                {/* ================= EXPERIENCE ================= */}

                <div className="col-span-1">
                  <Label
                    htmlFor="experience"
                    className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5"
                  >
                    Experience (years)
                  </Label>

                  <div className="relative">
                    <BarChart2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />

                    <Input
                      id="experience"
                      type="text"
                      name="experience"
                      value={input.experience}
                      onChange={changeEventHandler}
                      placeholder="e.g. 2"
                      min="0"
                      className="pl-9 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-lg h-10 text-sm"
                    />
                  </div>
                </div>

                {/* ================= REQUIREMENTS ================= */}

                <div className="col-span-1">
                  <Label
                    htmlFor="requirements"
                    className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5"
                  >
                    Requirements
                  </Label>

                  <div className="relative">
                    <ListChecks className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />

                    <Input
                      id="requirements"
                      type="text"
                      name="requirements"
                      value={input.requirements}
                      onChange={changeEventHandler}
                      placeholder="e.g. React, Node.js, SQL"
                      className="pl-9 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-lg h-10 text-sm"
                    />
                  </div>
                </div>

                {/* ================= JOB TYPE ================= */}

                <div className="col-span-1">
                  <Label
                    htmlFor="jobType"
                    className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5"
                  >
                    Job Type
                  </Label>

                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none z-10" />

                    <select
                      id="jobType"
                      name="jobType"
                      value={input.jobType}
                      onChange={changeEventHandler}
                      className="w-full pl-9 pr-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg h-10 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400"
                    >
                      <option value="">
                        Select Job Type
                      </option>

                      <option value="Hybrid">
                        Hybrid
                      </option>

                      <option value="OnSite">
                        OnSite
                      </option>

                      <option value="Remote">
                        Remote
                      </option>
                    </select>
                  </div>
                </div>

                {/* ================= DEADLINE ================= */}

                <div className="col-span-1">
                  <Label
                    htmlFor="deadline"
                    className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5"
                  >
                    Application Deadline
                  </Label>

                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />

                    <Input
                      id="applicationDeadline"
                      type="date"
                      name="applicationDeadline"
                      value={input.applicationDeadline}
                      onChange={changeEventHandler}
                      className="pl-9 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-lg h-10 text-sm"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* ================= FOOTER ================= */}

            <div className="flex items-center justify-between gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800">

              <p className="text-xs text-slate-400 dark:text-slate-600">
                Changes will be saved to this job.
              </p>

              <Button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white text-sm font-medium px-5 h-9 rounded-lg transition-colors duration-150 shadow-sm disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobSetup;