import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { onValue, ref, set } from 'firebase/database';

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
  CountDownToggleTime,
} from '~/components/Monitor';
import { OutputPLC } from '~/components/PLC';
import { TableBase } from '~/components/Table';
import { IRootState } from '~/store/rootReducer';
import { XLNTDataType, XLNTInitialData } from '~/types';
import { realTimeDb } from '~/firebase/firebase-config';
import { PLC } from '~/helpers';

interface IMonitorXLNT {}

const XLNT_CONSTANTS = {
  lifeTime_Pump1: 100,
  lifeTime_Pump2: 100,
  lifeTime_Fan: 50,
};

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

  const [XLNTData, setXLNTData] = useState<XLNTDataType>(XLNTInitialData);
  useEffect(() => {
    const starCountRef = ref(realTimeDb, 'XLNT_PLC');
    onValue(starCountRef, snapshot => {
      const data: XLNTDataType = snapshot.val();
      if (data) {
        setXLNTData(data);
      }
    });
  }, []);

  const writeReset = (variable: keyof XLNTDataType) => {
    set(ref(realTimeDb, `XLNT_WEB/${variable}`), true);
    setTimeout(() => {
      set(ref(realTimeDb, `XLNT_WEB/${variable}`), false);
    }, 1000);
  };

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
                    <Fan isActive={XLNTData.Status_Fan} isError={false} />
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
                    isActive={XLNTData.Status_Pump1}
                    isError={XLNTData.Error_Pump1}
                    name="BƠM 1"
                    pipeRightLength={(tankWidth * 20) / 100}
                  />
                </div>
                <div className="z-10 absolute top-full right-[10%] w-[100px] -translate-y-full">
                  <Pump
                    isActive={XLNTData.Status_Pump2}
                    isError={XLNTData.Error_Pump2}
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
                    <Lamp isActive={XLNTData.Status_Buoy} text="ĐẦY" />
                    <Lamp isActive={!XLNTData.Status_Buoy} text="CẠN" />
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
                      <OutputPLC
                        name="T_On_Pump_Min"
                        value={PLC.ReadDInt(XLNTData.T_On_Pump_Min)}
                        unit="Phút"
                      />
                    </td>
                    <td>
                      <OutputPLC
                        name="T_Off_Pump_Min"
                        value={PLC.ReadDInt(XLNTData.T_Off_Pump_Min)}
                        unit="Phút"
                      />
                    </td>
                    <td>
                      <CountDownToggleTime
                        minuteName="T_On_Pump_Current_Min"
                        secondName="T_On_Pump_Current_Sec"
                        tOn={
                          XLNTData.Status_Pump1
                            ? PLC.ReadDInt(XLNTData.T_Left_On_Pump1_Sec)
                            : XLNTData.Status_Pump2
                            ? PLC.ReadDInt(XLNTData.T_Left_On_Pump2_Sec)
                            : 0
                        }
                        tOff={PLC.ReadDInt(XLNTData.T_Left_Off_Pump_Sec)}
                        isTOn={XLNTData.Status_Pump1 || XLNTData.Status_Pump2}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="!text-left">QUẠT HÚT MÙI CAO ÁP</td>
                    <td>
                      <OutputPLC
                        name="T_On_Fan_Min"
                        value={PLC.ReadDInt(XLNTData.T_On_Fan_Min)}
                        unit="Phút"
                      />
                    </td>
                    <td>
                      <OutputPLC
                        name="T_Off_Fan_Min"
                        value={PLC.ReadDInt(XLNTData.T_Off_Fan_Min)}
                        unit="Phút"
                      />
                    </td>
                    <td>
                      <CountDownToggleTime
                        minuteName="T_On_Fan_Current_Min"
                        secondName="T_On_Fan_Current_Sec"
                        tOn={PLC.ReadDInt(XLNTData.T_Left_On_Fan_Sec)}
                        tOff={PLC.ReadDInt(XLNTData.T_Left_Off_Fan_Sec)}
                        isTOn={XLNTData.Status_Fan}
                      />
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
                    <OutputPLC
                      name="T_LIFE_1"
                      value={XLNT_CONSTANTS.lifeTime_Pump1}
                      unit="Giờ"
                    />
                  </td>
                  <td>
                    <OutputPLC
                      name="T_RUN_1"
                      value={Math.floor(
                        PLC.ReadDInt(XLNTData.T_Sum_Pump1_Min) / 60
                      )}
                      unit="Giờ"
                    />
                  </td>
                  <td>
                    <OutputPLC
                      name="T_LEFT_1"
                      value={
                        XLNT_CONSTANTS.lifeTime_Pump1 -
                        Math.floor(PLC.ReadDInt(XLNTData.T_Sum_Pump1_Min) / 60)
                      }
                      unit="Giờ"
                    />
                  </td>
                  <td>
                    <ButtonPrimary
                      onClick={() => writeReset('Reset_T_Sum_Pump1')}
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
                      value={XLNT_CONSTANTS.lifeTime_Pump2}
                      unit="Giờ"
                    />
                  </td>
                  <td>
                    <OutputPLC
                      name="T_RUN_2"
                      value={Math.floor(
                        PLC.ReadDInt(XLNTData.T_Sum_Pump2_Min) / 60
                      )}
                      unit="Giờ"
                    />
                  </td>
                  <td>
                    <OutputPLC
                      name="T_LEFT_2"
                      value={
                        XLNT_CONSTANTS.lifeTime_Pump2 -
                        Math.floor(PLC.ReadDInt(XLNTData.T_Sum_Pump2_Min) / 60)
                      }
                      unit="Giờ"
                    />
                  </td>
                  <td>
                    <ButtonPrimary
                      onClick={() => writeReset('Reset_T_Sum_Pump2')}
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
                      value={XLNT_CONSTANTS.lifeTime_Fan}
                      unit="Giờ"
                    />
                  </td>
                  <td>
                    <OutputPLC
                      name="T_RUN_3"
                      value={Math.floor(
                        PLC.ReadDInt(XLNTData.T_Sum_Fan_Min) / 60
                      )}
                      unit="Giờ"
                    />
                  </td>
                  <td>
                    <OutputPLC
                      name="T_LEFT_3"
                      value={
                        XLNT_CONSTANTS.lifeTime_Fan -
                        Math.floor(PLC.ReadDInt(XLNTData.T_Sum_Fan_Min) / 60)
                      }
                      unit="Giờ"
                    />
                  </td>
                  <td>
                    <ButtonPrimary
                      onClick={() => writeReset('Reset_T_Sum_Fan')}
                    >
                      RESET
                    </ButtonPrimary>
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
