import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import RootModal from '~/components/modal/RootModal';
import { IRootState } from '~/store/rootReducer';
import Header from './Header/Header';

type IMainLayout = {};

const MainLayout: React.FC<IMainLayout> = () => {
  const navigateTo = useNavigate();
  const { userData } = useSelector((state: IRootState) => state.auth);
  const { isReachScrolling } = useSelector((state: IRootState) => state.base);
  useEffect(() => {
    if (!userData.id) {
      navigateTo('/auth/sign-in');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);
  return (
    <>
      {!!userData.id && (
        <div className="w-full">
          <Header />
          <div className={isReachScrolling ? 'pt-[112px]' : ''}>
            <Outlet />
          </div>
          <RootModal />
        </div>
      )}
    </>
  );
};

export default MainLayout;
