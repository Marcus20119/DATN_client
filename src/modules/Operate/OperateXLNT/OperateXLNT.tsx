import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { ButtonPrimary } from '~/components/Button';
import { Section } from '~/components/Common';
import { TableBase } from '~/components/Table';
import { InputPLC } from '~/components/PLC';
import { YupMethod } from '~/helpers';
import TimeChartPump from './TimeChartPump';
import TimeChartFan from './TimeChartFan';

interface IOperateXLNT {}

const schemaPump = yup.object({
  T1: yup
    .string()
    .required('Không để trống')
    .test('Digits only', 'Chỉ nhận số nguyên', YupMethod.digitsOnly),
  T2: yup
    .string()
    .required('Không để trống')
    .test('Digits only', 'Chỉ nhận số nguyên', YupMethod.digitsOnly),
});
const schemaFan = yup.object({
  T3: yup
    .string()
    .required('Không để trống')
    .test('Digits only', 'Chỉ nhận số nguyên', YupMethod.digitsOnly),
  T4: yup
    .string()
    .required('Không để trống')
    .test('Digits only', 'Chỉ nhận số nguyên', YupMethod.digitsOnly),
});

const OperateXLNT: React.FC<IOperateXLNT> = ({}) => {
  // function writeUserData({ BtnOn1 }: Partial<XLNTDataType>) {
  //   set(ref(realTimeDb, 'XLNT_WEB/BtnOn1'), BtnOn1);
  // }

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
  // Handle submit
  const onSubmitHandlerPump = async (data: any) => {
    // const writeData: Partial<XLNTDataType> = {
    //   BtnOn1: data.BtnOn1 === 'false' ? false : true,
    // };
    // writeUserData(writeData);
    try {
    } catch (err: any) {
      console.log(err);
    }
  };
  const onSubmitHandlerFan = async (data: any) => {
    try {
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
                            name="T1"
                            unit="Phút"
                          />
                          <InputPLC
                            control={controlPump}
                            label="Thời gian dừng (T2)"
                            name="T2"
                            unit="Phút"
                          />
                          <ButtonPrimary
                            type="submit"
                            additionalClass={`h-[42.6px] mt-auto ${
                              errorsPump?.T1 || errorsPump?.T2
                                ? 'mb-[calc(19.2px_+_0.25rem)]'
                                : ''
                            }`}
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
                            name="T3"
                            unit="Phút"
                          />
                          <InputPLC
                            control={controlFan}
                            label="Thời gian dừng (T4)"
                            name="T4"
                            unit="Phút"
                          />
                          <ButtonPrimary
                            type="submit"
                            additionalClass={`h-[42.6px] mt-auto ${
                              errorsFan?.T3 || errorsFan?.T4
                                ? 'mb-[calc(19.2px_+_0.25rem)]'
                                : ''
                            }`}
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
