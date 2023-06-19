import { FieldErrors, FieldValues, UseFormHandleSubmit } from 'react-hook-form';
import { ButtonPrimary } from '~/components/Button';
import { Error } from '~/components/Form';
import { Heading } from '~/components/Heading';
import { onErrorsHandler } from '~/helpers';
import { useResponsive } from '~/hooks';

interface IBaseModule {
  children: React.ReactNode;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmitHandler: (data: any) => Promise<void>;
  errors: FieldErrors<FieldValues>;
  errorSubmit: string;
  isSubmitting: boolean;
  title: string;
  buttonSubmitLabel?: string;
}

const BaseModule: React.FC<IBaseModule> = ({
  children,
  handleSubmit,
  onSubmitHandler,
  errors,
  errorSubmit,
  isSubmitting,
  title,
  buttonSubmitLabel = 'Cập nhật',
}) => {
  const { isMobile } = useResponsive();
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
      <div
        className={`flex justify-between w-full ${isMobile ? 'flex-col' : ''}`}
      >
        <div
          className={`flex flex-col gap-4 ${
            isMobile ? 'w-full mb-4' : 'w-[65%]'
          }`}
        >
          {children}
        </div>
        <div className="min-w-[180px]">
          <ButtonPrimary
            type="submit"
            isSubmitting={isSubmitting}
            additionalClass={`!bg-main-blue !text-white ${
              isMobile ? 'mb-8' : '!w-[195px]'
            }`}
          >
            {buttonSubmitLabel}
          </ButtonPrimary>
        </div>
      </div>
    </form>
  );
};

export { BaseModule };
