"use client";

const Loading = () => {
  const radius = 18;
  const initialRadius = 38;

  const dotPositions = [
    { x: 50, y: 50 - radius, angle: "0deg" },
    { x: 50 + radius * 0.78, y: 50 - radius * 0.62, angle: "51deg" },
    { x: 50 + radius * 0.97, y: 50 + radius * 0.22, angle: "102deg" },
    { x: 50 + radius * 0.43, y: 50 + radius * 0.9, angle: "154deg" },
    { x: 50 - radius * 0.43, y: 50 + radius * 0.9, angle: "206deg" },
    { x: 50 - radius * 0.97, y: 50 + radius * 0.22, angle: "257deg" },
    { x: 50 - radius * 0.78, y: 50 - radius * 0.62, angle: "309deg" },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/95 backdrop-blur">
      <div
        className="relative w-[300px] h-[300px] flex items-center justify-center
                   animate-[logoSettle_2s_cubic-bezier(0.68,-0.55,0.265,1.55)_1.8s_forwards]
                   scale-100
                   sm:w-[180px] sm:h-[180px]"
      >
        {/* Arcs */}
        <div className="absolute inset-0">
          <span
            className="absolute inset-0 border-[22px] border-[#0095AA] rounded-full
                       border-t-0 border-b-0 border-r-0
                       animate-[arcSlideInLeft_0.6s_ease_1.2s_forwards]"
          />
          <span
            className="absolute inset-0 border-[22px] border-[#0095AA] rounded-full
                       border-t-0 border-b-0 border-l-0
                       animate-[arcSlideInRight_0.6s_ease_1.2s_forwards]"
          />
        </div>

        {/* Inner Circle */}
        <div className="absolute w-[140px] h-[140px] bg-white rounded-full z-10
                        shadow-[0_0_0_2px_rgba(0,149,170,0.1)]
                        sm:w-[105px] sm:h-[105px]"
        />

        {/* Dots */}
        <div className="absolute inset-0 z-20">
          {dotPositions.map((pos, i) => (
            <span
              key={i}
              className="absolute w-3 h-3 bg-black rounded-full left-1/2 top-1/2
                         animate-[chromeDotAnimation_1.2s_cubic-bezier(0.25,0.46,0.45,0.94)_forwards]"
              style={{
                "--final-x": `${pos.x}%`,
                "--final-y": `${pos.y}%`,
                "--angle": pos.angle,
                "--r-start": `${initialRadius}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
