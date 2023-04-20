import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export function useNavigateQuery({
  newPath = '',
  rerenderConditions = [],
}: {
  newPath: string;
  rerenderConditions: any[];
}) {
  const navigateTo = useNavigate();
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      navigateTo(newPath);
    }
    didMountRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigateTo, ...rerenderConditions]);
}
