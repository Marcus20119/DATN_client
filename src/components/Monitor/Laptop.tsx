interface ILaptop {
  text?: string;
}

const Laptop: React.FC<ILaptop> = ({ text = 'PLC Webserver ...' }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-[92%] h-0 pt-[58%] border-[8px] border-gray-600 rounded-t-md bg-gray-900">
        <p className="absolute top-0 left-0 p-3 text-main-white text-[0.6rem]">
          {text}
        </p>
      </div>
      <div className="relative w-full h-[0] pt-[8%] bg-gray-700 rounded-b-md"></div>
    </div>
  );
};

export { Laptop };
