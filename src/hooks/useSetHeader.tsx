import { useCallback, useEffect } from "react";
import { SetHeaderContextType, useHeader } from "../providers";
import { stringify } from "../utils";
import { useFocusEffect } from "@react-navigation/native";

const useSetHeader = (props?: SetHeaderContextType, deps?: any[]) => {
  const { setHeader } = useHeader();

  useFocusEffect(
    useCallback(
      () => {
        setHeader(props ?? {});
      },
      deps ?? [stringify(props)]
    )
  );
};

export default useSetHeader;
