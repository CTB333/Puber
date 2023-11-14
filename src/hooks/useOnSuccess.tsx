import { useEffect } from "react";

const useOnSuccess = (cb: () => void, success: boolean, deps?: any[]) => {
  useEffect(
    () => {
      if (!success) return;

      cb();
    },
    deps ? [...deps, success] : [success]
  );

  return;
};

export default useOnSuccess;
