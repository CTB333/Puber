import { useNavigation } from "@react-navigation/native";
import { SplashScreenProps } from "../navigation";
import { RedFlag } from "../interfaces";

const useRedFlagNav = () => {
  const navigation = useNavigation() as SplashScreenProps["navigation"];

  const navigateTo = (flag: RedFlag) => {
    navigation.navigate("RedFlagDetail", { flag });
  };

  return navigateTo;
};

export default useRedFlagNav;
