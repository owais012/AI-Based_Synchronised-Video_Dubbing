import React from 'react';

const reviews = [
  {
    name: 'John Doe',
    rating: 5,
    comment: 'Fantastic service! The dubbing quality is top-notch.',
  },
  {
    name: 'Jane Smith',
    rating: 4,
    comment: 'Great experience, but there is room for improvement.',
  },
  {
    name: 'Sam Wilson',
    rating: 5,
    comment: 'Highly recommend! The process was smooth and the results were amazing.',
  },
  // Add more reviews as needed
];

function Review() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-12">What Our Users Say</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-xl">
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(5 - review.rating)}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">{review.name}</h3>
              <p className="text-gray-300">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Review;

