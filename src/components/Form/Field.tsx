type IField = {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
const Field: React.FC<IField> = ({
  children,
  className,
  direction = 'vertical',
  ...props
}) => {
  return (
    <div
      className={`flex ${
        direction === 'vertical'
          ? 'flex-col items-start gap-1'
          : 'items-center gap-4'
      } justify-start ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Field;
