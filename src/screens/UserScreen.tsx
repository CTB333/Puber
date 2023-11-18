import { View, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import { UserScreenProps } from "../navigation";
import {
  useAddFlagHeader,
  useGetAllParties,
  useGetAllRedFlags,
  useGoBackHeader,
} from "../hooks";
import {
  FormHeader,
  Icon,
  PartySnippetList,
  RedFlagList,
  RedFlagSnippet,
  UserHeader,
} from "../components";
import { RedFlag, RedFlagData } from "../interfaces";
import { ScrollView } from "react-native-gesture-handler";
import { useUser } from "../providers";
import { AccountScreenProps } from "../navigation";
import { useAccountInfo } from "../hooks";

const UserScreen = ({ navigation, route }: UserScreenProps) => {
  const user = route.params.user;

  /**I added code here so I could access the red flags, all of it is non ideal please get rid of it
   * it doesn't even filter to just the red flags for a person, everyone has every red flag
   */

  // const { user } = useUser();

  const { parties: allParties } = useGetAllParties();
  const parties = allParties.filter((party) => party.userId == user.id);

  const { flags: allRedFlags } = useGetAllRedFlags();
  const redFlags = allRedFlags.filter((flag) => flag.onUser == user.id);

  // const {
  //   submit,
  //   success,
  //   error,
  //   errorChange,
  //   loading,
  //   updatingPhoto,

  //   openCamera,
  //   closeCamera,
  //   cameraOpen,
  //   cameraRef,
  //   takePicture,
  //   flipCamera,
  //   backCamera,

  //   userName,
  //   setUserName,
  //   email,
  //   setEmail,
  //   firstName,
  //   setFirstName,
  //   lastName,
  //   setLastName,
  //   password,
  //   setPassword,
  //   rsvpStatus,
  //   setRsvpStatus,
  //   notiStatus,
  //   setNotiStatus,
  // } = useAccountInfo();

  // const toFlag = (flag: RedFlag) =>{
  //   navigation.navigate("RedFlagDetail", {flag});
  // }

  useAddFlagHeader(route.params.user);

  return (
    <View style={[STYLES.page]}>
      <ScrollView>
        <View>
          <UserHeader user={user} />
        </View>

        {parties.length > 0 ? (
          <>
            <FormHeader title={"Hosted Parties"}></FormHeader>
            <PartySnippetList parties={parties}></PartySnippetList>
          </>
        ) : null}

        {redFlags.length > 0 ? (
          <>
            <FormHeader title={"Red Flags"}></FormHeader>
            <RedFlagList flags={redFlags}></RedFlagList>
          </>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default UserScreen;
