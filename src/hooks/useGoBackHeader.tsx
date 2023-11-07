import { useNavigation } from "@react-navigation/native";
import useSetHeader from "./useSetHeader";
import { SplashScreenProps } from "../navigation";

const useGoBackHeader = () => {
  const navigation = useNavigation() as SplashScreenProps["navigation"];
  const id = navigation.getId();

  useSetHeader({
    left: {
      name: "left",
      size: 25,
      onPress: () => {
        if (navigation.canGoBack()) navigation.goBack();
      },
    },
  });
};

export default useGoBackHeader;
