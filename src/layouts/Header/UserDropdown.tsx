import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '~/store/rootReducer';
import { handleShowAuthModal, signOut } from '~/store/auth/auth.slice';
import { Link } from 'react-router-dom';

type IUserDropDown = {};

// const menuColors = {
//   fillActive: '#8B5CF6',
//   fillInactive: '#EDE9FE',
//   strokeActive: '#C4B5FD',
//   strokeInactive: '#A78BFA',
// };
const menuColors = {
  fillActive: '#ff6145fb',
  fillInactive: '#fccec5',
  strokeActive: '#f8beb4',
  strokeInactive: '#e66b55',
};

const UserDropdown: React.FC<IUserDropDown> = () => {
  const dispatch = useDispatch();
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
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  style={{
                    backgroundColor: active ? menuColors.fillActive : '',
                  }}
                >
                  <PersonIcon active={active} />
                  Tài khoản
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  style={{
                    backgroundColor: active ? menuColors.fillActive : '',
                  }}
                >
                  <FolderIcon active={active} />
                  Kho tài liệu
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/client/monitor"
                  className={`${
                    active ? 'text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  style={{
                    backgroundColor: active ? menuColors.fillActive : '',
                  }}
                >
                  <ChartIcon active={active} />
                  Giám Sát
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  style={{
                    backgroundColor: active ? menuColors.fillActive : '',
                  }}
                >
                  <DownloadIcon active={active} />
                  Xuất báo cáo
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  style={{
                    backgroundColor: active ? menuColors.fillActive : '',
                  }}
                  onClick={() =>
                    dispatch(handleShowAuthModal('showModalSignOutConfirm'))
                  }
                >
                  <SignOutIcon active={active} />
                  Đăng xuất
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserDropdown;

function PersonIcon({ active }: { active: boolean }) {
  return (
    <svg
      className="mr-2 h-5 w-5"
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"
        fill={active ? menuColors.fillActive : menuColors.fillInactive}
        stroke={active ? menuColors.strokeActive : menuColors.strokeInactive}
        strokeWidth="2.5"
        className="scale-[0.75]"
      />
    </svg>
  );
}
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
function SignOutIcon({ active }: { active: boolean }) {
  return (
    <svg
      className="mr-2 h-5 w-5"
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 4H16V10"
        stroke={active ? menuColors.strokeActive : menuColors.strokeInactive}
        strokeWidth="2"
      />
      <path
        d="M16 4L8 12"
        stroke={active ? menuColors.strokeActive : menuColors.strokeInactive}
        strokeWidth="2"
      />
      <path
        d="M8 6H4V16H14V12"
        stroke={active ? menuColors.strokeActive : menuColors.strokeInactive}
        strokeWidth="2"
      />
    </svg>
  );
}
