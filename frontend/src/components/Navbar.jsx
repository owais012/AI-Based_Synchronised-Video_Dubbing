import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="Navbar w-full h-16 bg-white shadow-md fixed top-0 left-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-full">
          <div>
            <Link to="/">
            <img className="w-[4rem] h-[4rem] p-1" alt="Logo" src="/logo.png" />
            </Link>
          </div>
          <div className="flex gap-5">
            <Link to="/" className="text-black hover:underline">Home</Link>
            <Link to="/features" className="text-black hover:underline">Features</Link>
            <Link to="/reviews" className="text-black hover:underline">Reviews</Link>
            <Link to="/contact" className="text-black hover:underline">Contact</Link>
            <Link to="/price" className="text-black hover:underline">Price</Link>
            <Link to="/about" className="text-black hover:underline">About Us</Link>
          </div>
          <div className="flex gap-3 items-center">
            <Link 
              to="/signin" 
              className="box-border text-sm overflow-hidden text-[#171a1f] py-2 px-4 rounded border border-[#171a1f] hover:bg-gray-100" 
            >
              Sign In
            </Link>
            <Link 
              to="/tryme" 
              className="box-border py-2 px-4 bg-[#171a1f] rounded text-white text-sm hover:bg-gray-800"
            >
              Try Free
            </Link>
          </div>
        </div>
      </div>

      <div className="pt-16">
        {/* Main content goes here */}
      </div>
    </>
  );
}

export default Navbar;
