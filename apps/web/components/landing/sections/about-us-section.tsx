const ourStoryText1 = `
  Our story began in the Philippines, where floods often disrupt
  lives and communities. Seeing the need for better awareness, our
  team created a simple tool to keep people informed and safe during
  these times.
`;

const ourStoryText2 = `
  What started as a small project grew into a platform that promotes
  safety, unity, and preparedness among Filipinos. Today, we
  continue to help communities face floods with confidence and hope.
`;

const missionText = `
  Our mission is to provide reliable and up-to-date information
  that helps individuals and communities make smart decisions
  during floods. We aim to promote disaster awareness, encourage
  community involvement, and support quick response efforts.
`;

const visionText = `
  We envision a safer and well-informed community where people are
  always prepared to face flooding and other natural disasters. We
  seek a society that values awareness, cooperation, and timely
  action to protect lives and properties.
`;

export default function AboutUsSection() {
  return (
    <section className="bg-white mt-auto" id="about-us">
      <div className="flex flex-col gap-6 md:gap-10 py-20 max-w-7xl mx-auto px-4 md:0">
        {/* Title */}
        <h2 className="font-poppins text-3xl sm:text-4xl md:text-5xl font-semibold text-center">
          About <span className="text-[#2F327D]">FloodWatch</span>
        </h2>

        <div className="flex flex-col gap-6 md:gap-10 w-full mx-auto">
          {/* Our Story */}
          <div className="shadow-lg rounded-2xl px-6 sm:px-8 py-5 sm:py-6 space-y-4 sm:space-y-5">
            <h3 className="font-poppins text-2xl sm:text-3xl font-semibold">
              Our <span className="text-[#2F327D]">Story</span>
            </h3>

            <div className="text-base sm:text-lg text-gray-600 space-y-4">
              <p>{ourStoryText1}</p>
              <p>{ourStoryText2}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* Mission */}
            <div className="shadow-lg rounded-2xl px-6 sm:px-8 py-5 sm:py-6 space-y-4 sm:space-y-5">
              <h3 className="font-poppins text-2xl sm:text-3xl font-semibold">
                Our <span className="text-[#2F327D]">Mission</span>
              </h3>

              <p className="text-base sm:text-lg text-gray-600">
                {missionText}
              </p>
            </div>

            {/* Vision */}
            <div className="shadow-lg rounded-2xl px-6 sm:px-8 py-5 sm:py-6 space-y-4 sm:space-y-5">
              <h3 className="font-poppins text-2xl sm:text-3xl font-semibold">
                Our <span className="text-[#2F327D]">Vision</span>
              </h3>

              <p className="text-base sm:text-lg text-gray-600">{visionText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
