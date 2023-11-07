import { useState } from "react";

export type UseOnChangeValue<T> = [
  T,
  (v: T | ((prev: T) => T)) => void,
  number,
  () => void,
];

function useOnChange<T>(
  initValue: T,
  logs: boolean = false
): UseOnChangeValue<T> {
  const [state, setState] = useState<T>(initValue);
  const [changed, setChanged] = useState(0);

  const reset = () => {
    setChanged(0);
  };

  const change = (value: T | ((prev: T) => T)) => {
    if (logs) {
      console.log(`Log Value Change`);
      console.log(``);
    }
    setState(value);
    setChanged((prev) => prev + 1);
  };

  return [state, change, changed, reset];
}

export default useOnChange;
