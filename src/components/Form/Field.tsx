type IField = {
  children: React.ReactNode;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
const Field: React.FC<IField> = ({ children, className, ...props }) => {
  return (
    <div
      className={`flex flex-col justify-start items-start gap-1 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Field;
