import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companyslice";
import axios from "axios";
import Footer from "../components_lite/Footer";
import { Building2, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Please enter a company name.");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${res.data.company._id}`);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">

          {/* Card */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

            {/* Navy banner */}
            <div className="bg-[#0f1f35] px-8 pt-7 pb-9 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="relative flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-amber-400/15 border border-amber-400/25 flex items-center justify-center flex-shrink-0">
                  <Building2 size={20} className="text-amber-400" />
                </div>
                <div>
                  <h1 className="text-lg font-extrabold text-white tracking-tight">
                    Register a Company
                  </h1>
                  <p className="text-slate-400 text-xs mt-0.5">
                    You can update details later from the company dashboard.
                  </p>
                </div>
              </div>
            </div>

            {/* Form body */}
            <div className="px-8 py-7 space-y-5">

              {/* Info note */}
              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <Building2 size={15} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 leading-relaxed">
                  What would you like to name your company? You can always change
                  this later.
                </p>
              </div>

              {/* Input */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-bold text-[#0f1f35] uppercase tracking-wide">
                  <Building2 size={11} className="text-amber-500" />
                  Company Name
                </label>
                <div className="relative">
                  <Building2
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && registerNewCompany()}
                    placeholder="e.g. Google, Infosys, Tata…"
                    className="w-full pl-10 pr-4 py-2.5 text-sm text-[#0f1f35] bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-150 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => navigate("/admin/companies")}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 active:scale-95 transition-all duration-150"
                >
                  <ArrowLeft size={14} />
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={registerNewCompany}
                  disabled={loading || !companyName.trim()}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-[#0f1f35] rounded-xl hover:bg-amber-400 hover:text-[#0f1f35] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
                >
                  {loading ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Creating…
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mt-5">
            <div className="w-7 h-1.5 bg-[#0f1f35] rounded-full" />
            <div className="w-4 h-1.5 bg-slate-200 rounded-full" />
            <div className="w-4 h-1.5 bg-slate-200 rounded-full" />
            <p className="text-xs text-slate-400 ml-1">Step 1 of 3</p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompanyCreate;