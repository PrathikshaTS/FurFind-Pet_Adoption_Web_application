import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#7d5946] text-gray-100 text-center py-3 mt-auto shadow-inner border-t-2 border-[#7d4526]">
      <p className="text-sm md:text-base font-medium tracking-wide">&copy; {new Date().getFullYear()} FurFind. All rights reserved. </p>
    </footer>
  );
};

export default Footer;
