import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { onValue, ref, set } from 'firebase/database';

import { ButtonPrimary } from '~/components/Button';
import { Section } from '~/components/Common';
import {
  Fan,
  Pump,
  WaterTank,
  ElectricalCabinet,
  Laptop,
  Lamp,
  CountDownToggleTime,
} from '~/components/Monitor';
import { OutputPLC } from '~/components/PLC';
import { TableBase } from '~/components/Table';
import { XLNTDataType, XLNTInitialData } from '~/types';
import { realTimeDb } from '~/firebase/firebase-config';
import { PLC } from '~/helpers';
import { useLoadingDelay } from '~/hooks';
import { useResponsive } from '~/hooks/useResponsive';
import { IRootState } from '~/store/rootReducer';
import DisconnectionScreen from '~/components/PLC/DisconnectionScreen';

interface IMonitorXLNT {}

const writeReset = (variable: keyof XLNTDataType) => {
  set(ref(realTimeDb, `XLNT_WEB/${variable}`), true);
  setTimeout(() => {
    set(ref(realTimeDb, `XLNT_WEB/${variable}`), false);
  }, 1000);
};

const MonitorXLNT: React.FC<IMonitorXLNT> = ({}) => {
  const isLoading = useLoadingDelay(500);
  const tankRef = useRef(null);
  const { userData } = useSelector((state: IRootState) => state.auth);
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

  const [XLNTData, setXLNTData] = useState<XLNTDataType>(XLNTInitialData);
  const [isConnected, setIsConnected] = useState<boolean>(true);
  useEffect(() => {
    const starCountRef = ref(realTimeDb, 'XLNT_PLC');
    onValue(starCountRef, snapshot => {
      const data: XLNTDataType = snapshot.val();
      if (data) {
        const testData: any = data.Error_Pump1;
        if (testData === 'BAD 255') {
          setXLNTData(XLNTInitialData);
          setIsConnected(false);
        } else {
          setIsConnected(true);
          setXLNTData(data);
        }
      }
    });
  }, []);

  const fillData = {
    monitor: {
      screen: {
        fan: {
          isActive: XLNTData.Status_Fan,
          isError: XLNTData.Error_Fan,
        },
        pump1: {
          isActive: XLNTData.Status_Pump1,
          isError: XLNTData.Error_Pump1,
        },
        pump2: {
          isActive: XLNTData.Status_Pump2,
          isError: XLNTData.Error_Pump2,
        },
        lamp: {
          full: XLNTData.Status_Buoy,
          empty: !XLNTData.Status_Buoy,
        },
      },
      table: {
        pump: {
          T_On: PLC.ReadDInt(XLNTData.T_On_Pump_Min),
          T_Off: PLC.ReadDInt(XLNTData.T_Off_Pump_Min),
          T_Left: {
            TOn:
              XLNTData.Error_Pump1 || XLNTData.Error_Pump2
                ? 0
                : XLNTData.Status_Pump1
                ? PLC.ReadDInt(XLNTData.T_Left_On_Pump1_Sec)
                : XLNTData.Status_Pump2
                ? PLC.ReadDInt(XLNTData.T_Left_On_Pump2_Sec)
                : 0,
            TOff:
              XLNTData.Error_Pump1 || XLNTData.Error_Pump2
                ? 0
                : PLC.ReadDInt(XLNTData.T_Left_Off_Pump_Sec),
            isTOn: XLNTData.Status_Pump1 || XLNTData.Status_Pump2,
          },
        },
        fan: {
          T_On: PLC.ReadDInt(XLNTData.T_On_Fan_Min),
          T_Off: PLC.ReadDInt(XLNTData.T_Off_Fan_Min),
          T_Left: {
            TOn: PLC.ReadDInt(XLNTData.T_Left_On_Fan_Sec),
            TOff: PLC.ReadDInt(XLNTData.T_Left_Off_Fan_Sec),
            isTOn: XLNTData.Status_Fan,
          },
        },
      },
    },
    life: {
      pump1: {
        T_lifeTime: 100,
        T_run: Math.floor(PLC.ReadDInt(XLNTData.T_Sum_Pump1_Min) / 60),
        T_left: 100 - Math.floor(PLC.ReadDInt(XLNTData.T_Sum_Pump1_Min) / 60),
      },
      pump2: {
        T_lifeTime: 100,
        T_run: Math.floor(PLC.ReadDInt(XLNTData.T_Sum_Pump2_Min) / 60),
        T_left: 100 - Math.floor(PLC.ReadDInt(XLNTData.T_Sum_Pump2_Min) / 60),
      },
      fan: {
        T_lifeTime: 50,
        T_run: Math.floor(PLC.ReadDInt(XLNTData.T_Sum_Fan_Min) / 60),
        T_left: 50 - Math.floor(PLC.ReadDInt(XLNTData.T_Sum_Fan_Min) / 60),
      },
    },
  };
  const { isMobile } = useResponsive();
  return (
    <div className="flex flex-col gap-3 w-full">
      <Section sectionTitle="MÀN HÌNH GIÁM SÁT HOẠT ĐỘNG" isLoading={isLoading}>
        <div
          className={`relative overflow-hidden w-full ${
            isMobile ? 'h-[1300px]' : 'h-[700px]'
          } bg-main-blue/5 mt-2 p-5 border-2 border-main-blue-80/80 rounded-md ${
            isLoading ? 'invisible' : 'visible'
          }`}
        >
          <div className="flex flex-col gap-8 w-full h-full">
            <div
              className={`flex-1 relative grid gap-4 w-full ${
                isMobile ? 'grid-cols-1' : 'grid-cols-2'
              }`}
            >
              <div className="relative border-4 border-gray-600">
                <div
                  className={`z-10 absolute top-[5%] right-[10%] flex items-center  ${
                    isMobile ? 'gap-2' : 'gap-4'
                  }`}
                >
                  <strong
                    className={`tracking-wide text-gray-700 ${
                      isMobile ? 'text-sm' : ''
                    }`}
                  >
                    QUẠT HÚT MÙI
                  </strong>
                  <div
                    className={`relative ${isMobile ? 'w-[70px]' : 'w-[80px]'}`}
                  >
                    <Fan
                      isActive={fillData.monitor.screen.fan.isActive}
                      isError={fillData.monitor.screen.fan.isError}
                    />
                  </div>
                </div>
                <div
                  className={`z-10 absolute bottom-[5%] right-[5%] ${
                    isMobile ? 'w-[100px]' : 'w-[150px]'
                  }`}
                >
                  <ElectricalCabinet />
                </div>
                <div
                  className={`z-10 absolute bottom-[5%] right-[40%] ${
                    isMobile ? 'w-[100px]' : 'w-[150px]'
                  }`}
                >
                  <Laptop />
                </div>
                <div
                  className={`z-10 absolute ${
                    isMobile
                      ? 'bottom-[55%] right-[5%] w-[100px]'
                      : 'bottom-[5%] left-[6%] w-[120px]'
                  }`}
                >
                  <ButtonPrimary
                    onClick={() => writeReset('Reset_Buzz')}
                    additionalClass={`${
                      userData.role_id === 0 ? '!cursor-not-allowed' : ''
                    } !text-sm`}
                    disabled={userData.role_id === 0}
                  >
                    RESET CÒI
                  </ButtonPrimary>
                </div>
              </div>
              <div
                ref={tankRef}
                className="relative border-b-8 border-x-8 border-b-gray-600 border-x-gray-600"
              >
                <div className="z-[50] absolute inset-0">
                  <WaterTank waterHeight={isMobile ? 97 : 90} />
                </div>
                <div
                  className={`z-10 absolute top-full ${
                    isMobile ? 'right-[35%] w-[60px]' : 'right-[30%] w-[100px]'
                  } -translate-y-full`}
                >
                  <Pump
                    isActive={fillData.monitor.screen.pump1.isActive}
                    isError={fillData.monitor.screen.pump1.isError}
                    name="BƠM 1"
                    pipeRightLength={
                      isMobile ? (tankWidth * 25) / 100 : (tankWidth * 20) / 100
                    }
                  />
                </div>
                <div
                  className={`z-10 absolute top-full ${
                    isMobile ? 'right-[10%] w-[60px]' : 'right-[10%] w-[100px]'
                  } -translate-y-full`}
                >
                  <Pump
                    isActive={fillData.monitor.screen.pump2.isActive}
                    isError={fillData.monitor.screen.pump2.isError}
                    name="BƠM 2"
                    pipeUpLength={(tankHeight * 40) / 100}
                    pipeRightLength={(tankWidth * 12) / 100}
                  />
                </div>
                <div
                  className={`z-60 absolute ${
                    isMobile ? 'top-[18%]' : 'top-[30%]'
                  } left-[10%] flex flex-col gap-3 w-[40%]`}
                >
                  <strong className="text-gray-700 whitespace-nowrap tracking-wide">
                    MỨC NƯỚC TRONG BỂ
                  </strong>
                  <div className="relative flex flex-col gap-2 w-full">
                    <Lamp
                      isActive={fillData.monitor.screen.lamp.full}
                      text="ĐẦY"
                    />
                    <Lamp
                      isActive={fillData.monitor.screen.lamp.empty}
                      text="CẠN"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-fit mb-2">
              {isMobile ? (
                <MonitorTableMobile fillData={fillData} />
              ) : (
                <MonitorTableLaptop fillData={fillData} />
              )}
            </div>
          </div>
          {!isConnected && <DisconnectionScreen />}
        </div>
      </Section>
      {!isLoading && (
        <Section sectionTitle="MÀN HÌNH GIÁM SÁT TUỔI THỌ">
          <div className="relative overflow-hidden w-full bg-main-blue/5 mt-2 p-5 border-2 border-main-blue-80/80 rounded-md">
            <div className="w-full h-fit">
              {isMobile ? (
                <LifeTableMobile fillData={fillData} />
              ) : (
                <LifeTableLaptop fillData={fillData} />
              )}
            </div>
            {!isConnected && <DisconnectionScreen />}
          </div>
        </Section>
      )}
    </div>
  );
};

