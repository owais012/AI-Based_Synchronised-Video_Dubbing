// import React from 'react';
// import { Link } from 'react-router-dom';

// function Navbar() {
//   return (
//     <div className="Navbar w-full max-w-6xl mx-auto p-2 flex items-center bg-white rounded-full shadow-md">
//       <div className="flex-grow">
//         <Link to="/">
//           <img className="w-[5rem] p-1" alt="Logo" src="image-16.svg" />
//         </Link>
//       </div>
//       <div className="flex-grow flex justify-center gap-5">
//         <Link to="/" className="text-black">Home</Link>
//         <Link to="/features" className="text-black">Features</Link>
//         <Link to="/reviews" className="text-black">Reviews</Link>
//         <Link to="/contact" className="text-black">Contact</Link>
//         <Link to="/price" className="text-black">Price</Link>
//         <Link to="/about" className="text-black">About Us</Link> {/* Add About Us link */}
//       </div>
//       <div className="flex gap-3 items-center">
//         <Link 
//           to="/signin" 
//           className="box-border text-sm overflow-hidden text-[#171a1f] py-2 px-3 rounded-full border border-[#171a1f]" 
//         >
//           Sign In
//         </Link>
//         <Link 
//           to="/tryme" 
//           className="box-border p-2 px-3 bg-[#171a1f] rounded-full text-white text-sm"
//         >
//           Try Free
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="Navbar w-full p-4 bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div>
          <Link to="/">
            <img className="w-[5rem] p-1" alt="Logo" src="image-16.svg" />
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
  );
}

export default Navbar;



