import React from 'react';

type IContainer = { children: React.ReactNode } & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Container: React.FC<IContainer> = ({ className, children, ...props }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        className={`flex justify-center items-center w-[80%] ${className}`}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export { Container };
