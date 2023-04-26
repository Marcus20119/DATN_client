import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { privateAxios } from '~/axiosConfig';

import { ButtonPrimary } from '~/components/Button';
import { Error, Input, Radio } from '~/components/Form';
import { Heading } from '~/components/Heading';
import { onErrorsHandler } from '~/helpers';
import { UserDataType } from '~/store/rootType';

interface IEditUserProjectModule {
  role: 'ADMIN' | 'MANAGER' | 'SELF';
  thisUserData: UserDataType;
  id: string;
}

const schemaProject = yup.object({
  project_key: yup.string().required('Không được để trống mục này'),
  role_id: yup
    .number()
    .oneOf([0, 1, 2, 3])
    .required('Không được để trống mục này'),
});

const EditUserProjectModule: React.FC<IEditUserProjectModule> = ({
  role,
  thisUserData,
  id,
}) => {
  const {
    control: controlProject,
    handleSubmit: handleSubmitProject,
    formState: { isSubmitting: isSubmittingProject, errors: errorsProject },
    reset: resetProject,
  } = useForm({
    resolver: yupResolver(schemaProject),
    mode: 'onSubmit',
  });

  useEffect(() => {
    resetProject({
      role_id: thisUserData?.role_id,
      project_key: thisUserData?.project_key,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thisUserData]);

  const [errorSubmitProject, setErrorSubmitProject] = useState<string>('');
  const onSubmitProjectHandler = async (data: any) => {
    setErrorSubmitProject('');
    try {
      switch (role) {
        case 'ADMIN': {
          await privateAxios.request({
            method: 'PATCH',
            url: '/u/3/user/edit/' + id,
            data,
          });
          break;
        }
        case 'MANAGER': {
          await privateAxios.request({
            method: 'PATCH',
            url: '/u/2/user/edit/' + id,
            data,
          });
          break;
        }
        default:
          break;
      }
    } catch (err: any) {
      console.log(err);
      setErrorSubmitProject(err?.response?.data?.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmitProject(onSubmitProjectHandler, () =>
        onErrorsHandler(errorsProject)
      )}
      className="flex flex-col gap-4"
      // autoComplete="off"
      noValidate
    >
      <div className="flex justify-between items-end border-b border-b-main-blue/50 mb-2">
        <Heading
          as="h2"
          text="Dự án và Quyền hạng"
          className="!text-lg !w-fit"
        />
        <Error errorMessage={errorSubmitProject} className="mb-1" />
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-4 w-[65%]">
          <Input
            control={controlProject}
            name="project_key"
            label="Mã dự án *"
            direction="horizontal"
          ></Input>
          <Radio
            control={controlProject}
            name="role_id"
            label="Quyền hạng *"
            radios={
              role === 'ADMIN'
                ? [
                    { name: 'Basic Client', value: 0 },
                    { name: 'Engineer', value: 1 },
                    { name: 'Manager', value: 2 },
                    { name: 'Admin', value: 3 },
                  ]
                : [
                    { name: 'Basic Client', value: 0 },
                    { name: 'Engineer', value: 1 },
                    { name: 'Manager', value: 2 },
                  ]
            }
            direction="horizontal"
          />
        </div>
        <div className="w-[180px]">
          <ButtonPrimary
            type="submit"
            isSubmitting={isSubmittingProject}
            additionalClass="!bg-main-blue !text-white"
          >
            Cập Nhật
          </ButtonPrimary>
        </div>
      </div>
    </form>
  );
};

export { EditUserProjectModule };
