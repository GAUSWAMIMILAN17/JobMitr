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
} from "lucide-react";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../../utils/data.js";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetJobById from "@/hooks/useGetJobById.jsx";

const fields = [
  {
    name: "title",
    label: "Job Title",
    type: "text",
    placeholder: "e.g. Senior Frontend Engineer",
    icon: Briefcase,
    colSpan: 2,
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    placeholder: "Brief overview of the role",
    icon: FileText,
    colSpan: 2,
  },
  {
    name: "location",
    label: "Location",
    type: "text",
    placeholder: "e.g. Remote, New York",
    icon: MapPin,
  },
  {
    name: "salary",
    label: "Salary (LPA)",
    type: "number",
    placeholder: "e.g. 12",
    icon: DollarSign,
  },
  {
    name: "position",
    label: "Open Positions",
    type: "number",
    placeholder: "e.g. 3",
    icon: Users,
  },
  {
    name: "experienceLevel",
    label: "Experience (years)",
    type: "number",
    placeholder: "e.g. 2",
    icon: BarChart2,
  },
  {
    name: "requirements",
    label: "Requirements",
    type: "text",
    placeholder: "e.g. React, Node.js, SQL",
    icon: ListChecks,
  },
  {
    name: "jobType",
    label: "Job Type",
    type: "text",
    placeholder: "e.g. Full-time, Contract",
    icon: Tag,
  },
];

const JobSetup = () => {
  const params = useParams();
  useGetJobById(params.id);
  const { singleJob } = useSelector((store) => store.job);

  const [input, setInput] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    position: "",
    requirements: "",
    experienceLevel: "",
    jobType: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const fixedInput = {
      ...input,
      salary: Number(input.salary),
      position: Number(input.position),
      experienceLevel: Number(input.experienceLevel),
    };
    try {
      setLoading(true);
      const res = await axios.put(
        `${JOB_API_ENDPOINT}/update/${params.id}`,
        fixedInput,
        { withCredentials: true }
      );
      if (res.status === 200 && res.data.message) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      } else {
        throw new Error("Unexpected API response.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleJob) {
      setInput({
        title: singleJob.title || "",
        description: singleJob.description || "",
        location: singleJob.location || "",
        salary: singleJob.salary || "",
        position: singleJob.position || "",
        requirements: singleJob.requirements || "",
        experienceLevel: singleJob.experienceLevel || "",
        jobType: singleJob.jobType || "",
      });
    }
  }, [singleJob]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Page Header */}
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

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <form onSubmit={submitHandler}>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-x-5 gap-y-5">
                {fields.map(({ name, label, type, placeholder, icon: Icon, colSpan }) => (
                  <div
                    key={name}
                    className={colSpan === 2 ? "col-span-2" : "col-span-1"}
                  >
                    <Label
                      htmlFor={name}
                      className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5"
                    >
                      {label}
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 pointer-events-none">
                        <Icon className="w-4 h-4" />
                      </span>
                      <Input
                        id={name}
                        type={type}
                        name={name}
                        value={input[name]}
                        onChange={changeEventHandler}
                        placeholder={placeholder}
                        className="pl-9 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 dark:focus:border-violet-500 rounded-lg transition-all duration-150 h-10 text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-400 dark:text-slate-600">
                All fields are editable. Changes save immediately.
              </p>
              <Button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white text-sm font-medium px-5 h-9 rounded-lg transition-colors duration-150 shadow-sm disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving…
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