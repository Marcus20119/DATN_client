import { useEffect } from 'react';
import { useState } from 'react';

export function useForceRerender(rerenderCondition: any[] = []) {
  const [forceRerender, setForceRerender] = useState(false);
  useEffect(() => {
    setForceRerender(!forceRerender);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...rerenderCondition]);
}
