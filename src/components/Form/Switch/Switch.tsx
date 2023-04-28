import { useController, useWatch } from 'react-hook-form';
import { Error } from '../Error';
import Field from '../Field';
import Label from '../Label';
import './Switch.scss';

interface ISwitch {
  control: any;
  name: string;
  label: string;
  className?: string;
  direction?: 'vertical' | 'horizontal';
}

const Switch: React.FC<ISwitch> = ({
  control,
  name,
  label,
  className = '',
  direction = 'vertical',
}) => {
  const {
    field,
    formState: { errors },
  } = useController({ name, control, defaultValue: false });

  const watchSwitchValue = useWatch({ name, control });
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
          <div className="form-switch-wrap">
            <input
              {...field}
              id={name}
              type="checkbox"
              className={`form-switch ${className}`}
              checked={watchSwitchValue}
            />
            <label htmlFor={name} className="form-switch-alternative"></label>
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

export { Switch };
