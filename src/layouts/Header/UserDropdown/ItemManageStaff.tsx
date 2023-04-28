import { Menu } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setBaseState } from '~/store/base/base.slice';
import { buttonClassName, menuColors } from './common';

interface IItemManageStaff {}

const ItemManageStaff: React.FC<IItemManageStaff> = () => {
  const dispatch = useDispatch();
  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          to="/admin/manage-staff?tab=Active%20Staff&page=1"
          className={buttonClassName(active)}
          style={{
            backgroundColor: active ? menuColors.fillActive : '',
          }}
          onClick={() =>
            dispatch(setBaseState({ state: 'showMenu', value: false }))
          }
        >
          <FileIcon active={active} />
          Quản lý nhân viên
        </Link>
      )}
    </Menu.Item>
  );
};

export default ItemManageStaff;

function FileIcon({ active }: { active: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="mr-2 h-5 w-5"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"
        fill={active ? menuColors.fillActive : menuColors.fillInactive}
        stroke={active ? menuColors.strokeActive : menuColors.strokeInactive}
        strokeWidth="2.3"
        className="scale-[0.9]"
      />
      <circle
        cx="12"
        cy="10"
        r="3"
        fill={active ? menuColors.fillActive : menuColors.fillInactive}
        stroke={active ? menuColors.strokeActive : menuColors.strokeInactive}
        strokeWidth="2.3"
        className="scale-[0.9]"
      />
      <circle
        cx="12"
        cy="12"
        r="10"
        // fill={active ? menuColors.fillActive : menuColors.fillInactive}
        stroke={active ? menuColors.strokeActive : menuColors.strokeInactive}
        strokeWidth="2.3"
        className="scale-[0.9]"
      />
    </svg>
  );
}
