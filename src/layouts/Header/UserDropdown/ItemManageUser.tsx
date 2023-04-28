import { Menu } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setBaseState } from '~/store/base/base.slice';
import { IRootState } from '~/store/rootReducer';
import { buttonClassName, menuColors } from './common';

interface IItemManageUser {}

const ItemManageUser: React.FC<IItemManageUser> = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state: IRootState) => state.auth);
  let destinationPath: string = '';
  switch (userData.role_id) {
    case 2: {
      destinationPath = '/manager/manage-user?tab=Activated%20User&page=1';
      break;
    }
    case 3: {
      destinationPath = '/admin/manage-user?tab=Activated%20User&page=1';
      break;
    }
    default:
      destinationPath = '';
  }
  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          to={destinationPath}
          className={buttonClassName(active)}
          style={{
            backgroundColor: active ? menuColors.fillActive : '',
          }}
          onClick={() =>
            dispatch(setBaseState({ state: 'showMenu', value: false }))
          }
        >
          <UsersIcon active={active} />
          Quản lý người dùng
        </Link>
      )}
    </Menu.Item>
  );
};

export default ItemManageUser;

function UsersIcon({ active }: { active: boolean }) {
  return (
    <svg
      className="mr-2 h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
        fill={active ? menuColors.fillActive : menuColors.fillInactive}
        stroke={active ? menuColors.strokeActive : menuColors.strokeInactive}
        strokeWidth="2.3"
        className="scale-[0.85]"
      ></path>
      <circle
        cx="9"
        cy="7"
        r="4"
        fill={active ? menuColors.fillActive : menuColors.fillInactive}
        stroke={active ? menuColors.strokeActive : menuColors.strokeInactive}
        strokeWidth="2.3"
        className="scale-[0.85]"
      ></circle>
      <path
        d="M23 21v-2a4 4 0 0 0-3-3.87"
        fill={active ? menuColors.fillActive : menuColors.fillInactive}
        stroke={active ? menuColors.strokeActive : menuColors.strokeInactive}
        strokeWidth="2.3"
        className="scale-[0.85]"
      ></path>
      <path
        d="M16 3.13a4 4 0 0 1 0 7.75 "
        fill={active ? menuColors.fillActive : menuColors.fillInactive}
        stroke={active ? menuColors.strokeActive : menuColors.strokeInactive}
        strokeWidth="2.3"
        className="scale-[0.85]"
      ></path>
    </svg>
  );
}
