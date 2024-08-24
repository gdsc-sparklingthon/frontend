import React from 'react';

interface CircleProps {
  gradientColors: [string, string]; // Tuple containing two colors for the gradient
}

const GradientCircle: React.FC<CircleProps> = ({ gradientColors }) => {
  const [color1, color2] = gradientColors;

  return (
    <div className="relative flex items-center justify-center">
      <svg width="250px" height="250px" viewBox="0 0 100 100">
        <defs>
          <radialGradient
            id="gradient"
            cx="50%"
            cy="50%"
            r="90%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" style={{ stopColor: color1 }} />
            <stop offset="100%" style={{ stopColor: color2 }} />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="40" fill="url(#gradient)" />
      </svg>
      <div className="absolute text-center text-white">
        <p className="text-[28px] font-bold text-center text-[#ffd874]">96점</p>
        <p className="text-base mb-1">매우 심한 우울상태에요</p>
      </div>
    </div>
  );
};

export default GradientCircle;
