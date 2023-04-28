import { Menu } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setBaseState } from '~/store/base/base.slice';
import { buttonClassName, menuColors } from './common';

interface IItemUserInfo {}

const ItemUserInfo: React.FC<IItemUserInfo> = () => {
  const dispatch = useDispatch();
  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          to="/client/account"
          className={buttonClassName(active)}
          style={{
            backgroundColor: active ? menuColors.fillActive : '',
          }}
          onClick={() =>
            dispatch(setBaseState({ state: 'showMenu', value: false }))
          }
        >
          <PersonIcon active={active} />
          Tài khoản
        </Link>
      )}
    </Menu.Item>
  );
};

export default ItemUserInfo;

function PersonIcon({ active }: { active: boolean }) {
  return (
    <svg
      className="mr-2 h-5 w-5"
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"
        fill={active ? menuColors.fillActive : menuColors.fillInactive}
        stroke={active ? menuColors.strokeActive : menuColors.strokeInactive}
        strokeWidth="2.5"
        className="scale-[0.75]"
      />
    </svg>
  );
}
