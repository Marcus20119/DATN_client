import { Menu } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { handleShowBaseConfirmModal } from '~/store/base/base.slice';
import { buttonClassName, menuColors } from './common';

interface IItemSignOut {}

const ItemSignOut: React.FC<IItemSignOut> = () => {
  const dispatch = useDispatch();
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={buttonClassName(active)}
          style={{
            backgroundColor: active ? menuColors.fillActive : '',
          }}
          onClick={() =>
            dispatch(
              handleShowBaseConfirmModal({
                title: 'XÁC NHẬN !',
                description: 'Bạn muốn đăng xuất khỏi tài khoản này ?',
                confirmButtonLabel: 'Đăng xuất',
                confirmAction: { type: 'auth/signOut', payload: undefined },
              })
            )
          }
        >
          <SignOutIcon active={active} />
          Đăng xuất
        </button>
      )}
    </Menu.Item>
  );
};

export default ItemSignOut;

function SignOutIcon({ active }: { active: boolean }) {
  return (
    <svg
      className="mr-2 h-5 w-5"
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 4H16V10"
        stroke={active ? menuColors.strokeActive : menuColors.strokeInactive}
        strokeWidth="2"
      />
      <path
        d="M16 4L8 12"
        stroke={active ? menuColors.strokeActive : menuColors.strokeInactive}
        strokeWidth="2"
      />
      <path
        d="M8 6H4V16H14V12"
        stroke={active ? menuColors.strokeActive : menuColors.strokeInactive}
        strokeWidth="2"
      />
    </svg>
  );
}
