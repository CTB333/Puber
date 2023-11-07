import { View, Text, StyleSheet, ScrollView } from "react-native";
import STYLES from "../styles";
import {
  useDefaultHeader,
  useErrorMsg,
  useFetch,
  useGoBackHeader,
  useOnSuccess,
  useSignUp,
  useSuccessMessage,
} from "../hooks";
import { Button, Input, Logo } from "../components";
import { useEffect } from "react";
import { stringify } from "../utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignUpScreenProps } from "../navigation";
import { useUser } from "../providers";
import { ActionButton } from "../components/buttons";

const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
  useDefaultHeader();
  const { user } = useUser();
  const {
    submit,
    error,
    errorChange,
    success,
    isPending,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    userName,
    setUserName,
    password,
    setPassword,
    rePassword,
    setRePassword,
  } = useSignUp();
  const successMessage = useSuccessMessage();

  useOnSuccess(() => {
    successMessage(`Welcome`, `${user?.firstName}`);
    navigation.replace(`Drawer`, {
      screen: "Tabs",
      params: { screen: "Home" },
    });
  }, success);

  useErrorMsg(error, errorChange);

  const toLogin = () => {
    navigation.replace(`Login`);
  };

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
            Signup For Puber To Find The Best Parties In Your Area
          </Text>
        </View>

        <ScrollView style={[STYLES.flex, STYLES.width, STYLES.pv15]}>
          <Input
            placeholder="User Name"
            state={userName}
            setState={setUserName}
          />
          <Input placeholder="Email" state={email} setState={setEmail} />
          <Input
            placeholder="First Name"
            state={firstName}
            setState={setFirstName}
          />
          <Input
            placeholder="Last Name"
            state={lastName}
            setState={setLastName}
          />
          <Input
            placeholder="Password"
            state={password}
            setState={setPassword}
          />
          <Input
            placeholder="Repeat Password"
            state={rePassword}
            setState={setRePassword}
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
          <Button disabled={isPending} onPress={toLogin} text="Login" />
          <ActionButton disabled={isPending} onPress={submit} text="Sign Up" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default SignUpScreen;
