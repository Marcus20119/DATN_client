import { ref, set } from 'firebase/database';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { ButtonPrimary } from '~/components/Button';
import { Input } from '~/components/Form';
import { Heading } from '~/components/Heading';
import { realTimeDb } from '~/firebase/firebase-config';
import { TestDataType } from '~/types';

type IWriteData = {};

const digitsOnly = (value: string) => /^\d+$/.test(value);

const schema = yup.object({
  tagBool: yup
    .string()
    .required('Không để trống')
    .oneOf(['true', 'false'], 'Chỉ nhận "true" hoặc "false'),
  tagByte: yup
    .string()
    .required('Không để trống')
    .test('Digits only', 'Chỉ nhận số', digitsOnly),
  tagInteger: yup
    .string()
    .required('Không để trống')
    .test('Digits only', 'Chỉ nhận số', digitsOnly),
  tagReal: yup
    .string()
    .required('Không để trống')
    .test('Digits only', 'Chỉ nhận số', digitsOnly),
  tagString: yup.string().required('Không để trống'),
});

const WriteData: React.FC<IWriteData> = () => {
  function writeUserData({
    tagBool,
    tagByte,
    tagInteger,
    tagReal,
    tagString,
  }: TestDataType) {
    set(ref(realTimeDb, 'XLNT_WEB'), {
      tagBool,
      tagByte,
      tagInteger,
      tagReal,
      tagString,
    });
  }

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
  const onSubmitHandler = async (data: any) => {
    const writeData: TestDataType = {
      tagBool: data.tagBool === 'false' ? false : true,
      tagByte: parseInt(data.tagByte),
      tagInteger: parseInt(data.tagInteger),
      tagReal: parseInt(data.tagReal),
      tagString: data.tagString,
    };
    writeUserData(writeData);
    try {
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <div>
      <Heading
        as="h2"
        text="GHI DỮ LIỆU"
        className="font-bold text-main-blue text-2xl mb-3"
      />
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-4 w-full"
        // autoComplete="off"
        noValidate
      >
        <div className="flex gap-3 w-full">
          <Input
            control={control}
            placeholder=""
            label="Tag Bool"
            name="tagBool"
          ></Input>
          <Input
            control={control}
            placeholder=""
            label="Tag Byte"
            name="tagByte"
          ></Input>
          <Input
            control={control}
            placeholder=""
            label="Tag Integer"
            name="tagInteger"
          ></Input>
          <Input
            control={control}
            placeholder=""
            label="Tag Real"
            name="tagReal"
          ></Input>
          <Input
            control={control}
            placeholder=""
            label="Tag String"
            name="tagString"
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
