import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Briefcase } from "lucide-react";

const Category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mern Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "Artificial Intelligence Engineer",
  "Cybersecurity Engineer",
  "Product Manager",
  "UX/UI Designer",
  "Graphics Engineer",
  "Graphics Designer",
  "Video Editor",
];

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="py-12 px-4 bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto">

        {/* Section heading */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs font-semibold text-amber-700 tracking-wide uppercase mb-3">
            <Briefcase size={12} />
            Browse by Role
          </span>
          <h2 className="text-3xl font-extrabold text-[#0f1f35] tracking-tight">
            Explore <span className="text-amber-400">Categories</span>
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Pick a role and discover the best opportunities waiting for you.
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full max-w-3xl mx-auto"
        >
          <CarouselContent className="-ml-3">
            {Category.map((category, index) => (
              <CarouselItem
                key={index}
                className="pl-3 basis-auto"
              >
                <button
                  onClick={() => searchjobHandler(category)}
                  className="whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold border border-slate-200 bg-white text-[#0f1f35] hover:bg-[#0f1f35] hover:text-white hover:border-[#0f1f35] active:scale-95 transition-all duration-150 shadow-sm"
                >
                  {category}
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-0 -translate-x-1/2 bg-[#0f1f35] border-[#0f1f35] text-white hover:bg-amber-400 hover:border-amber-400 hover:text-[#0f1f35] transition-all duration-150 shadow-md" />
          <CarouselNext className="right-0 translate-x-1/2 bg-[#0f1f35] border-[#0f1f35] text-white hover:bg-amber-400 hover:border-amber-400 hover:text-[#0f1f35] transition-all duration-150 shadow-md" />
        </Carousel>

        {/* All tags grid (visible below carousel) */}
        <div className="flex flex-wrap justify-center gap-2.5 mt-8">
          {Category.map((category, index) => (
            <button
              key={index}
              onClick={() => searchjobHandler(category)}
              className="px-4 py-1.5 rounded-full text-[13px] font-medium border border-slate-200 bg-slate-50 text-slate-600 hover:bg-amber-400/10 hover:border-amber-400/40 hover:text-amber-700 active:scale-95 transition-all duration-150"
            >
              {category}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Categories;