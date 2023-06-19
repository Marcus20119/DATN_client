import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { privateAxios } from '~/axiosConfig';
import { Container, Section } from '~/components/Common';
import { useScrollOnTop } from '~/hooks';
import { BaseModule, schemaStaff, StaffModule } from '~/modules';
import { initialStaffData, StaffDataType } from '~/store/rootType';
import { supabase } from '~/supabase/supabase';
import { MyToast } from '~/utils';

interface IAdminEditStaffPage {}

const AdminEditStaffPage: React.FC<IAdminEditStaffPage> = ({}) => {
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
  const {
    control: controlAddNewStaff,
    handleSubmit: handleSubmitAddNewStaff,
    formState: {
      isSubmitting: isSubmittingAddNewStaff,
      errors: errorsAddNewStaff,
    },
    reset: resetAddNewStaff,
    register: registerAddNewStaff,
  } = useForm({
    resolver: yupResolver(schemaStaff),
    mode: 'onSubmit',
  });

  useEffect(() => {
    const { is_deleted, created_at, id, updated_at, ...defaultData } =
      thisStaffData;
    resetAddNewStaff({
      ...defaultData,
      avatar: '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thisStaffData]);
  const [errorSubmitAddNewStaff, setErrorSubmitAddNewStaff] =
    useState<string>('');
  const onSubmitAddNewStaffHandler = async (data: any) => {
    setErrorSubmitAddNewStaff('');
    try {
      if (data?.avatar) {
        const file = data.avatar[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now().toString()}.${fileExt}`;
        data.avatar = fileName;
        let { error: uploadError } = await supabase.storage
          .from('staff_avatar')
          .upload(fileName, file);
        if (uploadError) {
          console.log('uploadError:', uploadError);
          delete data.avatar;
        }
        const { error: deleteError } = await supabase.storage
          .from('staff_avatar')
          .remove([thisStaffData.avatar]);
        console.log('thisStaffData.avatar:', thisStaffData.avatar);
        console.log('deleteError:', deleteError);
      } else {
        delete data.avatar;
      }
      await privateAxios.request({
        method: 'PATCH',
        url: '/u/staff/edit/' + id,
        data,
      });
      MyToast.success('Chỉnh sửa nhân viên thành công');
    } catch (err: any) {
      console.log(err);
      setErrorSubmitAddNewStaff(err?.response?.data?.message);
    }
  };

  return (
    <Container>
      <Section
        sectionTitle="CHỈNH SỬA NHÂN VIÊN"
        isLoading={fetchDataLoading}
        protectedMobile
      >
        <div className="flex flex-col gap-4 w-full">
          <BaseModule
            handleSubmit={handleSubmitAddNewStaff}
            onSubmitHandler={onSubmitAddNewStaffHandler}
            errors={errorsAddNewStaff}
            errorSubmit={errorSubmitAddNewStaff}
            isSubmitting={isSubmittingAddNewStaff}
            title=""
            buttonSubmitLabel="Cập nhật"
          >
            <StaffModule
              control={controlAddNewStaff}
              register={registerAddNewStaff}
            />
          </BaseModule>
        </div>
      </Section>
    </Container>
  );
};

export default AdminEditStaffPage;
