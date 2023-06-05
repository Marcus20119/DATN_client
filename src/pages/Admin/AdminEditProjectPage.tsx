import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { privateAxios } from '~/axiosConfig';
import { Container, Section } from '~/components/Common';
import { BaseModule, EditHeadingModule } from '~/modules';
import {
  initialProjectData,
  ProjectDataType,
  StaffDataType,
} from '~/store/rootType';
import { MyToast } from '~/utils';
import { Input, Radio, Switch } from '~/components/Form';
import { Checkbox } from '~/components/Form/Checkbox';
import { useLoadingDelay, useScrollOnTop } from '~/hooks';

interface IAdminEditProjectPage {}

const schemaProjectGeneral = yup.object({
  name: yup.string().required('Không được để trống mục này'),
  project_key: yup.string().required('Không được để trống mục này'),
  status: yup.number().oneOf([0, 1]).required('Không được để trống mục này'),
});
const schemaProjectStaff = yup.object({});

const AdminEditProjectPage: React.FC<IAdminEditProjectPage> = ({}) => {
  const isLoading = useLoadingDelay(500);
  const { id } = useParams();
  const [thisProjectData, setThisProjectData] =
    useState<ProjectDataType>(initialProjectData);
  const [checkboxData, setCheckboxData] = useState<
    { label: string; value: number }[]
  >([]);
  const [fetchDataLoading, setFetchDataLoading] = useState<boolean>(false);
  useScrollOnTop([id]);

  useEffect(() => {
    (async () => {
      setFetchDataLoading(true);
      try {
        const { data: projectData } = await privateAxios.request({
          method: 'GET',
          url: '/g/project/' + id,
        });
        setThisProjectData(projectData.data);
        const { data: staffData } = await privateAxios.request({
          method: 'GET',
          url: '/g/staffs/',
        });
        const staffFetchData: StaffDataType[] = staffData.data;
        setCheckboxData(
          staffFetchData.map(item => ({
            label: item.full_name,
            value: item.id,
          }))
        );
      } catch (err) {
        console.log(err);
      } finally {
        setFetchDataLoading(false);
      }
    })();
  }, [id]);

  const {
    control: controlProjectGeneral,
    handleSubmit: handleSubmitProjectGeneral,
    formState: {
      isSubmitting: isSubmittingProjectGeneral,
      errors: errorsProjectGeneral,
    },
    reset: resetProjectGeneral,
  } = useForm({
    resolver: yupResolver(schemaProjectGeneral),
    mode: 'onSubmit',
  });

  const {
    control: controlProjectStaff,
    handleSubmit: handleSubmitProjectStaff,
    formState: {
      isSubmitting: isSubmittingProjectStaff,
      errors: errorsProjectStaff,
    },
    reset: resetProjectStaff,
  } = useForm({
    resolver: yupResolver(schemaProjectStaff),
    mode: 'onSubmit',
  });

  useEffect(() => {
    resetProjectGeneral({
      name: thisProjectData.name,
      project_key: thisProjectData.project_key,
      status: thisProjectData.status,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thisProjectData]);

  useEffect(() => {
    resetProjectStaff({
      staff_ids: thisProjectData.staff_ids,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thisProjectData]);

  const [errorSubmitProjectGeneral, setErrorSubmitProjectGeneral] =
    useState<string>('');
  const onSubmitProjectGeneralHandler = async (data: any) => {
    setErrorSubmitProjectGeneral('');
    try {
      console.log('General Data:', data);
      await privateAxios.request({
        method: 'PATCH',
        url: '/u/project/edit/' + id,
        data,
      });
      MyToast.success('Chỉnh sửa dự án thành công');
    } catch (err: any) {
      console.log(err);
      setErrorSubmitProjectGeneral(err?.response?.data?.message);
    }
  };
  const [errorSubmitProjectStaff, setErrorSubmitProjectStaff] =
    useState<string>('');
  const onSubmitProjectStaffHandler = async (data: any) => {
    setErrorSubmitProjectStaff('');
    try {
      console.log('Staff Data:', data);
      await privateAxios.request({
        method: 'PATCH',
        url: '/u/project/edit/' + id,
        data,
      });
      MyToast.success('Chỉnh sửa dự án thành công');
    } catch (err: any) {
      console.log(err);
      setErrorSubmitProjectStaff(err?.response?.data?.message);
    }
  };
  const radioData: {
    name: string;
    value: number;
  }[] = [
    { name: 'Đang phát triển', value: 0 },
    {
      name: 'Đã hoàn thành',
      value: 1,
    },
  ];

  return (
    <Container>
      <Section sectionTitle="CHỈNH SỬA DỰ ÁN" isLoading={fetchDataLoading}>
        {!fetchDataLoading && !isLoading && (
          <div className="flex flex-col gap-8 w-full">
            <EditHeadingModule data={thisProjectData} />
            <BaseModule
              handleSubmit={handleSubmitProjectGeneral}
              onSubmitHandler={onSubmitProjectGeneralHandler}
              errors={errorsProjectGeneral}
              errorSubmit={errorSubmitProjectGeneral}
              isSubmitting={isSubmittingProjectGeneral}
              title="Thông tin chung"
              buttonSubmitLabel="Cập nhật"
            >
              <Input
                control={controlProjectGeneral}
                name="name"
                label="Tên dự án *"
                direction="horizontal"
                labelWidth={100}
              />
              <Input
                control={controlProjectGeneral}
                name="project_key"
                label="Mã dự án *"
                direction="horizontal"
                labelWidth={100}
              />
              <Radio
                control={controlProjectGeneral}
                label="Trạng thái *"
                name="status"
                radios={radioData}
                direction="horizontal"
                labelWidth={100}
              />
            </BaseModule>
            <BaseModule
              handleSubmit={handleSubmitProjectStaff}
              onSubmitHandler={onSubmitProjectStaffHandler}
              errors={errorsProjectStaff}
              errorSubmit={errorSubmitProjectStaff}
              isSubmitting={isSubmittingProjectStaff}
              title="Nhân viên"
              buttonSubmitLabel="Cập nhật"
            >
              {checkboxData && (
                <Checkbox
                  control={controlProjectStaff}
                  name="staff_ids"
                  label=""
                  checkboxes={checkboxData}
                  direction="vertical"
                />
              )}
            </BaseModule>
          </div>
        )}
      </Section>
    </Container>
  );
};

export default AdminEditProjectPage;
