import { createContext, useContext, useState } from "react";
import { IconProps } from "../components";

type HeaderContextStateType = {
  left: Partial<IconProps> & {
    visibile?: boolean;
    onPress?: () => void;
  };

  right: Partial<IconProps> & {
    visibile?: boolean;
    onPress?: () => void;
  };

  title: string;
  visible: boolean;
};

export type SetHeaderContextType = Partial<HeaderContextStateType>;

type HeaderContextType = HeaderContextStateType & {
  setHeader: (options: SetHeaderContextType) => void;
};

const initialState: HeaderContextStateType = {
  left: {},
  right: {},
  title: "Puber",
  visible: false,
};

const initialValue: HeaderContextType = {
  ...initialState,
  setHeader: (options: SetHeaderContextType) => {},
};

const HeaderContext = createContext<HeaderContextType>(initialValue);

export const useHeader = () => {
  return useContext(HeaderContext);
};

type HeaderProviderProps = {
  children: React.ReactNode;
};

const HeaderProvider = ({ children }: HeaderProviderProps) => {
  const [context, setContext] = useState(initialState);

  const setHeader = (options: SetHeaderContextType) => {
    setTimeout(() => {
      setContext({
        left: options?.left ?? initialState.left,
        right: options?.right ?? initialState.right,
        title: options?.title ?? initialState.title,
        visible: options?.visible ?? initialState.visible,
      });
    }, 150);
  };

  const value: HeaderContextType = {
    ...context,
    setHeader,
  };

  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
};

export default HeaderProvider;
