import { useEffect } from "react";
import useErrorPopUp from "./useErrorPopUp";
import { stringify } from "../utils";

const useErrorMsg = (err: any, errChange: number) => {
  const popUp = useErrorPopUp();

  useEffect(() => {
    showMessage();
  }, [errChange]);

  const getMessage = () => {
    for (let key in err) {
      let value = err[key] as string;

      if (value.length > 0) return value;
    }
    return undefined;
  };

  const showMessage = () => {
    let message = getMessage();

    if (!message) return;

    popUp(`Error`, message);
  };

  return;
};

export default useErrorMsg;
