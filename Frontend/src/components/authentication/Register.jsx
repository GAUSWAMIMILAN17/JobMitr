import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import Footer from "../components_lite/Footer";
import {
  User,
  Mail,
  Lock,
  Phone,
  CreditCard,
  IdCard,
  Camera,
  Briefcase,
  Loader2,
  Upload,
  X,
} from "lucide-react";

const inputClass =
  "w-full pl-10 pr-4 py-2.5 text-sm text-[#0f1f35] bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-150 placeholder:text-slate-400";

const FieldRow = ({ icon: Icon, label, id, children }) => (
  <div className="space-y-1.5">
    <label
      htmlFor={id}
      className="flex items-center gap-1.5 text-xs font-bold text-[#0f1f35] uppercase tracking-wide"
    >
      <Icon size={11} className="text-amber-500" />
      {label}
    </label>
    {children}
  </div>
);

const IconInput = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <Icon
      size={15}
      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
    />
    <input className={inputClass} {...props} />
  </div>
);

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    pancard: "",
    adharcard: "",
    file: null,
  });
  const [photoName, setPhotoName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file });
      setPhotoName(file.name);
    }
  };

  const clearPhoto = () => {
    setInput({ ...input, file: null });
    setPhotoName("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("pancard", input.pancard);
    formData.append("adharcard", input.adharcard);
    formData.append("role", input.role);
    formData.append("phoneNumber", input.phoneNumber);
    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred.",
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            {/* Navy banner */}
            {/* Logo Header */}
            <div className="bg-white px-4 pt-4 pb-5 text-center relative overflow-hidden">
              {/* Background Dot Pattern */}
              

              <div className="relative bg-white px-8 pt-8 pb-8 text-center border-b border-slate-100 ">
                {/* JobMitra Logo Image */}
                <img
                  src="/Logo.png"
                  alt="JobMitra Logo"
                  className="w-56 h-auto object-contain mx-auto mb-1"
                />

                {/* Subtitle */}
                <p className="text-slate-400 text-sm mt-2">
                  Create your account and find your dream job.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={submitHandler} className="px-8 py-7 space-y-4">
              {/* 2-col row: Name + Phone */}
              <div className="grid grid-cols-2 gap-4">
                <FieldRow icon={User} label="Full Name" id="fullname">
                  <IconInput
                    icon={User}
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={input.fullname}
                    onChange={changeEventHandler}
                    placeholder="Milan Gauswami"
                    required
                  />
                </FieldRow>
                <FieldRow icon={Phone} label="Phone" id="phoneNumber">
                  <IconInput
                    icon={Phone}
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={input.phoneNumber}
                    onChange={changeEventHandler}
                    placeholder="+91 98765 43210"
                    required
                  />
                </FieldRow>
              </div>

              {/* Email */}
              <FieldRow icon={Mail} label="Email" id="email">
                <IconInput
                  icon={Mail}
                  type="email"
                  id="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="jobmitra@gmail.com"
                  required
                />
              </FieldRow>

              {/* Password */}
              <FieldRow icon={Lock} label="Password" id="password">
                <IconInput
                  icon={Lock}
                  type="password"
                  id="password"
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  placeholder="••••••••"
                  required
                />
              </FieldRow>

              {/* 2-col row: PAN + Aadhar */}
              <div className="grid grid-cols-2 gap-4">
                <FieldRow icon={CreditCard} label="PAN Card" id="pancard">
                  <IconInput
                    icon={CreditCard}
                    type="text"
                    id="pancard"
                    name="pancard"
                    value={input.pancard}
                    onChange={changeEventHandler}
                    placeholder="ABCDE1234F"
                  />
                </FieldRow>
                <FieldRow icon={IdCard} label="Aadhaar Card" id="adharcard">
                  <IconInput
                    icon={IdCard}
                    type="text"
                    id="adharcard"
                    name="adharcard"
                    value={input.adharcard}
                    onChange={changeEventHandler}
                    placeholder="1234 5678 9012"
                  />
                </FieldRow>
              </div>

              {/* Role selector */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-bold text-[#0f1f35] uppercase tracking-wide">
                  <Briefcase size={11} className="text-amber-500" /> I am a
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
                              isSelected ? "text-amber-600" : "text-slate-400"
                            }
                          />
                          <span
                            className={`text-sm font-semibold ${
                              isSelected ? "text-amber-700" : "text-slate-500"
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

              {/* Profile photo upload */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-bold text-[#0f1f35] uppercase tracking-wide">
                  <Camera size={11} className="text-amber-500" /> Profile Photo
                </label>
                {photoName ? (
                  <div className="flex items-center justify-between px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl">
                    <div className="flex items-center gap-2 min-w-0">
                      <Camera
                        size={14}
                        className="text-amber-500 flex-shrink-0"
                      />
                      <span className="text-xs font-semibold text-amber-700 truncate">
                        {photoName}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={clearPhoto}
                      className="flex-shrink-0 ml-2 text-amber-400 hover:text-amber-700 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="photo-file"
                    className="flex flex-col items-center justify-center gap-2 px-4 py-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-amber-400 hover:bg-amber-50/50 transition-all duration-150"
                  >
                    <Upload size={18} className="text-slate-300" />
                    <span className="text-xs text-slate-400 font-medium">
                      Click to upload profile photo
                    </span>
                    <input
                      type="file"
                      id="photo-file"
                      accept="image/*"
                      onChange={fileChangeHandler}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#0f1f35] text-white text-sm font-bold rounded-xl hover:bg-amber-400 hover:text-[#0f1f35] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center gap-2 mt-1"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Creating Account…
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              {/* Login link */}
              <p className="text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold text-[#0f1f35] hover:text-amber-500 transition-colors duration-150"
                >
                  Sign In
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

export default Register;
