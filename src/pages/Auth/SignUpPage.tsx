import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import {
  Error,
  Input,
  InputHelp,
  InputTogglePassword,
} from '~/components/Form';
import { Heading } from '~/components/Heading';
import { IRootState } from '~/store/rootReducer';
import { ButtonPrimary } from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import { actionSignUp } from '~/store/auth/auth.action';

type ISignUpPage = {};

const schema = yup.object({
  user_name: yup.string().required('Không được để trống mục này'),
  project_key: yup.string().required('Không được để trống mục này'),
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Không được để trống mục này'),
  password: yup
    .string()
    .max(8, 'Yêu cầu 8 ký tự')
    .min(8, 'Yêu cầu 8 ký tự')
    .required('Không được để trống mục này'),
});

const SignUpPage: React.FC<ISignUpPage> = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { loadingSignUp, messageSignUpError } = useSelector(
    (state: IRootState) => state.auth
  );

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
    try {
      dispatch(
        actionSignUp({
          data,
          onSuccess: () => {
            navigateTo('/auth/sign-in');
          },
        })
      );
      if (!messageSignUpError) {
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <Heading as="h2" text="ĐĂNG KÝ" className="border-b border-b-main-blue" />
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-3 w-full"
        // autoComplete="off"
        noValidate
      >
        <div className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-2 gap-4 w-full">
            <Input
              control={control}
              name="user_name"
              placeholder="Nhật Tri"
              label="Tên người dùng *"
            ></Input>
            <InputHelp
              control={control}
              name="project_key"
              placeholder="FKOT"
              label="Mã dự án *"
              helpMessage="Liên hệ Nhật Tri Automation để lấy mã dự án (gồm 4 ký tự)"
            ></InputHelp>
          </div>
          <Input
            control={control}
            name="email"
            type="email"
            placeholder="example@gmail.com"
            label="Email *"
          ></Input>
          <InputTogglePassword
            control={control}
            name="password"
            placeholder="********"
            label="Mật khẩu *"
          ></InputTogglePassword>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="">Bạn đã có tài khoản?</span>
          <span
            className="text-emerald-600 cursor-pointer opacity-100 hover:!opacity-80 font-bold tracking-wide underline underline-offset-1"
            onClick={() => {
              navigateTo('/auth/sign-in');
            }}
          >
            Đăng nhập
          </span>
        </div>

        <Error errorMessage={messageSignUpError} />
        <ButtonPrimary
          type="submit"
          isSubmitting={loadingSignUp}
          additionalClass="!bg-main-blue !text-white"
        >
          Đăng Ký
        </ButtonPrimary>
      </form>
    </div>
  );
};

export default SignUpPage;
