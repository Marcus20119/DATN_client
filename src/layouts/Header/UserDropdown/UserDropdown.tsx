import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setBaseState } from '~/store/base/base.slice';
import { IRootState } from '~/store/rootReducer';
import ItemControl from './ItemControl';
import ItemExport from './ItemExport';
import ItemInventory from './ItemInventory';
import ItemAddNewUser from './ItemManageAddNewUser';
import ItemManageProject from './ItemManageProject';
import ItemManageStaff from './ItemManageStaff';
import ItemManageUser from './ItemManageUser';
import ItemMonitor from './ItemMonitor';
import ItemSignOut from './ItemSignOut';
import ItemUserInfo from './ItemUserInfo';

type IUserDropDown = {};

const UserDropdown: React.FC<IUserDropDown> = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state: IRootState) => state.auth);
  // Vì khi chuyển route thì menu bị glitch nên phải làm như thế này
  const { showMenu } = useSelector((state: IRootState) => state.base);

  return (
    <Menu as="div" className="z-[100] relative inline-block text-left h-full">
      <div className="h-full">
        <Menu.Button
          className="inline-flex w-full justify-center items-center text-sm font-medium text-white h-full"
          onClick={() =>
            dispatch(setBaseState({ state: 'showMenu', value: true }))
          }
        >
          <span
            className={`text-main-white text-[0.72rem] font-semibold opacity-80 tracking-wide group-hover:opacity-100`}
          >
            {userData.user_name}
          </span>
          <ChevronDownIcon
            className="ml-2 -mr-1 h-5 w-5 text-main-white opacity-80 group-hover:opacity-100"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      {showMenu && (
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
              {userData.role_id === 3 && (
                <>
                  <ItemManageUser />
                  <ItemAddNewUser />
                </>
              )}
            </div>
            {userData.role_id === 3 && (
              <div className="px-1 py-1">
                <ItemManageProject />
                <ItemManageStaff />
              </div>
            )}
            <div className="px-1 py-1">
              <ItemSignOut />
            </div>
          </Menu.Items>
        </Transition>
      )}
    </Menu>
  );
};

export { UserDropdown };
