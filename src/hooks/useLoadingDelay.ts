import { useEffect } from 'react';
import { useState } from 'react';
import { delay } from '~/utils';

export function useLoadingDelay(time: number): boolean {
  const [isLoadingDelay, setIsLoadingDelay] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      await delay(time);
      setIsLoadingDelay(false);
    })();
  }, [time]);
  return isLoadingDelay;
}
