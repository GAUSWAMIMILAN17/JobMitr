import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar.jsx";
import {
  ArrowLeft,
  Loader2,
  Building2,
  Globe,
  MapPin,
  FileText,
  Upload,
  X,
  Camera,
} from "lucide-react";

import axios from "axios";
import { COMPANY_API_ENDPOINT } from "../../utils/data.js";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById.jsx";
import Footer from "../components_lite/Footer.jsx";

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

const CompanySetup = () => {
  const params = useParams();

  useGetCompanyById(params.id);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const [logoName, setLogoName] = useState("");
  const [loading, setLoading] = useState(false);

  const { singleCompany } = useSelector((store) => store.company);

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setInput({
        ...input,
        file,
      });

      setLogoName(file.name);
    }
  };

  const clearLogo = () => {
    setInput({
      ...input,
      file: null,
    });

    setLogoName("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);

      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.status === 200 && res.data.message) {
        toast.success(res.data.message);

        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: null,
    });
  }, [singleCompany]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            type="button"
            onClick={() => navigate("/admin/companies")}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 active:scale-95 transition-all duration-150"
          >
            <ArrowLeft size={15} />
            Back
          </button>

          <div>
            <h1 className="text-xl font-extrabold text-[#0f1f35] tracking-tight">
              Company Setup
            </h1>

            <p className="text-xs text-slate-400 mt-0.5">
              Update your company information and branding.
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Card Header */}
          <div className="flex items-center gap-3 px-6 py-4 bg-[#0f1f35] relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-400/25 flex items-center justify-center flex-shrink-0">
              <Building2 size={18} className="text-amber-400" />
            </div>

            <div className="relative">
              <p className="text-sm font-bold text-white">
                {singleCompany?.name || "Company Details"}
              </p>

              <p className="text-xs text-slate-400">
                Fill in all fields and save
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={submitHandler}
            className="px-6 py-6 space-y-5"
          >
            {/* Name + Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FieldRow
                icon={Building2}
                label="Company Name"
                id="name"
              >
                <IconInput
                  icon={Building2}
                  type="text"
                  id="name"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  placeholder="e.g. Google Inc."
                />
              </FieldRow>

              <FieldRow
                icon={MapPin}
                label="Location"
                id="location"
              >
                <IconInput
                  icon={MapPin}
                  type="text"
                  id="location"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  placeholder="e.g. Bangalore, India"
                />
              </FieldRow>
            </div>

            {/* Website */}
            <FieldRow
              icon={Globe}
              label="Website"
              id="website"
            >
              <IconInput
                icon={Globe}
                type="text"
                id="website"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                placeholder="https://yourcompany.com"
              />
            </FieldRow>

            {/* Description */}
            <FieldRow
              icon={FileText}
              label="Description"
              id="description"
            >
              <div className="relative">
                <FileText
                  size={15}
                  className="absolute left-3 top-3 text-slate-400"
                />

                <textarea
                  id="description"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Describe your company..."
                  rows={3}
                  className="w-full pl-10 pr-4 py-2.5 text-sm text-[#0f1f35] bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-150 placeholder:text-slate-400 resize-none"
                />
              </div>
            </FieldRow>

            {/* Logo Upload */}
            <FieldRow
              icon={Camera}
              label="Company Logo"
              id="logo-file"
            >
              {logoName ? (
                <div className="flex items-center justify-between px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-center gap-2 min-w-0">
                    <Camera
                      size={14}
                      className="text-amber-500 flex-shrink-0"
                    />

                    <span className="text-xs font-semibold text-amber-700 truncate">
                      {logoName}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={clearLogo}
                    className="flex-shrink-0 ml-2 text-amber-400 hover:text-amber-700 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="logo-file"
                  className="flex flex-col items-center justify-center gap-2 px-4 py-5 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-amber-400 hover:bg-amber-50/50 transition-all duration-150"
                >
                  <Upload
                    size={18}
                    className="text-slate-300"
                  />

                  <span className="text-xs text-slate-400 font-medium">
                    Click to upload company logo
                  </span>

                  <input
                    type="file"
                    id="logo-file"
                    accept="image/*"
                    onChange={changeFileHandler}
                    className="hidden"
                  />
                </label>
              )}
            </FieldRow>

            {/* Divider */}
            <div className="h-px bg-slate-100" />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0f1f35] text-white text-sm font-bold rounded-xl hover:bg-amber-400 hover:text-[#0f1f35] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                  Saving Changes...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompanySetup;