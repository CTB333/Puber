import { useNavigation } from "@react-navigation/native";
import { SplashScreenProps } from "../navigation";
import useSetHeader from "./useSetHeader";
import COLORS from "../colors";
import { useEffect } from "react";
import { useHeader } from "../providers";

const useSaveHeader = (onPress?: () => void, deps?: any[]) => {
  const navigation = useNavigation() as SplashScreenProps["navigation"];
  const id = navigation.getId();

  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader({
      left: {
        name: "left",
        size: 25,
        onPress: () => {
          if (navigation.canGoBack()) navigation.goBack();
        },
      },
      right: {
        name: "save",
        size: 25,
        color: onPress ? COLORS.white : COLORS.white50,
        onPress,
      },
    });
  }, deps ?? []);
};

export default useSaveHeader;
