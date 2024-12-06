import { useCallback } from 'react';

const useDelay = () => {
  const delay = useCallback((time: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }, []);

  return delay;
};

export default useDelay;
