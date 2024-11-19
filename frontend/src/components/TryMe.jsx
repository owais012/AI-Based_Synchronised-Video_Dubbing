import React, { useState } from 'react';

function TryMe() {
  const [feedback, setFeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim() !== '') {
      setFeedbackSubmitted(true);
      setFeedback('');
      setTimeout(() => setFeedbackSubmitted(false), 3000); // Reset message after 3 seconds
    }
  };

  return (
    <div className="w-full py-16 px-8 bg-gradient-to-b from-black via-gray-800 to-black text-white">
      <h2 className="text-5xl font-extrabold mb-6 text-center text-white tracking-tight drop-shadow-lg">
        Try Our Amazing Features!
      </h2>
      <p className="text-xl text-gray-300 mb-12 text-center max-w-2xl mx-auto">
        Upload your files, select options, and experience the magic of our powerful tool with ease.
      </p>

      {/* Two-column Layout for larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Demo Section */}
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 ease-in-out">
          <h3 className="text-3xl font-semibold mb-6 text-white text-center tracking-wide">
            Interactive Demo
          </h3>
          <form>
            <label className="block mb-6 text-sm font-medium text-gray-300">
              Upload Your File:
              <input
                type="file"
                className="block w-full mt-2 p-3 text-sm text-gray-300 bg-gray-900 border border-gray-700 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-green-600 focus:ring-2 focus:ring-green-400 transition duration-300"
              />
            </label>
            <label className="block mb-6 text-sm font-medium text-gray-300">
              Select an Option:
              <select className="block w-full mt-2 p-3 bg-gray-900 text-gray-300 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-400">
                <option value="Gujarati">Gujarati</option>
                <option value="Hindi">Hindi</option>
                <option value="Marathi">Marathi</option>
                <option value="Kannada">Kannada</option>
              </select>
            </label>
            <button
              type="submit"
              className="w-full mt-4 px-6 py-3 bg-green-500 text-black font-bold rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-400 transition duration-300 transform hover:scale-105"
            >
              Run Demo
            </button>
          </form>
        </div>

        {/* Feedback Section */}
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 ease-in-out">
          <h3 className="text-3xl font-semibold mb-6 text-blue-400 text-center tracking-wide">
            Share Your Feedback
          </h3>
          <form onSubmit={handleFeedbackSubmit}>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Let us know what you think..."
              className="w-full h-40 p-4 text-gray-300 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            />
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-500 text-black font-bold rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition duration-300 transform hover:scale-105"
            >
              Submit Feedback
            </button>
          </form>
          {feedbackSubmitted && (
            <p className="mt-6 text-green-400 text-center font-medium">
              Thank you for your feedback!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TryMe;