function MonitorTableLaptop({ fillData }: { fillData: any }) {
  return (
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
            <OutputPLC
              name="T_On_Pump_Min"
              value={fillData.monitor.table.pump.T_On}
              unit="Phút"
            />
          </td>
          <td>
            <OutputPLC
              name="T_Off_Pump_Min"
              value={fillData.monitor.table.pump.T_Off}
              unit="Phút"
            />
          </td>
          <td>
            <CountDownToggleTime
              minuteName="T_On_Pump_Current_Min"
              secondName="T_On_Pump_Current_Sec"
              tOn={fillData.monitor.table.pump.T_Left.TOn}
              tOff={fillData.monitor.table.pump.T_Left.TOff}
              isTOn={fillData.monitor.table.pump.T_Left.isTOn}
            />
          </td>
        </tr>
        <tr>
          <td className="!text-left">QUẠT HÚT MÙI CAO ÁP</td>
          <td>
            <OutputPLC
              name="T_On_Fan_Min"
              value={fillData.monitor.table.fan.T_On}
              unit="Phút"
            />
          </td>
          <td>
            <OutputPLC
              name="T_Off_Fan_Min"
              value={fillData.monitor.table.fan.T_Off}
              unit="Phút"
            />
          </td>
          <td>
            <CountDownToggleTime
              minuteName="T_On_Fan_Current_Min"
              secondName="T_On_Fan_Current_Sec"
              tOn={fillData.monitor.table.fan.T_Left.TOn}
              tOff={fillData.monitor.table.fan.T_Left.TOff}
              isTOn={fillData.monitor.table.fan.T_Left.isTOn}
            />
          </td>
        </tr>
      </tbody>
    </TableBase>
  );
}

