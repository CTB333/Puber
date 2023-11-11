import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import { stringify } from "../utils";
import { RedFlag } from "../interfaces";

const initialError = {
  server: "",
};

const useGetAllRedFlags = () => {
  const { data, error: fetchErr, isPending, get } = useFetch();

  const [flags, setFlags] = useState<RedFlag[]>([]);
  const [error, setError] = useState(initialError);

  useEffect(() => {
    if (!fetchErr) return;
    setError((prev) => ({ ...prev, server: fetchErr }));
  }, [stringify(fetchErr)]);

  useEffect(() => {
    recieveFlags();
  }, [stringify(data)]);

  useEffect(() => {
    getFlags();
  }, []);

  const getFlags = () => {
    get("flags");
  };

  const recieveFlags = () => {
    if (!data) return;
    setFlags(data);
  };
  return {
    flags,
    error,
    loading: isPending,
  };
};

export default useGetAllRedFlags;
