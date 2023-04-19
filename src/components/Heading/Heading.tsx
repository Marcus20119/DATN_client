import React from 'react';

type IHeading = {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  text: string;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

const Heading: React.FC<IHeading> = ({ as, text, className, ...rest }) => {
  return React.createElement(
    as,
    {
      className: `block w-full pb-1 text-4xl font-bold tracking-wide text-main-blue ${className}`,
      ...rest,
    },
    text
  );
};

export { Heading };