function MonitorTableMobile({ fillData }: { fillData: any }) {
  return (
    <TableBase type="PLC">
      <thead>
        <tr>
          <th className="w-[90px]">THIẾT BỊ</th>
          <th className="">THÔNG SỐ GIÁM SÁT</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="!text-left">BƠM BỂ ĐIỀU HÒA</td>
          <td>
            <strong className="inline-block mb-1">Thời gian chạy:</strong>
            <OutputPLC
              name="T_On_Pump_Min"
              value={fillData.monitor.table.pump.T_On}
              unit="Phút"
            />
            <strong className="inline-block mb-1 mt-2">Thời gian dừng:</strong>
            <OutputPLC
              name="T_Off_Pump_Min"
              value={fillData.monitor.table.pump.T_Off}
              unit="Phút"
            />
            <strong className="inline-block mb-1 mt-2">
              Thời gian hiện tại:
            </strong>
            <CountDownToggleTime
              minuteName="T_On_Pump_Current_Min"
              secondName="T_On_Pump_Current_Sec"
              tOn={fillData.monitor.table.pump.T_Left.TOn}
              tOff={fillData.monitor.table.pump.T_Left.TOff}
              isTOn={fillData.monitor.table.pump.T_Left.isTOn}
            />
          </td>
        </tr>
        <tr>
          <td className="!text-left">QUẠT HÚT MÙI CAO ÁP</td>
          <td>
            <strong className="inline-block mb-1">Thời gian chạy:</strong>

            <OutputPLC
              name="T_On_Fan_Min"
              value={fillData.monitor.table.fan.T_On}
              unit="Phút"
            />
            <strong className="inline-block mb-1 mt-2">Thời gian dừng:</strong>
            <OutputPLC
              name="T_Off_Fan_Min"
              value={fillData.monitor.table.fan.T_Off}
              unit="Phút"
            />
            <strong className="inline-block mb-1 mt-2">
              Thời gian hiện tại:
            </strong>
            <CountDownToggleTime
              minuteName="T_On_Fan_Current_Min"
              secondName="T_On_Fan_Current_Sec"
              tOn={fillData.monitor.table.fan.T_Left.TOn}
              tOff={fillData.monitor.table.fan.T_Left.TOff}
              isTOn={fillData.monitor.table.fan.T_Left.isTOn}
            />
          </td>
        </tr>
      </tbody>
    </TableBase>
  );
}

