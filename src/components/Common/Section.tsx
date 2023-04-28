import { LoadingCircle } from '../Base/loading/Circle';
import { Heading } from '../Heading';

interface ISection {
  children: React.ReactNode;
  sectionTitle: string;
  isLoading?: boolean;
}

const Section: React.FC<ISection> = ({
  children,
  sectionTitle,
  isLoading = false,
}) => {
  return (
    <div className="w-full mt-8">
      <div className="flex gap-4 w-full">
        <Heading as="h1" text={sectionTitle} className="text-[32px] !w-fit" />
        {isLoading && <LoadingCircle className="mt-1" color="circle-black" />}
      </div>
      {children}
    </div>
  );
};

export { Section };
