import React from 'react';

function Features() {
  const languages = [
    "Hindi", "Marathi", "Punjabi", "Urdu", 
    "Gujarati", "Marwari", "Kannada", "Konkani", 
    "Maithili", "Malayalam", "Manipuri", "Oriya", 
    "Tamil", "Telugu", "Santali", "Sindhi"
  ];

  return (
    <div className="w-full min-h-screen py-20 bg-black">
      {/* Heading */}
      <h1 className="text-center text-[3rem] font-serif text-gray-100 mb-16">
        Languages You Can Work With
      </h1>
      
      {/* Language Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-10">
        {languages.map((language, index) => (
          <div 
            key={index} 
            className="flex justify-center items-center h-40 bg-[#1c1c1c] text-gray-100 text-lg font-semibold rounded-2xl border-4 border-blue-500 border-opacity-30 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {language}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;

