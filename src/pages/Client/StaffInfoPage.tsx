import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { privateAxios } from '~/axiosConfig';
import { Container, Section } from '~/components/Common';
import { TableBase } from '~/components/Table';
import { ReadData } from '~/helpers';
import { useScrollOnTop } from '~/hooks';
import { initialStaffData, StaffDataType } from '~/store/rootType';

interface IStaffInfoPage {}

const StaffInfoPage: React.FC<IStaffInfoPage> = ({}) => {
  useScrollOnTop();
  const { id } = useParams();
  const [thisStaffData, setThisStaffData] =
    useState<StaffDataType>(initialStaffData);
  const [fetchDataLoading, setFetchDataLoading] = useState<boolean>(false);
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
    { name: 'Ngoại ngữ', value: ReadData.language(thisStaffData.languages) },
    { name: 'Địa chỉ liên hệ', value: thisStaffData.address },
    { name: 'Email', value: thisStaffData.email },
    { name: 'Điện thoại', value: thisStaffData.phone_number },
  ];

  return (
    <Container>
      <Section sectionTitle="THÔNG TIN NHÂN VIÊN" isLoading={fetchDataLoading}>
        {!!thisStaffData.id && (
          <div className="flex w-full mt-5">
            <div className="flex flex-col items-center gap-2 w-[250px] border-r border-r-main-blue/50 pr-3">
              <img
                src={ReadData.avatar({
                  bucket: 'staff_avatar',
                  name: thisStaffData.avatar,
                })}
                alt={thisStaffData.full_name}
                className="w-full object-cover object-center rounded-sm h-[360px]"
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
      </Section>
    </Container>
  );
};

export default StaffInfoPage;
