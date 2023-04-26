type ILabel = {
  children: React.ReactNode;
  name: string;
  direction?: 'horizontal' | 'vertical';
} & React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;
const Label: React.FC<ILabel> = ({
  name,
  children,
  className,
  direction = 'vertical',
  ...props
}) => {
  return (
    <label
      htmlFor={name}
      className={`ml-[2px] text-slate-900 ${
        direction === 'horizontal' ? 'w-[140px] text-right' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
