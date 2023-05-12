import { InputDisable } from '~/components/Form';
import { Heading } from '~/components/Heading';
import { Fan, Pump, WaterTank } from '~/components/Monitor';
import Buoy from '~/components/Monitor/Buoy';

interface IMonitorXLNT {}

const MonitorXLNT: React.FC<IMonitorXLNT> = ({}) => {
  return (
    <div className="w-full h-[80vh] bg-main-blue/5 mt-2 p-5 border-2 border-main-blue-80/80 rounded-md">
      <div className="relative flex gap-4 w-full h-full">
        <div className="relative flex-1 h-[100%] border-b-8 border-x-8 border-b-gray-600 border-x-gray-600">
          <div className="z-[100] absolute inset-0">
            <WaterTank waterHeight={70} />
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
          <div className="z-10 absolute bottom-[60%] right-[15%] w-[50px]">
            <Buoy active={true} />
          </div>
        </div>
        <div className="flex flex-col gap-3 w-[25%] h-full">
          <div className="flex flex-col gap-2 w-full">
            <Heading as="h2" text="Thông số động cơ" className="text-lg" />
            <InputDisable
              label="T1"
              name="T1"
              value="0"
              direction="horizontal"
              labelWidth={30}
              additionalText="Phút"
            />
            <InputDisable
              label="T2"
              name="T2"
              value="0"
              direction="horizontal"
              labelWidth={30}
              additionalText="Phút"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Heading as="h2" text="Thông số quạt hút mùi" className="text-lg" />
            <InputDisable
              label="T3"
              name="T3"
              value="0"
              direction="horizontal"
              labelWidth={30}
              additionalText="Phút"
            />
            <InputDisable
              label="T4"
              name="T4"
              value="0"
              direction="horizontal"
              labelWidth={30}
              additionalText="Phút"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitorXLNT;
