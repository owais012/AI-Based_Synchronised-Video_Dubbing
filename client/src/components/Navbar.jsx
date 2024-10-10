// import React from 'react';
// import { Link } from 'react-router-dom';

// function Navbar() {
//   return (
//     <div className="Navbar w-full p-2 flex items-center bg-white rounded-full">
//       <div className="flex-1">
//         <Link to="/">
//           <img className="w-[5rem] p-1" alt="Logo" src="image-16.svg" />
//         </Link>
//       </div>
//       <div className="flex-1 flex justify-center gap-5">
//         <Link to="/" className="text-black hover:text-gray-700">Home</Link>
//         <Link to="/features" className="text-black hover:text-gray-700">Features</Link>
//         <Link to="/reviews" className="text-black hover:text-gray-700">Reviews</Link>
//         <Link to="/contact" className="text-black hover:text-gray-700">Contact</Link>
//         <Link to="/price" className="text-black hover:text-gray-700">Price</Link>
//       </div>
//       <div className="flex-1 flex justify-end gap-3">
//         <Link to="/signin" className="box-border text-sm overflow-hidden text-[#171a1f] hover:text-gray-700">Sign In</Link>
//         <Link to="/tryme" className="box-border p-2 px-4 bg-[#171a1f] rounded-full text-white text-sm hover:bg-black">Try Free</Link>
//       </div>
//     </div>
//   );
// }

// export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="Navbar w-full max-w-6xl mx-auto p-2 flex items-center bg-white rounded-full shadow-md">
      <div className="flex-grow">
        <Link to="/">
          <img className="w-[5rem] p-1" alt="Logo" src="image-16.svg" />
        </Link>
      </div>
      <div className="flex-grow flex justify-center gap-5">
        <Link to="/" className="text-black">Home</Link>
        <Link to="/features" className="text-black">Features</Link>
        <Link to="/reviews" className="text-black">Reviews</Link>
        <Link to="/contact" className="text-black">Contact</Link>
        <Link to="/price" className="text-black">Price</Link>
        <Link to="/about" className="text-black">About Us</Link> {/* Add About Us link */}
      </div>
      <div className="flex gap-3 items-center">
        <Link 
          to="/signin" 
          className="box-border text-sm overflow-hidden text-[#171a1f] py-2 px-3 rounded-full border border-[#171a1f]" 
        >
          Sign In
        </Link>
        <Link 
          to="/tryme" 
          className="box-border p-2 px-3 bg-[#171a1f] rounded-full text-white text-sm"
        >
          Try Free
        </Link>
      </div>
    </div>
  );
}

export default Navbar;


