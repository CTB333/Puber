import { View, Text, StyleSheet, ScrollView } from "react-native";
import STYLES from "../styles";
import { Button, Input, Logo } from "../components";
import { LoginScreenProps } from "../navigation";
import { ActionButton } from "../components/buttons";
import {
  useDefaultHeader,
  useErrorMsg,
  useFetch,
  useGoBackHeader,
  useLogin,
  useOnSuccess,
  useSignUp,
  useSuccessMessage,
} from "../hooks";
import { useEffect } from "react";
import { stringify } from "../utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignUpScreenProps } from "../navigation";
import { useUser } from "../providers";



const LoginScreen = ({ navigation }: LoginScreenProps) => {
  useDefaultHeader();
  const { user } = useUser();
  const {
    submit,
    error,
    errorChange,
    success,
    isPending,
    userName,
    setUserName,
    password,
    setPassword,
    validateUser,
    correctUser
  } = useLogin();

  const toSignUp = () => {
    navigation.replace(`SignUp`);
  };

  // const toDrawers = () => {
  //   successMessage(`Welcome`, `${user?.firstName}`);
  //   navigation.replace(`Drawer`, {
  //     screen: "Tabs",
  //     params: { screen: "Home" },
  //   });
  // }

  useErrorMsg(error, errorChange);

  const successMessage = useSuccessMessage();

  useOnSuccess(() => {
    validateUser()
    if (correctUser== true){
      successMessage(`Welcome`, `${user?.firstName}`);
      navigation.replace(`Drawer`, {
      screen: "Tabs",
      params: { screen: "Home" },
      });
    }
  }, success);

  return (
    <SafeAreaView style={[STYLES.flex, STYLES.page]}>
      <View
        style={[
          STYLES.height,
          STYLES.center,
          { justifyContent: "space-between" },
        ]}
      >
        <View
          style={[
            STYLES.row,
            STYLES.width,
            STYLES.center,
            { justifyContent: "space-between" },
          ]}
        >
          <Logo size={150} />
          <Text
            style={[
              STYLES.colorPrimary,
              STYLES.fs1,
              STYLES.bold,
              { textAlign: "center", maxWidth: "45%" },
            ]}
          >
            Log In To Puber To Find The Best Parties In Your Area
          </Text>
        </View>

        <ScrollView style={[STYLES.flex, STYLES.width, STYLES.pv15]}>
          <Input
            placeholder="User Name"
            state={userName}
            setState={setUserName}
          />
          <Input
            placeholder="Password"
            state={password}
            setState={setPassword}
          />
          <View style={[{ height: 350 }]} />
        </ScrollView>

        <View
          style={[
            STYLES.row,
            STYLES.width,
            STYLES.center,
            { justifyContent: "space-evenly" },
          ]}
        >
          <ActionButton disabled={isPending} onPress={submit} text="Login" />
          <Button disabled={isPending} onPress={toSignUp} text="Sign Up" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default LoginScreen;
