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
  ...props
}) => {
  const {
    field,
    formState: { errors },
  } = useController({ name, control, defaultValue: '' });

  return (
    <Field>
      <Label name={name}>{label}</Label>
      <div className="relative w-full">
        <input
          {...field}
          {...props}
          id={name}
          className={`block w-full font-sans bg-[#1e1e1e] rounded-[4px] border !border-[#3e3e3e] text-[14px] text-gray-300 px-[15px] py-[10px] focus:!border-[rgb(128,128,128)] placeholder:opacity-60 ${className}`}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex justify-center items-center w-[18px] h-[18px]">
          {icon}
        </div>
      </div>
      {errors?.[name]?.message && (
        <Error errorMessage={String(errors?.[name]?.message)}></Error>
      )}
    </Field>
  );
};

export { Input };
