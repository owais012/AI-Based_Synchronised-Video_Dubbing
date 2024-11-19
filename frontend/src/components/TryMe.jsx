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
    <div className="w-full py-10 px-[7%] bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-white-400">
        Try Our Amazing Features!
      </h2>
      <p className="text-lg text-gray-300 mb-6 text-center">
        Upload your files, select options, and experience the magic of our powerful tool.
      </p>

      {/* Demo Section */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-6 text-white-300 text-center">
          Interactive Demo
        </h3>
        <form>
          <label className="block mb-4 text-sm font-medium text-gray-300">
            Upload Your File:
            <input
              type="file"
              className="block w-full mt-2 p-2 text-sm text-gray-300 bg-gray-900 border border-gray-700 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white-500 file:text-black hover:file:bg-green-600"
            />
          </label>
          <label className="block mb-4 text-sm font-medium text-gray-300">
            Select an Option:
            <select className="block w-full mt-2 p-2 bg-gray-900 text-gray-300 border border-gray-700 rounded-lg">
              <option value="Gujarati">Gujarati</option>
              <option value="Hindi">Hindi</option>
              <option value="Marathi">Marathi</option>
              <option value="Kannada">Kannada</option>
            </select>
          </label>
          <button
            type="submit"
            className="w-full mt-4 px-6 py-2 bg-green-500 rounded-lg text-black font-bold hover:bg-green-600 transition duration-300"
          >
            Run Demo
          </button>
        </form>
      </div>

      {/* Feedback Section */}
      <div className="mt-10 bg-gray-800 p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4 text-blue-400 text-center">
          Share Your Feedback
        </h3>
        <form onSubmit={handleFeedbackSubmit}>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Let us know what you think..."
            className="w-full h-32 p-3 text-gray-300 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <button
            type="submit"
            className="w-full px-6 py-2 bg-blue-500 rounded-lg text-black font-bold hover:bg-blue-600 transition duration-300"
          >
            Submit Feedback
          </button>
        </form>
        {feedbackSubmitted && (
          <p className="mt-4 text-green-400 text-center font-medium">
            Thank you for your feedback!
          </p>
        )}
      </div>
    </div>
  );
}

export default TryMe;
