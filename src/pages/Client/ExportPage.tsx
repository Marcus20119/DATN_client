import { useSelector } from 'react-redux';
import { Container } from '~/components/Common';
import { useScrollOnTop } from '~/hooks';
import { ExportXLNT } from '~/modules';
import { IRootState } from '~/store/rootReducer';

interface IExportPage {}

const ExportPage: React.FC<IExportPage> = ({}) => {
  useScrollOnTop();
  const { userData, loadingGetThisUserData } = useSelector(
    (state: IRootState) => state.auth
  );
  return (
    <Container>{userData.project_key === 'XLNT' && <ExportXLNT />}</Container>
  );
};

export default ExportPage;
