import { FieldValues, useController, UseFormRegister } from 'react-hook-form';
import { Error } from '../Error';
import Field from '../Field';
import Label from '../Label';

export type IInputFile = {
  control: any;
  register: UseFormRegister<FieldValues>;
  name: string;
  label: string;
  direction?: 'horizontal' | 'vertical';
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const InputFile: React.FC<IInputFile> = ({
  control,
  register,
  name,
  label,
  className,
  direction = 'vertical',
  ...props
}) => {
  const {
    field,
    formState: { errors },
  } = useController({ name, control, defaultValue: '' });

  return (
    <>
      <Field direction={direction}>
        <Label name={name} direction={direction}>
          {label}
        </Label>
        <div
          className={`relative ${
            direction === 'vertical' ? 'w-full' : 'flex-1'
          }`}
        >
          <input
            {...register(name)}
            onChange={e => {
              field.onChange(e?.target?.files?.[0]);
            }}
            {...props}
            type="file"
            accept="image/*"
            id={name}
            className={`block w-full font-sans bg-[#11346515] rounded-[4px] border !border-[#3e3e3e] text-[14px] text-slate-900 px-[15px] py-[10px] focus:bg-[#ebebeb] placeholder:opacity-60 placeholder:text-slate-900 ${className}`}
          />
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

export { InputFile };
