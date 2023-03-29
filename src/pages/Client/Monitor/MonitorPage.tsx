import { useSelector } from 'react-redux';
import { Container } from '~/components/Layout';
import { useScrollOnTop } from '~/hooks';
import { IRootState } from '~/store/rootReducer';
import ReadData from './ReadData';
import WriteData from './WriteData';

type IMonitorPage = {};

const MonitorPage: React.FC<IMonitorPage> = () => {
  useScrollOnTop();
  const { isReachScrolling } = useSelector((state: IRootState) => state.base);

  return (
    <Container className={`!items-start h-[1000px] mt-10`}>
      <div className="flex flex-col gap-32 w-full mt-4">
        <ReadData />
        <WriteData />
      </div>
    </Container>
  );
};

export default MonitorPage;
