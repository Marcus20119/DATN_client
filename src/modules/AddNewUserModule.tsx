import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { privateAxios } from '~/axiosConfig';

import { Input, InputTogglePassword, Radio, Switch } from '~/components/Form';
import { MyToast } from '~/utils';
import { BaseModule } from './BaseModule';

interface IAddNewUserModule {
  role: 'ADMIN' | 'MANAGER';
}

const schemaAddNewUser = yup.object({
  user_name: yup.string().required('Không được để trống mục này'),
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
  project_key: yup.string().required('Không được để trống mục này'),
  role_id: yup
    .number()
    .oneOf([0, 1, 2, 3], 'Không được để trống mục này')
    .required('Không được để trống mục này'),
  password: yup
    .string()
    .required('Không được để trống mục này')
    .max(8, 'Yêu cầu 8 ký tự')
    .min(8, 'Yêu cầu 8 ký tự'),
});

const AddNewUserModule: React.FC<IAddNewUserModule> = ({ role }) => {
  const {
    control: controlAddNewUser,
    handleSubmit: handleSubmitAddNewUser,
    formState: {
      isSubmitting: isSubmittingAddNewUser,
      errors: errorsAddNewUser,
    },
    reset: resetAddNewUser,
  } = useForm({
    resolver: yupResolver(schemaAddNewUser),
    mode: 'onSubmit',
  });

  useEffect(() => {
    resetAddNewUser({
      role_id: -1,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [errorSubmitAddNewUser, setErrorSubmitAddNewUser] =
    useState<string>('');
  const onSubmitAddNewUserHandler = async (data: any) => {
    setErrorSubmitAddNewUser('');
    try {
      switch (role) {
        case 'ADMIN': {
          await privateAxios.request({
            method: 'POST',
            url: '/p/add-new-user',
            data,
          });
          break;
        }
        case 'MANAGER': {
          await privateAxios.request({
            method: 'POST',
            url: '/p/add-new-user',
            data,
          });
          break;
        }

        default:
          break;
      }
      MyToast.success('Thêm người dùng thành công !');
      resetAddNewUser();
    } catch (err: any) {
      console.log(err);
      setErrorSubmitAddNewUser(err?.response?.data?.message);
    }
  };
  return (
    <BaseModule
      handleSubmit={handleSubmitAddNewUser}
      onSubmitHandler={onSubmitAddNewUserHandler}
      errors={errorsAddNewUser}
      errorSubmit={errorSubmitAddNewUser}
      isSubmitting={isSubmittingAddNewUser}
      title=""
      buttonSubmitLabel="Thêm người dùng"
    >
      <Input
        control={controlAddNewUser}
        name="user_name"
        label="Tên người dùng *"
        direction="horizontal"
      ></Input>
      <Input
        control={controlAddNewUser}
        name="email"
        type="email"
        label="Email *"
        direction="horizontal"
      ></Input>
      <InputTogglePassword
        control={controlAddNewUser}
        name="password"
        label="Mật khẩu *"
        direction="horizontal"
      ></InputTogglePassword>

      <Radio
        control={controlAddNewUser}
        name="gender"
        label="Giới tính "
        radios={[
          { name: 'Nam', value: 0 },
          { name: 'Nữ', value: 1 },
        ]}
        direction="horizontal"
      />
      <Input
        control={controlAddNewUser}
        name="phone_number"
        label="Số điện thoại"
        direction="horizontal"
      ></Input>
      <Input
        control={controlAddNewUser}
        name="project_key"
        label="Mã dự án *"
        direction="horizontal"
      ></Input>
      <Radio
        control={controlAddNewUser}
        name="role_id"
        label="Quyền hạng *"
        radios={
          role === 'ADMIN'
            ? [
                { name: 'Basic Client', value: 0 },
                { name: 'Operator', value: 1 },
                { name: 'Manager', value: 2 },
                { name: 'Admin', value: 3 },
              ]
            : [
                { name: 'Basic Client', value: 0 },
                { name: 'Engineer', value: 1 },
              ]
        }
        direction="horizontal"
      />
      <Switch
        control={controlAddNewUser}
        name="is_activated"
        label="Activate"
        direction="horizontal"
      />
    </BaseModule>
  );
};

export { AddNewUserModule };
