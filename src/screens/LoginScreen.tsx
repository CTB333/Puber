import { View, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import { useDefaultHeader } from "../hooks";
import { Button } from "../components";
import { LoginScreenProps } from "../navigation";

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  useDefaultHeader();

  const toSignUp = () => {
    navigation.replace("SignUp");
  };
  return (
    <View style={[STYLES.page, STYLES.center]}>
      <Text>Login</Text>
      <Button text="Sign Up" onPress={toSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoginScreen;
