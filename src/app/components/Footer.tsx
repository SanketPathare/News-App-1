import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-slate-800/90 py-3 sm:mx-17 bottom-0">
      <div className="container mx-auto px-20">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link
              href="/"
              className="text-xl font-bold text-white hover:text-neutral-300 transition-colors"
            >
              News App
            </Link>
          </div>
          <div className="text-center text-neutral-400 text-base">
            {new Date().getFullYear()} © All rights reserved.
          </div>
          <div className="text-center text-neutral-400 text-base">
          Build By : Sanket Pathare.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;