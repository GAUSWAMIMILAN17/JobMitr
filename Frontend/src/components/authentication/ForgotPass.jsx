import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data.js";
import Footer from "../components_lite/Footer";
import {
  Mail,
  Lock,
  Loader2,
  ArrowLeft,
  KeyRound,
  Briefcase,
  User,
  CheckCircle2,
} from "lucide-react";

const inputClass =
  "w-full pl-10 pr-4 py-2.5 text-sm text-[#0f1f35] bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-150 placeholder:text-slate-400";

// step: "verify" -> "reset" -> "done"
const ForgotPass = () => {
  const [step, setStep] = useState("verify");
  const [loading, setLoading] = useState(false);

  const [verifyInput, setVerifyInput] = useState({ email: "", role: "" });
  const [userId, setUserId] = useState(null);

  const [passwords, setPasswords] = useState({ newPassword: "", confirmPassword: "" });

  const verifyChangeHandler = (e) => {
    setVerifyInput({ ...verifyInput, [e.target.name]: e.target.value });
  };

  const passwordChangeHandler = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const verifySubmitHandler = async (e) => {
    e.preventDefault();
    if (!verifyInput.role) {
      toast.error("Please select whether you're a Student or Recruiter");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_ENDPOINT}/verify-email`,
        verifyInput,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setUserId(res.data.userId);
        setStep("reset");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Invalid email or role. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetSubmitHandler = async (e) => {
    e.preventDefault();
    if (passwords.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_ENDPOINT}/forgot-password`,
        { userId, newPassword: passwords.newPassword },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.message);
        setStep("done");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Couldn't reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const headerText = {
    verify: "Confirm your email and role to continue.",
    reset: "Choose a new password for your account.",
    done: "Your password has been updated.",
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">

          {/* Card */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

            {/* Top navy banner */}
            <div className="bg-[#0f1f35] px-8 pt-8 pb-10 text-center relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4a90d9] to-[#2563a8] flex items-center justify-center text-white mx-auto mb-3 shadow-lg">
                  {step === "done" ? <CheckCircle2 size={24} /> : <KeyRound size={24} />}
                </div>
                <h1 className="text-2xl font-black text-white tracking-tight">
                  Job<span className="text-amber-400">Mitra</span>
                </h1>
                <p className="text-slate-400 text-sm mt-1">{headerText[step]}</p>
              </div>

              {/* Step indicator */}
              <div className="relative flex items-center justify-center gap-2 mt-5">
                {["verify", "reset", "done"].map((s, i) => (
                  <div
                    key={s}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      step === s
                        ? "w-6 bg-amber-400"
                        : i < ["verify", "reset", "done"].indexOf(step)
                        ? "w-1.5 bg-amber-400/60"
                        : "w-1.5 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* STEP 1: Verify email + role */}
            {step === "verify" && (
              <form onSubmit={verifySubmitHandler} className="px-8 py-7 space-y-5">

                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-[#0f1f35] uppercase tracking-wide">
                    <Mail size={11} className="text-amber-500" /> Email
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={verifyInput.email}
                      onChange={verifyChangeHandler}
                      placeholder="jobmitra@gmail.com"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-[#0f1f35] uppercase tracking-wide">
                    <Briefcase size={11} className="text-amber-500" /> I am a
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Student", "Recruiter"].map((role) => {
                      const isSelected = verifyInput.role === role;
                      return (
                        <label
                          key={role}
                          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-150 ${
                            isSelected
                              ? "border-amber-400 bg-amber-50"
                              : "border-slate-200 bg-slate-50 hover:border-slate-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="role"
                            value={role}
                            checked={isSelected}
                            onChange={verifyChangeHandler}
                            className="hidden"
                          />
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-150 ${
                              isSelected
                                ? "border-amber-400 bg-amber-400"
                                : "border-slate-300 bg-white"
                            }`}
                          >
                            {isSelected && (
                              <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            )}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <User size={13} className={isSelected ? "text-amber-600" : "text-slate-400"} />
                            <span className={`text-sm font-semibold ${isSelected ? "text-amber-700" : "text-slate-500"}`}>
                              {role}
                            </span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#0f1f35] text-white text-sm font-bold rounded-xl hover:bg-amber-400 hover:text-[#0f1f35] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center gap-2 mt-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Verifying…
                    </>
                  ) : (
                    "Continue"
                  )}
                </button>

                <p className="text-center text-sm text-slate-500 pt-1">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-1.5 font-bold text-[#0f1f35] hover:text-amber-500 transition-colors duration-150"
                  >
                    <ArrowLeft size={14} />
                    Back to Sign In
                  </Link>
                </p>
              </form>
            )}

            {/* STEP 2: New password + confirm */}
            {step === "reset" && (
              <form onSubmit={resetSubmitHandler} className="px-8 py-7 space-y-5">

                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-[#0f1f35] uppercase tracking-wide">
                    <Lock size={11} className="text-amber-500" /> New Password
                  </label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      name="newPassword"
                      value={passwords.newPassword}
                      onChange={passwordChangeHandler}
                      placeholder="••••••••"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-[#0f1f35] uppercase tracking-wide">
                    <Lock size={11} className="text-amber-500" /> Confirm Password
                  </label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwords.confirmPassword}
                      onChange={passwordChangeHandler}
                      placeholder="••••••••"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#0f1f35] text-white text-sm font-bold rounded-xl hover:bg-amber-400 hover:text-[#0f1f35] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center gap-2 mt-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Updating…
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep("verify")}
                  className="w-full flex items-center justify-center gap-1.5 text-sm font-bold text-[#0f1f35] hover:text-amber-500 transition-colors duration-150 pt-1"
                >
                  <ArrowLeft size={14} />
                  Back
                </button>
              </form>
            )}

            {/* STEP 3: Success */}
            {step === "done" && (
              <div className="px-8 py-8 space-y-5 text-center">
                <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={20} className="text-amber-500" />
                </div>
                <p className="text-sm text-slate-500">
                  Your password has been changed successfully. You can now sign
                  in with your new password.
                </p>
                <Link
                  to="/login"
                  className="w-full py-3 bg-[#0f1f35] text-white text-sm font-bold rounded-xl hover:bg-amber-400 hover:text-[#0f1f35] active:scale-95 transition-all duration-150 flex items-center justify-center gap-2"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForgotPass;