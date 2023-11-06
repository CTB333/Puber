import { useState } from "react";
import { stringify } from "../utils";

type UseSelectProps<T> = {
  options: T[];
};

const useSelect = <T,>({ options }: UseSelectProps<T>) => {
  const [state, setState] = useState<T | undefined>(undefined);

  const select = (val?: T) => {
    if (!val) return setState(undefined);

    if (
      options.findIndex((option) => stringify(option) === stringify(val)) == -1
    )
      return setState(undefined);

    setState(val);
  };

  return {
    selected: state,
    select,
    unselect: () => select(undefined),
    options,
  };
};

export default useSelect;