function LifeTableLaptop({ fillData }: { fillData: any }) {
  const { userData } = useSelector((state: IRootState) => state.auth);
  return (
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
            <OutputPLC
              name="T_LIFE_1"
              value={fillData.life.pump1.T_lifeTime}
              unit="Giờ"
            />
          </td>
          <td>
            <OutputPLC
              name="T_RUN_1"
              value={fillData.life.pump1.T_run}
              unit="Giờ"
            />
          </td>
          <td>
            <OutputPLC
              name="T_LEFT_1"
              value={fillData.life.pump1.T_left}
              unit="Giờ"
            />
          </td>
          <td>
            <ButtonPrimary
              onClick={() => writeReset('Reset_T_Sum_Pump1')}
              additionalClass={`${
                userData.role_id === 0 ? '!cursor-not-allowed' : ''
              }`}
              disabled={userData.role_id === 0}
            >
              RESET
            </ButtonPrimary>
          </td>
        </tr>
        <tr>
          <td className="!text-left">BƠM 2 BỂ ĐIỀU HÒA</td>
          <td>
            <OutputPLC
              name="T_LIFE_2"
              value={fillData.life.pump2.T_lifeTime}
              unit="Giờ"
            />
          </td>
          <td>
            <OutputPLC
              name="T_RUN_2"
              value={fillData.life.pump2.T_run}
              unit="Giờ"
            />
          </td>
          <td>
            <OutputPLC
              name="T_LEFT_2"
              value={fillData.life.pump2.T_left}
              unit="Giờ"
            />
          </td>
          <td>
            <ButtonPrimary
              onClick={() => writeReset('Reset_T_Sum_Pump2')}
              additionalClass={`${
                userData.role_id === 0 ? '!cursor-not-allowed' : ''
              }`}
              disabled={userData.role_id === 0}
            >
              RESET
            </ButtonPrimary>
          </td>
        </tr>
        <tr>
          <td className="!text-left">QUẠT HÚT MÙI CAO ÁP</td>
          <td>
            <OutputPLC
              name="T_LIFE_3"
              value={fillData.life.fan.T_lifeTime}
              unit="Giờ"
            />
          </td>
          <td>
            <OutputPLC
              name="T_RUN_3"
              value={fillData.life.fan.T_run}
              unit="Giờ"
            />
          </td>
          <td>
            <OutputPLC
              name="T_LEFT_3"
              value={fillData.life.fan.T_left}
              unit="Giờ"
            />
          </td>
          <td>
            <ButtonPrimary
              onClick={() => writeReset('Reset_T_Sum_Fan')}
              additionalClass={`${
                userData.role_id === 0 ? '!cursor-not-allowed' : ''
              }`}
              disabled={userData.role_id === 0}
            >
              RESET
            </ButtonPrimary>
          </td>
        </tr>
      </tbody>
    </TableBase>
  );
}

