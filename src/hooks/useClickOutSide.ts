import { useEffect, useRef, useState } from 'react';

function useClickOutSide(): {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  nodeRef: React.MutableRefObject<null>;
} {
  const [show, setShow] = useState(false);
  const nodeRef = useRef(null);
  useEffect(() => {
    function handleClickOutSide(e: any) {
      if (nodeRef.current) {
        const refElement = nodeRef.current as HTMLElement;
        if (!refElement.contains(e.target)) {
          setShow(false);
        }
      }
    }
    document.addEventListener('click', handleClickOutSide);
    return () => {
      document.removeEventListener('click', handleClickOutSide);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    show,
    setShow,
    nodeRef,
  };
}

export { useClickOutSide };
