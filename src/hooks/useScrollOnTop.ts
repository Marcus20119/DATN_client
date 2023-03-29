import { useEffect } from 'react';

/**
 * @param {variable} rerenderCondition - condition for re-rendering
 * @param {number} - optional/default = 0
 */

export function useScrollOnTop(rerenderCondition?: any[], toPosition?: number) {
  const actualRerenderCondition = rerenderCondition ? rerenderCondition : [];
  const actualToPosition = toPosition ? toPosition : 0;
  useEffect(() => {
    document.documentElement.scrollTop = actualToPosition;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...actualRerenderCondition]);
}
