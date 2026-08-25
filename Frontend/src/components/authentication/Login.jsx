import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import Footer from "../components_lite/Footer";
import {
  Mail,
  Lock,
  Loader2,
  Briefcase,
  User,
} from "lucide-react";

const inputClass =
  "w-full pl-10 pr-4 py-2.5 text-sm text-[#0f1f35] bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-150 placeholder:text-slate-400";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${USER_API_ENDPOINT}/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">

          {/* Login Card */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

            {/* Logo Header */}
            <div className="bg-white px-8 pt-8 pb-8 text-center border-b border-slate-100">

              <div className="flex flex-col items-center">

                {/* JobMitra Logo */}
                <img
                  src="/Logo.png"
                  alt="JobMitra Logo"
                  className="w-56 h-auto object-contain mx-auto mb-1"
                />

                <p className="text-slate-500 text-sm mt-1">
                  Welcome back! Sign in to continue.
                </p>

              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={submitHandler}
              className="px-8 py-2 space-y-5"
            >

              {/* Email */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-bold text-[#0f1f35] uppercase tracking-wide">
                  <Mail
                    size={11}
                    className="text-amber-500"
                  />
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={changeEventHandler}
                    placeholder="jobmitra@gmail.com"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-bold text-[#0f1f35] uppercase tracking-wide">
                  <Lock
                    size={11}
                    className="text-amber-500"
                  />
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="password"
                    name="password"
                    value={input.password}
                    onChange={changeEventHandler}
                    placeholder="••••••••"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              {/* Role */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-bold text-[#0f1f35] uppercase tracking-wide">
                  <Briefcase
                    size={11}
                    className="text-amber-500"
                  />
                  I am a
                </label>

                <div className="grid grid-cols-2 gap-3">

                  {["Student", "Recruiter"].map((role) => {
                    const isSelected = input.role === role;

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
                          onChange={changeEventHandler}
                          className="hidden"
                        />

                        {/* Custom Radio */}
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
                          <User
                            size={13}
                            className={
                              isSelected
                                ? "text-amber-600"
                                : "text-slate-400"
                            }
                          />

                          <span
                            className={`text-sm font-semibold ${
                              isSelected
                                ? "text-amber-700"
                                : "text-slate-500"
                            }`}
                          >
                            {role}
                          </span>
                        </div>

                      </label>
                    );
                  })}

                </div>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#0f1f35] text-white text-sm font-bold rounded-xl hover:bg-amber-400 hover:text-[#0f1f35] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                    Signing in…
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* Forgot Password */}
              <p className="text-center text-sm text-slate-500 pt-1">
                Don't remember your password?{" "}

                <Link
                  to="/forgot-password"
                  className="font-bold text-[#0f1f35] hover:text-amber-500 transition-colors duration-150"
                >
                  Forgot Password?
                </Link>
              </p>

              {/* Register */}
              <p className="text-center text-sm text-slate-500">
                Don't have an account?{" "}

                <Link
                  to="/register"
                  className="font-bold text-[#0f1f35] hover:text-amber-500 transition-colors duration-150"
                >
                  Sign Up
                </Link>
              </p>

            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;