import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { onValue, ref, update } from 'firebase/database';
import { useEffect, useState } from 'react';

import { ButtonPrimary } from '~/components/Button';
import { Section } from '~/components/Common';
import { TableBase } from '~/components/Table';
import { InputPLC } from '~/components/PLC';
import { PLC, YupMethod } from '~/helpers';
import TimeChartPump from './TimeChartPump';
import TimeChartFan from './TimeChartFan';
import { XLNTDataType } from '~/types';
import { realTimeDb } from '~/firebase/firebase-config';
import DisconnectionScreen from '~/components/PLC/DisconnectionScreen';
import { useLoadingDelay } from '~/hooks';
import { useResponsive } from '~/hooks/useResponsive';

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
  const isLoading = useLoadingDelay(500);
  const {
    control: controlPump,
    handleSubmit: handleSubmitPump,
    formState: { isSubmitting: isSubmittingPump, errors: errorsPump },
    reset: resetPump,
    watch: watchPump,
  } = useForm({
    resolver: yupResolver(schemaPump),
    mode: 'all',
  });
  const {
    control: controlFan,
    handleSubmit: handleSubmitFan,
    formState: { isSubmitting: isSubmittingFan, errors: errorsFan },
    reset: resetFan,
    watch: watchFan,
  } = useForm({
    resolver: yupResolver(schemaFan),
    mode: 'all',
  });

  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    onValue(ref(realTimeDb, 'XLNT_PLC/T_On_Pump_Min'), snapshot => {
      const data: XLNTDataType = snapshot.val();
      if (data) {
        if (Array.isArray(data) && data[0] === 'BAD 255') {
          setIsConnected(false);
        } else {
          setIsConnected(true);
        }
        resetPump({
          ...watchPump(),
          T_On_Pump_Min: PLC.ReadDInt(data as any),
        });
      }
    });
    onValue(ref(realTimeDb, 'XLNT_PLC/T_Off_Pump_Min'), snapshot => {
      const data: XLNTDataType = snapshot.val();
      if (data) {
        resetPump({
          ...watchPump(),
          T_Off_Pump_Min: PLC.ReadDInt(data as any),
        });
      }
    });
    onValue(ref(realTimeDb, 'XLNT_PLC/T_On_Fan_Min'), snapshot => {
      const data: XLNTDataType = snapshot.val();
      if (data) {
        resetFan({ ...watchFan(), T_On_Fan_Min: PLC.ReadDInt(data as any) });
      }
    });
    onValue(ref(realTimeDb, 'XLNT_PLC/T_Off_Fan_Min'), snapshot => {
      const data: XLNTDataType = snapshot.val();
      if (data) {
        resetFan({ ...watchFan(), T_Off_Fan_Min: PLC.ReadDInt(data as any) });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle submit
  const onSubmitHandlerPump = async (data: any) => {
    try {
      const updates: any = {};
      updates['/XLNT_WEB/T_On_Pump_Min'] = PLC.WriteDInt(data.T_On_Pump_Min);
      updates['/XLNT_WEB/T_Off_Pump_Min'] = PLC.WriteDInt(data.T_Off_Pump_Min);
      await update(ref(realTimeDb), updates);
      resetPump({
        T_On_Pump_Min: data.T_On_Pump_Min,
        T_Off_Pump_Min: data.T_Off_Pump_Min,
      });
    } catch (err: any) {
      console.log(err);
    }
  };
  const onSubmitHandlerFan = async (data: any) => {
    try {
      const updates: any = {};
      updates['/XLNT_WEB/T_On_Fan_Min'] = PLC.WriteDInt(data.T_On_Fan_Min);
      updates['/XLNT_WEB/T_Off_Fan_Min'] = PLC.WriteDInt(data.T_Off_Fan_Min);
      await update(ref(realTimeDb), updates);
      resetFan({
        T_On_Fan_Min: data.T_On_Fan_Min,
        T_Off_Fan_Min: data.T_Off_Fan_Min,
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  const { isMobile } = useResponsive();
  return (
    <>
      <Section sectionTitle="MÀN HÌNH ĐIỀU KHIỂN" isLoading={isLoading}>
        {!isLoading && (
          <div className="relative overflow-hidden w-full bg-main-blue/5 mt-2 p-5 border-2 border-main-blue-80/80 rounded-md">
            <div className="flex flex-col gap-16 w-full h-full">
              <div
                className={`flex-1 relative grid  w-full ${
                  isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-12'
                }`}
              >
                <div className="relative h-[100%]">
                  <TimeChartPump />
                </div>
                <div className="relative h-[100%]">
                  <TimeChartFan />
                </div>
              </div>
              <div className="w-full h-fit mb-2">
                <TableBase type="PLC">
                  <thead>
                    <tr>
                      <th className={isMobile ? 'w-[90px]' : 'w-[320px]'}>
                        THIẾT BỊ
                      </th>
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
                          <div
                            className={`grid ${
                              isMobile ? 'grid-cols-1' : 'grid-cols-3'
                            } gap-3 w-full`}
                          >
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
                          <div
                            className={`grid ${
                              isMobile ? 'grid-cols-1' : 'grid-cols-3'
                            } gap-3 w-full`}
                          >
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
            {!isConnected && <DisconnectionScreen />}
          </div>
        )}
      </Section>
    </>
  );
};

export { OperateXLNT };
