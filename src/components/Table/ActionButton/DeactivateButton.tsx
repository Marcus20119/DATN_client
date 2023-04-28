import { actionButtonClassName } from './common';

type IDeactivateButton = {
  onClick?: () => void;
};

const DeactivateButton: React.FC<IDeactivateButton> = ({
  onClick = () => {},
}) => {
  return (
    <button
      title="Deactivate"
      className={actionButtonClassName}
      onClick={onClick}
    >
      <DeactivateIcon />
    </button>
  );
};

export { DeactivateButton };

const DeactivateIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="none"
      className="w-6 h-6"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
    </svg>
  );
};
