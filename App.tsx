import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { LogBox } from "react-native";
import { RootStack } from "./src/navigation";
import {
  HeaderProvider,
  ModalProvider,
  PopUpProvider,
  SearchProvider,
  UserProvider,
} from "./src/providers";
import { SafeAreaProvider } from "react-native-safe-area-context";
const IGNORED_LOGS = [
  "Sending `onAnimatedValueUpdate` with no listeners registered",
  "Sending...",
];
LogBox.ignoreLogs(IGNORED_LOGS);

const App = () => {
  const variable = "variable";

  return (
    <SafeAreaProvider>
      <UserProvider>
        <ModalProvider>
          <PopUpProvider>
            <HeaderProvider>
              <SearchProvider>
                <NavigationContainer>
                  <RootStack />
                </NavigationContainer>
              </SearchProvider>
            </HeaderProvider>
          </PopUpProvider>
        </ModalProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
