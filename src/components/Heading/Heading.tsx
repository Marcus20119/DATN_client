import React from 'react';

type IHeading = {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  text: string;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

const Heading: React.FC<IHeading> = ({ as, text, ...rest }) => {
  return React.createElement(as, rest, text);
};

export { Heading };
