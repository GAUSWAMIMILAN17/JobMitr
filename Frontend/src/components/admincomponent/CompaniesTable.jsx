import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Edit2, Building2, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );

  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filtered =
      companies?.filter((company) => {
        if (!searchCompanyByText) return true;

        return company.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      }) || [];

    setFilterCompany(filtered);
  }, [companies, searchCompanyByText]);

  const getInitials = (name = "") =>
    name
      .trim()
      .split(/\s+/)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const avatarColors = [
    ["bg-blue-100", "text-blue-700"],
    ["bg-amber-100", "text-amber-700"],
    ["bg-teal-100", "text-teal-700"],
    ["bg-purple-100", "text-purple-700"],
    ["bg-rose-100", "text-rose-700"],
  ];

  const getAvatarColor = (name = "") => {
    const idx = (name.charCodeAt(0) || 0) % avatarColors.length;
    return avatarColors[idx];
  };

  /* ── Loading ── */
  if (!companies) {
    return (
      <div className="flex items-center justify-center py-16 gap-3">
        <div className="w-8 h-8 rounded-full border-[3px] border-slate-200 border-t-[#0f1f35] animate-spin" />

        <p className="text-sm text-slate-400 font-medium">
          Loading companies…
        </p>
      </div>
    );
  }

  /* ── Empty ── */
  if (filterCompany.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
          {searchCompanyByText ? (
            <Search size={24} className="text-slate-300" />
          ) : (
            <Building2 size={24} className="text-slate-300" />
          )}
        </div>

        <p className="text-sm font-semibold text-slate-500">
          {searchCompanyByText
            ? `No companies found for "${searchCompanyByText}"`
            : "No companies registered yet"}
        </p>

        <p className="text-xs text-slate-400">
          {searchCompanyByText
            ? "Try a different search term."
            : 'Click "Add Company" to get started.'}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        {/* Head */}
        <thead>
          <tr className="border-b border-slate-100">
            {["Logo", "Company Name", "Registered On", "Action"].map(
              (col, i) => (
                <th
                  key={col}
                  className={`px-6 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest ${
                    i === 3 ? "text-right" : "text-left"
                  }`}
                >
                  {col}
                </th>
              )
            )}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {filterCompany.map((company, idx) => {
            const [avatarBg, avatarText] = getAvatarColor(company.name);
            const isLast = idx === filterCompany.length - 1;

            return (
              <tr
                key={company._id || company.id}
                className={`group hover:bg-slate-50 transition-colors duration-100 ${
                  !isLast ? "border-b border-slate-100" : ""
                }`}
              >
                {/* Logo */}
                <td className="px-6 py-4">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                    {company.logo ? (
                      <Avatar className="w-10 h-10 rounded-xl">
                        <AvatarImage
                          src={company.logo}
                          alt={`${company.name} logo`}
                          className="object-cover"
                        />
                      </Avatar>
                    ) : (
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${avatarBg} ${avatarText}`}
                      >
                        {getInitials(company.name)}
                      </div>
                    )}
                  </div>
                </td>

                {/* Name */}
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-[#0f1f35]">
                    {company.name}
                  </p>

                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-slate-400 hover:text-amber-500 transition-colors duration-150"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {company.website}
                    </a>
                  )}
                </td>

                {/* Date */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-500">
                    {company.createdAt?.split("T")[0] ?? "—"}
                  </span>
                </td>

                {/* Action */}
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() =>
                      navigate(`/admin/companies/${company._id}`)
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#0f1f35] bg-white border border-slate-200 rounded-lg hover:bg-[#0f1f35] hover:text-white hover:border-[#0f1f35] active:scale-95 transition-all duration-150 opacity-0 group-hover:opacity-100"
                  >
                    <Edit2 size={12} />
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>

        {/* Footer */}
        <tfoot>
          <tr>
            <td
              colSpan={4}
              className="px-6 py-3 text-xs text-slate-400 text-center border-t border-slate-100"
            >
              Showing {filterCompany.length} of {companies.length} companies
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CompaniesTable;