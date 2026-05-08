// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { Avatar, AvatarImage } from "../ui/avatar";
// import { Button } from "../ui/button";
// import { LogOut, User2 } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";
// import axios from "axios"; // Import axios
// import { setUser } from "@/redux/authSlice";
// import { USER_API_ENDPOINT } from "@/utils/data";

// const Navbar = () => {
//   const { user } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const logoutHandler = async () => {
//     try {
//       const res = await axios.post(`${USER_API_ENDPOINT}/logout`,{}, {
//         withCredentials: true,
//       });
//       if (res && res.data && res.data.success) {
//         dispatch(setUser(null));
//         navigate("/");
//         toast.success(res.data.message);
//       } else {
//         console.error("Error logging out:", res.data);
//       }
//     } catch (error) {
//       console.error("Axios error:", error);
//       if (error.response) {
//         console.error("Error response:", error.response.data);
//       }
//       toast.error("Error logging out. Please try again.");
//     }
//   };
//   return (
//     <div className="bg-white border bordeer-b sticky top-0 z-50 shadow-sm">
//       <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
//         <div className="flex items-center gap-2">
//           <img src="/JobMitra1.png" className="h-10 w-10 object-contain" alt="JM" />
//           <h1 className="text-2xl font-bold text-[#4682B4]">
//             Job
//             <span className="text-[#FF8C00]">Mitra</span>
//           </h1>
//         </div>
//         <div className="flex items-center gap-10">
//           <ul className="flex font-medium items-center gap-6">
//             {user && user.role === "Recruiter" ? (
//               <>
//                 <li>
//                   <Link to={"/admin/companies"}>Companies</Link>
//                 </li>
//                 <li>
//                   <Link to={"/admin/jobs"}>Jobs</Link>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li>
//                   {" "}
//                   <Link to={"/Home"}>Home</Link>
//                 </li>
//                 <li>
//                   {" "}
//                   <Link to={"/Browse"}>Browse</Link>{" "}
//                 </li>
//                 <li>
//                   {" "}
//                   <Link to={"/Jobs"}>Jobs</Link>
//                 </li>
//                 <li>
//                   {" "}
//                   <Link to={"/Creator"}>About</Link>
//                 </li>
//               </>
//             )}
//           </ul>
//           {!user ? (
//             <div className=" flex items-center gap-2">
//               <Link to={"/login"}>
//                 {" "}
//                 <Button variant="outline">Login</Button>
//               </Link>
//               <Link to={"/register"}>
//                 {" "}
//                 <Button className="bg-[#4682B4]  hover:bg-[#6899c2]">
//                   Signup
//                 </Button>
//               </Link>
//             </div>
//           ) : (
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Avatar className="cursor-pointer">
//                   <AvatarImage
//                     src={user?.profile?.profilePhoto}
//                     alt="@shadcn"
//                   />
//                 </Avatar>
//               </PopoverTrigger>
//               <PopoverContent className="w-80">
//                 <div className="flex items-center gap-4 space-y-2">
//                   <Avatar className="cursor-pointer">
//                     <AvatarImage
//                       src={user?.profile?.profilePhoto}
//                       alt="@shadcn"
//                     />
//                   </Avatar>
//                   <div>
//                     <h3 className="font-medium">{user?.fullname}</h3>
//                     <p className="text-sm text-muted-foreground">
//                       {user?.profile?.bio}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex flex-col my-2 text-gray-600  ">
//                   {user && user.role === "Student" && (
//                     <div className="flex w-fit items-center gap-2 cursor-pointer">
//                       <User2></User2>
//                       <Button variant="link">
//                         {" "}
//                         <Link to={"/Profile"}> Profile</Link>{" "}
//                       </Button>
//                     </div>
//                   )}

