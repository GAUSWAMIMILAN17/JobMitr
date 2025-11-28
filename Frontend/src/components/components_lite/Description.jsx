import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Description = () => {
  const params = useParams();
  const jobId = params.id;

  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // INITIAL APPLIED CHECK (safe)
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) ?? false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  // APPLY JOB
  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setIsApplied(true);

        // locally update redux job
        const updatedJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };

        dispatch(setSingleJob(updatedJob));

        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  // FETCH JOB — FIXED useEffect
  useEffect(() => {
    const fetchSingleJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.status) {
          dispatch(setSingleJob(res.data.job));

          // update applied status
          setIsApplied(
            res.data.job.applications?.some(
              (application) => application.applicant === user?._id
            ) ?? false
          );
        } else {
          setError("Failed to fetch job.");
        }
      } catch (error) {
        setError(error.message || "Error fetching job.");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleJobs();
  }, [jobId]); // ← ONLY THIS (fix for infinite loading)

  if (!singleJob) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 ">
        <div className="shadow-md p-5 max-w-5xl mx-auto rounded-3xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-xl ">{singleJob?.title}</h1>
              <div className=" flex gap-2 items-center mt-4 ">
                <Badge className={" text-[#001F3F] font-bold"} variant={"ghost"}>
                  {singleJob?.position} Open Positions
                </Badge>
                <Badge className={" text-[#FF8C00] font-bold"} variant={"ghost"}>
                  {singleJob?.salary}LPA
                </Badge>
                <Badge className={" text-[#001F3F]  font-bold"} variant={"ghost"}>
                  {singleJob?.location}
                </Badge>
                <Badge className={" text-[#FF8C00] font-bold"} variant={"ghost"}>
                  {singleJob?.jobType}
                </Badge>
              </div>
            </div>

            <div>
              <Button
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied}
                className={`rounded-lg ${
                  isApplied
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-[#4682B4] hover:bg-[#6899c2]"
                }`}
              >
                {isApplied ? "Already Applied" : "Apply"}
              </Button>
            </div>
          </div>
        </div>

        {/* Job Content */}
        <div className="my-10 max-w-5xl shadow-lg mx-auto rounded-3xl border border-gray-200 p-5">
          <h1 className=" font-medium py-4">{singleJob?.description}</h1>

          <h1 className="font-bold my-1 ">
            Role:{" "}
            <span className=" pl-4 font-normal text-gray-800">
              {singleJob?.position} Open Positions
            </span>
          </h1>

          <h1 className="font-bold my-1 ">
            Location:{" "}
            <span className=" pl-4 font-normal text-gray-800">
              {singleJob?.location}
            </span>
          </h1>

          <h1 className="font-bold my-1 ">
            Salary:{" "}
            <span className=" pl-4 font-normal text-gray-800">
              {singleJob?.salary} LPA
            </span>
          </h1>

          <h1 className="font-bold my-1 ">
            Experience:{" "}
            <span className=" pl-4 font-normal text-gray-800">
              {singleJob?.experienceLevel} Year
            </span>
          </h1>

          <h1 className="font-bold my-1 ">
            Total Applicants:{" "}
            <span className=" pl-4 font-normal text-gray-800">
              {singleJob?.applications?.length}
            </span>
          </h1>

          <h1 className="font-bold my-1 ">
            Job Type:
            <span className=" pl-4 font-normal text-gray-800">
              {singleJob?.jobType}
            </span>
          </h1>

          <h1 className="font-bold my-1 ">
            Post Date:
            <span className=" pl-4 font-normal text-gray-800">
              {singleJob?.createdAt.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Description;
