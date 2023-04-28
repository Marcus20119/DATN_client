import { FieldErrors, FieldValues, UseFormHandleSubmit } from 'react-hook-form';
import { ButtonPrimary } from '~/components/Button';
import { Error } from '~/components/Form';
import { Heading } from '~/components/Heading';
import { onErrorsHandler } from '~/helpers';

interface IEditBaseModule {
  children: React.ReactNode;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmitHandler: (data: any) => Promise<void>;
  errors: FieldErrors<FieldValues>;
  errorSubmit: string;
  isSubmitting: boolean;
  title: string;
  buttonSubmitLabel?: string;
}

const EditBaseModule: React.FC<IEditBaseModule> = ({
  children,
  handleSubmit,
  onSubmitHandler,
  errors,
  errorSubmit,
  isSubmitting,
  title,
  buttonSubmitLabel = 'Cập nhật',
}) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler, () => onErrorsHandler(errors))}
      className="flex flex-col gap-4"
      // autoComplete="off"
      noValidate
    >
      <div className="flex justify-between items-end border-b border-b-main-blue/50 mb-2">
        <Heading
          as="h2"
          text={!!title ? title : 'empty'}
          className={`!text-lg !w-fit select-none ${
            !title && 'text-transparent'
          }`}
        />
        <Error errorMessage={errorSubmit} className="mb-1" />
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-4 w-[65%]">{children}</div>
        <div className="min-w-[180px]">
          <ButtonPrimary
            type="submit"
            isSubmitting={isSubmitting}
            additionalClass="!bg-main-blue !text-white !w-[195px]"
          >
            {buttonSubmitLabel}
          </ButtonPrimary>
        </div>
      </div>
    </form>
  );
};

export default EditBaseModule;
