import { useUser } from "../providers";
import useRememberUser from "./useRememberUser";

const useLogout = () => {
  const { setUser } = useUser();
  const { clear } = useRememberUser();

  const logout = () => {
    setUser();
    clear();
  };

  return logout;
};

export default useLogout;
