import { Container, Section } from '~/components/Common';
import { useScrollOnTop } from '~/hooks';
import { AddNewUserModule } from '~/modules';

interface IManagerAddNewUserPage {}

const ManagerAddNewUserPage: React.FC<IManagerAddNewUserPage> = ({}) => {
  useScrollOnTop();
  return (
    <Container>
      <Section sectionTitle="THÊM NGƯỜI DÙNG MỚI" protectedMobile>
        <div className="flex flex-col gap-4w-full">
          <AddNewUserModule role="MANAGER" />
        </div>
      </Section>
    </Container>
  );
};

export default ManagerAddNewUserPage;
