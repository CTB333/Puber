import { useNavigation } from "@react-navigation/native";
import { SplashScreenProps } from "../navigation";
import { Party } from "../interfaces";

const usePartyNav = () => {
  const navigation = useNavigation() as SplashScreenProps["navigation"];

  const navigateTo = (party: Party) => {
    navigation.navigate("PartyDetail", { party });
  };

  return navigateTo;
};

export default usePartyNav;