function LifeTableMobile({ fillData }: { fillData: any }) {
  const { userData } = useSelector((state: IRootState) => state.auth);
  return (
    <TableBase type="PLC">
      <thead>
        <tr>
          <th className="w-[88px]">THIẾT BỊ</th>
          <th className="">THÔNG SỐ TUỔI THỌ</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="!text-left">BƠM 1 BỂ ĐIỀU HÒA</td>
          <td>
            <strong className="inline-block mb-1">Tuổi thọ động cơ:</strong>
            <OutputPLC
              name="T_LIFE_1"
              value={fillData.life.pump1.T_lifeTime}
              unit="Giờ"
            />
            <strong className="inline-block mb-1 mt-2">
              Thời gian đã hoạt động:
            </strong>

            <OutputPLC
              name="T_RUN_1"
              value={fillData.life.pump1.T_run}
              unit="Giờ"
            />
            <strong className="inline-block mb-1 mt-2">
              Thời gian còn lại:
            </strong>
            <OutputPLC
              name="T_LEFT_1"
              value={fillData.life.pump1.T_left}
              unit="Giờ"
            />
            {userData.role_id !== 0 && (
              <>
                <strong className="inline-block mb-1 mt-2">
                  Cài lại thời gian:
                </strong>
                <ButtonPrimary onClick={() => writeReset('Reset_T_Sum_Pump1')}>
                  RESET
                </ButtonPrimary>
              </>
            )}
          </td>
        </tr>
        <tr>
          <td className="!text-left">BƠM 2 BỂ ĐIỀU HÒA</td>
          <td>
            <strong className="inline-block mb-1">Tuổi thọ động cơ:</strong>
            <OutputPLC
              name="T_LIFE_2"
              value={fillData.life.pump2.T_lifeTime}
              unit="Giờ"
            />
            <strong className="inline-block mb-1 mt-2">
              Thời gian đã hoạt động:
            </strong>
            <OutputPLC
              name="T_RUN_2"
              value={fillData.life.pump2.T_run}
              unit="Giờ"
            />
            <strong className="inline-block mb-1 mt-2">
              Thời gian còn lại:
            </strong>
            <OutputPLC
              name="T_LEFT_2"
              value={fillData.life.pump2.T_left}
              unit="Giờ"
            />
            {userData.role_id !== 0 && (
              <>
                <strong className="inline-block mb-1 mt-2">
                  Cài lại thời gian:
                </strong>
                <ButtonPrimary onClick={() => writeReset('Reset_T_Sum_Pump2')}>
                  RESET
                </ButtonPrimary>
              </>
            )}
          </td>
        </tr>
        <tr>
          <td className="!text-left">QUẠT HÚT MÙI CAO ÁP</td>
          <td>
            <strong className="inline-block mb-1">Tuổi thọ động cơ:</strong>
            <OutputPLC
              name="T_LIFE_3"
              value={fillData.life.fan.T_lifeTime}
              unit="Giờ"
            />
            <strong className="inline-block mb-1 mt-2">
              Thời gian đã hoạt động:
            </strong>
            <OutputPLC
              name="T_RUN_3"
              value={fillData.life.fan.T_run}
              unit="Giờ"
            />
            <strong className="inline-block mb-1 mt-2">
              Thời gian còn lại:
            </strong>
            <OutputPLC
              name="T_LEFT_3"
              value={fillData.life.fan.T_left}
              unit="Giờ"
            />
            {userData.role_id !== 0 && (
              <>
                <strong className="inline-block mb-1 mt-2">
                  Cài lại thời gian:
                </strong>
                <ButtonPrimary onClick={() => writeReset('Reset_T_Sum_Fan')}>
                  RESET
                </ButtonPrimary>
              </>
            )}
          </td>
        </tr>
      </tbody>
    </TableBase>
  );
}

export default MonitorXLNT;

export { MonitorXLNT };
