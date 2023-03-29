import { useDispatch, useSelector } from 'react-redux';
import ModalBase from '~/components/Base/ModalBase';
import { ButtonPrimary } from '~/components/Button';
import { Heading } from '~/components/Heading';
import { handleHideAuthModal, signOut } from '~/store/auth/auth.slice';
import { IRootState } from '~/store/rootReducer';

const ModalSignOutConfirm = () => {
  const dispatch = useDispatch();
  const { showModalSignOutConfirm } = useSelector(
    (state: IRootState) => state.auth
  );

  return (
    <ModalBase
      visible={showModalSignOutConfirm}
      onClose={() => dispatch(handleHideAuthModal())}
    >
      <div
        className={`relative bg-white rounded-2xl z-2 transition-all w-[90vw] max-w-[400px] px-8 py-[24px] text-main-blue`}
      >
        <div className="flex flex-col gap-6 w-full">
          <Heading
            as="h2"
            text="XÁC NHẬN !"
            className="block w-full pb-1 text-4xl font-bold border-b border-b-main-blue"
          />
          <span className="text-xl w-full text-center">
            Bạn muốn đăng xuất khỏi tài khoản này ?
          </span>

          <div className="grid grid-cols-2 gap-3 w-full">
            <ButtonPrimary
              onClick={() => {
                dispatch(signOut());
                dispatch(handleHideAuthModal());
              }}
            >
              Đăng xuất
            </ButtonPrimary>
            <ButtonPrimary
              additionalClass="!bg-gray-300 !text-black"
              onClick={() => dispatch(handleHideAuthModal())}
            >
              Hủy
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </ModalBase>
  );
};

export default ModalSignOutConfirm;
