interface ILamp {
  isActive: boolean;
  text: string;
  isError?: boolean;
}

const Lamp: React.FC<ILamp> = ({ isActive, text, isError = false }) => {
  let appearance = `${
    isError
      ? 'border-red-800 bg-red-400'
      : isActive
      ? 'border-green-700 bg-plc-active'
      : 'border-gray-500 bg-plc-inactive/50'
  }`;
  return (
    <div className="inline-flex items-center gap-4">
      <div
        className={`w-[20%] h-0 pt-[18%] border-2 rounded-full ${appearance}`}
      >
        &nbsp;
      </div>
      <span className="text-gray-700 whitespace-nowrap tracking-wide">
        {text}
      </span>
    </div>
  );
};

export { Lamp };
