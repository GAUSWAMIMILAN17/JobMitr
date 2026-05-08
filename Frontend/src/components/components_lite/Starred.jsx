import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { setStarredJobs } from "../../redux/jobSlice";
import StarredCard from "./StarredCard.jsx";

const Starred = () => {
  const dispatch = useDispatch();

  const starredJobs = useSelector((state) => state.job.starredJobs);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStarredJobs = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${JOB_API_ENDPOINT}/getStarredJobs`, {
          withCredentials: true,
        });

        if (res.data.status) {
          dispatch(setStarredJobs(res.data.savedJobs));
        }
      } catch (error) {
        console.error("Error fetching starred jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStarredJobs();
  }, []);

  return (
    <div>
      <Navbar />

      <div className=" mx-auto max-w-7xl min-h-screen mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Starred Jobs</h1>

        <p className="text-gray-600 mb-4">
          Here are the jobs you've starred for later:
        </p>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {starredJobs?.length > 0 ? (
              starredJobs.map((job) => <StarredCard key={job._id} job={job} />)
            ) : (
              <p className="text-gray-500">You haven't starred any jobs yet.</p>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Starred;
