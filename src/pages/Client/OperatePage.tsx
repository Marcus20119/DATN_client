import { useSelector } from 'react-redux';
import { Container } from '~/components/Common';
import { useScrollOnTop } from '~/hooks';
import { OperateXLNT } from '~/modules';
import { IRootState } from '~/store/rootReducer';

type IOperatePage = {};

const OperatePage: React.FC<IOperatePage> = () => {
  useScrollOnTop();
  const { userData, loadingGetThisUserData } = useSelector(
    (state: IRootState) => state.auth
  );

  return (
    <Container>{userData.project_key === 'XLNT' && <OperateXLNT />}</Container>
  );
};

export default OperatePage;
