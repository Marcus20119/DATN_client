import { useController, useWatch } from 'react-hook-form';
import { Error } from '../Error';
import Field from '../Field';
import Label from '../Label';

import './Radio.scss';

type IRadio = {
  radios: {
    name: string;
    value: number;
  }[];
  control: any;
  name: string;
  label: string;
  direction?: 'vertical' | 'horizontal';
  labelWidth?: number;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Radio: React.FC<IRadio> = ({
  control,
  name,
  label,
  radios,
  direction = 'vertical',
  labelWidth = 140,
  ...props
}) => {
  const {
    field,
    formState: { errors },
  } = useController({ name, control, defaultValue: '' });

  const watchRadioValue = useWatch({ name, control });
  return (
    <>
      <Field direction={direction}>
        <Label name={name} direction={direction} labelWidth={labelWidth}>
          {label}
        </Label>
        <div
          className={`radio-wrap ${
            direction === 'vertical' ? 'w-full' : 'flex-1'
          }`}
        >
          {radios.map(radio => (
            <label key={radio.name} className="radio-item-wrap">
              <div className="radio-item_check-wrap">
                <input
                  type="radio"
                  className="radio-item_check"
                  // eslint-disable-next-line eqeqeq
                  checked={watchRadioValue == radio.value}
                  {...props}
                  {...{ ...field, value: radio.value }}
                />
                <div className="radio-item_check-alternative"></div>
              </div>
              <span className="radio-item_label">{radio.name}</span>
            </label>
          ))}
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

export { Radio };
