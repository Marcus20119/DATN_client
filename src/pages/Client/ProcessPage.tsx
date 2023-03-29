import { useSelector } from 'react-redux';
import { Container } from '~/components/Layout';
import { useScrollOnTop } from '~/hooks';
import { IRootState } from '~/store/rootReducer';

type IProcessPage = {};

const ProcessPage: React.FC<IProcessPage> = () => {
  useScrollOnTop();
  const { isReachScrolling } = useSelector((state: IRootState) => state.base);
  return (
    <Container className={`!items-start h-[1000px] `}>
      <div className="w-full mt-4">
        <span>Trang tiến độ</span>
      </div>
    </Container>
  );
};

export default ProcessPage;
