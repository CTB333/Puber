import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNav from "./TabNav";
import COLORS from "../colors";
import { Drawer } from "../components";

const { Navigator, Screen } = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Navigator
      id="Drawer"
      initialRouteName="Tabs"
      drawerContent={(props) => <Drawer {...props} />}
      screenOptions={{
        headerShown: false,
        swipeEnabled: true,
        overlayColor: COLORS.transparent,
        drawerType: "back",
        swipeEdgeWidth: 100,
        drawerStyle: {
          width: "60%",
        },
        sceneContainerStyle: {
          backgroundColor: COLORS.primary,
        },
      }}
    >
      <Screen name="Tabs" component={TabNav} />
    </Navigator>
  );
};

export default DrawerNav;
