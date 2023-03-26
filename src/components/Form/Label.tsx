type ILabel = {
  children: React.ReactNode;
  name: string;
} & React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;
const Label: React.FC<ILabel> = ({ name, children, className, ...props }) => {
  return (
    <label htmlFor={name} className={`ml-[2px] ${className}`} {...props}>
      {children}
    </label>
  );
};

export default Label;
