import { useSelector } from 'react-redux';
import { Container, Section } from '~/components/Common';
import { useScrollOnTop } from '~/hooks';
import { IRootState } from '~/store/rootReducer';

type IGeneralPage = {};

const GeneralPage: React.FC<IGeneralPage> = () => {
  useScrollOnTop();
  const { isReachScrolling } = useSelector((state: IRootState) => state.base);
  return (
    <Container>
      <Section sectionTitle="THÔNG TIN VỀ DỰ ÁN">
        <div className="flex flex-col py-4 w-full">
          {/* <EditHeadingModule thisUserData={userData} />

        <div className="flex flex-col gap-4 py-4 w-full">
          <EditUserGeneralModule
            role="SELF"
            thisUserData={userData}
            id={userData.id.toString()}
          />
          <EditUserPasswordModule role="SELF" id={userData.id.toString()} />
        </div> */}
        </div>
      </Section>
    </Container>
  );
};

export default GeneralPage;
