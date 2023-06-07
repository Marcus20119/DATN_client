import { useSelector } from 'react-redux';
import { Container, Section } from '~/components/Common';
import { useScrollOnTop } from '~/hooks';
import { IRootState } from '~/store/rootReducer';
import ProjectInfoPage from './ProjectInfoPage';

type IGeneralPage = {};

const GeneralPage: React.FC<IGeneralPage> = () => {
  useScrollOnTop();
  const { userData } = useSelector((state: IRootState) => state.auth);
  return (
    <>
      {userData.project_id && (
        <ProjectInfoPage projectId={userData.project_id.toString()} />
      )}
    </>
  );
};

export default GeneralPage;
