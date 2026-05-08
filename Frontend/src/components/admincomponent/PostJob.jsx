import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Loader2,
  ArrowLeft,
  Briefcase,
  FileText,
  MapPin,
  DollarSign,
  Users,
  ListChecks,
  BarChart2,
  Tag,
  Building2,
  AlertCircle,
} from "lucide-react";
import Footer from "../components_lite/Footer";

const textFields = [
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
    name: "requirements",
    label: "Requirements",
    type: "text",
    placeholder: "e.g. React, Node.js, PostgreSQL",
    icon: ListChecks,
    colSpan: 2,
  },
  {
    name: "location",
    label: "Location",
    type: "text",
    placeholder: "e.g. Remote, Bangalore",
    icon: MapPin,
  },
  {
    name: "salary",
    label: "Salary (LPA)",
    type: "number",
    placeholder: "e.g. 14",
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
    name: "experience",
    label: "Experience (years)",
    type: "number",
    placeholder: "e.g. 2",
    icon: BarChart2,
  },
  {
    name: "jobType",
    label: "Job Type",
    type: "text",
    placeholder: "e.g. Full-time, Contract",
    icon: Tag,
  },
];

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      } else {
        toast.error(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const noCompanies = companies.length === 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-10">
        {/* Page header */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate("/admin/jobs")}
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors mb-5 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150" />
            Back to Jobs
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100 leading-tight">
                Post a New Job
              </h1>
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
                Fill in the details below to publish a job listing
              </p>
            </div>
          </div>
        </div>

        {/* No-company warning */}
        {noCompanies && (
          <div className="flex items-start gap-3 mb-6 px-4 py-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700 dark:text-amber-400">
              You need to{" "}
              <button
                type="button"
                onClick={() => navigate("/admin/companies/new")}
                className="font-semibold underline underline-offset-2"
              >
                register a company
              </button>{" "}
              before posting a job.
            </p>
          </div>
        )}

        {/* Form card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <form onSubmit={submitHandler}>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-x-5 gap-y-5">
                {textFields.map(
                  ({ name, label, type, placeholder, icon: Icon, colSpan }) => (
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
                          placeholder={placeholder}
                          onChange={changeEventHandler}
                          className="pl-9 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 dark:focus:border-emerald-500 rounded-lg transition-all duration-150 h-10 text-sm"
                        />
                      </div>
                    </div>
                  )
                )}

                {/* Company selector */}
                <div className="col-span-2">
                  <Label
                    htmlFor="company"
                    className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5"
                  >
                    Company
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 pointer-events-none z-10">
                      <Building2 className="w-4 h-4" />
                    </span>
                    <Select
                      onValueChange={selectChangeHandler}
                      disabled={noCompanies}
                    >
                      <SelectTrigger
                        id="company"
                        className="pl-9 w-full bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 rounded-lg h-10 text-sm disabled:opacity-50"
                      >
                        <SelectValue placeholder="Select a company" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {companies.map((company) => (
                            <SelectItem
                              key={company._id}
                              value={company.name.toLowerCase()}
                            >
                              {company.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-400 dark:text-slate-600">
                Job will be visible to candidates immediately after posting.
              </p>
              <Button
                type="submit"
                disabled={loading || noCompanies}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 dark:disabled:bg-emerald-900 text-white text-sm font-medium px-5 h-9 rounded-lg transition-colors duration-150 shadow-sm disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Posting…
                  </>
                ) : (
                  "Post Job"
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PostJob;