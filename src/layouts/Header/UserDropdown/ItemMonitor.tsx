import { Menu } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { buttonClassName, menuColors } from './common';

interface IItemMonitor {}

const ItemMonitor: React.FC<IItemMonitor> = () => {
  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          to="/client/monitor"
          className={buttonClassName(active)}
          style={{
            backgroundColor: active ? menuColors.fillActive : '',
          }}
        >
          <ChartIcon active={active} />
          Giám Sát
        </Link>
      )}
    </Menu.Item>
  );
};

export default ItemMonitor;

function ChartIcon({ active }: { active: boolean }) {
  return (
    <svg
      className="mr-2 h-5 w-5"
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 3v18h18"
        fill={active ? menuColors.fillActive : menuColors.fillInactive}
        stroke={active ? menuColors.strokeActive : menuColors.strokeInactive}
        strokeWidth="2.2"
        className="scale-[0.75]"
      ></path>
      <path
        d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"
        fill={active ? menuColors.fillActive : menuColors.fillInactive}
        stroke={active ? menuColors.strokeActive : menuColors.strokeInactive}
        strokeWidth="2.2"
        className="scale-[0.75]"
      ></path>
    </svg>
  );
}
