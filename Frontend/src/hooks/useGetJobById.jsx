import { setSingleJob } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetJobById = (jobId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/get/${jobId}`,
          { withCredentials: true }
        );
        dispatch(setSingleJob(res.data.job));
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    if (jobId) {
      fetchSingleJob();
    }
  }, [jobId, dispatch]);
};

export default useGetJobById;
