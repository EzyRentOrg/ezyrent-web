import { useMemo } from "react";

export function useNumberWithCommas(number: number | string) {
  return useMemo(() => {
    if (typeof number === "number") {
      number = number.toString();
    }
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }, [number]);
}
