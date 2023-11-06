import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import STYLES from "../styles";
import { HomeScreen, ListScreen, AddPartyScreen } from "../screens";
import { TabNavParamBase } from "./types";
import { BottomTabBar, DrawerSceneWrapper, Icon } from "../components";
import COLORS from "../colors";

const Tab = createBottomTabNavigator<TabNavParamBase>();

const TabNav = () => {
  return (
    <DrawerSceneWrapper>
      <Tab.Navigator
        tabBar={(props) => <BottomTabBar {...props} />}
        screenOptions={{
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.primary,
        }}
        initialRouteName="Home"
        id="Tabs"
      >
        <Tab.Screen
          options={{ tabBarIcon: (props) => <Icon {...props} name="list" /> }}
          name="List"
          component={ListScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: (props) => <Icon {...props} name="location" />,
          }}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{ tabBarIcon: (props) => <Icon {...props} name="add" /> }}
          name="AddParty"
          component={AddPartyScreen}
        />
      </Tab.Navigator>
    </DrawerSceneWrapper>
  );
};

const styles = StyleSheet.create({});

export default TabNav;
