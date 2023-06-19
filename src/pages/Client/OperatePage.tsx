import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container } from '~/components/Common';
import { useScrollOnTop } from '~/hooks';
import { OperateXLNT } from '~/modules';
import { IRootState } from '~/store/rootReducer';

type IOperatePage = {};

const OperatePage: React.FC<IOperatePage> = () => {
  useScrollOnTop();
  const navigateTo = useNavigate();
  const { userData } = useSelector((state: IRootState) => state.auth);

  useEffect(() => {
    if (userData.role_id === 0) {
      navigateTo('/client/general');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>{userData.project_key === 'XLNT' && <OperateXLNT />}</Container>
  );
};

export default OperatePage;
