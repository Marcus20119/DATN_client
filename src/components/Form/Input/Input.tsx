import { useController } from 'react-hook-form';
import { Error } from '../Error';
import Field from '../Field';
import Label from '../Label';

export type IInput = {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  icon?: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  labelWidth?: number;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<IInput> = ({
  control,
  name,
  label,
  icon,
  className,
  direction = 'vertical',
  labelWidth = 140,
  ...props
}) => {
  const {
    field,
    formState: { errors },
  } = useController({ name, control, defaultValue: '' });

  return (
    <>
      <Field direction={direction}>
        <Label name={name} direction={direction} labelWidth={labelWidth}>
          {label}
        </Label>
        <div
          className={`relative ${
            direction === 'vertical' ? 'w-full' : 'flex-1'
          }`}
        >
          <input
            {...field}
            {...props}
            id={name}
            className={`block w-full font-sans bg-[#11346515] rounded-[4px] border !border-[#3e3e3e] text-[14px] text-slate-900 px-[15px] py-[10px] focus:bg-[#ebebeb] placeholder:opacity-60 placeholder:text-slate-900 ${className}`}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex justify-center items-center w-[18px] h-[18px]">
            {icon}
          </div>
        </div>
        {errors?.[name]?.message && direction === 'vertical' && (
          <Error errorMessage={String(errors?.[name]?.message)}></Error>
        )}
      </Field>
      {errors?.[name]?.message && direction === 'horizontal' && (
        <Error
          errorMessage={String(errors?.[name]?.message)}
          className="!ml-[140px] pl-5 mt-[-12px]"
        ></Error>
      )}
    </>
  );
};

export { Input };
