// import React from 'react';
// import { MdOutlineDriveFolderUpload } from "react-icons/md";

// function Hero() {
//   return (
//     <div className="w-full py-10 px-[7%] bg-black">
//       <div className="hero_text w-full">
//         <div className="relative text-white w-full my-12">
//           <h2 className="[font-family:'Lexend','Helvetica'] font-bold text-[3rem] text-center">
//             Best Platform for Dubbing Your Videos
//           </h2>
//           <p className="text-center mt-0 text-sm">
//             Irure dolore exercitation aliquip deserunt aute adipisicing ut. Enim exercitation anim est et consequat pr
//           </p>
//         </div>
//         <div className="main w-full px-20">
//           <div className="inputs flex justify-between w-full">
//             <span className="w-[70%] text-xl flex items-center">
//               <input className="w-full p-2 rounded-xl" placeholder="Enter Your Url Here" type="text" />
//               <button className="bg-white relative right-7">
//                 <MdOutlineDriveFolderUpload />
//               </button>
//             </span>
//             <select className="w-[28%] p-2 rounded-xl">
//               <option value="" hidden>Select Language</option>
//               <option value="English">English</option>
//               <option value="Hindi">Hindi</option>
//               <option value="English">English</option>
//             </select>
//           </div>
//           <div className="w-full h-[35rem] rounded-2xl mt-5 overflow-hidden">
//             <iframe
//               className="w-full h-full"
//               src="https://www.youtube.com/embed/UNo0TG9LwwI?si=G0qT70adoBQJ8AUf"
//               title="YouTube video player"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Hero;

import React from 'react';
import { MdOutlineDriveFolderUpload } from "react-icons/md";

function Hero() {
  return (
    <div className="w-full py-10 px-[5%] bg-black">
      
      {/* Hero Section */}
      <div className="hero_text w-full">
        <div className="relative text-white w-full my-12">
          <h2 className="[font-family:'Lexend','Helvetica'] font-bold text-[3.5rem] text-center">
            Best Platform for Dubbing Your Videos
          </h2>
          <p className="text-center mt-0 text-lg">
            Irure dolore exercitation aliquip deserunt aute adipisicing ut. Enim exercitation anim est et consequat pr
          </p>
        </div>
        <div className="main w-full px-20">
          <div className="inputs flex justify-between w-full mb-5">
            <span className="w-[70%] text-xl flex items-center">
              <input className="w-full p-3 rounded-xl" placeholder="Enter Your Url Here" type="text" />
              <button className="bg-white p-2 rounded-xl relative right-7">
                <MdOutlineDriveFolderUpload />
              </button>
            </span>
            <select className="w-[28%] p-3 rounded-xl">
              <option value="" hidden>Select Language</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Gujarati">Gujarati</option>
            </select>
          </div>
          <div className="w-full h-[40rem] rounded-2xl mt-5 overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/UNo0TG9LwwI?si=G0qT70adoBQJ8AUf"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="features_section text-white w-full py-16">
        <h3 className="[font-family:'Lexend','Helvetica'] font-bold text-[2.5rem] text-center mb-8">
          Why Choose Our Platform?
        </h3>
        <div className="features_grid grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="feature_box bg-gray-800 p-8 rounded-xl text-center">
            <h4 className="font-bold text-xl mb-4">High-Quality Translations</h4>
            <p>
              We provide accurate and culturally relevant translations, ensuring your content resonates with your target audience.
            </p>
          </div>
          <div className="feature_box bg-gray-800 p-8 rounded-xl text-center">
            <h4 className="font-bold text-xl mb-4">Multi-Language Support</h4>
            <p>
              Our platform supports multiple languages, making it easier to localize your content for different regions.
            </p>
          </div>
          <div className="feature_box bg-gray-800 p-8 rounded-xl text-center">
            <h4 className="font-bold text-xl mb-4">Easy-to-Use Interface</h4>
            <p>
              With a simple and intuitive interface, you can easily upload, translate, and dub your videos in just a few clicks.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="cta_section text-white w-full py-16">
        <div className="cta_box bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-12 rounded-xl text-center">
          <h3 className="[font-family:'Lexend','Helvetica'] font-bold text-[2.5rem] mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-lg mb-8">
            Sign up now and experience the best dubbing platform with a free trial. No credit card required!
          </p>
          <button className="px-8 py-4 bg-white text-black font-bold rounded-full">
            Try Free
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;




