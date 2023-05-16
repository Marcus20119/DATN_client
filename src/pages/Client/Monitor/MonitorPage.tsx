import { useSelector } from 'react-redux';
import { Container, Section } from '~/components/Common';
import { useScrollOnTop } from '~/hooks';
import { MonitorXLNT } from '~/modules/Monitor/MonitorXLNT';
import { IRootState } from '~/store/rootReducer';
import ReadData from './ReadData';
import WriteData from './WriteData';

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