//                   <div className="flex w-fit items-center gap-2 cursor-pointer">
//                     <LogOut></LogOut>
//                     <Button onClick={logoutHandler} variant="link">
//                       Logout
//                     </Button>
//                   </div>
//                 </div>
//               </PopoverContent>
//             </Popover>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";
import {
  LogOut,
  User2,
  Home,
  Compass,
  Briefcase,
  Users,
  Building2,
  ChevronDown,
  FileText,
} from "lucide-react";
import { clearStarredJobs } from "../../redux/jobSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/logout`,
        {},
        { withCredentials: true }
      );
      if (res?.data?.success) {
        dispatch(setUser(null));
        dispatch(clearStarredJobs());
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error logging out. Please try again.");
    }
  };

  const studentLinks = [
    { to: "/Home", label: "Home", icon: <Home size={15} /> },
    { to: "/Browse", label: "Browse", icon: <Compass size={15} /> },
    { to: "/Jobs", label: "Jobs", icon: <Briefcase size={15} /> },
    { to: "/About", label: "About", icon: <Users size={15} /> },
    { to: "/StarredJobs", label: "Starred Jobs", icon: <Users size={15} /> },
  ];

  const recruiterLinks = [
    { to: "/admin/companies", label: "Companies", icon: <Building2 size={15} /> },
    { to: "/admin/jobs", label: "Jobs", icon: <Briefcase size={15} /> },
  ];

  const navLinks = user?.role === "Recruiter" ? recruiterLinks : studentLinks;

  return (
    <nav className="sticky top-0 z-50 bg-[#0f1f35] border-b border-white/[0.07] shadow-[0_2px_20px_rgba(0,0,0,0.25)]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          
          <span className="text-2xl font-bold text-white tracking-tight">
            Job<span className="text-amber-400">Mitra</span>
          </span>
        </Link>

        {/* Nav Links */}
        <ul className="flex items-center gap-1 list-none m-0 p-0">
          {navLinks.map(({ to, label, icon }) => (
            <li key={to}>
              <Link
                to={to}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium text-white/65 no-underline transition-all duration-150 hover:text-white hover:bg-white/10"
              >
                {icon}
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Auth or Avatar */}
        <div className="flex items-center gap-2.5">
          {!user ? (
            <>
              <Link to="/login">
                <button className="bg-white/[0.06] border border-white/15 text-white/75 rounded-[9px] px-[18px] py-[7px] text-sm font-medium cursor-pointer transition-all duration-150 hover:bg-white/[0.12] hover:text-white">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-amber-400 border-none text-[#0f1f35] rounded-[9px] px-5 py-[7px] text-sm font-semibold cursor-pointer tracking-wide transition-all duration-150 hover:bg-amber-300 hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(245,158,11,0.35)]">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <div className="relative">
              {/* Avatar Button */}
              <button
                onClick={() => setDropdownOpen((p) => !p)}
                className="flex items-center gap-2.5 bg-white/[0.06] border border-white/[0.12] rounded-[10px] pl-1.5 pr-3 py-[5px] cursor-pointer transition-all duration-150 hover:bg-white/10"
              >
                {/* Avatar */}
                <div className="w-[30px] h-[30px] rounded-lg overflow-hidden bg-gradient-to-br from-[#4a90d9] to-[#2563a8] shrink-0">
                  {user?.profile?.profilePhoto ? (
                    <img
                      src={user.profile.profilePhoto}
                      alt={user.fullname}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
                      {user?.fullname?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="text-left">
                  <p className="text-[13.5px] font-medium text-white leading-tight">
                    {user?.fullname}
                  </p>
                  <p className="text-[11px] text-white/45 leading-tight">
                    {user?.role}
                  </p>
                </div>

                <ChevronDown
                  size={14}
                  className={`text-white/40 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute mt-2 top-[calc(100%+10px)] right-0 w-[230px] bg-[#15283d] border border-white/10 rounded-[14px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.4)] z-[100]">

                  {/* Dropdown Header */}
                  <div className="px-4 pt-3.5 pb-2.5 border-b border-white/[0.07]">
                    <p className="text-sm font-semibold text-white m-0">
                      {user?.fullname}
                    </p>
                    <p className="text-xs text-white/45 mt-0.5 m-0">
                      {user?.profile?.bio || user?.role}
                    </p>
                  </div>

                  {/* Menu Items */}
                  {user?.role === "Student" && (
                    <>
                      <Link
                        to="/Profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-[11px] text-[13.5px] text-white/65 no-underline transition-all duration-150 hover:bg-white/[0.06] hover:text-white"
                      >
                        <User2 size={16} />
                        My Profile
                      </Link>
                      
                    </>
                  )}

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      logoutHandler();
                    }}
                    className="flex items-center gap-2.5 w-full px-4 py-[11px] text-[13.5px] text-red-400 bg-transparent border-none cursor-pointer text-left transition-all duration-150 hover:bg-red-500/10 hover:text-red-300"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Backdrop to close dropdown */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 z-[99]"
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;