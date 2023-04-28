import { Container, Section } from '~/components/Common';
import { useScrollOnTop } from '~/hooks';
import { AddNewUserModule } from '~/modules';

interface IAdminAddNewUserPage {}

const AdminAddNewUserPage: React.FC<IAdminAddNewUserPage> = ({}) => {
  useScrollOnTop();
  return (
    <Container>
      <Section sectionTitle="THÊM NGƯỜI DÙNG MỚI">
        <div className="flex flex-col gap-4w-full">
          <AddNewUserModule role="ADMIN" />
        </div>
      </Section>
    </Container>
  );
};

export default AdminAddNewUserPage;
