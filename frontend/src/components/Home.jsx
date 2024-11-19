import { Link } from "react-router-dom"; // Import the Link component
import { useState } from "react";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { FaUpload, FaLanguage, FaVideo } from "react-icons/fa";

function Hero() {
  // State for URL, language, videoId, and error message
  const [url, setUrl] = useState("");
  const [language, setLanguage] = useState("");
  const [videoId, setVideoId] = useState("");
  const [error, setError] = useState(""); // Error state

  const handleSubmit = async () => {
    if (url && language) {
      try {
        const response = await fetch("http://localhost:6000/dub-video", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            audio_file: url,     // Pass the audio or video file URL
            src_lang: "eng_Latn", // Source language
            tgt_lang: language,  // Target language
          }),
        });

        if (response.ok) {
          const blob = await response.blob(); // Get video file as a Blob
          const videoUrl = URL.createObjectURL(blob);

          // Create a download link for the video
          const link = document.createElement("a");
          link.href = videoUrl;
          link.download = "dubbed_video.mp4";
          link.textContent = "Download Dubbed Video";
          document.body.appendChild(link); // Append the link to the body
          link.click(); // Simulate click to start download

          // Optionally, preview the video in a player
          const videoElement = document.getElementById("videoPreview");
          if (videoElement) {
            videoElement.src = videoUrl;
          }

          alert("Dubbed video generated successfully!");
        } else {
          const error = await response.json();
          alert(`Error: ${error.error}`);
        }
      } catch (err) {
        console.error("Error submitting form:", err);
        alert("An error occurred. Please try again.");
      }
    } else {
      alert("Please enter a URL and select a language.");
    }
  };

  // Update video ID and validate URL
  const handleUrlChange = (e) => {
    const videoUrl = e.target.value;
    setUrl(videoUrl);
    const id = extractVideoId(videoUrl);
    if (id) {
      setVideoId(id); // Set the extracted video ID
      setError(""); // Clear error if URL is valid
    } else {
      setVideoId(""); // Clear video ID if URL is invalid
      setError("Please enter a valid YouTube URL."); // Set error message
    }
  };

  return (
    <div className="w-screen min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <div className="hero_text w-full py-14 px-6 lg:px-[12%]">
        <div className="relative w-full my-14 text-center">
          <h2 className="[font-family:'Lexend','Helvetica'] font-bold text-[3rem] lg:text-[4.5rem]">
            <h1 text>Best Platform for Dubbing Your Videos</h1>
          </h2>
          <p className="mt-4 text-xl lg:text-2xl text-center">Dub your video in any language you want.</p>
        </div>
        <div className="main w-full max-w-7xl mx-auto px-6 lg:flex lg:justify-between lg:gap-12">
          {/* Input and Video Section */}
          <div className="w-full lg:w-[65%]">
            <div className="inputs flex flex-col lg:flex-row items-center justify-between gap-6 w-full mb-8">
              <span className="w-full lg:w-[72%] flex items-center relative">
                <input
                  className="w-full p-5 text-lg rounded-2xl text-black"
                  placeholder="Enter Your Url Here"
                  type="text"
                  value={url}
                  onChange={handleUrlChange} // Update URL state and extract video ID
                />
                <button className="bg-white p-4 rounded-2xl absolute right-3 lg:right-4">
                  <MdOutlineDriveFolderUpload size={24} />
                </button>
              </span>
              <select
                className="w-full lg:w-[28%] p-4 text-lg rounded-2xl text-black"
                value={language}
                onChange={(e) => setLanguage(e.target.value)} // Update language state
              >
                <option value="" hidden>
                  Select Language
                </option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Kannada">Kannada</option>
              </select>
            </div>

            {/* Display error message */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Video Box */}
            <div className="w-full mt-6 p-4 border-2 border-gray-700 rounded-2xl">
              <h3 className="text-center text-xl text-white mb-4">Video Preview</h3>
              {/* Video Section */}
              {videoId && !error ? (
                <iframe
                  className="w-full h-[28rem] md:h-[35rem] rounded-2xl"
                  src={`https://www.youtube.com/embed/${videoId}`} // Embed video dynamically
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <p className="text-center text-gray-400">Please enter a valid YouTube URL to preview the video.</p>
              )}
            </div>
          </div>

          {/* Steps Section */}
          <div className="steps w-full lg:w-[32%] bg-gray-800 p-10 rounded-2xl mt-10 lg:mt-0 shadow-lg text-center">
            <h3 className="[font-family:'Playfair Display','Helvetica'] font-bold text-[2.5rem] mb-8 text-white">
              Steps to Dub Your Video
            </h3>
            <div className="step mb-8 flex items-center gap-4">
              <FaUpload size={40} className="text-indigo-500" />
              <div className="text-left text-white">
                <h4 className="font-bold text-lg lg:text-xl mb-1">1. Upload the Video</h4>
                <p className="text-md lg:text-lg">Choose and upload your video file.</p>
              </div>
            </div>
            <div className="step mb-8 flex items-center gap-4">
              <FaLanguage size={40} className="text-green-500" />
              <div className="text-left text-white">
                <h4 className="font-bold text-lg lg:text-xl mb-1">2. Select the Language</h4>
                <p className="text-md lg:text-lg">Pick your desired dubbing language.</p>
              </div>
            </div>
            <div className="step flex items-center gap-4">
              <FaVideo size={40} className="text-pink-500" />
              <div className="text-left text-white">
                <h4 className="font-bold text-lg lg:text-xl mb-1">3. Get the Dubbed Video</h4>
                <p className="text-md lg:text-lg">Download your dubbed video instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="w-full text-center mt-10">
        <button
          onClick={handleSubmit}
          className="px-10 py-5 bg-indigo-500 text-white text-lg font-bold rounded-full"
        >
          Submit
        </button>
      </div>

      {/* Feature Section */}
      <div className="features_section w-full py-20 px-6 lg:px-[12%]">
        <h3 className="[font-family:'Lexend','Helvetica'] font-bold text-[2.5rem] lg:text-[3rem] text-center mb-10">
          Why Choose Our Platform?
        </h3>
        <div className="features_grid grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="feature_box bg-gray-800 p-10 rounded-3xl text-center">
            <h4 className="font-bold text-xl lg:text-2xl mb-6">High-Quality Translations</h4>
            <p className="text-lg">
              We provide accurate and culturally relevant translations, ensuring your content resonates with your target audience.
            </p>
          </div>
          <div className="feature_box bg-gray-800 p-10 rounded-3xl text-center">
            <h4 className="font-bold text-xl lg:text-2xl mb-6">Multi-Language Support</h4>
            <p className="text-lg">
              Choose from a wide range of languages for dubbing, making your content accessible worldwide.
            </p>
          </div>
          <div className="feature_box bg-gray-800 p-10 rounded-3xl text-center">
            <h4 className="font-bold text-xl lg:text-2xl mb-6">Fast and Efficient</h4>
            <p className="text-lg">
              Our platform delivers results quickly, allowing you to get your dubbed video in no time.
            </p>
          </div>
        </div>
      </div>
      
  {/* Get Started CTA Section */}
  <div className="cta_section w-full py-20 px-6 lg:px-[12%]">
  <div className="cta_box bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-16 rounded-3xl text-center max-w-4xl mx-auto">
    <h3 className="[font-family:'Lexend','Helvetica'] font-bold text-[2.5rem] lg:text-[3rem] mb-6">
      Ready to Get Started?
    </h3>
    <p className="text-lg lg:text-xl mb-10">
      Sign up now and experience the best dubbing platform with a free trial. No credit card required!
      </p>
        <Link
          to="/tryme"
          className="px-10 py-5 text-xl font-semibold text-indigo-500 border-2 border-indigo-500 rounded-full transition duration-300 hover:bg-indigo-500 hover:text-white"
        >
          Try It Now
        </Link>
      </div>
      </div>
      </div>
  
  );
}

export default Hero;
