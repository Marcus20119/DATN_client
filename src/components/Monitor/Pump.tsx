interface IPump {
  active: boolean;
}

const Pump: React.FC<IPump> = ({ active }) => {
  return (
    <div className="relative w-full flex flex-col items-center">
      {/* TOP PART */}
      <div
        className={`w-[50%] h-0 pt-[5%] rounded-t-xl ${
          active
            ? 'border-t-2 border-t-green-700 bg-[#9EF335]'
            : 'border-t-2 border-t-gray-500 bg-[#77777780]'
        }`}
      >
        &nbsp;
      </div>
      {/* BODY PART */}
      <div
        className={`relative w-full h-0 pt-[60%] rounded-xl ${
          active
            ? 'border-2 border-green-700 bg-[#9EF335]'
            : 'border-2 border-gray-500 bg-[#77777780]'
        }`}
      >
        {/* STRIPE PART */}
        <div
          className={`absolute top-0 bottom-0 left-[17%] right-[17%] bg-transparent flex flex-col justify-evenly ${
            active
              ? 'border-x-2 border-x-green-700'
              : 'border-x-2 border-x-gray-500'
          }`}
        >
          {Array(4)
            .fill(null)
            .map((item, index) => (
              <div
                key={`cross-${index}`}
                className={`w-full h-1 ${
                  active ? 'bg-green-700' : 'bg-gray-500'
                }`}
              >
                &nbsp;
              </div>
            ))}
        </div>
        {/* RIGHT PART */}
        <div
          className={`absolute left-full top-1/2 -translate-y-1/2 w-[10%] h-0 pt-[20%] rounded-r-sm ${
            active
              ? 'border-2 border-green-700 bg-[#9EF335]'
              : 'border-2 border-gray-500 bg-[#77777780]'
          }`}
        ></div>
      </div>
      {/* BOTTOM PART */}
      <div
        style={{
          borderBottom: `5px solid ${active ? '#10a145c7' : '#6B728080'}`,
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          height: 0,
          width: '50%',
        }}
      >
        &nbsp;
      </div>
    </div>
  );
};

export { Pump };
