import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { onValue, ref, set } from 'firebase/database';
import { useEffect, useState } from 'react';

import { ButtonPrimary } from '~/components/Button';
import { Section } from '~/components/Common';
import { TableBase } from '~/components/Table';
import { InputPLC } from '~/components/PLC';
import { PLC, YupMethod } from '~/helpers';
import TimeChartPump from './TimeChartPump';
import TimeChartFan from './TimeChartFan';
import { XLNTDataType, XLNTInitialData } from '~/types';
import { realTimeDb } from '~/firebase/firebase-config';
import { delay } from '~/utils';

interface IOperateXLNT {}

const schemaPump = yup.object({
  T_On_Pump_Min: yup
    .string()
    .required('Không để trống')
    .test('Digits only', 'Chỉ nhận số nguyên', YupMethod.digitsOnly),
  T_Off_Pump_Min: yup
    .string()
    .required('Không để trống')
    .test('Digits only', 'Chỉ nhận số nguyên', YupMethod.digitsOnly),
});
const schemaFan = yup.object({
  T_On_Fan_Min: yup
    .string()
    .required('Không để trống')
    .test('Digits only', 'Chỉ nhận số nguyên', YupMethod.digitsOnly),
  T_Off_Fan_Min: yup
    .string()
    .required('Không để trống')
    .test('Digits only', 'Chỉ nhận số nguyên', YupMethod.digitsOnly),
});

