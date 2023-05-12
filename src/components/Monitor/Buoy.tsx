interface IBuoy {
  active: boolean;
}

const Buoy: React.FC<IBuoy> = ({ active }) => {
  return (
    <div
      className={`relative w-full h-0 pt-[100%] animate-bounce`}
      style={{
        WebkitTransformOrigin: '50% 50%',
        transformOrigin: '50% 50%',
        WebkitAnimation: 'swinging 3.5s ease-in-out forwards infinite',
        animation: 'swinging 3.5s ease-in-out forwards infinite',
      }}
    >
      <div
        className={`z-[5] absolute inset-0 rounded-full overflow-hidden ${
          active
            ? 'border-2 border-green-700 bg-[#9EF335]'
            : 'border-2 border-gray-500 bg-[#AFB9C3]'
        }`}
      >
        <div
          className={`w-full h-[40%] border-double ${
            active
              ? 'border-b-4 border-b-green-700 bg-[#cae8a5c5]'
              : 'border-b-4 border-b-gray-500 bg-[#c2ccd5]'
          }`}
        >
          &nbsp;
        </div>
      </div>
      <div
        className={`z-[4] absolute top-[0%] -translate-y-3/4 left-1/2 -translate-x-1/2 w-[20%] h-[20%] rounded-full ${
          active
            ? 'border-2 border-green-700 bg-[#9EF335]'
            : 'border-2 border-gray-500 bg-[#AFB9C3]'
        }`}
      >
        &nbsp;
      </div>
    </div>
  );
};

export default Buoy;
