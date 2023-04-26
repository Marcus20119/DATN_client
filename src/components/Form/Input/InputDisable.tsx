import Field from '../Field';
import Label from '../Label';

export type IInputDisable = {
  name: string;
  label: string;
  value: string;
  className?: string;
  direction?: 'horizontal' | 'vertical';
};

const InputDisable: React.FC<IInputDisable> = ({
  name,
  label,
  value,
  className = '',
  direction = 'vertical',
  ...props
}) => {
  return (
    <Field direction={direction}>
      <Label name={name} direction={direction}>
        {label}
      </Label>
      <div className="relative w-full">
        <input
          {...props}
          id={name}
          value={value}
          className={`block w-full font-sans bg-[#11346515] rounded-[4px] border !border-[#3e3e3e] text-[14px] text-slate-900 px-[15px] py-[10px] focus:bg-[#ebebeb] placeholder:opacity-60 placeholder:text-slate-900 ${className}`}
          disabled
        />
      </div>
    </Field>
  );
};

export { InputDisable };
