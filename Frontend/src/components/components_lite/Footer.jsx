import { Contact, Mail, MapPinHouseIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0f1f35] border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* About */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            
            <h1 className="text-2xl font-bold text-white">
              Job<span className="text-amber-400">Mitra</span>
            </h1>
          </div>
          <div className="w-10 h-[2px] bg-amber-400 mb-4 rounded-full" />
          <p className="text-white/45 text-sm leading-relaxed max-w-[280px]">
            JobMitra is the leading job portal connecting talented professionals
            with top employers. Our mission is to make job hunting and
            recruitment seamless and efficient.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-base font-semibold text-white mb-1">Quick Links</h2>
          <div className="w-10 h-[2px] bg-amber-400 mb-5 rounded-full" />
          <ul className="space-y-2.5">
            {[
              { label: "Home", to: "/Home" },
              { label: "Browse", to: "/Browse" },
              { label: "Jobs", to: "/Jobs" },
              { label: "About", to: "/Creator" },
            ].map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm text-white/45 hover:text-amber-400 transition-colors duration-150 flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-amber-400 transition-colors duration-150" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-base font-semibold text-white mb-1">Contact Us</h2>
          <div className="w-10 h-[2px] bg-amber-400 mb-5 rounded-full" />
          <ul className="space-y-3.5">
            <li className="flex items-start gap-3 text-sm text-white/45">
              <MapPinHouseIcon className="text-amber-400 h-4 w-4 mt-0.5 shrink-0" />
              <span>Gandhinagar , Gujarat</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-white/45">
              <Contact className="text-amber-400 h-4 w-4 shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-white/45">
              <Mail className="text-amber-400 h-4 w-4 shrink-0" />
              <span>jobmitra@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/30">
            © 2025 JobMitra. All Rights Reserved.
          </p>
          <p className="text-xs text-white/30">
            Made with <span className="text-amber-400">♥</span> by Milan Gauswami
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;