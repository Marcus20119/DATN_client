import { Link } from 'react-router-dom';
import { useResponsive } from '~/hooks/useResponsive';
import { LoadingCircle } from '../Base/loading/Circle';
import { Heading } from '../Heading';

interface ISection {
  children: React.ReactNode;
  sectionTitle: string;
  isLoading?: boolean;
  navigatePath?: string;
  navigateLabel?: string;
  protectedMobile?: boolean;
}

const Section: React.FC<ISection> = ({
  children,
  sectionTitle,
  isLoading = false,
  navigatePath = '',
  navigateLabel = 'Navigate Label',
  protectedMobile = false,
}) => {
  const { isMobile } = useResponsive();
  return (
    <div className="w-full mt-8">
      <div className="flex gap-4 w-full">
        <Heading
          as="h1"
          text={sectionTitle}
          className={`${
            isMobile
              ? `text-[28px] ${protectedMobile ? '' : 'max-w-[88%]'}`
              : 'text-[32px]'
          } !w-fit`}
        />
        {isLoading && (!protectedMobile || !isMobile) && (
          <LoadingCircle className="mt-1" color="circle-black" />
        )}
        {navigatePath && (!protectedMobile || !isMobile) && (
          <Link
            to={navigatePath}
            className="ml-auto italic text-main-blue-80 !underline !underline-offset-2 opacity-100 hover:opacity-80"
          >
            {navigateLabel}
          </Link>
        )}
      </div>
      {isMobile && protectedMobile ? (
        <p className="mt-4">
          Chức năng này không được hỗ trợ trên thiết bị di động, hãy thử lại với
          máy tính
        </p>
      ) : (
        children
      )}
    </div>
  );
};

export { Section };
