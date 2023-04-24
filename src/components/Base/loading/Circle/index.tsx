import './LoadingCircle.scss';

interface ILoadingCircle {
  color?: 'circle-white' | 'circle-black';
  className?: string;
}

const LoadingCircle: React.FC<ILoadingCircle> = ({
  color = 'circle-white',
  className = '',
}) => {
  return <div className={`loading-circle ${color} ${className}`}>&nbsp;</div>;
};

export { LoadingCircle };
