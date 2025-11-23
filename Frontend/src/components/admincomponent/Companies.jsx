import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";

import useGetAllCompanies from "@/hooks/usegetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companyslice";
import Footer from "../components_lite/Footer";

const Companies = () => {
  const navigate = useNavigate();

  useGetAllCompanies();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className=" max-w-6xl mx-auto my-10 h-[50vh]">
        <div className="flex items-center justify-between my-5">
          <h1 className="font-semibold text-xl">All Companies</h1>
          <Input
            className="w-[40%]"
            placeholder="Filter by Name"
            onChange={(e) => setInput(e.target.value)}
          ></Input>
          <Button className="bg-[#4682B4] hover:bg-[#6899c2]" onClick={() => navigate("/admin/companies/create")}>
            Add Company
          </Button>
        </div>
        <div>
          <CompaniesTable />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Companies;
