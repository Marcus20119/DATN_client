import { Input, IInput } from './Input';
import { QuestionIcon } from '~/icons';
import { useDispatch } from 'react-redux';
import { handleShowBaseHelpInputModal } from '~/store/base/base.slice';

const InputHelp: React.FC<IInput & { helpMessage: string }> = ({
  control,
  name,
  label,
  icon,
  className,
  helpMessage = '',
  labelWidth = 140,
  ...props
}) => {
  const dispatch = useDispatch();
  const helpComponent = (
    <QuestionIcon
      className="text-[#999999] cursor-pointer"
      onClick={() => {
        dispatch(handleShowBaseHelpInputModal({ label, helpMessage }));
      }}
    />
  );
  return (
    <div>
      <Input
        control={control}
        name={name}
        {...props}
        icon={helpComponent}
        className={`tracking-[0.2rem] ${className}`}
        label={label}
        labelWidth={labelWidth}
      />
    </div>
  );
};

export { InputHelp };
