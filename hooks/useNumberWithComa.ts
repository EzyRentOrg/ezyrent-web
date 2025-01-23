import { useMemo } from 'react';

export function useNumberWithCommas(input: number | string) {
  return useMemo(() => {
    const numberAsString = typeof input === 'number' ? input.toString() : input;
    return numberAsString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }, [input]);
}
