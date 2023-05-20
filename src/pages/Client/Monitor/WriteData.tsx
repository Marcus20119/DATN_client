import { ref, set } from 'firebase/database';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { ButtonPrimary } from '~/components/Button';
import { Input } from '~/components/Form';
import { Heading } from '~/components/Heading';
import { realTimeDb } from '~/firebase/firebase-config';
import { XLNTDataType } from '~/types';

type IWriteData = {};

const digitsOnly = (value: string) => /^\d+$/.test(value);

const schema = yup.object({
  // tagBool: yup
  //   .string()
  //   .required('Không để trống')
  //   .oneOf(['true', 'false'], 'Chỉ nhận "true" hoặc "false'),
  // tagByte: yup
  //   .string()
  //   .required('Không để trống')
  //   .test('Digits only', 'Chỉ nhận số', digitsOnly),
  // tagInteger: yup
  //   .string()
  //   .required('Không để trống')
  //   .test('Digits only', 'Chỉ nhận số', digitsOnly),
  // tagReal: yup
  //   .string()
  //   .required('Không để trống')
  //   .test('Digits only', 'Chỉ nhận số', digitsOnly),
  // tagString: yup.string().required('Không để trống'),
  BtnOn1: yup
    .string()
    .required('Không để trống')
    .oneOf(['true', 'false'], 'Chỉ nhận "true" hoặc "false'),
});

const WriteData: React.FC<IWriteData> = () => {
  // function writeUserData({ BtnOn1 }: Partial<XLNTDataType>) {
  //   set(ref(realTimeDb, 'XLNT_WEB/BtnOn1'), BtnOn1);
  // }

  const {
    control,
    handleSubmit,
    // formState: { isSubmitting },
    // reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });
  // Handle submit
  // const onSubmitHandler = async (data: any) => {
  //   const writeData: Partial<XLNTDataType> = {
  //     BtnOn1: data.BtnOn1 === 'false' ? false : true,
  //   };
  //   writeUserData(writeData);
  //   try {
  //   } catch (err: any) {
  //     console.log(err);
  //   }
  // };
  return (
    <div>
      <Heading
        as="h2"
        text="GHI DỮ LIỆU"
        className="font-bold text-main-blue text-2xl mb-3"
      />
      <form
        // onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-4 w-full"
        // autoComplete="off"
        noValidate
      >
        <div className="flex gap-3 w-full">
          <Input
            control={control}
            placeholder=""
            label="BtnOn1"
            name="BtnOn1"
          ></Input>
        </div>

        <ButtonPrimary type="submit" additionalClass="w-[200px] h-[42.6px]">
          Set Data
        </ButtonPrimary>
      </form>
    </div>
  );
};

export default WriteData;
