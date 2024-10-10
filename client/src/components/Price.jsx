import React from 'react';

function Price() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-12">Pricing Plans</h1>

        <div className="flex flex-col md:flex-row justify-center gap-8 mb-12">
          {/* Monthly Plan */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex-1 max-w-xs mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-4">Monthly Plan</h2>
            <div className="bg-white text-black p-4 rounded-lg mb-4">
              <h3 className="text-3xl font-bold">₹29</h3>
              <p className="text-sm">Per Month</p>
            </div>
            <p className="text-gray-300 mb-4">
              Get unlimited access to all features for one month. Perfect for short-term use and trial.
            </p>
          </div>

          {/* Yearly Plan */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex-1 max-w-xs mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-4">Yearly Plan</h2>
            <div className="bg-white text-black p-4 rounded-lg mb-4">
              <h3 className="text-3xl font-bold">₹500</h3>
              <p className="text-sm">Per Year</p>
            </div>
            <p className="text-gray-300 mb-4">
              Enjoy the best value with unlimited access for a whole year. Ideal for long-term users.
            </p>
          </div>
        </div>

        {/* Cost per Video */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-xs mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">Cost Per Video</h2>
          <div className="bg-white text-black p-4 rounded-lg">
            <h3 className="text-3xl font-bold">₹15</h3>
            <p className="text-sm">Per Video</p>
          </div>
          <p className="text-gray-300 mt-4">
            Pay only for the videos you dub. Flexible and cost-effective for occasional needs.
          </p>
        </div>

        {/* More Info */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">More Information</h2>
          <p className="text-gray-300 mb-4">
            Our service provides high-quality dubbing for your videos in multiple languages. Choose the plan that best fits your needs, whether it's a short-term trial or a long-term subscription. If you have any questions or need further assistance, feel free to contact us.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Price;

