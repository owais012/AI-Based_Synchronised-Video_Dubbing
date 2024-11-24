import React from "react";

const reviews = [
  {
    name: "Priya Rane",
    rating: 5,
    comment: "Fantastic service! The dubbing quality is top-notch.",
  },
  {
    name: "Shaurya shetty",
    rating: 4,
    comment: "Great experience, but there is room for improvement.",
  },
  {
    name: "Kavita Rai",
    rating: 5,
    comment: "Highly recommend! The process was smooth and the results were amazing.",
  },
  {
    name: "Aditi Patel",
    rating: 3,
    comment: "Decent results, but the cloned voice quality could use some refinement.",
  },
  {
      name: "Rajesh Nair",
      rating: 5,
      comment: "The attention to detail was remarkable. I’m extremely satisfied.",
  },
  {
      name: "Neha Goyal",
      rating: 4,
      comment: "Impressive technology! Just need better support for rare dialects.",
  }
];

function Review() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 text-center mb-12">
          What Our Users Say
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="relative bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:scale-105 transform"
            >
              <div className="absolute top-[-20px] left-[20px]">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-pink-500 rounded-full flex items-center justify-center text-black font-bold text-lg">
                  {review.name[0]}
                </div>
              </div>
              <div className="mt-6">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 text-2xl">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-100 mb-2">{review.name}</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Review;
