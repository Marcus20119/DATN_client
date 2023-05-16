import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ButtonPrimary } from '~/components/Button';
import { Section } from '~/components/Common';
import { InputDisable } from '~/components/Form';
import { Heading } from '~/components/Heading';
import {
  Fan,
  Motor,
  Pump,
  WaterTank,
  ElectricalCabinet,
  Laptop,
  Lamp,
} from '~/components/Monitor';
import { OutputPLC } from '~/components/PLC';
import { TableBase } from '~/components/Table';
import { IRootState } from '~/store/rootReducer';

interface IMonitorXLNT {}

const MonitorXLNT: React.FC<IMonitorXLNT> = ({}) => {
  const { userData, loadingGetThisUserData } = useSelector(
    (state: IRootState) => state.auth
  );
  const tankRef = useRef(null);
  const [tankWidth, setTankWidth] = useState<number>(0);
  const [tankHeight, setTankHeight] = useState<number>(0);
  useEffect(() => {
    if (tankRef.current) {
      const tankRefCurrent = tankRef.current as HTMLDivElement;
      const coords = tankRefCurrent.getBoundingClientRect();
      setTankWidth(coords.width);
      setTankHeight(coords.height);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tankRef.current]);
  return (
    <div className="flex flex-col gap-3">
      <Section
        sectionTitle="MÀN HÌNH GIÁM SÁT HOẠT ĐỘNG"
        isLoading={loadingGetThisUserData}
      >
        <div className="w-full h-[700px] bg-main-blue/5 mt-2 p-5 border-2 border-main-blue-80/80 rounded-md">
          <div className="flex flex-col gap-8 w-full h-full">
            <div className="flex-1 relative flex gap-4 w-full">
              <div className="relative w-1/2 h-[100%] border-4 border-gray-600">
                <div className="z-10 absolute top-[5%] right-[10%] flex items-center gap-4">
                  <strong className="tracking-wide text-gray-700">
                    QUẠT HÚT MÙI
                  </strong>
                  <div className="relative w-[80px]">
                    <Fan isActive={false} isError={false} />
                  </div>
                </div>
                <div className="z-10 absolute bottom-[5%] right-[5%] w-[150px]">
                  <ElectricalCabinet />
                </div>
                <div className="z-10 absolute bottom-[5%] right-[40%] w-[150px]">
                  <Laptop />
                </div>
              </div>
              <div
                ref={tankRef}
                className="relative w-1/2 h-[100%] border-b-8 border-x-8 border-b-gray-600 border-x-gray-600"
              >
                <div className="z-[50] absolute inset-0">
                  <WaterTank waterHeight={90} />
                </div>
                <div className="z-10 absolute top-full right-[30%] w-[100px] -translate-y-full">
                  <Pump
                    isActive={true}
                    isError={true}
                    name="BƠM 1"
                    pipeRightLength={(tankWidth * 20) / 100}
                  />
                </div>
                <div className="z-10 absolute top-full right-[10%] w-[100px] -translate-y-full">
                  <Pump
                    isActive={false}
                    isError={false}
                    name="BƠM 2"
                    pipeUpLength={(tankHeight * 40) / 100}
                    pipeRightLength={(tankWidth * 12) / 100}
                  />
                </div>
                <div className="z-60 absolute top-[30%] left-[10%] flex flex-col gap-3 w-[40%]">
                  <strong className="text-gray-700 whitespace-nowrap tracking-wide">
                    MỨC NƯỚC TRONG BỂ
                  </strong>
                  <div className="relative flex flex-col gap-2 w-full">
                    <Lamp isActive={true} text="ĐẦY" />
                    <Lamp isActive={false} text="CẠN" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-fit mb-2">
              <TableBase type="PLC">
                <thead>
                  <tr>
                    <th className="w-[320px]">THIẾT BỊ</th>
                    <th className="">THỜI GIAN CHẠY</th>
                    <th className="">THỜI GIAN DỪNG</th>
                    <th className="">THỜI GIAN HIỆN TẠI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="!text-left">BƠM BỂ ĐIỀU HÒA</td>
                    <td>
                      <OutputPLC name="T1" value="0" unit="Phút" />
                    </td>
                    <td>
                      <OutputPLC name="T2" value="0" unit="Phút" />
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <OutputPLC name="m1" value="0" unit="Phút" />
                        <OutputPLC name="s1" value="0" unit="Giây" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="!text-left">QUẠT HÚT MÙI CAO ÁP</td>
                    <td>
                      <OutputPLC name="T3" value="0" unit="Phút" />
                    </td>
                    <td>
                      <OutputPLC name="T4" value="0" unit="Phút" />
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <OutputPLC name="m2" value="0" unit="Phút" />
                        <OutputPLC name="s2" value="0" unit="Giây" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </TableBase>
            </div>
          </div>
        </div>
      </Section>
      <Section
        sectionTitle="MÀN HÌNH GIÁM SÁT TUỔI THỌ"
        isLoading={loadingGetThisUserData}
      >
        <div className="w-full bg-main-blue/5 mt-2 p-5 border-2 border-main-blue-80/80 rounded-md">
          <div className="w-full h-fit">
            <TableBase type="PLC">
              <thead>
                <tr>
                  <th className="w-[250px]">THIẾT BỊ</th>
                  <th className="">TUỔI THỌ ĐỘNG CƠ</th>
                  <th className="">THỜI GIAN ĐÃ HOẠT ĐỘNG</th>
                  <th className="">THỜI GIAN CÒN LẠI</th>
                  <th className="w-[200px]">CÀI LẠI THỜI GIAN</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="!text-left">BƠM 1 BỂ ĐIỀU HÒA</td>
                  <td>
                    <OutputPLC name="T_LIFE_1" value="0" unit="Giờ" />
                  </td>
                  <td>
                    <OutputPLC name="T_RUN_1" value="0" unit="Giờ" />
                  </td>
                  <td>
                    <OutputPLC name="T_LEFT_1" value="0" unit="Giờ" />
                  </td>
                  <td>
                    <ButtonPrimary>RESET</ButtonPrimary>
                  </td>
                </tr>
                <tr>
                  <td className="!text-left">BƠM 2 BỂ ĐIỀU HÒA</td>
                  <td>
                    <OutputPLC name="T_LIFE_2" value="0" unit="Giờ" />
                  </td>
                  <td>
                    <OutputPLC name="T_RUN_2" value="0" unit="Giờ" />
                  </td>
                  <td>
                    <OutputPLC name="T_LEFT_2" value="0" unit="Giờ" />
                  </td>
                  <td>
                    <ButtonPrimary>RESET</ButtonPrimary>
                  </td>
                </tr>
                <tr>
                  <td className="!text-left">QUẠT HÚT MÙI CAO ÁP</td>
                  <td>
                    <OutputPLC name="T_LIFE_3" value="0" unit="Giờ" />
                  </td>
                  <td>
                    <OutputPLC name="T_RUN_3" value="0" unit="Giờ" />
                  </td>
                  <td>
                    <OutputPLC name="T_LEFT_3" value="0" unit="Giờ" />
                  </td>
                  <td>
                    <ButtonPrimary>RESET</ButtonPrimary>
                  </td>
                </tr>
              </tbody>
            </TableBase>
          </div>
        </div>
      </Section>
    </div>
  );
};

export { MonitorXLNT };
