type ButtonProps = {
  children?: React.ReactNode;
} & React.ClassAttributes<HTMLButtonElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonReplay = (props: ButtonProps) => {
  return <button {...props}>New Game</button>;
};

export { ButtonReplay };
