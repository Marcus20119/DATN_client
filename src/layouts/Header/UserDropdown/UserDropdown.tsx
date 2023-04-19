import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '~/store/rootReducer';
import ItemControl from './ItemControl';
import ItemExport from './ItemExport';
import ItemInventory from './ItemInventory';
import ItemManageProject from './ItemManageProject';
import ItemManageUser from './ItemManageUser';
import ItemMonitor from './ItemMonitor';
import ItemSignOut from './ItemSignOut';
import ItemUserInfo from './ItemUserInfo';

type IUserDropDown = {};

const UserDropdown: React.FC<IUserDropDown> = () => {
  const { userData } = useSelector((state: IRootState) => state.auth);
  return (
    <Menu as="div" className="z-[100] relative inline-block text-left h-full">
      <div className="h-full">
        <Menu.Button className="inline-flex w-full justify-center items-center text-sm font-medium text-white h-full">
          <span
            className={`text-main-white text-[0.8rem] font-semibold opacity-80 tracking-wide group-hover:opacity-100`}
          >
            {userData.user_name}
          </span>
          <ChevronDownIcon
            className="ml-2 -mr-1 h-5 w-5 text-main-white opacity-80 group-hover:opacity-100"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <ItemUserInfo />
            <ItemInventory />
          </div>
          <div className="px-1 py-1">
            {userData.role_id === 0 && (
              <>
                <ItemMonitor />
                <ItemExport />
              </>
            )}
            {userData.role_id === 1 && (
              <>
                <ItemMonitor />
                <ItemControl />
                <ItemExport />
              </>
            )}
            {userData.role_id === 2 && (
              <>
                <ItemMonitor />
                <ItemControl />
                <ItemExport />
                <ItemManageUser />
                <ItemManageProject />
              </>
            )}
          </div>
          <div className="px-1 py-1">
            <ItemSignOut />
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export { UserDropdown };
