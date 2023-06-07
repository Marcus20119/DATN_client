import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { IRootState } from '~/store/rootReducer';

interface IProtectedManager {}

const ProtectedManager: React.FC<IProtectedManager> = ({}) => {
  const { userData } = useSelector((state: IRootState) => state.auth);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (userData.role_id < 2) {
      navigateTo('/client/general');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);
  return (
    <>
      <Outlet />
    </>
  );
};

export { ProtectedManager };
