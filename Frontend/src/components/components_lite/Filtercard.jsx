// import React, { useEffect, useState } from "react";
// import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
// import { useDispatch } from "react-redux";
// import { setSearchedQuery } from "@/redux/jobSlice";

// const filterData = [
//   {
//     filterType: "Location",
//     array: [
//       "Delhi",
//       "Mumbai",
//       "Kolhapur",
//       "Pune",
//       "Bangalore",
//       "Hyderabad",
//       "Chennai",
//       "Remote",
//     ],
//   },
//   {
//     filterType: "Title",
//     array: [
//       "FullStack Developer",
//       "Frontend Developer",
//       "Data Scientist",
//       "Backend Developer",
//       "Mern Developer",
//       "DevOps Engineer",
//       "Machine Learning Engineer",
//       "Artificial Intelligence Engineer",
//       "Cybersecurity Engineer",
//       "Product Manager",
//       "UI/UX Designer",
//     ],
//   }
// ];

// const Filter = () => {
//   const [selectedValue, setSelectedValue] = useState("");
//   const handleChange = (value) => {
//     setSelectedValue(value);
//   };
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(setSearchedQuery(selectedValue));
//   }, [selectedValue]);

//   return (
//     <div className="w-full bg-white rounded-md">
//       <h1 className="font-bold text-lg">Filter Jobs</h1>
//       <hr className="mt-3" />
//       <RadioGroup value={selectedValue} onValueChange={handleChange}>
//         {filterData.map((data, index) => (
//           <div key={index}>
//             <h2 className="font-bold text-lg">{data.filterType}</h2>

//             {data.array.map((item, indx) => {
//               const itemId = `Id${index}-${indx}`;
//               return (
//                 <div key={itemId} className="flex items-center space-x-2 my-2">
//                   <RadioGroupItem value={item} id={itemId}></RadioGroupItem>
//                   <label htmlFor={itemId}>{item}</label>
//                 </div>
//               );
//             })}
//           </div>
//         ))}
//       </RadioGroup>
//     </div>
//   );
// };

// export default Filter;


import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { SlidersHorizontal, X } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi",
      "Mumbai",
      "Kolhapur",
      "Pune",
      "Bangalore",
      "Hyderabad",
      "Chennai",
      "Remote",
    ],
  },
  {
    filterType: "Job Title",
    array: [
      "FullStack Developer",
      "Frontend Developer",
      "Data Scientist",
      "Backend Developer",
      "Mern Developer",
      "DevOps Engineer",
      "Machine Learning Engineer",
      "Artificial Intelligence Engineer",
      "Cybersecurity Engineer",
      "Product Manager",
      "UI/UX Designer",
    ],
  },
];

const Filter = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const clearFilter = () => {
    setSelectedValue("");
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-[#0f1f35]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-amber-400" />
          <span className="text-sm font-bold text-white tracking-wide">
            Filter Jobs
          </span>
        </div>

        {selectedValue && (
          <button
            onClick={clearFilter}
            className="flex items-center gap-1 px-3 py-1 bg-amber-400/15 border border-amber-400/30 rounded-full text-[11.5px] font-semibold text-amber-400 hover:bg-amber-400/25 transition-colors duration-150"
          >
            <X size={11} />
            Clear
          </button>
        )}
      </div>

      {/* Active filter pill */}
      {selectedValue && (
        <div className="flex items-center gap-2 px-5 py-2.5 bg-amber-50 border-b border-amber-200">
          <span className="text-xs text-amber-900">Active:</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 border border-amber-300 rounded-full text-xs font-semibold text-amber-700">
            {selectedValue}
            <X
              size={11}
              className="cursor-pointer hover:text-amber-900 transition-colors"
              onClick={clearFilter}
            />
          </span>
        </div>
      )}

      {/* Filter sections */}
      <div className="py-2">
        <RadioGroup value={selectedValue} onValueChange={handleChange}>
          {filterData.map((data, index) => (
            <div key={index}>

              {/* Section heading */}
              <div className="flex items-center gap-2 px-5 pt-3 pb-1.5">
                <span className="inline-block w-[3px] h-3.5 bg-amber-400 rounded-sm flex-shrink-0" />
                <h2 className="text-[11px] font-bold text-[#0f1f35] tracking-widest uppercase m-0">
                  {data.filterType}
                </h2>
              </div>

              {/* Options */}
              {data.array.map((item, indx) => {
                const itemId = `id-${index}-${indx}`;
                const isSelected = selectedValue === item;
                return (
                  <label
                    key={itemId}
                    htmlFor={itemId}
                    className={`flex items-center gap-2.5 px-5 py-[7px] cursor-pointer transition-all duration-150
                      ${isSelected
                        ? "bg-amber-400/[0.07] border-l-[3px] border-l-amber-400"
                        : "border-l-[3px] border-l-transparent hover:bg-slate-50"
                      }`}
                  >
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                      className="w-[15px] h-[15px] flex-shrink-0 text-amber-500 border-slate-300"
                    />
                    <span
                      className={`text-[13.5px] transition-all duration-150
                        ${isSelected
                          ? "text-amber-700 font-semibold"
                          : "text-gray-700 font-normal"
                        }`}
                    >
                      {item}
                    </span>
                  </label>
                );
              })}

              {/* Divider */}
              {index < filterData.length - 1 && (
                <div className="h-px bg-slate-100 mx-5 my-2" />
              )}

            </div>
          ))}
        </RadioGroup>
      </div>

    </div>
  );
};

export default Filter;