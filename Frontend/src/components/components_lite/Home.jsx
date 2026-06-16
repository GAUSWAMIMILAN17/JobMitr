import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loading, error } = useGetAllJobs(); // Trigger data fetch
  const jobs = useSelector((state) => state.job.allJobs); // Access Redux state

  console.log("Jobs in Component:", { loading, error, jobs }); // Log to check state
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Header />
      <Categories />
      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-[#4682B4] rounded-full animate-spin"></div>
        </div>
      )}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <LatestJobs jobs={jobs} />}
      <Footer />
      {user?.role === "Student" ? (
        <div className="fixed bottom-7 right-7 z-50">
          <span className="absolute inset-0 rounded-full border-2 border-[#4682B4] animate-ping opacity-70" />
          <span className="absolute inset-0 rounded-full border-2 border-[#4682B4] animate-ping opacity-40 delay-300" />
          <button
            onClick={() => navigate("/chat")}
            className="relative w-14 h-14 rounded-full bg-[#4682B4] hover:bg-[#2e6a9e] active:scale-95 transition-all duration-200 flex items-center justify-center shadow-lg shadow-blue-400/30 group"
            aria-label="AI Assistant"
          >
            <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
              <path d="M12 2a1 1 0 011 1v1.07A8.001 8.001 0 0119.93 11H21a1 1 0 010 2h-1.07A8.001 8.001 0 0113 19.93V21a1 1 0 01-2 0v-1.07A8.001 8.001 0 014.07 13H3a1 1 0 010-2h1.07A8.001 8.001 0 0111 4.07V3a1 1 0 011-1zm0 4a6 6 0 100 12A6 6 0 0012 6zm0 2a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <span className="absolute -top-9 right-0 bg-gray-800 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Ask AI Assistant
            </span>
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Home;
