import { View, Text, StyleSheet, ScrollView } from "react-native";
import STYLES from "../styles";
import { AccountScreenProps } from "../navigation";
import {
  useAccountInfo,
  useErrorMsg,
  useGetHostParties,
  useGetUserRedFlags,
  useGoBackHeader,
  useLogout,
  useOnSuccess,
  useSaveHeader,
  useSuccessMessage,
} from "../hooks";
import {
  Button,
  FormHeader,
  Input,
  PartySnippetList,
  RadioButton,
  RedFlagList,
  ScrollFooterSpace,
  UserHeader,
} from "../components";
import { useUser } from "../providers";

const AccountScreen = ({ navigation }: AccountScreenProps) => {
  const { user } = useUser();
  const endSession = useLogout();

  const {
    submit,
    success,
    error,
    errorChange,
    loading,

    userName,
    setUserName,
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    password,
    setPassword,
    rsvpStatus,
    setRsvpStatus,
    notiStatus,
    setNotiStatus,
  } = useAccountInfo();

  useSaveHeader(loading ? undefined : submit, [
    userName,
    email,
    firstName,
    lastName,
    password,
    rsvpStatus,
    notiStatus,
  ]);

  const successMsg = useSuccessMessage();

  useOnSuccess(() => {
    successMsg(`Account Info Saved`);
  }, success);

  useErrorMsg(error, errorChange);

  const { userParties } = useGetHostParties(user?.id ?? -1);
  const { flags } = useGetUserRedFlags(user?.id ?? -1);

  const logout = () => {
    navigation.reset({
      routes: [
        {
          name: "Login",
        },
      ],
      index: 0,
    });
    endSession();
  };

  return (
    <View style={[STYLES.page]}>
      <ScrollView showsVerticalScrollIndicator={false} style={[STYLES.width]}>
        <View style={[STYLES.width]}>
          <UserHeader user={user} />
          <FormHeader title="Account Info" />
          <Input
            placeholder="Username"
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

          <FormHeader title="Settings" />
          <RadioButton
            enabled={rsvpStatus}
            onPress={() => setRsvpStatus((prev) => !prev)}
            text="Show My RSVP Status"
          />
          <View style={[{ marginBottom: 15 }]} />
          <RadioButton
            enabled={notiStatus}
            onPress={() => setNotiStatus((prev) => !prev)}
            text="Allow Notifications"
          />
        </View>

        {userParties.length > 0 ? (
          <View>
            <FormHeader title="Hosted Parties" />
            <PartySnippetList parties={userParties} />
          </View>
        ) : null}

        {flags.length > 0 ? (
          <View>
            <FormHeader title="Red Flags" />
            <RedFlagList flags={flags} />
          </View>
        ) : null}
        <FormHeader />
        <Button text="Logout" onPress={logout} />
        <ScrollFooterSpace divideBy={6} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AccountScreen;
