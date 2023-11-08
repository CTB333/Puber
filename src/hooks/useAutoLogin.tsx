import { useEffect } from "react";
import useFetch from "./useFetch";
import useRememberUser from "./useRememberUser";
import { useUser } from "../providers";
import { stringify } from "../utils";

const useAutoLogin = () => {
  const { getStore } = useRememberUser();
  const { data, isPending, error, get } = useFetch();
  const { setUser } = useUser();

  useEffect(() => {
    if (isPending) return;

    login();
  }, []);

  useEffect(() => {
    if (!data) return;
    setUser(data);
  }, [data]);

  const login = () => {
    (async () => {
      let userId = await getStore();
      if (!userId) return;
      get(`users/${userId}`);
    })();
  };
};

export default useAutoLogin;
