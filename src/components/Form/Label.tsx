import { number } from 'yup';

type ILabel = {
  children: React.ReactNode;
  name: string;
  direction?: 'horizontal' | 'vertical';
  labelWidth?: number;
} & React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;
const Label: React.FC<ILabel> = ({
  name,
  children,
  className,
  direction = 'vertical',
  labelWidth = 140,
  ...props
}) => {
  return (
    <label
      htmlFor={name}
      className={`ml-[2px] text-slate-900 ${
        direction === 'horizontal' ? `text-right` : ''
      } ${className}`}
      style={{ width: `${labelWidth}px` }}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
