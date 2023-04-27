import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { privateAxios } from '~/axiosConfig';
import { LoadingCircle } from '~/components/Base/loading/Circle';
import { Container } from '~/components/Common';
import { Heading } from '~/components/Heading';
import { TableBase } from '~/components/Table';
import { ReadData } from '~/helpers';
import { useScrollOnTop } from '~/hooks';
import { initialStaffData, StaffDataType } from '~/store/rootType';

interface IStaffInfoPagePage {}

const StaffInfoPagePage: React.FC<IStaffInfoPagePage> = ({}) => {
  useScrollOnTop();
  const { id } = useParams();
  const [thisStaffData, setThisStaffData] =
    useState<StaffDataType>(initialStaffData);
  const [fetchDataLoading, setFetchDataLoading] = useState<boolean>(false);
  console.log('thisStaffData:', thisStaffData);
  useEffect(() => {
    (async () => {
      setFetchDataLoading(true);
      try {
        const { data } = await privateAxios.request({
          method: 'GET',
          url: '/g/staff/' + id,
        });
        setThisStaffData(data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setFetchDataLoading(false);
      }
    })();
  }, [id]);
  let staffFields: { name: string; value: string }[] = [
    { name: 'Họ và tên', value: thisStaffData.full_name },
    { name: 'Giới tính', value: ReadData.gender(thisStaffData.gender) },
    { name: 'Năm sinh', value: ReadData.day(thisStaffData.day_of_birth) },
    { name: 'Quê quán', value: thisStaffData.hometown },
    { name: 'Đơn vị công tác', value: thisStaffData.work_unit },
    { name: 'Tốt nghiệp ĐH chuyên ngành', value: thisStaffData.major },
    { name: 'Học vị', value: thisStaffData.degree },
    { name: 'Kinh nghiệm', value: thisStaffData.exp + ' năm' },
    { name: 'Ngoại ngữ', value: thisStaffData.languages.join(', ') },
    { name: 'Địa chỉ liên hệ', value: thisStaffData.address },
    { name: 'Email', value: thisStaffData.email },
    { name: 'Điện thoại', value: thisStaffData.phone_number },
  ];

  return (
    <Container>
      <div className="w-full mt-8">
        <div className="flex gap-4 w-full">
          <Heading
            as="h1"
            text="THÔNG TIN NHÂN VIÊN"
            className="text-[32px] !w-fit"
          />
          {fetchDataLoading && (
            <LoadingCircle className="mt-1" color="circle-black" />
          )}
        </div>
        {!!thisStaffData.id && (
          <div className="flex w-full mt-5">
            <div className="flex flex-col items-center gap-2 w-[250px] border-r border-r-main-blue/50 pr-3">
              <img
                src={ReadData.avatar({
                  bucket: 'staff_avatar',
                  name: thisStaffData.avatar,
                })}
                alt={thisStaffData.full_name}
                className="w-full object-contain object-center rounded-sm"
              />
              <span className="italic text-main-blue font-semibold">
                {thisStaffData.full_name}
              </span>
            </div>
            <div className="flex-1 flex pl-3">
              <TableBase type="info">
                <tbody>
                  {staffFields.map(field => (
                    <tr key={field.name}>
                      <td>{field.name}:</td>
                      <td>{field.value}</td>
                    </tr>
                  ))}
                </tbody>
              </TableBase>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default StaffInfoPagePage;
