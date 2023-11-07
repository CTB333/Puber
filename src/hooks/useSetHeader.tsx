import { useCallback, useEffect } from "react";
import { SetHeaderContextType, useHeader } from "../providers";
import { stringify } from "../utils";
import { useFocusEffect } from "@react-navigation/native";

const useSetHeader = (props?: SetHeaderContextType) => {
  const { setHeader } = useHeader();

  useFocusEffect(
    useCallback(() => {
      setHeader(props ?? {});
    }, [stringify(props)])
  );
};

export default useSetHeader;
