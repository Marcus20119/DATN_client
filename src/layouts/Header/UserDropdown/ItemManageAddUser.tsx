import { Menu } from '@headlessui/react';
import { buttonClassName, menuColors } from './common';

interface IItemAddUser {}

const ItemAddUser: React.FC<IItemAddUser> = () => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={buttonClassName(active)}
          style={{
            backgroundColor: active ? menuColors.fillActive : '',
          }}
        >
          <FileIcon active={active} />
          Thêm người dùng
        </button>
      )}
    </Menu.Item>
  );
};

export default ItemAddUser;

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
