import { useEffect, useState } from "react";
import { AllFlagTypes, RedFlagData, RedFlagType, User } from "../interfaces";
import { useUser } from "../providers";
import useFetch from "./useFetch";
import { stringify } from "../utils";
import useOnChange from "./useOnChange";

const initialError = {
  type: "",
  desc: "",
  server: "",
};

const useAddRedFlag = (flagUser: User) => {
  const {
    data,
    isPending: loading,
    success,
    error: fetchError,
    post,
  } = useFetch();
  const { user } = useUser();
  const [flagType, setFlagType] = useState<RedFlagType>(RedFlagType.Creep);
  const [desc, setDesc] = useState("");

  const [error, setError, errorChange] = useOnChange(initialError);

  useEffect(() => {
    if (!fetchError) return;
    setError((prev) => ({ ...prev, server: fetchError }));
  }, [stringify(fetchError)]);

  // useEffect(() => {
  //   console.log(`Red Flag: ${stringify(data)}`);
  //   console.log();
  // }, [stringify(data)]);

  const clearError = () => {
    setError(initialError);
  };

  const validate = () => {
    clearError();

    if (flagType.length == 0) {
      setError((prev) => ({ ...prev, type: `Missing red flag type` }));
      return false;
    }
    if (desc.length == 0) {
      setError((prev) => ({ ...prev, desc: `Missing red flag description` }));
      return false;
    }

    return true;
  };

  const submit = () => {
    if (!validate()) return;
    if (!user) return;

    let data: RedFlagData = {
      onUser: flagUser.id,
      fromUser: user.id,
      type: flagType,
      desc,
    };

    post("flags", data);
  };

  return {
    submit,
    loading,
    success,
    error,
    errorChange,

    allFlagTypes: AllFlagTypes,
    flagType,
    setFlagType,
    desc,
    setDesc,
  };
};

export default useAddRedFlag;
