import { Menu } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { setBaseState } from '~/store/base/base.slice';
import { buttonClassName, menuColors } from './common';

interface IItemInventory {}

const ItemInventory: React.FC<IItemInventory> = () => {
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
            dispatch(setBaseState({ state: 'showMenu', value: false }))
          }
        >
          <FolderIcon active={active} />
          Kho tài liệu
        </button>
      )}
    </Menu.Item>
  );
};

export default ItemInventory;

function FolderIcon({ active }: { active: boolean }) {
  return (
    <svg
      className="mr-2 h-5 w-5"
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 5h-9.586L8.707 3.293A.997.997 0 0 0 8 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z"
        fill={active ? menuColors.fillActive : menuColors.fillInactive}
        stroke={active ? menuColors.strokeActive : menuColors.strokeInactive}
        strokeWidth="2.7"
        className="scale-[0.7]"
      />
    </svg>
  );
}
