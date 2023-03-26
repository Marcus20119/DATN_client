import { useState } from 'react';
import PropTypes from 'prop-types';

import { Input, IInput } from './Input';
import { CloseEye, OpenEye } from '~/icons';

const InputTogglePassword: React.FC<IInput> = ({
  control,
  name,
  label,
  icon,
  className,
  ...props
}) => {
  const [toggle, setToggle] = useState(false);
  const toggleComponent = (
    <div
      onClick={() => {
        setToggle(!toggle);
      }}
      style={{ cursor: 'pointer' }}
    >
      {toggle ? <OpenEye /> : <CloseEye />}
    </div>
  );
  return (
    <Input
      control={control}
      name={name}
      {...props}
      type={toggle ? 'text' : 'password'}
      icon={toggleComponent}
      className={`tracking-[0.2rem] ${className}`}
      label={label}
    />
  );
};

InputTogglePassword.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

export { InputTogglePassword };
