import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import { Error, Input, InputTogglePassword } from '~/components/Form';
import { Heading } from '~/components/Heading';
import { IRootState } from '~/store/rootReducer';
import { ButtonPrimary } from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import { actionSignIn } from '~/store/auth/auth.action';

type ISignInPage = {};

const schema = yup.object({
  password: yup.string().required('Không được để trống mục này'),
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Không được để trống mục này'),
});

const SignInPage: React.FC<ISignInPage> = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { loadingSignIn, messageSignInError } = useSelector(
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
    dispatch(actionSignIn({ data, onSuccess: () => {} }));
    try {
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <Heading
        as="h2"
        text="ĐĂNG NHẬP"
        className="border-b border-b-main-blue"
      />
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-3 w-full"
        // autoComplete="off"
        noValidate
      >
        <div className="flex flex-col gap-4 w-full">
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
          <span className="">Bạn chưa có tài khoản?</span>
          <span
            className="text-emerald-600 cursor-pointer opacity-100 hover:!opacity-80 font-bold tracking-wide underline underline-offset-1"
            onClick={() => {
              navigateTo('/auth/sign-up');
            }}
          >
            Đăng ký
          </span>
        </div>

        <Error errorMessage={messageSignInError} />
        <ButtonPrimary
          type="submit"
          isSubmitting={loadingSignIn}
          additionalClass="!bg-main-blue !text-white"
        >
          Đăng Nhập
        </ButtonPrimary>
      </form>
    </div>
  );
};

export default SignInPage;
