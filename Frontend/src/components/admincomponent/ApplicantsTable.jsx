// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { MoreHorizontal } from "lucide-react";
// import { useSelector } from "react-redux";
// import { toast } from "sonner";
// import axios from "axios";
// import { APPLICATION_API_ENDPOINT } from "@/utils/data";

// const shortlistingStatus = ["Accepted", "Rejected"];

// const ApplicantsTable = () => {
//   const { applicants } = useSelector((store) => store.application);

//   // ⭐ Local UI state to keep selected status for each applicant without refresh
//   const [selectedStatus, setSelectedStatus] = useState({});

//   // ⭐ Load statuses from backend when data first loads
//   useEffect(() => {
//     if (applicants?.applications) {
//       const map = {};
//       applicants.applications.forEach((a) => {
//         map[a._id] = a.status; // backend value (accepted / rejected)
//       });
//       setSelectedStatus(map);
//     }
//   }, [applicants]);

//   const statusHandler = async (status, id) => {
//     try {
//       axios.defaults.withCredentials = true;
//       const res = await axios.post(
//         `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
//         { status }
//       );

//       if (res.data.success) {
//         toast.success(res.data.message);

//         // ⭐ Update local UI instantly (without refresh)
//         setSelectedStatus((prev) => ({
//           ...prev,
//           [id]: status.toLowerCase(),
//         }));
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   return (
//     <div>
//       <Table>
//         <TableCaption>A list of your recent applied user</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>FullName</TableHead>
//             <TableHead>Email</TableHead>
//             <TableHead>Contact</TableHead>
//             <TableHead>Resume</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {applicants &&
//             applicants?.applications?.map((item) => (
//               <tr key={item._id}>
//                 <TableCell>{item?.applicant?.fullname}</TableCell>
//                 <TableCell>{item?.applicant?.email}</TableCell>
//                 <TableCell>{item?.applicant?.phoneNumber}</TableCell>

//                 <TableCell>
//                   {item.applicant?.profile?.resume ? (
//                     (() => {
//                       const resumeUrl = item.applicant.profile.resume;
//                       const originalName =
//                         item.applicant.profile.resumeOriginalName?.replace(
//                           /\.pdf$/i,
//                           ""
//                         ) || "resume";

//                       const downloadUrl = resumeUrl.replace(
//                         "/upload/",
//                         `/upload/fl_attachment:${originalName}/`
//                       );

//                       return (
//                         <a
//                           className="text-blue-600 cursor-pointer"
//                           href={downloadUrl}
//                           download={`${originalName}.pdf`}
//                         >
//                           Download
//                         </a>
//                       );
//                     })()
//                   ) : (
//                     <span>NA</span>
//                   )}
//                 </TableCell>

//                 <TableCell>
//                   {item?.applicant?.createdAt.split("T")[0]}
//                 </TableCell>

//                 <TableCell className="float-right cursor-pointer">
//                   <Popover>
//                     <PopoverTrigger>
//                       <MoreHorizontal />
//                     </PopoverTrigger>

//                     <PopoverContent className="w-32">
//                       {shortlistingStatus.map((status, index) => {
//                         return (
//                           <div
//                             onClick={() => statusHandler(status, item?._id)}
//                             key={index}
//                             className="flex w-fit items-center my-2 cursor-pointer"
//                           >
//                             <input
//                               type="radio"
//                               name={`shortlistingStatus-${item._id}`}
//                               value={status}
//                               checked={
//                                 selectedStatus[item._id] ===
//                                 status.toLowerCase()
//                               }
//                               readOnly
//                             />
//                             <span className="ml-1">{status}</span>
//                           </div>
//                         );
//                       })}
//                     </PopoverContent>
//                   </Popover>
//                 </TableCell>
//               </tr>
//             ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default ApplicantsTable;


import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";
import {
  CheckCircle2,
  XCircle,
  Download,
  MoreVertical,
  Users,
  Clock,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

const shortlistingStatus = ["Accepted", "Rejected"];

const statusConfig = {
  accepted: {
    label: "Accepted",
    icon: CheckCircle2,
    className:
      "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
    dot: "bg-emerald-500",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    className:
      "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
    dot: "bg-red-500",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className:
      "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
    dot: "bg-amber-400",
  },
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");

const avatarColors = [
  "bg-violet-100 text-violet-700",
  "bg-sky-100 text-sky-700",
  "bg-teal-100 text-teal-700",
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
];

const getAvatarColor = (name = "") => {
  const idx = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[idx];
};

const formatDate = (dateStr = "") => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    if (applicants?.applications) {
      const map = {};
      applicants.applications.forEach((a) => {
        map[a._id] = a.status;
      });
      setSelectedStatus(map);
    }
  }, [applicants]);

  const statusHandler = async (status, id) => {
    setLoadingId(id);
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setSelectedStatus((prev) => ({
          ...prev,
          [id]: status.toLowerCase(),
        }));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  const applications = applicants?.applications ?? [];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-slate-400" />
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200 tracking-wide uppercase">
            Applicants
          </h2>
          <span className="ml-1 inline-flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-medium px-2 py-0.5 min-w-[1.5rem]">
            {applications.length}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/60">
              {["Applicant", "Contact", "Resume", "Applied", "Status", ""].map(
                (col) => (
                  <th
                    key={col}
                    className="px-5 py-3 text-left text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider whitespace-nowrap last:text-right"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
            {applications.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-16 text-center text-slate-400 dark:text-slate-600 text-sm"
                >
                  No applicants yet.
                </td>
              </tr>
            )}

            {applications.map((item) => {
              const name = item?.applicant?.fullname ?? "";
              const email = item?.applicant?.email ?? "";
              const phone = item?.applicant?.phoneNumber ?? "—";
              const resumeUrl = item?.applicant?.profile?.resume;
              const resumeOriginalName =
                item?.applicant?.profile?.resumeOriginalName?.replace(
                  /\.pdf$/i,
                  ""
                ) ?? "resume";
              const downloadUrl = resumeUrl?.replace(
                "/upload/",
                `/upload/fl_attachment:${resumeOriginalName}/`
              );
              const createdAt = item?.applicant?.createdAt ?? "";
              const currentStatus =
                selectedStatus[item._id] ?? "pending";
              const statusInfo =
                statusConfig[currentStatus] ?? statusConfig.pending;
              const isLoading = loadingId === item._id;

              return (
                <tr
                  key={item._id}
                  className="group hover:bg-slate-50/70 dark:hover:bg-slate-900/40 transition-colors duration-100"
                >
                  {/* Applicant */}
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${getAvatarColor(
                          name
                        )}`}
                      >
                        {getInitials(name) || "?"}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 dark:text-slate-100 leading-tight">
                          {name || "—"}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                          {email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {phone}
                  </td>

                  {/* Resume */}
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    {resumeUrl ? (
                      <a
                        href={downloadUrl}
                        download={`${resumeOriginalName}.pdf`}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 bg-violet-50 dark:bg-violet-950/50 hover:bg-violet-100 dark:hover:bg-violet-900/50 px-2.5 py-1.5 rounded-lg transition-colors duration-150"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </a>
                    ) : (
                      <span className="text-slate-300 dark:text-slate-600 text-xs">
                        N/A
                      </span>
                    )}
                  </td>

                  {/* Date */}
                  <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400 whitespace-nowrap text-xs">
                    {createdAt ? formatDate(createdAt) : "—"}
                  </td>

                  {/* Status Badge */}
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${statusInfo.className}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`}
                      />
                      {statusInfo.label}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-5 py-3.5 text-right whitespace-nowrap">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          disabled={isLoading}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-150 disabled:opacity-40"
                          aria-label="Open actions"
                        >
                          {isLoading ? (
                            <span className="w-4 h-4 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin" />
                          ) : (
                            <MoreVertical className="w-4 h-4" />
                          )}
                        </button>
                      </PopoverTrigger>

                      <PopoverContent
                        align="end"
                        className="w-40 p-1.5 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                      >
                        <p className="px-2 pt-1 pb-2 text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">
                          Set status
                        </p>
                        {shortlistingStatus.map((status) => {
                          const key = status.toLowerCase();
                          const cfg = statusConfig[key];
                          const isActive =
                            selectedStatus[item._id] === key;
                          return (
                            <button
                              key={status}
                              onClick={() => statusHandler(status, item._id)}
                              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors duration-100 ${
                                isActive
                                  ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium"
                                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                              }`}
                            >
                              <span
                                className={`w-2 h-2 rounded-full ${cfg?.dot}`}
                              />
                              {status}
                              {isActive && (
                                <CheckCircle2 className="w-3.5 h-3.5 ml-auto text-slate-400" />
                              )}
                            </button>
                          );
                        })}
                      </PopoverContent>
                    </Popover>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {applications.length > 0 && (
        <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
          <p className="text-xs text-slate-400 dark:text-slate-600">
            Showing {applications.length}{" "}
            {applications.length === 1 ? "applicant" : "applicants"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ApplicantsTable;