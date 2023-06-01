import { useSelector } from 'react-redux';
import { Container, Section } from '~/components/Common';
import { useScrollOnTop } from '~/hooks';
import {
  EditUserGeneralModule,
  EditUserPasswordModule,
  EditHeadingModule,
} from '~/modules';
import { IRootState } from '~/store/rootReducer';

interface IAccountPage {}

const AccountPage: React.FC<IAccountPage> = ({}) => {
  useScrollOnTop();
  const { userData } = useSelector((state: IRootState) => state.auth);
  return (
    <Container>
      <Section sectionTitle="TÀI KHOẢN CỦA TÔI">
        <div className="flex flex-col py-4 w-full">
          <EditHeadingModule data={userData} />

          <div className="flex flex-col gap-4 py-4 w-full">
            <EditUserGeneralModule
              role="SELF"
              thisUserData={userData}
              id={userData.id.toString()}
            />
            <EditUserPasswordModule role="SELF" id={userData.id.toString()} />
          </div>
        </div>
      </Section>
    </Container>
  );
};

export default AccountPage;
