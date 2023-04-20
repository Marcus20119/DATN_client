import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { IRootState } from '~/store/rootReducer';

interface IProtectedAdmin {}

const ProtectedAdmin: React.FC<IProtectedAdmin> = ({}) => {
  const { userData } = useSelector((state: IRootState) => state.auth);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (userData.role_id !== 3) {
      navigateTo('/client/project-info');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
};

export { ProtectedAdmin };
