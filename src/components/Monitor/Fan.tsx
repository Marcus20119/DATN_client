import { useResponsive } from '~/hooks/useResponsive';

interface IFan {
  isActive: boolean;
  isError: boolean;
}

const Fan: React.FC<IFan> = ({ isActive, isError }) => {
  const classBorder = `${
    isError
      ? 'border-red-700/90'
      : isActive
      ? 'border-green-700'
      : 'border-gray-500'
  }`;
  const classBackground = `${
    isError ? 'bg-red-700/90' : isActive ? 'bg-green-700' : 'bg-gray-500'
  }`;
  const classBlade = `${
    isError
      ? 'border-red-700/90 bg-plc-error/30'
      : isActive
      ? 'border-green-700 bg-plc-active/40'
      : 'border-gray-500 bg-plc-inactive/20'
  }`;
  const { isMobile } = useResponsive();
  return (
    <div className="relative w-full h-0 pt-[100%]">
      {/* CELL PART */}
      <div
        className={`z-[5] absolute inset-0 ${
          isMobile ? 'border-2' : 'border-[3px]'
        } rounded-full ${classBorder}`}
      >
        {Array(4)
          .fill(null)
          .map((item, index) => (
            <div
              key={`line-${index}`}
              className={`z-[6] absolute inset-0 flex justify-center items-start`}
              style={{ transform: `rotate(${index * 45 + 5}deg)` }}
            >
              <div className={`w-[2px] h-full ${classBackground}`}>&nbsp;</div>
            </div>
          ))}
        {Array(3)
          .fill(null)
          .map((item, index) => (
            <div
              key={`circle-${index}`}
              className={`z-[6] absolute inset-0 flex justify-center items-center`}
            >
              <div
                className={`border-2 rounded-full ${classBorder}`}
                style={{
                  width: `${(index + 1) * 25}%`,
                  height: `${(index + 1) * 25}%`,
                }}
              >
                &nbsp;
              </div>
            </div>
          ))}
      </div>
      {/* BLADE PART */}
      <div
        className={`z-[1] absolute inset-[5%] ${
          isActive && !isError ? 'animate-spin' : ''
        }`}
      >
        {Array(4)
          .fill(null)
          .map((item, index) => (
            <div
              key={`blade-${index}`}
              className={`z-[2] absolute inset-0 flex justify-center items-start`}
              style={{ transform: `rotate(${index * 90}deg)` }}
            >
              <div
                className={`w-[20%] h-1/2  border-2 rounded-[50%] ${classBlade}`}
              >
                &nbsp;
              </div>
            </div>
          ))}
        <div className="z-[3] absolute inset-0 flex justify-center items-center">
          <div className={`w-[15%] h-[15%] rounded-full ${classBackground}`}>
            &nbsp;
          </div>
        </div>
      </div>
    </div>
  );
};

export { Fan };
