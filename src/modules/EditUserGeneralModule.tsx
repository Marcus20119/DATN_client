import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { privateAxios } from '~/axiosConfig';

import { Input, Radio } from '~/components/Form';
import { forceRefetchThisUserData } from '~/store/auth/auth.slice';
import { IRootState } from '~/store/rootReducer';
import { UserDataType } from '~/store/rootType';
import { MyToast } from '~/utils';
import EditBaseModule from './EditBaseModule';

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
  const dispatch = useDispatch();
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
          dispatch(forceRefetchThisUserData());
          break;
        }
        default:
          break;
      }
      MyToast.success('Cập nhật thông tin thành công !');
    } catch (err: any) {
      console.log(err);
      setErrorSubmitGeneral(err?.response?.data?.message);
    }
  };
  return (
    <EditBaseModule
      handleSubmit={handleSubmitGeneral}
      onSubmitHandler={onSubmitGeneralHandler}
      errors={errorsGeneral}
      errorSubmit={errorSubmitGeneral}
      isSubmitting={isSubmittingGeneral}
      title="Thông tin chung"
    >
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
    </EditBaseModule>
  );
};

export { EditUserGeneralModule };
