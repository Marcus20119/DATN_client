interface IMotor {
  isActive: boolean;
}

const Motor: React.FC<IMotor> = ({ isActive }) => {
  return (
    <div className="relative w-full flex flex-col items-center">
      {/* TOP PART */}
      <div
        className={`w-[50%] h-0 pt-[5%] rounded-t-xl border-t-2 ${
          isActive
            ? 'border-t-green-700 bg-plc-active'
            : 'border-t-gray-500 bg-plc-inactive/50'
        }`}
      >
        &nbsp;
      </div>
      {/* BODY PART */}
      <div
        className={`relative w-full h-0 pt-[60%] rounded-xl border-2 ${
          isActive
            ? 'border-green-700 bg-plc-active'
            : 'border-gray-500 bg-plc-inactive/50'
        }`}
      >
        {/* STRIPE PART */}
        <div
          className={`absolute top-0 bottom-0 left-[17%] right-[17%] bg-transparent flex flex-col justify-evenly border-x-2 ${
            isActive ? 'border-x-green-700' : 'border-x-gray-500'
          }`}
        >
          {Array(4)
            .fill(null)
            .map((item, index) => (
              <div
                key={`cross-${index}`}
                className={`w-full h-1 ${
                  isActive ? 'bg-green-700' : 'bg-gray-500'
                }`}
              >
                &nbsp;
              </div>
            ))}
        </div>
        {/* RIGHT PART */}
        <div
          className={`absolute left-full top-1/2 -translate-y-1/2 w-[10%] h-0 pt-[20%] rounded-r-sm border-2 ${
            isActive
              ? 'border-green-700 bg-plc-active'
              : 'border-gray-500 bg-plc-inactive/50'
          }`}
        ></div>
      </div>
      {/* BOTTOM PART */}
      <div
        style={{
          borderBottom: `5px solid ${isActive ? '#10a145c7' : '#6B728080'}`,
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

export { Motor };
