import { createContext, useContext, useState } from "react";
import { User } from "../interfaces";

type UserContextStateType = {
  user: User | null;
};

type UserContextType = UserContextStateType & {
  setUser: (user?: User) => void;
};

const initialState = {
  user: null,
};

const initialValue: UserContextType = {
  ...initialState,
  setUser: (user?: User) => {},
};
const UserContext = createContext<UserContextType>(initialValue);

export const useUser = () => {
  return useContext(UserContext);
};

type UserProviderProps = {
  children: React.ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
  const [state, setState] = useState<User | null>(null);

  const setUser = (user?: User) => {
    setState(user ? user : null);
  };

  const value = {
    user: state,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
