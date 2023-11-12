import { useNavigation } from "@react-navigation/native";
import { SplashScreenProps } from "../navigation";
import useSetHeader from "./useSetHeader";
import { User } from "../interfaces";

const useAddFlagHeader = (user: User) => {
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
    right: {
      name: "addFlag",
      size: 25,
      onPress: () => {
        navigation.navigate("RedFlagAdd", { user });
      },
    },
  });
};

export default useAddFlagHeader;
