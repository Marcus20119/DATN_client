import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { privateAxios } from '~/axiosConfig';

import { ButtonPrimary } from '~/components/Button';
import { Error, Input, Radio } from '~/components/Form';
import { Heading } from '~/components/Heading';
import { onErrorsHandler } from '~/helpers';
import { IRootState } from '~/store/rootReducer';
import { UserDataType } from '~/store/rootType';

interface IEditUserGeneralModule {
  role: 'ADMIN' | 'MANAGER' | 'SELF';
  thisUserData: UserDataType;
  id: string;
}

const schemaGeneral = yup.object({
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
});

const EditUserGeneralModule: React.FC<IEditUserGeneralModule> = ({
  role,
  thisUserData,
  id,
}) => {
  const { userData } = useSelector((state: IRootState) => state.auth);
  const {
    control: controlGeneral,
    handleSubmit: handleSubmitGeneral,
    formState: { isSubmitting: isSubmittingGeneral, errors: errorsGeneral },
    reset: resetGeneral,
  } = useForm({
    resolver: yupResolver(schemaGeneral),
    mode: 'onSubmit',
  });
  useEffect(() => {
    resetGeneral({
      user_name: thisUserData?.user_name,
      email: thisUserData?.email,
      phone_number: thisUserData?.phone_number,
      gender: thisUserData?.gender,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thisUserData]);
  const [errorSubmitGeneral, setErrorSubmitGeneral] = useState<string>('');
  const onSubmitGeneralHandler = async (data: any) => {
    setErrorSubmitGeneral('');
    try {
      switch (role) {
        case 'ADMIN': {
          await privateAxios.request({
            method: 'PATCH',
            url: '/u/3/user/edit/' + id,
            data,
          });
          break;
        }
        case 'MANAGER': {
          await privateAxios.request({
            method: 'PATCH',
            url: '/u/2/user/edit/' + id,
            data,
          });
          break;
        }
        case 'SELF': {
          await privateAxios.request({
            method: 'PATCH',
            url: `/u/${userData.role_id}/user/edit/` + id,
            data,
          });
          break;
        }
        default:
          break;
      }
    } catch (err: any) {
      console.log(err);
      setErrorSubmitGeneral(err?.response?.data?.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmitGeneral(onSubmitGeneralHandler, () =>
        onErrorsHandler(errorsGeneral)
      )}
      className="flex flex-col gap-4"
      // autoComplete="off"
      noValidate
    >
      <div className="flex justify-between items-end border-b border-b-main-blue/50 mb-2">
        <Heading as="h2" text="Thông tin chung" className="!text-lg !w-fit" />
        <Error errorMessage={errorSubmitGeneral} className="mb-1" />
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-4 w-[65%]">
          <Input
            control={controlGeneral}
            name="user_name"
            label="Tên người dùng *"
            direction="horizontal"
          ></Input>
          <Input
            control={controlGeneral}
            name="email"
            type="email"
            label="Email *"
            direction="horizontal"
          ></Input>
          <Input
            control={controlGeneral}
            name="phone_number"
            label="Số điện thoại"
            direction="horizontal"
          ></Input>
          <Radio
            control={controlGeneral}
            name="gender"
            label="Giới tính "
            radios={[
              { name: 'Nam', value: 0 },
              { name: 'Nữ', value: 1 },
            ]}
            direction="horizontal"
          />
        </div>
        <div className="w-[180px]">
          <ButtonPrimary
            type="submit"
            isSubmitting={isSubmittingGeneral}
            additionalClass="!bg-main-blue !text-white"
          >
            Cập Nhật
          </ButtonPrimary>
        </div>
      </div>
    </form>
  );
};

export { EditUserGeneralModule };
