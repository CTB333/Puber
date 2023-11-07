import { useNavigation } from "@react-navigation/native";
import useSetHeader from "./useSetHeader";
import { HomeScreenProps } from "../navigation";

const useDrawerHeader = () => {
  const navigation = useNavigation();
  const id = navigation.getId();

  useSetHeader({
    left: {
      name: "search",
      size: 25,
      onPress: () => {
        if (id == "RootStack") return;
        let nav = navigation as unknown as HomeScreenProps["navigation"];
        nav.openDrawer && nav.openDrawer();
      },
    },
    right: {
      name: "user",
      size: 25,
      onPress: () => {
        if (id == "RootStack") return;
        let nav = navigation as unknown as HomeScreenProps["navigation"];
        nav.navigate("Account");
      },
    },
  });
};

export default useDrawerHeader;
