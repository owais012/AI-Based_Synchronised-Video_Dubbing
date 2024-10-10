import React from 'react';

function AboutUs() {
  return (
    <div className="about_us w-full py-10 px-[5%] bg-black text-white">
      {/* About Us Section */}
      <div className="text-center my-12">
        <h2 className="[font-family:'Lexend','Helvetica'] font-bold text-[3.5rem] text-white">
          About Us
        </h2>
        <p className="text-lg mt-4">
          Welcome to our platform! We are passionate about providing high-quality dubbing services for your videos in multiple languages. 
          Our goal is to make content localization simple and accessible for everyone.
        </p>
      </div>

      {/* Team Section */}
      <div className="team_section mt-16">
        <h3 className="text-center text-2xl font-bold">Meet Our Team</h3>
        <p className="text-center mt-4">
          Our team is dedicated to helping you create the best content for your audience.
        </p>

        {/* Team Members */}
        <div className="team_grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {/* Team Member 1 */}
          <div className="team_member bg-gray-800 p-6 rounded-xl text-center">
            <div className="w-40 h-40 mx-auto mb-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member 1"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h4 className="font-bold text-xl">Morvi Panchal</h4>
            <p className="text-sm mt-2">something</p>
            <p className="text-sm mt-4">
              John is passionate about technology and dubbing, ensuring we stay ahead with innovative solutions.
            </p>
          </div>

          {/* Team Member 2 */}
          <div className="team_member bg-gray-800 p-6 rounded-xl text-center">
            <div className="w-40 h-40 mx-auto mb-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member 2"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h4 className="font-bold text-xl">Hemangini Patel</h4>
            <p className="text-sm mt-2">Something</p>
            <p className="text-sm mt-4">
              Jane oversees day-to-day operations and ensures that every project runs smoothly.
            </p>
          </div>

          {/* Team Member 3 */}
          <div className="team_member bg-gray-800 p-6 rounded-xl text-center">
            <div className="w-40 h-40 mx-auto mb-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member 3"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h4 className="font-bold text-xl">Tejas Maroo</h4>
            <p className="text-sm mt-2">Something</p>
            <p className="text-sm mt-4">
              Michael leads our development team, bringing cutting-edge technology to the platform.
            </p>
          </div>

          {/* Team Member 4 */}
          <div className="team_member bg-gray-800 p-6 rounded-xl text-center">
            <div className="w-40 h-40 mx-auto mb-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member 4"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h4 className="font-bold text-xl">Owais Ansari</h4>
            <p className="text-sm mt-2">Something</p>
            <p className="text-sm mt-4">
              Emily drives our marketing efforts, helping us reach a broader audience with the right message.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;



