import { memo } from 'react';
import './WaterTank.scss';

interface IWaterTank {
  waterHeight: number;
}

const WaterTank: React.FC<IWaterTank> = memo(({ waterHeight: height }) => {
  console.log('rerenderwater');
  return (
    <div id="water-tank" className="water-tank h-full">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: `${height}%` }}
      >
        <defs>
          <pattern
            id="water"
            width=".25"
            height="2"
            patternContentUnits="objectBoundingBox"
          >
            <path
              fill="#00bcd430"
              d="M 0.25 1 H 0 c 0 0 0 -0.659 0 -0.916 c 0.083 -0.05 0.158 0.05 0.25 0 C 0.25 0.327 0.25 1 0.25 0.5 z"
            />
          </pattern>
        </defs>
        <rect
          id="waves"
          className="water-fill"
          fill="url(#water)"
          width="3000"
        />
      </svg>
    </div>
  );
});

export { WaterTank };
