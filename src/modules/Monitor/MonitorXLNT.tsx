import { Fan, Pump, WaterTank } from '~/components/Monitor';

interface IMonitorXLNT {}

const MonitorXLNT: React.FC<IMonitorXLNT> = ({}) => {
  return (
    <div className="w-full h-[80vh] bg-main-blue/5 mt-2 p-5 border-2 border-main-blue-80/80 rounded-md">
      <div className="relative w-full h-full">
        <div className="absolute w-[75%] h-[100%] border-b-8 border-x-8 border-b-gray-600 border-x-gray-600">
          <div className="z-[100] absolute inset-0">
            <WaterTank waterHeight={80} />
          </div>
          <div className="z-10 absolute top-full left-[10%] w-[100px] -translate-y-full">
            <Pump active={false} />
          </div>
          <div className="z-10 absolute top-full left-[30%] w-[100px] -translate-y-full">
            <Pump active={true} />
          </div>
          <div className="z-10 absolute top-[5%] left-[15%] w-[80px]">
            <Fan active={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitorXLNT;
