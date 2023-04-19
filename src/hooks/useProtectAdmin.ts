import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IRootState } from '~/store/rootReducer';

export function useProtectAdmin() {
  const { userData } = useSelector((state: IRootState) => state.auth);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (userData.role_id !== 2) {
      navigateTo('/client/project-info');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
