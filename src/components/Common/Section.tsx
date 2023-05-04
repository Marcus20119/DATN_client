import { Link } from 'react-router-dom';
import { LoadingCircle } from '../Base/loading/Circle';
import { Heading } from '../Heading';

interface ISection {
  children: React.ReactNode;
  sectionTitle: string;
  isLoading?: boolean;
  navigatePath?: string;
  navigateLabel?: string;
}

const Section: React.FC<ISection> = ({
  children,
  sectionTitle,
  isLoading = false,
  navigatePath = '',
  navigateLabel = 'Navigate Label',
}) => {
  return (
    <div className="w-full mt-8">
      <div className="flex gap-4 w-full">
        <Heading as="h1" text={sectionTitle} className="text-[32px] !w-fit" />
        {isLoading && <LoadingCircle className="mt-1" color="circle-black" />}
        {navigatePath && (
          <Link
            to={navigatePath}
            className="ml-auto italic text-main-blue-80 !underline !underline-offset-2 opacity-100 hover:opacity-80"
          >
            {navigateLabel}
          </Link>
        )}
      </div>
      {children}
    </div>
  );
};

export { Section };
