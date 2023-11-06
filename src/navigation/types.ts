import { Text } from "react-native";
import {
  CompositeScreenProps,
  NavigationProp,
  NavigatorScreenParams,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type RootStackParamBase = {
  Drawer: NavigatorScreenParams<DrawerNavParamBase>;
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
  DriverApplication: undefined;
  Account: undefined;
  User: undefined;
  RedFlagDetail: undefined;
  RedFlagAdd: undefined;
  PartyDetail: undefined;
};

export type DrawerNavParamBase = {
  Tabs: NavigatorScreenParams<TabNavParamBase>;
};

export type TabNavParamBase = {
  Home: undefined;
  List: undefined;
  AddParty: undefined;
};

/*<----- Utility Navigation Screens ----->*/

type DrawerNavScreenProps = StackScreenProps<
  RootStackParamBase,
  "Drawer",
  "RootStack"
>;

type NestedInDrawer<T extends DrawerScreenProps<DrawerNavParamBase>> =
  CompositeScreenProps<
    T,
    StackScreenProps<RootStackParamBase, "Drawer", "RootStack">
  >;

type NestedInBottomTabs<T extends BottomTabScreenProps<TabNavParamBase>> =
  CompositeScreenProps<
    T,
    NestedInDrawer<DrawerScreenProps<DrawerNavParamBase, "Tabs", "Drawer">>
  >;

type TabNavScreenProps = NestedInDrawer<
  DrawerScreenProps<DrawerNavParamBase, "Tabs", "Drawer">
>;

/*<----- In Root Stack Navigation ----->*/

export type SplashScreenProps = StackScreenProps<
  RootStackParamBase,
  "Splash",
  "RootStack"
>;

export type LoginScreenProps = StackScreenProps<
  RootStackParamBase,
  "Login",
  "RootStack"
>;

export type SignUpScreenProps = StackScreenProps<
  RootStackParamBase,
  "SignUp",
  "RootStack"
>;

export type DriverApplicationScreenProps = StackScreenProps<
  RootStackParamBase,
  "DriverApplication",
  "RootStack"
>;

export type AccountScreenProps = StackScreenProps<
  RootStackParamBase,
  "Account",
  "RootStack"
>;

export type UserScreenProps = StackScreenProps<
  RootStackParamBase,
  "User",
  "RootStack"
>;

export type RedFlagDetailScreenProps = StackScreenProps<
  RootStackParamBase,
  "RedFlagDetail",
  "RootStack"
>;

export type RedFlagAddScreenProps = StackScreenProps<
  RootStackParamBase,
  "RedFlagAdd",
  "RootStack"
>;

export type PartyDetailScreenProps = StackScreenProps<
  RootStackParamBase,
  "PartyDetail",
  "RootStack"
>;

/*<----- In Tab Navigation ----->*/

export type HomeScreenProps = NestedInBottomTabs<
  BottomTabScreenProps<TabNavParamBase, "Home", "Tabs">
>;

export type ListScreenProps = NestedInBottomTabs<
  BottomTabScreenProps<TabNavParamBase, "List", "Tabs">
>;

export type AddPartyScreenProps = NestedInBottomTabs<
  BottomTabScreenProps<TabNavParamBase, "AddParty", "Tabs">
>;
