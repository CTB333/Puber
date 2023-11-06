import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useEffect } from "react";

const useEnableDrawerSwipe = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useFocusEffect(() => {
    if (navigation.getId() !== "Tabs") return () => {};

    let gestureEnabled = true;
    let swipeEnabled = true;
    let swipeEdgeWidth = 100;

    if (route.name == "AddParty") {
      gestureEnabled = false;
      swipeEnabled = false;
      swipeEdgeWidth = 0;
    }

    navigation.getParent()?.setOptions({
      gestureEnabled,
      swipeEnabled,
      swipeEdgeWidth,
    });
  });
};

export default useEnableDrawerSwipe;
