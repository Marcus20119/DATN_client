import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { privateAxios } from '~/axiosConfig';
import { Container, Section } from '~/components/Common';
import { Heading } from '~/components/Heading';
import { ReadData } from '~/helpers';
import { useScrollOnTop } from '~/hooks';
import { IRootState } from '~/store/rootReducer';
import { initialProjectData, ProjectDataType } from '~/store/rootType';

type IProjectInfoPage = {};

const ProjectInfoPage: React.FC<IProjectInfoPage> = () => {
  useScrollOnTop();
  const { isReachScrolling } = useSelector((state: IRootState) => state.base);
  const { id } = useParams();
  const [thisProjectData, setThisProjectData] =
    useState<ProjectDataType>(initialProjectData);
  const [fetchDataLoading, setFetchDataLoading] = useState<boolean>(false);
  console.log('thisProjectData:', thisProjectData);
  useEffect(() => {
    (async () => {
      setFetchDataLoading(true);
      try {
        const { data } = await privateAxios.request({
          method: 'GET',
          url: '/g/project/' + id,
        });
        setThisProjectData(data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setFetchDataLoading(false);
      }
    })();
  }, [id]);

  let generalData: { name: string; value: string }[] = [
    { name: 'Id', value: thisProjectData.id.toString() },
    { name: 'Tên dự án', value: thisProjectData.name },
    { name: 'Mã dự án', value: thisProjectData.project_key },
    {
      name: 'Trạng thái',
      value: ReadData.projectStatus(thisProjectData.status),
    },
    { name: 'Ngày tạo', value: ReadData.day(thisProjectData.created_at) },
    {
      name: 'Ngày cập nhật cuối cùng',
      value: ReadData.day(thisProjectData.updated_at),
    },
  ];
  let othersData: {
    name: string;
    value: string | string[] | { placeholder: string; link: string }[];
  }[] = [
    { name: 'Số nhân viên', value: thisProjectData.staff_count.toString() },
    { name: 'Số người dùng', value: thisProjectData.user_count.toString() },
    {
      name: 'Danh sách nhân viên',
      value:
        thisProjectData?.staffs_data?.map(staff => ({
          placeholder: staff.full_name,
          link: `/client/staff-info/${staff.id}`,
        })) || [],
    },
    {
      name: 'Danh sách người dùng',
      value: thisProjectData?.users_data?.map(user => user.user_name) || [],
    },
  ];
  console.log('othersData:', othersData);
  return (
    <Container>
      <Section sectionTitle="THÔNG TIN VỀ DỰ ÁN" isLoading={fetchDataLoading}>
        {!!thisProjectData.id && (
          <div className="flex flex-col gap-12 mt-4 py-4 w-full">
            <div className="w-full">
              <Heading
                as="h2"
                text={'THÔNG TIN CHUNG'}
                className={`!w-full !text-lg select-none border-b border-b-main-blue/50 mb-2`}
              />
              <div className="flex gap-4 w-full">
                <div className="flex flex-col items-stretch gap-3">
                  {generalData.map((field, index) => (
                    <span
                      key={`general-name-${index}`}
                      className="flex justify-between gap-3 font-[500]"
                    >
                      <span>{field.name}</span>
                      <span>:</span>
                    </span>
                  ))}
                </div>
                <div className="flex-1 inline-flex flex-col gap-3">
                  {generalData.map((field, index) => (
                    <div
                      key={`general-value-${index}`}
                      className="inline-block"
                    >
                      {field.value}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full">
              <Heading
                as="h2"
                text={'NHÂN VIÊN VÀ NGƯỜI DÙNG'}
                className={`!w-full !text-lg select-none border-b border-b-main-blue/50 mb-2`}
              />
              <div className="flex gap-4 w-full">
                <div className="flex flex-col items-stretch gap-3">
                  {othersData.map((field, index) => (
                    <span
                      key={`others-name-${index}`}
                      className="flex justify-between gap-3 font-[500]"
                    >
                      <span>{field.name}</span>
                      <span>:</span>
                    </span>
                  ))}
                </div>
                <div className="flex-1 inline-flex flex-col gap-3">
                  {othersData.map((field, index) => (
                    <div key={`others-value-${index}`} className="inline-block">
                      {field.name === 'Danh sách nhân viên' && (
                        <span>
                          {Array.isArray(field.value) &&
                            field.value.map((staff, staffIndex) => (
                              <>
                                {typeof staff === 'object' && (
                                  <>
                                    <span>{staffIndex !== 0 && ', '}</span>
                                    <Link
                                      to={staff.link}
                                      key={staff.link}
                                      className="text-main-blue !underline !underline-offset-2 opacity-100 hover:opacity-80"
                                    >
                                      {staff.placeholder}
                                    </Link>
                                  </>
                                )}
                              </>
                            ))}
                        </span>
                      )}
                      {field.name === 'Danh sách người dùng' && (
                        <span>
                          {Array.isArray(field.value) && field.value.join(', ')}
                        </span>
                      )}
                      {![
                        'Danh sách nhân viên',
                        'Danh sách người dùng',
                      ].includes(field.name) && (
                        <span>
                          {typeof field.value === 'string' && field.value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Section>
    </Container>
  );
};

export default ProjectInfoPage;
