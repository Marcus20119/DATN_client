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
  placeholder?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Radio: React.FC<IRadio> = ({
  control,
  name,
  label,
  radios,
  ...props
}) => {
  const {
    field,
    formState: { errors },
  } = useController({ name, control, defaultValue: '' });

  const watchRadioValue = useWatch({ name, control });
  return (
    <Field>
      <Label name={name}>{label}</Label>
      <div className="radio-wrap">
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
      {errors?.[name]?.message && (
        <Error errorMessage={String(errors?.[name]?.message)}></Error>
      )}
    </Field>
  );
};

export { Radio };
