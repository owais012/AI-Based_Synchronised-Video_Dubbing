import React, { useState } from "react";
import { FaLanguage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Features() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const languages = [
    { name: "Hindi", icon: <FaLanguage className="text-pink-500 text-3xl" /> },
    { name: "Marathi", icon: <FaLanguage className="text-blue-500 text-3xl" /> },
    { name: "Punjabi", icon: <FaLanguage className="text-green-500 text-3xl" /> },
    { name: "Urdu", icon: <FaLanguage className="text-yellow-500 text-3xl" /> },
    { name: "Gujarati", icon: <FaLanguage className="text-red-500 text-3xl" /> },
  ];

  const handleTryIt = (language) => {
    setSelectedLanguage(language);
    navigate(`/tryme?language=${encodeURIComponent(language)}`); // Navigate to Try Me page with the selected language
  };

  return (
    <div className="w-full min-h-screen bg-black text-gray-100 flex flex-col items-center mt-16">
      <h1 className="text-center text-[3rem] font-serif mb-16">
        Languages You Can Work With
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-screen-xl px-4">
        {languages.map((language, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-between bg-[#1c1c1c] h-60 rounded-2xl p-6 border border-blue-500 border-opacity-30 shadow-lg hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-500 transition-all duration-300"
          >
            <div className="flex flex-col items-center">
              <div className="mb-4">{language.icon}</div>
              <h2 className="text-xl lg:text-2xl font-semibold mb-2">{language.name}</h2>
              <p className="text-sm lg:text-md text-gray-300 text-center">
                Translate and dub your videos into {language.name}.
              </p>
            </div>
            <button
              className="px-6 py-2 bg-blue-500 text-black font-bold rounded-full hover:bg-blue-600 transition-colors"
              onClick={() => handleTryIt(language.name)}
            >
              Try It
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
