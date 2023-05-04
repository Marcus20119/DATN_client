import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { privateAxios } from '~/axiosConfig';

import { InputTogglePassword } from '~/components/Form';
import { MyToast } from '~/utils';
import { BaseModule } from './BaseModule';

interface IEditUserPasswordModule {
  role: 'ADMIN' | 'MANAGER' | 'SELF';
  id: string;
}

const schemaPassword = yup.object({
  new_password: yup
    .string()
    .max(8, 'Yêu cầu 8 ký tự')
    .min(8, 'Yêu cầu 8 ký tự')
    .required('Không được để trống mục này'),
});
const schemaPasswordSelf = yup.object({
  old_password: yup.string().required('Không được để trống mục này'),
  new_password: yup
    .string()
    .max(8, 'Yêu cầu 8 ký tự')
    .min(8, 'Yêu cầu 8 ký tự')
    .required('Không được để trống mục này'),
});

const EditUserPasswordModule: React.FC<IEditUserPasswordModule> = ({
  role,
  id,
}) => {
  const {
    control: controlPassword,
    handleSubmit: handleSubmitPassword,
    formState: { isSubmitting: isSubmittingPassword, errors: errorsPassword },
    reset: resetPassword,
  } = useForm({
    resolver: yupResolver(
      role === 'SELF' ? schemaPasswordSelf : schemaPassword
    ),
    mode: 'onSubmit',
  });

  const [errorSubmitPassword, setErrorSubmitPassword] = useState<string>('');

  const onSubmitPasswordHandler = async (data: any) => {
    setErrorSubmitPassword('');
    try {
      switch (role) {
        case 'ADMIN':
        case 'MANAGER': {
          await privateAxios.request({
            method: 'PATCH',
            url: '/u/advanced/user/change-password/' + id,
            data,
          });
          break;
        }
        case 'SELF': {
          await privateAxios.request({
            method: 'PATCH',
            url: '/u/self/user/change-password/' + id,
            data,
          });
          break;
        }
        default:
          break;
      }
      MyToast.success('Đổi mật khẩu thành công !');
    } catch (err: any) {
      console.log(err);
      setErrorSubmitPassword(err?.response?.data?.message);
    } finally {
      resetPassword({ new_password: '' });
    }
  };
  return (
    <BaseModule
      handleSubmit={handleSubmitPassword}
      onSubmitHandler={onSubmitPasswordHandler}
      errors={errorsPassword}
      errorSubmit={errorSubmitPassword}
      isSubmitting={isSubmittingPassword}
      title="Đổi mật khẩu"
      buttonSubmitLabel="Đổi mật khẩu"
    >
      {role === 'SELF' && (
        <InputTogglePassword
          control={controlPassword}
          name="old_password"
          label="Mật khẩu cũ *"
          direction="horizontal"
        ></InputTogglePassword>
      )}
      <InputTogglePassword
        control={controlPassword}
        name="new_password"
        label="Mật khẩu mới *"
        direction="horizontal"
      ></InputTogglePassword>
    </BaseModule>
  );
};

export { EditUserPasswordModule };
