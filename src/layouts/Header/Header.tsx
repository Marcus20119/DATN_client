import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '~/components/Layout';
import { readRoleId } from '~/helpers';
import { setBaseState } from '~/store/base/base.slice';
import { IRootState } from '~/store/rootReducer';
import HeaderNav from './HeaderNav';
import UserDropdown from './UserDropdown';

type IHeader = {};

const Header: React.FC<IHeader> = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state: IRootState) => state.auth);
  const { isReachScrolling } = useSelector((state: IRootState) => state.base);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 112) {
        dispatch(setBaseState({ state: 'isReachScrolling', value: true }));
      } else {
        dispatch(setBaseState({ state: 'isReachScrolling', value: false }));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="z-50 relative cursor-default w-full ">
      <div
        className={`bg-[#1a273a] ${
          !isReachScrolling
            ? 'w-full h-[32px]'
            : 'fixed left-0 right-0 top-0 h-[40px]'
        }`}
        style={{
          animation: isReachScrolling
            ? 'fade-in 0.5s cubic-bezier(0, 0, 0.2, 1) forwards'
            : '',
        }}
      >
        <Container className="justify-between h-full">
          <div className="h-[24px]">
            {isReachScrolling && (
              <img
                src="/imgs/logo-full.png"
                alt=""
                className="h-full object-contain object-center"
              />
            )}
          </div>
          <div className="inline-flex items-center gap-4 h-full">
            <span className="text-main-white text-[0.8rem] font-semibold opacity-80 tracking-wide mt-[1px]">
              {readRoleId(userData.role_id)}
            </span>
            <div className="w-[1px] h-[20px] bg-main-white opacity-80">
              &nbsp;
            </div>
            <div className="group inline-flex items-center h-full cursor-pointer">
              <UserDropdown />
            </div>
          </div>
        </Container>
      </div>
      {!isReachScrolling && <HeaderNav />}
    </div>
  );
};

export default Header;
