interface IFan {
  active: boolean;
}

const Fan: React.FC<IFan> = ({ active }) => {
  return (
    <div className="relative w-full h-0 pt-[100%]">
      {/* CELL PART */}
      <div className="z-[5] absolute inset-0 border-[3px] border-gray-500 rounded-full">
        {Array(4)
          .fill(null)
          .map((item, index) => (
            <div
              key={`line-${index}`}
              className={`z-[6] absolute inset-0 flex justify-center items-start`}
              style={{ transform: `rotate(${index * 45 + 5}deg)` }}
            >
              <div className="w-[2px] h-full bg-gray-500">&nbsp;</div>
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
                className="border-2 border-gray-500 rounded-full"
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
        className={`z-[1] absolute inset-[5%] ${active ? 'animate-spin' : ''}`}
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
                className={`w-[20%] h-1/2 bg-[#77777745] border-2 border-gray-500 rounded-[50%]`}
              >
                &nbsp;
              </div>
            </div>
          ))}
        <div className="z-[3] absolute inset-0 flex justify-center items-center">
          <div className="w-[15%] h-[15%] rounded-full bg-gray-500">&nbsp;</div>
        </div>
      </div>
    </div>
  );
};

export { Fan };