const OperateXLNT: React.FC<IOperateXLNT> = ({}) => {
  const [XLNTDataOnPump, setXLNTDataOnPump] = useState<any>([0, 0]);
  const [XLNTDataOffPump, setXLNTDataOffPump] = useState<any>([0, 0]);
  const [XLNTDataOnFan, setXLNTDataOnFan] = useState<any>([0, 0]);
  const [XLNTDataOffFan, setXLNTDataOffFan] = useState<any>([0, 0]);
  useEffect(() => {
    onValue(ref(realTimeDb, 'XLNT_PLC/T_On_Pump_Min'), snapshot => {
      const data: XLNTDataType = snapshot.val();
      if (data) {
        setXLNTDataOnPump(data);
      }
    });
    onValue(ref(realTimeDb, 'XLNT_PLC/T_Off_Pump_Min'), snapshot => {
      const data: XLNTDataType = snapshot.val();
      if (data) {
        setXLNTDataOffPump(data);
      }
    });
    onValue(ref(realTimeDb, 'XLNT_PLC/T_On_Fan_Min'), snapshot => {
      const data: XLNTDataType = snapshot.val();
      if (data) {
        setXLNTDataOnFan(data);
      }
    });
    onValue(ref(realTimeDb, 'XLNT_PLC/T_Off_Fan_Min'), snapshot => {
      const data: XLNTDataType = snapshot.val();
      if (data) {
        setXLNTDataOffFan(data);
      }
    });
  }, []);

  const {
    control: controlPump,
    handleSubmit: handleSubmitPump,
    formState: { isSubmitting: isSubmittingPump, errors: errorsPump },
    reset: resetPump,
  } = useForm({
    resolver: yupResolver(schemaPump),
    mode: 'all',
  });
  const {
    control: controlFan,
    handleSubmit: handleSubmitFan,
    formState: { isSubmitting: isSubmittingFan, errors: errorsFan },
    reset: resetFan,
  } = useForm({
    resolver: yupResolver(schemaFan),
    mode: 'all',
  });

  const writeData = (variable: keyof XLNTDataType, data: any) => {
    set(ref(realTimeDb, `XLNT_WEB/${variable}`), data);
  };
  useEffect(() => {
    resetPump({
      T_On_Pump_Min: PLC.ReadDInt(XLNTDataOnPump),
      T_Off_Pump_Min: PLC.ReadDInt(XLNTDataOffPump),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [XLNTDataOnPump, XLNTDataOffPump]);
  useEffect(() => {
    resetFan({
      T_On_Fan_Min: PLC.ReadDInt(XLNTDataOnFan),
      T_Off_Fan_Min: PLC.ReadDInt(XLNTDataOffFan),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [XLNTDataOnFan, XLNTDataOffFan]);
  // Handle submit
  const onSubmitHandlerPump = async (data: any) => {
    try {
      writeData('T_On_Pump_Min', PLC.WriteDInt(data.T_On_Pump_Min));
      await delay(1000);
      writeData('T_Off_Pump_Min', PLC.WriteDInt(data.T_Off_Pump_Min));
      resetPump({
        T_On_Pump_Min: data.T_On_Pump_Min,
        T_Off_Pump_Min: data.T_Off_Pump_Min,
      });
    } catch (err: any) {
      console.log(err);
    }
  };
  const onSubmitHandlerFan = async (data: any) => {
    console.log('data:', data);
    try {
      writeData('T_On_Fan_Min', PLC.WriteDInt(data.T_On_Fan_Min));
      await delay(1000);
      writeData('T_Off_Fan_Min', PLC.WriteDInt(data.T_Off_Fan_Min));
      resetFan({
        T_On_Fan_Min: data.T_On_Fan_Min,
        T_Off_Fan_Min: data.T_Off_Fan_Min,
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
      <Section sectionTitle="MÀN HÌNH ĐIỀU KHIỂN">
        <div className="w-full bg-main-blue/5 mt-2 p-5 border-2 border-main-blue-80/80 rounded-md">
          <div className="flex flex-col gap-16 w-full h-full">
            <div className="flex-1 relative flex gap-12 w-full">
              <div className="relative w-1/2 h-[100%]">
                <TimeChartPump />
              </div>
              <div className="relative w-1/2 h-[100%]">
                <TimeChartFan />
              </div>
            </div>
            <div className="w-full h-fit mb-2">
              <TableBase type="PLC">
                <thead>
                  <tr>
                    <th className="w-[320px]">THIẾT BỊ</th>
                    <th className="">CÀI ĐẶT THÔNG SỐ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="!text-left">BƠM BỂ ĐIỀU HÒA</td>
                    <td>
                      <form
                        onSubmit={handleSubmitPump(onSubmitHandlerPump)}
                        className="flex flex-col gap-4 w-full"
                        // autoComplete="off"
                        noValidate
                      >
                        <div className="grid grid-cols-3 gap-3 w-full">
                          <InputPLC
                            control={controlPump}
                            label="Thời gian chạy (T1)"
                            name="T_On_Pump_Min"
                            unit="Phút"
                          />
                          <InputPLC
                            control={controlPump}
                            label="Thời gian dừng (T2)"
                            name="T_Off_Pump_Min"
                            unit="Phút"
                          />
                          <ButtonPrimary
                            type="submit"
                            additionalClass={`h-[42.6px] mt-auto ${
                              errorsPump?.T_On_Pump_Min ||
                              errorsPump?.T_Off_Pump_Min
                                ? 'mb-[calc(19.2px_+_0.25rem)]'
                                : ''
                            }`}
                            isSubmitting={isSubmittingPump}
                          >
                            Cập nhật dữ liệu
                          </ButtonPrimary>
                        </div>
                      </form>
                    </td>
                  </tr>
                  <tr>
                    <td className="!text-left">QUẠT HÚT MÙI CAO ÁP</td>
                    <td>
                      <form
                        onSubmit={handleSubmitFan(onSubmitHandlerFan)}
                        className="flex flex-col gap-4 w-full"
                        // autoComplete="off"
                        noValidate
                      >
                        <div className="grid grid-cols-3 gap-3 w-full">
                          <InputPLC
                            control={controlFan}
                            label="Thời gian chạy (T3)"
                            name="T_On_Fan_Min"
                            unit="Phút"
                          />
                          <InputPLC
                            control={controlFan}
                            label="Thời gian dừng (T4)"
                            name="T_Off_Fan_Min"
                            unit="Phút"
                          />
                          <ButtonPrimary
                            type="submit"
                            additionalClass={`h-[42.6px] mt-auto ${
                              errorsFan?.T_On_Fan_Min ||
                              errorsFan?.T_Off_Fan_Min
                                ? 'mb-[calc(19.2px_+_0.25rem)]'
                                : ''
                            }`}
                            isSubmitting={isSubmittingFan}
                          >
                            Cập nhật dữ liệu
                          </ButtonPrimary>
                        </div>
                      </form>
                    </td>
                  </tr>
                </tbody>
              </TableBase>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export { OperateXLNT };
