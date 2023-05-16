interface IPump {
  isActive: boolean;
  isError: boolean;
  name: string;
  pipeUpLength?: number;
  pipeRightLength?: number;
}

const Pump: React.FC<IPump> = ({
  isActive,
  isError,
  name,
  pipeUpLength = 50,
  pipeRightLength = 50,
}) => {
  let appearance = `${
    isError
      ? 'border-red-800 bg-red-400'
      : isActive
      ? 'border-green-700 bg-plc-active'
      : 'border-gray-500 bg-plc-inactive/50'
  }`;
  return (
    <div className="relative flex flex-col items-center w-full">
      <div
        className={`relative w-[25%] h-[0] pt-[5%] border-x-2 border-t-2 rounded-t-sm ${appearance}`}
      >
        <strong className="absolute bottom-[200%] left-1/2 -translate-x-1/2 text-gray-700 whitespace-nowrap tracking-wide">
          {name}
        </strong>
      </div>
      <div
        className={`w-[50%] h-[0] pt-[10%] border-x-2 border-t-2 rounded-t-sm ${appearance}`}
      >
        &nbsp;
      </div>
      <div
        className={`w-[70%] h-[0] pt-[7%] border-2 rounded-sm ${appearance}`}
      >
        &nbsp;
      </div>
      <div className={`w-[60%] h-[0] pt-[65%] border-x-2 ${appearance}`}>
        &nbsp;
      </div>
      {/* FAUCET PART */}
      <div
        className={`relative w-[75%] h-[0] pt-[20%] border-2 rounded-sm ${appearance}`}
      >
        <div className="absolute left-[calc(100%_+_2px)] top-1/2 -translate-y-1/2 w-[25%] h-0 pt-[25%]">
          <div
            className={`z-[12] absolute top-0 left-0 w-[35%] h-[35%] border-r-2 border-b-2 rounded-br-sm bg-[#CCD7E3] ${
              isError
                ? 'border-red-800'
                : isActive
                ? 'border-green-700'
                : 'border-gray-500'
            }`}
          >
            &nbsp;
          </div>
          <div
            className={`z-[11] absolute inset-0 border-r-2 border-y-2 rounded-br-md ${appearance}`}
          >
            <div className="z-[12] absolute bottom-[calc(100%_+_1px)] right-[6%] flex flex-col-reverse items-center w-[50%]">
              <div className="w-full h-0 pt-[1200%] bg-plc-inactive">
                &nbsp;
              </div>
              {/* VALVE */}
              <div className="relative flex flex-col items-center w-[300%] bg-transparent">
                <div className="relative w-0 h-0 border-t-plc-inactive border-t-[28px] border-x-[14px] border-x-transparent translate-y-1">
                  <div className="absolute bottom-[4px] left-[-10px] w-0 h-0 border-t-plc-[#CCD7E3] border-t-[22px] border-x-[11px] border-x-transparent"></div>
                </div>
                <div className="relative w-0 h-0 border-b-plc-inactive border-b-[28px] border-x-[14px] border-x-transparent">
                  <div className="absolute top-[4px] left-[-10px] w-0 h-0 border-b-plc-[#CCD7E3] border-b-[22px] border-x-[11px] border-x-transparent"></div>
                </div>
                {/* ARROW */}
                <div className="absolute left-[80%] top-1/2 -translate-y-1/2 text-plc-inactive">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
                    />
                  </svg>
                </div>
              </div>
              <div
                className="relative w-full h-0 bg-plc-inactive translate-y-1"
                style={{ paddingTop: `${pipeUpLength}px` }}
              >
                <div
                  className="absolute top-0 left-0 w-full h-0 origin-top-left -rotate-90 bg-plc-inactive"
                  style={{ paddingTop: `${pipeRightLength}px` }}
                >
                  &nbsp;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* STRIPE PART */}
      <div
        className={`relative w-[65%] h-[0] pt-[14%] border-x-2 ${appearance}`}
      >
        <div className="absolute inset-0 flex justify-evenly items-center">
          {Array(7)
            .fill(null)
            .map((item, index) => (
              <div
                key={`pump-line-${index}`}
                className={`w-[2px] h-[80%] ${
                  isError
                    ? 'bg-red-800'
                    : isActive
                    ? 'bg-green-700'
                    : 'bg-gray-500'
                }`}
              >
                &nbsp;
              </div>
            ))}
        </div>
      </div>
      <div
        className={`w-[80%] h-[0] pt-[5%] border-x-2 border-t-2 rounded-sm ${appearance}`}
      >
        &nbsp;
      </div>
    </div>
  );
};

export { Pump };
