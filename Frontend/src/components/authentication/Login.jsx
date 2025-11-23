import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Navigate, useNavigate } from "react-router-dom";
import { RadioGroup } from "../ui/radio-group";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import Footer from "../components_lite/Footer";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const ChangeFilehandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true)); // Start loading
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Login failed");
    } finally {
      dispatch(setLoading(false)); // End loading
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex items-center justify-center max-w-4xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 shadow-lg border border-gray-200 rounded-md p-4 my-20"
        >
          <h1 className="font-bold text-2xl text-center text-[#4682B4]">
            Job<span className="text-[#FF8C00]">Mitra</span>
          </h1>
          <p className="text-[#ABB0BD] text-center">
            Find your dream job today
          </p>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="jobmitra@gmail.com"
            ></Input>
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="********"
            ></Input>
          </div>

          <div className="flex items-center justify-between my-2">
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {loading ? (
            <button
              disabled
              className="py-2 my-2 font-semibold text-white flex items-center justify-center w-full mx-auto bg-[#4682B4] opacity-70 cursor-not-allowed rounded-md"
            >
              <div className="h-5 w-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </button>
          ) : (
            <button
              type="submit"
              className="py-2 my-2 font-semibold text- text-white flex items-center justify-center w-full mx-auto bg-[#4682B4] hover:bg-[#6899c2] rounded-md"
            >
              Login
            </button>
          )}

          <div className=" ">
            <p className="text-gray-700 flex  text-center my-2">
              Create new Account ?{" "}
              <Link
                to="/register"
                className="text-[#001F3F] font-semibold ms-2"
              >
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Login;
