import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import RootModal from '~/components/Modal/RootModal';
import { useResponsive } from '~/hooks/useResponsive';
import { signOut } from '~/store/auth/auth.slice';
import { IRootState } from '~/store/rootReducer';
import Footer from './Footer';
import Header from './Header/Header';

type IMainLayout = {};

const MainLayout: React.FC<IMainLayout> = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { userData } = useSelector((state: IRootState) => state.auth);
  const { isReachScrolling } = useSelector((state: IRootState) => state.base);
  useEffect(() => {
    if (!userData.id || userData.is_deleted) {
      dispatch(signOut());
      navigateTo('/auth/sign-in');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const { isMobile } = useResponsive();
  return (
    <>
      {!!userData.id && !userData.is_deleted && (
        <div className="w-full">
          <Header />
          <div
            className={`min-h-screen ${
              isMobile ? 'pt-[50px]' : isReachScrolling ? 'pt-[100px]' : ''
            }`}
          >
            <Outlet />
          </div>
          <RootModal />
          <Footer />
        </div>
      )}
    </>
  );
};

export { MainLayout };
