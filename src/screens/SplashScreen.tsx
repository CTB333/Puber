import { View, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import { Button } from "../components";
import { SplashScreenProps } from "../navigation";

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  const goToHomeScreen = () => {
    navigation.navigate("Drawer", {
      screen: "Tabs",
      params: { screen: "Home" },
    });
  };

  const goToSignUpScreen = () => {
    navigation.navigate("SignUp");
  };

  const goToLoginScreen = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={[STYLES.page, STYLES.center]}>
      <Text>Splash Screen</Text>
      <Button text="To Home" onPress={goToHomeScreen} />
      <View style={[STYLES.mv10]} />
      <Button text="To SignUp" onPress={goToSignUpScreen} />
      <View style={[STYLES.mv10]} />
      <Button text="To Login" onPress={goToLoginScreen} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SplashScreen;
