interface IDisconnectionScreen {
  zIndex?: number;
}

const DisconnectionScreen: React.FC<IDisconnectionScreen> = ({
  zIndex = 50,
}) => {
  return (
    <div
      className="z-[50] absolute inset-0 bg-gray-700/10 backdrop-blur-md"
      style={{ zIndex: `${zIndex}` }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200 rounded-2xl w-[90%] max-w-[350px] px-8 py-[24px] shadow-2xl text-main-blue">
        <h3 className="text-lg font-bold mb-1">Mất kết nối !</h3>
        <p className="text-base text-slate-900">Kiểm tra lại kết nối với PLC</p>
      </div>
    </div>
  );
};

export default DisconnectionScreen;
