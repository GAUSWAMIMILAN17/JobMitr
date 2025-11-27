import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const JobCards = ({ job }) => {
  console.log(job);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 mt-3 rounded-md shadow-md bg-white  border border-gray-200 cursor-pointer hover:shadow-lg transform transition-transform ease-out hover:scale-105 focus-within:scale-105  "
    >
      <div>
        <h1 className="text-lg font-medium"> {job.name} </h1>

        <p className="text-sm text-gray-600">India</p>
      </div>
      <div>
        <h2 className="font-bold text-lg my-2">{job.title}</h2>
        {/* <p className="text-sm text-gray-600">{job.description}</p> */}
      </div>
      <div className=" flex gap-2 items-center mt-4 ">
        <Badge className={" text-[#001F3F] font-bold"} variant={"ghost"}>
          {job.position} Open Positions
        </Badge>
        <Badge className={" text-[#FF8C00] font-bold"} variant={"ghost"}>
          {job.salary}LPA
        </Badge>
        <Badge className={" text-[#001F3F]  font-bold"} variant={"ghost"}>
          {job.location}
        </Badge>
        <Badge className={" text-[#FF8C00] font-bold"} variant={"ghost"}>
          {job.jobType}
        </Badge>
      </div>
    </div>
  );
};

export default JobCards;
