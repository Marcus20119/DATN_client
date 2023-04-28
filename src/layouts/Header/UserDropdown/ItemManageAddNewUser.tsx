import { Menu } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setBaseState } from '~/store/base/base.slice';
import { IRootState } from '~/store/rootReducer';
import { buttonClassName, menuColors } from './common';

interface IItemAddNewUser {}

const ItemAddNewUser: React.FC<IItemAddNewUser> = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state: IRootState) => state.auth);
  let destinationPath: string = '';
  switch (userData.role_id) {
    case 2: {
      destinationPath = '/manager/add-new-user';
      break;
    }
    case 3: {
      destinationPath = '/admin/add-new-user';
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
          <FileIcon active={active} />
          Thêm người dùng
        </Link>
      )}
    </Menu.Item>
  );
};

export default ItemAddNewUser;

function FileIcon({ active }: { active: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="mr-2 h-5 w-5"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
        fill={active ? menuColors.fillActive : menuColors.fillInactive}
        stroke={active ? menuColors.strokeActive : menuColors.strokeInactive}
        strokeWidth="2.3"
        className="scale-[0.85]"
      ></path>
      <circle
        cx="8.5"
        cy="7"
        r="4"
        fill={active ? menuColors.fillActive : menuColors.fillInactive}
        stroke={active ? menuColors.strokeActive : menuColors.strokeInactive}
        strokeWidth="2.3"
        className="scale-[0.85]"
      ></circle>
      <line
        x1="20"
        y1="8"
        x2="20"
        y2="14"
        fill={active ? menuColors.fillActive : menuColors.fillInactive}
        stroke={active ? menuColors.strokeActive : menuColors.strokeInactive}
        strokeWidth="2.3"
        className="scale-[0.85]"
      ></line>
      <line
        x1="23"
        y1="11"
        x2="17"
        y2="11"
        fill={active ? menuColors.fillActive : menuColors.fillInactive}
        stroke={active ? menuColors.strokeActive : menuColors.strokeInactive}
        strokeWidth="2.3"
        className="scale-[0.85]"
      ></line>
    </svg>
  );
}
