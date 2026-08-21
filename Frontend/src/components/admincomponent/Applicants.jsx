import React, { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";
import Navbar from "../components_lite/Navbar";
import Footer from "../components_lite/Footer";
import { Users, ArrowLeft, Briefcase, Loader2 } from "lucide-react";
import { setLoading } from "@/redux/authSlice";

const Applicants = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  const { loading } = useSelector((store) => store.auth);

  const totalApplicants = applicants?.applications?.length ?? 0;

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        // console.log("Applicants Response:", res.data);
        dispatch(setLoading(false));
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        dispatch(setLoading(false));
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchAllApplicants();
  }, []);

  if (loading) {
    return (
      <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">

          <Loader2
            size={40}
            className="animate-spin text-amber-500"
          />

          <p className="text-sm font-medium text-slate-500">
            Loading applicants...
          </p>

        </div>
      </div>
      <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-10">

        {/* Page header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 active:scale-95 transition-all duration-150"
          >
            <ArrowLeft size={15} />
            Back
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-1 h-5 bg-amber-400 rounded-full" />
              <h1 className="text-xl font-extrabold text-[#0f1f35] tracking-tight">
                Applicants
              </h1>
            </div>
            <p className="text-sm text-slate-400 pl-3">
              Review and manage all candidates for this job posting.
            </p>
          </div>

          {/* Count badge */}
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
              <Users size={13} className="text-amber-500" />
            </div>
            <div>
              <p className="text-lg font-black text-[#0f1f35] leading-none">
                {totalApplicants}
              </p>
              <p className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">
                Total
              </p>
            </div>
          </div>
        </div>

        {/* Table card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
              <Briefcase size={15} className="text-amber-500" />
            </div>
            <h2 className="text-sm font-bold text-[#0f1f35]">
              Applications Received
            </h2>
            <span className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-500">
              {totalApplicants} {totalApplicants === 1 ? "applicant" : "applicants"}
            </span>
          </div>

          <ApplicantsTable />
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Applicants;