import { Contact, Mail, MapPinHouseIcon } from "lucide-react";
import React from "react";
import { PiAddressBook } from "react-icons/pi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#2c3e50]">
      <div className="px-10 py-5 max-w-7xl mx-auto mt-10 flex justify-between">
        <div>
          <h1 className="text-xl text-white font-semibold">
            About <span className="text-[#4682B4] font-bold">Job</span>
            <span className="text-[#FF8C00] font-bold">Mitra</span>
          </h1>
          <div class="w-16 h-[3px] bg-yellow-500 mt-1"></div>
          <p className="text-[#bdc3c7] mt-4 text-sm whitespace-normal break-words max-w-[300px]">
            JobMitra is the leading job portal connecting talented professionals
            with top employers. Our mission is to make job hunting and
            recruitment seamless and efficient.
          </p>
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Quick Links</h1>
          <div class="w-16 h-[3px] bg-yellow-500 mt-1"></div>
          <div className="list-none mt-4 text-[#bdc3c7]">
            <li className="my-1">Home</li>
            <li className="my-1">Browse</li>
            <li className="my-1">Jobs</li>
            <li className="my-1">About</li>
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Contact US</h1>
          <div class="w-16 h-[3px] bg-yellow-500 mt-1"></div>
          <div className="mt-4 text-[#bdc3c7]">
            <div className="flex items-center my-2 gap-2">
              <MapPinHouseIcon className="text-yellow-500 h-5 w-5"></MapPinHouseIcon>
              <p>123 Business Avenue, Suite 100 New York, NY 10001</p>
            </div>
            <div className="flex items-center my-2 gap-2">
              <Contact className="text-yellow-500 h-5 w-5"></Contact>
              <p>+1234567890</p>
            </div>
            <div className="flex items-center my-2 gap-2">
              <Mail className="text-yellow-500 h-5 w-5"></Mail>
              <p>jobmitra@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-white">
        <p class="max-w-7xl mx-auto h-[0.5px] bg-white my-2"></p>
        <p className="py-3">© 2025 JobMitra. All Rights Reserved. | Milan Gauswami</p>
      </div>
    </div>
  );
};

export default Footer;
