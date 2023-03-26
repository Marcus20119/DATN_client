type IError = {
  children?: React.ReactNode;
  errorMessage: string;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;
const Error: React.FC<IError> = ({ errorMessage, className, ...props }) => {
  return (
    <span
      className={`ml-[2px] text-[0.8rem] text-orange-400 ${className}`}
      {...props}
    >
      {errorMessage}
    </span>
  );
};

export { Error };
