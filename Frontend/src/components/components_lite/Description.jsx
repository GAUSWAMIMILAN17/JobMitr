import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  MapPin,
  IndianRupee,
  Briefcase,
  Users,
  Clock,
  CalendarDays,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { AvatarImage, Avatar } from "../ui/avatar";

const InfoRow = ({ label, value, icon: Icon }) => (
  <div className="flex items-start gap-3 py-3.5 border-b border-slate-100 last:border-0">
    <span className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
      <Icon size={14} className="text-amber-500" />
    </span>
    <div>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">
        {label}
      </p>
      <p className="text-sm font-semibold text-[#0f1f35]">{value}</p>
    </div>
  </div>
);

const Description = () => {
  const params = useParams();
  const jobId = params.id;

  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(true);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    dispatch(setSingleJob(null));
  }, [jobId]);

  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        {},
        { withCredentials: true },
      );
      if (res.data.success) {
        setIsApplied(true);
        dispatch(
          setSingleJob({
            ...singleJob,
            applications: [...singleJob.applications, { applicant: user?._id }],
          }),
        );
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.status) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications?.some(
              (app) => app.applicant === user?._id,
            ) ?? false,
          );
        } else {
          toast.error("Failed to fetch job");
        }
      } catch {
        toast.error("Server error");
      } finally {
        setLoading(false);
      }
    };
    fetchSingleJobs();
  }, [jobId]);

  /* ── Loading state ── */
  if (loading || !singleJob) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="w-11 h-11 rounded-full border-[3px] border-slate-200 border-t-[#0f1f35] animate-spin" />
          <p className="text-sm text-slate-500 font-medium">
            Loading job details…
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  const postedDate = singleJob?.createdAt?.split("T")[0] ?? "—";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-10">
        {/* ── Hero card ── */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
            {/* Left — company + title + badges */}
            <div className="flex-1 min-w-0">
              {/* Company avatar + name */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4a90d9] to-[#2563a8] flex items-center justify-center text-white font-bold text-base flex-shrink-0">
                  <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                      <AvatarImage src={singleJob?.company?.logo} />
                    </Avatar>
                  </Button>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0f1f35]">
                    {singleJob?.company?.name}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                    <MapPin size={11} />
                    {singleJob?.location}
                  </div>
                </div>
              </div>

              {/* Job title */}
              <h1 className="text-2xl font-extrabold text-[#0f1f35] tracking-tight mb-4 leading-tight">
                {singleJob?.title}
              </h1>

              {/* Stat pills */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 border border-blue-200 text-blue-700">
                  <Users size={11} />
                  {singleJob?.position} Openings
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 border border-amber-200 text-amber-700">
                  <IndianRupee size={11} />
                  {singleJob?.salary} LPA
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-600">
                  <MapPin size={11} />
                  {singleJob?.location}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 border border-teal-200 text-teal-700">
                  <Briefcase size={11} />
                  {singleJob?.jobType}
                </span>
              </div>
            </div>

            {/* Right — Apply button */}
            <div className="sm:flex-shrink-0">
              {isApplied ? (
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-50 border border-green-200 rounded-full text-sm font-semibold text-green-700">
                  <CheckCircle2 size={15} />
                  Already Applied
                </div>
              ) : (
                <button
                  onClick={applyJobHandler}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0f1f35] text-white text-sm font-semibold rounded-full hover:bg-amber-400 hover:text-[#0f1f35] active:scale-95 transition-all duration-150 shadow-sm"
                >
                  Apply Now
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Details card ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Description — wider */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1 h-5 bg-amber-400 rounded-full" />
              <h2 className="text-base font-bold text-[#0f1f35] tracking-tight">
                Skills & Requirements
              </h2>
            {singleJob.requirements.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {singleJob.requirements.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#0f1f35]/5 border border-[#0f1f35]/10 text-[#0f1f35] text-xs font-semibold rounded-full hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 transition-all duration-150"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic">No skills added yet.</p>
              )}
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1 h-5 bg-amber-400 rounded-full" />
              <h2 className="text-base font-bold text-[#0f1f35] tracking-tight">
                Job Description
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {singleJob?.description}
            </p>
          </div>

          {/* Info sidebar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm h-fit">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1 h-5 bg-amber-400 rounded-full" />
              <h2 className="text-base font-bold text-[#0f1f35] tracking-tight">
                Job Details
              </h2>
            </div>

            <div className="mt-2">
              <InfoRow
                label="Role"
                value={`${singleJob?.position} Open Position${singleJob?.position > 1 ? "s" : ""}`}
                icon={Users}
              />
              <InfoRow
                label="Location"
                value={singleJob?.location}
                icon={MapPin}
              />
              <InfoRow
                label="Salary"
                value={`${singleJob?.salary} LPA`}
                icon={IndianRupee}
              />
              <InfoRow
                label="Experience"
                value={`${singleJob?.experienceLevel} Year${singleJob?.experienceLevel > 1 ? "s" : ""}`}
                icon={Clock}
              />
              <InfoRow
                label="Job Type"
                value={singleJob?.jobType}
                icon={Briefcase}
              />
              <InfoRow
                label="Total Applicants"
                value={singleJob?.applications?.length ?? 0}
                icon={Users}
              />
              <InfoRow
                label="Posted On"
                value={postedDate}
                icon={CalendarDays}
              />
            </div>

            {/* Apply again at bottom of sidebar */}
            {!isApplied && (
              <button
                onClick={applyJobHandler}
                className="w-full mt-5 py-2.5 bg-[#0f1f35] text-white text-sm font-semibold rounded-full hover:bg-amber-400 hover:text-[#0f1f35] active:scale-95 transition-all duration-150"
              >
                Apply Now
              </button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Description;
