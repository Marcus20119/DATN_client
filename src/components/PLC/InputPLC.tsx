import { useController } from 'react-hook-form';
import { Error } from '../Form';
import Field from '../Form/Field';
import Label from '../Form/Label';

export type IInputPLC = {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  unit?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const InputPLC: React.FC<IInputPLC> = ({
  control,
  name,
  label,
  unit,
  className,
  ...props
}) => {
  const {
    field,
    formState: { errors },
  } = useController({ name, control, defaultValue: '' });

  return (
    <>
      <Field direction="vertical">
        <Label name={name} direction="vertical" className="font-bold">
          {label}
        </Label>
        <div className={`relative flex items-center gap-2`}>
          <input
            {...field}
            {...props}
            id={name}
            className={`block w-full font-sans bg-[#11346515] rounded-[4px] border !border-[#3e3e3e] text-[14px] text-slate-900 px-[15px] py-[10px] focus:bg-[#ebebeb] placeholder:opacity-60 placeholder:text-slate-900 ${className}`}
          />
          {unit && <span>{unit}</span>}
        </div>
        {errors?.[name]?.message && (
          <Error errorMessage={String(errors?.[name]?.message)} />
        )}
      </Field>
      {/* {errors?.[name]?.message && direction === 'horizontal' && (
        <Error
          errorMessage={String(errors?.[name]?.message)}
          className="!ml-[140px] pl-5 mt-[-12px]"
        />
      )} */}
    </>
  );
};

export { InputPLC };
