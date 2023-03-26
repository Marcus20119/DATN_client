import { Fragment, memo, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './ToolTipBase.scss';
import PortalWrapper from '../PortalWrapper';

interface IToolTipBase {
  tipMessage: string;
  children: React.ReactNode;
  className?: string;
  tipClassName?: string;
  position?: string;
  moveUp?: number;
  moveDown?: number;
  moveRight?: number;
  moveLeft?: number;
}

const ToolTipBase: React.FC<IToolTipBase> = ({
  tipMessage = '',
  children,
  className = '',
  tipClassName = 'bg-[#D0D0D0] px-4 py-[6px] rounded-lg text-black shadow-[0px_0px_20px_#22222290]',
  position = 'top',
  moveUp = 0,
  moveDown = 0,
  moveRight = 0,
  moveLeft = 0,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [coords, setCoords] = useState<any>({});
  const handleMouseEnter = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    setCoords(e.currentTarget.getBoundingClientRect());
    setShow(true);
  };
  const handleMouseLeave = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    setShow(false);
  };
  return (
    <Fragment>
      <span
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseLeave}
      >
        {children}
      </span>
      {position === 'top' && (
        <CSSTransition in={show} timeout={200} classNames="fade" unmountOnExit>
          <PortalWrapper
            containerClass="z-[777]"
            bodyClass={`content absolute inline-block text-center z-[777] ${tipClassName}`}
            bodyStyle={{
              maxWidth: '300px',
              top: coords.top - 15 + window.scrollY - moveUp + moveDown,
              left:
                coords.left +
                coords.width / 2 +
                window.scrollX -
                moveLeft +
                moveRight,
              transform: 'translate(-50%, -100%)',
            }}
            displayCloseButton={false}
          >
            {tipMessage}
            <div className="absolute bottom-0 left-2/4 -translate-x-2/4 translate-y-[6px] border-[12px] border-b-[#D0D0D0] border-r-[#D0D0D0] border-t-transparent border-l-transparent rounded-[4px] rotate-45"></div>
          </PortalWrapper>
        </CSSTransition>
      )}

      {position === 'bottom' && (
        <CSSTransition in={show} timeout={200} classNames="fade" unmountOnExit>
          <PortalWrapper
            containerClass="z-[777]"
            bodyClass={`content absolute inline-block text-center z-[777] ${tipClassName}`}
            bodyStyle={{
              maxWidth: '300px',
              top: coords.top + 16 + window.scrollY - moveUp + moveDown,
              left:
                coords.left +
                coords.width / 2 +
                window.scrollX -
                moveLeft +
                moveRight,
              transform: 'translate(-50%, 100%)',
            }}
            displayCloseButton={false}
          >
            {tipMessage}
            <div className="absolute top-0 left-2/4 -translate-x-2/4 -translate-y-[6px] border-[12px] border-t-[#D0D0D0] border-l-[#D0D0D0] border-b-transparent border-r-transparent rounded-[4px] rotate-45"></div>
          </PortalWrapper>
        </CSSTransition>
      )}

      {position === 'right' && (
        <CSSTransition in={show} timeout={200} classNames="fade" unmountOnExit>
          <PortalWrapper
            containerClass="z-[777]"
            bodyClass={`content absolute inline-block text-center z-[777] ${tipClassName}`}
            bodyStyle={{
              maxWidth: '300px',
              top:
                coords.top +
                coords.height / 2 +
                window.scrollY -
                moveUp +
                moveDown,
              left:
                coords.left +
                15 +
                coords.width +
                window.scrollX -
                moveLeft +
                moveRight,
              transform: 'translate(0%, -50%)',
            }}
            displayCloseButton={false}
          >
            {tipMessage}

            <div className="absolute left-0 top-2/4 -translate-y-2/4 -translate-x-[6px] border-[10px] border-b-[#D0D0D0] border-l-[#D0D0D0] border-t-transparent border-r-transparent rounded-[4px] rotate-45"></div>
          </PortalWrapper>
        </CSSTransition>
      )}
      {position === 'left' && (
        <CSSTransition in={show} timeout={200} classNames="fade" unmountOnExit>
          <PortalWrapper
            containerClass="z-[777]"
            bodyClass={`w-fit whitespace-nowrap content absolute inline-block text-center z-[777] ${tipClassName}`}
            bodyStyle={{
              maxWidth: '300px',
              top:
                coords.top +
                coords.height / 2 +
                window.scrollY -
                moveUp +
                moveDown,
              left:
                coords.left +
                15 -
                coords.width +
                window.scrollX -
                moveLeft +
                moveRight,
              transform: 'translate(-100%, -50%)',
            }}
            displayCloseButton={false}
          >
            {tipMessage}
            <div className="absolute right-0 top-2/4 -translate-y-2/4 translate-x-[6px] border-[10px] border-t-[#D0D0D0] border-r-[#D0D0D0] border-b-transparent border-l-transparent rounded-[4px] rotate-45"></div>
          </PortalWrapper>
        </CSSTransition>
      )}
    </Fragment>
  );
};

export default memo(ToolTipBase);
