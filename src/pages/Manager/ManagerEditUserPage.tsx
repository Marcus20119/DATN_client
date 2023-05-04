import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { privateAxios } from '~/axiosConfig';
import { Container, Section } from '~/components/Common';
import { useScrollOnTop } from '~/hooks';
import {
  EditUserGeneralModule,
  EditUserPasswordModule,
  EditUserProjectModule,
  EditUserHeadingModule,
} from '~/modules';
import { initialUserData, UserDataType } from '~/store/rootType';

interface IManagerEditUserPage {}

const ManagerEditUserPage: React.FC<IManagerEditUserPage> = ({}) => {
  useScrollOnTop();
  const { id } = useParams();
  const [thisUserData, setThisUserData] =
    useState<UserDataType>(initialUserData);
  const [fetchDataLoading, setFetchDataLoading] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      setFetchDataLoading(true);
      try {
        const { data } = await privateAxios.request({
          method: 'GET',
          url: '/g/user/' + id,
        });
        setThisUserData(data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setFetchDataLoading(false);
      }
    })();
  }, [id]);

  return (
    <Container>
      <Section sectionTitle="CHỈNH SỬA NGƯỜI DÙNG" isLoading={fetchDataLoading}>
        <div className="flex flex-col py-4 w-full">
          <EditUserHeadingModule thisUserData={thisUserData} />

          <div className="flex flex-col gap-4 py-4 w-full">
            <EditUserGeneralModule
              role="MANAGER"
              thisUserData={thisUserData}
              id={id as string}
            />
            <EditUserProjectModule
              role="MANAGER"
              thisUserData={thisUserData}
              id={id as string}
            />
            <EditUserPasswordModule role="MANAGER" id={id as string} />
          </div>
        </div>
      </Section>
    </Container>
  );
};

export default ManagerEditUserPage;
