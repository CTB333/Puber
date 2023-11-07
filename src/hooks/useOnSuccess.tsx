import { useEffect } from "react";

const useOnSuccess = (cb: () => void, success: boolean) => {
  useEffect(() => {
    if (!success) return;

    cb();
  }, [success]);

  return;
};

export default useOnSuccess;
