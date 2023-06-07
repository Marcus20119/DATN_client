import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import RootModal from '~/components/Modal/RootModal';
import { IRootState } from '~/store/rootReducer';

type IAuthLayout = {};

const AuthLayout: React.FC<IAuthLayout> = () => {
  const navigateTo = useNavigate();
  const { userData } = useSelector((state: IRootState) => state.auth);
  useEffect(() => {
    if (userData.id) {
      navigateTo('/client/general');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);
  return (
    <>
      {!userData.id && (
        <div
          className="relative w-screen h-screen"
          style={{ maxHeight: '-webkit-fill-available' }}
        >
          <img
            src="/imgs/auth-background.jpg"
            alt="auth-background"
            className="z-10 absolute inset-0 block w-full h-full object-center"
          />
          <div className="z-20 absolute inset-0 bg-black opacity-80">
            &nbsp;
          </div>
          <div className="z-30 absolute inset-0 flex justify-center items-center">
            <div className="relative bg-gray-200 rounded-2xl z-2 transition-all w-[90vw] max-w-[500px] px-8 py-[30px] text-main-blue">
              <Outlet />
              <RootModal />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { AuthLayout };
