import { Link } from 'react-router-dom';
import { actionButtonClassName } from './common';

type IViewButton = {
  path: string;
};

const ViewButton: React.FC<IViewButton> = ({ path = '' }) => {
  return (
    <Link title="Xem" className={actionButtonClassName} to={path}>
      <EyeIcon />
    </Link>
  );
};

export { ViewButton };

const EyeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
};
