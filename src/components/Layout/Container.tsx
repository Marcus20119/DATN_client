type IContainer = {} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Container: React.FC<IContainer> = ({ className, ...props }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        className={`flex justify-center items-center w-[80%] ${className}`}
        {...props}
      ></div>
    </div>
  );
};

export { Container };
