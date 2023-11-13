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
import COLORS from "../colors";
import { Header } from "../components";
import { useHeader } from "../providers";

const Stack = createStackNavigator<RootStackParamBase>();

const RootStack = () => {
  const { visible } = useHeader();
  return (
    <Stack.Navigator
      id="RootStack"
      initialRouteName="Splash"
      screenOptions={{
        header: (props) => <Header {...props} />,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Splash"
        component={SplashScreen}
      />
      <Stack.Screen
        options={{ gestureEnabled: false, headerShown: false }}
        name="Drawer"
        component={DrawerNav}
      />
      <Stack.Screen
        options={{
          headerLeftLabelVisible: false,
        }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          headerLeftLabelVisible: false,
        }}
        name="SignUp"
        component={SignUpScreen}
      />
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
