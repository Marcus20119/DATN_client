import { Menu } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { setBaseState } from '~/store/base/base.slice';
import { buttonClassName, menuColors } from './common';

interface IItemExport {}

const ItemExport: React.FC<IItemExport> = () => {
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
          <DownloadIcon active={active} />
          Xuất báo cáo
        </button>
      )}
    </Menu.Item>
  );
};

export default ItemExport;

function DownloadIcon({ active }: { active: boolean }) {
  return (
    <svg
      className="mr-2 h-5 w-5"
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059z"
        fill={active ? menuColors.fillActive : menuColors.fillInactive}
        stroke={active ? menuColors.strokeActive : menuColors.strokeInactive}
        strokeWidth="2.3"
        className="scale-[0.75]"
      />
    </svg>
  );
}
