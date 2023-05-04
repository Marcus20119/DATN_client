import { useController } from 'react-hook-form';
import { Error } from '../Error';
import Field from '../Field';
import Label from '../Label';

export type ICheckbox = {
  control: any;
  name: string;
  label: string;
  checkboxes: { label: string; value: string }[];
  direction?: 'horizontal' | 'vertical';
  className?: string;
};

const Checkbox: React.FC<ICheckbox> = ({
  control,
  name,
  label,
  checkboxes,
  className,
  direction = 'vertical',
}) => {
  const {
    field,
    formState: { errors },
  } = useController({ name, control, defaultValue: [] });

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
          <div className="flex gap-8 w-full">
            {checkboxes.map((option, index) => (
              <label
                key={option.value}
                htmlFor={`${name}-${index}`}
                className="inline-flex items-center gap-2 cursor-pointer"
              >
                <div className="relative flex justify-center items-center h-5 w-5">
                  <input
                    type="checkbox"
                    id={`${name}-${index}`}
                    value={option.value}
                    checked={field.value.includes(option.value)}
                    onChange={event => {
                      const newValue = [...field.value];
                      if (event.target.checked) {
                        newValue.push(option.value);
                      } else {
                        const index = newValue.indexOf(option.value);
                        if (index > -1) {
                          newValue.splice(index, 1);
                        }
                      }
                      field.onChange(newValue);
                    }}
                    className="invisible"
                  />
                  <div
                    className={`absolute inset-0 flex justify-center items-center border border-[#cccccc] border-solid rounded-[0.275rem] ${
                      field.value.includes(option.value)
                        ? 'bg-[#3b5880]'
                        : 'bg-[#cccccc50]'
                    }`}
                  >
                    {field.value.includes(option.value) && (
                      <i className="bx bx-check mb-[2px] text-[#ccc] text-xl"></i>
                    )}
                  </div>
                </div>
                <span>{option.label}</span>
              </label>
            ))}
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

export { Checkbox };
