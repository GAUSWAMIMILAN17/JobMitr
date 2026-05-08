import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data";
import { setUser } from "@/redux/authSlice";
import { Loader2, User, Mail, Phone, FileText, Layers, Upload, X } from "lucide-react";

const InputField = ({ icon: Icon, label, id, children }) => (
  <div className="space-y-1.5">
    <label
      htmlFor={id}
      className="flex items-center gap-1.5 text-xs font-bold text-[#0f1f35] uppercase tracking-wide"
    >
      <Icon size={12} className="text-amber-500" />
      {label}
    </label>
    {children}
  </div>
);

const inputClass =
  "w-full px-4 py-2.5 text-sm text-[#0f1f35] bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-150 placeholder:text-slate-400";

const EditProfileModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file });
      setFileName(file.name);
    }
  };

  const clearFile = () => {
    setInput({ ...input, file: null });
    setFileName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser({ ...res.data.user, skills: input.skills }));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[480px] p-0 overflow-hidden rounded-2xl border-0 shadow-2xl"
        onInteractOutside={() => setOpen(false)}
      >
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
              <User size={16} className="text-amber-500" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold text-[#0f1f35]">
                Edit Profile
              </DialogTitle>
              <p className="text-xs text-slate-400 mt-0.5">
                Update your personal information
              </p>
            </div>
          </div>
          <div className="h-px bg-slate-100 mt-5" />
        </DialogHeader>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto">

            {/* Name */}
            <InputField icon={User} label="Full Name" id="fullname">
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                placeholder="Your full name"
                className={inputClass}
              />
            </InputField>

            {/* Email */}
            <InputField icon={Mail} label="Email" id="email">
              <input
                type="email"
                id="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="your@email.com"
                className={inputClass}
              />
            </InputField>

            {/* Phone */}
            <InputField icon={Phone} label="Phone Number" id="phoneNumber">
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                placeholder="+91 98765 43210"
                className={inputClass}
              />
            </InputField>

            {/* Bio */}
            <InputField icon={FileText} label="Bio" id="bio">
              <textarea
                id="bio"
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
                placeholder="Tell us a little about yourself…"
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </InputField>

            {/* Skills */}
            <InputField icon={Layers} label="Skills (comma separated)" id="skills">
              <input
                type="text"
                id="skills"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                placeholder="React, Node.js, MongoDB…"
                className={inputClass}
              />
            </InputField>

            {/* Resume Upload */}
            <InputField icon={Upload} label="Resume (PDF)" id="file">
              {fileName ? (
                <div className="flex items-center justify-between px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText size={14} className="text-amber-500 flex-shrink-0" />
                    <span className="text-xs font-semibold text-amber-700 truncate">
                      {fileName}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={clearFile}
                    className="flex-shrink-0 ml-2 text-amber-400 hover:text-amber-700 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="file"
                  className="flex flex-col items-center justify-center gap-2 px-4 py-5 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-amber-400 hover:bg-amber-50/50 transition-all duration-150"
                >
                  <Upload size={20} className="text-slate-300" />
                  <span className="text-xs text-slate-400 font-medium">
                    Click to upload PDF resume
                  </span>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept="application/pdf"
                    onChange={fileChangeHandler}
                    className="hidden"
                  />
                </label>
              )}
            </InputField>

          </div>

          {/* Footer */}
          <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 active:scale-95 transition-all duration-150"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 text-sm font-semibold text-white bg-[#0f1f35] rounded-xl hover:bg-amber-400 hover:text-[#0f1f35] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Saving…
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;