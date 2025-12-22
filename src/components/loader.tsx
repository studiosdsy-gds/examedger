import React, { useEffect, useRef, useState } from 'react';

interface LoaderProps {
  className?: string;
}

const AnimatedShapeLoader: React.FC<LoaderProps> = ({ className = "w-full min-h-screen bg-black" }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState<number | null>(null);

  // Measure the path length once the component mounts
  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }
  }, []);

  // SVG Path Data
  const pathData = "M72.7776 0.761825L112.947 6.27452L113.625 6.36827L113.329 6.98643L95.6077 44.005L95.1741 44.9103L94.7122 44.0187L89.0198 33.0138C88.9924 33.0258 88.9638 33.0387 88.9338 33.0519C88.596 33.2001 88.0973 33.42 87.4573 33.7042C86.1773 34.2727 84.3296 35.1 82.0598 36.1368C77.5195 38.2108 71.2908 41.1212 64.5374 44.4659C51.0451 51.1481 35.5162 59.5369 27.1389 66.4483C23.8799 71.4329 22.4074 78.6096 22.4837 85.2013C22.5219 88.5039 22.9484 91.636 23.72 94.2452C24.4476 96.7054 25.4677 98.6546 26.7141 99.8605C36.3017 94.9652 47.9631 88.8437 57.2649 83.9249C61.9654 81.4393 66.0632 79.2608 68.9856 77.7042C70.4467 76.926 71.6142 76.3034 72.4163 75.8751C72.7521 75.6958 73.0234 75.5497 73.2258 75.4415L68.3245 65.6378L67.8977 64.7862L68.8411 64.92L102.315 69.6456L102.992 69.7413L102.696 70.3575L87.3372 102.256L86.8772 103.212L86.4329 102.249L81.9368 92.5079C81.9196 92.5179 81.9022 92.5287 81.884 92.5392C81.5391 92.7393 81.0316 93.0332 80.384 93.4093C79.0889 94.1615 77.2306 95.2414 74.9788 96.5519C70.4749 99.173 64.3961 102.717 58.096 106.408C45.5758 113.744 32.2084 121.648 28.5637 124.064C25.9793 127.709 25.1336 134.813 29.4182 141.546C31.5681 144.924 34.1708 146.926 37.1653 147.993C40.1732 149.065 43.6138 149.209 47.4524 148.8C48.4131 148.698 49.8054 148.274 51.5364 147.581C53.2564 146.893 55.2742 145.955 57.4729 144.849C61.8703 142.636 66.9672 139.765 71.8128 136.918C76.657 134.072 81.2449 131.253 84.6213 129.145C86.3093 128.091 87.6945 127.215 88.6575 126.603C89.1374 126.297 89.5115 126.056 89.7669 125.893L83.6926 114.883L83.2219 114.03L84.1887 114.145L123.964 118.87L124.66 118.953L124.355 119.585L106.634 156.209L106.22 157.064L105.749 156.239L99.7161 145.682C93.1795 150.092 79.2134 157.836 61.5198 167.067C52.6257 171.708 43.6748 173.101 36.0979 172.687C28.5458 172.273 22.3148 170.06 18.8616 167.426C9.7407 161.277 5.0848 155 2.75123 148.884C0.423431 142.783 0.427116 136.891 0.535411 131.575V64.2667C0.535481 60.0544 3.09784 52.9085 18.9348 45.3067C34.5056 37.8327 64.738 20.7395 78.3411 12.879L72.2678 1.49229L71.8079 0.628036L72.7776 0.761825Z";

  // Configuration
  const strokeWidth = 1.5;
  const lineSegmentRatio = 0.25; // Length of the moving line relative to total path (0.25 = 25%)
  const animationDuration = 4; // seconds (Slow)

  // Calculate Dash Array for Seamless Loop
  // To loop seamlessly, the pattern length (Dash + Gap) must equal the Path Length (or a divisor of it).
  // Here we set Dash + Gap = pathLength.
  const segmentLength = pathLength ? pathLength * lineSegmentRatio : 0;
  const gapLength = pathLength ? pathLength - segmentLength : 0;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative p-10">
        <svg
          viewBox="-5 -5 140 190"
          className="w-64 h-auto overflow-visible"
        >
          <defs>
            {/* Triangle Gradient (Tri-color) */}
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF9933" />   {/* Saffron */}
              <stop offset="50%" stopColor="#FFFFFF" />  {/* White */}
              <stop offset="100%" stopColor="#138808" /> {/* Green */}
            </linearGradient>

            {/* Optional Glow Filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. Static Gray Background Stroke */}
          <path
            d={pathData}
            fill="none"
            stroke="#333333" // Dark gray
            strokeWidth={1} // Thinner than the main line
            strokeLinecap="round"
            className="opacity-50"
          />

          {/* 2. Moving Gradient Line */}
          {/* We only render this once we know the path length to avoid layout shifts */}
          {pathLength !== null && (
            <path
              ref={pathRef}
              d={pathData}
              fill="none"
              stroke="url(#flowGradient)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              filter="url(#glow)"
              style={{
                strokeDasharray: `${segmentLength} ${gapLength}`,
                strokeDashoffset: pathLength,
                animation: `flowAnimation ${animationDuration}s linear infinite`,
              }}
            />
          )}

          {/* Hidden path used solely for initial measurement if state is null */}
          {pathLength === null && (
             <path ref={pathRef} d={pathData} className="opacity-0" />
          )}
        </svg>

        {/* Animation Keyframes */}
        <style>
          {`
            @keyframes flowAnimation {
              to {
                stroke-dashoffset: 0;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default AnimatedShapeLoader;