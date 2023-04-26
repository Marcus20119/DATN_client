import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { privateAxios } from '~/axiosConfig';

import { ButtonPrimary } from '~/components/Button';
import { Error, InputTogglePassword } from '~/components/Form';
import { Heading } from '~/components/Heading';
import { onErrorsHandler } from '~/helpers';

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
    } catch (err: any) {
      console.log(err);
      setErrorSubmitPassword(err?.response?.data?.message);
    } finally {
      resetPassword({ new_password: '' });
    }
  };
  return (
    <form
      onSubmit={handleSubmitPassword(onSubmitPasswordHandler, () =>
        onErrorsHandler(errorsPassword)
      )}
      className="flex flex-col gap-4"
      // autoComplete="off"
      noValidate
    >
      <div className="flex justify-between items-end border-b border-b-main-blue/50 mb-2">
        <Heading as="h2" text="Đổi mật khẩu" className="!text-lg !w-fit" />
        <Error errorMessage={errorSubmitPassword} className="mb-1" />
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-4 w-[65%]">
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
        </div>
        <div className="w-[180px]">
          <ButtonPrimary
            type="submit"
            isSubmitting={isSubmittingPassword}
            additionalClass="!bg-main-blue !text-white"
          >
            Đổi mật khẩu
          </ButtonPrimary>
        </div>
      </div>
    </form>
  );
};

export { EditUserPasswordModule };
