import { FieldValues, UseFormRegister } from 'react-hook-form';
import * as yup from 'yup';
import {
  Input,
  InputDate,
  InputFile,
  InputHelp,
  Radio,
} from '~/components/Form';
import { Checkbox } from '~/components/Form/Checkbox';

interface IStaffModule {
  control: any;
  register: UseFormRegister<FieldValues>;
}

export const schemaStaff = yup.object({
  full_name: yup.string().required('Không được để trống mục này'),
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Không được để trống mục này'),
  phone_number: yup
    .string()
    .matches(/^0[0-9]{9}$/, 'Số điện thoại không hợp lệ')
    .notRequired()
    .nullable()
    .transform(value => (!!value ? value : null)),
  exp: yup
    .string()
    .matches(/^\d+$/, 'Số năm kinh nghiệm không hợp lệ')
    .notRequired()
    .nullable()
    .transform(value => (!!value ? value : null)),
});

const StaffModule: React.FC<IStaffModule> = ({ control, register }) => {
  return (
    <>
      <Input
        control={control}
        name="full_name"
        label="Họ và tên *"
        direction="horizontal"
      ></Input>
      <InputFile
        control={control}
        register={register}
        name="avatar"
        label="Ảnh 3x4"
        direction="horizontal"
      ></InputFile>
      <Radio
        control={control}
        name="gender"
        label="Giới tính "
        radios={[
          { name: 'Nam', value: 0 },
          { name: 'Nữ', value: 1 },
        ]}
        direction="horizontal"
      />
      <InputDate
        control={control}
        name="day_of_birth"
        label="Năm sinh"
        placeholder="Date and Time"
        direction="horizontal"
      ></InputDate>
      <Input
        control={control}
        name="hometown"
        label="Quê quán"
        direction="horizontal"
      ></Input>
      <Input
        control={control}
        name="work_unit"
        label="Đơn vị công tác"
        direction="horizontal"
      ></Input>
      <Input
        control={control}
        name="major"
        label="Chuyên ngành"
        direction="horizontal"
      ></Input>
      <Input
        control={control}
        name="degree"
        label="Học vị"
        direction="horizontal"
      ></Input>
      <InputHelp
        control={control}
        name="exp"
        label="Kinh nghiệm"
        direction="horizontal"
        helpMessage="Số năm kinh nghiệm của nhân viên"
      ></InputHelp>
      <Checkbox
        control={control}
        name="languages"
        label="Ngoại ngữ"
        checkboxes={[
          { label: 'Anh', value: 'english' },
          { label: 'Pháp', value: 'france' },
          { label: 'Nhật', value: 'japanese' },
          { label: 'Nga', value: 'russian' },
        ]}
        direction="horizontal"
      />
      <Input
        control={control}
        name="address"
        label="Địa chỉ"
        direction="horizontal"
      ></Input>
      <Input
        control={control}
        name="email"
        type="email"
        label="Email *"
        direction="horizontal"
      ></Input>

      <Input
        control={control}
        name="phone_number"
        label="Số điện thoại"
        direction="horizontal"
      ></Input>
    </>
  );
};

export { StaffModule };
