import { useNavigation } from "@react-navigation/native";
import useSetHeader from "./useSetHeader";
import { SplashScreenProps } from "../navigation";

const useAccountHeader = (goBack: boolean = false, deps?: any[]) => {
  const navigation = useNavigation() as SplashScreenProps["navigation"];
  const id = navigation.getId();

  useSetHeader(
    {
      left: goBack
        ? {
            name: "left",
            size: 25,
            onPress: () => {
              if (navigation.canGoBack()) navigation.goBack();
            },
          }
        : undefined,

      right: {
        name: "user",
        size: 25,
        onPress: () => {
          navigation.navigate("Account");
        },
      },
    },
    deps
  );
};

export default useAccountHeader;
