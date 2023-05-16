import { useSelector } from 'react-redux';
import { Container } from '~/components/Common';
import { useScrollOnTop } from '~/hooks';
import { MonitorXLNT } from '~/modules';
import { IRootState } from '~/store/rootReducer';

type IMonitorPage = {};

const MonitorPage: React.FC<IMonitorPage> = () => {
  useScrollOnTop();
  const { userData, loadingGetThisUserData } = useSelector(
    (state: IRootState) => state.auth
  );

  return (
    <Container>{userData.project_key === 'XLNT' && <MonitorXLNT />}</Container>
  );
};

export default MonitorPage;
