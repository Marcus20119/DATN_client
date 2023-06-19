import React from 'react';
import { useResponsive } from '~/hooks/useResponsive';

type IContainer = { children: React.ReactNode } & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Container: React.FC<IContainer> = ({ className, children, ...props }) => {
  const { isMobile } = useResponsive();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        className={`flex justify-center items-center ${
          isMobile ? 'w-[90%]' : 'w-[80%]'
        } ${className}`}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export { Container };
