import { memo, useEffect } from 'react';
import { createPortal } from 'react-dom';

// create div tag
function createPortalWrapper() {
  const element: HTMLDivElement = document.createElement('div');
  element.id = 'portal-wrapper';
  return element;
}
const portalWrapperEle = createPortalWrapper();

interface IPortalWrapper {
  children: React.ReactNode;
  onClose?: () => void;
  overlay?: boolean;
  displayCloseButton?: boolean;
  containerClass?: string;
  bodyClass?: string;
  containerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  delay?: string;
}

const PortalWrapper: React.FC<IPortalWrapper> = ({
  onClose = () => {},
  overlay = false,
  displayCloseButton = true,
  children,
  containerClass = '',
  bodyClass = '',
  containerStyle = {},
  bodyStyle = {},
  delay,
}) => {
  // append div tag to body
  useEffect(() => {
    document.body.appendChild(portalWrapperEle);
  }, []);

  const renderContent = (
    <div className={containerClass} style={containerStyle}>
      {overlay && (
        <div
          className="overlay absolute inset-0 bg-[rgba(0,_0,_0,_0.8)] z-[555]"
          onClick={onClose}
          style={{ '--delay': delay } as React.CSSProperties}
        ></div>
      )}
      <div
        className={bodyClass}
        style={{ '--delay': delay, ...bodyStyle } as React.CSSProperties}
      >
        {children}
      </div>
      {displayCloseButton && (
        <i
          className="close-button bx bx-x absolute top-[5%] right-[5%] z-[666] cursor-pointer text-white text-4xl"
          onClick={onClose}
        ></i>
      )}
    </div>
  );
  return createPortal(renderContent, portalWrapperEle);
};

export default memo(PortalWrapper);
