import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div className="bg-gray-100 h-[50vh] mb-5">
      <div className="text-center py-10">
        <div className="flex flex-col gap-5">
          <span className="px-4 mx-auto flex justify-center items-center py-2 gap-2 rounded-full bg-gray-200 text-[#001F3F] font-medium">
            <span className="text-[#001F3F]">
              {" "}
              <PiBuildingOfficeBold />
            </span>{" "}
            No.1 Job Hunt Website
          </span>

          <h2 className="text-5xl font-bold">
            Find Your <span className="text-[#4682B4]">Dream Job</span> Today
          </h2>
          <p className="text-gray-500">
            Start your hunt for the best, life-changing career opportunities
            from here in your <br />
            selected areas conveniently and get hired quickly.
          </p>
          <div className="flex w-[40%] mt-4 shadow-lg border border-gray-300 rounded-full  items-center mx-auto ">
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="    Find Your Dream Job"
              className="outline-none border-none w-full h-10 rounded-l-full"
            />
            <Button onClick={searchjobHandler} className=" rounded-r-full h-10">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
