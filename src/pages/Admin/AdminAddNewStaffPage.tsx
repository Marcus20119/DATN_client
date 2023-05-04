import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { privateAxios } from '~/axiosConfig';
import { Container, Section } from '~/components/Common';
import { BaseModule, schemaStaff, StaffModule } from '~/modules';
import { supabase } from '~/supabase/supabase';
import { MyToast } from '~/utils';

interface IAdminAddNewStaffPage {}

const AdminAddNewStaffPage: React.FC<IAdminAddNewStaffPage> = ({}) => {
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
          data.avatar = '';
        }
      }
      await privateAxios.request({
        method: 'POST',
        url: '/p/add-new-staff',
        data,
      });
      console.log('data:', data);
      MyToast.success('Thêm nhân viên thành công !');
      resetAddNewStaff();
    } catch (err: any) {
      console.log(err);
      setErrorSubmitAddNewStaff(err?.response?.data?.message);
    }
  };

  return (
    <Container>
      <Section sectionTitle="THÊM NHÂN VIÊN MỚI">
        <div className="flex flex-col gap-4w-full">
          <BaseModule
            handleSubmit={handleSubmitAddNewStaff}
            onSubmitHandler={onSubmitAddNewStaffHandler}
            errors={errorsAddNewStaff}
            errorSubmit={errorSubmitAddNewStaff}
            isSubmitting={isSubmittingAddNewStaff}
            title=""
            buttonSubmitLabel="Thêm người dùng"
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

export default AdminAddNewStaffPage;
