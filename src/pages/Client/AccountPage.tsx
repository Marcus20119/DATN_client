import { useSelector } from 'react-redux';
import { Container } from '~/components/Common';
import { Heading } from '~/components/Heading';
import { EditUserGeneralModule, EditUserPasswordModule } from '~/modules';
import EditUserHeadingModule from '~/modules/EditUserHeadingModule';
import { IRootState } from '~/store/rootReducer';

interface IAccountPage {}

const AccountPage: React.FC<IAccountPage> = ({}) => {
  const { userData } = useSelector((state: IRootState) => state.auth);
  return (
    <Container>
      <div className="w-full mt-8">
        <div className="flex gap-4 w-full">
          <Heading
            as="h1"
            text="TÀI KHOẢN CỦA TÔI"
            className="text-[32px] !w-fit"
          />
        </div>
        <div className="flex flex-col py-4 w-full">
          <EditUserHeadingModule thisUserData={userData} />

          <div className="flex flex-col gap-4 py-4 w-full">
            <EditUserGeneralModule
              role="SELF"
              thisUserData={userData}
              id={userData.id.toString()}
            />
            <EditUserPasswordModule role="SELF" id={userData.id.toString()} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AccountPage;
