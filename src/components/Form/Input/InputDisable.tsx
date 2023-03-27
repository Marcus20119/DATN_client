import Field from '../Field';
import Label from '../Label';

export type IInputDisable = {
  name: string;
  label: string;
  value: string;
  className?: string;
};

const InputDisable: React.FC<IInputDisable> = ({
  name,
  label,
  value,
  className = '',
  ...props
}) => {
  return (
    <Field>
      <Label name={name}>{label}</Label>
      <div className="relative w-full">
        <input
          {...props}
          id={name}
          value={value}
          className={`block w-full font-sans bg-[#1e1e1e] rounded-[4px] border !border-[#3e3e3e] text-[14px] text-gray-300 px-[15px] py-[10px] focus:!border-[rgb(128,128,128)] placeholder:opacity-60 ${className}`}
          disabled
        />
      </div>
    </Field>
  );
};

export { InputDisable };
