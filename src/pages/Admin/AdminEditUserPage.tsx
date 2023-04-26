import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { privateAxios } from '~/axiosConfig';
import { LoadingCircle } from '~/components/Base/loading/Circle';
import { Container } from '~/components/Common';
import { Heading } from '~/components/Heading';
import { useScrollOnTop } from '~/hooks';
import {
  EditUserGeneralModule,
  EditUserPasswordModule,
  EditUserProjectModule,
} from '~/modules';
import EditUserHeadingModule from '~/modules/EditUserHeadingModule';
import { initialUserData, UserDataType } from '~/store/rootType';

interface IAdminEditUserPage {}

const AdminEditUserPage: React.FC<IAdminEditUserPage> = ({}) => {
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
      <div className="w-full mt-8">
        <div className="flex gap-4 w-full">
          <Heading
            as="h1"
            text="CHỈNH SỬA NGƯỜI DÙNG"
            className="text-[32px] !w-fit"
          />
          {fetchDataLoading && (
            <LoadingCircle className="mt-1" color="circle-black" />
          )}
        </div>
        <div className="flex flex-col py-4 w-full">
          <EditUserHeadingModule thisUserData={thisUserData} />

          <div className="flex flex-col gap-4 py-4 w-full">
            <EditUserGeneralModule
              role="ADMIN"
              thisUserData={thisUserData}
              id={id as string}
            />
            <EditUserProjectModule
              role="ADMIN"
              thisUserData={thisUserData}
              id={id as string}
            />
            <EditUserPasswordModule role="ADMIN" id={id as string} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AdminEditUserPage;
