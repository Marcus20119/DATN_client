import { LoadingCircle } from '../Base/loading/Circle';

type IButtonPrimary = {
  children: React.ReactNode;
  additionalClass?: string;
  isSubmitting?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const ButtonPrimary: React.FC<IButtonPrimary> = ({
  children,
  additionalClass = '',
  isSubmitting = false,
  ...props
}) => {
  const child = isSubmitting ? <LoadingCircle /> : children;
  console.log('isSubmitting:', isSubmitting);
  return (
    <button
      {...props}
      className={`flex justify-center items-center gap-2 w-full bg-main-blue text-main-white py-[10px] rounded-[0.25rem] border border-[#999] font-bold opacity-80 transition-colors hover:!opacity-100 tracking-wider disabled:!opacity-60 ${additionalClass}`}
    >
      {child}
    </button>
  );
};

export { ButtonPrimary };
