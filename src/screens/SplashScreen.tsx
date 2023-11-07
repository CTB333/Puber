import { View, Text, StyleSheet, Image } from "react-native";
import STYLES from "../styles";
import { Button, Logo } from "../components";
import { SplashScreenProps } from "../navigation";
import { useEffect } from "react";
import { useUser } from "../providers";
import { useAutoLogin, useSuccessMessage } from "../hooks";
import { stringify } from "../utils";

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  const { user } = useUser();
  useAutoLogin();
  const successMessage = useSuccessMessage();

  useEffect(() => {
    let timeout = setTimeout(() => {
      leaveSplashScreen();
    }, 1250);

    return () => {
      clearTimeout(timeout);
    };
  }, [stringify(user)]);

  const leaveSplashScreen = () => {
    if (user) {
      successMessage(`Welcome`, `${user?.firstName}`);
      navigation.replace(`Drawer`, {
        screen: "Tabs",
        params: { screen: "Home" },
      });
    } else navigation.replace("SignUp");
  };

  return (
    <View style={[STYLES.page, STYLES.center]}>
      <Logo size={300} />
      <Text style={[STYLES.colorPrimary, STYLES.bold, STYLES.fs4]}>Puber</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SplashScreen;
