import React from 'react';

function AboutUs() {
  return (
    <div className="about_us w-full py-16 px-[5%] bg-gradient-to-b from-gray-900 to-black text-white">
      {/* About Us Section */}
      <div className="text-center my-12">
        <h2 className="font-extrabold text-[3.5rem] text-blue-400">
          About Us
        </h2>
        <p className="text-lg mt-4 max-w-3xl mx-auto leading-relaxed">
          At <span className="text-green-500 font-bold">Syncvox</span>, we are transforming the way the world communicates. 
          Our platform empowers creators, businesses, and individuals by offering state-of-the-art dubbing and translation services. 
          We aim to break linguistic barriers and make global communication seamless.
        </p>
      </div>

      {/* Team Section */}
      <div className="team_section mt-16">
        <h3 className="text-center text-2xl font-bold text-green-400">
          Meet Our Team
        </h3>
        <p className="text-center mt-4 max-w-2xl mx-auto text-gray-300">
          Behind every innovative feature is a passionate team dedicated to creating meaningful solutions. Here’s a glimpse of the people who make it all possible.
        </p>

        {/* Team Members */}
        <div className="team_grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {/* Team Member 1 */}
          <div className="team_member bg-gray-800 p-6 rounded-xl text-center shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="w-40 h-40 mx-auto mb-4">
              <img
                src="/Morvi.png"
                alt="Morvi Panchal"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h4 className="font-bold text-xl text-blue-400">Morvi Panchal</h4>
            <p className="text-sm mt-2 font-medium text-green-400">Tech Innovator</p>
            <p className="text-sm mt-4 text-gray-300">
            Morvi drives technological advancements, ensuring our platform remains at the forefront of AI and language processing.
             
            </p>
          </div>

          {/* Team Member 2 */}
          <div className="team_member bg-gray-800 p-6 rounded-xl text-center shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="w-40 h-40 mx-auto mb-4">
              <img
                src="/Hemangini.png"
                alt="Hemangini Patel"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h4 className="font-bold text-xl text-blue-400">Hemangini Patel</h4>
            <p className="text-sm mt-2 font-medium text-green-400">ML & Frontend Specialist</p>
            <p className="text-sm mt-4 text-gray-300">
              
            As a dedicated contributor to our projects, Hemangini works tirelessly to bring our vision to life with innovation and attention to detail.            </p>
          </div>

          {/* Team Member 3 */}
          <div className="team_member bg-gray-800 p-6 rounded-xl text-center shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="w-40 h-40 mx-auto mb-4">
              <img
                src="/Tejas.png"
                alt="Tejas Maroo"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h4 className="font-bold text-xl text-blue-400">Tejas Maroo</h4>
            <p className="text-sm mt-2 font-medium text-green-400">AI Enthusiast</p>
            <p className="text-sm mt-4 text-gray-300">
            Tejas specializes in building intelligent systems that enhance the accuracy and efficiency of our dubbing models.
            </p>
          </div>

          {/* Team Member 4 */}
          <div className="team_member bg-gray-800 p-6 rounded-xl text-center shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="w-40 h-40 mx-auto mb-4">
              <img
                src="/Owais.png"
                alt="Owais Ansari"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h4 className="font-bold text-xl text-blue-400">Owais Ansari</h4>
            <p className="text-sm mt-2 font-medium text-green-400">Creative Strategist</p>
            <p className="text-sm mt-4 text-gray-300">
              Owais ensures that our solutions resonate with our audience by aligning creativity with technical brilliance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
