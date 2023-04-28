import { Menu } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setBaseState } from '~/store/base/base.slice';
import { buttonClassName, menuColors } from './common';

interface IItemControl {}

const ItemControl: React.FC<IItemControl> = () => {
  const dispatch = useDispatch();
  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          to="/client/monitor"
          className={buttonClassName(active)}
          style={{
            backgroundColor: active ? menuColors.fillActive : '',
          }}
          onClick={() =>
            dispatch(setBaseState({ state: 'showMenu', value: false }))
          }
        >
          <ControlIcon active={active} />
          Điều khiển
        </Link>
      )}
    </Menu.Item>
  );
};

export default ItemControl;

function ControlIcon({ active }: { active: boolean }) {
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
        d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
        fill={active ? menuColors.fillActive : menuColors.fillInactive}
        stroke={active ? menuColors.strokeActive : menuColors.strokeInactive}
        strokeWidth="2.2"
        className="scale-[0.85]"
      ></path>
    </svg>
  );
}
