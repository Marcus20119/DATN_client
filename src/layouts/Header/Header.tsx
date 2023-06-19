import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container } from '~/components/Common';
import { ReadData } from '~/helpers';
import { useResponsive } from '~/hooks/useResponsive';
import { setBaseState } from '~/store/base/base.slice';
import { IRootState } from '~/store/rootReducer';
import HeaderNav from './HeaderNav';
import { UserDropdown } from './UserDropdown';

type IHeader = {};

const Header: React.FC<IHeader> = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state: IRootState) => state.auth);
  const { isReachScrolling } = useSelector((state: IRootState) => state.base);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
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

  const { isMobile } = useResponsive();

  return (
    <div className="z-[200] relative cursor-default w-full ">
      <div
        className={`bg-[#1a273a] ${
          isMobile
            ? 'fixed left-0 top-0 w-screen h-[50px]'
            : isReachScrolling
            ? 'fixed left-0 top-0 w-screen h-[40px]'
            : 'w-full h-[28px]'
        }`}
        style={{
          animation:
            isReachScrolling || isMobile
              ? 'fade-in 0.5s cubic-bezier(0, 0, 0.2, 1) forwards'
              : '',
        }}
      >
        <Container className="justify-between h-full">
          <Link to="/" className="h-[24px]">
            {(isReachScrolling || isMobile) && (
              <img
                src="/imgs/logo-full.png"
                alt=""
                className="h-full object-contain object-center"
              />
            )}
          </Link>
          <div className="inline-flex items-center gap-4 h-full">
            <span className="text-main-white text-[0.72rem] font-semibold opacity-80 tracking-wide mt-[1px]">
              {ReadData.roleId(userData.role_id)}
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
      {!isReachScrolling && !isMobile && <HeaderNav />}
    </div>
  );
};

export default Header;
