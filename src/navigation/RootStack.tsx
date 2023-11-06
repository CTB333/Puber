import {
  StackScreenProps,
  createStackNavigator,
} from "@react-navigation/stack";
import {
  LoginScreen,
  SignUpScreen,
  SplashScreen,
  DriverApplicationScreen,
  AccountScreen,
  UserScreen,
  RedFlagDetailScreen,
  RedFlagAddScreen,
  PartyDetailScreen,
} from "../screens";
import TabNav from "./TabNav";
import { RootStackParamBase } from "./types";
import DrawerNav from "./DrawerNav";

const Stack = createStackNavigator<RootStackParamBase>();

const RootStack = () => {
  return (
    <Stack.Navigator
      id="RootStack"
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name="Drawer"
        component={DrawerNav}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen
        name="DriverApplication"
        component={DriverApplicationScreen}
      />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="User" component={UserScreen} />
      <Stack.Screen name="RedFlagDetail" component={RedFlagDetailScreen} />
      <Stack.Screen name="RedFlagAdd" component={RedFlagAddScreen} />
      <Stack.Screen name="PartyDetail" component={PartyDetailScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;
