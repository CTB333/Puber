import { useNavigation } from "@react-navigation/native";
import useSetHeader from "./useSetHeader";
import { SplashScreenProps } from "../navigation";

const useAccountHeader = (goBack: boolean = false) => {
  const navigation = useNavigation() as SplashScreenProps["navigation"];
  const id = navigation.getId();

  useSetHeader({
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
  });
};

export default useAccountHeader;
