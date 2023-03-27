import { Input, IInput } from './Input';
import { QuestionIcon } from '~/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleShowAuthModal, setAuthState } from '~/store/auth/auth.slice';

const InputHelp: React.FC<IInput & { helpMessage: string }> = ({
  control,
  name,
  label,
  icon,
  className,
  helpMessage = '',
  ...props
}) => {
  const dispatch = useDispatch();
  const helpComponent = (
    <QuestionIcon
      className="text-[#999999] cursor-pointer"
      onClick={() => {
        dispatch(
          setAuthState({
            state: 'contentModalAuthHelp',
            value: { name: label, helpMessage },
          })
        );
        dispatch(handleShowAuthModal('showModalAuthHelp'));
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
      />
    </div>
  );
};

export { InputHelp };
