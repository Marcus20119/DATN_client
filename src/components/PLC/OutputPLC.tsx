import Field from '../Form/Field';

export type IOutputPLC = {
  name: string;
  value: string;
  className?: string;
  unit?: string;
};

const OutputPLC: React.FC<IOutputPLC> = ({
  name,
  value,
  className = '',
  unit = '',
  ...props
}) => {
  return (
    <Field direction={'horizontal'}>
      <div className="relative flex items-center gap-2 w-full">
        <input
          {...props}
          id={name}
          value={value}
          className={`block w-full font-sans bg-[#11346515] rounded-[4px] border !border-[#3e3e3e] text-[14px] text-slate-900 px-[15px] py-[10px] focus:bg-[#ebebeb] placeholder:opacity-60 placeholder:text-slate-900 ${className}`}
          disabled
        />
        {unit && <span>{unit}</span>}
      </div>
    </Field>
  );
};

export { OutputPLC };
